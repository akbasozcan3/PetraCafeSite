import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen, UtensilsCrossed, Phone } from "lucide-react";

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
    <div className="shop-blog">
      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav className="crumbs" aria-label="Sayfa yolu">
        <Link href="/">Ana Sayfa</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current" aria-current="page">Blog</span>
      </nav>

      {/* Hero Başlık Bölümü */}
      <header className="blog-hero">
        <div className="blog-hero__badge">
          <Sparkles style={{ width: 13, height: 13 }} />
          <span>{b?.eyebrow || "PETRA JOURNAL"}</span>
        </div>
        <h1>{b?.baslik || "Petra Defteri"}</h1>
        <p>
          {b?.lead ||
            "Kahvaltı, dünya mutfağı, havuz keyfi, etkinlikler ve masa rezervasyonu üzerine yazılar."}
        </p>
      </header>

      {!posts.length ? (
        <div className="shop-card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <BookOpen style={{ width: 36, height: 36, color: "var(--brass, #b8842c)", margin: "0 auto 12px" }} />
          <p style={{ margin: 0, fontSize: "1rem", color: "var(--muted, #6e6a5c)" }}>Henüz yayınlanmış yazı bulunmuyor.</p>
        </div>
      ) : (
        <>
          {/* Öne Çıkan Yazı (Featured Article) */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="blog-featured">
              <div className="blog-featured__img-wrap">
                <SafeImg
                  src={resolveMediaUrl(liveMedia(featuredPost.kapak, SITE_PHOTOS.interior)) || SITE_PHOTOS.interior}
                  alt={featuredPost.baslik}
                  fallback={SITE_PHOTOS.interior}
                />
              </div>

              <div className="blog-featured__content">
                <div>
                  <div className="blog-meta">
                    <span className="blog-tag">{featuredPost.kategori || "Öne Çıkan"}</span>
                    {featuredPost.okumaSuresi && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Clock style={{ width: 13, height: 13, color: "var(--brass, #b8842c)" }} />
                        {featuredPost.okumaSuresi}
                      </span>
                    )}
                  </div>

                  <h2>{featuredPost.baslik}</h2>

                  {featuredPost.ozet && <p>{featuredPost.ozet}</p>}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(13, 15, 10, 0.08)" }}>
                  {featuredPost.tarih ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "var(--muted, #6e6a5c)" }}>
                      <Calendar style={{ width: 13, height: 13 }} />
                      {featuredPost.tarih}
                    </span>
                  ) : <span />}

                  <span className="blog-more-btn">
                    Yazıyı oku
                    <ArrowRight style={{ width: 15, height: 15 }} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Diğer Yazılar Izgarası */}
          {regularPosts.length > 0 && (
            <div className="blog-grid">
              {regularPosts.map((m) => {
                const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
                return (
                  <Link key={m.slug} href={`/blog/${m.slug}`} className="blog-card">
                    <div className="blog-card__img">
                      <SafeImg
                        src={cover || SITE_PHOTOS.interior}
                        alt={m.baslik}
                        fallback={SITE_PHOTOS.interior}
                      />
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-meta">
                        {m.kategori && <span className="blog-tag">{m.kategori}</span>}
                        {m.okumaSuresi && <span>{m.okumaSuresi}</span>}
                      </div>

                      <h3>{m.baslik}</h3>

                      {m.ozet && <p>{m.ozet}</p>}

                      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted, #7c7769)" }}>
                          {m.tarih || ""}
                        </span>
                        <span className="blog-more-btn">
                          Yazıyı oku <ArrowRight style={{ width: 13, height: 13 }} />
                        </span>
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
      <section className="blog-cta">
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "rgba(184, 132, 44, 0.12)", color: "var(--brass, #b8842c)", marginBottom: 16 }}>
          <UtensilsCrossed style={{ width: 22, height: 22 }} />
        </div>
        <h2>{b?.ctaBaslik || "Keyifli Bir Masa İçin Rezervasyon Yapın"}</h2>
        <p>
          {b?.ctaMetin ||
            "Taşdelen'in huzurlu atmosferinde kahvaltı, dünya mutfağı ve havuz keyfi için masanızı online ayırtın."}
        </p>

        <div className="cta-actions">
          <Link href="/#rezervasyon" className="btn btn--lg btn--light" style={{ minWidth: 200 }}>
            Rezervasyon Formu
          </Link>

          {telHref && (
            <a href={`tel:${telHref}`} className="btn btn--lg btn--ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Phone style={{ width: 15, height: 15 }} />
              {tel}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
