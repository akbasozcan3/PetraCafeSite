#!/usr/bin/env node
/**
 * Admin hesabı oluşturur (JSON + PostgreSQL).
 * Kullanım: npm run init-admin -- email@domain.com SifreNiz123!
 */
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, "..", "data", "auth.json");

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || "Admin";

if (!email || !password) {
  console.error("Kullanım: npm run init-admin -- email@domain.com SifreNiz123! [Ad Soyad]");
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ Şifre en az 8 karakter olmalıdır.");
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);
const authData = { email: email.trim().toLowerCase(), passwordHash, name };

// Her zaman JSON'a kaydet
fs.mkdirSync(path.dirname(authFile), { recursive: true });
fs.writeFileSync(authFile, JSON.stringify(authData, null, 2), "utf8");
console.log(`✅ JSON kaydedildi: ${authFile}`);

// PostgreSQL varsa oraya da kaydet
if (process.env.DATABASE_URL) {
  try {
    const pg = await import("pg");
    const { Pool } = pg.default || pg;
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DATABASE_URL.includes("localhost") ||
        process.env.DATABASE_URL.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false },
    });
    await pool.query(
      `INSERT INTO admin_users (email, password_hash, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE
         SET password_hash = $2, name = $3`,
      [authData.email, authData.passwordHash, authData.name]
    );
    await pool.end();
    console.log("✅ PostgreSQL'e de kaydedildi.");
  } catch (err) {
    console.warn("⚠️  PostgreSQL kaydı başarısız (JSON kullanılacak):", err.message);
  }
}

console.log(`\n🎉 Admin hesabı hazır:`);
console.log(`   E-posta : ${authData.email}`);
console.log(`   Şifre   : ${"*".repeat(password.length)}`);
console.log(`   Ad      : ${authData.name}`);
