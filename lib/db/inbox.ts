/**
 * Reservations + contact messages.
 * PostgreSQL when DATABASE_URL is set; JSON files otherwise.
 */
import fs from "fs";
import path from "path";
import { DATA_DIR } from "./content";
import { getPool, isPostgresEnabled } from "./postgres";
import { ensureDatabase } from "./ensure-schema";
import { isServerlessReadonly, safeWriteJson, writableDataDir } from "./safe-fs";

export type ReservationStatus = "pending" | "confirmed" | "rejected" | "cancelled";
export type MessageStatus = "new" | "read" | "archived";

export interface Reservation {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
  status: ReservationStatus;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  status: MessageStatus;
}

const STORE_DIR = writableDataDir(DATA_DIR);
const RES_FILE = path.join(STORE_DIR, "reservations.json");
const MSG_FILE = path.join(STORE_DIR, "messages.json");
const RES_FALLBACK = path.join(DATA_DIR, "reservations.json");
const MSG_FALLBACK = path.join(DATA_DIR, "messages.json");

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function readList<T>(primary: string, fallback: string): T[] {
  for (const file of [primary, fallback]) {
    try {
      const raw = JSON.parse(fs.readFileSync(file, "utf8"));
      if (Array.isArray(raw)) return raw as T[];
      if (raw && Array.isArray(raw.items)) return raw.items as T[];
    } catch {
      /* try next */
    }
  }
  return [];
}

function writeList(file: string, items: unknown[]) {
  if (isServerlessReadonly() && !isPostgresEnabled()) {
    safeWriteJson(file, { items });
    return;
  }
  safeWriteJson(file, { items });
}

async function ensurePgTables() {
  await ensureDatabase();
  const pool = getPool();
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      visit_date TEXT NOT NULL,
      visit_time TEXT NOT NULL,
      guests INTEGER NOT NULL,
      note TEXT,
      status TEXT NOT NULL DEFAULT 'pending'
    );
    CREATE INDEX IF NOT EXISTS reservations_created_idx ON reservations (created_at DESC);

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );
    CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at DESC);
  `);
}

function rowToReservation(r: {
  id: string;
  created_at: string | Date;
  name: string;
  phone: string;
  visit_date: string;
  visit_time: string;
  guests: number;
  note: string | null;
  status: string;
}): Reservation {
  return {
    id: r.id,
    createdAt:
      r.created_at instanceof Date
        ? r.created_at.toISOString()
        : String(r.created_at),
    name: r.name,
    phone: r.phone,
    date: r.visit_date,
    time: r.visit_time,
    guests: r.guests,
    note: r.note || undefined,
    status: (r.status as ReservationStatus) || "pending",
  };
}

function rowToMessage(r: {
  id: string;
  created_at: string | Date;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  status: string;
}): ContactMessage {
  return {
    id: r.id,
    createdAt:
      r.created_at instanceof Date
        ? r.created_at.toISOString()
        : String(r.created_at),
    name: r.name,
    phone: r.phone || undefined,
    email: r.email || undefined,
    message: r.message,
    status: (r.status as MessageStatus) || "new",
  };
}

export async function listReservations(): Promise<Reservation[]> {
  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      const res = await pool.query(
        `SELECT id, created_at, name, phone, visit_date, visit_time, guests, note, status
         FROM reservations ORDER BY created_at DESC LIMIT 500`
      );
      return res.rows.map(rowToReservation);
    } catch (err) {
      console.warn("[inbox] pg reservations:", (err as Error).message);
    }
  }
  return readList<Reservation>(RES_FILE, RES_FALLBACK);
}

export async function createReservation(
  input: Omit<Reservation, "id" | "createdAt" | "status">
): Promise<Reservation> {
  const item: Reservation = {
    ...input,
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "pending",
    note: input.note?.trim() || undefined,
  };

  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      await pool.query(
        `INSERT INTO reservations (id, created_at, name, phone, visit_date, visit_time, guests, note, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          item.id,
          item.createdAt,
          item.name,
          item.phone,
          item.date,
          item.time,
          item.guests,
          item.note || null,
          item.status,
        ]
      );
      return item;
    } catch (err) {
      console.warn("[inbox] pg create reservation:", (err as Error).message);
      if (process.env.VERCEL === "1") throw err;
    }
  }

  const list = readList<Reservation>(RES_FILE, RES_FALLBACK);
  list.unshift(item);
  writeList(RES_FILE, list.slice(0, 500));
  return item;
}

export async function updateReservation(
  id: string,
  patch: Partial<Pick<Reservation, "status">>
): Promise<Reservation | null> {
  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      const res = await pool.query(
        `UPDATE reservations SET status = COALESCE($2, status)
         WHERE id = $1
         RETURNING id, created_at, name, phone, visit_date, visit_time, guests, note, status`,
        [id, patch.status || null]
      );
      if (res.rows[0]) return rowToReservation(res.rows[0]);
    } catch (err) {
      console.warn("[inbox] pg update reservation:", (err as Error).message);
      if (process.env.VERCEL === "1") throw err;
    }
  }

  const list = readList<Reservation>(RES_FILE, RES_FALLBACK);
  const idx = list.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], ...patch };
  writeList(RES_FILE, list);
  return list[idx];
}

export async function listMessages(): Promise<ContactMessage[]> {
  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      const res = await pool.query(
        `SELECT id, created_at, name, phone, email, message, status
         FROM contact_messages ORDER BY created_at DESC LIMIT 500`
      );
      return res.rows.map(rowToMessage);
    } catch (err) {
      console.warn("[inbox] pg messages:", (err as Error).message);
    }
  }
  return readList<ContactMessage>(MSG_FILE, MSG_FALLBACK);
}

export async function createMessage(
  input: Omit<ContactMessage, "id" | "createdAt" | "status">
): Promise<ContactMessage> {
  const item: ContactMessage = {
    ...input,
    id: newId(),
    createdAt: new Date().toISOString(),
    status: "new",
    phone: input.phone?.trim() || undefined,
    email: input.email?.trim() || undefined,
  };

  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      await pool.query(
        `INSERT INTO contact_messages (id, created_at, name, phone, email, message, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          item.id,
          item.createdAt,
          item.name,
          item.phone || null,
          item.email || null,
          item.message,
          item.status,
        ]
      );
      return item;
    } catch (err) {
      console.warn("[inbox] pg create message:", (err as Error).message);
      if (process.env.VERCEL === "1") throw err;
    }
  }

  const list = readList<ContactMessage>(MSG_FILE, MSG_FALLBACK);
  list.unshift(item);
  writeList(MSG_FILE, list.slice(0, 500));
  return item;
}

export async function updateMessage(
  id: string,
  patch: Partial<Pick<ContactMessage, "status">>
): Promise<ContactMessage | null> {
  if (isPostgresEnabled()) {
    try {
      await ensurePgTables();
      const pool = getPool()!;
      const res = await pool.query(
        `UPDATE contact_messages SET status = COALESCE($2, status)
         WHERE id = $1
         RETURNING id, created_at, name, phone, email, message, status`,
        [id, patch.status || null]
      );
      if (res.rows[0]) return rowToMessage(res.rows[0]);
    } catch (err) {
      console.warn("[inbox] pg update message:", (err as Error).message);
      if (process.env.VERCEL === "1") throw err;
    }
  }

  const list = readList<ContactMessage>(MSG_FILE, MSG_FALLBACK);
  const idx = list.findIndex((x) => x.id === id);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], ...patch };
  writeList(MSG_FILE, list);
  return list[idx];
}

export async function inboxCounts(): Promise<{
  pendingReservations: number;
  newMessages: number;
}> {
  const [reservations, messages] = await Promise.all([
    listReservations(),
    listMessages(),
  ]);
  return {
    pendingReservations: reservations.filter((r) => r.status === "pending")
      .length,
    newMessages: messages.filter((m) => m.status === "new").length,
  };
}
