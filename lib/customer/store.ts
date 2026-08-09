import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getPool, isPostgresEnabled } from "@/lib/db/postgres";
import type { CustomerAddress, CustomerRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "customers.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

function readJson(): CustomerRecord[] {
  ensureFile();
  try {
    const raw = JSON.parse(fs.readFileSync(FILE, "utf8"));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function writeJson(list: CustomerRecord[]) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + "\n", "utf8");
}

function newId() {
  return crypto.randomUUID();
}

function rowToCustomer(row: Record<string, unknown>): CustomerRecord {
  return {
    id: String(row.public_id || row.id),
    email: String(row.email),
    passwordHash: String(row.password_hash),
    name: String(row.name || ""),
    phone: String(row.phone || ""),
    emailVerifiedAt: (row.email_verified_at as string) || null,
    verifyTokenHash: (row.verify_token_hash as string) || null,
    verifyExpiresAt: (row.verify_expires_at as string) || null,
    resetTokenHash: (row.reset_token_hash as string) || null,
    resetExpiresAt: (row.reset_expires_at as string) || null,
    addresses: Array.isArray(row.addresses) ? (row.addresses as CustomerAddress[]) : [],
    active: row.active !== false,
    createdAt: String(row.created_at || new Date().toISOString()),
    updatedAt: String(row.updated_at || new Date().toISOString()),
  };
}

export async function listCustomers(): Promise<CustomerRecord[]> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM customers ORDER BY created_at DESC`
      );
      return rows.map(rowToCustomer);
    } catch (err) {
      console.warn("[customers] PG list failed:", (err as Error).message);
    }
  }
  return readJson();
}

export async function findCustomerByEmail(
  email: string
): Promise<CustomerRecord | null> {
  const normalized = email.trim().toLowerCase();
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM customers WHERE lower(email)=$1 LIMIT 1`,
        [normalized]
      );
      return rows[0] ? rowToCustomer(rows[0]) : null;
    } catch (err) {
      console.warn("[customers] PG find email:", (err as Error).message);
    }
  }
  return readJson().find((c) => c.email === normalized) || null;
}

export async function findCustomerById(
  id: string
): Promise<CustomerRecord | null> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM customers WHERE public_id=$1 OR id::text=$1 LIMIT 1`,
        [id]
      );
      return rows[0] ? rowToCustomer(rows[0]) : null;
    } catch (err) {
      console.warn("[customers] PG find id:", (err as Error).message);
    }
  }
  return readJson().find((c) => c.id === id) || null;
}

export async function createCustomer(input: {
  email: string;
  passwordHash: string;
  name: string;
  phone: string;
  verifyTokenHash: string;
  verifyExpiresAt: string;
}): Promise<CustomerRecord> {
  const now = new Date().toISOString();
  const record: CustomerRecord = {
    id: newId(),
    email: input.email.trim().toLowerCase(),
    passwordHash: input.passwordHash,
    name: input.name.trim(),
    phone: input.phone.trim(),
    emailVerifiedAt: null,
    verifyTokenHash: input.verifyTokenHash,
    verifyExpiresAt: input.verifyExpiresAt,
    addresses: [],
    active: true,
    createdAt: now,
    updatedAt: now,
  };

  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      await pool.query(
        `INSERT INTO customers (
          public_id, email, password_hash, name, phone,
          verify_token_hash, verify_expires_at, addresses, active
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,'[]'::jsonb,true)`,
        [
          record.id,
          record.email,
          record.passwordHash,
          record.name,
          record.phone,
          record.verifyTokenHash,
          record.verifyExpiresAt,
        ]
      );
      return record;
    } catch (err) {
      console.warn("[customers] PG create:", (err as Error).message);
      throw err;
    }
  }

  const list = readJson();
  if (list.some((c) => c.email === record.email)) {
    throw new Error("Bu e-posta zaten kayıtlı.");
  }
  list.push(record);
  writeJson(list);
  return record;
}

export async function updateCustomer(
  id: string,
  patch: Partial<CustomerRecord>
): Promise<CustomerRecord | null> {
  const now = new Date().toISOString();
  if (isPostgresEnabled()) {
    try {
      const current = await findCustomerById(id);
      if (!current) return null;
      const next = { ...current, ...patch, updatedAt: now };
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      await pool.query(
        `UPDATE customers SET
          name=$2, phone=$3, password_hash=$4,
          email_verified_at=$5, verify_token_hash=$6, verify_expires_at=$7,
          reset_token_hash=$8, reset_expires_at=$9,
          addresses=$10::jsonb, active=$11, updated_at=NOW()
         WHERE public_id=$1`,
        [
          id,
          next.name,
          next.phone,
          next.passwordHash,
          next.emailVerifiedAt || null,
          next.verifyTokenHash || null,
          next.verifyExpiresAt || null,
          next.resetTokenHash || null,
          next.resetExpiresAt || null,
          JSON.stringify(next.addresses || []),
          next.active !== false,
        ]
      );
      return next;
    } catch (err) {
      console.warn("[customers] PG update:", (err as Error).message);
    }
  }

  const list = readJson();
  const idx = list.findIndex((c) => c.id === id);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], ...patch, updatedAt: now };
  writeJson(list);
  return list[idx];
}

export async function findByVerifyTokenHash(
  hash: string
): Promise<CustomerRecord | null> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM customers WHERE verify_token_hash=$1 LIMIT 1`,
        [hash]
      );
      return rows[0] ? rowToCustomer(rows[0]) : null;
    } catch {
      /* fallthrough */
    }
  }
  return readJson().find((c) => c.verifyTokenHash === hash) || null;
}

export async function findByResetTokenHash(
  hash: string
): Promise<CustomerRecord | null> {
  if (isPostgresEnabled()) {
    try {
      const pool = getPool();
      if (!pool) throw new Error("DATABASE_URL yok");
      const { rows } = await pool.query(
        `SELECT * FROM customers WHERE reset_token_hash=$1 LIMIT 1`,
        [hash]
      );
      return rows[0] ? rowToCustomer(rows[0]) : null;
    } catch {
      /* fallthrough */
    }
  }
  return readJson().find((c) => c.resetTokenHash === hash) || null;
}
