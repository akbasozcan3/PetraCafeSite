-- ============================================================
-- Taşdelen Fırıncı — PostgreSQL Şeması
-- Çalıştırmak için: npm run db:setup
-- ============================================================

-- Uzantı
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Site İçeriği (JSON) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  id          SERIAL PRIMARY KEY,
  key         TEXT NOT NULL UNIQUE DEFAULT 'main',
  data        JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Varsayılan boş kayıt
INSERT INTO site_content (key, data) VALUES ('main', '{}')
  ON CONFLICT (key) DO NOTHING;

-- Otomatik updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_content_updated_at ON site_content;
CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Admin Hesabı ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT 'Admin',
  role          TEXT NOT NULL DEFAULT 'admin',
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  public_id     TEXT UNIQUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin';
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS public_id TEXT;

DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Aktivite günlüğü ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id       TEXT PRIMARY KEY,
  at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id  TEXT,
  email    TEXT,
  name     TEXT,
  action   TEXT NOT NULL,
  detail   TEXT,
  ip       TEXT
);

CREATE INDEX IF NOT EXISTS activity_logs_at_idx ON activity_logs (at DESC);
-- ── Geçiş Kaydı ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS migrations (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO migrations (name) VALUES ('001_initial_schema')
  ON CONFLICT (name) DO NOTHING;
