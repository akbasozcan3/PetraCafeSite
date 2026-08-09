export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  logoText: string;
  ctaLabel: string;
  ctaHref: string;
  /** Navbar logo height/width in px (admin controlled) */
  logoSize?: number;
  /** When true (default if logo image exists), hide "FIRINCI" text next to logo */
  logoTextGizle?: boolean;
  /** Mobil menü başlığı */
  mobileLabel?: string;
  links: NavLink[];
}

export interface HakkimizdaContent {
  eyebrow: string;
  baslik: string;
  answerBaslik: string;
  answerMetin: string;
  lead: string;
  body: string[];
  ozet: { b: string; span: string }[];
  badgeBaslik: string;
  badgeAlt: string;
}

export interface BolumBaslik {
  eyebrow: string;
  baslik: string;
  lead?: string;
}

export interface PastaContent {
  eyebrow: string;
  baslik: string;
  lead: string;
  maddeler: string[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  gorseller: { src: string; alt: string }[];
}

export interface GaleriItem {
  src: string;
  baslik: string;
  boy?: "wide" | "half" | "third";
}

export interface YorumItem {
  metin: string;
  ad: string;
  unvan: string;
  yildiz?: number;
}

export interface MenuUrun {
  ad: string;
  slug?: string;
  not?: string;
  aciklama?: string;
  image?: string;
  fav?: boolean;
  fiyat?: string;
  link?: string;
  kategori?: string;
  /** Trendyol Go / Meal product id — sync upsert anahtarı */
  trendyolId?: string;
  /** Örn. "trendyol" | "local" */
  source?: string;
  aktif?: boolean;
}

export interface MenuSssItem {
  soru: string;
  cevap: string;
}

export interface MenuGrup {
  ad: string;
  slug?: string;
  image?: string;
  banner?: string;
  aciklama?: string;
  /** Kategori sayfasındaki uzun makale HTML */
  govdeHtml?: string;
  /** Kategori sayfasındaki "Sık sorulanlar" (accordion) */
  sss?: MenuSssItem[];
  link?: string;
  adet?: string;
  tumLink?: string;
  urunler: MenuUrun[];
  trendyolCategoryId?: string;
  source?: string;
}

export interface MenuContent {
  baslik?: string;
  giris?: string;
  not?: string;
  legend?: string;
  hepsiMetin?: string;
  hepsiLink?: string;
  /** "{ad} hakkında bilgi →" şablonu */
  tumMetinSablon?: string;
  kartNot?: string;
  gruplar: MenuGrup[];
}

export interface MakaleItem {
  slug: string;
  baslik: string;
  ozet?: string;
  kategori?: string;
  tarih?: string;
  yayinda?: boolean;
  statik?: boolean;
  /** Kart üzerinde okuma süresi metni */
  okumaSuresi?: string;
  /** İleride tam makale HTML (şimdilik opsiyonel) */
  govdeHtml?: string;
}

export interface ManifestoContent {
  ustBaslik: string;
  satirlar: { kalin: string; italik: string }[];
}

export interface SeoContent {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  siteName: string;
  canonicalUrl: string;
  themeColor: string;
}

/** Tek yerden mağaza markası (SEO / footer / navbar / hero ile senkron) */
export interface BrandContent {
  displayName: string;
  shortName?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  baslik: string;
  links: FooterLink[];
}

export interface FooterContent {
  markaAdi: string;
  yasalMetin: string;
  slogan: string;
  kolonlar: FooterColumn[];
}

export interface WaFloatContent {
  baslik: string;
  alt: string;
  onYazi: string;
  ariaLabel: string;
}

export interface LegalContent {
  kvkk: string;
  gizlilik: string;
  cerez: string;
}

export interface YorumlarMeta {
  googleSayacMetin: string;
  googleSkor: string;
  dogrulamaEtiketi: string;
  googleUrl?: string;
  badgeCta?: string;
  unvanVarsayilan?: string;
}

export interface IletisimContent {
  baslik: string;
  giris: string;
  metin: string;
  eyebrow: string;
  telefon: string;
  telefonHam: string;
  telefonAlt: string;
  whatsapp: string;
  whatsappBaslik: string;
  whatsappAlt: string;
  instagram: string;
  instagramUrl: string;
  instagramAlt: string;
  eposta: string;
  epostaAlt: string;
  adresSatir1: string;
  adresSatir2: string;
  adresSatir3: string;
  saatler: string;
  ozelPastaNot: string;
  koordinat: string;
  haritaSorgu: string;
  haritaButonMetin: string;
  etiketAdres?: string;
  etiketSaatler?: string;
  etiketTelefon?: string;
  etiketWhatsapp?: string;
  etiketOzelPasta?: string;
  [key: string]: string | undefined;
}

/** Alt sayfa metinleri (ürünler hub, kategori, blog) */
export interface SayfalarContent {
  urunler: {
    eyebrow: string;
    baslikSablon: string;
    lead: string;
  };
  urunKategori: {
    eyebrow: string;
    answerBaslik: string;
    listeBaslikSablon: string;
    kartNot: string;
    ctaBaslik: string;
    ctaWaLabel: string;
    relatedBaslik: string;
    relatedHepsi: string;
  };
  blog: {
    eyebrow: string;
    baslik: string;
    lead: string;
    ctaBaslik: string;
    ctaMetin: string;
  };
}

export interface SiteContent {
  images: Record<string, string>;
  navbar: NavbarContent;
  hero: {
    fallbackMark: string;
    fallbackTagline: string;
    scrollHint: string;
    /** Kapı açılınca hoş geldiniz yazısı */
    welcomeAktif?: boolean;
    welcomeEyebrow?: string;
    welcomeTitle?: string;
    welcomeLead?: string;
    /** Cephe fotoğrafında 3D kapı bölgesi (0–1) */
    doorUv?: { u0: number; u1: number; v0: number; v1: number };
  };
  marquee: string[];
  duyuru: { aktif: boolean; metin: string };
  hakkimizda: HakkimizdaContent;
  bolumlar: {
    menu: BolumBaslik;
    galeri: BolumBaslik;
    yorumlar: BolumBaslik;
    sss: BolumBaslik;
  };
  pasta: PastaContent;
  makaleler: MakaleItem[];
  manifesto: ManifestoContent;
  hikaye: unknown;
  menu: MenuContent | null;
  galeri: GaleriItem[];
  yorumlar: YorumItem[];
  yorumlarSource?: "manual" | "external";
  yorumlarApi?: string;
  yorumlarMeta?: YorumlarMeta;
  sss?: { items: { soru: string; cevap: string }[] };
  iletisim: IletisimContent;
  seo: SeoContent;
  footer: FooterContent;
  waFloat: WaFloatContent;
  legal: LegalContent;
  sayfalar?: SayfalarContent;
  brand?: BrandContent;
}
