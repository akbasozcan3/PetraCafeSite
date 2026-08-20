import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import { readLegacyBlogArticleHtml } from "@/lib/content/blog-legacy";
import { sanitizeArticleHtml } from "@/lib/security/html";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { Calendar, Clock, ArrowLeft, ArrowRight, Sparkles, UtensilsCrossed, BookOpen } from "lucide-react";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) {
    return { title: "Yazı bulunamadı", robots: { index: false, follow: true } };
  }
  const cover = resolveMediaUrl(liveMedia(post.kapak, SITE_PHOTOS.facade));
  return {
    title: `${post.baslik} | Petra Cafe Restaurant`,
    description: post.ozet || post.baslik,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.baslik} | Petra Cafe Restaurant`,
      description: post.ozet || undefined,
      type: "article",
      images: cover ? [{ url: cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.baslik,
      description: post.ozet || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) notFound();

  const bodyHtml = sanitizeArticleHtml(
    post.govdeHtml || readLegacyBlogArticleHtml(slug) || ""
  );
  const cover = resolveMediaUrl(liveMedia(post.kapak, SITE_PHOTOS.interior));

  // Diğer önerilen yazılar
  const otherPosts = (content.makaleler || [])
    .filter((m) => m.yayinda !== false && m.slug !== slug)
    .slice(0, 2);

  return (
    <div className="shop-blog shop-article">
      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav className="crumbs" aria-label="Sayfa yolu">
        <Link href="/">Ana Sayfa</Link>
        <span className="crumb-sep">/</span>
        <Link href="/blog">Blog</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current" aria-current="page">
          {post.baslik}
        </span>
      </nav>

      {/* Makale Başlık & Meta */}
      <header className="article__header">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span className="blog-tag">{post.kategori || "Rehber & Yazı"}</span>
          {post.okumaSuresi && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.82rem", color: "var(--muted, #6e6a5c)" }}>
              <Clock style={{ width: 13, height: 13, color: "var(--brass, #b8842c)" }} />
              {post.okumaSuresi}
            </span>
          )}
          {post.tarih && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.82rem", color: "var(--muted, #7c7769)" }}>
              <Calendar style={{ width: 13, height: 13 }} />
              {post.tarih}
            </span>
          )}
        </div>

        <h1>{post.baslik}</h1>

        {post.ozet && (
          <p className="article__lead">
            "{post.ozet}"
          </p>
        )}
      </header>

      {/* Kapak Görseli */}
      {cover && (
        <figure className="article__cover">
          <SafeImg
            src={cover}
            alt={post.baslik}
            fallback={SITE_PHOTOS.interior}
          />
        </figure>
      )}

      {/* Makale İçeriği */}
      <article className="article__content">
        {bodyHtml ? (
          <div
            className="blog-article__body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <p>{post.ozet}</p>
        )}
      </article>

      {/* Yazar / Restoran Damgası */}
      <div style={{ marginTop: 40, padding: "20px 24px", background: "#ffffff", borderRadius: 20, border: "1px solid rgba(13,15,10,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(184,132,44,0.12)", color: "var(--brass, #b8842c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ width: 20, height: 20 }} />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "var(--ink, #12140e)" }}>Petra Cafe Restaurant</p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted, #6e6a5c)" }}>Çekmeköy Taşdelen · Yaşam & Lezzet Merkezi</p>
          </div>
        </div>

        <Link
          href="/blog"
          className="btn btn--sm btn--ghost"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} />
          Tüm Yazılar
        </Link>
      </div>

      {/* Rezervasyon Çağrı Kutusu */}
      <div className="blog-cta" style={{ marginTop: 40 }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "rgba(184, 132, 44, 0.12)", color: "var(--brass, #b8842c)", marginBottom: 14 }}>
          <UtensilsCrossed style={{ width: 22, height: 22 }} />
        </div>
        <h2>Masanızı Şimdiden Ayırtın</h2>
        <p>
          Kahvaltı, akşam yemeği veya özel günleriniz için 30 saniyede online rezervasyon oluşturun.
        </p>
        <div className="cta-actions">
          <Link href="/#rezervasyon" className="btn btn--lg btn--light" style={{ minWidth: 200 }}>
            Rezervasyon Formu
          </Link>
        </div>
      </div>

      {/* Önerilen Diğer Yazılar */}
      {otherPosts.length > 0 && (
        <section style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(13,15,10,0.1)" }}>
          <h2 style={{ fontFamily: 'var(--f-head, "Playfair Display", Georgia, serif)', fontSize: "1.45rem", margin: "0 0 24px", color: "var(--ink, #12140e)", display: "flex", alignItems: "center", gap: 8 }}>
            <BookOpen style={{ width: 20, height: 20, color: "var(--brass, #b8842c)" }} />
            İlginizi Çekebilir
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                style={{ background: "#ffffff", padding: "20px 24px", borderRadius: 20, border: "1px solid rgba(13,15,10,0.08)", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <span className="blog-tag" style={{ marginBottom: 8 }}>{other.kategori || "Blog"}</span>
                  <h3 style={{ fontFamily: 'var(--f-head, "Playfair Display", Georgia, serif)', fontSize: "1.15rem", margin: "8px 0", color: "var(--ink, #12140e)" }}>
                    {other.baslik}
                  </h3>
                  {other.ozet && <p style={{ fontSize: "0.85rem", color: "var(--muted, #6e6a5c)", margin: 0, lineClamp: 2 }}>{other.ozet}</p>}
                </div>
                <span className="blog-more-btn" style={{ marginTop: 14 }}>
                  Yazıyı Oku <ArrowRight style={{ width: 14, height: 14 }} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
