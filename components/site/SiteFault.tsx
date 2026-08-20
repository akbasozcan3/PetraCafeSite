"use client";

import Link from "next/link";

export default function SiteFault({
  kicker = "404",
  title = "Bu kapı burada açılmıyor",
  lead = "Aradığınız sayfa taşınmış, adı değişmiş veya geçici olarak kullanılamıyor olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.",
  primary = { label: "Ana Sayfaya Dön", href: "/" },
  secondary = { label: "Menüyü Keşfet", href: "/menu" },
}: {
  kicker?: string;
  title: string;
  lead: string;
  primary: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string };
}) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        backgroundColor: "#0B0F17",
        color: "#EEE9E0",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .sf-glow-1 {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at center, rgba(217,164,65,0.18), transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .sf-glow-2 {
          position: absolute;
          bottom: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 350px;
          background: radial-gradient(ellipse at center, rgba(200,112,58,0.14), transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }
        .sf-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 580px;
          background: rgba(18, 24, 36, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(16px);
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .sf-card { padding: 28px 20px; border-radius: 20px; }
        }
        .sf-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(217, 164, 65, 0.12);
          border: 1px solid rgba(217, 164, 65, 0.3);
          color: #D9A441;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .sf-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 700;
          color: #F8F6F0;
          line-height: 1.2;
          margin: 0 0 14px 0;
          letter-spacing: -0.01em;
        }
        .sf-lead {
          font-size: 14px;
          line-height: 1.6;
          color: #9EABB8;
          max-width: 440px;
          margin: 0 auto 28px auto;
        }
        .sf-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #D9A441;
          color: #0A0D14;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 8px 20px rgba(217, 164, 65, 0.25);
        }
        .sf-btn-primary:hover {
          background: #E5B558;
          transform: translateY(-1px);
        }
        .sf-btn-sec {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: #EEE9E0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sf-btn-sec:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .sf-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          box-sizing: border-box;
        }
        @media (max-width: 480px) {
          .sf-links-grid { grid-template-columns: 1fr; }
        }
        .sf-quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-decoration: none;
          color: #C8D0DC;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.15s ease;
        }
        .sf-quick-link:hover {
          background: rgba(217, 164, 65, 0.1);
          border-color: rgba(217, 164, 65, 0.3);
          color: #F8F6F0;
        }
      `}</style>

      <div className="sf-glow-1" />
      <div className="sf-glow-2" />

      <div className="sf-card">
        {/* Logo */}
        <div style={{ marginBottom: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/petra-mark.svg"
            alt="Petra Cafe"
            width={140}
            height={36}
            style={{ display: "inline-block", height: 32, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />
        </div>

        {/* Rozet */}
        <div className="sf-badge">
          ✦ {kicker} · SAYFA BULUNAMADI
        </div>

        {/* Başlık ve Açıklama */}
        <h1 className="sf-title">{title}</h1>
        <p className="sf-lead">{lead}</p>

        {/* Butonlar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 8 }}>
          {primary.href ? (
            <Link href={primary.href} className="sf-btn-primary">
              🏠 {primary.label}
            </Link>
          ) : (
            <button type="button" onClick={primary.onClick} className="sf-btn-primary">
              🏠 {primary.label}
            </button>
          )}

          {secondary?.href && (
            <Link href={secondary.href} className="sf-btn-sec">
              🍽️ {secondary.label}
            </Link>
          )}
        </div>

        {/* Hızlı Linkler */}
        <div className="sf-links-grid">
          <Link href="/menu" className="sf-quick-link">
            <span>🍽️ Menü</span>
            <span style={{ color: "#D9A441" }}>→</span>
          </Link>
          <Link href="/#rezervasyon" className="sf-quick-link">
            <span>📅 Rezervasyon</span>
            <span style={{ color: "#D9A441" }}>→</span>
          </Link>
          <Link href="/blog" className="sf-quick-link">
            <span>📖 Blog & Yazılar</span>
            <span style={{ color: "#D9A441" }}>→</span>
          </Link>
        </div>

        {/* İletişim Bilgisi */}
        <div style={{ marginTop: 24, fontSize: 12, color: "#6B7A94" }}>
          <a href="tel:+905306089051" style={{ color: "#D9A441", fontWeight: 700, textDecoration: "none", marginRight: 8 }}>
            📞 0530 608 90 51
          </a>
          <span>· Çekmeköy Petra Yaşam Merkezi</span>
        </div>
      </div>
    </main>
  );
}

export function isStaleChunkError(error?: { message?: string; name?: string } | null) {
  const text = `${error?.name || ""} ${error?.message || ""}`;
  return /chunk|loading css chunk|failed to fetch dynamically imported/i.test(text);
}
