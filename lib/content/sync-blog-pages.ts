/**
 * Ensure each published blog article has a static HTML shell under public/blog and blog/.
 */
import fs from "fs";
import path from "path";
import type { MakaleItem, SiteContent } from "@/lib/content/types";
import { resolveBrandName } from "@/lib/content/sync-static-brand";

const ROOT = process.cwd();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function articleShell(m: MakaleItem, brand: string, siteUrl: string): string {
  const slug = m.slug;
  const title = m.baslik || slug;
  const desc = m.ozet || title;
  const okuma = m.okumaSuresi || "5 dakika okuma";
  const kategori = m.kategori || "Fırın Günlüğü";
  const tarih = m.tarih || "";
  const body =
    m.govdeHtml?.trim() ||
    `<p>${escapeHtml(desc)}</p>`;
  const canonical = `${siteUrl.replace(/\/$/, "")}/blog/${slug}/${slug}`;

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${escapeHtml(title)} | ${escapeHtml(brand)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta name="theme-color" content="#12140E">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${escapeHtml(brand)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<link rel="icon" href="../../favicon.ico" sizes="32x32">
<link rel="stylesheet" href="../../assets/css/style.css?v=20260806prod">
<link href="../../css2.css?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
<a class="skip" href="#icerik">İçeriğe geç</a>
<header class="nav" data-nav>
  <div class="wrap nav__inner">
    <a class="nav__logo" href="../../index.htm" aria-label="${escapeHtml(brand)} ana sayfa">
      <span class="nav__logo-text">${escapeHtml(brand)}</span>
    </a>
  </div>
</header>
<main class="section" id="icerik">
  <div class="wrap">
    <article class="article">
      <nav class="crumbs" aria-label="Sayfa yolu">
        <a href="../../index.htm">Ana Sayfa</a><span>/</span>
        <a href="../blog">Fırın Günlüğü</a><span>/</span>
        <span aria-current="page">${escapeHtml(title)}</span>
      </nav>
      <header class="article__head">
        <h1>${escapeHtml(title)}</h1>
        <div class="article__meta">
          ${tarih ? `<time>${escapeHtml(tarih)}</time><span>·</span>` : ""}
          <span>${escapeHtml(okuma)}</span>
          <span>·</span><span>${escapeHtml(kategori)}</span>
        </div>
        ${m.ozet ? `<p class="article__lead">${escapeHtml(m.ozet)}</p>` : ""}
      </header>
      ${body}
    </article>
  </div>
</main>
<footer class="foot">
  <div class="wrap foot__bar"><span>© ${new Date().getFullYear()} ${escapeHtml(brand)}</span></div>
</footer>
<script src="../../assets/js/site-loader.js?v=20260806prod" defer></script>
<script src="../../assets/js/cms-ext.js?v=20260806prod" defer></script>
</body>
</html>
`;
}

export function syncBlogPages(content: SiteContent): void {
  const brand = resolveBrandName(content);
  const siteUrl = content.seo?.canonicalUrl || "https://example.com";
  const list = content.makaleler || [];

  for (const m of list) {
    if (!m?.slug || m.yayinda === false) continue;
    // Always refresh non-statik shells; for statik, only create if missing
    const targets = [
      path.join(ROOT, "public", "blog", m.slug, m.slug),
      path.join(ROOT, "blog", m.slug, m.slug),
    ];
    const missing = targets.some((t) => !fs.existsSync(t));
    if (m.statik && !missing) continue;

    const html = articleShell(m, brand, siteUrl);
    for (const file of targets) {
      try {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        // Don't overwrite existing static editorial pages unless non-statik
        if (m.statik && fs.existsSync(file)) continue;
        fs.writeFileSync(file, html, "utf8");
      } catch (err) {
        console.warn("[syncBlogPages]", file, (err as Error).message);
      }
    }
  }
}
