import Link from "next/link";
import SiteIcon from "@/components/site/SiteIcon";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import MasaCTA from "@/components/site/MasaCTA";

export interface LegalPageProps {
  currentSlug: "gizlilik-politikasi" | "rezervasyon-kosullari" | "kullanim-kosullari" | "cerez-politikasi" | "ticari-bilgiler";
  title: string;
  lead?: string;
  body: string;
}

const LEGAL_NAV = [
  { slug: "gizlilik-politikasi", label: "Gizlilik & KVKK", icon: "shield" },
  { slug: "rezervasyon-kosullari", label: "Rezervasyon & İptal Koşulları", icon: "check" },
  { slug: "kullanim-kosullari", label: "Kullanım Koşulları", icon: "file" },
  { slug: "cerez-politikasi", label: "Çerez Politikası", icon: "globe" },
  { slug: "ticari-bilgiler", label: "İşletme & Ticari Bilgiler", icon: "map" },
];

export default function LegalPageTemplate({
  currentSlug,
  title,
  lead,
  body,
}: LegalPageProps) {
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
          font-size: 12px;
          color: var(--card-muted, #6e6a5c);
          margin-bottom: 20px;
        }
        /* Mobil Yatay Kaydırılabilir Sekmeler */
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
        .petra-legal-mobile-tab-btn.active span {
          color: #0d0f0a !important;
          font-weight: 700;
        }
        .petra-legal-mobile-tab-btn.inactive {
          background: var(--card-bg, #ffffff) !important;
          color: var(--card-text, #4a4538) !important;
          border: 1px solid var(--card-border, rgba(13, 15, 10, 0.15)) !important;
        }
        .petra-legal-mobile-tab-btn.inactive span {
          color: var(--card-text, #4a4538) !important;
          font-weight: 600;
        }
        /* Masaüstü ve Mobil Düzeni */
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
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2);
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
          box-shadow: 0 12px 40px -10px rgba(0,0,0,0.2);
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
      <div style={{ marginBottom: "20px" }}>
        <Breadcrumbs items={[{ label: title }]} />
      </div>

      {/* 2. Mobilde Yatay Kaydırılabilir Hızlı Sekmeler */}
      <div className="petra-legal-mobile-tabs">
        {LEGAL_NAV.map((item) => {
          const isActive = item.slug === currentSlug;
          return (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className={`petra-legal-mobile-tab-btn ${isActive ? "active" : "inactive"}`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
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
              Yasal & Kurumsal
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
            {LEGAL_NAV.map((item) => {
              const isActive = item.slug === currentSlug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "11px 16px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      background: isActive ? "var(--brass, #d9a441)" : "transparent",
                      color: isActive ? "#0d0f0a" : "var(--card-text, #2c2f26)",
                      border: isActive ? "1px solid var(--brass, #b8842c)" : "1px solid transparent",
                      boxShadow: isActive ? "0 4px 14px rgba(217, 164, 65, 0.25)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <span style={{ color: "#0d0f0a", fontSize: "12px", fontWeight: 700 }}>➔</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))",
              fontSize: "12px",
              color: "var(--card-muted, #6e6a5c)",
            }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "var(--card-text, #0d0f0a)" }}>Sorularınız mı var?</p>
            <p style={{ margin: "0 0 12px", lineHeight: "1.4" }}>
              Yasal koşullar ve rezervasyon hakkında ekibimizle görüşebilirsiniz.
            </p>
            <a
              href="tel:05306089051"
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
              }}
            >
              <SiteIcon name="phone" size={14} />
              <span>0530 608 90 51</span>
            </a>
          </div>
        </aside>

        {/* Sözleşme İçerik Kartı */}
        <article className="petra-legal-content">
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
              RESMİ BİLDİRİM & SÖZLEŞME
            </span>
            <h1
              style={{
                margin: "0 0 10px",
                fontFamily: "var(--f-head, Georgia, serif)",
                fontSize: "26px",
                fontWeight: 700,
                color: "var(--card-text, #12150e)",
                lineHeight: "1.3",
              }}
            >
              {title}
            </h1>
            {lead ? (
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "var(--card-muted, #5c5749)",
                  lineHeight: "1.6",
                }}
              >
                {lead}
              </p>
            ) : null}
          </div>

          {/* Sözleşme Metni */}
          <div
            style={{
              fontSize: "14.5px",
              lineHeight: "1.8",
              color: "var(--card-text, #2c2f26)",
              whiteSpace: "pre-line",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {body}
          </div>

          <div
            style={{
              marginTop: "32px",
              paddingTop: "18px",
              borderTop: "1px solid var(--card-border, rgba(13, 15, 10, 0.08))",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              fontSize: "12px",
              color: "var(--card-muted, #8c877a)",
            }}
          >
            <span>Son Güncelleme: {new Date().getFullYear()} · Petra Cafe Restaurant</span>
            <Link
              href="/"
              style={{
                color: "var(--brass, #b8842c)",
                textDecoration: "none",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </article>
      </div>

      {/* Masa CTA — tüm yasal sayfalarda */}
      <MasaCTA
        baslik="Masa ayırtmak ister misiniz?"
        metin="Rezervasyon ve sorularınız için bizi arayın veya formdan yazın."
        btnLabel="Masa Rezervasyonu Yap"
      />
    </div>
  );
}