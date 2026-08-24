import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { displayHours } from "@/lib/content/hours";
import SafeImg from "@/components/site/SafeImg";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  ChevronRight, 
  UtensilsCrossed, 
  Waves, 
  CalendarCheck, 
  Award,
  Flame,
  Coffee,
  Star,
  ArrowRight
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const h = content.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} | Petra Cafe Restaurant` : "Hakkımızda | Petra Cafe Restaurant";
  const description =
    h?.lead ||
    "Petra Cafe Restaurant & Petra Yaşam Merkezi — Çekmeköy Taşdelen'de serpme kahvaltı, dünya mutfağı, havuz & plaj ve organizasyon.";

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
    eyebrow: "HAKKIMIZDA & YAŞAM ALANIMIZ",
    baslik: "Petra Yaşam Merkezi'nde Cafe & Restaurant Deneyimi",
    answerBaslik: "Kısaca Petra",
    answerMetin: "Petra Cafe Restaurant; Çekmeköy Taşdelen'de Petra Yaşam Merkezi bünyesinde zengin dünya mutfağı, serpme kahvaltı, taş fırın lezzetleri, İtalyan tatlı ve kokteylleri, açık yüzme havuzu ve VIP localarıyla günün her saati kesintisiz hizmet veren ayrıcalıklı bir yaşam kompleksidir.",
    lead: "Keyif, lezzet ve konforun buluştuğu nokta — sabahtan geceye leziz sofralar, havuz kenarında serin anlar ve unutulmaz anılar.",
    body: [
      "Petra Cafe Restaurant; İstanbul Anadolu Yakası'nın yükselen değeri Çekmeköy Taşdelen'de, Megakent Sitesi içerisinde yer alan Petra Yaşam Merkezi'nde konuklarını ağırlamaktadır. Şehrin gürültüsünden uzak, ferah ve huzurlu bir ortamda; gastronomi ile sosyal yaşamı aynı çatı altında buluşturuyoruz.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız, sıcak pişilerimiz ve taze demlenmiş çay eşliğinde başlayan lezzet yolculuğumuz; öğle ve akşam saatlerinde usta şeflerimizin hazırladığı dana antrikot, taş fırın pizzalar, el yapımı burgerler ve taze makarnalarla devam eder.",
      "Yaz sezonunda 09:00 - 18:00 saatleri arasında hizmet veren açık yüzme havuzumuz, çocuk havuzumuz ve güneşlenme alanlarımızla Petra; aileniz ve sevdiklerinizle tatil konseptini şehre taşıyor. Havuz başında serinlerken özel kokteyllerimiz, İtalyan tatlılarımız ve zengin nargile seçeneklerimiz gününüze eşlik eder.",
      "Doğum günleri, evlilik teklifleri, kurumsal yemekler, mezuniyet ve özel kutlamalarınız için profesyonel ekibimizle özel masa düzenlemeleri ve menü planlamaları sunuyoruz."
    ],
    badgeBaslik: "Petra Yaşam Merkezi",
    badgeAlt: "Cafe · Restaurant · Pool & Beach"
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
  const waHref = buildWhatsappUrl(content.iletisim?.whatsapp || telCafe, "Merhaba, Petra Cafe & Restaurant hakkında bilgi ve rezervasyon için yazıyorum.");

  const features = [
    {
      icon: Coffee,
      title: "Zengin Serpme Kahvaltı",
      desc: "Taş fırından taze çıkan pişiler, köy peynirleri, sahanda sucuklu yumurta, taze reçeller ve sınırsız demlik çay eşliğinde güne harika bir başlangıç.",
      tag: "08:00 – 14:00"
    },
    {
      icon: UtensilsCrossed,
      title: "Seçkin Dünya Mutfağı & Izgaralar",
      desc: "Usta şeflerimizden marine dana antrikot, el yapımı gurme burgerler, odun ateşinde İtalyan pizzalar, kremsi makarnalar ve taze salatalar.",
      tag: "Öğle & Akşam"
    },
    {
      icon: Waves,
      title: "Pool & Beach Kulübü",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran güvencesiyle tatil keyfi.",
      tag: "Yaz Sezonu"
    },
    {
      icon: Flame,
      title: "İtalyan Tatlıları & Nargile",
      desc: "Hakiki İtalyan mascarpone ile hazırlanan tiramisu, cannoli, imza kokteyller ve birinci sınıf premium tütünlerle zengin nargile menüsü.",
      tag: "Tüm Gün"
    },
  ];

  const parsedBlocks = parseArticleContent(h.body || []);

  return (
    <div className="shop-about" style={{ padding: "2rem 0 5rem 0" }}>
      
      {/* 1. Breadcrumbs Navigasyon (Kullanım Koşulları Sayfasıyla Birebir) */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "var(--card-muted, #6e6a5c)",
          marginBottom: "24px",
        }}
      >
        <Link href="/" style={{ color: "var(--card-text, #0d0f0a)", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span style={{ color: "var(--card-muted, #6e6a5c)" }}>/</span>
        <span style={{ color: "var(--brass, #b8842c)", fontWeight: 700 }}>Hakkımızda</span>
      </nav>

      <header className="ys-hero" style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "9999px", background: "rgba(217, 164, 65, 0.15)", border: "1px solid rgba(217, 164, 65, 0.35)", marginBottom: "1rem" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brass, #b8842c)" }}>
            {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM MERKEZİ")}
          </span>
        </div>
        <h1 className="h2" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, lineHeight: 1.18, color: "var(--ink, #0D0F0A)", margin: "0 0 1rem 0", fontFamily: "var(--font-serif, serif)" }}>
          {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant Deneyimi")}
        </h1>
        {h.lead && (
          <p className="lead" style={{ fontSize: "1.12rem", fontWeight: 500, color: "var(--brass-lo, #524D41)", lineHeight: 1.65, margin: 0 }}>
            {formatInlineText(h.lead)}
          </p>
        )}
      </header>

      {/* 2. ANA HİKAYE VE VİTRİN KARTI (2 KOLONLU HİZALAMA) */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "start", marginBottom: "4rem" }}>
        
        {/* Sol Kolon: Biçimlendirilmiş Hikaye Metni */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          {h.answerMetin && (
            <div className="answer" style={{ borderRadius: "16px", border: "1px solid rgba(217, 164, 65, 0.35)", background: "rgba(217, 164, 65, 0.12)", padding: "1.25rem 1.5rem" }}>
              <b style={{ fontSize: "0.85rem", fontWeight: 800, color: "#9E6E1A", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>
                ✦ {cleanRawText(h.answerBaslik || "Kısaca Petra")}
              </b>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--ink, #3E3A32)", lineHeight: 1.65, fontWeight: 500 }}>
                {formatInlineText(h.answerMetin)}
              </p>
            </div>
          )}

          {/* Hikaye Paragrafları */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {parsedBlocks.map((block, idx) => {
              if (block.type === "h1") {
                return (
                  <h2
                    key={idx}
                    style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--ink, #0D0F0A)", fontFamily: "var(--font-serif, serif)", margin: "1.5rem 0 0.5rem 0", borderBottom: "1px solid rgba(13,15,10,0.1)", paddingBottom: "6px" }}
                  >
                    {cleanRawText(block.text || "")}
                  </h2>
                );
              }
              if (block.type === "h2") {
                return (
                  <h3
                    key={idx}
                    style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--ink, #0D0F0A)", fontFamily: "var(--font-serif, serif)", margin: "1.25rem 0 0.4rem 0" }}
                  >
                    {cleanRawText(block.text || "")}
                  </h3>
                );
              }
              if (block.type === "h3") {
                return (
                  <h4
                    key={idx}
                    style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--brass, #B8842C)", margin: "1rem 0 0.3rem 0" }}
                  >
                    {cleanRawText(block.text || "")}
                  </h4>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    style={{ borderLeft: "4px solid var(--brass, #D9A441)", padding: "10px 16px", margin: "12px 0", fontStyle: "italic", color: "var(--brass-lo, #5A554A)", background: "rgba(217, 164, 65, 0.08)", borderRadius: "0 12px 12px 0" }}
                  >
                    {formatInlineText(block.text || "")}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="body" style={{ margin: 0, fontSize: "1rem", lineHeight: 1.8, color: "var(--ink, #38342C)" }}>
                  {formatInlineText(block.text || "")}
                </p>
              );
            })}
          </div>

          {/* İstatistik Rozetleri */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", paddingTop: "1.5rem", borderTop: "1px solid rgba(13,15,10,0.1)" }}>
            <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card-bg, #FFFFFF)", border: "1px solid rgba(13,15,10,0.08)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--brass, #B8842C)", display: "block" }}>08:00 – 02:00</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brass-lo, #6E6A5C)", marginTop: "4px", display: "block" }}>Cafe & Restoran Açık</span>
            </div>
            <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card-bg, #FFFFFF)", border: "1px solid rgba(13,15,10,0.08)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--brass, #B8842C)", display: "block" }}>09:00 – 18:00</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brass-lo, #6E6A5C)", marginTop: "4px", display: "block" }}>Havuz & Beach Kulübü</span>
            </div>
            <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card-bg, #FFFFFF)", border: "1px solid rgba(13,15,10,0.08)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "var(--brass, #B8842C)", display: "block" }}>240+ Çeşit</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--brass-lo, #6E6A5C)", marginTop: "4px", display: "block" }}>Zengin Dünya Menüsü</span>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Sticky Tilt-Card & Hızlı İletişim Kartı */}
        <div style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 24px)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="tilt-card">
            <div className="tilt-card__inner">
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
                  background: "var(--card-bg, #ffffff)",
                  border: "1.5px solid var(--card-border, rgba(217, 164, 65, 0.4))",
                  backdropFilter: "blur(14px)",
                  borderRadius: 14,
                  padding: "12px 18px",
                  boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <b style={{ color: "var(--card-text, #0d0f0a)", display: "block", fontSize: "1.12rem", fontWeight: 800 }}>
                      {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
                    </b>
                    <span style={{ color: "var(--brass-lo, #b8842c)", display: "block", fontSize: "0.82rem", fontWeight: 800, marginTop: 2 }}>
                      {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", fontWeight: 800, color: "#065F46", background: "#D1FAE5", padding: "4px 8px", borderRadius: "8px" }}>
                      <Star size={12} fill="#059669" color="#059669" />
                      4.6 ★
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim & Hat Bilgileri */}
          <div style={{ padding: "20px", borderRadius: "20px", background: "var(--card-bg, #FFFFFF)", border: "1px solid rgba(13,15,10,0.1)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink, #0D0F0A)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={16} color="var(--brass, #D9A441)" />
              Adres ve İletişim Hatları
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--brass-lo, #5A554A)", lineHeight: 1.6, fontWeight: 500 }}>
              Megakent Sitesi, Turgut Özal Cad, Selen Sk. No:1/O, Petra Yaşam Merkezi, Taşdelen, Çekmeköy / İstanbul
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", paddingTop: "4px" }}>
              <a
                href={`tel:${telCafeHref}`}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px", borderRadius: "12px", background: "#0D0F0A", color: "#FFFFFF", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Kafe: {telCafe}</span>
              </a>
              <a
                href={`tel:${telTesisHref}`}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px", borderRadius: "12px", background: "#141E2E", color: "#FFFFFF", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Tesis: {telTesis}</span>
              </a>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "11px", borderRadius: "12px", background: "#25D366", color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 12px rgba(37,211,102,0.25)", boxSizing: "border-box" }}
            >
              WhatsApp'tan Doğrudan Yazın
            </a>
          </div>
        </div>

      </div>

      {/* 3. DÖRT ANA DENEYİM SÜTUNU */}
      <section style={{ margin: "4rem 0" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 2.5rem auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--brass, #B8842C)", display: "block", marginBottom: "6px" }}>
            AYRICALIKLI YAŞAM
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "var(--ink, #0D0F0A)", fontFamily: "var(--font-serif, serif)", margin: "0 0 8px 0" }}>
            Petra'da Sizi Neler Bekliyor?
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--brass-lo, #6E6A5C)" }}>
            Günün her anına özel lezzetler ve huzurlu sosyal alanlar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{ padding: "1.75rem", borderRadius: "24px", background: "var(--card-bg, #FFFFFF)", border: "1px solid rgba(13,15,10,0.08)", boxShadow: "0 6px 20px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(217, 164, 65, 0.15)", color: "var(--brass, #9E6E1A)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brass, #9E6E1A)", background: "rgba(217, 164, 65, 0.1)", padding: "4px 10px", borderRadius: "9999px", border: "1px solid rgba(217, 164, 65, 0.25)" }}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--ink, #0D0F0A)", margin: "0 0 8px 0", fontFamily: "var(--font-serif, serif)" }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--brass-lo, #5A554A)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. REZERVASYON & ÖZEL GÜNLER CTA */}
      <section>
        <div style={{ borderRadius: "28px", background: "#141E2E", color: "#FFFFFF", padding: "clamp(2rem, 5vw, 3.5rem)", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 800, color: "#D9A441", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <CalendarCheck size={16} />
              REZERVASYON & ÖZEL DAVETLER
            </span>
            <h3 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, fontFamily: "var(--font-serif, serif)", color: "#FFFFFF", margin: 0 }}>
              Masanızı veya Locanızı Hemen Ayırtın
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
              Hafta sonu serpme kahvaltı, akşam yemeği veya havuz başı VIP localarımız için yerinizi ayırtın. Doğum günü ve özel kutlamalarınız için bizi arayabilirsiniz.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
            <Link
              href="/#rezervasyon"
              className="btn btn--brass"
              style={{ padding: "14px 28px", borderRadius: "14px", background: "var(--brass, #D9A441)", color: "#0D0F0A", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 24px rgba(217, 164, 65, 0.4)" }}
            >
              Online Rezervasyon Yap
            </Link>
            <Link
              href="/menu"
              style={{ padding: "14px 24px", borderRadius: "14px", background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
