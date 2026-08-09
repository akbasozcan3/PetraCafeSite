import { randomUUID } from "crypto";
import { trendyolLog } from "./logger";
import { getDecryptedCredentials } from "./store";
import {
  resolveMealBaseUrl,
  type TrendyolGoCredentials,
} from "./types";

export class TrendyolApiError extends Error {
  status: number;
  endpoint: string;
  correlationId: string;

  constructor(message: string, status: number, endpoint: string, correlationId: string) {
    super(message);
    this.name = "TrendyolApiError";
    this.status = status;
    this.endpoint = endpoint;
    this.correlationId = correlationId;
  }
}

type RequestOpts = {
  method?: string;
  path: string;
  query?: Record<string, string | undefined>;
  body?: unknown;
  /** Mutating: no blind retry */
  idempotent?: boolean;
  timeoutMs?: number;
};

function buildUserAgent(creds: TrendyolGoCredentials): string {
  const seller = creds.supplierId || "0";
  const name = (creds.agentName || "SelfIntegration").replace(/[^\w\s-]/g, "").slice(0, 30);
  return `${seller} - ${name || "SelfIntegration"}`;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export class TrendyolMealClient {
  constructor(private creds: TrendyolGoCredentials) {}

  static async fromStore(): Promise<TrendyolMealClient> {
    const creds = await getDecryptedCredentials();
    if (!creds?.apiKey || !creds?.apiSecret || !creds.supplierId) {
      throw new Error("Trendyol Go kimlik bilgileri eksik. Admin ayarlarından kaydedin.");
    }
    return new TrendyolMealClient(creds);
  }

  get restaurantId() {
    return this.creds.restaurantId;
  }

  get supplierId() {
    return this.creds.supplierId;
  }

  private baseUrl() {
    return resolveMealBaseUrl(this.creds.environment, this.creds.apiBaseUrl);
  }

  async request<T = unknown>(opts: RequestOpts): Promise<T> {
    const correlationId = randomUUID();
    const method = opts.method || "GET";
    const qs = new URLSearchParams();
    if (opts.query) {
      for (const [k, v] of Object.entries(opts.query)) {
        if (v !== undefined && v !== "") qs.set(k, v);
      }
    }
    const q = qs.toString();
    const endpoint = `${opts.path}${q ? `?${q}` : ""}`;
    const url = `${this.baseUrl()}${endpoint}`;
    const auth = Buffer.from(`${this.creds.apiKey}:${this.creds.apiSecret}`).toString("base64");
    const headers: Record<string, string> = {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": buildUserAgent(this.creds),
      "x-agentname": this.creds.agentName || "FirinciSelfIntegration",
      "x-correlationid": correlationId,
    };

    const maxAttempts = opts.idempotent === false ? 1 : 3;
    let lastErr: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 20000);
      try {
        const res = await fetch(url, {
          method,
          headers,
          body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timer);
        const text = await res.text();
        let data: unknown = null;
        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = text;
          }
        }

        if (!res.ok) {
          const msg =
            typeof data === "object" && data && "message" in data
              ? String((data as { message: unknown }).message)
              : typeof data === "object" && data && "exception" in data
                ? String((data as { exception: unknown }).exception)
                : `Trendyol API hatası (${res.status})`;

          trendyolLog("error", "Request failed", {
            status: res.status,
            endpoint: opts.path,
            correlationId,
          });

          if ((res.status === 429 || res.status >= 500) && attempt < maxAttempts) {
            await sleep(300 * 2 ** (attempt - 1));
            continue;
          }

          throw new TrendyolApiError(
            res.status === 401 ? "Kimlik bilgileri geçersiz." : msg,
            res.status,
            opts.path,
            correlationId
          );
        }

        return data as T;
      } catch (err) {
        clearTimeout(timer);
        lastErr = err instanceof Error ? err : new Error(String(err));
        if (lastErr.name === "AbortError") {
          lastErr = new TrendyolApiError("Trendyol API zaman aşımı.", 408, opts.path, correlationId);
        }
        if (attempt < maxAttempts && !(lastErr instanceof TrendyolApiError && lastErr.status < 500 && lastErr.status !== 429)) {
          await sleep(300 * 2 ** (attempt - 1));
          continue;
        }
        throw lastErr;
      }
    }
    throw lastErr || new Error("Trendyol isteği başarısız.");
  }

  /** Bağlantı testi — restoran listesini çeker (read-only) */
  testConnection() {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/restaurants`,
      method: "GET",
      idempotent: true,
    });
  }

  getRestaurants() {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/restaurants`,
      method: "GET",
      idempotent: true,
    });
  }

  getProducts() {
    if (!this.creds.restaurantId) throw new Error("Restaurant ID gerekli.");
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/restaurants/${this.creds.restaurantId}/products`,
      method: "GET",
      idempotent: true,
    });
  }

  getPackages(packageStatuses?: string) {
    if (!this.creds.restaurantId) throw new Error("Restaurant ID gerekli.");
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages`,
      method: "GET",
      query: {
        storeId: this.creds.restaurantId,
        packageStatuses: packageStatuses || undefined,
      },
      idempotent: true,
    });
  }

  getPackage(packageId: string) {
    if (!this.creds.restaurantId) throw new Error("Restaurant ID gerekli.");
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/${packageId}`,
      method: "GET",
      query: { storeId: this.creds.restaurantId },
      idempotent: true,
    });
  }

  /** Hazırlanıyor (picked) — preparationTime dakika */
  pickPackage(packageId: string, preparationTime = 30) {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/picked`,
      method: "PUT",
      body: { packageId, preparationTime },
      idempotent: false,
    });
  }

  invoicePackage(packageId: string) {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/invoiced`,
      method: "PUT",
      body: { packageId },
      idempotent: false,
    });
  }

  manualShip(packageId: string) {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/${packageId}/manual-shipped`,
      method: "PUT",
      body: {},
      idempotent: false,
    });
  }

  manualDeliver(packageId: string) {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/${packageId}/manual-delivered`,
      method: "PUT",
      body: {},
      idempotent: false,
    });
  }

  unsupplyPackage(packageId: string, itemIdList: string[] = [], reasonId?: number) {
    return this.request<unknown>({
      path: `/suppliers/${this.creds.supplierId}/packages/unsupplied`,
      method: "PUT",
      body: { packageId, itemIdList, reasonId },
      idempotent: false,
    });
  }
}
