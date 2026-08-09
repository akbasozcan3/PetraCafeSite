import { integrationLog } from "../logger";
import { safeEqual } from "../crypto";
import {
  getDecryptedSecrets,
  getProviderBlob,
  patchProviderMeta,
  saveProviderSettings,
} from "../store";
import { upsertProductsIntoCms } from "../sync-cms";
import { listIntegrationOrders, upsertNormalizedOrders } from "../orders-store";
import type {
  IntegrationMeta,
  IntegrationProvider,
  NormalizedOrder,
  NormalizedProduct,
  PublicIntegrationSettings,
  SyncReport,
} from "../types";

const YS_BASE = {
  production: "https://yemeksepeti.partner.deliveryhero.io",
} as const;

const META: IntegrationMeta = {
  id: "yemeksepeti",
  name: "Yemeksepeti",
  description: "Delivery Hero Partner API v2 — OAuth2, katalog, sipariş, webhook.",
  docsUrl: "https://developer.yemeksepeti.com/api-specifications",
  webhookPath: "/api/integrations/yemeksepeti/webhook",
  capabilities: [
    "testConnection",
    "getMenu",
    "syncMenu",
    "getOrders",
    "webhook",
  ],
  fields: [
    { key: "enabled", label: "Entegrasyon aktif", type: "checkbox" },
    {
      key: "apiBaseUrl",
      label: "API Base URL (opsiyonel)",
      type: "url",
      help: "Boşsa https://yemeksepeti.partner.deliveryhero.io",
    },
    {
      key: "chainId",
      label: "Chain ID",
      type: "text",
      required: true,
      help: "Partner Portal → Shop Integrations URL / Account Manager",
    },
    {
      key: "vendorId",
      label: "Vendor ID (Outlet / Store)",
      type: "text",
      required: true,
    },
    {
      key: "clientId",
      label: "Client ID",
      type: "password",
      required: true,
      secret: true,
      help: "OAuth2 Client Credentials — Partner Portal Secret Management",
    },
    {
      key: "clientSecret",
      label: "Client Secret",
      type: "password",
      required: true,
      secret: true,
    },
    {
      key: "webhookSecret",
      label: "Webhook Secret",
      type: "password",
      secret: true,
      help: "Partner Portal webhook secret (static token veya Basic … değeri)",
    },
  ],
};

type TokenCache = { accessToken: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

function baseUrl(override?: string) {
  const t = (override || "").trim().replace(/\/$/, "");
  return t || YS_BASE.production;
}

async function fetchAccessToken(creds: {
  apiBaseUrl?: string;
  clientId: string;
  clientSecret: string;
}): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }
  const url = `${baseUrl(creds.apiBaseUrl)}/v2/oauth/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
  });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };
  if (!res.ok || !data.access_token) {
    integrationLog("Yemeksepeti", "error", "OAuth token failed", {
      status: res.status,
      endpoint: "/v2/oauth/token",
    });
    throw new Error(
      res.status === 401
        ? "Kimlik bilgileri geçersiz."
        : data.error_description || data.error || `OAuth hatası (${res.status})`
    );
  }
  const ttl = typeof data.expires_in === "number" ? data.expires_in : 7200;
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + ttl * 1000,
  };
  return data.access_token;
}

async function ysRequest<T>(
  path: string,
  opts: {
    method?: string;
    query?: Record<string, string | undefined>;
    body?: unknown;
    idempotent?: boolean;
  } = {}
): Promise<T> {
  const data = await getDecryptedSecrets("yemeksepeti");
  if (!data) throw new Error("Yemeksepeti ayarları bulunamadı.");
  const clientId = data.secrets.clientId;
  const clientSecret = data.secrets.clientSecret;
  if (!clientId || !clientSecret) throw new Error("Client ID / Client Secret gerekli.");

  const token = await fetchAccessToken({
    apiBaseUrl: data.fields.apiBaseUrl,
    clientId,
    clientSecret,
  });

  const qs = new URLSearchParams();
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v) qs.set(k, v);
    }
  }
  const q = qs.toString();
  const url = `${baseUrl(data.fields.apiBaseUrl)}${path}${q ? `?${q}` : ""}`;
  const maxAttempts = opts.idempotent === false ? 1 : 3;
  let lastErr: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(url, {
        method: opts.method || "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timer);
      const text = await res.text();
      let json: unknown = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = text;
      }
      if (!res.ok) {
        integrationLog("Yemeksepeti", "error", "Request failed", {
          status: res.status,
          endpoint: path,
        });
        if ((res.status === 429 || res.status >= 500) && attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 300 * 2 ** (attempt - 1)));
          continue;
        }
        throw new Error(
          res.status === 401
            ? "Kimlik bilgileri geçersiz."
            : `Yemeksepeti API hatası (${res.status})`
        );
      }
      return json as T;
    } catch (e) {
      clearTimeout(timer);
      lastErr = e instanceof Error ? e : new Error(String(e));
      if (lastErr.name === "AbortError") lastErr = new Error("Yemeksepeti API zaman aşımı.");
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 300 * 2 ** (attempt - 1)));
        continue;
      }
    }
  }
  throw lastErr || new Error("Yemeksepeti isteği başarısız.");
}

function catalogProducts(raw: unknown): NormalizedProduct[] {
  const list: unknown[] = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object"
      ? Array.isArray((raw as { products?: unknown[] }).products)
        ? (raw as { products: unknown[] }).products
        : Array.isArray((raw as { items?: unknown[] }).items)
          ? (raw as { items: unknown[] }).items
          : Array.isArray((raw as { data?: unknown[] }).data)
            ? (raw as { data: unknown[] }).data
            : []
      : [];

  return list
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const p = item as Record<string, unknown>;
      const id = String(p.id || p.sku || p.product_id || "").trim();
      const name = String(p.name || p.title || "").trim();
      if (!id || !name) return null;
      const cat =
        p.category && typeof p.category === "object"
          ? (p.category as Record<string, unknown>)
          : null;
      return {
        externalId: id,
        name,
        description: typeof p.description === "string" ? p.description : undefined,
        price: (p.price ?? p.selling_price ?? p.price_amount) as string | number | null,
        image:
          typeof p.image_url === "string"
            ? p.image_url
            : typeof p.image === "string"
              ? p.image
              : null,
        categoryId: cat ? String(cat.id || "") : p.category_id ? String(p.category_id) : null,
        categoryName: cat
          ? String(cat.name || "Yemeksepeti")
          : typeof p.category_name === "string"
            ? p.category_name
            : "Yemeksepeti",
        status: typeof p.status === "string" ? p.status : null,
        available: p.active === false || p.is_active === false ? false : true,
      } satisfies NormalizedProduct;
    })
    .filter(Boolean) as NormalizedProduct[];
}

function mapYsOrder(raw: unknown): NormalizedOrder | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = String(o.order_id || o.id || "").trim();
  if (!id) return null;
  const customer = o.customer && typeof o.customer === "object"
    ? (o.customer as Record<string, unknown>)
    : null;
  const addr =
    customer?.delivery_address && typeof customer.delivery_address === "object"
      ? (customer.delivery_address as Record<string, unknown>)
      : null;
  return {
    id,
    orderCode: o.order_code ? String(o.order_code) : undefined,
    status: o.status ? String(o.status) : undefined,
    totalPrice: (o.price ?? o.total_price ?? o.order_value) as number | string | undefined,
    customerName: customer
      ? [customer.first_name, customer.last_name].filter(Boolean).join(" ")
      : undefined,
    address: addr
      ? String(addr.formattedAddress || addr.street || "")
      : undefined,
    phoneNumber: customer?.phone_number ? String(customer.phone_number) : undefined,
    customerNote: o.comment ? String(o.comment) : undefined,
    createdAt: (o.accepted_for || o.promised_for) as string | undefined,
    products: Array.isArray(o.products) ? o.products : Array.isArray(o.items) ? o.items : undefined,
    source: "yemeksepeti",
  };
}

export const yemeksepetiProvider: IntegrationProvider = {
  meta: META,

  async getPublicSettings(): Promise<PublicIntegrationSettings> {
    const blob = await getProviderBlob("yemeksepeti");
    return {
      provider: "yemeksepeti",
      enabled: Boolean(blob?.enabled),
      connected: Boolean(blob?.lastTestOk && blob?.enabled),
      fields: {
        apiBaseUrl: blob?.fields.apiBaseUrl || "",
        chainId: blob?.fields.chainId || "",
        vendorId: blob?.fields.vendorId || "",
        defaultBaseUrl: YS_BASE.production,
      },
      secretsSet: {
        clientId: Boolean(blob?.secretsEnc?.clientId),
        clientSecret: Boolean(blob?.secretsEnc?.clientSecret),
        webhookSecret: Boolean(blob?.secretsEnc?.webhookSecret),
      },
      lastTestAt: blob?.lastTestAt,
      lastTestOk: blob?.lastTestOk,
      lastTestMessage: blob?.lastTestMessage,
      lastSyncAt: blob?.lastSyncAt,
      lastSyncProductCount: blob?.lastSyncProductCount,
      lastOrderPollAt: blob?.lastOrderPollAt,
      updatedAt: blob?.updatedAt,
      unsupportedNotes: [
        "Partner Portal erişimi ve Account Manager onboarding gerekir.",
        "Assortment/Catalog update (YS'ye ürün push) bu panelde yok — mevcut GET katalog sync desteklenir.",
        "Web sitesinden Yemeksepeti'ne sipariş oluşturma Partner API kapsamında değil.",
        "Kart ödemesi alma desteklenmiyor.",
      ],
    };
  },

  async saveSettings(payload) {
    const fields: Record<string, string> = {};
    const secrets: Record<string, string> = {};
    for (const f of META.fields) {
      if (f.key === "enabled") continue;
      const v = payload[f.key];
      if (f.secret) {
        if (typeof v === "string") secrets[f.key] = v;
      } else if (typeof v === "string" || typeof v === "number") {
        fields[f.key] = String(v);
      }
    }
    tokenCache = null;
    await saveProviderSettings("yemeksepeti", {
      enabled: Boolean(payload.enabled),
      fields,
      secrets,
    });
    return this.getPublicSettings();
  },

  async testConnection() {
    const data = await getDecryptedSecrets("yemeksepeti");
    if (!data?.enabled) {
      const message = "Entegrasyon kapalı. Önce aktif edin.";
      await patchProviderMeta("yemeksepeti", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: false,
        lastTestMessage: message,
      });
      return { ok: false, message };
    }
    try {
      if (!data.fields.chainId || !data.fields.vendorId) {
        throw new Error("Chain ID ve Vendor ID gerekli.");
      }
      // Official: GET /v2/chains/{chain_id}/vendors/{vendor_id}/status
      await ysRequest(
        `/v2/chains/${data.fields.chainId}/vendors/${data.fields.vendorId}/status`,
        { method: "GET", idempotent: true }
      );
      const message = "Bağlantı başarılı.";
      await patchProviderMeta("yemeksepeti", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: true,
        lastTestMessage: message,
      });
      return { ok: true, message };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Bağlantı testi başarısız.";
      await patchProviderMeta("yemeksepeti", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: false,
        lastTestMessage: message,
      });
      return { ok: false, message };
    }
  },

  async getMenu(): Promise<NormalizedProduct[]> {
    const data = await getDecryptedSecrets("yemeksepeti");
    if (!data?.enabled) throw new Error("Yemeksepeti entegrasyonu kapalı.");
    if (!data.fields.chainId || !data.fields.vendorId) {
      throw new Error("Chain ID ve Vendor ID gerekli.");
    }
    // Official: GET /v2/chains/{chain_id}/vendors/{vendor_id}/catalog
    const raw = await ysRequest(
      `/v2/chains/${data.fields.chainId}/vendors/${data.fields.vendorId}/catalog`,
      { method: "GET", idempotent: true }
    );
    return catalogProducts(raw);
  },

  async syncMenu(): Promise<SyncReport> {
    const products = await this.getMenu!();
    const report = await upsertProductsIntoCms("yemeksepeti", products);
    await patchProviderMeta("yemeksepeti", {
      lastSyncAt: new Date().toISOString(),
      lastSyncProductCount: report.productCount,
    });
    return report;
  },

  async getOrders(opts) {
    if (opts?.refresh) {
      const data = await getDecryptedSecrets("yemeksepeti");
      if (!data?.enabled) throw new Error("Yemeksepeti entegrasyonu kapalı.");
      if (!data.fields.chainId || !data.fields.vendorId) {
        throw new Error("Chain ID ve Vendor ID gerekli.");
      }
      // Official: GET /v2/chains/{chain_id}/vendors/{vendor_id}/orders
      const raw = await ysRequest<{ orders?: unknown[] }>(
        `/v2/chains/${data.fields.chainId}/vendors/${data.fields.vendorId}/orders`,
        { method: "GET", idempotent: true }
      );
      const items = Array.isArray(raw?.orders) ? raw.orders : Array.isArray(raw) ? raw : [];
      const mapped = items.map(mapYsOrder).filter(Boolean) as NormalizedOrder[];
      await upsertNormalizedOrders(mapped, "poll", items);
      await patchProviderMeta("yemeksepeti", { lastOrderPollAt: new Date().toISOString() });
    }
    return listIntegrationOrders({ source: "yemeksepeti" });
  },

  async validateWebhook(request) {
    const data = await getDecryptedSecrets("yemeksepeti");
    if (!data?.enabled) return { ok: false, reason: "Entegrasyon kapalı." };
    const secret = data.secrets.webhookSecret;
    if (!secret) return { ok: false, reason: "Webhook secret yapılandırılmamış." };

    const auth = request.headers.get("authorization") || "";
    const headerSecret =
      request.headers.get("x-webhook-secret") ||
      request.headers.get("x-api-key") ||
      "";

    // Partner Portal: secret can be raw string OR "Basic <base64>"
    if (secret.startsWith("Basic ")) {
      if (!safeEqual(auth, secret)) return { ok: false, reason: "Yetkisiz webhook." };
      return { ok: true };
    }
    if (auth.startsWith("Bearer ") && safeEqual(auth.slice(7), secret)) return { ok: true };
    if (headerSecret && safeEqual(headerSecret, secret)) return { ok: true };
    if (auth && safeEqual(auth, secret)) return { ok: true };
    return { ok: false, reason: "Yetkisiz webhook." };
  },

  async ingestWebhook(body) {
    const items = Array.isArray(body)
      ? body
      : body && typeof body === "object" && (body as { order_id?: string }).order_id
        ? [body]
        : body && typeof body === "object" && Array.isArray((body as { orders?: unknown[] }).orders)
          ? (body as { orders: unknown[] }).orders
          : [body];
    const mapped = items.map(mapYsOrder).filter(Boolean) as NormalizedOrder[];
    const result = await upsertNormalizedOrders(mapped, "webhook", items);
    integrationLog("Yemeksepeti", "info", "Webhook accepted");
    return result;
  },
};
