import fs from "fs";
import path from "path";
import { DATA_DIR } from "./content";
import { getPool, isPostgresEnabled } from "./postgres";

export interface ActivityLogEntry {
  id: string;
  at: string;
  userId?: string;
  email?: string;
  name?: string;
  action: string;
  detail?: string;
  ip?: string;
}

const LOG_FILE = path.join(DATA_DIR, "activity-log.json");
const MAX_ENTRIES = 500;

function readLogs(): ActivityLogEntry[] {
  try {
    const raw = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    if (Array.isArray(raw)) return raw as ActivityLogEntry[];
    if (raw && Array.isArray(raw.entries)) return raw.entries as ActivityLogEntry[];
  } catch {
    /* empty */
  }
  return [];
}

function writeLogs(entries: ActivityLogEntry[]) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    LOG_FILE,
    JSON.stringify({ entries: entries.slice(0, MAX_ENTRIES) }, null, 2),
    "utf8"
  );
}

export async function appendActivity(
  entry: Omit<ActivityLogEntry, "id" | "at"> & { at?: string }
): Promise<ActivityLogEntry> {
  const full: ActivityLogEntry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    at: entry.at || new Date().toISOString(),
    userId: entry.userId,
    email: entry.email,
    name: entry.name,
    action: entry.action,
    detail: entry.detail,
    ip: entry.ip,
  };

  const list = readLogs();
  list.unshift(full);
  writeLogs(list);

  if (isPostgresEnabled()) {
    try {
      const pool = getPool()!;
      await pool.query(`
        CREATE TABLE IF NOT EXISTS activity_logs (
          id TEXT PRIMARY KEY,
          at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          user_id TEXT,
          email TEXT,
          name TEXT,
          action TEXT NOT NULL,
          detail TEXT,
          ip TEXT
        )
      `);
      await pool.query(
        `INSERT INTO activity_logs (id, at, user_id, email, name, action, detail, ip)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          full.id,
          full.at,
          full.userId || null,
          full.email || null,
          full.name || null,
          full.action,
          full.detail || null,
          full.ip || null,
        ]
      );
    } catch (err) {
      console.warn("[activity] PG write failed:", (err as Error).message);
    }
  }

  return full;
}

export async function listActivity(limit = 100): Promise<ActivityLogEntry[]> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool()!;
      const res = await pool.query<{
        id: string;
        at: Date;
        user_id: string | null;
        email: string | null;
        name: string | null;
        action: string;
        detail: string | null;
        ip: string | null;
      }>(
        `SELECT id, at, user_id, email, name, action, detail, ip
         FROM activity_logs ORDER BY at DESC LIMIT $1`,
        [limit]
      );
      if (res.rows.length) {
        return res.rows.map((r) => ({
          id: r.id,
          at: r.at.toISOString(),
          userId: r.user_id || undefined,
          email: r.email || undefined,
          name: r.name || undefined,
          action: r.action,
          detail: r.detail || undefined,
          ip: r.ip || undefined,
        }));
      }
    } catch {
      /* fallback JSON */
    }
  }
  return readLogs().slice(0, limit);
}
