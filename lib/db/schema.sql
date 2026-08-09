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

-- ── Entegrasyon ayarları (şifreli credential JSON) ──────────
CREATE TABLE IF NOT EXISTS integration_settings (
  key         TEXT PRIMARY KEY,
  payload     JSONB NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Geçiş Kaydı ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS migrations (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO migrations (name) VALUES ('001_initial_schema')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO migrations (name) VALUES ('002_integration_settings')
  ON CONFLICT (name) DO NOTHING;

-- ── Müşteri hesapları (admin'den ayrı) ───────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id                 SERIAL PRIMARY KEY,
  public_id          TEXT NOT NULL UNIQUE,
  email              TEXT NOT NULL UNIQUE,
  password_hash      TEXT NOT NULL,
  name               TEXT NOT NULL DEFAULT '',
  phone              TEXT NOT NULL DEFAULT '',
  email_verified_at  TIMESTAMPTZ,
  verify_token_hash  TEXT,
  verify_expires_at  TIMESTAMPTZ,
  reset_token_hash   TEXT,
  reset_expires_at   TIMESTAMPTZ,
  addresses          JSONB NOT NULL DEFAULT '[]',
  active             BOOLEAN NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS customers_email_idx ON customers (lower(email));

DROP TRIGGER IF EXISTS customers_updated_at ON customers;
CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Web siparişleri ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS web_orders (
  id              SERIAL PRIMARY KEY,
  public_id       TEXT NOT NULL UNIQUE,
  public_code     TEXT NOT NULL UNIQUE,
  access_token    TEXT NOT NULL,
  customer_id     TEXT,
  guest_email     TEXT,
  guest_name      TEXT,
  guest_phone     TEXT,
  items           JSONB NOT NULL DEFAULT '[]',
  address         JSONB,
  payment_method  TEXT NOT NULL DEFAULT 'cash_on_delivery',
  note            TEXT,
  status          TEXT NOT NULL DEFAULT 'pending',
  total_text      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS web_orders_customer_idx ON web_orders (customer_id);
CREATE INDEX IF NOT EXISTS web_orders_created_idx ON web_orders (created_at DESC);

DROP TRIGGER IF EXISTS web_orders_updated_at ON web_orders;
CREATE TRIGGER web_orders_updated_at
  BEFORE UPDATE ON web_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO migrations (name) VALUES ('003_customers_web_orders')
  ON CONFLICT (name) DO NOTHING;
