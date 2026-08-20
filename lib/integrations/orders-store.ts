import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";
import type { IntegrationId, NormalizedOrder } from "./types";

export type StoredIntegrationOrder = NormalizedOrder & {
  eventHash: string;
  receivedAt: string;
  updatedAt: string;
  ingestSource: "poll" | "webhook";
  raw?: unknown;
};

const DATA_DIR = path.join(process.cwd(), "data", "integrations");
const FILE = path.join(DATA_DIR, "orders.json");
const PG_KEY = "integration_orders";

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function hashPayload(payload: unknown): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex").slice(0, 32);
}

async function readAll(): Promise<StoredIntegrationOrder[]> {
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
      const res = await pool.query<{ payload: { orders: StoredIntegrationOrder[] } }>(
        `SELECT payload FROM integration_settings WHERE key = $1`,
        [PG_KEY]
      );
      return res.rows[0]?.payload?.orders || [];
    }
  }
  try {
    if (!fs.existsSync(FILE)) return [];
    return (JSON.parse(fs.readFileSync(FILE, "utf8")) as { orders?: StoredIntegrationOrder[] })
      .orders || [];
  } catch {
    return [];
  }
}

async function writeAll(orders: StoredIntegrationOrder[]): Promise<void> {
  const payload = { orders: orders.slice(0, 800) };
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

export async function upsertNormalizedOrders(
  orders: NormalizedOrder[],
  ingestSource: "poll" | "webhook",
  rawItems?: unknown[]
): Promise<{ upserted: number; duplicates: number }> {
  const list = await readAll();
  let upserted = 0;
  let duplicates = 0;
  const now = new Date().toISOString();

  orders.forEach((order, i) => {
    const raw = rawItems?.[i] ?? order;
    const eventHash = hashPayload(raw);
    const idx = list.findIndex((x) => x.id === order.id && x.source === order.source);
    if (idx >= 0) {
      if (list[idx].eventHash === eventHash) {
        duplicates += 1;
        return;
      }
      list[idx] = {
        ...list[idx],
        ...order,
        eventHash,
        ingestSource,
        raw,
        receivedAt: list[idx].receivedAt,
        updatedAt: now,
      };
      upserted += 1;
    } else {
      list.unshift({
        ...order,
        eventHash,
        ingestSource,
        raw,
        receivedAt: now,
        updatedAt: now,
      });
      upserted += 1;
    }
  });

  await writeAll(list);
  return { upserted, duplicates };
}

export async function listIntegrationOrders(opts?: {
  source?: IntegrationId | "all";
  limit?: number;
}): Promise<Omit<StoredIntegrationOrder, "raw">[]> {
  let all = await readAll();
  if (opts?.source && opts.source !== "all") {
    all = all.filter((o) => o.source === opts.source);
  }
  return all.slice(0, opts?.limit ?? 100).map(({ raw: _r, ...rest }) => rest);
}

export async function updateOrderStatusByPaymentId(
  paymentId: string,
  newStatus: string
): Promise<boolean> {
  const all = await readAll();
  const idx = all.findIndex((x) => x.id === paymentId || (x as any).paymentId === paymentId || (x as any).merchantOid === paymentId);
  if (idx >= 0) {
    all[idx] = {
      ...all[idx],
      status: newStatus as any,
      updatedAt: new Date().toISOString(),
    };
    await writeAll(all);
    return true;
  }
  return false;
}
