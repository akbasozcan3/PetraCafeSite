import type { HomeSectionId, SiteContent } from "./types";

export const HOME_SECTION_META: {
  id: HomeSectionId;
  label: string;
  href: string;
  admin: string;
  description: string;
}[] = [
  { id: "duyuru", label: "Duyuru bandı", href: "/#duyuru", admin: "/admin/duyuru", description: "Üst şerit metni ve açık/kapalı" },
  { id: "hero", label: "Kapı / Hero", href: "/", admin: "/admin/hero", description: "Giriş sahnesi, yazılar ve kapı görselleri" },
  { id: "marquee", label: "Kayan şerit", href: "/#mqBand", admin: "/admin/hero", description: "Hero altındaki dönen kelimeler" },
  { id: "hizmetler", label: "Hizmetler", href: "/#hizmetler", admin: "/admin/bolumlar", description: "Kartlar, ikonlar ve bağlantılar" },
  { id: "hakkimizda", label: "Hakkımızda", href: "/#hakkimizda", admin: "/admin/hakkimizda", description: "Metin, özet kutuları ve görsel" },
  { id: "ziyaret", label: "Ziyaret şeridi", href: "/#ziyaret", admin: "/admin/bolumlar", description: "Saat, telefon, havuz, konum kartları" },
  { id: "menu", label: "Menü önizleme", href: "/#menu", admin: "/admin/menu", description: "Ana sayfa menü sekmeleri ve şef önerileri" },
  { id: "pasta", label: "Havuz & Plaj", href: "/#pasta", admin: "/admin/pasta", description: "Tarife, maddeler ve görseller" },
  { id: "galeri", label: "Galeri", href: "/#galeri", admin: "/admin/galeri", description: "Fotoğraflar ve başlık" },
  { id: "yorumlar", label: "Yorumlar", href: "/#yorumlar", admin: "/admin/yorumlar", description: "Misafir yorumları ve Google rozeti" },
  { id: "sss", label: "S.S.S.", href: "/#sss", admin: "/admin/sss", description: "Soru-cevap ve görsel" },
  { id: "rezervasyon", label: "Rezervasyon", href: "/#rezervasyon", admin: "/admin/bolumlar", description: "Form metinleri ve maddeler" },
  { id: "iletisim", label: "İletişim", href: "/#iletisim", admin: "/admin/iletisim", description: "Adres, harita ve mesaj formu" },
];

export function isHomeSectionOn(
  content: Pick<SiteContent, "bolumGoster"> | null | undefined,
  id: HomeSectionId
): boolean {
  return content?.bolumGoster?.[id] !== false;
}
