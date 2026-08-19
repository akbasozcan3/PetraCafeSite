import { categoryIcon } from "./site-icons";

/** Diskte gerçekten duran fotoğraflar (eski fırın /assets/img/* yok). */
export const SITE_PHOTOS = {
  facade: "/assets/cms/hero-cephe.webp",
  interior: "/assets/cms/hero-ic.webp",
  gallery: "/assets/cms/galeri-cephe.webp",
  mark: "/assets/cms/logo.png",
  favicon: "/assets/img/petra-favicon.svg",
  placeholder: "/assets/img/product-placeholder.svg",
} as const;

export const CATEGORY_COVERS: Record<string, string> = {
  kahvalti: "/assets/img/covers/kahvalti.svg",
  "menemen-omlet-gozleme": "/assets/img/covers/kahvalti.svg",
  sandvicler: "/assets/img/covers/baslangic.svg",
  tostlar: "/assets/img/covers/baslangic.svg",
  makarnalar: "/assets/img/covers/yemek.svg",
  pizzalar: "/assets/img/covers/yemek.svg",
  salatalar: "/assets/img/covers/baslangic.svg",
  izgaralar: "/assets/img/covers/yemek.svg",
  "beyaz-etler": "/assets/img/covers/yemek.svg",
  durumler: "/assets/img/covers/yemek.svg",
  ekstralar: "/assets/img/covers/baslangic.svg",
  hamburger: "/assets/img/covers/yemek.svg",
  tatlilar: "/assets/img/covers/tatli.svg",
  icecekler: "/assets/img/covers/icecek.svg",
  "ev-yapimi-icecekler": "/assets/img/covers/icecek.svg",
  milkshakes: "/assets/img/covers/icecek.svg",
  smoothie: "/assets/img/covers/icecek.svg",
  kokteyller: "/assets/img/covers/kokteyl.svg",
  frozen: "/assets/img/covers/kokteyl.svg",
  kahve: "/assets/img/covers/kahve.svg",
  "soguk-kahveler": "/assets/img/covers/kahve.svg",
  "bitki-caylari": "/assets/img/covers/kahve.svg",
  nargile: "/assets/img/covers/nargile.svg",
  baslangiclar: "/assets/img/covers/baslangic.svg",
  "ana-yemekler": "/assets/img/covers/yemek.svg",
  "italyan-kokteyller": "/assets/img/covers/kokteyl.svg",
};

const DEAD_LOCAL =
  /\/assets\/img\/(ic-mekan|kapi|cephe|hero-|urun\/|logo\.webp|favicon|vitrin)/i;

export function isDeadLocalMedia(path?: string | null): boolean {
  if (!path) return true;
  if (/^https?:\/\//i.test(path) || path.startsWith("/uploads/") || path.includes("blob.vercel")) {
    return false;
  }
  if (path.startsWith("/assets/cms/")) {
    return /cms\/(logo|favicon)\.webp$/i.test(path);
  }
  if (path.startsWith("/assets/img/covers/")) return false;
  if (path.startsWith("/assets/img/petra-mark")) return false;
  if (path === SITE_PHOTOS.placeholder) return false;
  if (path.startsWith("/assets/img/petra-favicon")) return false;
  return DEAD_LOCAL.test(path) || path.startsWith("/assets/img/");
}

export function liveMedia(path?: string | null, fallback?: string): string {
  if (!path || isDeadLocalMedia(path)) return fallback || SITE_PHOTOS.interior;
  return path;
}

export function categoryCover(slug?: string): string {
  if (!slug) return SITE_PHOTOS.placeholder;
  return CATEGORY_COVERS[slug] || `/assets/img/covers/${categoryIcon(slug)}.svg`;
}

export const DEFAULT_GALLERY = [
  { src: SITE_PHOTOS.gallery, baslik: "Cephe · Petra", boy: "wide" as const },
  { src: SITE_PHOTOS.interior, baslik: "Salon", boy: "half" as const },
  { src: SITE_PHOTOS.facade, baslik: "Akşam ışığı", boy: "half" as const },
  { src: SITE_PHOTOS.interior, baslik: "İç mekân", boy: "third" as const },
  { src: SITE_PHOTOS.gallery, baslik: "Sofra", boy: "third" as const },
  { src: SITE_PHOTOS.facade, baslik: "Giriş", boy: "third" as const },
];

export const DEFAULT_PASTA_PHOTOS = [
  { src: SITE_PHOTOS.interior, alt: "Salon ve sofra" },
  { src: SITE_PHOTOS.gallery, alt: "Petra Yaşam Merkezi" },
  { src: SITE_PHOTOS.facade, alt: "Cephe" },
  { src: SITE_PHOTOS.interior, alt: "İç mekân" },
];
