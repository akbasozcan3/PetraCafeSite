/** Admin + sitede kullanılan çizgisel ikon anahtarları (emoji yok). */
export const SITE_ICON_OPTIONS = [
  { id: "utensils", label: "Restoran / yemek" },
  { id: "chef", label: "Şef / dünya mutfağı" },
  { id: "sunrise", label: "Kahvaltı" },
  { id: "waves", label: "Havuz & plaj" },
  { id: "coffee", label: "Kahve" },
  { id: "wine", label: "Kokteyl / içecek" },
  { id: "cake", label: "Tatlı" },
  { id: "flame", label: "Nargile" },
  { id: "phone", label: "Telefon" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "mail", label: "E-posta" },
  { id: "map", label: "Konum" },
  { id: "clock", label: "Saatler" },
  { id: "calendar", label: "Rezervasyon" },
  { id: "globe", label: "Dünya" },
  { id: "dumbbell", label: "Spor / Jimnastik" },
  { id: "music", label: "Canlı Müzik / Karaoke" },
  { id: "store", label: "Market / Alışveriş" },
  { id: "tiktok", label: "TikTok" },
  { id: "facebook", label: "Facebook" },
] as const;

export type SiteIconId = (typeof SITE_ICON_OPTIONS)[number]["id"];

export function iconFromLabel(label: string): SiteIconId {
  const t = (label || "").toLocaleLowerCase("tr-TR");
  if (/spor|jimnastik|fitness|gym/.test(t)) return "dumbbell";
  if (/müzik|muzik|karaoke|canlı müzik|canli muzik/.test(t)) return "music";
  if (/market|bakkal|alışveriş|alisveris|mağaza|magaza/.test(t)) return "store";
  if (/tiktok/.test(t)) return "tiktok";
  if (/facebook|fb/.test(t)) return "facebook";
  if (/whatsapp/.test(t)) return "whatsapp";
  if (/instagram/.test(t)) return "instagram";
  if (/posta|e-posta|email|mail/.test(t)) return "mail";
  if (/telefon|ara|0530/.test(t)) return "phone";
  if (/saat/.test(t)) return "clock";
  if (/rezerv|masa/.test(t)) return "calendar";
  if (/yüzme|yuzme/.test(t)) return "calendar";
  if (/havuz|plaj|pool|beach|loca/.test(t)) return "waves";
  if (/konum|adres|çekmek|petra yaşam/.test(t)) return "map";
  if (/nargile/.test(t)) return "flame";
  if (/kahve|coffee/.test(t)) return "coffee";
  if (/kokteyl|içki|şarap|spritz|içecek|icecek/.test(t)) return "wine";
  if (/tatlı|tatli|dessert|cake/.test(t)) return "cake";
  if (/kahvalt|serpme|breakfast/.test(t)) return "sunrise";
  if (/dünya|dunya|şef|chef/.test(t)) return "chef";
  if (/restoran|yemek|mutfak/.test(t)) return "utensils";
  return "utensils";
}

export function categoryIcon(slug: string): SiteIconId {
  const s = (slug || "").toLowerCase();
  if (s.includes("kahvalti") || s.includes("menemen") || s.includes("omlet")) return "sunrise";
  if (s.includes("baslangic")) return "utensils";
  if (s.includes("ana-yemek") || s.includes("mutfak") || s.includes("izgara") || s.includes("beyaz-et"))
    return "chef";
  if (s.includes("tatli")) return "cake";
  if (s.includes("kokteyl") || s.includes("frozen") || s.includes("smoothie") || s.includes("milkshake"))
    return "wine";
  if (s.includes("kahve") || s.includes("bitki")) return "coffee";
  if (s.includes("nargile") || s.includes("nakhla") || s.includes("fakher") || s.includes("adalya"))
    return "flame";
  if (s.includes("icecek")) return "wine";
  return "utensils";
}
