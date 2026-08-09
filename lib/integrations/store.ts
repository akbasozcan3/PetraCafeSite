import fs from "fs";
import path from "path";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";
import { decryptSecret, encryptSecret } from "./crypto";
import type { IntegrationId } from "./types";

export type StoredProviderBlob = {
  enabled: boolean;
  /** Non-secret fields */
  fields: Record<string, string>;
  /** Encrypted secret fields */
  secretsEnc: Record<string, string>;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  lastOrderPollAt?: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "integrations");

function fileFor(id: IntegrationId) {
  return path.join(DATA_DIR, `${id}.json`);
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function readRaw(id: IntegrationId): Promise<StoredProviderBlob | null> {
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
      const res = await pool.query<{ payload: StoredProviderBlob }>(
        `SELECT payload FROM integration_settings WHERE key = $1`,
        [id]
      );
      if (res.rows[0]?.payload) return res.rows[0].payload;
    }
  }
  try {
    const f = fileFor(id);
    if (!fs.existsSync(f)) return null;
    return JSON.parse(fs.readFileSync(f, "utf8")) as StoredProviderBlob;
  } catch {
    return null;
  }
}

async function writeRaw(id: IntegrationId, payload: StoredProviderBlob): Promise<void> {
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
        [id, JSON.stringify(payload)]
      );
      return;
    }
  }
  ensureDir();
  fs.writeFileSync(fileFor(id), JSON.stringify(payload, null, 2), "utf8");
}

export async function getProviderBlob(id: IntegrationId): Promise<StoredProviderBlob | null> {
  return readRaw(id);
}

export async function getDecryptedSecrets(
  id: IntegrationId
): Promise<{ enabled: boolean; fields: Record<string, string>; secrets: Record<string, string> } | null> {
  const raw = await readRaw(id);
  if (!raw) return null;
  const secrets: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw.secretsEnc || {})) {
    try {
      secrets[k] = decryptSecret(v);
    } catch {
      secrets[k] = "";
    }
  }
  return { enabled: raw.enabled, fields: { ...raw.fields }, secrets };
}

export async function saveProviderSettings(
  id: IntegrationId,
  opts: {
    enabled?: boolean;
    fields?: Record<string, string>;
    /** Only non-empty secrets overwrite */
    secrets?: Record<string, string>;
  }
): Promise<StoredProviderBlob> {
  const prev =
    (await readRaw(id)) ||
    ({
      enabled: false,
      fields: {},
      secretsEnc: {},
      updatedAt: new Date().toISOString(),
    } satisfies StoredProviderBlob);

  const next: StoredProviderBlob = {
    ...prev,
    enabled: opts.enabled ?? prev.enabled,
    fields: { ...prev.fields, ...(opts.fields || {}) },
    secretsEnc: { ...prev.secretsEnc },
    updatedAt: new Date().toISOString(),
  };

  if (opts.secrets) {
    for (const [k, v] of Object.entries(opts.secrets)) {
      if (typeof v === "string" && v.trim()) {
        next.secretsEnc[k] = encryptSecret(v.trim());
      }
    }
  }

  await writeRaw(id, next);
  return next;
}

export async function patchProviderMeta(
  id: IntegrationId,
  patch: Partial<
    Pick<
      StoredProviderBlob,
      | "lastTestAt"
      | "lastTestOk"
      | "lastTestMessage"
      | "lastSyncAt"
      | "lastSyncProductCount"
      | "lastOrderPollAt"
    >
  >
): Promise<void> {
  const prev = await readRaw(id);
  if (!prev) return;
  await writeRaw(id, { ...prev, ...patch, updatedAt: new Date().toISOString() });
}

/** Migrate legacy trendyol-go.json → trendyol_go key if needed */
export async function migrateLegacyTrendyolIfNeeded(): Promise<void> {
  const existing = await readRaw("trendyol_go");
  if (existing) return;
  const legacyFile = path.join(DATA_DIR, "trendyol-go.json");
  if (!fs.existsSync(legacyFile)) return;
  try {
    const legacy = JSON.parse(fs.readFileSync(legacyFile, "utf8")) as Record<string, unknown>;
    const blob: StoredProviderBlob = {
      enabled: Boolean(legacy.enabled),
      fields: {
        environment: String(legacy.environment || "production"),
        apiBaseUrl: String(legacy.apiBaseUrl || ""),
        supplierId: String(legacy.supplierId || ""),
        restaurantId: String(legacy.restaurantId || ""),
        agentName: String(legacy.agentName || ""),
        webhookUsername: String(legacy.webhookUsername || ""),
      },
      secretsEnc: {
        apiKey: String(legacy.apiKeyEnc || ""),
        apiSecret: String(legacy.apiSecretEnc || ""),
        webhookPassword: String(legacy.webhookPasswordEnc || ""),
      },
      lastTestAt: legacy.lastTestAt as string | undefined,
      lastTestOk: legacy.lastTestOk as boolean | undefined,
      lastTestMessage: legacy.lastTestMessage as string | undefined,
      lastSyncAt: legacy.lastSyncAt as string | undefined,
      lastSyncProductCount: legacy.lastSyncProductCount as number | undefined,
      lastOrderPollAt: legacy.lastOrderPollAt as string | undefined,
      updatedAt: String(legacy.updatedAt || new Date().toISOString()),
    };
    // Drop empty secret keys
    for (const k of Object.keys(blob.secretsEnc)) {
      if (!blob.secretsEnc[k]) delete blob.secretsEnc[k];
    }
    await writeRaw("trendyol_go", blob);
  } catch {
    /* ignore */
  }
}
