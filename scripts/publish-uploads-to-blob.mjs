/**
 * Lokal public/uploads/site dosyalarını Vercel Blob'a yükler,
 * content.json içindeki /uploads/site/ yollarını blob URL'leriyle değiştirir.
 *
 * Gereksinim: BLOB_READ_WRITE_TOKEN (Vercel → Storage → token)
 *
 *   npm run publish-uploads
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { put } from "@vercel/blob";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentFile = path.join(root, "data", "content.json");
const uploadsDir = path.join(root, "public", "uploads", "site");

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("❌ BLOB_READ_WRITE_TOKEN tanımlı değil.");
  console.error("   Vercel → Project → Storage → Blob → token'ı .env.local'e ekleyin.");
  process.exit(1);
}

const content = JSON.parse(fs.readFileSync(contentFile, "utf8"));
const uploaded = new Map();

function collectPaths(value, out = new Set()) {
  if (typeof value === "string" && value.startsWith("/uploads/site/")) {
    out.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectPaths(v, out));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectPaths(v, out));
  }
  return out;
}

function replacePaths(value) {
  if (typeof value === "string" && value.startsWith("/uploads/site/")) {
    return uploaded.get(value) || value;
  }
  if (Array.isArray(value)) {
    return value.map(replacePaths);
  }
  if (value && typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      next[k] = replacePaths(v);
    }
    return next;
  }
  return value;
}

const paths = [...collectPaths(content)];
console.log(`📦 ${paths.length} lokal upload yolu bulundu.`);

for (const publicPath of paths) {
  const filename = publicPath.replace(/^\/uploads\/site\//, "");
  const filePath = path.join(uploadsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Dosya yok, atlanıyor: ${filePath}`);
    continue;
  }
  const bytes = fs.readFileSync(filePath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const mime =
    ext === "webp"
      ? "image/webp"
      : ext === "png"
        ? "image/png"
        : ext === "svg"
          ? "image/svg+xml"
          : "image/jpeg";
  const result = await put(`site/${filename}`, bytes, {
    access: "public",
    contentType: mime,
    addRandomSuffix: false,
  });
  uploaded.set(publicPath, result.url);
  console.log(`✅ ${filename} → ${result.url}`);
}

if (uploaded.size === 0) {
  console.log("Yüklenecek dosya yok.");
  process.exit(0);
}

const next = replacePaths(content);
fs.writeFileSync(contentFile, JSON.stringify(next, null, 2) + "\n", "utf8");
console.log(`\n✅ content.json güncellendi (${uploaded.size} blob URL).`);
console.log("   Sonraki adım: git commit + push → Vercel redeploy");
