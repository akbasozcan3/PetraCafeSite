/**
 * One-shot: bakery copy → restaurant / world cuisine.
 * Keeps hero images, doorUv, address, phone, logo.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data", "content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

function dish(ad, fiyat, aciklama, extra = {}) {
  const slug = extra.slug;
  return {
    ad,
    slug,
    fiyat,
    aciklama,
    not: extra.not || "",
    fav: Boolean(extra.fav),
    aktif: true,
    image: extra.image || undefined,
    alerjen: extra.alerjen || "",
    link: extra.cat ? `/urunler/${extra.cat}/${slug}` : undefined,
  };
}

const menu = {
  baslik: "Şefin Sofrası",
  giris:
    "Akdeniz, Anadolu ve Uzak Doğu mutfaklarından seçilmiş tabaklar; mevsimlik malzeme, açık ateş ve klasik teknik.",
  legend: "★ işaretliler şefin önerileridir.",
  hepsiMetin: "Tüm menüyü inceleyin →",
  hepsiLink: "/urunler",
  tumMetinSablon: "{ad} →",
  not: "Fiyatlara KDV dahildir. Alerjen (gluten, süt, kabuklu deniz ürünü, kuruyemiş) bilgisi için servis ekibimize danışın. Menü mevsimsel olarak güncellenir.",
  gruplar: [
    {
      ad: "Başlangıçlar",
      slug: "baslangiclar",
      link: "/urunler/baslangiclar",
      tumLink: "/urunler/baslangiclar",
      adet: "6 çeşit",
      aciklama: "Sofrayı açan, paylaşmaya uygun tabaklar.",
      urunler: [
        dish(
          "Tuna Tartar",
          "420",
          "Yellowfin ton, avokado, yuzu, susam ve nori gevreği.",
          { slug: "tuna-tartar", cat: "baslangiclar", fav: true, alerjen: "Balık, susam" }
        ),
        dish(
          "Burrata & Heirloom",
          "380",
          "Kremalı burrata, renkli domates, fesleğen yağı ve 25 yıllık balsamico.",
          { slug: "burrata-heirloom", cat: "baslangiclar", alerjen: "Süt" }
        ),
        dish(
          "Izgara Ahtapot",
          "490",
          "Kömür ateşinde ahtapot, patates ezmesi, pul biber yağı ve limon.",
          { slug: "izgara-ahtapot", cat: "baslangiclar", fav: true, alerjen: "Kabuklu deniz ürünü" }
        ),
        dish(
          "Trüflü Mantar Çorbası",
          "240",
          "Kestane mantarı, krema, siyah trüf ve brioche kruton.",
          { slug: "truflu-mantar-corbasi", cat: "baslangiclar", alerjen: "Süt, gluten" }
        ),
        dish(
          "Humus & Zahter",
          "220",
          "Nohut püresi, tahin, zahter yağı, nar ekşisi ve tandır lavaş.",
          { slug: "humus-zahter", cat: "baslangiclar", alerjen: "Susam, gluten" }
        ),
        dish(
          "Dana Carpaccio",
          "410",
          "İnce dilim dana, kapari, parmesan, ruka ve trüf yağı.",
          { slug: "dana-carpaccio", cat: "baslangiclar", alerjen: "Süt" }
        ),
      ],
    },
    {
      ad: "Ana Yemekler",
      slug: "ana-yemekler",
      link: "/urunler/ana-yemekler",
      tumLink: "/urunler/ana-yemekler",
      adet: "8 çeşit",
      aciklama: "Şefin imza tabakları — ızgara, fırın ve deniz.",
      urunler: [
        dish(
          "Wagyu Ribeye",
          "1.450",
          "Mermer damarlı ribeye, kemik iliği yağı, közlenmiş pırasa ve kırmızı şarap sosu.",
          { slug: "wagyu-ribeye", cat: "ana-yemekler", fav: true }
        ),
        dish(
          "Kuzu Pirzola",
          "890",
          "Kekikli kuzu, köz biber, yoğurt köpüğü ve nar ekşisi.",
          { slug: "kuzu-pirzola", cat: "ana-yemekler", fav: true, alerjen: "Süt" }
        ),
        dish(
          "Somon Teriyaki",
          "720",
          "Norveç somonu, teriyaki glaze, yasemin pilavı ve sesam.",
          { slug: "somon-teriyaki", cat: "ana-yemekler", alerjen: "Balık, susam, soya" }
        ),
        dish(
          "Ördek Confit",
          "780",
          "Yavaş pişmiş ördek bacağı, portakal gastrique, kök sebze ve yabani pirinç.",
          { slug: "ordek-confit", cat: "ana-yemekler" }
        ),
        dish(
          "Deniz Mahsullü Risotto",
          "640",
          "Arborio, karides, kalamar, safran ve limon kabuğu.",
          { slug: "deniz-mahsullu-risotto", cat: "ana-yemekler", alerjen: "Kabuklu deniz ürünü, süt" }
        ),
        dish(
          "Mantarlı Tagliatelle",
          "480",
          "El açması makarna, orman mantarı, parmesan ve taze kekik.",
          { slug: "mantarli-tagliatelle", cat: "ana-yemekler", alerjen: "Gluten, süt, yumurta" }
        ),
        dish(
          "Izgara Levrek",
          "690",
          "Bütün levrek, zeytinyağı, rezene, kapari ve ızgara limon.",
          { slug: "izgara-levrek", cat: "ana-yemekler", alerjen: "Balık" }
        ),
        dish(
          "Sebze Güveç",
          "420",
          "Mevsim sebzesi, nohut, domates salçası, taze ot ve yoğurt.",
          { slug: "sebze-guvec", cat: "ana-yemekler", alerjen: "Süt" }
        ),
      ],
    },
    {
      ad: "Tatlılar",
      slug: "tatlilar",
      link: "/urunler/tatlilar",
      tumLink: "/urunler/tatlilar",
      adet: "5 çeşit",
      aciklama: "Klasik Avrupa ve Anadolu tatlıları.",
      urunler: [
        dish(
          "Sıcak Çikolata Soufflé",
          "280",
          "Akışkan bitter çikolata, vanilyalı dondurma.",
          {
            slug: "sicak-cikolata-souffle",
            cat: "tatlilar",
            fav: true,
            alerjen: "Süt, yumurta, gluten",
            image: "/assets/img/urun/tatli-bufe.jpg",
          }
        ),
        dish(
          "Crème Brûlée",
          "240",
          "Vanilya çekirdekli krema, karamelize şeker kabuğu.",
          { slug: "creme-brulee", cat: "tatlilar", alerjen: "Süt, yumurta" }
        ),
        dish(
          "Fıstıklı Katmer",
          "260",
          "Antep fıstığı, kaymak ve tereyağlı yufka.",
          {
            slug: "fistikli-katmer",
            cat: "tatlilar",
            fav: true,
            alerjen: "Gluten, süt, kuruyemiş",
            image: "/assets/img/urun/tatli-bufe.jpg",
          }
        ),
        dish(
          "Tiramisu",
          "250",
          "Espresso, mascarpone, kakao ve savoiardi.",
          { slug: "tiramisu", cat: "tatlilar", alerjen: "Süt, yumurta, gluten" }
        ),
        dish(
          "Mevsim Meyve Tabağı",
          "220",
          "Günün meyveleri, nar ekşisi ve naneli yoğurt.",
          { slug: "mevsim-meyve-tabagi", cat: "tatlilar", alerjen: "Süt" }
        ),
      ],
    },
    {
      ad: "İçecekler",
      slug: "icecekler",
      link: "/urunler/icecekler",
      tumLink: "/urunler/icecekler",
      adet: "8 çeşit",
      aciklama: "Kadeh, kokteyl ve alkolsüz seçkiler.",
      urunler: [
        dish("Şefin Kokteyli", "280", "Mevsim meyvesi, bitter ve ev yapımı şurup.", {
          slug: "sefin-kokteyli",
          cat: "icecekler",
          fav: true,
        }),
        dish("Kırmızı Şarap Kadehi", "220", "Günün kırmızısı — sommelier seçkisi.", {
          slug: "kirmizi-sarap-kadehi",
          cat: "icecekler",
        }),
        dish("Beyaz Şarap Kadehi", "210", "Günün beyazı — mineral ve ferah.", {
          slug: "beyaz-sarap-kadehi",
          cat: "icecekler",
        }),
        dish("Espresso", "80", "Çift shot, koyu kavrum.", { slug: "espresso", cat: "icecekler" }),
        dish("Türk Kahvesi", "70", "Közde, orta şeker veya sade.", {
          slug: "turk-kahvesi",
          cat: "icecekler",
        }),
        dish("Ev Yapımı Limonata", "90", "Taze limon, nane, soda.", {
          slug: "ev-yapimi-limonata",
          cat: "icecekler",
        }),
        dish("Soğuk Brew", "95", "12 saat demleme, buz ve portakal kabuğu.", {
          slug: "soguk-brew",
          cat: "icecekler",
        }),
        dish("Maden Suyu", "50", "Doğal mineralli, limon dilimi.", {
          slug: "maden-suyu",
          cat: "icecekler",
        }),
      ],
    },
  ],
};

data.navbar = {
  ...data.navbar,
  logoText: "TAŞDELEN",
  links: [
    { label: "Hakkımızda", href: "#hakkimizda" },
    { label: "Menü", href: "#menu" },
    { label: "Şefin Masası", href: "#pasta" },
    { label: "Rezervasyon", href: "#rezervasyon" },
    { label: "Galeri", href: "#galeri" },
    { label: "Yorumlar", href: "#yorumlar" },
    { label: "S.S.S.", href: "#sss" },
    { label: "İletişim", href: "#iletisim" },
  ],
};

data.hero = {
  ...data.hero,
  fallbackMark: "TAŞDELEN",
  fallbackTagline: "Dünya Mutfağı · Şef Sofrası",
  welcomeEyebrow: "Çekmeköy · Dünya Mutfağı",
  welcomeTitle: "Sofrada Dünya",
  welcomeLead:
    "Akdeniz'den Uzak Doğu'ya, şefimizin elinden çıkan lezzetler tek masada.",
};

data.marquee = [
  "DÜNYA MUTFAĞI",
  "ŞEFİN SOFRASı",
  "AKDENİZ",
  "TAŞDELEN",
  "REZERVASYON",
  "TADIM MENÜSÜ",
  "ÇEKMEKÖY",
  "MEVSİMSEL MENÜ",
  "AÇIK ATEŞ",
  "SOMELİYE SEÇKİSİ",
];

data.hakkimizda = {
  eyebrow: "Hakkımızda",
  baslik: "Taşdelen'de dünya mutfağı",
  answerBaslik: "Kısaca",
  answerMetin:
    "Taşdelen Restoran, Çekmeköy Taşdelen'de Akdeniz, Anadolu ve Uzak Doğu mutfaklarını aynı sofrada buluşturan bir restoran. Şefin mevsimsel menüsü, açık ateş ızgarası ve özenli servis ile akşam yemeğini bir ritüele dönüştürür. Adres: Turgut Özal Caddesi No:108/C, Bulvar Rezidans A Blok. Rezervasyon: 0552 340 02 02.",
  lead: "Çekmeköy Taşdelen'de, kaliteli malzeme ve klasik tekniklerle dünya mutfağını sade, şık bir salonda sunuyoruz.",
  body: [
    "Menümüz başlangıçlardan ana yemeklere, tatlıdan kadehe uzanır. Her tabak mevsimin en iyi ürünüyle kurulur; ızgara, confit ve deniz mahsulleri şefin imza çizgisini taşır.",
    "Restoranımız Taşdelen Mahallesi'nde, Turgut Özal Caddesi üzerindeki Bulvar Rezidans'ın önünde. Taşdelen, Alemdağ ve Çekmeköy çevresinden gelen misafirlerimizi akşam 12'ye kadar ağırlıyoruz; cadde üzerinde ücretsiz park imkânı bulunur.",
    "İki kişilik akşam yemeğinden iş yemeğine, doğum gününden tadım menüsüne kadar masanızı önceden ayırtmanızı öneririz. Özel gün ve grup davetleri için şefin masası bölümünden bilgi alabilirsiniz.",
  ],
  ozet: [
    { b: "4", span: "menü bölümü" },
    { b: "27", span: "imza tabak" },
    { b: "12:00–00:00", span: "her gün açık" },
    { b: "Şef", span: "mevsimsel mutfak" },
  ],
  badgeBaslik: "Şef",
  badgeAlt: "Dünya Mutfağı · Taşdelen",
};

data.bolumlar = {
  menu: {
    eyebrow: "Menümüz",
    baslik: "Şefin Sofrası",
    lead: "Başlangıçlar, ana yemekler, tatlılar ve içecekler — her tabak mevsimin en iyisiyle.",
  },
  galeri: {
    eyebrow: "Galeri",
    baslik: "Salon ve sofra",
    lead: "Restoranımızın salonu, şefin mutfağı ve sofra detayları.",
  },
  yorumlar: {
    eyebrow: "Misafir Yorumları",
    baslik: "Sofrada kalanlar",
    lead: "Taşdelen Restoran'ı tercih edenlerin gerçek deneyimleri.",
  },
  sss: {
    eyebrow: "Sık Sorulanlar",
    baslik: "Rezervasyon ve menü",
    lead: "Masa ayırtma, alerjen ve tadım menüsü hakkında.",
  },
};

data.pasta = {
  eyebrow: "Şefin Masası",
  baslik: "Tadım menüsü ve özel davetler",
  lead: "Doğum günü, iş yemeği ve özel akşamlar için şefin kurduğu tadım menüsü. Masa başında, sizin için.",
  maddeler: [
    "4 veya 6 tabaklı tadım menüsü",
    "Şarap eşleştirme seçeneği",
    "Özel gün ve grup rezervasyonu",
    "Mevsimsel, kişiye özel kurgular",
  ],
  body: "Tadım menüsü en az 48 saat önceden rezervasyonla hazırlanır. Detay için bizi arayın veya online formdan masa ayırtın.",
  ctaLabel: "Tadım İçin Rezervasyon",
  ctaHref: "#rezervasyon",
  gorseller: [
    { src: "/assets/img/ic-mekan.jpg", alt: "Restoran salonu" },
    { src: "/assets/img/hero-ic.webp", alt: "İç mekân" },
    { src: "/assets/img/cephe.jpg", alt: "Restoran cephesi" },
    { src: "/assets/img/kapi.jpg", alt: "Giriş kapısı" },
    { src: "/assets/cms/hero-cephe.webp", alt: "Akşam cephe" },
    { src: "/assets/img/ic-mekan-1100.jpg", alt: "Salon detayı" },
  ],
};

data.menu = menu;

data.galeri = (data.galeri || []).map((item, i) => {
  const captions = [
    "Restoranımız · Taşdelen",
    "Giriş",
    "Şefin masası",
    "Sofra detayı",
    "Salon",
    "Akşam servisi",
  ];
  return { ...item, baslik: captions[i] || item.baslik };
});

data.yorumlar = [
  {
    metin: "Wagyu ribeye ve sommelier'in önerdiği kadeh kusursuzdu. Servis sakin, salon şık — Taşdelen'de aradığımız akşam yemeği buydu.",
    ad: "Ayşe Yılmaz",
    unvan: "Misafir",
    yildiz: 5,
  },
  {
    metin: "Izgara ahtapot ve kuzu pirzola beklediğimizin üzerindeydi. Rezervasyonla gittik, masa hazır, tempo dengeliydi.",
    ad: "Mehmet Demir",
    unvan: "İş yemeği",
    yildiz: 5,
  },
  {
    metin: "Annemin doğum günü için tadım menüsü ayırttık. Hem sunum hem lezzet çok beğenildi, ekip özenliydi.",
    ad: "Zeynep Kaya",
    unvan: "Taşdelen sakini",
    yildiz: 5,
  },
  {
    metin: "Burrata ve soufflé için tekrar geleceğiz. Fiyat-kalite dengesi, Çekmeköy'de bu seviyede nadir.",
    ad: "Elif Arslan",
    unvan: "Çekmeköy",
    yildiz: 5,
  },
  {
    metin: "Grup rezervasyonumuz zamanında oturdu, alerjen notumuz dikkate alındı. Güvenle masa ayırttığımız adres.",
    ad: "Burak Özkan",
    unvan: "İşletmeci",
    yildiz: 5,
  },
];

data.sss = {
  items: [
    {
      soru: "Rezervasyon nasıl yapılır?",
      cevap:
        "Sitedeki rezervasyon formundan tarih, saat ve kişi sayısını gönderin; ekibimiz telefonla onaylar. Dilerseniz 0552 340 02 02 veya WhatsApp üzerinden de masa ayırtabilirsiniz.",
    },
    {
      soru: "Hangi saatlerde açıksınız?",
      cevap:
        "Her gün 12:00–00:00. Mutfak son siparişi 23:00'te alır. Cuma ve cumartesi akşamları rezervasyon önerilir.",
    },
    {
      soru: "Alerjen ve özel diyet var mı?",
      cevap:
        "Menüde gluten, süt, yumurta, balık ve kuruyemiş bulunur. Vejetaryen tabaklar mevcuttur; ciddi alerjiyi rezervasyon notuna yazın, mutfak buna göre hazırlanır.",
    },
    {
      soru: "Tadım menüsü nedir?",
      cevap:
        "Şefin 4 veya 6 tabaklı, mevsimsel tadım menüsüdür. En az 48 saat önce, kişi başı rezervasyonla hazırlanır. Şarap eşleştirme isteğe bağlıdır.",
    },
    {
      soru: "Çocuk ve grup kabul ediyor musunuz?",
      cevap:
        "Evet. 8 kişiden büyük gruplar için önceden aramanızı rica ederiz; özel menü ve oturma düzeni planlanır.",
    },
  ],
};

data.iletisim = {
  ...data.iletisim,
  baslik: "Masa, menü ve özel davet",
  giris:
    "Rezervasyon, tadım menüsü ve tüm sorularınız için bizi arayın, yazın veya aşağıdaki formdan mesaj bırakın.",
  metin: "Akşam yemeği ve hafta sonu için online rezervasyon önerilir. Grup ve tadım menüsü 48 saat önceden planlanır.",
  telefonAlt: "Rezervasyon & İletişim",
  whatsappAlt: "Hızlı rezervasyon ve bilgi",
  whatsappBaslik: "WhatsApp'tan yazın",
  instagramAlt: "Sofra ve salon Instagram'da",
  saatler: "Her gün 12:00 – 00:00",
  ozelPastaNot: "Tadım menüsü ve özel davetler 48 saat önceden rezervasyonla",
  etiketOzelPasta: "Şefin masası",
};

data.sayfalar = {
  urunler: {
    eyebrow: "Menü",
    baslikSablon: "{n} bölümde {m} tabak",
    lead: "Başlangıçlar, ana yemekler, tatlılar ve içecekler. Masa ayırtmak için rezervasyon formunu kullanın.",
    altNot: "Sunum menüsü — fiyatlar KDV dahildir; alerjen için servise danışın.",
  },
  urunKategori: {
    eyebrow: "Menü",
    answerBaslik: "Kısa bilgi",
    listeBaslikSablon: "{ad}",
    kartNot: "★ işaretliler şefin önerileridir. Tabağa tıklayarak detayı inceleyin.",
    ctaBaslik: "Rezervasyon & bilgi",
    ctaWaLabel: "WhatsApp’tan yazın",
    relatedBaslik: "Diğer bölümler",
    relatedHepsi: "Tüm menü",
    detayNotlari: "Rezervasyon önerilir\nAlerjen için servise danışın",
    detayWaLabel: "WhatsApp ile Yazın",
    detayTelLabel: "Telefonla Ara",
    fiyatSorulur: "Fiyat sorulur",
  },
  blog: {
    eyebrow: "Blog",
    baslik: "Sofra defteri",
    lead: "Rezervasyon, mevsimsel menü ve şarap eşleştirme üzerine kısa yazılar.",
    ctaBaslik: "Masa ayırtmak ister misiniz?",
    ctaMetin: "Rezervasyon ve sorularınız için bizi arayın veya formdan yazın.",
  },
};

data.seo = {
  title: "Taşdelen Restoran — Dünya Mutfağı | Çekmeköy Taşdelen",
  description:
    "Çekmeköy Taşdelen'de dünya mutfağı. Başlangıçlar, ızgara, deniz mahsulleri, tadım menüsü ve online rezervasyon. 0552 340 02 02",
  ogTitle: "Taşdelen Restoran — Dünya Mutfağı | Çekmeköy",
  ogDescription:
    "Akdeniz'den Uzak Doğu'ya şef sofrası. Menü, tadım ve rezervasyon — Çekmeköy Taşdelen.",
  siteName: "Taşdelen Restoran",
  canonicalUrl: data.seo?.canonicalUrl || "https://www.firincitasdelen.com.tr/",
  themeColor: "#12140E",
};

data.footer = {
  ...data.footer,
  markaAdi: "Taşdelen Restoran",
  slogan: "Dünya Mutfağı · Şef Sofrası\nÇekmeköy Taşdelen'de akşam yemeği.",
  kolonlar: [
    {
      baslik: "Restoran",
      links: [
        { label: "Hakkımızda", href: "#hakkimizda" },
        { label: "Menü", href: "#menu" },
        { label: "Şefin Masası", href: "#pasta" },
        { label: "Rezervasyon", href: "#rezervasyon" },
        { label: "Galeri", href: "#galeri" },
      ],
    },
    {
      baslik: "Adres",
      links: [
        { label: "Turgut Özal Cad. No:108/C", href: "#iletisim" },
        { label: "Bulvar Rezidans A Blok", href: "#iletisim" },
        { label: "Çekmeköy / İstanbul", href: "#iletisim" },
        { label: "12:00 – 00:00", href: "#iletisim" },
      ],
    },
    data.footer?.kolonlar?.[2] || {
      baslik: "İletişim",
      links: [
        { label: "0552 340 02 02", href: "tel:+905523400202" },
        { label: "WhatsApp", href: "https://wa.me/905523400202" },
        { label: "Instagram", href: "https://www.instagram.com/firincitasdelenn/" },
        { label: "info@firincitasdelen.com.tr", href: "mailto:info@firincitasdelen.com.tr" },
      ],
    },
  ],
};

data.waFloat = {
  ...data.waFloat,
  baslik: "WhatsApp Rezervasyon",
  alt: "Hızlı yanıt",
  onYazi: "Merhaba, Taşdelen Restoran’dan masa ayırtmak istiyorum.",
  ariaLabel: "WhatsApp ile rezervasyon",
};

data.brand = {
  displayName: "Taşdelen Restoran",
  shortName: "TAŞDELEN",
};

data.legal = {
  kvkk: "Kişisel verileriniz 6698 sayılı KVKK kapsamında yalnızca rezervasyon ve iletişim amaçlı işlenir.",
  gizlilik: "Gizlilik politikamız: iletişim bilgileriniz üçüncü taraflarla paylaşılmaz.",
  cerez: "Bu site temel işlevler için zorunlu çerezler kullanır.",
};

data.yorumlarMeta = {
  ...data.yorumlarMeta,
  googleUrl:
    "https://www.google.com/maps/search/?api=1&query=Ta%C5%9Fdelen+Restoran+%C3%87ekmek%C3%B6y",
  unvanVarsayilan: "Misafir",
};

data.makaleler = [
  {
    slug: "rezervasyon-rehberi",
    baslik: "Masa nasıl ayırtılır? Akşam yemeği rezervasyon rehberi",
    ozet: "Ne kadar önceden rezervasyon yapılır, tadım menüsü için süre, grup ve alerjen notları.",
    kategori: "Rezervasyon",
    tarih: "12 Ağustos 2026",
    yayinda: true,
    statik: false,
    okumaSuresi: "4 dakika okuma",
    govdeHtml: `<div class="answer"><b>Kısa cevap</b><p>Hafta içi akşam için <strong>aynı gün</strong> de masa bulunabilir; cuma–cumartesi ve tadım menüsü için <strong>en az 48 saat</strong> önceden rezervasyon önerilir. Formdaki tarih, saat, kişi sayısı ve telefon yeterlidir — ekibimiz onay için arar.</p></div>
<h2>Ne zaman ayırtmalıyım?</h2>
<p>İki kişilik klasik akşam yemeğinde esneklik yüksektir. Doğum günü, iş yemeği ve 6 kişiyi aşan gruplarda oturma düzeni planlandığı için erken yazın.</p>
<ul><li><strong>Hafta içi 12:00–17:00:</strong> genellikle aynı gün.</li><li><strong>Hafta içi akşam:</strong> bir gün önce rahat eder.</li><li><strong>Cuma–cumartesi akşam:</strong> 48 saat.</li><li><strong>Tadım menüsü:</strong> 48 saat, kişi başı teyit.</li></ul>
<h2>Formda ne yazmalıyım?</h2>
<p>Alerji, bebek koltuğu, pencere kenarı veya kutlama notunu rezervasyon formundaki alana ekleyin. Mutfak ciddi alerjiyi önceden bilir; servis masayı ona göre kurar.</p>
<div class="cta-box"><h2>Şimdi masa ayırtın</h2><p>Online form 30 saniye sürer. Dilerseniz 0552 340 02 02’yi arayın.</p><a href="/#rezervasyon" class="btn btn--lg">Rezervasyon</a></div>`,
  },
  {
    slug: "mevsimsel-menu",
    baslik: "Mevsimsel menü nedir? Şef neden tabak değiştirir?",
    ozet: "Yaz ve kış menüsü farkı, günlük özel ve neden bazı tabaklar listeden iner.",
    kategori: "Mutfak",
    tarih: "4 Ağustos 2026",
    yayinda: true,
    statik: false,
    okumaSuresi: "5 dakika okuma",
    govdeHtml: `<div class="answer"><b>Kısa cevap</b><p>Mevsimsel menü, malzemenin <strong>en iyi olduğu haftalarda</strong> tabak kurulmasıdır. Yazın domates ve deniz, kışın kök sebze ve confit öne çıkar. Sabit imza tabaklar (kuzu pirzola, soufflé) kalır; garnitür ve başlangıçlar döner.</p></div>
<h2>Neden değişir?</h2>
<p>Aynı üründen yıl boyu aynı tadı beklemek mutfağı zorlar. Mevsiminde alınan ürün daha aromatiktir, israf azalır, şefin çizgisi taze kalır.</p>
<h2>İmza tabaklar</h2>
<p>Wagyu ribeye, kuzu pirzola ve sıcak çikolata soufflé kartta kalır. Izgara ahtapot ve burrata yazın daha sık çıkar; trüflü çorba sonbahar–kışa aittir.</p>
<div class="cta-box"><h2>Bu haftanın kartı</h2><p>Güncel menüyü siteden inceleyin, masa için rezervasyon bırakın.</p><a href="/#menu" class="btn btn--lg">Menüye bakın</a></div>`,
  },
  {
    slug: "sarap-eslestirme",
    baslik: "Şarap eşleştirme: kırmızı, beyaz ve tadım menüsü",
    ozet: "Izgara ete hangi kadeh, denize hangi beyaz, tadımda nasıl ilerlenir.",
    kategori: "İçecek",
    tarih: "21 Temmuz 2026",
    yayinda: true,
    statik: false,
    okumaSuresi: "4 dakika okuma",
    govdeHtml: `<div class="answer"><b>Kısa cevap</b><p>Kuzu ve wagyu için <strong>gövdeli kırmızı</strong>, levrek ve somon için <strong>mineral beyaz</strong>, tadım menüsünde ise her tabağa küçük kadeh ilerletmek en temiz yoldur. Kararsızsanız sommelier’in günün kadehini sorun.</p></div>
<h2>Pratik eşler</h2>
<ul><li><strong>Wagyu / kuzu:</strong> kırmızı, tanenli.</li><li><strong>Levrek / ahtapot:</strong> beyaz, yüksek asit.</li><li><strong>Mantarlı tagliatelle:</strong> hafif kırmızı veya okside karakterli beyaz.</li><li><strong>Soufflé:</strong> tatlı şarap veya espresso.</li></ul>
<p>Alkolsüz eşleştirme de kurulur: ev limonatası, soğuk brew ve Türk kahvesi tatlıya kadar masada kalır.</p>
<div class="cta-box"><h2>Kadeh ile tadım</h2><p>Tadım menüsüne şarap eşleştirme eklemek için rezervasyon notuna yazmanız yeter.</p><a href="/#rezervasyon" class="btn btn--lg">Rezervasyon</a></div>`,
  },
];

fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
console.log("Restaurant content written:", file);
console.log("Menu groups:", data.menu.gruplar.map((g) => `${g.ad} (${g.urunler.length})`).join(", "));
