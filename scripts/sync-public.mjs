/**
 * Sync source assets + HTML into public/ as REAL files (not Windows junctions).
 * Vercel/Linux cannot follow NTFS junctions — materialize before every build.
 *
 * Run: node scripts/sync-public.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = "20260821m101";





function isReparsePoint(p) {
  try {
    const st = fs.lstatSync(p);
    // Junctions/symlinks: isSymbolicLink() true on Node for many Windows junctions
    if (st.isSymbolicLink()) return true;
    // Fallback: Windows reparse attribute (bit 1024)
    // eslint-disable-next-line no-bitwise
    if (process.platform === "win32" && (st.mode & 0o100000) === 0 && st.isDirectory()) {
      try {
        // If readlink works, it's a link/junction
        fs.readlinkSync(p);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  } catch {
    return false;
  }
}

function rmJunctionOrDir(p) {
  if (!fs.existsSync(p)) return;
  if (isReparsePoint(p)) {
    // Remove junction/symlink only — do not recurse into target
    fs.rmSync(p, { recursive: true, force: true });
    return;
  }
  // Real directory: leave in place; copyRecursive will overwrite files
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const st = fs.lstatSync(src);
  if (st.isSymbolicLink() || isReparsePoint(src)) {
    // Resolve and copy real content
    const real = fs.realpathSync(src);
    copyRecursive(real, dest);
    return;
  }
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  copyFile(src, dest);
}

function copyDirFiles(srcDir, destDir, filter = () => true) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const name of fs.readdirSync(srcDir)) {
    const full = path.join(srcDir, name);
    if (!fs.statSync(full).isFile()) continue;
    if (!filter(name)) continue;
    copyFile(full, path.join(destDir, name));
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    let st;
    try {
      st = fs.statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function bumpCache(html) {
  return html
    .replace(/assets\/css\/style\.css(\?v=[^"'&\s]+)?/g, `assets/css/style.css?v=${CACHE}`)
    .replace(/assets\/js\/hero\/index\.js(\?v=[^"'&\s]+)?/g, `assets/js/hero/index.js?v=${CACHE}`)
    .replace(/\/assets\/img\/hero-cephe\.webp(\?v=[^"'&\s]+)?/g, `/assets/img/hero-cephe.webp?v=${CACHE}`)
    .replace(/\/assets\/img\/hero-mobile\.webp(\?v=[^"'&\s]+)?/g, `/assets/img/hero-mobile.webp?v=${CACHE}`)
    .replace(/\/assets\/img\/hero-ic\.webp(\?v=[^"'&\s]+)?/g, `/assets/img/hero-ic.webp?v=${CACHE}`);
}

function bumpStyleHeroUrls() {
  const files = [
    path.join(root, "assets", "css", "style.css"),
    path.join(root, "public", "assets", "css", "style.css"),
  ];
  for (const full of files) {
    if (!fs.existsSync(full)) continue;
    let code = fs.readFileSync(full, "utf8");
    const next = code.replace(
      /\/assets\/img\/hero-mobile\.webp(\?v=[^"'&\s)]*)?/g,
      `/assets/img/hero-mobile.webp?v=${CACHE}`,
    );
    if (next !== code) fs.writeFileSync(full, next, "utf8");
  }
}

function bumpSiteLoaderHeroUrls() {
  /* legacy site-loader removed — no-op */
}

/** ES modül alt import'larına ?v= — yoksa eski camera-controller cache'te kalır */
function bustHeroModuleImports() {
  const dir = path.join(root, "assets", "js", "hero");
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".js")) continue;
    const full = path.join(dir, name);
    let code = fs.readFileSync(full, "utf8");
    const next = code
      .replace(
        /(from\s+['"])(\.[^'"]+\.js)(?:\?v=[^'"]*)?(['"])/g,
        `$1$2?v=${CACHE}$3`,
      )
      .replace(
        /(from\s+['"])(\.\.\/\.\.\/vendor\/[^'"]+\.js)(?:\?v=[^'"]*)?(['"])/g,
        `$1$2?v=${CACHE}$3`,
      )
      .replace(
        /export const CACHE_V = ['"][^'"]*['"]/,
        `export const CACHE_V = '${CACHE}'`,
      );
    if (next !== code) fs.writeFileSync(full, next, "utf8");
  }
}

function ensureScripts(html, _depth) {
  /* Legacy cms-ext / site-loader retired — strip if present */
  return bumpCache(html)
    .replace(/<script[^>]+(?:site-loader|cms-ext|content-api|content\.js|main\.js)[^>]*><\/script>\s*/gi, "");
}

function fixUrunlerHub(html) {
  let out = html.replace(
    /href="https:\/\/www\.firincitasdelen\.com\.tr\/urunler\/urunler\/urunler"/g,
    'href="https://www.firincitasdelen.com.tr/urunler/urunler"'
  );
  if (!/nav__logo-img/.test(out) && /class="nav__logo"/.test(out)) {
    out = out.replace(
      /(<a class="nav__logo"[^>]*>)\s*<svg/i,
      `$1\n    <img class="nav__logo-img" data-site="logo" alt="Logo" width="64" height="64" hidden decoding="async">\n    <svg class="nav__logo-fallback"`
    );
  }
  return ensureScripts(out, 1);
}

// ── Materialize trees that were Windows junctions ───────────────
// NOTE: Do NOT copy `urunler` into public/ — App Router serves /urunler.
// Extensionless HTML in public/ is downloaded by browsers (octet-stream).
const materialize = [
  ["assets", "public/assets"],
  // blog App Router'da; public/blog extensionless HTML kopyalanmaz
];

for (const [srcRel, destRel] of materialize) {
  const src = path.join(root, srcRel);
  const dest = path.join(root, destRel);
  if (!fs.existsSync(src)) continue;
  if (isReparsePoint(dest)) {
    console.log(`materialize: remove junction ${destRel}`);
    rmJunctionOrDir(dest);
  }
  copyRecursive(src, dest);
  console.log(`materialize: ${srcRel} → ${destRel}`);
}

// Hero modules (ensure latest)
bustHeroModuleImports();
copyDirFiles(
  path.join(root, "assets/js/hero"),
  path.join(root, "public/assets/js/hero"),
  (name) => name.endsWith(".js")
);

// Critical JS/CSS overwrite from source
const assetPairs = [
  ["assets/css/style.css", "public/assets/css/style.css"],
  ["styles/storefront.css", "public/assets/css/storefront.css"],
  ["assets/css/home-next.css", "public/assets/css/home-next.css"],
];
for (const [a, b] of assetPairs) {
  const src = path.join(root, a);
  if (fs.existsSync(src)) copyFile(src, path.join(root, b));
}
bumpSiteLoaderHeroUrls();
bumpStyleHeroUrls();

// urunler hub
const urunlerHub = path.join(root, "public", "urunler", "urunler");
if (fs.existsSync(urunlerHub)) {
  let html = fixUrunlerHub(fs.readFileSync(urunlerHub, "utf8"));
  fs.writeFileSync(urunlerHub, html, "utf8");
  const rootHub = path.join(root, "urunler", "urunler");
  if (fs.existsSync(path.dirname(rootHub))) copyFile(urunlerHub, rootHub);
}

// bump scripts on category + blog pages
const pageGlobs = [
  ...walk(path.join(root, "public", "urunler")),
  ...walk(path.join(root, "public", "blog")),
];
const pages = [...new Set(pageGlobs)].filter((f) => {
  const base = path.basename(f);
  return !/\.(css|js|jpg|jpeg|png|webp|svg|ico|map)$/i.test(base);
});

let patched = 0;
for (const file of pages) {
  if (file === urunlerHub) continue;
  let html = fs.readFileSync(file, "utf8");
  if (!/<html/i.test(html)) continue;
  const rel = path.relative(path.join(root, "public"), file);
  const depth = rel.split(path.sep).length - 1;
  const next = ensureScripts(html, Math.max(1, depth));
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    patched += 1;
  }
  const mirror = path.join(root, rel);
  if (fs.existsSync(path.dirname(mirror)) && mirror !== file) {
    try {
      copyFile(file, mirror);
    } catch {
      /* ignore */
    }
  }
}

// Sync Petra Logo as Favicons
const logoPng = path.join(root, "public", "assets", "cms", "logo.png");
const petraSvg = path.join(root, "assets", "img", "petra-favicon.svg");
if (fs.existsSync(logoPng)) {
  copyFile(logoPng, path.join(root, "public", "icon.png"));
  copyFile(logoPng, path.join(root, "public", "apple-touch-icon.png"));
  copyFile(logoPng, path.join(root, "public", "favicon.ico"));
  copyFile(logoPng, path.join(root, "favicon.ico"));
}
if (fs.existsSync(petraSvg)) {
  copyFile(petraSvg, path.join(root, "public", "favicon.svg"));
}

console.log(`sync-public ok — cache=${CACHE}, pages patched=${patched}`);

