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
] as const;

export type SiteIconId = (typeof SITE_ICON_OPTIONS)[number]["id"];

export function iconFromLabel(label: string): SiteIconId {
  const t = (label || "").toLocaleLowerCase("tr-TR");
  if (/whatsapp/.test(t)) return "whatsapp";
  if (/instagram/.test(t)) return "instagram";
  if (/posta|e-posta|email|mail/.test(t)) return "mail";
  if (/telefon|ara|0530/.test(t)) return "phone";
  if (/saat/.test(t)) return "clock";
  if (/rezerv|masa/.test(t)) return "calendar";
  if (/yüzme|yuzme/.test(t)) return "calendar";
  if (/havuz|plaj|pool|beach/.test(t)) return "waves";
  if (/konum|adres|çekmek|petra yaşam/.test(t)) return "map";
  if (/nargile/.test(t)) return "flame";
  if (/kahve|coffee/.test(t)) return "coffee";
  if (/kokteyl|içki|şarap|spritz/.test(t)) return "wine";
  if (/tatlı|dessert|cake/.test(t)) return "cake";
  if (/kahvalt|serpme|breakfast/.test(t)) return "sunrise";
  if (/dünya|şef|chef/.test(t)) return "chef";
  if (/restoran|yemek|mutfak/.test(t)) return "utensils";
  return "utensils";
}

export function categoryIcon(slug: string): SiteIconId {
  const s = (slug || "").toLowerCase();
  if (s.includes("kahvalti")) return "sunrise";
  if (s.includes("baslangic")) return "utensils";
  if (s.includes("ana-yemek") || s.includes("mutfak")) return "chef";
  if (s.includes("tatli")) return "cake";
  if (s.includes("kokteyl")) return "wine";
  if (s.includes("kahve")) return "coffee";
  if (s.includes("nargile")) return "flame";
  if (s.includes("icecek")) return "wine";
  return "utensils";
}
