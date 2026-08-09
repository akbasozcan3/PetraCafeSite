import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "crypto";

function deriveKey(): Buffer {
  const secret = process.env.JWT_SECRET || process.env.INTEGRATIONS_CRYPTO_SECRET || "";
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET (min 16 karakter) entegrasyon şifrelemesi için gerekli.");
  }
  return createHash("sha256").update(`firinci-integrations-v1:${secret}`).digest();
}

export function encryptSecret(plain: string): string {
  if (!plain) return "";
  const key = deriveKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64url"), tag.toString("base64url"), enc.toString("base64url")].join(".");
}

export function decryptSecret(payload: string): string {
  if (!payload) return "";
  const parts = payload.split(".");
  if (parts.length !== 3) throw new Error("Geçersiz şifreli credential.");
  const [ivB64, tagB64, dataB64] = parts;
  const key = deriveKey();
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64url"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
