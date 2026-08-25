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
  { src: "/assets/cms/petra-pool-beach-loca.jpg", baslik: "Pool & Beach & VIP Hasır Localar", boy: "wide" as const },
  { src: "/assets/cms/petra-nargile-havuz-gece.jpg", baslik: "Gece Havuz Kenarı Nargile & Lounge", boy: "half" as const },
  { src: "/assets/cms/petra-restoran-salon-organizasyon.jpg", baslik: "Petra Salonu & Özel Davet Masaları", boy: "half" as const },
  { src: "/uploads/site/1787135028402-7fc886bbee092d11.webp", baslik: "Sıcak & Konforlu Restoran Atmosferi", boy: "third" as const },
  { src: "/uploads/site/1787059804386-3117dc6067f91a4a.webp", baslik: "Petra Yaşam Merkezi Giriş Cephesi", boy: "third" as const },
  { src: "/assets/cms/petra-havuz-fiyat-listesi-2026.jpg", baslik: "2026 Günlük Havuz Giriş Tarifesi", boy: "third" as const },
];

export const DEFAULT_PASTA_PHOTOS = [
  { src: SITE_PHOTOS.interior, alt: "Salon ve sofra" },
  { src: SITE_PHOTOS.gallery, alt: "Petra Yaşam Merkezi" },
  { src: SITE_PHOTOS.facade, alt: "Cephe" },
  { src: SITE_PHOTOS.interior, alt: "İç mekân" },
];
