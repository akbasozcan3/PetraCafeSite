/**
 * Multi-user admin store (JSON + optional PostgreSQL).
 */
import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { getPool, isPostgresEnabled } from "./postgres";
import type { AdminRole } from "@/lib/admin/roles";
import { isAdminRole } from "@/lib/admin/roles";
import { AUTH_FILE, DATA_DIR, type AuthRecord } from "./content";
import { safeWriteJson } from "./safe-fs";

export interface AdminUserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const USERS_FILE = path.join(DATA_DIR, "users.json");

function readUsersFile(): AdminUserRecord[] {
  try {
    const raw = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    if (Array.isArray(raw)) return raw as AdminUserRecord[];
    if (raw && Array.isArray(raw.users)) return raw.users as AdminUserRecord[];
  } catch {
    // migrate from legacy auth.json
  }
  return migrateFromLegacyAuth();
}

function writeUsersFile(users: AdminUserRecord[]) {
  safeWriteJson(USERS_FILE, { users });
}

function migrateFromLegacyAuth(): AdminUserRecord[] {
  try {
    const auth = JSON.parse(fs.readFileSync(AUTH_FILE, "utf8")) as AuthRecord;
    if (auth?.email && auth?.passwordHash) {
      const now = new Date().toISOString();
      const user: AdminUserRecord = {
        id: randomBytes(8).toString("hex"),
        email: auth.email.trim().toLowerCase(),
        passwordHash: auth.passwordHash,
        name: auth.name || "Admin",
        role: "owner",
        active: true,
        createdAt: now,
        updatedAt: now,
      };
      writeUsersFile([user]);
      return [user];
    }
  } catch {
    /* empty */
  }
  return [];
}

async function pgListUsers(): Promise<AdminUserRecord[] | null> {
  if (!isPostgresEnabled()) return null;
  try {
    const pool = getPool()!;
    // Ensure role column exists (best-effort)
    await pool.query(`
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin';
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT TRUE;
      ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS public_id TEXT;
    `);
    const res = await pool.query<{
      id: number;
      email: string;
      password_hash: string;
      name: string;
      role: string;
      active: boolean;
      public_id: string | null;
      created_at: Date;
      updated_at: Date;
    }>(
      `SELECT id, email, password_hash, name, role, active, public_id, created_at, updated_at
       FROM admin_users ORDER BY id ASC`
    );
    return res.rows.map((r) => ({
      id: r.public_id || String(r.id),
      email: r.email,
      passwordHash: r.password_hash,
      name: r.name,
      role: isAdminRole(r.role) ? r.role : "admin",
      active: r.active !== false,
      createdAt: r.created_at?.toISOString?.() || new Date().toISOString(),
      updatedAt: r.updated_at?.toISOString?.() || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn("[users] PG list failed:", (err as Error).message);
    return null;
  }
}

export async function listUsers(): Promise<AdminUserRecord[]> {
  const pg = await pgListUsers();
  if (pg && pg.length) return pg;
  return readUsersFile();
}

export async function findUserByEmail(email: string): Promise<AdminUserRecord | null> {
  const normalized = email.trim().toLowerCase();
  const users = await listUsers();
  return users.find((u) => u.email === normalized && u.active) || null;
}

export async function findUserById(id: string): Promise<AdminUserRecord | null> {
  const users = await listUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser(input: {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
}): Promise<AdminUserRecord> {
  const email = input.email.trim().toLowerCase();
  if (!email || !input.password) throw new Error("E-posta ve şifre gerekli.");
  if (input.password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");

  const existing = await listUsers();
  if (existing.some((u) => u.email === email)) {
    throw new Error("Bu e-posta zaten kayıtlı.");
  }

  const now = new Date().toISOString();
  const user: AdminUserRecord = {
    id: randomBytes(8).toString("hex"),
    email,
    passwordHash: await bcrypt.hash(input.password, 12),
    name: input.name.trim() || "Kullanıcı",
    role: input.role,
    active: true,
    createdAt: now,
    updatedAt: now,
  };

  if (isPostgresEnabled()) {
    try {
      const pool = getPool()!;
      await pool.query(
        `INSERT INTO admin_users (email, password_hash, name, role, active, public_id)
         VALUES ($1, $2, $3, $4, TRUE, $5)
         ON CONFLICT (email) DO UPDATE
           SET password_hash = $2, name = $3, role = $4, active = TRUE, public_id = $5`,
        [user.email, user.passwordHash, user.name, user.role, user.id]
      );
    } catch (err) {
      console.warn("[users] PG create failed, JSON fallback:", (err as Error).message);
    }
  }

  const next = [...existing, user];
  writeUsersFile(next);
  // Keep legacy auth.json in sync for primary owner
  if (user.role === "owner" || existing.length === 0) {
    safeWriteJson(AUTH_FILE, {
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
    });
  }
  return user;
}

export async function updateUser(
  id: string,
  patch: Partial<Pick<AdminUserRecord, "name" | "role" | "active">> & {
    password?: string;
  }
): Promise<AdminUserRecord> {
  const users = await listUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) throw new Error("Kullanıcı bulunamadı.");

  const current = users[idx];
  const next: AdminUserRecord = {
    ...current,
    name: patch.name?.trim() || current.name,
    role: patch.role || current.role,
    active: patch.active ?? current.active,
    updatedAt: new Date().toISOString(),
  };
  if (patch.password) {
    if (patch.password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");
    next.passwordHash = await bcrypt.hash(patch.password, 12);
  }

  // Prevent removing last owner
  if (current.role === "owner" && next.role !== "owner") {
    const owners = users.filter((u) => u.role === "owner" && u.active && u.id !== id);
    if (!owners.length) throw new Error("Son sahip hesabının rolü değiştirilemez.");
  }
  if (current.role === "owner" && next.active === false) {
    const owners = users.filter((u) => u.role === "owner" && u.active && u.id !== id);
    if (!owners.length) throw new Error("Son sahip hesabı pasifleştirilemez.");
  }

  users[idx] = next;

  if (isPostgresEnabled()) {
    try {
      const pool = getPool()!;
      await pool.query(
        `UPDATE admin_users
         SET name = $2, role = $3, active = $4, password_hash = $5, public_id = COALESCE(public_id, $1)
         WHERE public_id = $1 OR email = $6`,
        [next.id, next.name, next.role, next.active, next.passwordHash, next.email]
      );
    } catch (err) {
      console.warn("[users] PG update failed:", (err as Error).message);
    }
  }

  writeUsersFile(users);

  if (next.role === "owner") {
    safeWriteJson(AUTH_FILE, {
      email: next.email,
      passwordHash: next.passwordHash,
      name: next.name,
    });
  }

  return next;
}

export async function deleteUser(id: string): Promise<void> {
  const users = await listUsers();
  const target = users.find((u) => u.id === id);
  if (!target) throw new Error("Kullanıcı bulunamadı.");
  if (target.role === "owner") {
    const owners = users.filter((u) => u.role === "owner" && u.active && u.id !== id);
    if (!owners.length) throw new Error("Son sahip silinemez.");
  }
  const next = users.filter((u) => u.id !== id);

  if (isPostgresEnabled()) {
    try {
      const pool = getPool()!;
      await pool.query(`DELETE FROM admin_users WHERE public_id = $1 OR email = $2`, [
        target.id,
        target.email,
      ]);
    } catch (err) {
      console.warn("[users] PG delete failed:", (err as Error).message);
    }
  }

  writeUsersFile(next);
}

export function publicUser(u: AdminUserRecord) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    active: u.active,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}
