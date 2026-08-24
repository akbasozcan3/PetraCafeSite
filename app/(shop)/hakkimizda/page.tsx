import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref, buildWhatsappUrl } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { displayHours } from "@/lib/content/hours";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  UtensilsCrossed, 
  Waves, 
  CalendarCheck, 
  Award, 
  Flame, 
  Coffee, 
  Star, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
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

const ABOUT_NAV = [
  { id: "hikaye", label: "Hikayemiz & Felsefemiz", icon: "file" },
  { id: "kahvalti", label: "Serpme Kahvaltı & Fırın", icon: "check" },
  { id: "mutfak", label: "Dünya Mutfağı & Izgaralar", icon: "shield" },
  { id: "havuz", label: "Pool & Beach Kulübü", icon: "globe" },
  { id: "iletisim", label: "İletişim & Rezervasyon", icon: "map" },
];

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
    badgeBaslik: "Petra",
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
    <div className="petra-legal-container">
      <style>{`
        .petra-legal-container {
          width: 100%;
          padding: 20px 0 60px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-sizing: border-box;
          color: var(--card-text, #0d0f0a);
        }
        .petra-legal-crumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          fontSize: 12px;
          color: var(--card-muted, #6e6a5c);
          margin-bottom: 20px;
        }
        .petra-legal-mobile-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 20px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .petra-legal-mobile-tabs::-webkit-scrollbar {
          display: none;
        }
        .petra-legal-mobile-tab-btn {
          white-space: nowrap;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .petra-legal-mobile-tab-btn.active {
          background: var(--brass, #d9a441) !important;
          color: #0d0f0a !important;
          border: 1.5px solid var(--brass, #d9a441) !important;
          box-shadow: 0 4px 14px rgba(217, 164, 65, 0.3);
        }
        .petra-legal-mobile-tab-btn.inactive {
          background: var(--card-bg, #ffffff) !important;
          color: var(--card-text, #4a4538) !important;
          border: 1px solid var(--card-border, rgba(13, 15, 10, 0.15)) !important;
        }
        .petra-legal-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .petra-legal-sidebar {
          width: 300px;
          flex-shrink: 0;
          background: var(--card-bg, #ffffff);
          border-radius: 20px;
          border: 1.5px solid var(--card-border, rgba(184, 132, 44, 0.25));
          padding: 24px;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.12);
          position: sticky;
          top: 100px;
          box-sizing: border-box;
          color: var(--card-text, #0d0f0a);
        }
        .petra-legal-content {
          flex: 1;
          min-width: 0;
          background: var(--card-bg, #ffffff);
          border-radius: 24px;
          border: 1.5px solid var(--card-border, rgba(184, 132, 44, 0.25));
          padding: 36px 40px;
          box-shadow: 0 12px 40px -10px rgba(0,0,0,0.12);
          box-sizing: border-box;
          color: var(--card-text, #0d0f0a);
        }
        @media (max-width: 899px) {
          .petra-legal-sidebar {
            display: none;
          }
          .petra-legal-mobile-tabs {
            display: flex;
          }
          .petra-legal-content {
            padding: 24px 20px;
            border-radius: 18px;
          }
        }
        @media (min-width: 900px) {
          .petra-legal-mobile-tabs {
            display: none;
          }
        }
      `}</style>

      {/* 1. Breadcrumbs Navigasyon */}
      <nav aria-label="Breadcrumb" className="petra-legal-crumbs">
        <Link href="/" style={{ color: "var(--card-text, #0d0f0a)", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span>/</span>
        <span style={{ color: "var(--brass, #b8842c)", fontWeight: 700 }}>Hakkımızda</span>
      </nav>

      {/* 2. Mobilde Yatay Kaydırılabilir Hızlı Sekmeler */}
      <div className="petra-legal-mobile-tabs">
        {ABOUT_NAV.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`petra-legal-mobile-tab-btn ${idx === 0 ? "active" : "inactive"}`}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      {/* 3. Ana Düzen (Sidebar + İçerik) */}
      <div className="petra-legal-layout">
        
        {/* Masaüstü Yan Menü */}
        <aside className="petra-legal-sidebar">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--brass, #b8842c)",
              }}
            >
              Petra Yaşam Alanı
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {ABOUT_NAV.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 16px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: idx === 0 ? 700 : 500,
                    background: idx === 0 ? "var(--brass, #d9a441)" : "transparent",
                    color: idx === 0 ? "#0d0f0a" : "var(--card-text, #2c2f26)",
                    border: idx === 0 ? "1px solid var(--brass, #b8842c)" : "1px solid transparent",
                    boxShadow: idx === 0 ? "0 4px 14px rgba(217, 164, 65, 0.25)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{item.label}</span>
                  {idx === 0 && <span style={{ color: "#0d0f0a", fontSize: "12px", fontWeight: 700 }}>➔</span>}
                </a>
              </li>
            ))}
          </ul>

          {/* İletişim & Rezervasyon Kutusu */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))",
              fontSize: "12px",
              color: "var(--card-muted, #6e6a5c)",
            }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "var(--card-text, #0d0f0a)" }}>Rezervasyon & Bilgi</p>
            <p style={{ margin: "0 0 12px", lineHeight: "1.4" }}>
              Masa rezervasyonu, havuz locaları ve özel davetler için ekibimizle görüşebilirsiniz.
            </p>
            <a
              href={`tel:${telCafeHref}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 14px",
                borderRadius: "10px",
                background: "rgba(184, 132, 44, 0.15)",
                border: "1px solid rgba(184, 132, 44, 0.35)",
                color: "var(--brass, #b8842c)",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "12px",
                width: "100%",
                boxSizing: "border-box",
                justifyContent: "center",
              }}
            >
              <Phone size={14} />
              <span>{telCafe}</span>
            </a>
          </div>
        </aside>

        {/* Ana İçerik Kartı */}
        <article className="petra-legal-content">
          
          {/* Üst Rozet ve Başlık */}
          <div style={{ borderBottom: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))", paddingBottom: "20px", marginBottom: "24px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(184, 132, 44, 0.15)",
                color: "var(--brass, #b8842c)",
                border: "1px solid rgba(184, 132, 44, 0.35)",
                marginBottom: "12px",
              }}
            >
              ✦ {cleanRawText(h.eyebrow || "HAKKIMIZDA & YAŞAM MERKEZİ")}
            </span>
            <h1
              style={{
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: 800,
                color: "var(--card-text, #0d0f0a)",
                margin: "0 0 12px 0",
                lineHeight: 1.25,
                fontFamily: "var(--font-serif, inherit)",
              }}
            >
              {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde Cafe & Restaurant")}
            </h1>
            {h.lead && (
              <p style={{ margin: 0, fontSize: "15px", color: "var(--card-muted, #5a554a)", lineHeight: 1.6, fontWeight: 500 }}>
                {formatInlineText(h.lead)}
              </p>
            )}
          </div>

          {/* Kısaca Kutusu */}
          {h.answerMetin && (
            <div
              style={{
                background: "rgba(184, 132, 44, 0.08)",
                border: "1px solid rgba(184, 132, 44, 0.25)",
                borderRadius: "14px",
                padding: "16px 20px",
                marginBottom: "28px",
              }}
            >
              <b style={{ color: "#9E6E1A", fontSize: "13px", fontWeight: 800, display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                ✦ {cleanRawText(h.answerBaslik || "Kısaca Petra")}
              </b>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--card-text, #2c2f26)", lineHeight: 1.65, fontWeight: 500 }}>
                {formatInlineText(h.answerMetin)}
              </p>
            </div>
          )}

          {/* Mekan Fotoğrafı & Google Yorum Rozeti */}
          <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", marginBottom: "32px", border: "1px solid rgba(13, 15, 10, 0.08)" }}>
            <SafeImg
              src={img}
              alt="Petra Yaşam Merkezi Cafe Restaurant"
              fallback={SITE_PHOTOS.interior}
              width={1200}
              height={600}
              className="w-full h-[280px] sm:h-[340px] object-cover block"
            />
            <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", padding: "12px 16px", borderRadius: "12px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", border: "1px solid rgba(217, 164, 65, 0.4)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <b style={{ fontSize: "14px", fontWeight: 800, color: "#0D0F0A", display: "block" }}>{cleanRawText(h.badgeBaslik || "Petra")}</b>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#B8842C" }}>{cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}</span>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 800, color: "#065F46", background: "#D1FAE5", padding: "4px 8px", borderRadius: "6px" }}>
                <Star size={12} fill="#059669" color="#059669" />
                4.6 ★ (94+ Yorum)
              </span>
            </div>
          </div>

          {/* Makale Paragrafları & Bölümleri */}
          <div id="hikaye" style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
            {parsedBlocks.map((block, idx) => {
              if (block.type === "h1" || block.type === "h2") {
                return (
                  <h2
                    key={idx}
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "var(--card-text, #0d0f0a)",
                      margin: "16px 0 4px 0",
                      paddingBottom: "8px",
                      borderBottom: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))",
                      fontFamily: "var(--font-serif, inherit)",
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
                      color: "var(--brass, #b8842c)",
                      margin: "12px 0 2px 0",
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
                      borderLeft: "3px solid var(--brass, #d9a441)",
                      padding: "10px 16px",
                      margin: "8px 0",
                      fontStyle: "italic",
                      color: "var(--card-muted, #5a554a)",
                      background: "rgba(184, 132, 44, 0.06)",
                      borderRadius: "0 10px 10px 0",
                    }}
                  >
                    {formatInlineText(block.text || "")}
                  </blockquote>
                );
              }
              return (
                <p key={idx} style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.75, color: "var(--card-text, #2c2f26)" }}>
                  {formatInlineText(block.text || "")}
                </p>
              );
            })}
          </div>

          {/* 4 Deneyim Kartı */}
          <div style={{ borderTop: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))", paddingTop: "28px", marginBottom: "36px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--card-text, #0d0f0a)", marginBottom: "16px" }}>
              ✦ Petra Yaşam Merkezinde Sizi Neler Bekliyor?
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: "rgba(184, 132, 44, 0.04)",
                      border: "1px solid rgba(184, 132, 44, 0.18)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(184, 132, 44, 0.15)", color: "#9E6E1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={18} />
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#9E6E1A", background: "#FFFFFF", padding: "2px 8px", borderRadius: "6px", border: "1px solid rgba(184, 132, 44, 0.2)" }}>
                          {f.hours}
                        </span>
                      </div>
                      <b style={{ fontSize: "14px", fontWeight: 700, color: "var(--card-text, #0d0f0a)", display: "block", marginBottom: "4px" }}>{f.title}</b>
                      <p style={{ margin: 0, fontSize: "12.5px", color: "var(--card-muted, #5a554a)", lineHeight: 1.55 }}>{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* İletişim & Rezervasyon Aksiyonu */}
          <div
            id="iletisim"
            style={{
              padding: "20px 24px",
              borderRadius: "16px",
              background: "#0D0F0A",
              color: "#FFFFFF",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <b style={{ fontSize: "16px", fontWeight: 800, display: "block", marginBottom: "4px" }}>Masanızı veya Locanızı Ayırtın</b>
              <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                Çekmeköy Taşdelen'de lezzet ve havuz keyfi için online rezervasyon yapabilirsiniz.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                href="/#rezervasyon"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "var(--brass, #D9A441)",
                  color: "#0D0F0A",
                  fontWeight: 800,
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                Rezervasyon Yap
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>

        </article>
      </div>
    </div>
  );
}
