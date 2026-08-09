import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";
import type { CartLine, CustomerAddress, PaymentMethod, WebOrder, WebOrderStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "web-orders.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

function readJson(): WebOrder[] {
  ensureFile();
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function writeJson(list: WebOrder[]) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + "\n", "utf8");
}

function publicCode() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `FS-${n}`;
}

function rowToOrder(row: Record<string, unknown>): WebOrder {
  return {
    id: String(row.public_id || row.id),
    publicCode: String(row.public_code),
    accessToken: String(row.access_token),
    customerId: (row.customer_id as string) || null,
    guestEmail: (row.guest_email as string) || null,
    guestName: (row.guest_name as string) || null,
    guestPhone: (row.guest_phone as string) || null,
    items: Array.isArray(row.items) ? (row.items as CartLine[]) : [],
    address: (row.address as CustomerAddress) || null,
    paymentMethod: (row.payment_method as PaymentMethod) || "cash_on_delivery",
    note: (row.note as string) || "",
    status: (row.status as WebOrderStatus) || "pending",
    totalText: (row.total_text as string) || "",
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.updated_at || new Date().toISOString()),
  };
}

export async function createWebOrder(input: {
  customerId?: string | null;
  guestEmail?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  items: CartLine[];
  address?: CustomerAddress | null;
  paymentMethod: PaymentMethod;
  note?: string;
  totalText?: string;
}): Promise<WebOrder> {
  const now = new Date().toISOString();
  const order: WebOrder = {
    id: crypto.randomUUID(),
    publicCode: publicCode(),
    accessToken: crypto.randomBytes(24).toString("hex"),
    customerId: input.customerId || null,
    guestEmail: input.guestEmail?.trim().toLowerCase() || null,
    guestName: input.guestName?.trim() || null,
    guestPhone: input.guestPhone?.trim() || null,
    items: input.items,
    address: input.address || null,
    paymentMethod: input.paymentMethod,
    note: input.note || "",
    status: "pending",
    totalText: input.totalText || "",
    createdAt: now,
    updatedAt: now,
  };

  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      await pool.query(
        `INSERT INTO web_orders (
          public_id, public_code, access_token, customer_id,
          guest_email, guest_name, guest_phone, items, address,
          payment_method, note, status, total_text
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11,$12,$13)`,
        [
          order.id,
          order.publicCode,
          order.accessToken,
          order.customerId,
          order.guestEmail,
          order.guestName,
          order.guestPhone,
          JSON.stringify(order.items),
          JSON.stringify(order.address || null),
          order.paymentMethod,
          order.note,
          order.status,
          order.totalText,
        ]
      );
      return order;
    } catch (err) {
      console.warn("[web-orders] PG create:", (err as Error).message);
    }
  }

  const list = readJson();
  list.unshift(order);
  writeJson(list.slice(0, 2000));
  return order;
}

export async function listWebOrders(limit = 100): Promise<WebOrder[]> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM web_orders ORDER BY created_at DESC LIMIT $1`,
        [limit]
      );
      return rows.map(rowToOrder);
    } catch (err) {
      console.warn("[web-orders] PG list:", (err as Error).message);
    }
  }
  return readJson().slice(0, limit);
}

export async function listOrdersForCustomer(
  customerId: string
): Promise<WebOrder[]> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM web_orders WHERE customer_id=$1 ORDER BY created_at DESC`,
        [customerId]
      );
      return rows.map(rowToOrder);
    } catch (err) {
      console.warn("[web-orders] PG customer list:", (err as Error).message);
    }
  }
  return readJson().filter((o) => o.customerId === customerId);
}

export async function getOrderForAccess(opts: {
  orderId: string;
  accessToken?: string;
  customerId?: string;
}): Promise<WebOrder | null> {
  const all = await listWebOrders(500);
  const order = all.find((o) => o.id === opts.orderId || o.publicCode === opts.orderId);
  if (!order) return null;
  if (opts.customerId && order.customerId === opts.customerId) return order;
  if (opts.accessToken && order.accessToken === opts.accessToken) return order;
  return null;
}

export async function updateWebOrderStatus(
  id: string,
  status: WebOrderStatus
): Promise<WebOrder | null> {
  const now = new Date().toISOString();
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      await pool.query(
        `UPDATE web_orders SET status=$2, updated_at=NOW() WHERE public_id=$1 OR public_code=$1`,
        [id, status]
      );
    } catch (err) {
      console.warn("[web-orders] PG status:", (err as Error).message);
    }
  }
  const list = readJson();
  const idx = list.findIndex((o) => o.id === id || o.publicCode === id);
  if (idx < 0) {
    // maybe only in PG
    const found = (await listWebOrders(500)).find(
      (o) => o.id === id || o.publicCode === id
    );
    return found ? { ...found, status, updatedAt: now } : null;
  }
  list[idx] = { ...list[idx], status, updatedAt: now };
  writeJson(list);
  return list[idx];
}

export function sanitizeOrderForCustomer(order: WebOrder) {
  return {
    id: order.id,
    publicCode: order.publicCode,
    items: order.items,
    address: order.address,
    paymentMethod: order.paymentMethod,
    note: order.note,
    status: order.status,
    totalText: order.totalText,
    createdAt: order.createdAt,
    guestName: order.guestName,
    guestEmail: order.guestEmail,
    guestPhone: order.guestPhone,
  };
}
