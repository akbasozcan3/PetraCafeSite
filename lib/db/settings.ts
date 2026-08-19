import fs from "fs";
import path from "path";
import { DATA_DIR } from "./content";
import { getPool, isPostgresEnabled } from "./postgres";
import { ensureDatabase } from "./ensure-schema";
import { isServerlessReadonly, safeWriteJson, writableDataDir } from "./safe-fs";

const FILE = path.join(writableDataDir(DATA_DIR), "app-settings.json");
const FALLBACK = path.join(DATA_DIR, "app-settings.json");

function readJson(): Record<string, string> {
  for (const file of [FILE, FALLBACK]) {
    try {
      const raw = JSON.parse(fs.readFileSync(file, "utf8"));
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        return Object.fromEntries(
          Object.entries(raw).map(([k, v]) => [k, String(v ?? "")])
        );
      }
    } catch {
      /* try next */
    }
  }
  return {};
}

function writeJson(data: Record<string, string>) {
  if (isServerlessReadonly() && !isPostgresEnabled()) {
    safeWriteJson(FILE, data);
    return;
  }
  safeWriteJson(FILE, data);
}

async function ensureSettingsTable() {
  await ensureDatabase();
  const pool = getPool();
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function getAppSetting(key: string): Promise<string> {
  if (isPostgresEnabled()) {
    await ensureSettingsTable();
    const pool = getPool();
    if (pool) {
      const { rows } = await pool.query<{ value: string }>(
        "SELECT value FROM app_settings WHERE key = $1",
        [key]
      );
      return (rows[0]?.value || "").trim();
    }
  }
  return (readJson()[key] || "").trim();
}

export async function setAppSetting(key: string, value: string): Promise<void> {
  const v = value.trim();
  if (isPostgresEnabled()) {
    await ensureSettingsTable();
    const pool = getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO app_settings (key, value, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [key, v]
      );
      return;
    }
  }
  const data = readJson();
  data[key] = v;
  writeJson(data);
}
