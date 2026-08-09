import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";

export type StoredTrendyolOrder = {
  id: string;
  orderCode?: string;
  status?: string;
  storeId?: string | number;
  totalPrice?: number | string;
  customerName?: string;
  address?: string;
  phoneNumber?: string;
  customerNote?: string;
  packageCreationDate?: string | number;
  paymentMethodText?: string;
  products?: unknown[];
  raw?: unknown;
  eventHash: string;
  receivedAt: string;
  updatedAt: string;
  source: "poll" | "webhook";
};

const DATA_DIR = path.join(process.cwd(), "data", "integrations");
const FILE = path.join(DATA_DIR, "trendyol-orders.json");
const PG_KEY = "trendyol_orders";

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function hashPayload(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex").slice(0, 32);
}

async function readAll(): Promise<StoredTrendyolOrder[]> {
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
      const res = await pool.query<{ payload: { orders: StoredTrendyolOrder[] } }>(
        `SELECT payload FROM integration_settings WHERE key = $1`,
        [PG_KEY]
      );
      return res.rows[0]?.payload?.orders || [];
    }
  }
  try {
    if (!fs.existsSync(FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8")) as { orders?: StoredTrendyolOrder[] };
    return parsed.orders || [];
  } catch {
    return [];
  }
}

async function writeAll(orders: StoredTrendyolOrder[]): Promise<void> {
  const payload = { orders: orders.slice(0, 500) };
  if (isPostgresEnabled()) {
    const pool = getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO integration_settings (key, payload, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
        [PG_KEY, JSON.stringify(payload)]
      );
      return;
    }
  }
  ensureDir();
  fs.writeFileSync(FILE, JSON.stringify(payload, null, 2), "utf8");
}

function normalizeOrder(raw: unknown, source: "poll" | "webhook"): StoredTrendyolOrder | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = String(o.id || o.packageId || o.orderId || "").trim();
  if (!id) return null;
  const eventHash = hashPayload(raw);
  const now = new Date().toISOString();
  return {
    id,
    orderCode: o.orderCode ? String(o.orderCode) : undefined,
    status: o.packageStatus
      ? String(o.packageStatus)
      : o.status
        ? String(o.status)
        : undefined,
    storeId: (o.storeId ?? o.restaurantId) as string | number | undefined,
    totalPrice: (o.totalPrice ?? o.amount) as number | string | undefined,
    customerName: o.customerName ? String(o.customerName) : undefined,
    address: o.address ? String(o.address) : undefined,
    phoneNumber: o.phoneNumber ? String(o.phoneNumber) : undefined,
    customerNote: o.customerNote ? String(o.customerNote) : undefined,
    packageCreationDate: (o.packageCreationDate ?? o.createdDate) as string | number | undefined,
    paymentMethodText: o.paymentMethodText ? String(o.paymentMethodText) : undefined,
    products: Array.isArray(o.productsDisplays)
      ? o.productsDisplays
      : Array.isArray(o.lines)
        ? o.lines
        : Array.isArray(o.products)
          ? o.products
          : undefined,
    raw,
    eventHash,
    receivedAt: now,
    updatedAt: now,
    source,
  };
}

export async function upsertOrders(
  items: unknown[],
  source: "poll" | "webhook"
): Promise<{ upserted: number; duplicates: number }> {
  const list = await readAll();
  let upserted = 0;
  let duplicates = 0;
  for (const item of items) {
    const norm = normalizeOrder(item, source);
    if (!norm) continue;
    const idx = list.findIndex((x) => x.id === norm.id);
    if (idx >= 0) {
      if (list[idx].eventHash === norm.eventHash) {
        duplicates += 1;
        continue;
      }
      list[idx] = {
        ...list[idx],
        ...norm,
        receivedAt: list[idx].receivedAt,
        updatedAt: new Date().toISOString(),
      };
      upserted += 1;
    } else {
      list.unshift(norm);
      upserted += 1;
    }
  }
  await writeAll(list);
  return { upserted, duplicates };
}

export async function listOrders(limit = 100): Promise<StoredTrendyolOrder[]> {
  const all = await readAll();
  return all.slice(0, limit).map(({ raw: _raw, ...rest }) => rest);
}

export async function getOrder(id: string): Promise<StoredTrendyolOrder | null> {
  const all = await readAll();
  return all.find((o) => o.id === id) || null;
}
