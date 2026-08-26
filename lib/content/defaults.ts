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
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Menü", href: "/menu" },
      { label: "Havuz & Plaj", href: "/havuz-plaj" },
      { label: "Spor Salonu", href: "/spor-salonu" },
      { label: "Galeri", href: "#galeri" },
      { label: "Blog", href: "/blog" },
      { label: "İletişim", href: "#iletisim" },
    ],
  },
  loader: {
    aktif: true,
    tema: "light",
    baslik: "",
    sublabel: "",
    logoBoyut: 108,
    arkaplanRenk: "#FFFFFF",
    halkaRenk: "#D9A441",
    yaziRenk: "#0D0F0A",
    koseSusleri: true,
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
      { b: "08:00–02:00", span: "cafe her gün" },
      { b: "240+ Çeşit", span: "dünya menüsü" },
      { b: "09:00–18:00", span: "havuz & beach" },
      { b: "1000+ m²", span: "yaşam & etkinlik" },
    ],
    badgeBaslik: "Petra",
    badgeAlt: "Cafe · Restaurant · Pool",
    homeWordLimit: 100,
    stats: [
      { b: "08:00 – 02:00", span: "Cafe & Restoran Açık", sub: "Haftanın 7 günü kesintisiz lezzet ve keyif" },
      { b: "240+ Çeşit", span: "Zengin Dünya Menüsü", sub: "Kahvaltı, ızgara, taş fırın pizza ve İtalyan tatlılar" },
      { b: "09:00 – 18:00", span: "Açık Havuz & Beach Kulübü", sub: "Yetişkin & çocuk havuzu, şezlonglar ve VIP localar" },
      { b: "1000+ m²", span: "Sosyal Yaşam & Teras Alanı", sub: "Doğum günü, özel kutlama ve kurumsal davetler" }
    ],
    experiences: [
      {
        title: "Zengin Serpme Kahvaltı",
        desc: "Taş fırından yeni çıkmış sıcacık çıtır pişiler, seçkin köy peynirleri, sahanda sucuklu yumurta, bal-kaymak ve sınırsız demlik çay eşliğinde doyumsuz sabahlar.",
        hours: "08:00 – 14:00",
        tag: "Her Sabah Taze",
        features: ["Sınırsız Demlik Çay", "Taş Fırın Çıtır Pişi", "Yöresel Doğal Lezzetler"]
      },
      {
        title: "Dünya Mutfağı & Izgaralar",
        desc: "Marine edilmiş dana antrikot, odun ateşinde çıtır pizzalar, el yapımı gurme burgerler, taze İtalyan makarnaları ve taptaze Akdeniz salataları.",
        hours: "11:30 – 23:30",
        tag: "Usta Şeflerden",
        features: ["Taş Fırın Pizza", "Marine Izgara Etler", "El Yapımı Makarnalar"]
      },
      {
        title: "Pool & Beach Kulübü",
        desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar, cankurtaran desteği ve serinletici kokteyller.",
        hours: "09:00 – 18:00",
        tag: "Yaz Sezonu Boyunca",
        features: ["Yetişkin & Çocuk Havuzu", "VIP Loca & Şezlong", "Sürekli Su Hijyen Analizi"]
      },
      {
        title: "İtalyan Tatlıları & Nargile",
        desc: "Hakiki İtalyan mascarpone ile hazırlanan tiramisu, cannoli, imza kahveler, ferahlatıcı kokteyller ve açık havada birinci sınıf nargile deneyimi.",
        hours: "08:00 – 02:00",
        tag: "Geceye Kadar Keyif",
        features: ["Orijinal Mascarpone Tiramisu", "3. Nesil Özel Kahveler", "Seçkin Premium Tütünler"]
      }
    ],
    timeline: [
      {
        time: "08:00 – 12:00",
        title: "Güne Enerjik ve Taze Başlangıç",
        desc: "Kuş sesleri ve temiz hava eşliğinde taş fırından yeni çıkan pişiler, köy peynirleri ve demlik çay ile zengin serpme kahvaltı."
      },
      {
        time: "12:00 – 17:00",
        title: "Güneş, Havuz ve Serinlik",
        desc: "Yaz günlerinde açık yüzme havuzunda yüzme, şezlongda güneşlenme ve buz gibi imza kokteyller eşliğinde serinletici anlar."
      },
      {
        time: "17:00 – 21:00",
        title: "Şefin İmzasıyla Dünya Mutfağı",
        desc: "Akşamın ilk ışıklarıyla marine ızgaralar, taş fırın pizzalar ve gurme makarna tabakları ile damak çatlatan lezzet şöleni."
      },
      {
        time: "21:00 – 02:00",
        title: "Tatlı Sohbetler & Nargile Keyfi",
        desc: "İtalyan tatlıları, artisan kahveler ve açık-kapalı ferah lounge alanlarında gecenin tadını çıkaran keyifli buluşmalar."
      }
    ],
    values: [
      {
        title: "Tavizsiz Hijyen & Kalite",
        desc: "Mutfaktan havuza kadar her alanda düzenli denetimler, laboratuvar onaylı su analizleri ve en taze güvenilir gıda hammaddeleri."
      },
      {
        title: "Usta Şefler & Zengin Menü",
        desc: "Her biri kendi alanında uzman mutfak ve bar ekibimizin reçeteleriyle hazırlanan 240'ı aşkın özgün lezzet alternatifi."
      },
      {
        title: "Güler Yüzlü Misafirperverlik",
        desc: "Sizi ve ailenizi her gelişinizde evinizde hissettiren samimi, hızlı ve özenli hizmet anlayışı."
      },
      {
        title: "Her Yaşa Uygun Yaşam Alanı",
        desc: "Çocuk havuzundan sakin çalışma alanlarına, arkadaş buluşmalarından özel kutlama masalarına kadar herkese açık ferah atmosfer."
      }
    ],
    eventsTitle: "Unutulmaz Anlar İçin Özel Organizasyon Masaları",
    eventsLead: "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.",
    eventsTags: [
      "Doğum Günü Kutlamaları",
      "Evlilik Teklifi & Yıldönümü",
      "Kurumsal Şirket Yemekleri"
    ],
    amenities: [
      "Açık Yüzme & Çocuk Havuzu",
      "Açık Teras & Klimalı Salonlar",
      "Özel Gün & Organizasyon Masaları",
      "Geniş Otopark İmkânı",
      "Yüksek Hızlı Ücretsiz Wi-Fi",
      "Profesyonel Cankurtaran & Güvenlik"
    ],
    faqs: [
      {
        q: "Serpme kahvaltı ve restoran için rezervasyon gerekli mi?",
        a: "Hafta içi günlerde rezervasyonsuz katılım mümkündür. Ancak cuma, cumartesi ve pazar günleri yoğunluk yaşandığından, masa ve havuz başı yerinizi önceden ayırtmanızı tavsiye ederiz."
      },
      {
        q: "Açık yüzme havuzu kullanım saatleri ve şartları nelerdir?",
        a: "Havuzumuz yaz sezonu boyunca her gün 09:00 – 18:00 saatleri arasında açıktır. Yetişkin ve çocuk havuzlarımız cankurtaran gözetiminde olup şezlong ve şemsiye kullanımı fiyata dahildir."
      },
      {
        q: "Doğum günü, evlilik teklifi veya özel davet düzenleyebilir miyiz?",
        a: "Evet! Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal yemekler için özel masa süslemesi, pasta servisi ve kişiye özel menü seçenekleri sunuyoruz. 0530 608 90 51 veya WhatsApp hattımızdan rezervasyon oluşturabilirsiniz."
      },
      {
        q: "Petra Yaşam Merkezi'ne ulaşım ve otopark durumu nasıldır?",
        a: "Tesisimiz Çekmeköy Taşdelen Megakent Sitesi içerisinde yer almaktadır. Araçla gelen misafirlerimiz için geniş otopark alanı mevcuttur."
      }
    ]
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
      baslik: "Masanızı ayırtın",
      lead: "Tarih, saat ve kişi sayısını bırakın; ekibimiz telefonla onaylar. Cuma–cumartesi kahvaltı ve havuz için önceden rezervasyon önerilir.",
    },
    hizmetler: {
      eyebrow: "01 · PETRA YAŞAM MERKEZİ",
      baslik: "Cafe · Restaurant · Pool & Beach",
      lead: "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, taze kahve ve nargile — havuz kenarında veya salonda.",
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
    dersBaslik: "YÜZME KURSU — Kayıtlarımız Başlamıştır",
    dersLead: "Uzman eğitmenlerimiz eşliğinde, çocuklarınızın suya olan güvenini artırmak ve temel yüzme becerilerini öğrenmelerini amaçlıyoruz.",
    dersler: [
      { baslik: "Grup Yüzme Dersi", kicker: "Salı - Perşembe (08:45 – 09:30)", metin: "5–8 yaş ve 9–12 yaş çocuk grupları için temel teknik eğitimi. Fiyat: 7.000 TL" },
      { baslik: "Birebir Özel Yüzme Dersi", kicker: "Kişiye Özel Program", metin: "Uzman antrenör eşliğinde yaş sınırı olmaksızın birebir yüzme eğitimi. Fiyat: 9.000 TL" },
    ],
    yuzmeKursu: {
      baslik: "YÜZME KURSU",
      rozet: "Kayıtlarımız Başlamıştır",
      lead: "Uzman eğitmenlerimiz eşliğinde, çocuklarınızın suya olan güvenini artırmak ve temel yüzme becerilerini öğrenmelerini amaçlıyoruz.",
      programGunler: "SALI - PERŞEMBE",
      programSaat: "08:45 – 09:30",
      yasGruplari: ["5–8 Yaş", "9–12 Yaş"],
      grupFiyat: "7.000 TL",
      ozelFiyat: "9.000 TL",
      telefon: "0530 608 90 51",
      instagram: "@petracaferestaurant",
    },
    kurallar: [
      "Tesis bünyesinde çocukların güvenle zaman geçirebileceği ayrı bir çocuk havuzu mevcuttur.",
      "Büyük havuzun derinliği kademeli olarak 1.45 metre ile 1.95 metre arasında değişmektedir.",
      "Havuzda yaş sınırı olmaksızın profesyonel yüzme kursu eğitimi verilmektedir.",
      "Havuz alanı 09:00 - 18:00 saatleri arasında kullanıma açıktır.",
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
      {
        src: "/assets/cms/petra-pool-beach-loca.jpg",
        alt: "Pool & Beach & VIP Hasır Localar",
        desc: "Güneşlenme şezlongları, yetişkin havuzu ve konforlu hasır localarla gün boyu lüks tatil ve serinlik atmosferi.",
        tag: "Açık Yüzme Havuzu",
        position: "center 40%",
      },
      {
        src: "/assets/cms/petra-nargile-havuz-gece.jpg",
        alt: "Gece Havuz Kenarı Lounge & Nargile",
        desc: "Işıklı su havuzu manzarası eşliğinde premium nargile çeşitleri, kokteyller ve ferah açık hava oturma alanı.",
        tag: "Teras & Akşam Keyfi",
        position: "center center",
      },
      {
        src: "/assets/cms/petra-restoran-salon-organizasyon.jpg",
        alt: "Özel Günler & Restoran Salonu",
        desc: "Doğum günleri, evlilik teklifleri ve kurumsal davetler için havuz manzaralı şık masa düzeni ve zengin dünya mutfağı.",
        tag: "Kutlama & Davet",
        position: "center center",
      },
      {
        src: "/assets/cms/hero-cephe.webp",
        alt: "Petra Yaşam Merkezi & Tesis Alanı",
        desc: "Taşdelen'de açık yetişkin havuzu, ayrı çocuk havuzu, modern fitness salonu ve zengin restoranı bir arada sunan yaşam alanı.",
        tag: "Sosyal Yaşam Alanı",
        position: "center center",
      },
    ],
  },
  sporSalonu: {
    eyebrow: "PETRA YAŞAM MERKEZİ",
    baslik: "Petra Spor Salonu",
    lead: "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın.",
    saatler: "Haftanın 7 Günü: 07:00 – 23:00",
    telefon: "0530 608 90 51",
    telefon2: "+90 216 706 80 51",
    instagram: "@petrasporsalonu",
    instagramUrl: "https://www.instagram.com/petrasporsalonu",
    ozellikler: [
      {
        baslik: "%35 Ön Kayıt Avantajı",
        alt: "Erken dönem üyelik indirimi",
        ikon: "sparkles",
      },
      {
        baslik: "Kardiyo & Serbest Ağırlık",
        alt: "Modern istasyonlar & dambıllar",
        ikon: "dumbbell",
      },
      {
        baslik: "Havuz & Teras Entegrasyonu",
        alt: "Antrenman sonrası serinleme",
        ikon: "waves",
      },
      {
        baslik: "07:00 – 23:00 Kesintisiz",
        alt: "Haftanın 7 günü açık salon",
        ikon: "clock",
      },
    ],
    bentoGorseller: [
      {
        src: "/assets/cms/hero-ic.webp",
        alt: "Petra Fitness & Antrenman Alanı",
        rozet: "Kardiyo & Serbest Ağırlık",
      },
      {
        src: "/assets/cms/hero-cephe.webp",
        alt: "Petra Spor ve Yaşam Kompleksi",
        rozet: "Ferah & Hijyenik Salon",
      },
    ],
    body: [
      "Petra Spor Salonu; Petra Yaşam Merkezi bünyesinde modern antrenman standartlarını, hijyenik ve havalandırmalı salon konseptiyle buluşturuyor.",
    ],
    alanlar: [
      { baslik: "Kardiyo İstasyonları", kicker: "Kondisyon & Yağ Yakımı", metin: "Koşu bantları ve kondisyon aletleri.", ikon: "flame" },
      { baslik: "Serbest Ağırlık & Dambıl", kicker: "Güç & Kas Gelişimi", metin: "Dambıl ve sehpalar.", ikon: "dumbbell" },
    ],
    imkanlar: [
      "Modern Kardiyo ve Fitness Ekipmanları",
      "Havalandırmalı & Ferah Antrenman Salonu",
      "Hijyenik Soyunma Odaları ve Duşlar",
      "Açık Havuz & Pool Kulübü Entegrasyonu",
    ],
    ctaTitle: "Hedeflerinize Petra ile Ulaşın",
    ctaLead: "Petra Spor Salonu üyelik paketleri için bize ulaşın.",
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
    notFound: {
      kicker: "404 · HATALI BAĞLANTI",
      title: "Aradığınız Sayfa Bulunamadı",
      lead: "Girdiğiniz web adresi hatalı yazılmış, sayfa taşınmış veya geçici olarak yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan dilediğiniz bölüme geçiş yapabilirsiniz.",
      primaryLabel: "Ana Sayfaya Dön",
      primaryHref: "/",
      secondaryLabel: "Menüyü İncele",
      secondaryHref: "/menu",
      waLabel: "WhatsApp'tan Danışın",
      showQuickLinks: true,
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
    onYazi: "Merhaba, Petra Yaşam Merkezi web siteniz üzerinden iletişime geçiyorum. Bilgi almak istiyorum.",
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
    { k: "Saatler", v: "08:00 – 02:00", n: "Cafe açık · Havuz 09:00–18:00", href: "#iletisim" },
    { k: "Rezervasyon", v: "0530 608 90 51", n: "Masa, havuz ve özel davetler", href: "#rezervasyon" },
    { k: "Havuz & Plaj", v: "09:00 – 18:00", n: "Yetişkin & çocuk havuzu, şezlong", href: "#pasta" },
    { k: "Konum", v: "Petra Yaşam Merkezi", n: "Taşdelen · Çekmeköy / İstanbul", href: "https://maps.google.com/?q=Petra+Yaşam+Merkezi+Taşdelen+Çekmeköy" },
  ],
  hizmetler: [
    {
      label: "Dünya Mutfağı",
      emoji: "👨‍🍳",
      icon: "chef",
      badge: "Gurme Lezzetler",
      href: "/menu",
      aciklama: "Usta şeflerimizin hazırladığı seçkin dünya mutfağı lezzetleri, et spesiyalleri, taze makarna ve gurme burgerler.",
    },
    {
      label: "Serpme Kahvaltı",
      emoji: "🍳",
      icon: "sunrise",
      badge: "Her Sabah Taze",
      href: "/menu/kahvalti",
      aciklama: "Zengin yöresel peynirler, sıcak ikramlar, taze hamur işleri ve sınırsız çay ile havuz başında güne eşsiz başlangıç.",
    },
    {
      label: "POOL & BEACH",
      emoji: "🏝️",
      icon: "waves",
      badge: "09:00 – 18:00",
      href: "/havuz-plaj",
      aciklama: "Açık yetişkin havuzu, güvenli çocuk havuzu, güneşlenme şezlongları ve VIP hasır localarla gün boyu serinlik ve tatil konforu.",
    },
    {
      label: "COFFEE & FOOD",
      emoji: "🌴",
      icon: "coffee",
      badge: "Özel Harman",
      href: "/menu/kahve",
      aciklama: "Taze çekilmiş 3. nesil aromatik kahveler, lezzetli atıştırmalıklar, sandviçler ve gün boyu ferah kafe keyfi.",
    },
    {
      label: "İtalyan Kokteylleri",
      emoji: "🍸",
      icon: "wine",
      badge: "İmza Reçeteler",
      href: "/menu/kokteyller",
      aciklama: "Klasik İtalyan kokteylleri, taze meyveli mocktailler, buz gibi frozenlar ve profesyonel barmenlerden özel sunumlar.",
    },
    {
      label: "İtalyan Tatlı Çeşitleri",
      emoji: "🍰",
      icon: "cake",
      badge: "Günlük Taze",
      href: "/menu/tatlilar",
      aciklama: "Otantik İtalyan tiramisu, San Sebastian cheesecake, sufle, profiterol ve günlük hazırlanan zengin tatlı vitrini.",
    },
    {
      label: "En İyi Nargile Çeşitleri",
      emoji: "🏖️",
      icon: "flame",
      badge: "Premium Tütün",
      href: "/menu/nargile",
      aciklama: "Seçkin tütün harmanları, taze meyve çanaklı özel nargileler ve ışıklı havuz kenarında akşam nargile keyfi.",
    },
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
    sporSalonu: true,
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
    loader: partial.loader
      ? { ...(current.loader || DEFAULT_CONTENT.loader), ...partial.loader }
      : current.loader || DEFAULT_CONTENT.loader,
    sporSalonu: partial.sporSalonu
      ? {
          ...(current.sporSalonu || DEFAULT_CONTENT.sporSalonu!),
          ...partial.sporSalonu,
          body: partial.sporSalonu.body ?? current.sporSalonu?.body ?? DEFAULT_CONTENT.sporSalonu!.body,
          ozellikler: partial.sporSalonu.ozellikler ?? current.sporSalonu?.ozellikler ?? DEFAULT_CONTENT.sporSalonu!.ozellikler,
          alanlar: partial.sporSalonu.alanlar ?? current.sporSalonu?.alanlar ?? DEFAULT_CONTENT.sporSalonu!.alanlar,
          imkanlar: partial.sporSalonu.imkanlar ?? current.sporSalonu?.imkanlar ?? DEFAULT_CONTENT.sporSalonu!.imkanlar,
          bentoGorseller: partial.sporSalonu.bentoGorseller ?? current.sporSalonu?.bentoGorseller ?? DEFAULT_CONTENT.sporSalonu!.bentoGorseller,
        }
      : current.sporSalonu || DEFAULT_CONTENT.sporSalonu,
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
    duyuru: partial.duyuru
      ? { ...(current.duyuru || DEFAULT_CONTENT.duyuru), ...partial.duyuru }
      : current.duyuru || DEFAULT_CONTENT.duyuru,
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
          yuzmeKursu: partial.pasta.yuzmeKursu
            ? {
                ...(current.pasta?.yuzmeKursu || DEFAULT_CONTENT.pasta.yuzmeKursu!),
                ...partial.pasta.yuzmeKursu,
              }
            : current.pasta?.yuzmeKursu ?? DEFAULT_CONTENT.pasta.yuzmeKursu,
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
          notFound: partial.sayfalar.notFound
            ? {
                ...(current.sayfalar?.notFound || DEFAULT_CONTENT.sayfalar!.notFound!),
                ...partial.sayfalar.notFound,
              }
            : current.sayfalar?.notFound ?? DEFAULT_CONTENT.sayfalar!.notFound,
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
