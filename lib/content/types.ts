import type { HeroTextMap } from "./hero-text";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  logoText: string;
  /** Sağdaki ana buton — Rezervasyon */
  ctaLabel: string;
  ctaHref: string;
  /** Navbar’da telefonu da göster (iletişim numarasından) */
  showPhone?: boolean;
  /** Navbar logo height/width in px (admin controlled) */
  logoSize?: number;
  /** When true (default if logo image exists), hide wordmark text next to logo */
  logoTextGizle?: boolean;
  /** Mobil menü başlığı */
  mobileLabel?: string;
  links: NavLink[];
}

export interface HakkimizdaStat {
  b: string;
  span: string;
  sub?: string;
}

export interface HakkimizdaExperience {
  title: string;
  desc: string;
  hours: string;
  tag: string;
  features?: string[];
  icon?: string;
}

export interface HakkimizdaTimelineItem {
  time: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface HakkimizdaValueItem {
  title: string;
  desc: string;
  icon?: string;
}

export interface HakkimizdaFaqItem {
  q: string;
  a: string;
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
  homeWordLimit?: number;
  stats?: HakkimizdaStat[];
  experiences?: HakkimizdaExperience[];
  timeline?: HakkimizdaTimelineItem[];
  values?: HakkimizdaValueItem[];
  amenities?: string[];
  eventsTitle?: string;
  eventsLead?: string;
  eventsTags?: string[];
  faqs?: HakkimizdaFaqItem[];
  /** Son CTA bölümü — sayfanın alt çağrısı */
  ctaTitle?: string;
  ctaLead?: string;
  ctaBtn1?: string;
  ctaBtn2?: string;
}

export interface BolumBaslik {
  eyebrow: string;
  baslik: string;
  lead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  cta2Label?: string;
  cta2Href?: string;
}

/** Admin’den site renkleri — CSS değişkenlerine yazılır */
export interface ThemeContent {
  ink: string;
  paper: string;
  cream: string;
  cream2: string;
  muted: string;
  brass: string;
  brassLo: string;
  char: string;
  char2: string;
  olive: string;
  navSolidBg: string;
  navSolidText: string;
  navHeroText: string;
  ctaBg: string;
  ctaText: string;
  footerBg: string;
  footerText: string;
}

export interface HizmetItem {
  label: string;
  icon?: string;
  emoji?: string;
  href?: string;
  aciklama?: string;
}

export interface ZiyaretItem {
  k: string;
  v: string;
  n: string;
  href?: string;
}

export interface RezervasyonCopy {
  minKisi?: number;
  maxKisi?: number;
  maddeler?: string[];
  ctaLabel?: string;
  successMetin?: string;
  formKicker?: string;
  formBaslik?: string;
  formLead?: string;
  labelTarih?: string;
  labelSaat?: string;
  labelKisi?: string;
  labelAd?: string;
  labelTelefon?: string;
  labelNot?: string;
  placeholderAd?: string;
  placeholderTelefon?: string;
  placeholderNot?: string;
  kisiSablon?: string;
  kapaliMetin?: string;
  gonderiliyor?: string;
  hataTelefon?: string;
  hataBaglanti?: string;
  hataKapali?: string;
  gorselAlt?: string;
}


export interface MesajFormCopy {
  kicker?: string;
  baslik?: string;
  lead?: string;
  labelAd?: string;
  labelTelefon?: string;
  labelEposta?: string;
  labelMesaj?: string;
  placeholderAd?: string;
  placeholderTelefon?: string;
  placeholderEposta?: string;
  placeholderMesaj?: string;
  gonder?: string;
  gonderiliyor?: string;
  success?: string;
  hataTelefon?: string;
  hataBaglanti?: string;
}

export type HomeSectionId =
  | "duyuru"
  | "hero"
  | "marquee"
  | "hizmetler"
  | "hakkimizda"
  | "ziyaret"
  | "menu"
  | "pasta"
  | "galeri"
  | "yorumlar"
  | "sss"
  | "rezervasyon"
  | "iletisim";

export type BolumGoster = Partial<Record<HomeSectionId, boolean>>;

export interface PastaFiyatSatir {
  kategori: string;
  haftaIci: string;
  haftaSonu: string;
}

export interface PastaDers {
  baslik: string;
  kicker?: string;
  metin: string;
}

export interface PastaContent {
  eyebrow: string;
  baslik: string;
  lead: string;
  slogan?: string;
  cafeSaat?: string;
  havuzSaat?: string;
  derinlik?: string;
  fiyatBaslik?: string;
  fiyatlar?: PastaFiyatSatir[];
  fiyatNot?: string;
  dersBaslik?: string;
  dersLead?: string;
  dersler?: PastaDers[];
  kurallar?: string[];
  instagramEtiket?: string;
  instagramHref?: string;
  maddeler: string[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
  gorseller: {
    src: string;
    alt: string;
    desc?: string;
    tag?: string;
    position?: string;
  }[];
  yuzmeKursu?: {
    baslik?: string;
    rozet?: string;
    lead?: string;
    programGunler?: string;
    programSaat?: string;
    yasGruplari?: string[];
    grupFiyat?: string;
    ozelFiyat?: string;
    afisGorsel?: string;
    telefon?: string;
    instagram?: string;
  };
}

export interface GaleriItem {
  src: string;
  baslik: string;
  boy?: "wide" | "half" | "third";
  aktif?: boolean;
}

export interface YorumItem {
  metin: string;
  ad: string;
  unvan: string;
  yildiz?: number;
}

export interface MenuUrunImage {
  url: string;
  alt?: string;
  source?: "admin" | "integration" | "local" | "external";
  order?: number;
  isPrimary?: boolean;
}

export interface MenuUrun {
  /** Kararlı kimlik (slug’dan üretilir, entegrasyon yoksa) */
  id?: string;
  ad: string;
  slug?: string;
  not?: string;
  aciklama?: string;
  /** Ana görsel (admin / local) — öncelik zincirinde admin */
  image?: string;
  /** Galeri görselleri */
  images?: MenuUrunImage[];
  /** Entegrasyondan gelen ham görsel URL (kopyalanmaz; referans) */
  externalImageUrl?: string;
  imageAlt?: string;
  fav?: boolean;
  fiyat?: string;
  /** Gramaj vb. seçenekler — yalnızca gerçek veri */
  varyantlar?: string[];
  icindekiler?: string;
  alerjen?: string;
  saklama?: string;
  seoTitle?: string;
  seoDescription?: string;
  link?: string;
  kategori?: string;
  /** Trendyol Go / Meal product id — sync upsert anahtarı */
  trendyolId?: string;
  /** Yemeksepeti Partner catalog product/sku id */
  yemeksepetiId?: string;
  /** Genel: provider:externalId */
  externalId?: string;
  /** Örn. "trendyol_go" | "yemeksepeti" | "local" */
  source?: string;
  /** Birden fazla platform ilişkisi */
  sources?: string[];
  /** API fiyatını otomatik güncelle (admin kontrolü) */
  autoUpdatePrice?: boolean;
  stok?: number | null;
  aktif?: boolean;
  ozelSiparis?: boolean;
  lastSyncedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuSssItem {
  soru: string;
  cevap: string;
}

export interface MenuGrup {
  ad: string;
  slug?: string;
  aktif?: boolean;
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
  /** Ana sayfa menü sekmelerinde göster */
  home?: boolean;
  urunler: MenuUrun[];
  trendyolCategoryId?: string;
  integrationCategoryId?: string;
  source?: string;
}

export interface MenuContent {
  /** Basılı menü sürümü — Postgres’te eski menüyü bir kez günceller */
  rev?: string;
  baslik?: string;
  giris?: string;
  not?: string;
  kdvDurumu?: string;
  legend?: string;
  hepsiMetin?: string;
  hepsiLink?: string;
  /** "{ad} hakkında bilgi →" şablonu */
  tumMetinSablon?: string;
  kartNot?: string;
  emptyMetin?: string;
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
  /** Kapak görseli */
  kapak?: string;
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
  servesCuisine?: string;
  priceRange?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
  acceptsReservations?: boolean;
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
  iletisimBaslik?: string;
  whatsappEtiket?: string;
  barLinks?: FooterLink[];
  logoWidth?: number;
  logoHeight?: number;
}

export interface WaFloatContent {
  baslik: string;
  alt: string;
  onYazi: string;
  ariaLabel: string;
}

export interface LegalPageContent {
  title: string;
  lead?: string;
  body: string;
  updatedAt?: string;
}

export interface LegalContent {
  kvkk?: string;
  gizlilik?: string;
  cerez?: string;
  gizlilikPolitikasi?: LegalPageContent;
  rezervasyonKosullari?: LegalPageContent;
  kullanimKosullari?: LegalPageContent;
  cerezPolitikasi?: LegalPageContent;
  ticariBilgiler?: LegalPageContent;
}

export interface YorumlarMeta {
  googleSayacMetin: string;
  googleSkor: string;
  dogrulamaEtiketi: string;
  googleUrl?: string;
  badgeCta?: string;
  unvanVarsayilan?: string;
}

export interface CalismaGunu {
  gun: string;
  acilis: string;
  kapanis: string;
  kapali?: boolean;
}

export interface SocialLink {
  id: string;
  platform: "instagram" | "whatsapp" | "tiktok" | "facebook" | "youtube" | "twitter" | "maps" | "telegram" | "linkedin" | "other";
  label: string;
  url: string;
  active?: boolean;
}

export interface IletisimContent {
  baslik: string;
  giris: string;
  metin: string;
  eyebrow: string;
  telefon: string;
  telefonHam: string;
  telefonAlt: string;
  telefon2?: string;
  telefon2Alt?: string;
  whatsapp: string;
  whatsappBaslik: string;
  whatsappAlt: string;
  instagram: string;
  instagramUrl: string;
  instagramAlt: string;
  tiktokUrl?: string;
  facebookUrl?: string;
  eposta: string;
  epostaAlt: string;
  adresSatir1: string;
  adresSatir2: string;
  adresSatir3: string;
  /** Kısa satır (navbar / footer) — gün tablosundan üretilir, elle düzeltilebilir */
  saatler: string;
  /** Pazartesi–Pazar açılış / kapanış */
  saatProgrami?: CalismaGunu[];
  ozelPastaNot: string;
  koordinat: string;
  haritaSorgu: string;
  haritaButonMetin: string;
  socials?: SocialLink[];
  haritaIframeBaslik?: string;
  etiketAdres?: string;
  etiketSaatler?: string;
  etiketTelefon?: string;
  etiketWhatsapp?: string;
  etiketOzelPasta?: string;
}

/** Alt sayfa metinleri (ürünler hub, kategori, blog) */
export interface SayfalarContent {
  urunler: {
    eyebrow: string;
    baslikSablon: string;
    lead: string;
    /** Hub alt not (örn. sunum menüsü uyarısı) */
    altNot?: string;
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
    /** Ürün detay not satırları (satır satır) */
    detayNotlari?: string;
    detayWaLabel?: string;
    detayTelLabel?: string;
    fiyatSorulur?: string;
  };
  blog: {
    eyebrow: string;
    baslik: string;
    lead: string;
    ctaBaslik: string;
    ctaMetin: string;
  };
  notFound?: {
    kicker?: string;
    title?: string;
    lead?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    waLabel?: string;
    showQuickLinks?: boolean;
  };
}

export interface SporSalonuContent {
  eyebrow?: string;
  baslik: string;
  lead: string;
  body: string[];
  saatler?: string;
  telefon?: string;
  telefon2?: string;
  instagram?: string;
  instagramUrl?: string;
  ozellikler?: {
    baslik: string;
    alt: string;
    ikon?: string;
  }[];
  bentoGorseller?: {
    src: string;
    alt: string;
    rozet?: string;
  }[];
  gorseller?: { src: string; alt: string }[];
  alanlar?: {
    baslik: string;
    kicker: string;
    metin: string;
    ikon?: string;
  }[];
  imkanlar?: string[];
  deneyimler?: {
    baslik: string;
    metin: string;
  }[];
  ctaTitle?: string;
  ctaLead?: string;
}

export interface LoaderContent {
  aktif?: boolean;
  tema?: "light" | "dark";
  baslik?: string;
  sublabel?: string;
  logoBoyut?: number;
  arkaplanRenk?: string;
  halkaRenk?: string;
  yaziRenk?: string;
  koseSusleri?: boolean;
}

export interface SiteContent {
  images: Record<string, string>;
  navbar: NavbarContent;
  loader?: LoaderContent;
  sporSalonu?: SporSalonuContent;
  hero: {
    fallbackMark: string;
    fallbackTagline: string;
    scrollHint: string;
    /** Kapı yüklenirken gösterilen kısa metin */
    bootText?: string;
    /** Kapı açılınca hoş geldiniz yazısı */
    welcomeAktif?: boolean;
    /** Karşılama yazısının koyu cam kutusu */
    welcomeKutu?: boolean;
    welcomeKutuRenk?: string;
    welcomeKutuKenar?: string;
    /** 0–100 */
    welcomeKutuOpaklik?: number;
    welcomeEyebrow?: string;
    welcomeTitle?: string;
    welcomeLead?: string;
    /** Cephe fotoğrafında 3D kapı bölgesi (0–1) — masaüstü */
    doorUv?: { u0: number; u1: number; v0: number; v1: number };
    /** Telefon kadrajı için ayrı kapı bölgesi (yoksa doorUv) */
    doorUvMobile?: { u0: number; u1: number; v0: number; v1: number };
    /** Hero yazı konumu / stil — masaüstü */
    textStyles?: HeroTextMap;
    /** Hero yazı konumu / stil — telefon */
    textStylesMobile?: HeroTextMap;
  };
  marquee: string[];
  duyuru: { aktif: boolean; metin: string };
  hakkimizda: HakkimizdaContent;
  bolumlar: {
    menu: BolumBaslik;
    galeri: BolumBaslik;
    yorumlar: BolumBaslik;
    sss: BolumBaslik;
    rezervasyon?: BolumBaslik;
    hizmetler?: BolumBaslik;
  };
  theme?: ThemeContent;
  ziyaret?: ZiyaretItem[];
  hizmetler?: HizmetItem[];
  rezervasyon?: RezervasyonCopy;
  mesajForm?: MesajFormCopy;
  bolumGoster?: BolumGoster;
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
