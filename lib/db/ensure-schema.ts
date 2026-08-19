import fs from "fs";
import path from "path";
import { getPool, isPostgresEnabled } from "./postgres";

let ready: Promise<void> | null = null;

const TABLES = [
  `CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL UNIQUE DEFAULT 'main',
    data JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `INSERT INTO site_content (key, data) VALUES ('main', '{}') ON CONFLICT (key) DO NOTHING`,
  `CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT 'Admin',
    role TEXT NOT NULL DEFAULT 'admin',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    public_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin'`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS public_id TEXT`,
  `CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id TEXT,
    email TEXT,
    name TEXT,
    action TEXT NOT NULL,
    detail TEXT,
    ip TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS activity_logs_at_idx ON activity_logs (at DESC)`,
  `CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    visit_date TEXT NOT NULL,
    visit_time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
  )`,
  `CREATE INDEX IF NOT EXISTS reservations_created_idx ON reservations (created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
  )`,
  `CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC)`,
];

async function applySchema(): Promise<void> {
  const pool = getPool();
  if (!pool) return;

  const schemaFile = path.join(process.cwd(), "lib", "db", "schema.sql");
  try {
    if (fs.existsSync(schemaFile)) {
      const sql = fs.readFileSync(schemaFile, "utf8");
      await pool.query(sql);
      return;
    }
  } catch (err) {
    console.warn("[DB] Tam şema uygulanamadı, temel tablolar kuruluyor:", (err as Error).message);
  }

  for (const sql of TABLES) {
    try {
      await pool.query(sql);
    } catch (err) {
      console.warn("[DB] Şema adımı:", sql.slice(0, 48), (err as Error).message);
    }
  }
}

/** First DB use on Vercel/Neon: create tables if the empty database is new. */
export function ensureDatabase(): Promise<void> {
  if (!isPostgresEnabled()) return Promise.resolve();
  if (!ready) {
    ready = applySchema().catch((err) => {
      ready = null;
      throw err;
    });
  }
  return ready;
}
