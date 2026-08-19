export const IMAGE_KEYS = {
  logo: {
    label: "Marka logosu (Navbar + Footer)",
    hint: "Üst menü ve footer’da görünür · PNG / SVG / WebP · şeffaf arka plan önerilir",
  },
  favicon: {
    label: "Favicon / sekme ikonu",
    hint: "Tarayıcı sekmesi · ICO, SVG veya PNG · kutuya sürükleyin",
  },
  heroPoster: {
    label: "Mobil / yedek hero (poster)",
    hint: "Mobilde ve WebGL yoksa görünür · Kapı cephesiyle aynı fotoğrafı kullanın · 1200×900",
  },
  heroMobile: {
    label: "Telefon hero görseli",
    hint: "Dar ekranda poster yerine bu kare kullanılır · 1200×1600 veya 9:16",
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
  faq: {
    label: "S.S.S. görseli",
    hint: "Sık sorulanlar sol kolon · yatay 16:10 · 1600×1000",
  },
  ogImage: {
    label: "Sosyal paylaşım görseli",
    hint: "WhatsApp / Instagram önizleme · 1200×630+",
  },
  reservation: {
    label: "Rezervasyon bölüm görseli",
    hint: "Ana sayfa rezervasyon kolonu · 1200×1600 veya kare",
  },
} as const;

export type ImageKey = keyof typeof IMAGE_KEYS;
