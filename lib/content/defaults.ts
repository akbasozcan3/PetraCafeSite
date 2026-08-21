import type { SiteContent, MenuContent } from "./types";
import { DEFAULT_THEME } from "./theme";
import { defaultHoursProgram } from "./hours";

export const DEFAULT_CONTENT: SiteContent = {
  images: {
    heroPoster: "/assets/cms/hero-cephe.webp",
    heroCephe: "/assets/cms/hero-cephe.webp",
    heroIc: "/assets/cms/hero-ic.webp",
    aboutInterior: "/assets/cms/hero-ic.webp",
    faq: "/assets/cms/hero-ic.webp",
    ogImage: "/assets/cms/hero-cephe.webp",
    logo: "/assets/cms/logo.png",
    favicon: "/assets/img/petra-favicon.svg",
    reservation: "/assets/cms/hero-ic.webp",
    heroMobile: "/assets/cms/hero-cephe.webp",
  },
  navbar: {
    logoText: "PETRA",
    logoSize: 64,
    logoTextGizle: true,
    mobileLabel: "Menü",
    ctaLabel: "Rezervasyon",
    ctaHref: "#rezervasyon",
    showPhone: true,
    links: [
      { label: "Hakkımızda", href: "#hakkimizda" },
      { label: "Hizmetler", href: "#hizmetler" },
      { label: "Menü", href: "/menu" },
      { label: "Havuz & Plaj", href: "#pasta" },
      { label: "Galeri", href: "#galeri" },
      { label: "Yorumlar", href: "#yorumlar" },
      { label: "S.S.S.", href: "#sss" },
      { label: "İletişim", href: "#iletisim" },
    ],
  },
  hero: {
    fallbackMark: "PETRA",
    fallbackTagline: "Cafe · Restaurant · Pool & Beach",
    scrollHint: "Aşağı kaydırın",
    bootText: "Kapı açılıyor",
    welcomeAktif: false,
    welcomeKutu: false,
    welcomeKutuRenk: "#0A0C09",
    welcomeKutuKenar: "#E8B84B",
    welcomeKutuOpaklik: 58,
    welcomeEyebrow: "Çekmeköy · Petra Yaşam Merkezi",
    welcomeTitle: "Petra Cafe Restaurant",
    welcomeLead: "Lezzet, keyif ve serinliğin buluştuğu yer — dünya mutfağı, serpme kahvaltı, İtalyan tatlı & kokteyl, kahve, nargile ve havuz başı.",
    doorUv: { u0: 0.438, u1: 0.562, v0: 0.428, v1: 0.968 },
    doorUvMobile: { u0: 0.334, u1: 0.666, v0: 0.428, v1: 0.968 },
  },
  marquee: [
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
  ],
  duyuru: { aktif: false, metin: "" },
  hakkimizda: {
    eyebrow: "Hakkımızda",
    baslik: "Petra Yaşam Merkezi'nde cafe & restaurant",
    answerBaslik: "Kısaca",
    answerMetin:
      "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar. 0530 608 90 51.",
    lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
    body: [
      "Menümüzde serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller, kahve ve nargile bulunur. Havuz kenarında veya salonda servis edilir.",
      "Mekânımız Sultançiftliği Mahallesi, Selen Sokak No:1, Megakent / Petra Yaşam Merkezi’ndedir. Havuz, plaj ve kafe-restoran aynı çatı altındadır.",
      "Doğum günü, kurumsal davet ve özel günler için organizasyon masası kurulur. Yüzme dersleri birebir veya grup olarak planlanır.",
    ],
    ozet: [
      { b: "08:00–24:00", span: "cafe her gün" },
      { b: "09:00–18:00", span: "havuz" },
      { b: "Kahvaltı", span: "serpme servis" },
      { b: "Yüzme", span: "birebir ve grup" },
    ],
    badgeBaslik: "Petra",
    badgeAlt: "Cafe · Restaurant · Pool",
  },
  bolumlar: {
    menu: {
      eyebrow: "Menümüz",
      baslik: "Kahvaltı, dünya mutfağı, kahve",
      lead: "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller, kahve, nargile ve havuz kenarı.",
      ctaLabel: "Masa ayırtın",
      ctaHref: "#rezervasyon",
      cta2Label: "Tüm menü",
      cta2Href: "/menu",
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
      ctaLabel: "Masa ayırtın",
      ctaHref: "#rezervasyon",
    },
    rezervasyon: {
      eyebrow: "Rezervasyon",
      baslik: "Masınızı ayırtın",
      lead: "Tarih, saat ve kişi sayısını bırakın; ekibimiz telefonla onaylar. Cuma–cumartesi kahvaltı ve havuz için önceden rezervasyon önerilir.",
    },
    hizmetler: {
      eyebrow: "Petra",
      baslik: "Cafe · Restaurant · Pool & Beach",
      lead: "Kahvaltı, pizza, burger, tatlı, kahve ve nargile — havuz kenarında veya salonda.",
    },
  },
  pasta: {
    eyebrow: "Havuz & Plaj",
    baslik: "Pool & Beach",
    slogan: "Lezzet, keyif ve serinliğin buluştuğu yer",
    lead: "Petra Yaşam Merkezi’nde temiz bakımlı havuz, çocuk havuzu, güneşlenme alanları ve kafe-restoran. Petra’da her an özel.",
    cafeSaat: "08:00 – 24:00",
    havuzSaat: "09:00 – 18:00",
    derinlik: "1.45 m – 1.95 m",
    fiyatBaslik: "Petra House fiyat listesi",
    fiyatlar: [
      { kategori: "2–10 yaş", haftaIci: "400 TL", haftaSonu: "450 TL" },
      { kategori: "10–18 yaş", haftaIci: "600 TL", haftaSonu: "650 TL" },
      { kategori: "Yetişkin", haftaIci: "800 TL", haftaSonu: "850 TL" },
    ],
    fiyatNot: "0–2 yaş ücretsiz. Dışarıdan yiyecek ve içecek getirilmez. Havuz için mayo ve bone zorunludur.",
    dersBaslik: "Havuz yüzme derslerimiz başlamıştır",
    dersLead: "Sağlıklı bir yaşam, güvenli eğitim, profesyonel eğitmenler — her yaşa uygun.",
    dersler: [
      { baslik: "Birebir dersler", kicker: "Kişiye özel program", metin: "Daha hızlı ve etkili gelişim." },
      { baslik: "Grup dersleri", kicker: "Eğlenerek öğren", metin: "Motivasyon ve sosyalleşme." },
    ],
    kurallar: [
      "Dışarıdan yiyecek ve içecek sokulmaz.",
      "0–2 yaş havuz girişi ücretsizdir.",
      "Mayo ve bone zorunludur.",
    ],
    instagramEtiket: "@petracaferestaurant",
    instagramHref: "https://www.instagram.com/petracaferestaurant/",
    maddeler: [
      "Temiz ve bakımlı havuz",
      "Çocuk havuzu",
      "Güneşlenme alanları",
      "Lezzetli menü",
      "Ferah ve konforlu ortam",
      "Yüzme kursumuz vardır",
    ],
    body: "Bilgi ve rezervasyon: 0530 608 90 51 · Instagram @petracaferestaurant.",
    ctaLabel: "Havuz & rezervasyon",
    ctaHref: "#rezervasyon",
    gorseller: [
      { src: "/assets/cms/hero-ic.webp", alt: "Salon ve sofra" },
      { src: "/assets/cms/galeri-cephe.webp", alt: "Petra Yaşam Merkezi" },
      { src: "/assets/cms/hero-cephe.webp", alt: "Cephe" },
      { src: "/assets/cms/hero-ic.webp", alt: "İç mekân" },
    ],
  },
  makaleler: [
    { slug: "rezervasyon-rehberi", baslik: "Masa nasıl ayırtılır? Kahvaltı ve akşam rezervasyonu", ozet: "Hafta sonu kahvaltı, havuz günü ve akşam yemeği için ne zaman yazmalısınız.", kategori: "Rezervasyon", tarih: "12 Ağustos 2026", yayinda: true, statik: false },
    { slug: "havuz-plaj", baslik: "Havuz & plaj 2026: tarife, yüzme dersi, organizasyon", ozet: "Hafta içi / sonu giriş, yaş grupları ve yüzme dersi kontenjanı.", kategori: "Havuz", tarih: "4 Ağustos 2026", yayinda: true, statik: false },
    { slug: "serpme-kahvalti", baslik: "Serpme kahvaltı Petra’da nasıl servis edilir?", ozet: "Sabah saatleri, rezervasyon ve havuz kenarı kahvaltı için kısa rehber.", kategori: "Kahvaltı", tarih: "21 Temmuz 2026", yayinda: true, statik: false },
  ],
  manifesto: { ustBaslik: "Lezzet geleneği", satirlar: [] },
  hikaye: null,
  menu: null as MenuContent | null,
  galeri: [
    { src: "/assets/cms/galeri-cephe.webp", baslik: "Cephe · Petra", boy: "wide" },
    { src: "/assets/cms/hero-ic.webp", baslik: "Salon", boy: "half" },
    { src: "/assets/cms/hero-cephe.webp", baslik: "Akşam ışığı", boy: "half" },
    { src: "/assets/cms/hero-ic.webp", baslik: "İç mekân", boy: "third" },
    { src: "/assets/cms/galeri-cephe.webp", baslik: "Sofra", boy: "third" },
    { src: "/assets/cms/hero-cephe.webp", baslik: "Giriş", boy: "third" },
  ],
  yorumlar: [
    { metin: "Serpme kahvaltı ve havuz aynı günde — Çekmeköy’de aradığımız yerdi. Servis güleryüzlüydü.", ad: "Elif K.", unvan: "Misafir", yildiz: 5 },
    { metin: "Akşam dünya mutfağı, oturma rahat, tempo sakin. Rezervasyonla gittik, masa hazırdı.", ad: "Mert A.", unvan: "Çekmeköy", yildiz: 5 },
    { metin: "Çocuklarla yüzme dersi ve kahvaltı. Organizasyon düzgün, iletişim hızlı.", ad: "Selin Y.", unvan: "Aile", yildiz: 5 },
    { metin: "Keyif, konfor, kalite sloganı yerinde. Kahve ve tatlı için de uğruyoruz.", ad: "Burak D.", unvan: "Petralovers", yildiz: 5 },
  ],
  sss: { items: [
    { soru: "Rezervasyon nasıl yapılır?", cevap: "Sitedeki formdan tarih, saat ve kişi sayısını gönderin; ekibimiz telefonla onaylar. Dilerseniz 0530 608 90 51 veya Instagram’dan yazın." },
    { soru: "Hangi saatlerde açıksınız?", cevap: "Cafe her gün 08:00–24:00. Havuz 09:00–18:00." },
    { soru: "Havuz fiyatları nedir?", cevap: "Petra House: hafta içi 2–10 yaş 400 TL, 10–18 yaş 600 TL, yetişkin 800 TL. Hafta sonu 450 / 650 / 850 TL. 0–2 yaş ücretsiz. Dışarıdan yiyecek-içecek sokulmaz; mayo ve bone zorunludur." },
    { soru: "Yüzme dersi var mı?", cevap: "Evet, yüzme kursumuz vardır. Birebir (kişiye özel program) ve grup dersleri (eğlenerek öğren) — her yaşa uygun, profesyonel eğitmenlerle. Kontenjan: 0530 608 90 51 veya Instagram @petracaferestaurant." },
    { soru: "Organizasyon yapıyor musunuz?", cevap: "Doğum günü, kurumsal ve özel günler için masa ve alan organize edilir. Önceden rezervasyon gerekir." },
    { soru: "Serpme kahvaltı var mı?", cevap: "Evet. Serpme kahvaltı menüde yer alır; hafta sonu için masa ayırtmanızı öneririz." },
    { soru: "İtalyan kokteyl ve tatlı var mı?", cevap: "Evet. Aperol Spritz, Negroni, Bellini ve İtalyan tatlı çeşitleri (tiramisu, panna cotta, cannoli, affogato) menüde." },
    { soru: "Nargile var mı?", cevap: "Evet. Elma, karpuz-nane, üzüm, nane-limon ve özel karışımlar sunulur. Yoğun saatlerde köşe için rezervasyon önerilir." },
  ] },
  iletisim: {
    baslik: "Masa, havuz ve organizasyon",
    giris: "Rezervasyon, havuz, yüzme dersi ve özel günler için arayın veya yazın.",
    metin: "Kahvaltı ve hafta sonu için önceden masa ayırtmanızı öneririz.",
    eyebrow: "İletişim",
    telefon: "0530 608 90 51",
    telefonHam: "+905306089051",
    telefonAlt: "Rezervasyon · Havuz · Organizasyon",
    whatsapp: "https://wa.me/905306089051",
    whatsappBaslik: "WhatsApp'tan yazın",
    whatsappAlt: "Hızlı rezervasyon ve bilgi",
    instagram: "@petracaferestaurant",
    instagramUrl: "https://www.instagram.com/petracaferestaurant/",
    instagramAlt: "Günün Fotoğrafları Instagram'da",
    eposta: "",
    epostaAlt: "E-posta",
    adresSatir1: "Sultan Çiftliği Mahallesi, Selen Sokak No:1",
    adresSatir2: "Mega Kent Sitesi içi · Petra Yaşam Merkezi",
    adresSatir3: "Taşdelen, Çekmeköy / İstanbul",
    saatler: "Cafe her gün 08:00 – 24:00 · Havuz 09:00 – 18:00",
    saatProgrami: defaultHoursProgram("08:00", "24:00"),
    ozelPastaNot: "Havuz 09:00–18:00 · yüzme dersi ve organizasyon — 0530 608 90 51",
    koordinat: "41.029976,29.226160",
    haritaSorgu: "41.029976,29.226160",
    haritaButonMetin: "Yol Tarifi Al",
    haritaIframeBaslik: "Petra Cafe Restaurant konumu",
    etiketAdres: "Adres",
    etiketSaatler: "Çalışma saatleri",
    etiketTelefon: "Telefon",
    etiketWhatsapp: "WhatsApp",
    etiketOzelPasta: "Havuz & organizasyon",
    socials: [
      { id: "s-ig", platform: "instagram", label: "Instagram", url: "https://www.instagram.com/petracaferestaurant/", active: true },
      { id: "s-wa", platform: "whatsapp", label: "WhatsApp", url: "https://wa.me/905306089051", active: true },
      { id: "s-tt", platform: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@petracaferestaurant", active: true },
      { id: "s-maps", platform: "maps", label: "Google Haritalar", url: "https://maps.google.com/?q=Petra+Cafe+Restaurant+Taşdelen", active: true },
      { id: "s-fb", platform: "facebook", label: "Facebook", url: "", active: false },
      { id: "s-yt", platform: "youtube", label: "YouTube", url: "", active: false },
    ],
  },

  sayfalar: {
    urunler: {
      eyebrow: "Menü",
      baslikSablon: "{n} bölümde {m} tabak",
      lead: "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve ve nargile.",
      altNot: "Sunum menüsü — fiyatlar KDV dahildir; alerjen için servise danışın.",
    },
    urunKategori: {
      eyebrow: "Menü",
      answerBaslik: "Kısa bilgi",
      listeBaslikSablon: "{ad} listesi",
      kartNot: "Tabağa tıklayarak detayı inceleyin.",
      ctaBaslik: "Rezervasyon & bilgi",
      ctaWaLabel: "WhatsApp’tan yazın",
      relatedBaslik: "Diğer kategoriler",
      relatedHepsi: "Tüm menü",
      detayNotlari:
        "Rezervasyon önerilir\nAlerjen için servise danışın",
      detayWaLabel: "WhatsApp ile Yazın",
      detayTelLabel: "Telefonla Ara",
      fiyatSorulur: "Fiyat sorulur",
    },
    blog: {
      eyebrow: "Blog",
      baslik: "Petra defteri",
      lead: "Kahvaltı, havuz, rezervasyon ve mekân üzerine kısa yazılar.",
      ctaBaslik: "Masa veya havuz için yazın",
      ctaMetin: "Rezervasyon, yüzme dersi ve organizasyon için bizi arayın veya formdan yazın.",
    },
  },
  seo: {
    title: "Petra Cafe Restaurant — Dünya Mutfağı · Havuz | Çekmeköy",
    description:
      "Çekmeköy Taşdelen'de Petra Cafe Restaurant. Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz. 0530 608 90 51",
    ogTitle: "Petra Cafe Restaurant | Çekmeköy",
    ogDescription:
      "Cafe, restaurant, pool & beach — Petra Yaşam Merkezi.",
    siteName: "Petra Cafe Restaurant",
    canonicalUrl: "",
    themeColor: "#12140E",
    servesCuisine: "Dünya mutfağı, Kahvaltı, İtalyan, Cafe, Akdeniz",
    priceRange: "₺₺₺",
    addressLocality: "Çekmeköy",
    addressRegion: "İstanbul",
    addressCountry: "TR",
    acceptsReservations: true,
  },
  footer: {
    markaAdi: "Petra Cafe Restaurant",
    yasalMetin: "Tüm hakları saklıdır.",
    slogan: "Keyif, konfor ve kalite.\nDünya mutfağı · serpme kahvaltı · İtalyan tatlı & kokteyl · nargile · pool & beach.",
    iletisimBaslik: "İletişim",
    barLinks: [
      { label: "Gizlilik & KVKK", href: "/gizlilik-politikasi" },
      { label: "Rezervasyon & İptal Koşulları", href: "/rezervasyon-kosullari" },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
      { label: "Ticari Bilgiler", href: "/ticari-bilgiler" },
      { label: "Menü", href: "/menu" },
      { label: "Instagram", href: "https://www.instagram.com/petracaferestaurant/" },
      { label: "Rezervasyon", href: "/#rezervasyon" },
    ],

    kolonlar: [
      {
        baslik: "Petra",
        links: [
          { label: "Hakkımızda", href: "#hakkimizda" },
          { label: "Hizmetler", href: "#hizmetler" },
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
          { label: "Cafe 08:00 – 24:00", href: "#iletisim" },
        ],
      },
      {
        baslik: "İletişim",
        links: [
          { label: "0530 608 90 51", href: "tel:+905306089051" },
          { label: "WhatsApp", href: "https://wa.me/905306089051" },
          { label: "Instagram", href: "https://www.instagram.com/petracaferestaurant/" },
        ],
      },
    ],
  },
  waFloat: {
    baslik: "WhatsApp Rezervasyon",
    alt: "Hızlı yanıt",
    onYazi: "Merhaba, Petra Cafe Restaurant’tan bilgi / rezervasyon istiyorum.",
    ariaLabel: "WhatsApp ile rezervasyon",
  },
  legal: {
    kvkk: "Kişisel verileriniz 6698 sayılı KVKK kapsamında yalnızca rezervasyon, müşteri memnuniyeti ve iletişim amaçlı işlenir.",
    gizlilik: "Gizlilik politikamız: İletişim ve rezervasyon bilgileriniz asla üçüncü taraflarla paylaşılmaz ve güvenli sunucularda saklanır.",
    cerez: "Sitemizde kullanıcı deneyimini artırmak ve rezervasyon adımlarını güvenle tamamlamak için temel çerezler kullanılmaktadır.",
    gizlilikPolitikasi: {
      title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
      lead: "Petra Cafe Restaurant olarak kişisel verilerinizin güvenliğine ve gizliliğine azami önem veriyoruz.",
      body: `Petra Cafe & Restaurant (“İşletme”) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca Veri Sorumlusu sıfatıyla, ziyaretçilerimizin ve misafirlerimizin kişisel verilerini aşağıda açıklanan çerçevede işlemekteyiz.

1. İŞLENEN KİŞİSEL VERİLER
Web sitemiz üzerinden rezervasyon formu, iletişim formu veya telefon/WhatsApp hatlarımız aracılığıyla toplanan ad-soyad, telefon numarası, e-posta adresi, rezervasyon tarihi/saati ve rezervasyon notları gibi verileriniz işlenmektedir.

2. KİŞİSEL VERİLERİN İŞLENME AMACI
Toplanan kişisel verileriniz;
• Rezervasyon taleplerinizin alınması, teyit edilmesi ve masanızın hazırlanması,
• Rezervasyon onay, iptal veya değişiklik durumlarında tarafınıza SMTP / SMS / Telefon yoluyla bilgilendirme yapılması,
• İletişim taleplerinize ve sorularınıza yanıt verilmesi,
• Yasal yükümlülüklerimizin yerine getirilmesi amacıyla işlenmektedir.

3. VERİLERİN AKTARILMASI VE GÜVENLİĞİ
Kişisel verileriniz ticari veya reklam amacıyla kesinlikle üçüncü şahıslara veya kurumlara satılmaz, kiralanmaz ya da aktarılmaz. Yalnızca yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları ile paylaşılabilir.

4. HAKLARINIZ (KVKK MADDE 11)
KVKK’nın 11. maddesi uyarınca işletmemize başvurarak verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, silinmesini veya düzeltilmesini isteme haklarına sahipsiniz. Başvurularınızı petracaferestaurant@gmail.com adresine iletebilirsiniz.`,
    },
    rezervasyonKosullari: {
      title: "Rezervasyon, İptal ve İade Koşulları",
      lead: "Masa, havuz ve loca rezervasyonlarınızda geçerli olan rezervasyon ve kullanım kuralları.",
      body: `1. REZERVASYON OLUŞTURMA VE ONAY SÜRECİ
• Web sitemiz üzerinden oluşturulan rezervasyon talepleri sisteme "Bekliyor" durumunda kaydedilir.
• Yetkili ekibimiz talebinizi ve masa müsaitliğini inceledikten sonra onaylar. Onaylandığında rezervasyon formunda belirttiğiniz e-posta adresinize ve/veya telefonunuza onay bildirimi iletilir.
• İnteraktif masa planı üzerinden seçilen masalar, restoran operasyonel zorunlulukları veya özel hava koşulları gerektirmedikçe misafirimiz için ayrılır.

2. GECİKME VE MASA TUTMA SÜRESİ
• Rezervasyon saatinden itibaren masanız 15 dakika boyunca adınıza rezerve olarak tutulur.
• 15 dakikayı aşan ve işletmemize önceden bildirilmeyen gecikmelerde rezervasyon otomatik olarak iptal edilebilir ve masa sıradaki misafirlere açılabilir.

3. İPTAL VE DEĞİŞİKLİK TALEPLERİ
• Rezervasyonunuzu iptal etmek veya tarih/saat değişikliği yapmak için en az 2 saat öncesinden 0530 608 90 51 numaralı telefonumuzdan veya WhatsApp hattımızdan bize bilgi vermeniz rica olunur.
• Özel grup organizasyonları ve loca kapatma rezervasyonlarında iptal bildirim süresi en az 24 saattir.

4. HAVUZ VE TESİS KURALLARI
• Havuz kullanımı için bone ve uygun mayo/şort zorunludur.
• Dışarıdan yiyecek ve içecek getirilmesi hijyen ve işletme kuralları gereği kabul edilmemektedir.
• 0–2 yaş çocuklar için havuz kullanımı ücretsizdir.`,
    },
    kullanimKosullari: {
      title: "Kullanım Koşulları",
      lead: "Petra Cafe Restaurant web sitesini ziyaret eden tüm kullanıcılar aşağıdaki koşulları kabul etmiş sayılır.",
      body: `1. GENEL ŞARTLAR
Bu internet sitesine giriş yaparak ve sitedeki servisleri (menü inceleme, online rezervasyon, masa planı, iletişim) kullanarak işbu Kullanım Koşulları'nı kabul etmiş sayılırsınız.

2. FİKRİ MÜLKİYET
Sitede yer alan tüm metinler, görseller, logolar, havuz krokisi, menü içerikleri ve yazılım kodları Petra Cafe & Restaurant'a aittir. İzinsiz kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.

3. HİZMET DEĞİŞİKLİKLERİ
Petra Cafe Restaurant, menü fiyatlarında, çalışma saatlerinde ve hizmet şartlarında önceden haber vermeksizin güncelleme yapma hakkını saklı tutar.

4. KULLANICI SORUMLULUĞU
Kullanıcılar rezervasyon formuna doğru ve eksiksiz bilgi girmekle yükümlüdür. Yanıltıcı bilgi veya kötü niyetli rezervasyon girişimlerinde işletmenin rezervasyonu tek taraflı iptal etme hakkı saklıdır.`,
    },
    cerezPolitikasi: {
      title: "Çerez (Cookie) Politikası",
      lead: "Web sitemizde kullanılan çerez türleri ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.",
      body: `1. ÇEREZ NEDİR?
Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.

2. SİTEMİZDE KULLANILAN ÇEREZLER
• Zorunlu Çerezler: Web sitemizin güvenli çalışması, rezervasyon formunun iletilmesi ve oturum güvenliği için gereklidir.
• İşlevsel Çerezler: Masa seçim tercihleriniz, tema tercihleri gibi deneyiminizi kolaylaştıran tercihleri hatırlar.
• Performans ve Analitik Çerezler: Sitemizin hızını ve ziyaretçi trafiğini anonim olarak ölçümlememize yardımcı olur.

3. ÇEREZLERİN YÖNETİMİ
Tarayıcınızın ayarlar menüsünden çerezleri dilediğiniz zaman silebilir veya çerez kullanımını engelleyebilirsiniz. Ancak zorunlu çerezlerin kapatılması durumunda rezervasyon formu gibi temel özellikler düzgün çalışmayabilir.`,
    },
    ticariBilgiler: {
      title: "İşletme ve Ticari Bilgiler",
      lead: "Petra Cafe Restaurant yasal işletme unvanı, açık adres ve resmi iletişim bilgileri.",
      body: `İŞLETME ÜNVANI:
Petra Cafe Restaurant & Yaşam Merkezi

ADRES:
Merkez Mahallesi, Çekmeköy / İstanbul

İLETİŞİM BİLGİLERİ:
• Telefon: 0530 608 90 51
• E-Posta: petracaferestaurant@gmail.com
• WhatsApp: +90 530 608 90 51
• Instagram: @petracaferestaurant

ÇALIŞMA SAATLERİ:
• Cafe & Restaurant: Pazartesi – Pazar: 08:00 – 24:00
• Açık Yüzme Havuzu: 09:00 – 18:00

FAALİYET ALANI:
Yiyecek & İçecek Hizmetleri, Cafe & Restoran İşletmeciliği, Açık Yüzme Havuzu ve Özel Organizasyonlar`,
    },
  },
  brand: {
    displayName: "Petra Cafe Restaurant",
    shortName: "PETRA",
  },
  theme: DEFAULT_THEME,
  ziyaret: [
    { k: "Saatler", v: "", n: "Cafe 08:00–24:00 · havuz 09:00–18:00" },
    { k: "Rezervasyon", v: "", n: "Masa, havuz, yüzme dersi" },
    { k: "Havuz & Plaj", v: "09:00–18:00", n: "Derinlik 1.45–1.95 m" },
    { k: "Konum", v: "Petra Yaşam Merkezi", n: "Çekmeköy · Taşdelen" },
  ],
  hizmetler: [
    { label: "Restoran", icon: "utensils", href: "/menu", aciklama: "Salon ve teras servisi" },
    { label: "Serpme Kahvaltı", icon: "sunrise", href: "/menu/kahvalti", aciklama: "Tabak ve 2 kişilik serpme" },
    { label: "Pizzalar", icon: "chef", href: "/menu/pizzalar", aciklama: "Fırın pizza" },
    { label: "POOL & BEACH", icon: "waves", href: "#pasta", aciklama: "Havuz 09:00–18:00" },
    { label: "Yüzme dersleri", icon: "calendar", href: "#yuzme", aciklama: "Birebir ve grup" },
    { label: "Kahve", icon: "coffee", href: "/menu/kahve", aciklama: "Sıcak ve soğuk kahve" },
    { label: "Kokteyller", icon: "wine", href: "/menu/kokteyller", aciklama: "Mocktail ve frozen" },
    { label: "Tatlılar", icon: "cake", href: "/menu/tatlilar", aciklama: "Tatlı menüsü" },
    { label: "Nargile", icon: "flame", href: "/menu/nargile", aciklama: "Nakhla, El Fakher, Adalya" },
  ],
  rezervasyon: {
    minKisi: 1,
    maxKisi: 8,
    maddeler: [
      "1–8 kişi online · daha kalabalık gruplar için arayın",
      "Alerjen ve kutlama notunu forma yazabilirsiniz",
    ],
    ctaLabel: "Rezervasyon gönder",

    successMetin: "Talebiniz alındı. Onay için sizi arayacağız.",
    formKicker: "Rezervasyon",
    formBaslik: "Tarih ve saat seçin",
    formLead: "Talebiniz kayda geçer; ekibimiz telefonla onaylar.",
    labelTarih: "Tarih",
    labelSaat: "Saat",
    labelKisi: "Kişi",
    labelAd: "Ad soyad",
    labelTelefon: "Telefon",
    labelNot: "Not",
    placeholderAd: "Adınız soyadınız",
    placeholderTelefon: "0530 608 90 51",
    placeholderNot: "Alerjen, kutlama, pencere kenarı…",
    kisiSablon: "{n} kişi",
    kapaliMetin: "Bu gün kapalıyız",
    gonderiliyor: "Gönderiliyor…",
    hataTelefon: "Geçerli bir telefon girin (10–11 hane).",
    hataBaglanti: "Bağlantı hatası. Lütfen telefonla deneyin.",
    hataKapali: "Bu gün kapalıyız veya saat çalışma saatleri dışında.",
    gorselAlt: "Rezervasyon",
  },
  mesajForm: {
    kicker: "Mesaj",
    baslik: "Yazın, dönelim",
    lead: "Masa, havuz veya organizasyon — form admin paneline düşer.",
    labelAd: "Ad soyad",
    labelTelefon: "Telefon",
    labelEposta: "E-posta",
    labelMesaj: "Mesaj",
    placeholderAd: "Adınız soyadınız",
    placeholderTelefon: "0530 608 90 51",
    placeholderEposta: "ornek@posta.com",
    placeholderMesaj: "Masa, havuz, yüzme dersi veya özel gün hakkında yazın…",
    gonder: "Mesaj gönder",
    gonderiliyor: "Gönderiliyor…",
    success: "Mesajınız alındı. En kısa sürede dönüş yapacağız.",
    hataTelefon: "Geçerli bir telefon girin (10–11 hane).",
    hataBaglanti: "Bağlantı hatası. Lütfen telefonla deneyin.",
  },
  bolumGoster: {
    duyuru: true,
    hero: true,
    marquee: true,
    hizmetler: true,
    hakkimizda: true,
    ziyaret: true,
    menu: true,
    pasta: true,
    galeri: true,
    yorumlar: true,
    sss: true,
    rezervasyon: true,
    iletisim: true,
  },
  yorumlarMeta: {
    googleSayacMetin: "30+ Google Yorumu",
    googleSkor: "4.87 / 5.0",
    dogrulamaEtiketi: "Doğrulanmış Google Yorumu",
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Petra+Yaşam+Merkezi+Çekmeköy",
    badgeCta: "Google’da gör",
    unvanVarsayilan: "Müşteri",
  },
};




export function mergeContent(partial: Partial<SiteContent>, current: SiteContent): SiteContent {
  return {
    ...current,
    ...partial,
    images: partial.images ? { ...current.images, ...partial.images } : current.images,
    navbar: partial.navbar ? { ...current.navbar, ...partial.navbar, links: partial.navbar.links ?? current.navbar.links } : current.navbar,
    hero: partial.hero
      ? {
          ...current.hero,
          ...partial.hero,
          doorUv: partial.hero.doorUv ?? current.hero.doorUv,
          doorUvMobile: partial.hero.doorUvMobile ?? current.hero.doorUvMobile,
          textStyles: partial.hero.textStyles
            ? { ...current.hero.textStyles, ...partial.hero.textStyles }
            : current.hero.textStyles,
          textStylesMobile: partial.hero.textStylesMobile
            ? { ...current.hero.textStylesMobile, ...partial.hero.textStylesMobile }
            : current.hero.textStylesMobile,
        }
      : current.hero,
    duyuru: partial.duyuru ? { ...current.duyuru, ...partial.duyuru } : current.duyuru,
    hakkimizda: partial.hakkimizda ? { ...current.hakkimizda, ...partial.hakkimizda } : current.hakkimizda,
    bolumlar: partial.bolumlar
      ? {
          ...current.bolumlar,
          ...Object.fromEntries(
            Object.entries(partial.bolumlar).map(([key, value]) => [
              key,
              {
                ...((current.bolumlar as Record<string, unknown>)[key] as object),
                ...(value as object),
              },
            ])
          ),
        }
      : current.bolumlar,
    pasta: partial.pasta
      ? {
          ...current.pasta,
          ...partial.pasta,
          maddeler: partial.pasta.maddeler ?? current.pasta.maddeler,
          gorseller: partial.pasta.gorseller ?? current.pasta.gorseller,
          fiyatlar: partial.pasta.fiyatlar ?? current.pasta.fiyatlar,
          dersler: partial.pasta.dersler ?? current.pasta.dersler,
          kurallar: partial.pasta.kurallar ?? current.pasta.kurallar,
        }
      : current.pasta,
    iletisim: partial.iletisim ? { ...current.iletisim, ...partial.iletisim } : current.iletisim,
    menu: partial.menu !== undefined ? partial.menu : current.menu,
    hikaye: partial.hikaye !== undefined ? partial.hikaye : current.hikaye,
    manifesto: partial.manifesto ? { ...current.manifesto, ...partial.manifesto } : current.manifesto,
    makaleler: partial.makaleler ?? current.makaleler,
    galeri: partial.galeri ?? current.galeri,
    yorumlar: partial.yorumlar ?? current.yorumlar,
    sss: partial.sss ?? current.sss,
    marquee: partial.marquee ?? current.marquee,
    seo: partial.seo ? { ...current.seo, ...partial.seo } : current.seo,
    footer: partial.footer
      ? {
          ...current.footer,
          ...partial.footer,
          kolonlar: partial.footer.kolonlar ?? current.footer.kolonlar,
          barLinks: partial.footer.barLinks ?? current.footer.barLinks,
        }
      : current.footer,
    waFloat: partial.waFloat ? { ...current.waFloat, ...partial.waFloat } : current.waFloat,
    legal: partial.legal ? { ...current.legal, ...partial.legal } : current.legal,
    yorumlarMeta: partial.yorumlarMeta
      ? { ...current.yorumlarMeta, ...partial.yorumlarMeta }
      : current.yorumlarMeta,
    yorumlarSource: partial.yorumlarSource ?? current.yorumlarSource,
    yorumlarApi: partial.yorumlarApi ?? current.yorumlarApi,
    sayfalar: partial.sayfalar
      ? {
          urunler: { ...(current.sayfalar?.urunler || DEFAULT_CONTENT.sayfalar!.urunler), ...partial.sayfalar.urunler },
          urunKategori: {
            ...(current.sayfalar?.urunKategori || DEFAULT_CONTENT.sayfalar!.urunKategori),
            ...partial.sayfalar.urunKategori,
          },
          blog: { ...(current.sayfalar?.blog || DEFAULT_CONTENT.sayfalar!.blog), ...partial.sayfalar.blog },
        }
      : current.sayfalar || DEFAULT_CONTENT.sayfalar,
    brand: partial.brand
      ? { ...(current.brand || DEFAULT_CONTENT.brand!), ...partial.brand }
      : current.brand || DEFAULT_CONTENT.brand,
    theme: partial.theme
      ? { ...DEFAULT_THEME, ...(current.theme || DEFAULT_THEME), ...partial.theme }
      : current.theme || DEFAULT_THEME,
    ziyaret: partial.ziyaret ?? current.ziyaret ?? DEFAULT_CONTENT.ziyaret,
    hizmetler: Array.isArray(partial.hizmetler)
      ? partial.hizmetler
      : current.hizmetler ?? DEFAULT_CONTENT.hizmetler,
    rezervasyon: partial.rezervasyon
      ? {
          ...(current.rezervasyon || DEFAULT_CONTENT.rezervasyon),
          ...partial.rezervasyon,
        }
      : current.rezervasyon || DEFAULT_CONTENT.rezervasyon,
    mesajForm: partial.mesajForm
      ? {
          ...(current.mesajForm || DEFAULT_CONTENT.mesajForm),
          ...partial.mesajForm,
        }
      : current.mesajForm || DEFAULT_CONTENT.mesajForm,
    bolumGoster: partial.bolumGoster
      ? {
          ...(current.bolumGoster || DEFAULT_CONTENT.bolumGoster),
          ...partial.bolumGoster,
        }
      : current.bolumGoster || DEFAULT_CONTENT.bolumGoster,
  };
}
