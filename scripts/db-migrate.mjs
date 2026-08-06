#!/usr/bin/env node
/**
 * JSON dosyalarındaki verileri PostgreSQL'e aktarır.
 * Kullanım: npm run db:migrate
 *
 * Bu script sadece bir kez çalıştırılmalıdır.
 * Tekrar çalıştırılması güvenlidir (mevcut veri korunur, üzerine yazılır).
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("❌ DATABASE_URL ortam değişkeni tanımlı değil!");
    process.exit(1);
  }

  console.log("🔌 PostgreSQL'e bağlanılıyor...");
  const pool = new Pool({
    connectionString: url,
    ssl:
      url.includes("localhost") || url.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: false },
  });

  try {
    // ── 1. İçerik verisi ──────────────────────────────────────
    const contentFile = join(ROOT, "data", "content.json");
    if (existsSync(contentFile)) {
      console.log("📦 content.json okunuyor...");
      const content = JSON.parse(readFileSync(contentFile, "utf8"));
      await pool.query(
        `INSERT INTO site_content (key, data)
         VALUES ('main', $1)
         ON CONFLICT (key) DO UPDATE SET data = $1`,
        [JSON.stringify(content)]
      );
      console.log("✅ İçerik verisi PostgreSQL'e aktarıldı.");
    } else {
      console.log("⚠️  data/content.json bulunamadı, içerik atlandı.");
    }

    // ── 2. Auth verisi ────────────────────────────────────────
    const authFile = join(ROOT, "data", "auth.json");
    if (existsSync(authFile)) {
      console.log("🔐 auth.json okunuyor...");
      const auth = JSON.parse(readFileSync(authFile, "utf8"));
      if (auth.email && auth.passwordHash) {
        await pool.query(
          `INSERT INTO admin_users (email, password_hash, name)
           VALUES ($1, $2, $3)
           ON CONFLICT (email) DO UPDATE
             SET password_hash = $2, name = $3`,
          [auth.email, auth.passwordHash, auth.name || "Admin"]
        );
        console.log("✅ Admin hesabı PostgreSQL'e aktarıldı.");
      }
    } else {
      console.log("⚠️  data/auth.json bulunamadı, admin hesabı atlandı.");
      console.log("   → npm run init-admin ile yeni hesap oluşturabilirsiniz.");
    }

    // ── 3. Geçiş kaydı ───────────────────────────────────────
    await pool.query(
      `INSERT INTO migrations (name) VALUES ('002_json_import')
       ON CONFLICT (name) DO NOTHING`
    );

    console.log("\n🎉 Geçiş tamamlandı!");
    console.log("   Artık DATABASE_URL ile PostgreSQL modunda çalışabilirsiniz.");
  } catch (err) {
    console.error("❌ Geçiş hatası:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
