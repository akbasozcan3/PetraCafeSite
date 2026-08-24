import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  Waves, 
  Flame, 
  Coffee, 
  Clock, 
  ShieldCheck, 
  PartyPopper, 
  Car, 
  Wifi, 
  Sun, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  Cake, 
  Heart, 
  Briefcase,
  ChevronRight,
  Navigation,
  BookOpen,
  CalendarCheck,
  Award,
  HeartHandshake
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant` : "Hakkımızda & Yaşam Felsefemiz — Petra Cafe Restaurant";
  const description =
    h?.lead ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de serpme kahvaltı, dünya mutfağı, açık havuz & plaj ve organizasyon.";

  return {
    title,
    description,
    alternates: { canonical: "/hakkimizda" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/assets/cms/hero-ic.webp",
          width: 1200,
          height: 630,
          alt: "Petra Cafe Restaurant Hakkımızda",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HakkimizdaPage() {
  const content = await getPublicContent();
  const h = content.hakkimizda || {
    eyebrow: "HAKKIMIZDA",
    baslik: "Petra Yaşam Merkezi'nde cafe & restaurant",
    answerBaslik: "Kısaca",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar.",
    lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
    body: [
      "# Petra Cafe Restaurant",
      "## Gastronomi, Konfor ve Sosyal Yaşam",
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Günün her saatine eşlik eden zengin menüsü, ferah atmosferi ve havuz başı deneyimiyle Petra; yalnızca yemek yemek için değil, sevdiklerinizle unutulmaz anlar biriktirmek için tasarlandı.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız ve çıtır lezzetlerimizle güne harika bir başlangıç yapabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.",
      "Yaz aylarında açık yüzme havuzumuz ve pool & beach alanımızla şehir hayatının stresinden uzaklaşıp serinliğin tadını çıkarabilirsiniz. Doğum günleri, evlilik teklifleri ve kurumsal davetleriniz için sunduğumuz özel organizasyon masalarıyla en değerli anlarınızı kusursuz kılıyoruz."
    ],
    badgeBaslik: "Petra Yaşam Merkezi",
    badgeAlt: "Cafe · Restaurant · Pool"
  };

  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  const telCafe = content.iletisim?.telefon || "0530 608 90 51";
  const telTesis = content.iletisim?.telefon2 || "0532 449 45 99";
  const telCafeHref = phoneToTelHref(telCafe);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || telCafe, 
    "Merhaba, Petra Cafe Restaurant & Yaşam Merkezi hakkında bilgi ve rezervasyon için yazıyorum."
  );

  // Gövde Metni Hazırlığı
  let bodySource: string | string[] = h.body;
  if (!bodySource || (Array.isArray(bodySource) && bodySource.length === 0)) {
    bodySource = h.lead || "";
  }
  const parsedBlocks = parseArticleContent(bodySource);

  // İstatistikler (Dinamik)
  const statsList = (h.stats && h.stats.length > 0) ? h.stats : (h.ozet && h.ozet.length > 0 ? h.ozet : [
    { b: "08:00 – 02:00", span: "Cafe & Restoran Açık", sub: "Haftanın 7 günü kesintisiz lezzet ve keyif" },
    { b: "240+ Çeşit", span: "Zengin Dünya Menüsü", sub: "Kahvaltı, ızgara, taş fırın pizza ve tatlılar" },
    { b: "09:00 – 18:00", span: "Açık Havuz & Beach Kulübü", sub: "Yetişkin & çocuk havuzu, şezlonglar ve VIP localar" },
    { b: "1000+ m²", span: "Sosyal Yaşam & Teras Alanı", sub: "Doğum günü, özel kutlama ve kurumsal davetler" }
  ]);
  const statIcons = [Clock, UtensilsCrossed, Waves, Sparkles];

  // 4 Temel Deneyim Alanı (Dinamik)
  const defaultExperiences = [
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
    },
  ];
  const experiencesList = (h.experiences && h.experiences.length > 0) ? h.experiences : defaultExperiences;
  const expIcons = [Coffee, UtensilsCrossed, Waves, Flame];

  // Bir Günün Petra'daki Akışı (Timeline)
  const defaultTimeline = [
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
    },
  ];
  const timelineList = (h.timeline && h.timeline.length > 0) ? h.timeline : defaultTimeline;
  const timelineIcons = [Sun, Waves, UtensilsCrossed, Flame];

  // Tesis İmkânları
  const defaultAmenities = [
    "Açık Yüzme & Çocuk Havuzu",
    "Açık Teras & Klimalı Salonlar",
    "Özel Gün & Organizasyon Masaları",
    "Geniş Otopark İmkânı",
    "Yüksek Hızlı Ücretsiz Wi-Fi",
    "Profesyonel Cankurtaran & Güvenlik"
  ];
  const amenitiesList = (h.amenities && h.amenities.length > 0) ? h.amenities : defaultAmenities;
  const amenityIcons = [Waves, UtensilsCrossed, PartyPopper, Car, Wifi, ShieldCheck];

  // Sıkça Sorulan Sorular
  const defaultFaqs = [
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
  ];
  const faqsList = (h.faqs && h.faqs.length > 0) ? h.faqs : defaultFaqs;

  // Özel Günler / Organizasyonlar
  const eventsTitle = h.eventsTitle || "Unutulmaz Anlar İçin Özel Organizasyon Masaları";
  const eventsLead = h.eventsLead || "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.";
  const eventsTags = (h.eventsTags && h.eventsTags.length > 0) ? h.eventsTags : [
    "Doğum Günü Kutlamaları",
    "Evlilik Teklifi & Yıldönümü",
    "Kurumsal Şirket Yemekleri"
  ];

  const getEventTagIcon = (tag: string) => {
    const t = cleanRawText(tag).toLowerCase();
    if (t.includes("doğum") || t.includes("pasta") || t.includes("kutlama") || t.includes("birthday")) return Cake;
    if (t.includes("evlilik") || t.includes("teklif") || t.includes("yıldönüm") || t.includes("düğün") || t.includes("nişan") || t.includes("sevgi")) return Heart;
    if (t.includes("kurumsal") || t.includes("şirket") || t.includes("toplantı") || t.includes("iş") || t.includes("yemek")) return Briefcase;
    if (t.includes("özel") || t.includes("parti") || t.includes("davet")) return PartyPopper;
    return Sparkles;
  };

  return (
    <div className="petra-about-page" style={{ width: "100%", padding: "20px 0 60px", fontFamily: "var(--f-body, 'Inter', sans-serif)", color: "var(--card-text, #0D0F0A)", boxSizing: "border-box" }}>
      
      {/* 1. BREADCRUMBS (REZERVASYON KOŞULLARI İLE BİREBİR AYNI) */}
      <nav 
        aria-label="Breadcrumb" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          fontSize: "12px", 
          color: "var(--card-muted, #6e6a5c)", 
          marginBottom: "24px" 
        }}
      >
        <Link href="/" style={{ color: "var(--card-text, #0d0f0a)", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span>/</span>
        <span style={{ color: "var(--brass-lo, #b8842c)", fontWeight: 700 }}>Hakkımızda</span>
      </nav>

      {/* 2. ANA 2 KOLONLU DÜZEN */}
      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
        
        {/* SOL SÜTUN (STICKY KENAR ÇUBUĞU - FOTOĞRAF, HIZLI LİNKLER VE İLETİŞİM) */}
        <aside 
          style={{ 
            width: "320px", 
            flexShrink: 0, 
            display: "flex", 
            flexDirection: "column", 
            gap: "20px",
            position: "sticky",
            top: "100px"
          }}
        >
          
          {/* Sol: Menü & Sayfa Navigasyon Kartı */}
          <div 
            style={{ 
              background: "var(--card-bg, #ffffff)", 
              borderRadius: "20px", 
              border: "1.5px solid var(--card-border, rgba(184, 132, 44, 0.25))", 
              padding: "20px", 
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)" 
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--brass-lo, #b8842c)", display: "block", marginBottom: "14px" }}>
              KURUMSAL & HAKKIMIZDA
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "12px 16px", 
                  borderRadius: "14px", 
                  background: "var(--brass, #d9a441)", 
                  color: "#0d0f0a", 
                  fontWeight: 700, 
                  fontSize: "14px",
                  boxShadow: "0 4px 14px rgba(217, 164, 65, 0.3)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <BookOpen size={16} />
                  <span>Hakkımızda & Hikaye</span>
                </div>
                <span>→</span>
              </div>

              <Link 
                href="/menu"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "11px 16px", 
                  borderRadius: "12px", 
                  background: "rgba(13,15,10,0.03)", 
                  color: "var(--card-text, #383c30)", 
                  fontWeight: 600, 
                  fontSize: "13.5px",
                  textDecoration: "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <UtensilsCrossed size={15} color="#b8842c" />
                  <span>Menü & Lezzetler</span>
                </div>
                <span style={{ opacity: 0.4 }}>→</span>
              </Link>

              <Link 
                href="/#rezervasyon"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "11px 16px", 
                  borderRadius: "12px", 
                  background: "rgba(13,15,10,0.03)", 
                  color: "var(--card-text, #383c30)", 
                  fontWeight: 600, 
                  fontSize: "13.5px",
                  textDecoration: "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CalendarCheck size={15} color="#b8842c" />
                  <span>Masa & Havuz Rezervasyon</span>
                </div>
                <span style={{ opacity: 0.4 }}>→</span>
              </Link>

              <Link 
                href="/rezervasyon-kosullari"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  padding: "11px 16px", 
                  borderRadius: "12px", 
                  background: "rgba(13,15,10,0.03)", 
                  color: "var(--card-text, #383c30)", 
                  fontWeight: 600, 
                  fontSize: "13.5px",
                  textDecoration: "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ShieldCheck size={15} color="#b8842c" />
                  <span>Rezervasyon Koşulları</span>
                </div>
                <span style={{ opacity: 0.4 }}>→</span>
              </Link>
            </div>
          </div>

          {/* Sol: Mekan İç Fotoğrafı & Rozeti */}
          <div 
            style={{ 
              borderRadius: "20px", 
              overflow: "hidden", 
              border: "1.5px solid var(--card-border, rgba(184, 132, 44, 0.25))", 
              background: "var(--card-bg, #ffffff)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
              position: "relative"
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "200px" }}>
              <SafeImg
                src={img}
                alt="Petra Yaşam Merkezi İç Mekan"
                fallback={SITE_PHOTOS.interior}
                width={600}
                height={400}
              />
              <div 
                style={{ 
                  position: "absolute", 
                  top: "12px", 
                  left: "12px", 
                  background: "rgba(13, 15, 10, 0.8)", 
                  backdropFilter: "blur(8px)", 
                  padding: "4px 10px", 
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E" }} />
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  AÇIK (08:00 – 02:00)
                </span>
              </div>
            </div>

            <div style={{ padding: "16px 18px" }}>
              <b style={{ display: "block", fontSize: "16px", fontWeight: 800, color: "var(--card-text, #0d0f0a)", fontFamily: "var(--f-head, serif)" }}>
                {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
              </b>
              <span style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--brass-lo, #b8842c)", marginTop: "2px" }}>
                {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}
              </span>
              <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "var(--card-muted, #6e6a5c)", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} color="#b8842c" />
                <span>Taşdelen, Çekmeköy / İstanbul</span>
              </p>
            </div>
          </div>

          {/* Sol: Hızlı İletişim Kutusu */}
          <div 
            style={{ 
              background: "var(--card-bg, #ffffff)", 
              borderRadius: "20px", 
              border: "1.5px solid var(--card-border, rgba(184, 132, 44, 0.25))", 
              padding: "20px", 
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            <div>
              <b style={{ fontSize: "13px", fontWeight: 700, color: "var(--card-text, #0d0f0a)", display: "block" }}>
                Sorularınız mı var?
              </b>
              <span style={{ fontSize: "12px", color: "var(--card-muted, #6e6a5c)" }}>
                Masa ve etkinlik planlaması için bize dilediğiniz an ulaşabilirsiniz.
              </span>
            </div>

            <a
              href={`tel:${telCafeHref}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "11px",
                borderRadius: "12px",
                background: "rgba(13,15,10,0.05)",
                color: "var(--card-text, #0d0f0a)",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(13,15,10,0.1)"
              }}
            >
              <Phone size={14} color="#b8842c" />
              <span>{telCafe}</span>
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "11px",
                borderRadius: "12px",
                background: "#25D366",
                color: "#0b140c",
                fontSize: "13px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(37,211,102,0.25)"
              }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp İletişim</span>
            </a>
          </div>

        </aside>

        {/* SAĞ SÜTUN (BEYAZ LÜKS ANA KART - RESMİ BİLDİRİM FORMATI) */}
        <main 
          style={{ 
            flex: "1 1 600px", 
            minWidth: 0, 
            background: "var(--card-bg, #ffffff)", 
            borderRadius: "24px", 
            border: "1.5px solid var(--card-border, rgba(184, 132, 44, 0.25))", 
            padding: "clamp(28px, 4vw, 44px)", 
            boxShadow: "0 12px 40px -10px rgba(0,0,0,0.08)",
            boxSizing: "border-box"
          }}
        >
          
          {/* Üst Başlık & Rozet */}
          <div style={{ marginBottom: "24px" }}>
            <span 
              style={{ 
                display: "inline-block", 
                padding: "6px 14px", 
                borderRadius: "999px", 
                background: "rgba(217, 164, 65, 0.14)", 
                border: "1px solid rgba(217, 164, 65, 0.35)", 
                color: "var(--brass-lo, #b8842c)", 
                fontSize: "11px", 
                fontWeight: 800, 
                letterSpacing: "0.12em", 
                textTransform: "uppercase",
                marginBottom: "12px" 
              }}
            >
              {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM FELSEFEMİZ")}
            </span>

            <h1 
              style={{ 
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)", 
                fontSize: "clamp(26px, 3.5vw, 38px)", 
                fontWeight: 600, 
                color: "var(--card-text, #0D0F0A)", 
                margin: "0 0 12px 0", 
                lineHeight: 1.2,
                letterSpacing: "-0.01em"
              }}
            >
              {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant")}
            </h1>

            <p style={{ fontSize: "16px", color: "var(--card-muted, #5C584C)", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>
              {cleanRawText(h.lead || "Keyif, konfor ve kalite — sabahın ilk ışıklarındaki kahvaltıdan akşam yemeğine.")}
            </p>
          </div>

          {/* Kısaca Kutusu (Öne Çıkan Bilgi) */}
          {h.answerMetin && (
            <div 
              style={{ 
                background: "rgba(217, 164, 65, 0.08)", 
                borderLeft: "4px solid var(--brass, #D9A441)", 
                borderRadius: "14px", 
                padding: "18px 22px", 
                marginBottom: "32px" 
              }}
            >
              <b style={{ color: "var(--brass-lo, #B8842C)", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                {cleanRawText(h.answerBaslik || "Kısaca")}
              </b>
              <p style={{ margin: 0, fontSize: "15px", color: "var(--card-text, #0D0F0A)", lineHeight: 1.7, fontWeight: 500 }}>
                {formatInlineText(h.answerMetin, "#0D0F0A")}
              </p>
            </div>
          )}

          {/* Dinamik Makale Paragrafları ve Başlıklar (#, ##, ###, **, *) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {parsedBlocks.map((block, idx) => {
              if (block.type === "h1") {
                return (
                  <h2 
                    key={idx} 
                    style={{ 
                      fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)", 
                      fontSize: "24px", 
                      fontWeight: 600, 
                      color: "var(--card-text, #0D0F0A)", 
                      margin: "28px 0 6px 0", 
                      paddingBottom: "8px", 
                      borderBottom: "1px solid rgba(13,15,10,0.08)",
                      lineHeight: 1.25 
                    }}
                  >
                    {cleanRawText(block.text || "")}
                  </h2>
                );
              }
              if (block.type === "h2") {
                return (
                  <h3 
                    key={idx} 
                    style={{ 
                      fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)", 
                      fontSize: "20px", 
                      fontWeight: 600, 
                      color: "var(--brass-lo, #B8842C)", 
                      margin: "20px 0 4px 0",
                      lineHeight: 1.3 
                    }}
                  >
                    {cleanRawText(block.text || "")}
                  </h3>
                );
              }
              if (block.type === "h3") {
                return (
                  <h4 
                    key={idx} 
                    style={{ 
                      fontSize: "16px", 
                      fontWeight: 700, 
                      color: "var(--card-text, #0D0F0A)", 
                      margin: "16px 0 2px 0" 
                    }}
                  >
                    {cleanRawText(block.text || "")}
                  </h4>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote 
                    key={idx} 
                    style={{ 
                      borderLeft: "3px solid var(--brass, #D9A441)", 
                      padding: "12px 20px", 
                      background: "rgba(217, 164, 65, 0.06)", 
                      fontStyle: "italic", 
                      color: "#4A4538", 
                      borderRadius: "0 12px 12px 0",
                      margin: "14px 0" 
                    }}
                  >
                    {formatInlineText(block.text || "", "#0D0F0A")}
                  </blockquote>
                );
              }
              if (block.type === "list" && block.items) {
                return (
                  <ul key={idx} style={{ paddingLeft: "20px", margin: "8px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {block.items.map((item, lidx) => (
                      <li key={lidx} style={{ color: "#383C30", fontSize: "15.5px", lineHeight: 1.7 }}>
                        {formatInlineText(item, "#0D0F0A")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} style={{ margin: 0, fontSize: "15.5px", lineHeight: 1.85, color: "#383C30" }}>
                  {formatInlineText(block.text || "", "#0D0F0A")}
                </p>
              );
            })}
          </div>

          {/* 3 TEMEL DEĞER SÜTUNU */}
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
              gap: "16px", 
              paddingTop: "28px", 
              borderTop: "1px solid rgba(13,15,10,0.08)",
              marginBottom: "40px" 
            }}
          >
            <div style={{ padding: "16px", borderRadius: "14px", background: "rgba(13,15,10,0.02)", border: "1px solid rgba(13,15,10,0.06)" }}>
              <b style={{ display: "block", fontFamily: "var(--f-head, serif)", fontSize: "20px", color: "var(--brass-lo, #B8842C)", marginBottom: "2px" }}>
                Gastronomi
              </b>
              <span style={{ fontSize: "12px", color: "var(--card-muted, #6E6A5C)", fontWeight: 600 }}>
                Seçkin Dünya Mutfağı & Izgaralar
              </span>
            </div>

            <div style={{ padding: "16px", borderRadius: "14px", background: "rgba(13,15,10,0.02)", border: "1px solid rgba(13,15,10,0.06)" }}>
              <b style={{ display: "block", fontFamily: "var(--f-head, serif)", fontSize: "20px", color: "var(--brass-lo, #B8842C)", marginBottom: "2px" }}>
                Pool & Beach
              </b>
              <span style={{ fontSize: "12px", color: "var(--card-muted, #6E6A5C)", fontWeight: 600 }}>
                Açık Yüzme Havuzu & VIP Loca
              </span>
            </div>

            <div style={{ padding: "16px", borderRadius: "14px", background: "rgba(13,15,10,0.02)", border: "1px solid rgba(13,15,10,0.06)" }}>
              <b style={{ display: "block", fontFamily: "var(--f-head, serif)", fontSize: "20px", color: "var(--brass-lo, #B8842C)", marginBottom: "2px" }}>
                Konfor
              </b>
              <span style={{ fontSize: "12px", color: "var(--card-muted, #6E6A5C)", fontWeight: 600 }}>
                Ferah Teras & Özel Kutlamalar
              </span>
            </div>
          </div>

          {/* 4'LÜ İSTATİSTİK SAYACI (BEYAZ KARTLAR) */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--card-text, #0D0F0A)", marginBottom: "16px" }}>
              Rakamlarla Petra Yaşam Merkezi
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
              {statsList.map((st: any, i: number) => {
                const StatIcon = statIcons[i % statIcons.length] || Sparkles;
                return (
                  <div key={i} style={{ padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--brass-lo, #B8842C)", fontFamily: "var(--f-head, serif)" }}>
                        {cleanRawText(st.b || "")}
                      </span>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(217, 164, 65, 0.12)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <StatIcon size={15} />
                      </div>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--card-text, #0D0F0A)", display: "block" }}>
                      {cleanRawText(st.span || "")}
                    </span>
                    {st.sub && (
                      <span style={{ fontSize: "11px", color: "var(--card-muted, #6E6A5C)", display: "block", marginTop: "2px" }}>
                        {cleanRawText(st.sub)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 TEMEL YAŞAM DENEYİMİ */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--card-text, #0D0F0A)", marginBottom: "16px" }}>
              Petra'da Sizi Neler Bekliyor?
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {experiencesList.map((item: any, i: number) => {
                const Icon = expIcons[i % expIcons.length] || UtensilsCrossed;
                const feats: string[] = Array.isArray(item.features) ? item.features : [];
                return (
                  <div 
                    key={i} 
                    style={{ 
                      padding: "20px", 
                      borderRadius: "16px", 
                      background: "rgba(13,15,10,0.015)", 
                      border: "1.5px solid rgba(184, 132, 44, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between" 
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={20} />
                        </div>
                        {item.hours && (
                          <span style={{ fontSize: "11px", fontWeight: 800, color: "#9E6E1A", background: "#F7F2E7", padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(184, 132, 44, 0.25)" }}>
                            {item.hours}
                          </span>
                        )}
                      </div>

                      {item.tag && (
                        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8842C", display: "block", marginBottom: "2px" }}>
                          {item.tag}
                        </span>
                      )}

                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--card-text, #0D0F0A)", margin: "0 0 6px 0", fontFamily: "var(--f-head, serif)" }}>
                        {cleanRawText(item.title || "")}
                      </h3>

                      <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "#4A4538", lineHeight: 1.6 }}>
                        {cleanRawText(item.desc || "")}
                      </p>
                    </div>

                    {feats.length > 0 && (
                      <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(13,15,10,0.06)", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {feats.map((feat, fidx) => (
                          <div key={fidx} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#2C2F26", fontWeight: 600 }}>
                            <CheckCircle2 size={13} color="#B8842C" />
                            <span>{cleanRawText(feat)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 24 SAAT ZAMAN AKIŞI (TIMELINE) */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--card-text, #0D0F0A)", marginBottom: "16px" }}>
              Bir Günün Petra'daki Akışı
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
              {timelineList.map((step: any, idx: number) => {
                const StepIcon = timelineIcons[idx % timelineIcons.length] || Sun;
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: "16px", 
                      borderRadius: "14px", 
                      background: "#FFFFFF", 
                      border: "1px solid rgba(184, 132, 44, 0.2)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px" 
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#FFFFFF", background: "var(--card-text, #0D0F0A)", padding: "3px 8px", borderRadius: "6px" }}>
                        {cleanRawText(step.time || "")}
                      </span>
                      <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(217, 164, 65, 0.12)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <StepIcon size={14} />
                      </div>
                    </div>

                    <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--card-text, #0D0F0A)", margin: "4px 0 0 0" }}>
                      {cleanRawText(step.title || "")}
                    </h4>

                    <p style={{ margin: 0, fontSize: "12px", color: "var(--card-muted, #5C584C)", lineHeight: 1.55 }}>
                      {cleanRawText(step.desc || "")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ÖZEL GÜNLER & ORGANİZASYON KUTUSU */}
          <div 
            style={{ 
              borderRadius: "20px", 
              background: "linear-gradient(135deg, #16190F 0%, #0D0F0A 100%)", 
              color: "#FFFFFF", 
              padding: "28px", 
              marginBottom: "40px",
              border: "1.5px solid rgba(217, 164, 65, 0.35)",
              boxShadow: "0 14px 34px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", background: "rgba(217, 164, 65, 0.18)", marginBottom: "12px" }}>
              <PartyPopper size={14} color="#E5B555" />
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#E5B555", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                ÖZEL GÜNLER & KUTLAMALAR
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--f-head, serif)", fontSize: "22px", fontWeight: 600, color: "#FFFFFF", margin: "0 0 10px 0" }}>
              {cleanRawText(eventsTitle)}
            </h3>

            <p style={{ margin: "0 0 18px 0", fontSize: "14px", color: "rgba(244, 238, 225, 0.85)", lineHeight: 1.65 }}>
              {cleanRawText(eventsLead)}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {eventsTags.map((tag: string, tidx: number) => {
                const TagIcon = getEventTagIcon(tag);
                return (
                  <div 
                    key={tidx} 
                    style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "6px", 
                      padding: "6px 14px", 
                      borderRadius: "20px", 
                      background: "rgba(217, 164, 65, 0.12)", 
                      border: "1px solid rgba(217, 164, 65, 0.3)", 
                      fontSize: "12px", 
                      fontWeight: 700, 
                      color: "#E5B555" 
                    }}
                  >
                    <TagIcon size={13} color="#E5B555" />
                    <span>{cleanRawText(tag)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 20px",
                  borderRadius: "12px",
                  background: "#25D366",
                  color: "#0B140C",
                  fontWeight: 800,
                  fontSize: "13px",
                  textDecoration: "none"
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp ile Organizasyon Teklifi Al</span>
              </a>

              <a
                href={`tel:${telCafeHref}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 18px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                <Phone size={14} color="#E5B555" />
                <span>{telCafe}</span>
              </a>
            </div>
          </div>

          {/* TESİS OLANAKLARI (6'LI KARTLAR) */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--card-text, #0D0F0A)", marginBottom: "16px" }}>
              Tesis İmkânlarımız
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
              {amenitiesList.map((label: string, idx: number) => {
                const AmenityIcon = amenityIcons[idx % amenityIcons.length] || ShieldCheck;
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: "14px 16px", 
                      borderRadius: "14px", 
                      background: "#FFFFFF", 
                      border: "1px solid rgba(184, 132, 44, 0.2)", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px" 
                    }}
                  >
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <AmenityIcon size={16} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--card-text, #0D0F0A)" }}>
                      {cleanRawText(label)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIKÇA SORULAN SORULAR */}
          <div style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 600, color: "var(--card-text, #0D0F0A)", marginBottom: "16px" }}>
              Sıkça Sorulan Sorular
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqsList.map((faq: any, idx: number) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: "18px 20px", 
                    borderRadius: "16px", 
                    background: "rgba(13,15,10,0.015)", 
                    border: "1px solid rgba(184, 132, 44, 0.2)" 
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <HelpCircle size={17} color="#B8842C" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <b style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--card-text, #0D0F0A)" }}>
                      {cleanRawText(faq.q || "")}
                    </b>
                  </div>
                  <p style={{ margin: "6px 0 0 25px", fontSize: "13.5px", color: "var(--card-muted, #5C584C)", lineHeight: 1.65 }}>
                    {cleanRawText(faq.a || "")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ALT REZERVASYON ÇAĞRISI */}
          <div 
            style={{ 
              borderRadius: "18px", 
              background: "rgba(217, 164, 65, 0.08)", 
              border: "1.5px solid rgba(217, 164, 65, 0.3)", 
              padding: "24px", 
              display: "flex", 
              flexWrap: "wrap", 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: "16px" 
            }}
          >
            <div>
              <b style={{ display: "block", fontSize: "16px", fontWeight: 700, color: "var(--card-text, #0D0F0A)" }}>
                Masanızı veya Locanızı Hemen Ayırtın
              </b>
              <span style={{ fontSize: "13px", color: "var(--card-muted, #6E6A5C)" }}>
                Hafta sonu zengin serpme kahvaltı ve açık havuz keyfi için yerinizi önceden ayırtın.
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="/#rezervasyon"
                style={{
                  padding: "11px 22px",
                  borderRadius: "12px",
                  background: "var(--brass, #D9A441)",
                  color: "#0D0F0A",
                  fontWeight: 800,
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(217,164,65,0.3)"
                }}
              >
                Online Rezervasyon
              </Link>
              <Link
                href="/menu"
                style={{
                  padding: "11px 18px",
                  borderRadius: "12px",
                  background: "var(--card-bg, #FFFFFF)",
                  color: "var(--card-text, #0D0F0A)",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "1px solid rgba(13,15,10,0.15)"
                }}
              >
                Menüyü Gör
              </Link>
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}
