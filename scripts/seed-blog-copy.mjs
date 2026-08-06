/**
 * Blog makale gövdelerini content.json'a aktarır.
 * Kullanım: node scripts/seed-blog-copy.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = path.join(root, "data", "content.json");
const blogRoot = path.join(root, "public", "blog");

function extractArticle(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  let okumaSuresi = "";
  const okuma = html.match(/<span>([^<]*okuma[^<]*)<\/span>/i);
  if (okuma) okumaSuresi = okuma[1].trim();

  let govdeHtml = "";
  const m = html.match(
    /<header class="article__head"[\s\S]*?<\/header>\s*([\s\S]*?)\s*(?=<aside class="related"|<\/article>)/i
  );
  if (m) govdeHtml = m[1].trim();

  return { okumaSuresi, govdeHtml };
}

const raw = JSON.parse(fs.readFileSync(contentPath, "utf8"));
if (!Array.isArray(raw.makaleler)) {
  console.error("makaleler yok");
  process.exit(1);
}

let updated = 0;
for (const m of raw.makaleler) {
  if (!m?.slug) continue;
  const file = path.join(blogRoot, m.slug, m.slug);
  if (!fs.existsSync(file)) {
    console.warn("yok:", m.slug);
    continue;
  }
  const { okumaSuresi, govdeHtml } = extractArticle(file);
  let changed = false;
  if (okumaSuresi) {
    m.okumaSuresi = okumaSuresi;
    changed = true;
  }
  if (govdeHtml) {
    m.govdeHtml = govdeHtml;
    changed = true;
  }
  if (changed) {
    updated += 1;
    console.log("ok", m.slug, "govde=", (m.govdeHtml || "").length, "okuma=", m.okumaSuresi || "-");
  }
}

if (!raw.brand) {
  raw.brand = {
    displayName: raw.seo?.siteName || raw.footer?.markaAdi || "Taşdelen Fırıncı",
    shortName: raw.navbar?.logoText || "FIRINCI",
  };
  console.log("brand seeded:", raw.brand.displayName);
}

fs.writeFileSync(contentPath, JSON.stringify(raw, null, 2), "utf8");
console.log("done, updated", updated, "articles");
