/**
 * 1) Masaüstünde hamburger: inline !important stillerini temizle
 * 2) Tüm ürün/blog sayfalarına ana sayfa footer (foot__grid) koy
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function depthFromPublic(file) {
  const rel = path.relative(path.join(root, "public"), file);
  // public/urunler/urunler → depth 1; public/urunler/x/x → depth 2
  return Math.max(0, rel.split(path.sep).length - 1);
}

function prefixFor(depth) {
  if (depth <= 0) return "";
  return "../".repeat(depth);
}

function fullFooter(file, depth) {
  const p = prefixFor(depth);
  const home = `${p}index.htm`;
  const logo = `${p}assets/img/logo.webp`;
  const norm = file.replace(/\\/g, "/");
  const isUrunler = norm.includes("/urunler/");
  const urunlerHref = isUrunler
    ? depth >= 2
      ? "../urunler"
      : "urunler"
    : `${p}urunler/urunler`;
  const blogHref = `${p}blog/blog`;
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div>
        <img class="foot__mark" data-site="logo" src="${logo}" alt="Logo" width="160" height="160" loading="lazy" decoding="async">
      </div>
      <div><h4>Fırın</h4><a href="${home}#hakkimizda">Hakkımızda</a><a href="${urunlerHref}">Ürünler</a><a href="${home}#pasta">Özel Pastalar</a><a href="${home}#galeri">Galeri</a><a href="${blogHref}">Fırın Günlüğü</a></div>
      <div><h4>Adres</h4><a href="${home}#iletisim">Turgut Özal Cad. No:108/C</a><a href="${home}#iletisim">Bulvar Rezidans A Blok</a><a href="${home}#iletisim">Çekmeköy / İstanbul</a><a href="${home}#iletisim">7/24 açık</a></div>
      <div><h4>İletişim</h4><a href="tel:+905523400202">0552 340 02 02</a><a href="https://wa.me/905523400202" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="https://www.instagram.com/firincitasdelenn/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:info@firincitasdelen.com.tr">info@firincitasdelen.com.tr</a></div>
    </div>
  </div>
  <div class="wrap foot__bar"><span>© <span id="yil">2026</span> Taşdelen Fırıncı</span><span>Tüm hakları saklıdır.</span></div>
</footer>`;
}

function stripBurgerInline(html) {
  return html
    .replace(
      /(<button[^>]*class="[^"]*nav__burger[^"]*"[^>]*)\s+style="[^"]*"/gi,
      "$1"
    )
    .replace(
      /(<button[^>]*id="burger"[^>]*)\s+style="[^"]*"/gi,
      "$1"
    )
    .replace(
      /(class="nav__burger"[^>]*?)\s+style="[^"]*display:\s*flex\s*!important[^"]*"/gi,
      "$1"
    );
}

function replaceFooter(html, file, depth) {
  if (!/<footer[\s>]/i.test(html)) {
    // insert before last scripts / </body>
    if (/<\/body>/i.test(html)) {
      return html.replace(/<\/body>/i, `${fullFooter(file, depth)}\n</body>`);
    }
    return html;
  }
  return html.replace(/<footer[\s\S]*?<\/footer>/i, fullFooter(file, depth));
}

const targets = [
  ...walk(path.join(root, "public", "urunler")),
  ...walk(path.join(root, "public", "blog")),
  ...walk(path.join(root, "urunler")),
  ...walk(path.join(root, "blog")),
].filter((f) => {
  const base = path.basename(f);
  return !/\.(css|js|jpg|jpeg|png|webp|svg|ico|map|json)$/i.test(base);
});

let n = 0;
for (const file of [...new Set(targets)]) {
  let html = fs.readFileSync(file, "utf8");
  if (!/<html/i.test(html)) continue;
  const before = html;
  const inPublic = file.includes(`${path.sep}public${path.sep}`);
  const depth = inPublic
    ? depthFromPublic(file)
    : Math.max(0, path.relative(root, file).split(path.sep).length - 1);
  html = stripBurgerInline(html);
  html = replaceFooter(html, file, depth);
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    n += 1;
    console.log("fixed", path.relative(root, file), "depth=", depth);
  }
}

// CSS: desktop'ta burger kesinlikle kapalı
const cssPath = path.join(root, "assets", "css", "style.css");
let css = fs.readFileSync(cssPath, "utf8");
const guard = `
/* Desktop: hamburger asla görünmesin (inline style override) */
@media (min-width: 861px) {
  .nav__burger {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
}
`;
if (!css.includes("Desktop: hamburger asla görünmesin")) {
  css += guard;
  fs.writeFileSync(cssPath, css, "utf8");
  fs.copyFileSync(cssPath, path.join(root, "public", "assets", "css", "style.css"));
  console.log("css guard added");
}

console.log("done, files=", n);
