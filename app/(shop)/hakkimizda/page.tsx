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
  CalendarCheck, 
  Flame, 
  Coffee, 
  Clock,
  ShieldCheck,
  Award,
  Users,
  PartyPopper,
  Car,
  Wifi,
  Sun,
  CheckCircle2,
  Navigation,
  MessageCircle,
  HelpCircle,
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
    eyebrow: "HAKKIMIZDA & YAŞAM MERKEZİ",
    baslik: "Petra Yaşam Merkezi'nde Cafe & Restaurant",
    answerBaslik: "Kısaca Petra",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve açık havuz–plaj kulübü sunar.",
    lead: "Keyif, konfor ve kalite — sabahın ilk ışıklarındaki kahvaltıdan akşam yemeğine, havuz başı serinliğinden en özel kutlamalara.",
    body: [
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde gastronomi, dinlenme ve sosyal yaşamı kusursuz bir uyumla buluşturan ayrıcalıklı bir mekândır. Ferah iç salonları, havuz başı açık terası ve zengin menüsüyle Petra; yalnızca bir yeme-içme alanı değil, sevdiklerinizle paylaştığınız anları unutulmaz kılan seçkin bir yaşam merkezidir.",
      "Günün ilk saatlerinde fırından yeni çıkmış sıcak pişiler, yöresel peynirler ve sahanda sıcacık lezzetlerle hazırlanan zengin serpme kahvaltımız güne eşsiz bir başlangıç sunar. Öğle ve akşam saatlerinde ise usta şeflerimizin elinden çıkan marine dana antrikotlar, taş fırında pişen çıtır pizzalar, taze el yapımı makarnalar ve gurme burgerler menümüzün baş tacıdır.",
      "Yaz aylarında 09:00 – 18:00 saatleri arasında hizmet veren açık yüzme havuzumuz, çocuk havuzumuz, konforlu şezlonglarımız ve VIP localarımızla şehir hayatının stresinden uzak, tatil konseptinde bir serinlik vadediyoruz.",
      "Doğum günleri, evlilik teklifleri, mezuniyet kutlamaları ve kurumsal yemekler için profesyonel ekibimizle özel masa süslemeleri ve kişiye özel menü planlamaları sunuyoruz."
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
  const telTesisHref = phoneToTelHref(telTesis);
  const waHref = buildWhatsappUrl(
    content.iletisim?.whatsapp || telCafe, 
    "Merhaba, Petra Cafe Restaurant & Yaşam Merkezi hakkında bilgi ve rezervasyon için yazıyorum."
  );

  // İstatistikler (Admin dinamik + fallback)
  const statsList = (h.stats && h.stats.length > 0) ? h.stats : (h.ozet && h.ozet.length > 0 ? h.ozet : [
    { b: "08:00 – 02:00", span: "Cafe & Restoran Açık", sub: "Haftanın 7 günü kesintisiz lezzet ve keyif" },
    { b: "240+ Çeşit", span: "Zengin Dünya Menüsü", sub: "Kahvaltı, ızgara, taş fırın pizza ve İtalyan tatlılar" },
    { b: "09:00 – 18:00", span: "Açık Havuz & Beach Kulübü", sub: "Yetişkin & çocuk havuzu, şezlonglar ve VIP localar" },
    { b: "1000+ m²", span: "Sosyal Yaşam & Teras Alanı", sub: "Doğum günü, özel kutlama ve kurumsal davetler" }
  ]);

  // 4 Temel Deneyim Alanı (Admin dinamik + fallback)
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

  // Bir Günün Petra'daki Akışı (Admin dinamik + fallback)
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

  // Temel Değerler / Standartlar (Admin dinamik + fallback)
  const defaultValues = [
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
  ];
  const valuesList = (h.values && h.values.length > 0) ? h.values : defaultValues;
  const valueIcons = [ShieldCheck, Award, HeartHandshake, Users];

  // Tesis İmkânları (Admin dinamik + fallback)
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

  // Sıkça Sorulan Sorular (Admin dinamik + fallback)
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

  // Özel Günler / Organizasyonlar (Admin dinamik + fallback)
  const eventsTitle = h.eventsTitle || "Unutulmaz Anlar İçin Özel Organizasyon Masaları";
  const eventsLead = h.eventsLead || "Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde; havuz başı terasımız veya klimalı şık salonlarımızda profesyonel masa düzeni, özel menü planlaması ve pasta servisi sunuyoruz.";
  const eventsTags = (h.eventsTags && h.eventsTags.length > 0) ? h.eventsTags : [
    "🎂 Doğum Günü Kutlamaları",
    "💍 Evlilik Teklifi & Yıldönümü",
    "👔 Kurumsal Şirket Yemekleri"
  ];

  const parsedBlocks = parseArticleContent(h.body || []);

  return (
    <div className="shop-about" style={{ padding: "16px 0 60px", color: "#0D0F0A", maxWidth: "1280px", margin: "0 auto" }}>
      
      {/* 1. BREADCRUMBS VE ÜST NAVİGASYON */}
      <nav 
        aria-label="Breadcrumb" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          fontSize: "13px", 
          color: "#6E6A5C", 
          marginBottom: "28px" 
        }}
      >
        <Link 
          href="/" 
          style={{ 
            color: "#0D0F0A", 
            textDecoration: "none", 
            fontWeight: 600, 
            transition: "color 0.2s ease" 
          }}
        >
          Ana Sayfa
        </Link>
        <span style={{ color: "#D9A441" }}>/</span>
        <span style={{ color: "#B8842C", fontWeight: 700 }}>Hakkımızda</span>
      </nav>

      {/* 2. HERO ÜST VİTRİN VE HIZLI AKSİYON ALANI */}
      <div 
        style={{ 
          background: "linear-gradient(135deg, #141E2E 0%, #0A0F18 100%)",
          borderRadius: "28px",
          padding: "clamp(28px, 5vw, 48px)",
          color: "#FFFFFF",
          marginBottom: "48px",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(217, 164, 65, 0.3)",
          boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.35)"
        }}
      >
        {/* Arka Plan Işık Efekti */}
        <div 
          style={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 164, 65, 0.18) 0%, rgba(217, 164, 65, 0) 70%)",
            pointerEvents: "none"
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "840px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "30px", background: "rgba(217, 164, 65, 0.18)", border: "1px solid rgba(217, 164, 65, 0.4)", marginBottom: "16px" }}>
            <Sparkles size={14} color="#E5B555" />
            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E5B555" }}>
              {cleanRawText(h.eyebrow || "PETRA YAŞAM MERKEZİ & CAFE RESTAURANT")}
            </span>
          </div>

          <h1 
            style={{ 
              fontSize: "clamp(28px, 4.5vw, 46px)", 
              fontWeight: 900, 
              margin: "0 0 16px 0", 
              lineHeight: 1.18, 
              fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
              color: "#FFFFFF",
              letterSpacing: "-0.01em"
            }}
          >
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant")}
          </h1>

          <p 
            style={{ 
              fontSize: "clamp(15px, 2vw, 18px)", 
              color: "rgba(255, 255, 255, 0.88)", 
              lineHeight: 1.65, 
              margin: "0 0 28px 0", 
              fontWeight: 400,
              maxWidth: "760px"
            }}
          >
            {formatInlineText(h.lead || "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.")}
          </p>

          {/* Hızlı Butonlar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
            <Link
              href="/#rezervasyon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 26px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #E5B555 0%, #C49030 100%)",
                color: "#0D0F0A",
                fontWeight: 900,
                fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(229, 181, 85, 0.35)",
                transition: "transform 0.2s ease"
              }}
            >
              <CalendarCheck size={17} />
              <span>Online Masa & Loca Ayırtın</span>
            </Link>

            <Link
              href="/menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 22px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(8px)"
              }}
            >
              <UtensilsCrossed size={16} color="#E5B555" />
              <span>Tüm Menüyü İncele</span>
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 20px",
                borderRadius: "12px",
                background: "rgba(37, 211, 102, 0.18)",
                color: "#4ADE80",
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                border: "1px solid rgba(74, 222, 128, 0.35)",
              }}
            >
              <MessageCircle size={17} />
              <span>WhatsApp Bilgi & Destek</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. İSTATİSTİKLER & PRESTİJ GÖSTERGELERİ (DİNAMİK GRID) */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "16px", 
          marginBottom: "48px" 
        }}
      >
        {statsList.map((st: any, i: number) => (
          <div key={i} style={{ padding: "20px 24px", borderRadius: "18px", background: "#FFFFFF", border: "1.5px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 6px 18px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "1.65rem", fontWeight: 900, color: "#B8842C", fontFamily: "var(--font-serif, serif)" }}>
                {cleanRawText(st.b || "")}
              </span>
              <Clock size={20} color="#D9A441" />
            </div>
            <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0D0F0A" }}>
              {cleanRawText(st.span || "")}
            </span>
            {st.sub && (
              <span style={{ fontSize: "0.78rem", color: "#6E6A5C" }}>
                {cleanRawText(st.sub)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 4. 2 KOLONLU EDİTORYAL HİKAYE VE VİTRİN DÜZENİ */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", 
          gap: "44px", 
          alignItems: "start", 
          marginBottom: "56px" 
        }}
      >
        
        {/* Sol Kolon: Başlık, Kısaca & Hikaye Paragrafları */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          
          {/* Kısaca Kutusu (Öne Çıkan Bilgi) */}
          {h.answerMetin && (
            <div 
              style={{ 
                background: "linear-gradient(135deg, rgba(184, 132, 44, 0.08) 0%, rgba(217, 164, 65, 0.03) 100%)", 
                border: "1.5px solid rgba(184, 132, 44, 0.3)", 
                borderRadius: "18px", 
                padding: "20px 24px",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <Sparkles size={16} color="#B8842C" />
                <b style={{ color: "#9E6E1A", fontSize: "13px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {cleanRawText(h.answerBaslik || "Kısaca Petra")}
                </b>
              </div>
              <p style={{ margin: 0, fontSize: "15px", color: "#2C2F26", lineHeight: 1.7, fontWeight: 500 }}>
                {formatInlineText(h.answerMetin)}
              </p>
            </div>
          )}

          {/* Makale Paragrafları */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h2 
              style={{ 
                fontSize: "clamp(20px, 3vw, 26px)", 
                fontWeight: 900, 
                color: "#0D0F0A", 
                margin: "8px 0 0 0",
                fontFamily: "var(--font-serif, serif)",
                lineHeight: 1.3
              }}
            >
              Gastronomi, Konfor ve Keyif Dolu Bir Yaşam Alanı
            </h2>

            {parsedBlocks.map((block, idx) => {
              if (block.type === "h1" || block.type === "h2") {
                return (
                  <h3
                    key={idx}
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      color: "#0D0F0A",
                      margin: "14px 0 2px 0",
                      paddingBottom: "6px",
                      borderBottom: "1px solid rgba(13, 15, 10, 0.08)",
                      fontFamily: "var(--font-serif, serif)",
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
                      color: "#B8842C",
                      margin: "10px 0 2px 0",
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
                      borderLeft: "4px solid #D9A441",
                      padding: "12px 20px",
                      margin: "10px 0",
                      fontStyle: "italic",
                      color: "#4A4538",
                      background: "rgba(184, 132, 44, 0.06)",
                      borderRadius: "0 12px 12px 0",
                      fontSize: "15px",
                      lineHeight: 1.7
                    }}
                  >
                    {formatInlineText(block.text || "")}
                  </blockquote>
                );
              }
              return (
                <p 
                  key={idx} 
                  style={{ 
                    margin: 0, 
                    fontSize: "15.5px", 
                    lineHeight: 1.85, 
                    color: "#383C30" 
                  }}
                >
                  {formatInlineText(block.text || "")}
                </p>
              );
            })}
          </div>

          {/* Temel Değerler (Dinamik Liste) */}
          <div style={{ paddingTop: "12px", borderTop: "1px solid rgba(13, 15, 10, 0.08)" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 900, color: "#0D0F0A", marginBottom: "16px", fontFamily: "var(--font-serif, serif)" }}>
              Bizi Farklı Kılan Temel Değerlerimiz
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
              {valuesList.map((v: any, i: number) => {
                const Icon = valueIcons[i % valueIcons.length] || ShieldCheck;
                return (
                  <div 
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: "#FFFFFF",
                      border: "1px solid rgba(184, 132, 44, 0.18)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={16} />
                      </div>
                      <b style={{ fontSize: "14px", fontWeight: 800, color: "#0D0F0A" }}>{cleanRawText(v.title || "")}</b>
                    </div>
                    <p style={{ margin: 0, fontSize: "13px", color: "#6E6A5C", lineHeight: 1.6 }}>{cleanRawText(v.desc || "")}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sağ Kolon: Sticky Vitrin Kartı & Hızlı İletişim */}
        <div style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 20px)", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div className="tilt-card">
            <div className="tilt-card__inner" style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 18px 40px -12px rgba(0,0,0,0.25)" }}>
              <SafeImg
                src={img}
                alt="Petra Yaşam Merkezi Cafe Restaurant"
                fallback={SITE_PHOTOS.interior}
                width={1800}
                height={1350}
                loading="eager"
              />
              <div
                className="tilt-card__badge"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "1.5px solid rgba(217, 164, 65, 0.4)",
                  backdropFilter: "blur(14px)",
                  borderRadius: 16,
                  padding: "14px 20px",
                  boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#22C55E", letterSpacing: "0.08em" }}>
                    ŞU AN AÇIK (08:00 – 02:00)
                  </span>
                </div>
                <b style={{ color: "#0D0F0A", display: "block", fontSize: "1.18rem", fontWeight: 900, fontFamily: "var(--font-serif, serif)" }}>
                  {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
                </b>
                <span style={{ color: "#B8842C", display: "block", fontSize: "0.85rem", fontWeight: 800, marginTop: 2 }}>
                  {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool & Beach")}
                </span>
              </div>
            </div>
          </div>

          {/* İletişim & Lokasyon Kartı */}
          <div 
            style={{ 
              padding: "24px", 
              borderRadius: "22px", 
              background: "#FFFFFF", 
              border: "1.5px solid rgba(184, 132, 44, 0.22)", 
              boxShadow: "0 8px 24px rgba(0,0,0,0.04)", 
              display: "flex", 
              flexDirection: "column", 
              gap: "14px" 
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h4 style={{ fontSize: "0.88rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0D0F0A", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={18} color="#D9A441" />
                Konum & İletişim
              </h4>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#9E6E1A", background: "rgba(184,132,44,0.12)", padding: "3px 8px", borderRadius: "6px" }}>
                Taşdelen / Çekmeköy
              </span>
            </div>

            <p style={{ margin: 0, fontSize: "0.88rem", color: "#4A4538", lineHeight: 1.65, fontWeight: 500 }}>
              Megakent Sitesi, Turgut Özal Cad, Selen Sk. No:1/O, Petra Yaşam Merkezi, Taşdelen, Çekmeköy / İstanbul
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", paddingTop: "4px" }}>
              <a
                href={`tel:${telCafeHref}`}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "8px", 
                  padding: "11px", 
                  borderRadius: "12px", 
                  background: "#0D0F0A", 
                  color: "#FFFFFF", 
                  fontSize: "0.82rem", 
                  fontWeight: 800, 
                  textDecoration: "none" 
                }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Kafe: {telCafe}</span>
              </a>
              <a
                href={`tel:${telTesisHref}`}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "8px", 
                  padding: "11px", 
                  borderRadius: "12px", 
                  background: "#141E2E", 
                  color: "#FFFFFF", 
                  fontSize: "0.82rem", 
                  fontWeight: 800, 
                  textDecoration: "none" 
                }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Tesis: {telTesis}</span>
              </a>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "8px", 
                padding: "12px", 
                borderRadius: "12px", 
                background: "#25D366", 
                color: "#FFFFFF", 
                fontSize: "0.88rem", 
                fontWeight: 800, 
                textDecoration: "none", 
                boxSizing: "border-box",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.25)"
              }}
            >
              <MessageCircle size={17} />
              <span>WhatsApp'tan Doğrudan Yazın</span>
            </a>

            <a
              href="https://maps.google.com/?q=Petra+Yaşam+Merkezi+Taşdelen+Çekmeköy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px",
                borderRadius: "10px",
                background: "rgba(13, 15, 10, 0.05)",
                color: "#0D0F0A",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(13, 15, 10, 0.1)"
              }}
            >
              <Navigation size={14} color="#B8842C" />
              <span>Google Maps ile Yol Tarifi Al</span>
            </a>
          </div>

        </div>

      </div>

      {/* 5. DÖRT TEMEL YAŞAM DENEYİMİ SÜTUNU (DİNAMİK) */}
      <section style={{ margin: "64px 0" }}>
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px auto" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#B8842C", display: "inline-block", marginBottom: "8px", background: "rgba(184, 132, 44, 0.12)", padding: "4px 14px", borderRadius: "20px" }}>
            ✦ AYRICALIKLI YAŞAM KONSEPTİ
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 2.7rem)", fontWeight: 900, color: "#0D0F0A", fontFamily: "var(--font-serif, serif)", margin: "0 0 10px 0", lineHeight: 1.2 }}>
            Petra'da Sizi Neler Bekliyor?
          </h2>
          <p style={{ margin: 0, fontSize: "1rem", color: "#6E6A5C", lineHeight: 1.6 }}>
            Günün her anına özel gurme tatlar, açık havada serinlik ve huzurlu sosyal buluşma alanları.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {experiencesList.map((item: any, i: number) => {
            const Icon = expIcons[i % expIcons.length] || UtensilsCrossed;
            const feats: string[] = Array.isArray(item.features) ? item.features : [];
            return (
              <div
                key={i}
                style={{ 
                  padding: "28px 24px", 
                  borderRadius: "22px", 
                  background: "#FFFFFF", 
                  border: "1.5px solid rgba(184, 132, 44, 0.22)", 
                  boxShadow: "0 8px 24px rgba(0,0,0,0.03)", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(217, 164, 65, 0.2) 0%, rgba(217, 164, 65, 0.08) 100%)", color: "#9E6E1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={24} />
                    </div>
                    {item.hours && (
                      <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#9E6E1A", background: "#F7F2E7", padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(184, 132, 44, 0.25)" }}>
                        {item.hours}
                      </span>
                    )}
                  </div>

                  {item.tag && (
                    <span style={{ fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#B8842C", display: "block", marginBottom: "4px" }}>
                      {item.tag}
                    </span>
                  )}
                  
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0D0F0A", margin: "0 0 10px 0", fontFamily: "var(--font-serif, serif)" }}>
                    {cleanRawText(item.title || "")}
                  </h3>
                  
                  <p style={{ margin: "0 0 18px 0", fontSize: "0.92rem", color: "#4A4538", lineHeight: 1.7 }}>
                    {cleanRawText(item.desc || "")}
                  </p>
                </div>

                {feats.length > 0 && (
                  <div style={{ paddingTop: "14px", borderTop: "1px solid rgba(13, 15, 10, 0.06)", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {feats.map((feat, fidx) => (
                      <div key={fidx} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#2C2F26", fontWeight: 600 }}>
                        <CheckCircle2 size={14} color="#B8842C" />
                        <span>{cleanRawText(feat)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BİR GÜNÜN PETRA'DAKİ AKIŞI (DİNAMİK TIMELINE) */}
      <section 
        style={{ 
          margin: "64px 0", 
          padding: "clamp(32px, 5vw, 48px)", 
          borderRadius: "28px", 
          background: "linear-gradient(180deg, #F9F5EC 0%, #FFFFFF 100%)",
          border: "1.5px solid rgba(184, 132, 44, 0.25)"
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 36px auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#B8842C", display: "block", marginBottom: "6px" }}>
            24 SAAT YAŞAM DOLU
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "#0D0F0A", fontFamily: "var(--font-serif, serif)", margin: "0 0 8px 0" }}>
            Bir Günün Petra'daki Akışı
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#6E6A5C" }}>
            Sabahın taze enerjisinden gecenin keyifli sohbetlerine uzanan gün boyu deneyim.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", position: "relative" }}>
          {timelineList.map((step: any, idx: number) => {
            const StepIcon = timelineIcons[idx % timelineIcons.length] || Sun;
            return (
              <div 
                key={idx}
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(184, 132, 44, 0.2)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 900, color: "#FFFFFF", background: "#0D0F0A", padding: "4px 10px", borderRadius: "8px" }}>
                    {cleanRawText(step.time || "")}
                  </span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StepIcon size={18} />
                  </div>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0D0F0A", margin: 0, fontFamily: "var(--font-serif, serif)" }}>
                  {cleanRawText(step.title || "")}
                </h3>

                <p style={{ margin: 0, fontSize: "0.88rem", color: "#5C584C", lineHeight: 1.65 }}>
                  {cleanRawText(step.desc || "")}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. ÖZEL DAVETLER & ORGANİZASYON KUTUSU (DİNAMİK) */}
      <section style={{ margin: "56px 0" }}>
        <div 
          style={{ 
            borderRadius: "28px", 
            background: "linear-gradient(135deg, #161D2B 0%, #0F141E 100%)", 
            color: "#FFFFFF", 
            padding: "clamp(32px, 5vw, 52px)", 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "36px", 
            alignItems: "center",
            border: "1.5px solid rgba(217, 164, 65, 0.35)", 
            boxShadow: "0 24px 50px rgba(0,0,0,0.3)" 
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 800, color: "#E5B555", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              <PartyPopper size={16} color="#E5B555" />
              ÖZEL GÜNLER & KUTLAMALAR
            </span>
            <h3 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, fontFamily: "var(--font-serif, serif)", color: "#FFFFFF", margin: 0, lineHeight: 1.2 }}>
              {cleanRawText(eventsTitle)}
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
              {cleanRawText(eventsLead)}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", paddingTop: "6px" }}>
              {eventsTags.map((tag: string, tidx: number) => (
                <span key={tidx} style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", fontSize: "0.82rem", fontWeight: 700, color: "#E5B555" }}>
                  {cleanRawText(tag)}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "rgba(255,255,255,0.05)", padding: "28px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-serif, serif)" }}>
              Etkinlik Detayları & Rezervasyon
            </h4>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              Kişi sayısı ve etkinlik tarihinizi ileterek organizasyon ekibimizden hızlıca teklif alabilirsiniz.
            </p>
            
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px",
                borderRadius: "12px",
                background: "#25D366",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.3)"
              }}
            >
              <MessageCircle size={18} />
              <span>Organizasyon İçin WhatsApp'tan Yazın</span>
            </a>

            <a
              href={`tel:${telCafeHref}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.88rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              <Phone size={15} color="#E5B555" />
              <span>Telefonla Arayın: {telCafe}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. TESİS İMKANLARI GRID (DİNAMİK) */}
      <section style={{ margin: "56px 0" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 28px auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8842C", display: "block", marginBottom: "6px" }}>
            KONFOR VE OLANAKLAR
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)", fontWeight: 900, color: "#0D0F0A", fontFamily: "var(--font-serif, serif)", margin: 0 }}>
            Tesis İmkânlarımız
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          {amenitiesList.map((label: string, idx: number) => {
            const AmenityIcon = amenityIcons[idx % amenityIcons.length] || ShieldCheck;
            return (
              <div 
                key={idx}
                style={{
                  padding: "16px 20px",
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(184, 132, 44, 0.2)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(217, 164, 65, 0.15)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <AmenityIcon size={18} />
                </div>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0D0F0A" }}>
                  {cleanRawText(label)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. SIKÇA SORULAN SORULAR (DİNAMİK) */}
      <section style={{ margin: "56px 0" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 32px auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8842C", display: "block", marginBottom: "6px" }}>
            MERAK EDİLENLER
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.3rem)", fontWeight: 900, color: "#0D0F0A", fontFamily: "var(--font-serif, serif)", margin: "0 0 8px 0" }}>
            Sıkça Sorulan Sorular
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#6E6A5C" }}>
            Hakkımızda, rezervasyon ve tesis işleyişi hakkında en çok sorulanlar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {faqsList.map((faq: any, idx: number) => (
            <div
              key={idx}
              style={{
                padding: "22px 26px",
                borderRadius: "18px",
                background: "#FFFFFF",
                border: "1.5px solid rgba(184, 132, 44, 0.2)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <HelpCircle size={18} color="#B8842C" style={{ flexShrink: 0, marginTop: "2px" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0D0F0A", margin: 0 }}>
                  {cleanRawText(faq.q || "")}
                </h3>
              </div>
              <p style={{ margin: "4px 0 0 28px", fontSize: "0.88rem", color: "#5C584C", lineHeight: 1.65 }}>
                {cleanRawText(faq.a || "")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. REZERVASYON & ÇAĞRI CTA BANNER */}
      <section style={{ marginTop: "56px" }}>
        <div 
          style={{ 
            borderRadius: "28px", 
            background: "linear-gradient(135deg, #0A0F18 0%, #141E2E 100%)", 
            color: "#FFFFFF", 
            padding: "clamp(32px, 5vw, 48px)", 
            display: "flex", 
            flexWrap: "wrap", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: "28px", 
            border: "1px solid rgba(217, 164, 65, 0.3)", 
            boxShadow: "0 24px 50px rgba(0,0,0,0.3)" 
          }}
        >
          <div style={{ maxWidth: "580px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 800, color: "#E5B555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              <CalendarCheck size={16} color="#E5B555" />
              REZERVASYON & İLETİŞİM
            </span>
            <h3 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 900, fontFamily: "var(--font-serif, serif)", color: "#FFFFFF", margin: 0, lineHeight: 1.25 }}>
              Masanızı veya Locanızı Hemen Ayırtın
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>
              Hafta sonu zengin serpme kahvaltı, şefin spesiyalleriyle akşam yemeği veya açık havuzda VIP localarımız için yerinizi kolayca ayırtın.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
            <Link
              href="/#rezervasyon"
              style={{ 
                padding: "15px 30px", 
                borderRadius: "14px", 
                background: "linear-gradient(135deg, #E5B555 0%, #C49030 100%)", 
                color: "#0D0F0A", 
                fontWeight: 900, 
                fontSize: "0.95rem", 
                textDecoration: "none", 
                boxShadow: "0 8px 24px rgba(229,181,85,0.4)" 
              }}
            >
              Online Rezervasyon Yap
            </Link>
            <Link
              href="/menu"
              style={{ 
                padding: "15px 26px", 
                borderRadius: "14px", 
                background: "rgba(255,255,255,0.12)", 
                color: "#FFFFFF", 
                fontWeight: 800, 
                fontSize: "0.95rem", 
                textDecoration: "none", 
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)"
              }}
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
