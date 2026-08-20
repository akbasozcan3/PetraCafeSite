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
  const title = b?.baslik || "Blog & Rehber";
  const description =
    b?.lead ||
    "Petra Cafe Restaurant — Lezzet, kahvaltı, havuz, etkinlik ve rezervasyon rehberleri.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
  };
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(
    content.iletisim?.telefonHam || content.iletisim?.telefon || "05306089051"
  );

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div style={{ maxWidth: 1160, margin: "0 auto", padding: "16px 12px 64px 12px", fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        .p-blog-hero {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 40px auto;
        }
        .p-blog-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(184, 132, 44, 0.12);
          border: 1px solid rgba(184, 132, 44, 0.25);
          color: #B8842C;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .p-blog-title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #12140E;
          margin: 0 0 14px 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .p-blog-lead {
          font-size: 16px;
          line-height: 1.6;
          color: #6E6A5C;
          margin: 0;
        }
        .p-feat-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 32px;
          background: #FFFFFF;
          border: 1px solid rgba(13, 15, 10, 0.08);
          border-radius: 26px;
          padding: 24px;
          margin-bottom: 40px;
          box-shadow: 0 16px 36px rgba(13, 15, 10, 0.04);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .p-feat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 48px rgba(184, 132, 44, 0.08);
        }
        .p-feat-img {
          width: 100%;
          height: 320px;
          border-radius: 18px;
          overflow: hidden;
          background: #F0EDE6;
        }
        .p-feat-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 768px) {
          .p-feat-card { grid-template-columns: 1fr; padding: 16px; gap: 20px; }
          .p-feat-img { height: 220px; }
        }
        .p-blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }
        .p-grid-card {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid rgba(13, 15, 10, 0.08);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 10px 24px rgba(13, 15, 10, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .p-grid-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(184, 132, 44, 0.08);
        }
        .p-grid-img {
          width: 100%;
          height: 200px;
          background: #F0EDE6;
          overflow: hidden;
        }
        .p-grid-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .p-tag {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(184, 132, 44, 0.12);
          color: #B8842C;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .p-btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #D9A441;
          color: #0A0D14;
          padding: 12px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .p-btn-cta:hover {
          background: #E5B558;
        }
      `}</style>

      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6E6A5C", marginBottom: 28 }}>
        <Link href="/" style={{ color: "#12140E", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span>/</span>
        <span style={{ color: "#B8842C", fontWeight: 600 }}>Blog</span>
      </nav>

      {/* Hero Başlık Bölümü */}
      <header className="p-blog-hero">
        <div className="p-blog-badge">
          ✦ {b?.eyebrow || "PETRA JOURNAL"}
        </div>
        <h1 className="p-blog-title">{b?.baslik || "Petra Defteri"}</h1>
        <p className="p-blog-lead">
          {b?.lead ||
            "Kahvaltı, dünya mutfağı, havuz keyfi, etkinlikler ve masa rezervasyonu üzerine yazılar."}
        </p>
      </header>

      {!posts.length ? (
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(13,15,10,0.08)", borderRadius: 20, padding: 48, textAlign: "center", color: "#6E6A5C" }}>
          <p style={{ margin: 0, fontSize: 15 }}>Henüz yayınlanmış yazı bulunmuyor.</p>
        </div>
      ) : (
        <>
          {/* Öne Çıkan Yazı (Featured Article) */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="p-feat-card">
              <div className="p-feat-img">
                <SafeImg
                  src={resolveMediaUrl(liveMedia(featuredPost.kapak, SITE_PHOTOS.interior)) || SITE_PHOTOS.interior}
                  alt={featuredPost.baslik}
                  fallback={SITE_PHOTOS.interior}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "8px 4px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span className="p-tag">{featuredPost.kategori || "Öne Çıkan"}</span>
                    {featuredPost.okumaSuresi && (
                      <span style={{ fontSize: 12, color: "#6E6A5C" }}>⏱️ {featuredPost.okumaSuresi}</span>
                    )}
                  </div>

                  <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "#12140E", margin: "0 0 12px 0", lineHeight: 1.25 }}>
                    {featuredPost.baslik}
                  </h2>

                  {featuredPost.ozet && (
                    <p style={{ fontSize: 14, color: "#6E6A5C", lineHeight: 1.6, margin: "0 0 16px 0" }}>
                      {featuredPost.ozet}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(13,15,10,0.08)" }}>
                  <span style={{ fontSize: 12, color: "#6E6A5C" }}>
                    📅 {featuredPost.tarih || "2026"}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#B8842C" }}>
                    Yazıyı oku →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Diğer Yazılar Izgarası */}
          {regularPosts.length > 0 && (
            <div className="p-blog-grid">
              {regularPosts.map((m) => {
                const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
                return (
                  <Link key={m.slug} href={`/blog/${m.slug}`} className="p-grid-card">
                    <div className="p-grid-img">
                      <SafeImg
                        src={cover || SITE_PHOTOS.interior}
                        alt={m.baslik}
                        fallback={SITE_PHOTOS.interior}
                      />
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <div style={{ marginBottom: 10 }}>
                        <span className="p-tag">{m.kategori || "Blog"}</span>
                      </div>
                      <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.2rem", fontWeight: 700, color: "#12140E", margin: "0 0 8px 0", lineHeight: 1.3 }}>
                        {m.baslik}
                      </h3>
                      {m.ozet && (
                        <p style={{ fontSize: 13, color: "#6E6A5C", lineHeight: 1.5, margin: "0 0 16px 0", flexGrow: 1 }}>
                          {m.ozet}
                        </p>
                      )}
                      <div style={{ marginTop: "auto", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                        <span style={{ color: "#8A9BB0" }}>{m.tarih || ""}</span>
                        <span style={{ color: "#B8842C", fontWeight: 700 }}>Oku →</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Lüks Rezervasyon & İletişim CTA Bandı */}
      <section style={{ background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.25)", borderRadius: 24, padding: "36px 24px", textAlign: "center", marginTop: 40, boxShadow: "0 16px 36px rgba(184,132,44,0.06)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "rgba(184, 132, 44, 0.12)", color: "#B8842C", fontSize: 20, marginBottom: 14 }}>
          🍽️
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.7rem", fontWeight: 700, color: "#12140E", margin: "0 0 10px 0" }}>
          {b?.ctaBaslik || "Keyifli Bir Masa İçin Rezervasyon Yapın"}
        </h2>
        <p style={{ fontSize: 14, color: "#6E6A5C", maxWidth: 500, margin: "0 auto 20px auto", lineHeight: 1.6 }}>
          {b?.ctaMetin ||
            "Taşdelen'in huzurlu atmosferinde kahvaltı, dünya mutfağı ve havuz keyfi için masanızı online ayırtın."}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <Link href="/#rezervasyon" className="p-btn-cta">
            📅 Rezervasyon Formu
          </Link>
          {telHref && (
            <a href={`tel:${telHref}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 999, border: "1px solid rgba(13,15,10,0.15)", background: "transparent", color: "#12140E", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              📞 {tel}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
