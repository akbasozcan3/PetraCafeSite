import Link from "next/link";
import SiteIcon from "@/components/site/SiteIcon";

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
    <div
      style={{
        width: "100%",
        paddingTop: "24px",
        paddingBottom: "60px",
        boxSizing: "border-box",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Breadcrumbs Navigasyon */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "#6e6a5c",
          marginBottom: "24px",
        }}
      >
        <Link href="/" style={{ color: "#0d0f0a", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span>/</span>
        <span style={{ color: "#b8842c", fontWeight: 700 }}>{title}</span>
      </nav>

      {/* 2. Ana Izgara Düzeni (Grid) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Sol Menü: Yasal Sayfalar Hızlı Geçiş */}
        <aside
          style={{
            flex: "1 1 280px",
            maxWidth: "340px",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1.5px solid rgba(184, 132, 44, 0.25)",
            padding: "24px",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
            position: "sticky",
            top: "100px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#b8842c",
                display: "inline-block",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#b8842c",
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
                      background: isActive ? "linear-gradient(135deg, #12150e 0%, #1e2417 100%)" : "transparent",
                      color: isActive ? "#f4eee1" : "#2c2f26",
                      border: isActive ? "1px solid #b8842c" : "1px solid transparent",
                      boxShadow: isActive ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <span style={{ color: "#d9a441", fontSize: "12px" }}>➔</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* İletişim & Yardım Kutusu */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(13, 15, 10, 0.08)",
              fontSize: "12px",
              color: "#6e6a5c",
            }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#0d0f0a" }}>Sorularınız mı var?</p>
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
                background: "#faf6ee",
                border: "1px solid rgba(184, 132, 44, 0.3)",
                color: "#9e7b30",
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

        {/* Sağ Alan: Sözleşme Gövdesi */}
        <article
          style={{
            flex: "1 1 500px",
            background: "#ffffff",
            borderRadius: "24px",
            border: "1.5px solid rgba(184, 132, 44, 0.25)",
            padding: "36px 40px",
            boxShadow: "0 12px 40px -10px rgba(0,0,0,0.06)",
            boxSizing: "border-box",
          }}
        >
          {/* Başlık Başlangıcı */}
          <div style={{ borderBottom: "1px solid rgba(13, 15, 10, 0.08)", paddingBottom: "24px", marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "#faf6ee",
                color: "#b8842c",
                border: "1px solid rgba(184, 132, 44, 0.3)",
                marginBottom: "12px",
              }}
            >
              RESMİ BİLDİRİM & SÖZLEŞME
            </span>
            <h1
              style={{
                margin: "0 0 12px",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#12150e",
                lineHeight: "1.3",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h1>
            {lead ? (
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "#5c5749",
                  lineHeight: "1.65",
                  fontWeight: 400,
                }}
              >
                {lead}
              </p>
            ) : null}
          </div>

          {/* Sözleşme Maddeleri */}
          <div
            style={{
              fontSize: "14.5px",
              lineHeight: "1.8",
              color: "#2c2f26",
              whiteSpace: "pre-line",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {body}
          </div>

          {/* Alt Kapanış & Son Güncelleme */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(13, 15, 10, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              fontSize: "12px",
              color: "#8c877a",
            }}
          >
            <span>Son Güncelleme: {new Date().getFullYear()} · Petra Cafe Restaurant</span>
            <Link
              href="/"
              style={{
                color: "#b8842c",
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
    </div>
  );
}