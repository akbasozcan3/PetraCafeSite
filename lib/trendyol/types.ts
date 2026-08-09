/**
 * Trendyol Go / Yemek (Meal GW) — tip tanımları
 * Kaynak: api.trendyol.com/mealgw partner API (Basic Auth + supplierId/restaurantId)
 */

export type TrendyolEnvironment = "production" | "stage";

export interface TrendyolGoCredentials {
  enabled: boolean;
  environment: TrendyolEnvironment;
  /** Override; boşsa ortama göre varsayılan mealgw URL kullanılır */
  apiBaseUrl?: string;
  supplierId: string;
  restaurantId: string;
  apiKey: string;
  apiSecret: string;
  /** User-Agent şirketi; boşsa SelfIntegration */
  agentName?: string;
  /** Sipariş webhook Basic Auth (Trendyol panelden URL'ye istek atarsa) */
  webhookUsername?: string;
  webhookPassword?: string;
}

export interface TrendyolGoStoredSettings {
  enabled: boolean;
  environment: TrendyolEnvironment;
  apiBaseUrl: string;
  supplierId: string;
  restaurantId: string;
  /** AES-GCM ciphertext */
  apiKeyEnc: string;
  apiSecretEnc: string;
  agentName: string;
  webhookUsername: string;
  webhookPasswordEnc: string;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  lastOrderPollAt?: string;
  updatedAt: string;
}

/** Admin GET yanıtı — secret'lar asla plaintext dönmez */
export interface TrendyolGoPublicSettings {
  enabled: boolean;
  environment: TrendyolEnvironment;
  apiBaseUrl: string;
  supplierId: string;
  restaurantId: string;
  agentName: string;
  webhookUsername: string;
  apiKeySet: boolean;
  apiSecretSet: boolean;
  webhookPasswordSet: boolean;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  lastOrderPollAt?: string;
  updatedAt?: string;
  defaultBaseUrl: string;
  webhookPath: string;
}

export interface TrendyolGoSavePayload {
  enabled?: boolean;
  environment?: TrendyolEnvironment;
  apiBaseUrl?: string;
  supplierId?: string;
  restaurantId?: string;
  /** Boş bırakılırsa mevcut secret korunur */
  apiKey?: string;
  apiSecret?: string;
  agentName?: string;
  webhookUsername?: string;
  webhookPassword?: string;
}

export const TRENDYOL_MEAL_BASE = {
  production: "https://api.trendyol.com/mealgw",
  stage: "https://stageapi.trendyol.com/mealgw",
} as const;

export function resolveMealBaseUrl(
  environment: TrendyolEnvironment,
  override?: string
): string {
  const trimmed = (override || "").trim().replace(/\/$/, "");
  if (trimmed) return trimmed;
  return TRENDYOL_MEAL_BASE[environment];
}
