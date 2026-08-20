import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const title = b?.baslik || "Blog";
  const description =
    b?.lead ||
    "Rezervasyon, kahvaltı, havuz ve mekân üzerine kısa yazılar.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
  };
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(
    content.iletisim?.telefonHam || content.iletisim?.telefon || "05306089051"
  );

  return (
    <div className="shop-blog">
      <nav className="crumbs" aria-label="Sayfa yolu">
        <Link href="/">Ana Sayfa</Link>
        <span>/</span>
        <span aria-current="page">Blog</span>
      </nav>

      <header className="ys-hero ys-hero--sm">
        <p className="ys-hero__eyebrow">{b?.eyebrow || "Blog"}</p>
        <h1>{b?.baslik || "Petra Defteri"}</h1>
        {b?.lead ? <p>{b.lead}</p> : null}
      </header>

      {!posts.length ? (
        <div className="shop-card">
          <p>Henüz yayınlanmış yazı yok.</p>
        </div>
      ) : (
        <div className="blog-list" style={{ display: "grid", gap: 24, margin: "28px 0" }}>
          {posts.map((m) => {
            const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
            return (
              <Link
                className="post-magazine-card"
                href={`/blog/${m.slug}`}
                key={m.slug}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "stretch",
                  gap: 28,
                  padding: 22,
                  background: "#ffffff",
                  borderRadius: 22,
                  border: "1px solid rgba(13, 15, 10, 0.09)",
                  boxShadow: "0 10px 30px rgba(13, 15, 10, 0.03)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                {cover ? (
                  <div
                    style={{
                      flex: "0 0 320px",
                      width: 320,
                      height: 210,
                      borderRadius: 16,
                      overflow: "hidden",
                      background: "#f0ede6",
                    }}
                  >
                    <SafeImg
                      src={cover}
                      alt={m.baslik}
                      fallback={SITE_PHOTOS.interior}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "4px 0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 10,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#B8842C",
                      }}
                    >
                      {m.kategori ? (
                        <span
                          style={{
                            background: "rgba(217, 164, 65, 0.12)",
                            padding: "3px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {m.kategori}
                        </span>
                      ) : null}
                      {m.tarih ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#6E6A5C" }}>
                          <CalendarIcon />
                          {m.tarih}
                        </span>
                      ) : null}
                      {m.okumaSuresi ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#6E6A5C" }}>
                          <ClockIcon />
                          {m.okumaSuresi}
                        </span>
                      ) : null}
                    </div>

                    <h2
                      style={{
                        fontFamily: 'var(--f-head, "Playfair Display", Georgia, serif)',
                        fontSize: "1.42rem",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "#12140E",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {m.baslik}
                    </h2>

                    {m.ozet ? (
                      <p
                        style={{
                          fontSize: "0.98rem",
                          lineHeight: 1.6,
                          color: "#5E594D",
                          margin: 0,
                        }}
                      >
                        {m.ozet}
                      </p>
                    ) : null}
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        color: "#B8842C",
                      }}
                    >
                      Yazıyı İncele <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="cta-box" style={{ background: "#ffffff", border: "1px solid rgba(184, 132, 44, 0.2)", borderRadius: 22, padding: "32px 28px", marginTop: 40, boxShadow: "0 10px 30px rgba(13,15,10,0.03)" }}>
        <h2 style={{ fontFamily: 'var(--f-head, "Playfair Display", Georgia, serif)', fontSize: "1.45rem", color: "#12140E", margin: "0 0 8px 0" }}>
          {b?.ctaBaslik || "Masa veya Havuz İçin Rezervasyon"}
        </h2>
        <p style={{ color: "#5E594D", fontSize: "0.95rem", margin: "0 0 20px 0" }}>
          {b?.ctaMetin ||
            "Taşdelen'in huzurlu atmosferinde keyifli bir gün için online rezervasyon yapın veya bizi arayın."}
        </p>
        <div className="shop-actions" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Link href="/#rezervasyon" className="btn btn--lg btn--light" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <CalendarCheckIcon />
            Rezervasyon Formu
          </Link>
          {telHref ? (
            <a href={`tel:${telHref}`} className="btn btn--lg btn--ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <PhoneIcon />
              {tel}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
