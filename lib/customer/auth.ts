import bcrypt from "bcryptjs";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  createCustomer,
  findByResetTokenHash,
  findByVerifyTokenHash,
  findCustomerByEmail,
  findCustomerById,
  updateCustomer,
} from "./store";
import type { CustomerRecord, PublicCustomer } from "./types";

export const CUSTOMER_COOKIE = "firinci_customer_token";
const FALLBACK = "firinci-customer-dev-secret-change-me-32chars";

function customerJwtKey(): Uint8Array {
  const secret =
    (process.env.CUSTOMER_JWT_SECRET || "").trim() ||
    (process.env.JWT_SECRET || "").trim();
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32) {
      throw new Error("CUSTOMER_JWT_SECRET veya JWT_SECRET gerekli.");
    }
  }
  return new TextEncoder().encode(secret || FALLBACK);
}

export function toPublicCustomer(c: CustomerRecord): PublicCustomer {
  return {
    id: c.id,
    email: c.email,
    name: c.name,
    phone: c.phone,
    emailVerified: Boolean(c.emailVerifiedAt),
    addresses: c.addresses || [],
  };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function registerCustomer(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  if (!email || !input.password || input.password.length < 8) {
    throw new Error("Geçerli e-posta ve en az 8 karakter şifre gerekli.");
  }
  if (await findCustomerByEmail(email)) {
    throw new Error("Bu e-posta zaten kayıtlı.");
  }
  const rawToken = crypto.randomBytes(32).toString("hex");
  const verifyTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const passwordHash = await hashPassword(input.password);
  const customer = await createCustomer({
    email,
    passwordHash,
    name: input.name.trim() || "Müşteri",
    phone: input.phone.trim(),
    verifyTokenHash,
    verifyExpiresAt,
  });
  return { customer, verifyToken: rawToken };
}

export async function loginCustomer(email: string, password: string) {
  const user = await findCustomerByEmail(email);
  if (!user || !user.active) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

export async function createCustomerSession(customer: CustomerRecord) {
  const token = await new SignJWT({
    sub: customer.id,
    email: customer.email,
    typ: "customer",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(customerJwtKey());

  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure:
      process.env.NODE_ENV === "production" &&
      (process.env.HTTPS_ENABLED === "true" || process.env.VERCEL === "1"),
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCustomerSession() {
  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getCustomerSession(): Promise<PublicCustomer | null> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, customerJwtKey());
    if (payload.typ !== "customer" || !payload.sub) return null;
    const user = await findCustomerById(String(payload.sub));
    if (!user || !user.active) return null;
    return toPublicCustomer(user);
  } catch {
    return null;
  }
}

export async function requireCustomer(): Promise<CustomerRecord> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_COOKIE)?.value;
  if (!token) throw new Error("Unauthorized");
  const { payload } = await jwtVerify(token, customerJwtKey());
  if (payload.typ !== "customer" || !payload.sub) throw new Error("Unauthorized");
  const user = await findCustomerById(String(payload.sub));
  if (!user || !user.active) throw new Error("Unauthorized");
  return user;
}

export async function verifyEmailToken(rawToken: string) {
  const hash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const user = await findByVerifyTokenHash(hash);
  if (!user) throw new Error("Geçersiz veya kullanılmış doğrulama bağlantısı.");
  if (user.verifyExpiresAt && new Date(user.verifyExpiresAt).getTime() < Date.now()) {
    throw new Error("Doğrulama bağlantısının süresi dolmuş.");
  }
  return updateCustomer(user.id, {
    emailVerifiedAt: new Date().toISOString(),
    verifyTokenHash: null,
    verifyExpiresAt: null,
  });
}

/** Oturumdaki kullanıcı için yeni doğrulama e-postası token'ı üretir */
export async function issueEmailVerification(userId: string) {
  const user = await findCustomerById(userId);
  if (!user) throw new Error("Kullanıcı bulunamadı.");
  if (user.emailVerifiedAt) throw new Error("E-posta zaten doğrulanmış.");
  const rawToken = crypto.randomBytes(32).toString("hex");
  const verifyTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const verifyExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const next = await updateCustomer(user.id, {
    verifyTokenHash,
    verifyExpiresAt,
  });
  if (!next) throw new Error("Doğrulama oluşturulamadı.");
  return { customer: next, verifyToken: rawToken };
}

export async function startPasswordReset(email: string) {
  const user = await findCustomerByEmail(email);
  if (!user) return null; // don't leak
  const raw = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  await updateCustomer(user.id, {
    resetTokenHash: hash,
    resetExpiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
  return { user, resetToken: raw };
}

export async function resetPasswordWithToken(rawToken: string, password: string) {
  if (!password || password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");
  const hash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const user = await findByResetTokenHash(hash);
  if (!user) throw new Error("Geçersiz sıfırlama bağlantısı.");
  if (user.resetExpiresAt && new Date(user.resetExpiresAt).getTime() < Date.now()) {
    throw new Error("Sıfırlama bağlantısının süresi dolmuş.");
  }
  const passwordHash = await hashPassword(password);
  return updateCustomer(user.id, {
    passwordHash,
    resetTokenHash: null,
    resetExpiresAt: null,
  });
}
