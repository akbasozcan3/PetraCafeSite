"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Waves, Dumbbell, Calendar, Home, ArrowRight, AlertTriangle, Phone } from "lucide-react";
import SiteIcon, { WhatsAppIcon } from "@/components/site/SiteIcon";

const brass = "#D9A441";
const redBadge = "#EF4444";

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: { top: 20, left: 20, borderTop: `1.5px solid ${brass}`, borderLeft: `1.5px solid ${brass}` },
    tr: { top: 20, right: 20, borderTop: `1.5px solid ${brass}`, borderRight: `1.5px solid ${brass}` },
    bl: { bottom: 20, left: 20, borderBottom: `1.5px solid ${brass}`, borderLeft: `1.5px solid ${brass}` },
    br: { bottom: 20, right: 20, borderBottom: `1.5px solid ${brass}`, borderRight: `1.5px solid ${brass}` },
  } as const;
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 32,
        height: 32,
        opacity: 0.6,
        pointerEvents: "none",
        ...map[pos],
      }}
    />
  );
}

export default function SiteFault({
  kicker = "404 · HATALI ADRES",
  title = "Aradığınız Sayfa Bulunamadı",
  lead = "Ulaşmaya çalıştığınız web adresi hatalı yazılmış, sayfa taşınmış veya geçici olarak yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantılardan dilediğiniz bölüme geçebilirsiniz.",
  primary = { label: "Ana Sayfaya Dön", href: "/" },
  secondary = { label: "Menüyü İncele", href: "/menu" },
  logoUrl,
  waLabel = "WhatsApp Destek",
  showQuickLinks = true,
}: {
  kicker?: string;
  title?: string;
  lead?: string;
  primary?: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string };
  logoUrl?: string;
  waLabel?: string;
  showQuickLinks?: boolean;
}) {
  const pathname = usePathname();
  const finalLogo = logoUrl || "/assets/cms/logo.png";
  const isCustomLogo = Boolean(logoUrl && !logoUrl.includes("petra-mark"));

  const quickLinks = [
    {
      title: "Petra Menü & Lezzetler",
      desc: "Kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller",
      href: "/menu",
      icon: <Utensils size={18} className="text-[#D9A441]" />,
    },
    {
      title: "Havuz & Plaj Kulübü",
      desc: "2026 Sezonu giriş tarifesi, şezlong ve yüzme dersi",
      href: "/havuz-plaj",
      icon: <Waves size={18} className="text-[#38BDF8]" />,
    },
    {
      title: "Petra Spor Salonu",
      desc: "Kardiyo, serbest ağırlık ve fitness üyeliği",
      href: "/spor-salonu",
      icon: <Dumbbell size={18} className="text-[#E8B84B]" />,
    },
    {
      title: "Masa & Loca Rezervasyonu",
      desc: "Online masa ayırtma ve özel organizasyonlar",
      href: "/#rezervasyon",
      icon: <Calendar size={18} className="text-[#A4BD63]" />,
    },
  ];

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(36px, 6vw, 64px) 20px",
        background: "linear-gradient(180deg, #0E130D 0%, #080D07 100%)",
        color: "#F4EEE1",
        textAlign: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <style>{`
        .fault-card-link {
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .fault-card-link:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(217, 164, 65, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);
        }
        .fault-btn-primary {
          background: #D9A441;
          color: #0D0F0A;
          font-weight: 700;
          padding: 13px 24px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 8px 24px -6px rgba(217, 164, 65, 0.4);
        }
        .fault-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(217, 164, 65, 0.5);
        }
        .fault-btn-ghost {
          background: rgba(255, 255, 255, 0.06);
          color: #F4EEE1;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-weight: 600;
          padding: 13px 22px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .fault-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(217, 164, 65, 0.4);
        }
        .fault-btn-wa {
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          padding: 13px 22px;
          border-radius: 12px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          box-shadow: 0 8px 24px -6px rgba(37, 211, 102, 0.35);
          transition: transform 0.2s ease;
        }
        .fault-btn-wa:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div style={{ maxWidth: 740, width: "100%", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* LOGO */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finalLogo}
          alt="Petra Logo"
          width={76}
          height={76}
          style={{
            display: "block",
            width: 76,
            height: 76,
            objectFit: "contain",
            borderRadius: "50%",
            boxShadow: "0 10px 30px rgba(217, 164, 65, 0.3)",
            margin: "0 auto 18px",
          }}
        />

        {/* KIRMIZI VURGULU 404 HATALI ADRES ROZETİ */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#FF6B6B",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
            marginBottom: "16px",
          }}
        >
          <AlertTriangle size={14} color={redBadge} />
          <span>{kicker}</span>
        </div>

        {/* ANA BAŞLIK */}
        <h1
          style={{
            fontFamily: 'var(--f-head, "Playfair Display", Georgia, serif)',
            fontWeight: 700,
            fontSize: "clamp(2rem, 4.8vw, 3rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            margin: "0 0 14px",
            color: "#FFFFFF",
          }}
        >
          {title}
        </h1>

        {/* AÇIKLAMA */}
        <p
          style={{
            margin: "0 auto 20px",
            maxWidth: "52ch",
            color: "#C2BCB0",
            fontSize: "15.5px",
            lineHeight: 1.65,
          }}
        >
          {lead}
        </p>

        {/* YANLIŞ GİRİLEN ADRES BİLGİ KUTUSU */}
        {pathname && pathname !== "/" && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px dashed rgba(239, 68, 68, 0.35)",
              color: "#FFA8A8",
              fontSize: "13px",
              fontFamily: "monospace",
              marginBottom: "26px",
            }}
          >
            <span>Aranan URL:</span>
            <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{pathname}</span>
            <span style={{ color: "#EF4444" }}>[Geçersiz]</span>
          </div>
        )}

        {/* HIZLI YÖNLENDİRME KARTLARI (2x2 GRID) */}
        {showQuickLinks && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "12px",
              marginBottom: "32px",
              textAlign: "left",
            }}
          >
            {quickLinks.map((ql, i) => (
              <Link key={i} href={ql.href} className="fault-card-link">
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {ql.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ display: "block", fontSize: "14px", color: "#FFFFFF", marginBottom: 2 }}>
                    {ql.title}
                  </b>
                  <span style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.35, display: "block" }}>
                    {ql.desc}
                  </span>
                </div>
                <ArrowRight size={15} style={{ color: "#D9A441", flexShrink: 0, opacity: 0.7 }} />
              </Link>
            ))}
          </div>
        )}

        {/* ANA BUTONLAR */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {primary.href ? (
            <Link href={primary.href} className="fault-btn-primary">
              <Home size={16} />
              {primary.label}
            </Link>
          ) : (
            <button type="button" onClick={primary.onClick} className="fault-btn-primary">
              {primary.label}
            </button>
          )}

          {secondary && secondary.href && (
            <Link href={secondary.href} className="fault-btn-ghost">
              <Utensils size={16} />
              {secondary.label}
            </Link>
          )}

          <a
            href="https://wa.me/905306089051?text=Merhaba,%20web%20sitenizde%20bir%20sayfaya%20ula%C5%9Famad%C4%B1m.%20Yard%C4%B1mc%C4%B1%20olabilir%20misiniz?"
            target="_blank"
            rel="noopener noreferrer"
            className="fault-btn-wa"
          >
            <WhatsAppIcon size={16} />
            {waLabel}
          </a>
        </div>

        {/* İLETİŞİM & ADRES BİLGİSİ */}
        <div style={{ marginTop: 38, fontSize: "13px", color: "#8A9482" }}>
          <a
            href="tel:+905306089051"
            style={{
              color: "#D9A441",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Phone size={13} />
            0530 608 90 51
          </a>
          <span style={{ opacity: 0.45, margin: "0 8px" }}>·</span>
          <span>Çekmeköy Taşdelen · Petra Yaşam Merkezi</span>
        </div>
      </div>
    </main>
  );
}

export function isStaleChunkError(error?: { message?: string; name?: string } | null) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /chunk|loading css chunk|failed to fetch dynamically imported/i.test(text);
}

