/** Ortak entegrasyon sözleşmesi — yeni platformlar buraya eklenir */

export type IntegrationId = "trendyol_go" | "yemeksepeti";

export type IntegrationCapability =
  | "testConnection"
  | "getMenu"
  | "syncMenu"
  | "getOrders"
  | "updateOrderStatus"
  | "webhook";

export type IntegrationFieldType = "text" | "password" | "select" | "checkbox" | "url";

export type IntegrationFieldDef = {
  key: string;
  label: string;
  type: IntegrationFieldType;
  required?: boolean;
  secret?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
};

export type IntegrationMeta = {
  id: IntegrationId;
  name: string;
  description: string;
  docsUrl?: string;
  webhookPath: string;
  capabilities: IntegrationCapability[];
  fields: IntegrationFieldDef[];
};

export type PublicIntegrationSettings = {
  provider: IntegrationId;
  enabled: boolean;
  connected: boolean;
  fields: Record<string, string | boolean>;
  secretsSet: Record<string, boolean>;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  lastOrderPollAt?: string;
  updatedAt?: string;
  unsupportedNotes: string[];
};

export type SyncReport = {
  productCount: number;
  categoryCount: number;
  created: number;
  updated: number;
  skipped: number;
  unmatched: number;
};

export type NormalizedProduct = {
  externalId: string;
  name: string;
  description?: string;
  price?: string | number | null;
  image?: string | null;
  categoryId?: string | null;
  categoryName?: string;
  status?: string | null;
  available?: boolean;
};

export type NormalizedOrder = {
  id: string;
  orderCode?: string;
  status?: string;
  totalPrice?: number | string;
  customerName?: string;
  address?: string;
  phoneNumber?: string;
  customerNote?: string;
  paymentMethodText?: string;
  createdAt?: string | number;
  products?: unknown[];
  source: IntegrationId;
};

export interface IntegrationProvider {
  meta: IntegrationMeta;
  getPublicSettings(): Promise<PublicIntegrationSettings>;
  saveSettings(payload: Record<string, unknown>): Promise<PublicIntegrationSettings>;
  testConnection(): Promise<{ ok: boolean; message: string }>;
  getMenu?(): Promise<NormalizedProduct[]>;
  syncMenu?(): Promise<SyncReport>;
  getOrders?(opts?: { refresh?: boolean; status?: string }): Promise<NormalizedOrder[]>;
  updateOrderStatus?(
    action: string,
    orderId: string,
    extra?: Record<string, unknown>
  ): Promise<void>;
  validateWebhook?(request: Request, body: unknown): Promise<{ ok: boolean; reason?: string }>;
  ingestWebhook?(body: unknown): Promise<{ upserted: number; duplicates: number }>;
}
