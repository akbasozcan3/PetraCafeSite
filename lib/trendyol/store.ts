import fs from "fs";
import path from "path";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";
import { decryptSecret, encryptSecret } from "./crypto";
import {
  resolveMealBaseUrl,
  type TrendyolGoCredentials,
  type TrendyolGoPublicSettings,
  type TrendyolGoSavePayload,
  type TrendyolGoStoredSettings,
  type TrendyolEnvironment,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "integrations");
const FILE = path.join(DATA_DIR, "trendyol-go.json");
const PG_KEY = "trendyol_go";

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function readRaw(): Promise<TrendyolGoStoredSettings | null> {
  if (isPostgresEnabled()) {
    const pool = getPool();
    if (pool) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS integration_settings (
          key TEXT PRIMARY KEY,
          payload JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      const res = await pool.query<{ payload: TrendyolGoStoredSettings }>(
        `SELECT payload FROM integration_settings WHERE key = $1`,
        [PG_KEY]
      );
      return res.rows[0]?.payload || null;
    }
  }
  try {
    if (!fs.existsSync(FILE)) return null;
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as TrendyolGoStoredSettings;
  } catch {
    return null;
  }
}

async function writeRaw(settings: TrendyolGoStoredSettings): Promise<void> {
  if (isPostgresEnabled()) {
    const pool = getPool();
    if (pool) {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS integration_settings (
          key TEXT PRIMARY KEY,
          payload JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await pool.query(
        `INSERT INTO integration_settings (key, payload, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
        [PG_KEY, JSON.stringify(settings)]
      );
      return;
    }
  }
  ensureDir();
  fs.writeFileSync(FILE, JSON.stringify(settings, null, 2), "utf8");
}

export function toPublic(settings: TrendyolGoStoredSettings | null): TrendyolGoPublicSettings {
  const env: TrendyolEnvironment = settings?.environment || "production";
  return {
    enabled: Boolean(settings?.enabled),
    environment: env,
    apiBaseUrl: settings?.apiBaseUrl || "",
    supplierId: settings?.supplierId || "",
    restaurantId: settings?.restaurantId || "",
    agentName: settings?.agentName || "",
    webhookUsername: settings?.webhookUsername || "",
    apiKeySet: Boolean(settings?.apiKeyEnc),
    apiSecretSet: Boolean(settings?.apiSecretEnc),
    webhookPasswordSet: Boolean(settings?.webhookPasswordEnc),
    lastTestAt: settings?.lastTestAt,
    lastTestOk: settings?.lastTestOk,
    lastTestMessage: settings?.lastTestMessage,
    lastSyncAt: settings?.lastSyncAt,
    lastSyncProductCount: settings?.lastSyncProductCount,
    lastOrderPollAt: settings?.lastOrderPollAt,
    updatedAt: settings?.updatedAt,
    defaultBaseUrl: resolveMealBaseUrl(env),
    webhookPath: "/api/integrations/trendyol/webhook",
  };
}

export async function getPublicSettings(): Promise<TrendyolGoPublicSettings> {
  return toPublic(await readRaw());
}

export async function getDecryptedCredentials(): Promise<TrendyolGoCredentials | null> {
  const raw = await readRaw();
  if (!raw) return null;
  try {
    return {
      enabled: raw.enabled,
      environment: raw.environment,
      apiBaseUrl: raw.apiBaseUrl,
      supplierId: raw.supplierId,
      restaurantId: raw.restaurantId,
      apiKey: decryptSecret(raw.apiKeyEnc),
      apiSecret: decryptSecret(raw.apiSecretEnc),
      agentName: raw.agentName,
      webhookUsername: raw.webhookUsername,
      webhookPassword: decryptSecret(raw.webhookPasswordEnc),
    };
  } catch {
    return null;
  }
}

export async function saveSettings(
  payload: TrendyolGoSavePayload
): Promise<TrendyolGoPublicSettings> {
  const prev = (await readRaw()) || ({
    enabled: false,
    environment: "production",
    apiBaseUrl: "",
    supplierId: "",
    restaurantId: "",
    apiKeyEnc: "",
    apiSecretEnc: "",
    agentName: "",
    webhookUsername: "",
    webhookPasswordEnc: "",
    updatedAt: new Date().toISOString(),
  } satisfies TrendyolGoStoredSettings);

  const next: TrendyolGoStoredSettings = {
    ...prev,
    enabled: payload.enabled ?? prev.enabled,
    environment: payload.environment ?? prev.environment,
    apiBaseUrl: payload.apiBaseUrl !== undefined ? payload.apiBaseUrl.trim() : prev.apiBaseUrl,
    supplierId: payload.supplierId !== undefined ? payload.supplierId.trim() : prev.supplierId,
    restaurantId:
      payload.restaurantId !== undefined ? payload.restaurantId.trim() : prev.restaurantId,
    agentName: payload.agentName !== undefined ? payload.agentName.trim() : prev.agentName,
    webhookUsername:
      payload.webhookUsername !== undefined
        ? payload.webhookUsername.trim()
        : prev.webhookUsername,
    updatedAt: new Date().toISOString(),
  };

  if (typeof payload.apiKey === "string" && payload.apiKey.trim()) {
    next.apiKeyEnc = encryptSecret(payload.apiKey.trim());
  }
  if (typeof payload.apiSecret === "string" && payload.apiSecret.trim()) {
    next.apiSecretEnc = encryptSecret(payload.apiSecret.trim());
  }
  if (typeof payload.webhookPassword === "string" && payload.webhookPassword.trim()) {
    next.webhookPasswordEnc = encryptSecret(payload.webhookPassword.trim());
  }

  await writeRaw(next);
  return toPublic(next);
}

export async function patchMeta(
  patch: Partial<
    Pick<
      TrendyolGoStoredSettings,
      | "lastTestAt"
      | "lastTestOk"
      | "lastTestMessage"
      | "lastSyncAt"
      | "lastSyncProductCount"
      | "lastOrderPollAt"
    >
  >
): Promise<void> {
  const prev = await readRaw();
  if (!prev) return;
  await writeRaw({ ...prev, ...patch, updatedAt: new Date().toISOString() });
}
