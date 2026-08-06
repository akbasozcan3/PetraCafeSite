#!/usr/bin/env node
/**
 * PostgreSQL tablolarını kurar.
 * Kullanım: npm run db:setup
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("❌ DATABASE_URL ortam değişkeni tanımlı değil!");
    console.log("\nÖrnek: DATABASE_URL=postgresql://postgres:şifre@localhost:5432/firinci");
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
    const schemaPath = join(__dirname, "../lib/db/schema.sql");
    const schema = readFileSync(schemaPath, "utf8");
    console.log("📋 Şema uygulanıyor...");
    await pool.query(schema);
    console.log("✅ PostgreSQL tabloları başarıyla oluşturuldu!");
    console.log("\nSonraki adım: npm run db:migrate  (JSON verilerini aktarır)");
  } catch (err) {
    console.error("❌ Şema hatası:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
