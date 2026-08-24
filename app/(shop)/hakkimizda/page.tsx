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
  UtensilsCrossed, 
  Waves, 
  CalendarCheck, 
  Flame, 
  Coffee, 
  ArrowRight
} from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const h = content?.hakkimizda;
  const title = h?.baslik ? `${cleanRawText(h.baslik)} — Petra Cafe Restaurant` : "Hakkımızda — Petra Cafe Restaurant";
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
    eyebrow: "HAKKIMIZDA & YAŞAM MERKEZİ",
    baslik: "Petra Yaşam Merkezi'nde Cafe & Restaurant",
    answerBaslik: "Kısaca",
    answerMetin: "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar.",
    lead: "Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona.",
    body: [
      "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Günün her saatine eşlik eden zengin menüsü, ferah atmosferi ve havuz başı deneyimiyle Petra; yalnızca yemek yemek için değil, sevdiklerinizle unutulmaz anlar biriktirmek için tasarlandı.",
      "Günün ilk ışıklarında zengin serpme kahvaltımız ve çıtır lezzetlerimizle güne harika bir başlangıç yapabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.",
      "Yaz sezonunda 09:00 – 18:00 saatleri arasında hizmet veren açık yüzme havuzumuz, çocuk havuzumuz ve güneşlenme alanlarımızla Petra; aileniz ve sevdiklerinizle tatil konseptini şehre taşıyor.",
      "Doğum günleri, evlilik teklifleri, kurumsal yemekler, mezuniyet ve özel kutlamalarınız için profesyonel ekibimizle özel masa düzenlemeleri ve menü planlamaları sunuyoruz."
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
  const waHref = buildWhatsappUrl(content.iletisim?.whatsapp || telCafe, "Merhaba, Petra Cafe & Restaurant hakkında bilgi ve rezervasyon için yazıyorum.");

  const features = [
    {
      icon: Coffee,
      title: "Zengin Serpme Kahvaltı",
      desc: "Taş fırından taze çıkan çıtır pişiler, köy peynirleri, sahanda sucuklu yumurta ve sınırsız demlik çay eşliğinde eşsiz sabahlar.",
      hours: "08:00 – 14:00"
    },
    {
      icon: UtensilsCrossed,
      title: "Dünya Mutfağı & Izgaralar",
      desc: "Usta şeflerimizden marine dana antrikot, el yapımı gurme burgerler, odun ateşinde pizzalar ve taze İtalyan makarnalar.",
      hours: "Öğle & Akşam"
    },
    {
      icon: Waves,
      title: "Pool & Beach Kulübü",
      desc: "09:00 – 18:00 saatleri arasında tertemiz yetişkin ve çocuk havuzu, konforlu şezlonglar, VIP localar ve cankurtaran desteği.",
      hours: "09:00 – 18:00"
    },
    {
      icon: Flame,
      title: "İtalyan Tatlıları & Nargile",
      desc: "Hakiki İtalyan mascarpone ile hazırlanan tiramisu, cannoli, ferahlatıcı imza kokteyller ve birinci sınıf premium tütünler.",
      hours: "Tüm Gün"
    },
  ];

  const parsedBlocks = parseArticleContent(h.body || []);

  return (
    <div className="shop-about" style={{ padding: "24px 0 60px", color: "#0D0F0A" }}>
      
      {/* 1. BREADCRUMBS NAVİGASYON */}
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#6E6A5C", marginBottom: "24px" }}>
        <Link href="/" style={{ color: "#0D0F0A", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span style={{ color: "#6E6A5C" }}>/</span>
        <span style={{ color: "#B8842C", fontWeight: 700 }}>Hakkımızda</span>
      </nav>

      {/* 2. 2 KOLONLU LÜKS HİKAYE VE VİTRİN DÜZENİ */}
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "start", marginBottom: "48px" }}>
        
        {/* Sol Kolon: Başlık, Kısaca & Hikaye Paragrafları */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(184, 132, 44, 0.15)", color: "#9E6E1A", border: "1px solid rgba(184, 132, 44, 0.35)", marginBottom: "12px" }}>
              ✦ {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM MERKEZİ")}
            </span>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#0D0F0A", margin: "0 0 12px 0", lineHeight: 1.2, fontFamily: "var(--font-serif, serif)" }}>
              {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant")}
            </h1>
            {h.lead && (
              <p style={{ margin: 0, fontSize: "16px", color: "#4A453A", lineHeight: 1.6, fontWeight: 500 }}>
                {formatInlineText(h.lead)}
              </p>
            )}
          </div>

          {/* Kısaca Kutusu */}
          {h.answerMetin && (
            <div style={{ background: "rgba(184, 132, 44, 0.08)", border: "1px solid rgba(184, 132, 44, 0.25)", borderRadius: "14px", padding: "16px 20px" }}>
              <b style={{ color: "#9E6E1A", fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                ✦ {cleanRawText(h.answerBaslik || "Kısaca Petra")}
              </b>
              <p style={{ margin: 0, fontSize: "14px", color: "#2C2F26", lineHeight: 1.65, fontWeight: 500 }}>
                {formatInlineText(h.answerMetin)}
              </p>
            </div>
          )}

          {/* Makale Paragrafları */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {parsedBlocks.map((block, idx) => {
              if (block.type === "h1" || block.type === "h2") {
                return (
                  <h2
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
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={idx}
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#B8842C",
                      margin: "10px 0 2px 0",
                    }}
                  >
                    {cleanRawText(block.text || "")}
                  </h3>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    style={{
                      borderLeft: "3px solid #D9A441",
                      padding: "10px 16px",
                      margin: "8px 0",
                      fontStyle: "italic",
                      color: "#4A4538",
                      background: "rgba(184, 132, 44, 0.06)",
                      borderRadius: "0 10px 10px 0",
                    }}
                  >
                    {formatInlineText(block.text || "")}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="body" style={{ margin: 0, fontSize: "15px", lineHeight: 1.8, color: "#2C2F26" }}>
                  {formatInlineText(block.text || "")}
                </p>
              );
            })}
          </div>

          {/* İstatistik Rozetleri */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", paddingTop: "20px", borderTop: "1px solid rgba(13, 15, 10, 0.08)" }}>
            <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#B8842C", display: "block" }}>08:00 – 02:00</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6E6A5C", marginTop: "2px", display: "block" }}>Cafe & Restoran Açık</span>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#B8842C", display: "block" }}>09:00 – 18:00</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6E6A5C", marginTop: "2px", display: "block" }}>Havuz & Beach Kulübü</span>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#B8842C", display: "block" }}>240+ Çeşit</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6E6A5C", marginTop: "2px", display: "block" }}>Zengin Dünya Menüsü</span>
            </div>
          </div>

        </div>

        {/* Sağ Kolon: Sticky Tilt-Card & Hızlı İletişim Kartı */}
        <div style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 20px)", display: "flex", flexDirection: "column", gap: "20px" }}>
          
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
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(217, 164, 65, 0.4)",
                  backdropFilter: "blur(14px)",
                  borderRadius: 14,
                  padding: "12px 18px",
                  boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <b style={{ color: "#0D0F0A", display: "block", fontSize: "1.12rem", fontWeight: 800 }}>
                  {cleanRawText(h.badgeBaslik || "Petra Yaşam Merkezi")}
                </b>
                <span style={{ color: "#B8842C", display: "block", fontSize: "0.82rem", fontWeight: 800, marginTop: 2 }}>
                  {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}
                </span>
              </div>
            </div>
          </div>

          {/* İletişim & Hat Bilgileri */}
          <div style={{ padding: "20px", borderRadius: "18px", background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.2)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "0.82rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0D0F0A", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={16} color="#D9A441" />
              Adres ve İletişim Hatları
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#4A4538", lineHeight: 1.6, fontWeight: 500 }}>
              Megakent Sitesi, Turgut Özal Cad, Selen Sk. No:1/O, Petra Yaşam Merkezi, Taşdelen, Çekmeköy / İstanbul
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", paddingTop: "4px" }}>
              <a
                href={`tel:${telCafeHref}`}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px", borderRadius: "10px", background: "#0D0F0A", color: "#FFFFFF", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Kafe: {telCafe}</span>
              </a>
              <a
                href={`tel:${telTesisHref}`}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px", borderRadius: "10px", background: "#141E2E", color: "#FFFFFF", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}
              >
                <Phone size={14} color="#D9A441" />
                <span>Tesis: {telTesis}</span>
              </a>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "11px", borderRadius: "10px", background: "#25D366", color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 800, textDecoration: "none", boxSizing: "border-box" }}
            >
              WhatsApp'tan Doğrudan Yazın
            </a>
          </div>

        </div>

      </div>

      {/* 3. DÖRT ANA DENEYİM SÜTUNU */}
      <section style={{ margin: "48px 0" }}>
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 28px auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8842C", display: "block", marginBottom: "6px" }}>
            AYRICALIKLI YAŞAM
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "#0D0F0A", fontFamily: "var(--font-serif, serif)", margin: "0 0 8px 0" }}>
            Petra'da Sizi Neler Bekliyor?
          </h2>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#6E6A5C" }}>
            Günün her anına özel lezzetler ve huzurlu sosyal alanlar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{ padding: "22px", borderRadius: "18px", background: "#FFFFFF", border: "1.5px solid rgba(184, 132, 44, 0.22)", boxShadow: "0 4px 14px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(217, 164, 65, 0.15)", color: "#9E6E1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#9E6E1A", background: "#F5EFE3", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(184, 132, 44, 0.25)" }}>
                      {item.hours}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.12rem", fontWeight: 800, color: "#0D0F0A", margin: "0 0 6px 0", fontFamily: "var(--font-serif, serif)" }}>{item.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#4A4538", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. REZERVASYON & ÖZEL GÜNLER CTA (YÜKSEK KONTRAST & ŞIK TASARIM) */}
      <section>
        <div style={{ borderRadius: "24px", background: "#141E2E", color: "#FFFFFF", padding: "clamp(28px, 5vw, 44px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ maxWidth: "560px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", fontWeight: 800, color: "#E5B555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              <CalendarCheck size={16} color="#E5B555" />
              REZERVASYON & ÖZEL DAVETLER
            </span>
            <h3 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)", fontWeight: 900, fontFamily: "var(--font-serif, serif)", color: "#FFFFFF", margin: 0, lineHeight: 1.25 }}>
              Masanızı veya Locanızı Hemen Ayırtın
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>
              Hafta sonu serpme kahvaltı, akşam yemeği veya havuz başı VIP localarımız için yerinizi ayırtın. Doğum günü ve özel kutlamalarınız için bizi arayabilirsiniz.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
            <Link
              href="/#rezervasyon"
              style={{ padding: "14px 28px", borderRadius: "12px", background: "linear-gradient(135deg, #E5B555 0%, #C49030 100%)", color: "#0D0F0A", fontWeight: 900, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 6px 20px rgba(229,181,85,0.4)" }}
            >
              Online Rezervasyon Yap
            </Link>
            <Link
              href="/menu"
              style={{ padding: "14px 24px", borderRadius: "12px", background: "rgba(255,255,255,0.12)", color: "#FFFFFF", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Menüyü İncele
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
