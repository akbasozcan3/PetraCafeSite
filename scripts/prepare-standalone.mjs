/**
 * Standalone Next.js çıktısına public + static kopyalar.
 * Kullanım: npm run build && node scripts/prepare-standalone.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standalone = path.join(root, ".next", "standalone");
const staticSrc = path.join(root, ".next", "static");
const publicSrc = path.join(root, "public");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

if (!fs.existsSync(standalone)) {
  if (process.env.VERCEL === "1") {
    console.log("prepare-standalone skipped (Vercel)");
    process.exit(0);
  }
  console.error("standalone yok — önce: npm run build");
  process.exit(1);
}

copyRecursive(publicSrc, path.join(standalone, "public"));
copyRecursive(staticSrc, path.join(standalone, ".next", "static"));

// Kalıcı data klasörü — content her build'de güncellenir
const dataDest = path.join(standalone, "data");
fs.mkdirSync(dataDest, { recursive: true });
for (const name of ["content.json", "auth.json"]) {
  const src = path.join(root, "data", name);
  const dest = path.join(dataDest, name);
  if (!fs.existsSync(src)) continue;
  // auth.json: mevcut standalone auth'u koru (müşteri şifresi)
  if (name === "auth.json" && fs.existsSync(dest)) continue;
  fs.copyFileSync(src, dest);
}

console.log("prepare-standalone ok → .next/standalone");
