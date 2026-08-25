/**
 * Production product pages + category list link patch.
 * - Assigns unique Turkish slugs
 * - Writes /urunler/{slug} shells (public + root)
 * - Rewrites category page product links from WhatsApp → product detail
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_FILE = path.join(ROOT, "data", "content.json");
const CACHE = "20260810x7";

const RESERVED = new Set([
  "urunler",
  "ekmek-cesitleri",
  "eksi-mayali-ekmekler",
  "simit-pogaca-acma",
  "kurabiye-cesitleri",
  "buyuk-kurabiyeler",
  "galeta-cubuk-kokteyl",
  "baklava-serbetli",
  "sutlu-tatlilar",
  "zeytinyagli-urunler",
  "pastalar",
  "tek-pasta-dilim",
  "tartolet-rulo-lezzet-toplari",
  "donut",
  "icecekler",
]);

function slugifyTr(input) {
  return String(input || "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(base, used) {
  let slug = base || "urun";
  if (!used.has(slug)) {
    used.add(slug);
    return slug;
  }
  let i = 2;
  while (used.has(`${base}-${i}`)) i += 1;
  const next = `${base}-${i}`;
  used.add(next);
  return next;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absImg(siteUrl, img) {
  if (!img) return `${siteUrl}/assets/img/urun/ekmek-cesit.jpg`;
  if (/^https?:/i.test(img)) return img;
  return `${siteUrl}${img.startsWith("/") ? img : `/${img}`}`;
}

function productShell(u, group, brand, siteUrl, siblings) {
  const slug = u.slug;
  const title = u.ad;
  const desc =
    (u.aciklama && String(u.aciklama).trim()) ||
    (u.not && `${title} — ${u.not}`) ||
    `${title} | ${group.ad} | ${brand}`;
  const catSlug = group.slug || "urunler";
  const catHref = catSlug === "urunler" ? "/urunler/urunler" : `/urunler/${catSlug}`;
  const canonical = `${siteUrl}/urunler/${slug}`;
  const img = u.image || group.image || "/assets/img/urun/ekmek-cesit.jpg";
  const price = u.fiyat ? escapeHtml(u.fiyat) : "";
  const not = u.not ? escapeHtml(u.not) : "";
  const aciklama = u.aciklama
    ? `<p>${escapeHtml(u.aciklama)}</p>`
    : not
      ? `<p>${not}</p>`
      : `<p>${escapeHtml(brand)} — ${escapeHtml(group.ad)} kategorisinden taze ${escapeHtml(title)}.</p>`;

  const related = (siblings || [])
    .filter((s) => s.slug && s.slug !== slug)
    .slice(0, 6)
    .map(
      (s) =>
        `<li><a href="/urunler/${escapeHtml(s.slug)}" data-product-link="1">${escapeHtml(s.ad)}</a></li>`
    )
    .join("\n          ");

  const year = new Date().getFullYear();
  const ogImage = absImg(siteUrl, img);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)} — ${escapeHtml(brand)} | Çekmeköy</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta name="theme-color" content="#12140E">
<meta property="og:type" content="product">
<meta property="og:site_name" content="${escapeHtml(brand)}">
<meta property="og:title" content="${escapeHtml(title)} — ${escapeHtml(brand)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(ogImage)}">
<meta property="og:locale" content="tr_TR">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../../favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="96x96" href="../../assets/img/favicon-96.png">
<link rel="apple-touch-icon" href="../../assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="../../css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../assets/css/style.css?v=${CACHE}">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Product","name":${JSON.stringify(title)},"description":${JSON.stringify(desc)},"image":${JSON.stringify(ogImage)},"sku":${JSON.stringify(slug)},"brand":{"@type":"Brand","name":${JSON.stringify(brand)}},"category":${JSON.stringify(group.ad)},"offers":{"@type":"Offer","url":${JSON.stringify(canonical)},"priceCurrency":"TRY","availability":"https://schema.org/InStock","seller":{"@type":"Bakery","name":${JSON.stringify(brand)}}}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
{"@type":"ListItem","position":1,"name":"Ana Sayfa","item":"${siteUrl}/"},
{"@type":"ListItem","position":2,"name":"Ürünler","item":"${siteUrl}/urunler/urunler"},
{"@type":"ListItem","position":3,"name":${JSON.stringify(group.ad)},"item":"${siteUrl}${catHref}"},
{"@type":"ListItem","position":4,"name":${JSON.stringify(title)}}
]}
</script>
</head>
<body class="page page--urun" data-product-slug="${escapeHtml(slug)}">
<a class="skip" href="#icerik">İçeriğe geç</a>
<header class="nav is-solid">
  <a class="nav__logo" href="../../index.htm" aria-label="${escapeHtml(brand)} ana sayfa">
    <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden="true">
      <path d="M8 30c0-8 7-14 16-14s16 6 16 14v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="2.5"></path>
      <path d="M16 22c2-3 4-4 8-4s6 1 8 4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"></path>
    </svg>
    <span>FIRINCI</span>
  </a>
  <nav class="nav__links" aria-label="Ana menü">
    <a href="../../index.htm#hakkimizda">Hakkımızda</a>
    <a href="/urunler/urunler">Ürünler</a>
    <a href="../../index.htm#pasta">Özel Pastalar</a>
    <a href="../../blog/blog">Blog</a>
    <a href="../../index.htm#iletisim">İletişim</a>
  </nav>
  <a href="tel:+905306089051" class="btn btn--sm nav__cta">0530 608 90 51</a>
</header>

<main class="section" id="icerik">
  <div class="wrap">
    <nav class="crumbs" aria-label="Sayfa yolu" data-urun-crumbs>
      <a href="../../index.htm">Ana Sayfa</a><span>/</span>
      <a href="/urunler/urunler">Ürünler</a><span>/</span>
      <a href="${escapeHtml(catHref)}" data-crumb-cat>${escapeHtml(group.ad)}</a><span>/</span>
      <span aria-current="page" data-crumb-product>${escapeHtml(title)}</span>
    </nav>

    <div class="urun-ust urun-detay" data-urun-detay>
      <div>
        <p class="eyebrow">Ürün</p>
        <h1 class="h2" data-urun-ad>${escapeHtml(title)}</h1>
        <p class="urun-detay__kat"><a href="${escapeHtml(catHref)}" data-urun-kat-link data-urun-kat>${escapeHtml(group.ad)}</a></p>
        ${price ? `<p class="urun-detay__fiyat" data-urun-fiyat>${price}</p>` : `<p class="urun-detay__fiyat" data-urun-fiyat hidden></p>`}
        ${not ? `<p class="urun-detay__not" data-urun-not>${not}</p>` : `<p class="urun-detay__not" data-urun-not hidden></p>`}
        <div class="answer" data-urun-aciklama>
          <b>Açıklama</b>
          ${aciklama}
        </div>
        <p class="urun-detay__durum" data-urun-durum hidden></p>
        <div class="urun-detay__actions">
          <button type="button" class="btn btn--lg" data-add-cart>Sepete Ekle</button>
          <a class="btn btn--lg btn--ghost" data-wa-order href="https://wa.me/905306089051?text=Merhaba%2C%20Petra%20Ya%C5%9Fam%20Merkezi%20web%20siteniz%20%C3%BCzerinden%20ileti%C5%9Fime%20ge%C3%A7iyorum.%20Bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">WhatsApp ile Sipariş</a>
        </div>
        <p class="urun-detay__hint">Sipariş, rezervasyon ve bilgi için WhatsApp üzerinden hemen yazabilirsiniz.</p>
      </div>
      <figure class="urun-gorsel" data-reveal-mask="">
        <img data-urun-img src="${escapeHtml(img)}" alt="${escapeHtml(title)} — ${escapeHtml(brand)}" loading="eager" decoding="async" width="1280" height="720">
      </figure>
    </div>

    <section class="urun-related" data-urun-related ${related ? "" : "hidden"}>
      <h2 class="h3">Aynı kategoriden</h2>
      <ul>
          ${related || ""}
      </ul>
      <p><a class="menu__tum" href="${escapeHtml(catHref)}">${escapeHtml(group.ad)} kategorisine dön →</a></p>
    </section>
  </div>
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <img class="foot__mark" data-site="logo" src="../../assets/img/logo.webp" alt="Logo" width="160" height="160" loading="lazy" decoding="async">
      </div>
      <div><h4>Petra</h4><a href="../../index.htm#hakkimizda">Hakkımızda</a><a href="/urunler/urunler">Menü</a><a href="/havuz-plaj">Havuz & Plaj</a><a href="/spor-salonu">Spor Salonu</a></div>
      <div><h4>Adres</h4><a href="../../index.htm#iletisim">Megakent Sitesi No:1/O</a><a href="../../index.htm#iletisim">Çekmeköy / İstanbul</a></div>
      <div><h4>İletişim</h4><a href="tel:+905306089051">0530 608 90 51</a><a href="https://wa.me/905306089051?text=Merhaba%2C%20Petra%20Ya%C5%9Fam%20Merkezi%20web%20siteniz%20%C3%BCzerinden%20ileti%C5%9Fime%20ge%C3%A7iyorum.%20Bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
    </div>
  </div>
  <div class="wrap foot__bar"><span>© ${year} ${escapeHtml(brand)}</span><span>Tüm hakları saklıdır.</span></div>
</footer>

<script src="../../assets/js/site-loader.js?v=${CACHE}" defer></script>
<script src="../../assets/js/cms-ext.js?v=${CACHE}" defer></script>
</body>
</html>
`;
}

function productListItem(u) {
  const fav = u.fav ? ' class="is-fav"' : "";
  const not = u.not ? `<em>${escapeHtml(u.not)}</em>` : "";
  const price = u.fiyat
    ? `<span class="menu__price">${escapeHtml(u.fiyat)}</span>`
    : "";
  return `            <li${fav}><a href="/urunler/${escapeHtml(u.slug)}" data-product-link="1"><span class="menu__name"><span class="menu__name__label">${escapeHtml(u.ad)}</span>${not}</span>${price}</a></li>`;
}

function patchCategoryHtml(html, group) {
  const products = (group.urunler || []).filter((u) => u?.ad && u?.slug);
  if (!products.length) return html;
  const listInner = products.map(productListItem).join("\n");
  let out = html.replace(
    /<ul class="menu__list[^"]*"[^>]*>[\s\S]*?<\/ul>/i,
    `<ul class="menu__list menu__list--tek">\n${listInner}\n          </ul>`
  );
  out = out.replace(
    /Ürüne tıklayarak WhatsApp[’']tan sipariş verebilirsiniz\./g,
    "Ürüne tıklayarak detay sayfasını açabilirsiniz."
  );
  return out;
}

function categoryFileCandidates(slug) {
  return [
    path.join(ROOT, "urunler", slug, slug),
    path.join(ROOT, "public", "urunler", slug, slug),
  ];
}

const content = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
const brand =
  content.brand?.displayName ||
  content.seo?.siteName ||
  content.footer?.markaAdi ||
  "Petra Cafe Restaurant";
const siteUrl = (
  content.seo?.canonicalUrl ||
  process.env.SITE_URL ||
  "http://localhost:3010"
).replace(/\/$/, "");

const used = new Set(RESERVED);
for (const g of content.menu?.gruplar || []) {
  const m = String(g.link || g.tumLink || "").match(/\/(?:urunler|menu)\/([^/?#]+)/i);
  const cat = g.slug || (m && m[1]) || slugifyTr(g.ad);
  if (cat) {
    used.add(cat);
    g.slug = cat;
  }
}

let products = 0;
for (const g of content.menu?.gruplar || []) {
  for (const u of g.urunler || []) {
    if (!u?.ad?.trim()) continue;
    if (u.slug && !RESERVED.has(u.slug) && !used.has(u.slug)) {
      used.add(u.slug);
    } else {
      u.slug = uniqueSlug(slugifyTr(u.ad) || "urun", used);
    }
    u.link = g.slug ? `/menu/${g.slug}/${u.slug}` : `/menu/${u.slug}`;
    if (u.aktif === undefined) u.aktif = true;
    products += 1;
  }
}

fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2) + "\n", "utf8");

/**
 * App Router owns /menu — do NOT write extensionless HTML into public/.
 * Those files are served as application/octet-stream and browsers download them.
 */
function removeExtensionless(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.lstatSync(full);
    if (st.isDirectory()) n += removeExtensionless(full);
    else if (!path.extname(name) && !name.startsWith(".")) {
      fs.unlinkSync(full);
      n += 1;
    }
  }
  return n;
}

const cleaned =
  removeExtensionless(path.join(ROOT, "public", "urunler")) +
  removeExtensionless(path.join(ROOT, "urunler"));

console.log(
  `sync-product-pages: ${products} products, slugs updated, cleaned ${cleaned} extensionless shells (App Router serves /menu)`
);
