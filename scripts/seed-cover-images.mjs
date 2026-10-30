/**
 * Petra wordmark + kategori kapakları (çizgisel ikon, emoji yok).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = path.join(root, "public", "assets", "img");
const coverDir = path.join(imgDir, "covers");
fs.mkdirSync(coverDir, { recursive: true });
fs.mkdirSync(path.join(root, "assets", "img", "covers"), { recursive: true });

const mark = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" role="img" aria-label="Petra Cafe Restaurant">
  <text x="4" y="38" font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="600" fill="#D9A441" letter-spacing="7">PETRA</text>
  <text x="6" y="56" font-family="Inter, system-ui, sans-serif" font-size="8" font-weight="600" fill="#8A7A48" letter-spacing="3.4">CAFE RESTAURANT</text>
</svg>
`;

const placeholder = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="Görsel yakında">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1e14"/>
      <stop offset="100%" stop-color="#12140e"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="400" cy="268" r="42" fill="none" stroke="#D9A441" stroke-width="2" opacity="0.7"/>
  <path d="M378 268h44M400 246v44" stroke="#D9A441" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <text x="400" y="360" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#F4EEE1">Petra</text>
  <text x="400" y="388" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" letter-spacing="3" fill="#D9A441">CAFE RESTAURANT</text>
</svg>
`;

function cover(title, d) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#24281c"/>
      <stop offset="100%" stop-color="#14170f"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="48" y="48" width="704" height="504" rx="28" fill="none" stroke="#D9A441" stroke-width="1.5" opacity="0.28"/>
  <g fill="none" stroke="#D9A441" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(352 210)">
    ${d}
  </g>
  <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#F4EEE1">${title}</text>
  <text x="400" y="458" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" letter-spacing="3" fill="#D9A441">PETRA</text>
</svg>
`;
}

const covers = {
  kahvalti: cover(
    "Kahvaltı",
    `<circle cx="48" cy="48" r="22"/><path d="M48 32v6"/><path d="M48 32l6-8M48 32l-6-8"/>`
  ),
  baslangic: cover(
    "Başlangıçlar",
    `<path d="M16 72c16-28 48-28 64 0"/><circle cx="48" cy="36" r="10"/>`
  ),
  yemek: cover(
    "Dünya Mutfağı",
    `<path d="M28 16v56M20 16c0 14 16 14 16 0"/><path d="M68 16v56M76 28h-16v12c8 0 16-4 16-12z"/>`
  ),
  tatli: cover(
    "İtalyan Tatlı",
    `<path d="M16 56h64l-8 20H24z"/><path d="M24 56c8-28 40-28 48 0"/><path d="M48 28v-8"/>`
  ),
  icecek: cover(
    "İçecekler",
    `<path d="M32 16h32l-6 40H38z"/><path d="M36 36h24"/><path d="M40 72h16"/>`
  ),
  kokteyl: cover(
    "Kokteyl",
    `<path d="M24 16h48L48 48z"/><path d="M48 48v24M36 72h24"/><path d="M60 20c10 4 14 14 8 18"/>`
  ),
  kahve: cover(
    "Kahve",
    `<path d="M24 28h40v28a16 16 0 0 1-16 16H40A16 16 0 0 1 24 56V28z"/><path d="M64 36h10a10 10 0 0 1 0 20H64"/><path d="M36 16c4 4 4 8 0 12M48 16c4 4 4 8 0 12"/>`
  ),
  nargile: cover(
    "Nargile",
    `<path d="M48 12c-10 18-4 28 0 36"/><circle cx="48" cy="56" r="16"/><path d="M64 48c12 4 18 14 12 22"/>`
  ),
};

fs.writeFileSync(path.join(imgDir, "petra-mark.svg"), mark);
fs.writeFileSync(path.join(imgDir, "product-placeholder.svg"), placeholder);
for (const [name, svg] of Object.entries(covers)) {
  fs.writeFileSync(path.join(coverDir, `${name}.svg`), svg);
}

console.log("covers + petra-mark yazıldı");
