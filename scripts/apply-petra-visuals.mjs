/**
 * Kırık fırın görsellerini canlı CMS fotoğrafları + kategori kapaklarıyla değiştir.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data", "content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const PHOTOS = {
  facade: "/assets/cms/hero-cephe.webp",
  interior: "/assets/cms/hero-ic.webp",
  gallery: "/assets/cms/galeri-cephe.webp",
  mark: "/assets/img/petra-mark.svg",
};

const COVERS = {
  kahvalti: "/assets/img/covers/kahvalti.svg",
  baslangiclar: "/assets/img/covers/baslangic.svg",
  "ana-yemekler": "/assets/img/covers/yemek.svg",
  tatlilar: "/assets/img/covers/tatli.svg",
  icecekler: "/assets/img/covers/icecek.svg",
  "italyan-kokteyller": "/assets/img/covers/kokteyl.svg",
  kahve: "/assets/img/covers/kahve.svg",
  nargile: "/assets/img/covers/nargile.svg",
};

function dead(p) {
  if (!p) return true;
  if (/^https?:\/\//i.test(p) || String(p).startsWith("/uploads/")) return false;
  if (String(p).startsWith("/assets/cms/") && !/logo\.webp$/i.test(p)) return false;
  if (String(p).startsWith("/assets/img/covers/")) return false;
  if (String(p).includes("petra-mark")) return false;
  return /\/assets\/img\//.test(p) || /cms\/logo\.webp$/i.test(p);
}

data.images = {
  ...data.images,
  logo: PHOTOS.mark,
  aboutInterior: PHOTOS.interior,
  ogImage: PHOTOS.facade,
  heroPoster: data.images?.heroPoster && !dead(data.images.heroPoster)
    ? data.images.heroPoster
    : PHOTOS.facade,
  heroCephe: data.images?.heroCephe && !dead(data.images.heroCephe)
    ? data.images.heroCephe
    : PHOTOS.facade,
  heroIc: data.images?.heroIc && !dead(data.images.heroIc)
    ? data.images.heroIc
    : PHOTOS.interior,
  reservation: PHOTOS.interior,
  favicon: data.images?.favicon && !dead(data.images.favicon)
    ? data.images.favicon
    : "/assets/cms/favicon.webp",
};

data.galeri = [
  { src: PHOTOS.gallery, baslik: "Cephe · Petra", boy: "wide" },
  { src: PHOTOS.interior, baslik: "Salon", boy: "half" },
  { src: PHOTOS.facade, baslik: "Akşam ışığı", boy: "half" },
  { src: PHOTOS.interior, baslik: "İç mekân", boy: "third" },
  { src: PHOTOS.gallery, baslik: "Sofra", boy: "third" },
  { src: PHOTOS.facade, baslik: "Giriş", boy: "third" },
];

if (data.pasta) {
  data.pasta.gorseller = [
    { src: PHOTOS.interior, alt: "Salon ve sofra" },
    { src: PHOTOS.gallery, alt: "Petra Yaşam Merkezi" },
    { src: PHOTOS.facade, alt: "Cephe" },
    { src: PHOTOS.interior, alt: "İç mekân" },
  ];
}

if (Array.isArray(data.hizmetler)) {
  const icons = ["utensils", "chef", "sunrise", "waves", "coffee", "wine", "cake", "flame"];
  data.hizmetler = data.hizmetler.map((h, i) => ({
    ...h,
    icon: h.icon || icons[i] || "utensils",
    emoji: undefined,
  }));
}

if (data.menu?.gruplar) {
  for (const g of data.menu.gruplar) {
    const cover = COVERS[g.slug];
    if (cover) g.image = cover;
    for (const u of g.urunler || []) {
      if (dead(u.image)) delete u.image;
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("görseller + ikonlar güncellendi");
