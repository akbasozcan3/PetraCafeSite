/**
 * Kategori sayfalarındaki kısa bilgi + uzun makale HTML'ini content.json'a aktarır.
 * Kullanım: node scripts/seed-category-copy.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentPath = path.join(root, "data", "content.json");
const urunlerRoot = path.join(root, "public", "urunler");

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractFaqFromHtml(html) {
  const items = [];
  const re =
    /<details[^>]*class="faq__item"[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/gi;
  let m;
  while ((m = re.exec(html))) {
    const soru = stripTags(m[1]);
    const cevap = stripTags(m[2]);
    if (soru && cevap) items.push({ soru, cevap });
  }
  return items;
}

function stripFaqBlock(html) {
  return String(html || "")
    .replace(
      /<h2[^>]*>\s*Sık\s*sorulanlar\s*<\/h2>\s*<div class="faq">[\s\S]*?<\/div>/gi,
      ""
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractFromCategoryFile(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  let aciklama = "";
  const ans = html.match(/class="answer"[\s\S]*?<p>([\s\S]*?)<\/p>/i);
  if (ans) aciklama = stripTags(ans[1]);

  let govdeHtml = "";
  const art = html.match(/<div class="article"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="urun-cta|<aside|<section class="related)/i);
  if (art) govdeHtml = art[1].trim();

  const sss = extractFaqFromHtml(govdeHtml || html);
  if (sss.length) govdeHtml = stripFaqBlock(govdeHtml);

  return { aciklama, govdeHtml, sss };
}

function slugFromGroup(g) {
  const href = g.link || g.tumLink || "";
  const m = String(href).match(/\/urunler\/([^/?#]+)/i);
  if (m && m[1] !== "urunler") return m[1];
  if (g.slug) return g.slug;
  return String(g.ad || "")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const raw = JSON.parse(fs.readFileSync(contentPath, "utf8"));
if (!raw.menu || !Array.isArray(raw.menu.gruplar)) {
  console.error("menu.gruplar yok");
  process.exit(1);
}

let updated = 0;
for (const g of raw.menu.gruplar) {
  const slug = slugFromGroup(g);
  if (!slug) continue;
  const file = path.join(urunlerRoot, slug, slug);
  if (!fs.existsSync(file)) {
    console.warn("yok:", slug);
    continue;
  }
  const { aciklama, govdeHtml, sss } = extractFromCategoryFile(file);
  const force = process.argv.includes("--force");
  let changed = false;
  if (aciklama && (!g.aciklama || force)) {
    g.aciklama = aciklama;
    changed = true;
  }
  if (govdeHtml && (!g.govdeHtml || force)) {
    g.govdeHtml = govdeHtml;
    changed = true;
  } else if (g.govdeHtml && /class="faq"/i.test(g.govdeHtml)) {
    g.govdeHtml = stripFaqBlock(g.govdeHtml);
    changed = true;
  }
  if (sss.length && (!Array.isArray(g.sss) || !g.sss.length || force)) {
    g.sss = sss;
    changed = true;
  }
  if (changed) {
    updated += 1;
    console.log(
      "ok",
      slug,
      "aciklama=",
      Boolean(g.aciklama),
      "govde=",
      (g.govdeHtml || "").length,
      "sss=",
      (g.sss || []).length
    );
  }
}

if (!raw.sayfalar) {
  raw.sayfalar = {
    urunler: {
      eyebrow: "Ürünler",
      baslikSablon: "{n} kategoride {m} çeşit",
      lead: "Her gün taze pişen ekmek, simit, poğaça, börek, tatlı ve pasta çeşitlerimiz.",
    },
    urunKategori: {
      eyebrow: "Ürünler",
      answerBaslik: "Kısa bilgi",
      listeBaslikSablon: "{ad} listesi",
      kartNot: "Ürüne tıklayarak detayı inceleyebilirsiniz.",
      ctaBaslik: "Sipariş & bilgi",
      ctaWaLabel: "WhatsApp’tan yazın",
      relatedBaslik: "Diğer kategoriler",
      relatedHepsi: "Tüm ürün kategorileri",
    },
    blog: {
      eyebrow: "Blog",
      baslik: "Ekmeğin ardındaki bilgi",
      lead: "Pasta siparişi, ekmek saklama, un çeşitleri ve fırın mutfağından pratik yazılar.",
      ctaBaslik: "Aklınıza takılan bir şey mi var?",
      ctaMetin: "Sipariş ve sorularınız için bizi arayın veya WhatsApp’tan yazın.",
    },
  };
}

if (!raw.iletisim.etiketAdres) {
  Object.assign(raw.iletisim, {
    etiketAdres: "Adres",
    etiketSaatler: "Çalışma saatleri",
    etiketTelefon: "Telefon",
    etiketWhatsapp: "WhatsApp",
    etiketOzelPasta: "Özel pasta",
  });
}

if (raw.navbar && !raw.navbar.mobileLabel) raw.navbar.mobileLabel = "Menü";
if (raw.yorumlarMeta && !raw.yorumlarMeta.badgeCta) raw.yorumlarMeta.badgeCta = "Google’da gör";

fs.writeFileSync(contentPath, JSON.stringify(raw, null, 2), "utf8");
console.log("seed-category-copy done — groups updated:", updated);
