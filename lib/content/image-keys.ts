export const IMAGE_KEYS = {
  logo: {
    label: "Marka logosu (Navbar + Footer)",
    hint: "Üst menü ve footer’da görünür · PNG / SVG / WebP · şeffaf arka plan önerilir",
  },
  favicon: {
    label: "Favicon / sekme ikonu",
    hint: "Tarayıcı sekmesi · SVG veya 512×512 PNG",
  },
  heroPoster: {
    label: "Mobil / yedek hero (poster)",
    hint: "Mobilde ve WebGL yoksa görünür · Kapı cephesiyle aynı fotoğrafı kullanın · 1200×900",
  },
  heroCephe: {
    label: "Açılan kapı — cephe (3D)",
    hint: "Masaüstünde kaydırınca açılan kapı BU görsel · Kapıyı ortala · 4:3 veya yatay · 1800×1350",
  },
  heroIc: {
    label: "Kapı arkası iç mekân (3D)",
    hint: "Kapı açılınca içeride görünen vitrin · 1800×1350",
  },
  aboutInterior: {
    label: "Hakkımızda görseli",
    hint: "Hakkımızda bölümü · 1800×1350",
  },
  ogImage: {
    label: "Sosyal paylaşım görseli",
    hint: "WhatsApp / Instagram önizleme · 1200×630+",
  },
} as const;

export type ImageKey = keyof typeof IMAGE_KEYS;
