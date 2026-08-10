import { TrendyolMealClient } from "@/lib/trendyol/client";
import { normalizeMenuPayload } from "@/lib/trendyol/sync-menu";
import {
  getDecryptedSecrets,
  migrateLegacyTrendyolIfNeeded,
  patchProviderMeta,
  saveProviderSettings,
  getProviderBlob,
} from "../store";
import { upsertProductsIntoCms } from "../sync-cms";
import { listIntegrationOrders, upsertNormalizedOrders } from "../orders-store";
import { integrationLog } from "../logger";
import { safeEqual } from "../crypto";
import type {
  IntegrationMeta,
  IntegrationProvider,
  NormalizedOrder,
  NormalizedProduct,
  PublicIntegrationSettings,
  SyncReport,
} from "../types";
import { TRENDYOL_MEAL_BASE, resolveMealBaseUrl } from "@/lib/trendyol/types";

const META: IntegrationMeta = {
  id: "trendyol_go",
  name: "Trendyol Go",
  description: "Trendyol Yemek Meal GW — menü, sipariş ve webhook.",
  docsUrl: "https://developers.trendyol.com/",
  webhookPath: "/api/integrations/trendyol/webhook",
  capabilities: [
    "testConnection",
    "getMenu",
    "syncMenu",
    "getOrders",
    "updateOrderStatus",
    "webhook",
  ],
  fields: [
    {
      key: "enabled",
      label: "Entegrasyon aktif",
      type: "checkbox",
    },
    {
      key: "environment",
      label: "Ortam",
      type: "select",
      required: true,
      options: [
        { value: "production", label: "Production" },
        { value: "stage", label: "Stage" },
      ],
    },
    {
      key: "apiBaseUrl",
      label: "API Base URL (opsiyonel)",
      type: "url",
      help: "Boşsa ortama göre mealgw varsayılanı kullanılır",
    },
    { key: "supplierId", label: "Supplier ID", type: "text", required: true },
    { key: "restaurantId", label: "Restaurant / Store ID", type: "text", required: true },
    { key: "apiKey", label: "API Key", type: "password", required: true, secret: true },
    { key: "apiSecret", label: "API Secret", type: "password", required: true, secret: true },
    {
      key: "agentName",
      label: "User-Agent adı",
      type: "text",
      help: "Boş = SelfIntegration",
    },
    { key: "webhookUsername", label: "Webhook Basic Auth kullanıcı", type: "text" },
    {
      key: "webhookPassword",
      label: "Webhook Basic Auth şifre",
      type: "password",
      secret: true,
    },
  ],
};

function asOrderArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.content)) return o.content;
    if (Array.isArray(o.packages)) return o.packages;
    if (Array.isArray(o.items)) return o.items;
  }
  return [];
}

function mapOrder(raw: unknown): NormalizedOrder | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = String(o.id || o.packageId || o.orderId || "").trim();
  if (!id) return null;
  return {
    id,
    orderCode: o.orderCode ? String(o.orderCode) : undefined,
    status: String(o.packageStatus || o.status || ""),
    totalPrice: (o.totalPrice ?? o.amount) as number | string | undefined,
    customerName: o.customerName ? String(o.customerName) : undefined,
    address: o.address ? String(o.address) : undefined,
    phoneNumber: o.phoneNumber ? String(o.phoneNumber) : undefined,
    customerNote: o.customerNote ? String(o.customerNote) : undefined,
    paymentMethodText: o.paymentMethodText ? String(o.paymentMethodText) : undefined,
    createdAt: (o.packageCreationDate ?? o.createdDate) as string | number | undefined,
    products: Array.isArray(o.productsDisplays)
      ? o.productsDisplays
      : Array.isArray(o.lines)
        ? o.lines
        : undefined,
    source: "trendyol_go",
  };
}

async function clientFromStore() {
  await migrateLegacyTrendyolIfNeeded();
  const data = await getDecryptedSecrets("trendyol_go");
  if (!data?.secrets.apiKey || !data.secrets.apiSecret || !data.fields.supplierId) {
    throw new Error("Trendyol Go kimlik bilgileri eksik.");
  }
  return new TrendyolMealClient({
    enabled: data.enabled,
    environment: (data.fields.environment as "production" | "stage") || "production",
    apiBaseUrl: data.fields.apiBaseUrl,
    supplierId: data.fields.supplierId,
    restaurantId: data.fields.restaurantId,
    apiKey: data.secrets.apiKey,
    apiSecret: data.secrets.apiSecret,
    agentName: data.fields.agentName,
    webhookUsername: data.fields.webhookUsername,
    webhookPassword: data.secrets.webhookPassword,
  });
}

export const trendyolGoProvider: IntegrationProvider = {
  meta: META,

  async getPublicSettings(): Promise<PublicIntegrationSettings> {
    await migrateLegacyTrendyolIfNeeded();
    const blob = await getProviderBlob("trendyol_go");
    const env = (blob?.fields.environment as "production" | "stage") || "production";
    return {
      provider: "trendyol_go",
      enabled: Boolean(blob?.enabled),
      connected: Boolean(blob?.lastTestOk && blob?.enabled),
      fields: {
        environment: env,
        apiBaseUrl: blob?.fields.apiBaseUrl || "",
        supplierId: blob?.fields.supplierId || "",
        restaurantId: blob?.fields.restaurantId || "",
        agentName: blob?.fields.agentName || "",
        webhookUsername: blob?.fields.webhookUsername || "",
        defaultBaseUrl: resolveMealBaseUrl(env),
      },
      secretsSet: {
        apiKey: Boolean(blob?.secretsEnc?.apiKey),
        apiSecret: Boolean(blob?.secretsEnc?.apiSecret),
        webhookPassword: Boolean(blob?.secretsEnc?.webhookPassword),
      },
      lastTestAt: blob?.lastTestAt,
      lastTestOk: blob?.lastTestOk,
      lastTestMessage: blob?.lastTestMessage,
      lastSyncAt: blob?.lastSyncAt,
      lastSyncProductCount: blob?.lastSyncProductCount,
      lastOrderPollAt: blob?.lastOrderPollAt,
      updatedAt: blob?.updatedAt,
      unsupportedNotes: [
        "Web sitesinden Trendyol'a sipariş push Meal GW self-serve dokümanda yok.",
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
    await saveProviderSettings("trendyol_go", {
      enabled: Boolean(payload.enabled),
      fields,
      secrets,
    });
    return this.getPublicSettings();
  },

  async testConnection() {
    const data = await getDecryptedSecrets("trendyol_go");
    if (!data?.enabled) {
      const message = "Entegrasyon kapalı. Önce aktif edin.";
      await patchProviderMeta("trendyol_go", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: false,
        lastTestMessage: message,
      });
      return { ok: false, message };
    }
    try {
      const client = await clientFromStore();
      await client.testConnection();
      const message = "Bağlantı başarılı.";
      await patchProviderMeta("trendyol_go", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: true,
        lastTestMessage: message,
      });
      return { ok: true, message };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Bağlantı testi başarısız.";
      await patchProviderMeta("trendyol_go", {
        lastTestAt: new Date().toISOString(),
        lastTestOk: false,
        lastTestMessage: message,
      });
      return { ok: false, message };
    }
  },

  async getMenu(): Promise<NormalizedProduct[]> {
    const data = await getDecryptedSecrets("trendyol_go");
    if (!data?.enabled) throw new Error("Trendyol Go entegrasyonu kapalı.");
    const client = await clientFromStore();
    const raw = await client.getProducts();
    // normalizeMenuPayload gerçek Trendyol alanlarını (images/imageUrl/…) map eder
    return normalizeMenuPayload(raw)
      .map((item) => {
        const p = item as {
          id?: string;
          name?: string;
          description?: string;
          sellingPrice?: string | number | null;
          image?: string | null;
          categoryId?: string | null;
          categoryName?: string;
          status?: string | null;
        };
        return {
          externalId: String(p.id || ""),
          name: String(p.name || ""),
          description: p.description || undefined,
          price: p.sellingPrice,
          image: p.image || null,
          categoryId: p.categoryId || null,
          categoryName: p.categoryName,
          status: p.status || null,
          available: true,
        };
      })
      .filter((p) => p.externalId && p.name);
  },

  async syncMenu(): Promise<SyncReport> {
    const products = await this.getMenu!();
    const report = await upsertProductsIntoCms("trendyol_go", products);
    await patchProviderMeta("trendyol_go", {
      lastSyncAt: new Date().toISOString(),
      lastSyncProductCount: report.productCount,
    });
    return report;
  },

  async getOrders(opts) {
    if (opts?.refresh) {
      const data = await getDecryptedSecrets("trendyol_go");
      if (!data?.enabled) throw new Error("Trendyol Go entegrasyonu kapalı.");
      const client = await clientFromStore();
      const raw = await client.getPackages(opts.status || "Created");
      const items = asOrderArray(raw);
      const mapped = items.map(mapOrder).filter(Boolean) as NormalizedOrder[];
      await upsertNormalizedOrders(mapped, "poll", items);
      await patchProviderMeta("trendyol_go", { lastOrderPollAt: new Date().toISOString() });
    }
    const rows = await listIntegrationOrders({ source: "trendyol_go" });
    return rows;
  },

  async updateOrderStatus(action, orderId, extra) {
    const client = await clientFromStore();
    switch (action) {
      case "picked":
        await client.pickPackage(orderId, Number(extra?.preparationTime) || 30);
        break;
      case "invoiced":
        await client.invoicePackage(orderId);
        break;
      case "ship":
        await client.manualShip(orderId);
        break;
      case "deliver":
        await client.manualDeliver(orderId);
        break;
      case "cancel":
        await client.unsupplyPackage(
          orderId,
          Array.isArray(extra?.itemIdList) ? (extra!.itemIdList as string[]) : [],
          typeof extra?.reasonId === "number" ? extra.reasonId : undefined
        );
        break;
      default:
        throw new Error("Desteklenmeyen aksiyon.");
    }
  },

  async validateWebhook(request) {
    const data = await getDecryptedSecrets("trendyol_go");
    if (!data?.enabled) return { ok: false, reason: "Entegrasyon kapalı." };
    if (!data.fields.webhookUsername || !data.secrets.webhookPassword) {
      return { ok: false, reason: "Webhook kimlik bilgileri yapılandırılmamış." };
    }
    const header = request.headers.get("authorization") || "";
    if (!header.startsWith("Basic ")) return { ok: false, reason: "Yetkisiz webhook." };
    try {
      const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (
        !safeEqual(user, data.fields.webhookUsername) ||
        !safeEqual(pass, data.secrets.webhookPassword)
      ) {
        return { ok: false, reason: "Yetkisiz webhook." };
      }
      return { ok: true };
    } catch {
      return { ok: false, reason: "Yetkisiz webhook." };
    }
  },

  async ingestWebhook(body) {
    const items = Array.isArray(body)
      ? body
      : body && typeof body === "object" && Array.isArray((body as { packages?: unknown[] }).packages)
        ? (body as { packages: unknown[] }).packages
        : [body];
    const mapped = items.map(mapOrder).filter(Boolean) as NormalizedOrder[];
    const result = await upsertNormalizedOrders(mapped, "webhook", items);
    integrationLog("Trendyol Go", "info", "Webhook accepted");
    return result;
  },
};

export { TRENDYOL_MEAL_BASE };
