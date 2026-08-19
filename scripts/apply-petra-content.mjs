/**
 * Petra Cafe Restaurant — marka, iletişim, /menu URL ve havuz içeriği.
 * Hero 3B / kapı koduna dokunmaz; yalnızca data/content.json günceller.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data", "content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const PHONE = "0530 608 90 51";
const PHONE_TEL = "+905306089051";
const WA =
  "https://wa.me/905306089051?text=" +
  encodeURIComponent("Merhaba, Petra Cafe Restaurant’tan bilgi / rezervasyon istiyorum.");
const IG = "https://www.instagram.com/petracaferestaurant/";

data.navbar = {
  ...data.navbar,
  logoText: "PETRA",
  ctaLabel: PHONE,
  ctaHref: `tel:${PHONE_TEL}`,
  links: [
    { label: "Hakkımızda", href: "#hakkimizda" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Menü", href: "#menu" },
    { label: "Havuz & Plaj", href: "#pasta" },
    { label: "Rezervasyon", href: "#rezervasyon" },
    { label: "Galeri", href: "#galeri" },
    { label: "Yorumlar", href: "#yorumlar" },
    { label: "S.S.S.", href: "#sss" },
    { label: "İletişim", href: "#iletisim" },
  ],
};

data.hero = {
  ...data.hero,
  fallbackMark: "PETRA",
  fallbackTagline: "Cafe · Restaurant · Pool & Beach",
  welcomeEyebrow: "Çekmeköy · Petra Yaşam Merkezi",
  welcomeTitle: "Petra Cafe Restaurant",
  welcomeLead: "Dünya mutfağı, serpme kahvaltı, kahve ve havuz başı. Keyif, konfor ve kalite.",
};

data.marquee = [
  "PETRA",
  "DÜNYA MUTFAĞI",
  "SERPME KAHVALTI",
  "POOL & BEACH",
  "COFFEE & FOOD",
  "İTALYAN KOKTEYLLERİ",
  "İTALYAN TATLI",
  "NARGİLE",
  "ORGANİZASYON",
  "YÜZME DERSLERİ",
  "ÇEKMEKÖY",
  "TAŞDELEN",
  "KEYİF KONFOR KALİTE",
];

data.hakkimizda = {
  ...data.hakkimizda,
  eyebrow: "Hakkımızda",
  baslik: "Petra Yaşam Merkezi'nde cafe & restaurant",
  answerBaslik: "Kısaca",
  answerMetin:
    "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar. Rezervasyon: 0530 608 90 51.",
  lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
  body: [
    "Menümüzde serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller, kahve ve nargile bulunur. Havuz kenarında veya salonda servis edilir.",
    "Mekânımız Sultançiftliği Mahallesi, Selen Sokak No:1, Megakent / Petra Yaşam Merkezi’ndedir. Havuz, plaj ve kafe-restoran aynı çatı altındadır.",
    "Doğum günü, kurumsal davet ve özel günler için organizasyon masası kurulur. Yüzme dersleri birebir veya grup olarak planlanır.",
  ],
  ozet: [
    { b: "08:00–22:00", span: "her gün açık" },
    { b: "Havuz", span: "hafta içi / sonu tarife" },
    { b: "Kahvaltı", span: "serpme servis" },
    { b: "Dünya", span: "mutfağı" },
  ],
  badgeBaslik: "Petra",
  badgeAlt: "Cafe · Restaurant · Pool",
};

data.bolumlar = {
  ...data.bolumlar,
  menu: {
    eyebrow: "Menümüz",
    baslik: "Kahvaltı, dünya mutfağı, kahve",
    lead: "Serpme kahvaltı, başlangıçlar, ana yemekler, tatlılar ve kahve — havuz kenarında veya salonda.",
  },
  galeri: {
    eyebrow: "Galeri",
    baslik: "Salon, sofra ve havuz",
    lead: "Petra Cafe Restaurant ve Petra Yaşam Merkezi’nden kareler.",
  },
  yorumlar: {
    eyebrow: "Misafir Yorumları",
    baslik: "Petralovers",
    lead: "Kahvaltı, akşam yemeği ve havuz gününden notlar.",
  },
  sss: {
    eyebrow: "Sık Sorulanlar",
    baslik: "Rezervasyon, havuz ve menü",
    lead: "Masa, havuz tarifesi, yüzme dersi ve organizasyon.",
  },
  hizmetler: {
    eyebrow: "Petra",
    baslik: "Cafe · Restaurant · Pool & Beach",
    lead: "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve ve nargile — havuz kenarında veya salonda.",
  },
};

data.pasta = {
  ...data.pasta,
  eyebrow: "Havuz & Plaj",
  baslik: "Pool & Beach · 2026",
  lead: "Petra Yaşam Merkezi’nde havuz, plaj, yüzme dersleri ve organizasyon. Keyif, konfor ve kalite.",
  maddeler: [
    "Hafta içi: 02–10 yaş 400 TL · 10–18 yaş 600 TL · yetişkin 800 TL",
    "Hafta sonu: 02–10 yaş 450 TL · 10–18 yaş 650 TL · yetişkin 850 TL",
    "Birebir ve grup yüzme dersleri",
    "Doğum günü ve özel organizasyon",
  ],
  body: "Havuz girişleri ve yüzme dersi için 0530 608 90 51’i arayın veya WhatsApp’tan yazın. Organizasyonlar önceden rezerve edilir.",
  ctaLabel: "Havuz & rezervasyon",
  ctaHref: "#rezervasyon",
};

data.iletisim = {
  ...data.iletisim,
  baslik: "Masa, havuz ve organizasyon",
  giris: "Rezervasyon, havuz, yüzme dersi ve özel günler için arayın veya yazın.",
  metin: "Kahvaltı ve hafta sonu için önceden masa ayırtmanızı öneririz.",
  telefon: PHONE,
  telefonHam: PHONE_TEL,
  telefonAlt: "Rezervasyon · Havuz · Organizasyon",
  whatsapp: WA,
  whatsappBaslik: "WhatsApp’tan yazın",
  whatsappAlt: "Hızlı yanıt",
  instagram: "@petracaferestaurant",
  instagramUrl: IG,
  instagramAlt: "Instagram’da Petra",
  eposta: data.iletisim?.eposta || "",
  adresSatir1: "Sultançiftliği Mah. Selen Sokak No:1",
  adresSatir2: "Petra Yaşam Merkezi · Megakent",
  adresSatir3: "Çekmeköy / İstanbul",
  saatler: "Her gün 08:00 – 22:00",
  ozelPastaNot: "Havuz, yüzme dersi ve organizasyon — 0530 608 90 51",
  koordinat: "41.029976,29.226160",
  haritaSorgu: "41.029976,29.226160",
  etiketOzelPasta: "Havuz & organizasyon",
};

data.seo = {
  ...data.seo,
  title: "Petra Cafe Restaurant — Dünya Mutfağı · Havuz | Çekmeköy",
  description:
    "Çekmeköy Taşdelen’de Petra Cafe Restaurant. Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz. 0530 608 90 51",
  ogTitle: "Petra Cafe Restaurant | Çekmeköy",
  ogDescription: "Cafe, restaurant, pool & beach — İtalyan tatlı, kokteyl, kahve ve nargile. Petra Yaşam Merkezi, Taşdelen.",
  siteName: "Petra Cafe Restaurant",
};

data.footer = {
  ...data.footer,
  markaAdi: "Petra Cafe Restaurant",
  slogan: "Keyif, konfor ve kalite.\nDünya mutfağı · serpme kahvaltı · pool & beach.",
  kolonlar: [
    {
      baslik: "Petra",
      links: [
        { label: "Hakkımızda", href: "#hakkimizda" },
        { label: "Menü", href: "#menu" },
        { label: "Havuz & Plaj", href: "#pasta" },
        { label: "Rezervasyon", href: "#rezervasyon" },
        { label: "Galeri", href: "#galeri" },
      ],
    },
    {
      baslik: "Adres",
      links: [
        { label: "Selen Sokak No:1", href: "#iletisim" },
        { label: "Petra Yaşam Merkezi", href: "#iletisim" },
        { label: "Çekmeköy / İstanbul", href: "#iletisim" },
        { label: "08:00 – 22:00", href: "#iletisim" },
      ],
    },
    {
      baslik: "İletişim",
      links: [
        { label: PHONE, href: `tel:${PHONE_TEL}` },
        { label: "WhatsApp", href: WA },
        { label: "Instagram", href: IG },
      ],
    },
  ],
};

data.brand = { displayName: "Petra Cafe Restaurant", shortName: "PETRA" };
data.waFloat = {
  ...data.waFloat,
  baslik: "WhatsApp",
  alt: "Rezervasyon ve havuz",
  onYazi: "Merhaba, Petra Cafe Restaurant’tan bilgi / rezervasyon istiyorum.",
  ariaLabel: "WhatsApp ile yazın",
};

data.sss = {
  items: [
    {
      soru: "Rezervasyon nasıl yapılır?",
      cevap:
        "Sitedeki formdan tarih, saat ve kişi sayısını gönderin; ekibimiz telefonla onaylar. Dilerseniz 0530 608 90 51 veya Instagram’dan yazın.",
    },
    {
      soru: "Hangi saatlerde açıksınız?",
      cevap: "Her gün 08:00–22:00. Kahvaltı sabah saatlerinde, mutfak akşam servisine kadar açıktır.",
    },
    {
      soru: "Havuz fiyatları nedir?",
      cevap:
        "2026 tarifesi: hafta içi 02–10 yaş 400 TL, 10–18 yaş 600 TL, yetişkin 800 TL. Hafta sonu 450 / 650 / 850 TL. Güncel tarife için arayın.",
    },
    {
      soru: "Yüzme dersi var mı?",
      cevap: "Evet. Birebir ve grup yüzme dersleri verilir. Kontenjan için 0530 608 90 51.",
    },
    {
      soru: "Organizasyon yapıyor musunuz?",
      cevap: "Doğum günü, kurumsal ve özel günler için masa ve alan organize edilir. Önceden rezervasyon gerekir.",
    },
    {
      soru: "Serpme kahvaltı var mı?",
      cevap: "Evet. Serpme kahvaltı menümüzün öne çıkan servisidir; hafta sonu için masa ayırtmanızı öneririz.",
    },
    {
      soru: "Otopark var mı?",
      cevap: "Petra Yaşam Merkezi / Megakent çevresinde park imkânı bulunur. Yoğun saatlerde biraz yürüme gerekebilir.",
    },
    {
      soru: "Adresiniz neresi?",
      cevap:
        "Sultançiftliği Mah. Selen Sokak No:1, Petra Yaşam Merkezi, Çekmeköy / İstanbul.",
    },
  ],
};

if (data.menu?.gruplar) {
  const hasKahvalti = data.menu.gruplar.some(
    (g) => g.slug === "kahvalti" || /kahvalt/i.test(g.ad || "")
  );
  if (!hasKahvalti) {
    data.menu.gruplar.unshift({
      ad: "Kahvaltı",
      slug: "kahvalti",
      link: "/menu/kahvalti",
      tumLink: "/menu/kahvalti",
      adet: "6 çeşit",
      aciklama: "Serpme kahvaltı ve sabah tabağı — Petra’nın imza servisi.",
      urunler: [
        {
          ad: "Serpme Kahvaltı",
          slug: "serpme-kahvalti",
          fiyat: "890",
          aciklama: "İki kişilik serpme: peynirler, zeytin, bal-kaymak, yumurta, reçel ve sıcak ekmek.",
          fav: true,
          aktif: true,
          link: "/menu/kahvalti/serpme-kahvalti",
        },
        {
          ad: "Menemen",
          slug: "menemen",
          fiyat: "280",
          aciklama: "Domates, biber, yumurta — isteğe sucuk veya peynir.",
          fav: true,
          aktif: true,
          link: "/menu/kahvalti/menemen",
        },
        {
          ad: "Sahanda Yumurta",
          slug: "sahanda-yumurta",
          fiyat: "180",
          aciklama: "Tereyağında yumurta, taze otlar.",
          fav: false,
          aktif: true,
          link: "/menu/kahvalti/sahanda-yumurta",
        },
        {
          ad: "Omlet",
          slug: "omlet",
          fiyat: "240",
          aciklama: "Üç yumurta; peynir, mantar veya sebze seçenekli.",
          fav: false,
          aktif: true,
          link: "/menu/kahvalti/omlet",
        },
        {
          ad: "Bal & Kaymak",
          slug: "bal-kaymak",
          fiyat: "260",
          aciklama: "Süzme bal, kaymak ve sıcak pide.",
          fav: false,
          aktif: true,
          link: "/menu/kahvalti/bal-kaymak",
        },
        {
          ad: "Peynir Tabağı",
          slug: "peynir-tabagi",
          fiyat: "320",
          aciklama: "Günün peynirleri, ceviz ve üzüm.",
          fav: false,
          aktif: true,
          alerjen: "Süt, kuruyemiş",
          link: "/menu/kahvalti/peynir-tabagi",
        },
      ],
    });
  }

  data.menu.baslik = "Petra Menü";
  data.menu.giris =
    "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve ve nargile. Havuz kenarında veya salonda.";
  data.menu.hepsiLink = "/menu";
}

data.yorumlar = [
  {
    metin: "Serpme kahvaltı ve havuz aynı günde — Çekmeköy’de aradığımız yerdi. Servis güleryüzlüydü.",
    ad: "Elif K.",
    unvan: "Misafir",
    yildiz: 5,
  },
  {
    metin: "Akşam dünya mutfağı, oturma rahat, tempo sakin. Rezervasyonla gittik, masa hazırdı.",
    ad: "Mert A.",
    unvan: "Çekmeköy",
    yildiz: 5,
  },
  {
    metin: "Çocuklarla yüzme dersi ve kahvaltı. Organizasyon düzgün, iletişim hızlı.",
    ad: "Selin Y.",
    unvan: "Aile",
    yildiz: 5,
  },
  {
    metin: "Keyif, konfor, kalite sloganı yerinde. Kahve ve tatlı için de uğruyoruz.",
    ad: "Burak D.",
    unvan: "Petralovers",
    yildiz: 5,
  },
];

let json = JSON.stringify(data, null, 2);
json = json.replace(/\/urunler/g, "/menu");
json = json.replace(/0552 340 02 02/g, PHONE);
json = json.replace(/\+905523400202/g, PHONE_TEL);
json = json.replace(/firincitasdelenn/g, "petracaferestaurant");
json = json.replace(/Taşdelen Restoran/g, "Petra Cafe Restaurant");

fs.writeFileSync(file, json + "\n");
console.log("apply-petra-content ok");
