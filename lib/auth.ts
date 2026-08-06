import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getAuthRecord, getAuthRecordAsync } from "@/lib/db/content";
import { findUserByEmail, listUsers, type AdminUserRecord } from "@/lib/db/users";
import {
  hasPermission,
  type AdminRole,
  type Permission,
  isAdminRole,
} from "@/lib/admin/roles";

const FALLBACK_SECRET = "firinci-super-secret-key-change-in-production";
const EXAMPLE_SECRETS = new Set([
  FALLBACK_SECRET,
  "degistir-benzersiz-uzun-gizli-anahtar-32-karakter-veya-daha-uzun",
  "change-me",
  "secret",
]);

function rawJwtSecret(): string {
  return (process.env.JWT_SECRET || "").trim();
}

export function isDefaultJwtSecret(): boolean {
  const secret = rawJwtSecret();
  if (!secret) return true;
  if (secret.length < 32) return true;
  if (EXAMPLE_SECRETS.has(secret)) return true;
  return false;
}

function getJwtKey(): Uint8Array {
  if (process.env.NODE_ENV === "production" && isDefaultJwtSecret()) {
    throw new Error("JWT_SECRET yapılandırılmamış veya güvensiz.");
  }
  const secret = isDefaultJwtSecret() ? FALLBACK_SECRET : rawJwtSecret();
  return new TextEncoder().encode(secret);
}

export const COOKIE_NAME = "firinci_admin_token";
const ALLOWED_ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL ||
  process.env.ADMIN_USER ||
  "admin@firincitasdelen.com.tr"
)
  .trim()
  .toLowerCase();
const ALLOWED_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

async function verifyAdminPassword(
  email: string,
  password: string
): Promise<SessionUser | null> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) return null;

  // Multi-user store first
  try {
    const users = await listUsers();
    const user = users.find((u) => u.email === normalizedEmail && u.active);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    }
    if (users.length) return null;
  } catch {
    /* fall through */
  }

  // Legacy single auth
  const auth = (await getAuthRecordAsync()) || getAuthRecord();
  if (auth?.email && auth?.passwordHash) {
    const authEmail = auth.email.trim().toLowerCase();
    if (
      authEmail === normalizedEmail &&
      (await bcrypt.compare(password, auth.passwordHash))
    ) {
      return {
        id: "legacy-1",
        email: authEmail,
        name: auth.name || "Admin",
        role: "owner",
      };
    }
    return null;
  }

  if (
    ALLOWED_ADMIN_EMAIL &&
    ALLOWED_ADMIN_PASSWORD &&
    normalizedEmail === ALLOWED_ADMIN_EMAIL &&
    password === ALLOWED_ADMIN_PASSWORD &&
    (process.env.NODE_ENV !== "production" ||
      process.env.ALLOW_ENV_ADMIN === "true" ||
      process.env.VERCEL === "1")
  ) {
    return {
      id: "env-1",
      email: ALLOWED_ADMIN_EMAIL,
      name: "Admin",
      role: "owner",
    };
  }

  return null;
}

export async function login(email: string, password: string) {
  if (isDefaultJwtSecret() && process.env.NODE_ENV === "production") {
    throw new Error("Sunucu yapılandırması eksik (JWT_SECRET).");
  }

  const admin = await verifyAdminPassword(email, password);
  if (!admin) {
    throw new Error("Geçersiz e-posta veya şifre.");
  }

  const token = await new SignJWT({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getJwtKey());

  return { token, user: admin };
}

export async function verifyAuthToken(token: string): Promise<SessionUser | null> {
  try {
    if (process.env.NODE_ENV === "production" && isDefaultJwtSecret()) {
      return null;
    }
    const { payload } = await jwtVerify(token, getJwtKey());
    const email = String(payload.email || "").toLowerCase();
    if (!email) return null;
    const roleRaw = String(payload.role || "admin");
    const role: AdminRole = isAdminRole(roleRaw) ? roleRaw : "admin";
    return {
      id: String(payload.sub || ""),
      email,
      name: String(payload.name || "Admin"),
      role,
    };
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  const isHttps =
    process.env.NODE_ENV === "production" &&
    (Boolean(process.env.VERCEL) ||
      Boolean(process.env.HTTPS_ENABLED) ||
      (process.env.SITE_URL || "").startsWith("https://"));

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}

export async function requireAuth() {
  if (isDefaultJwtSecret() && process.env.NODE_ENV === "production") {
    throw new Error("Unauthorized");
  }
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireAuth();
  if (!hasPermission(session.role, permission)) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function refreshUserRole(session: SessionUser): Promise<SessionUser> {
  const fresh = await findUserByEmail(session.email);
  if (!fresh || !fresh.active) return session;
  return {
    id: fresh.id,
    email: fresh.email,
    name: fresh.name,
    role: fresh.role,
  };
}

export type { AdminUserRecord };
