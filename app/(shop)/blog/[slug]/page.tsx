import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import { readLegacyBlogArticleHtml } from "@/lib/content/blog-legacy";
import { sanitizeArticleHtml } from "@/lib/security/html";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";

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
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "16px 12px 64px 12px", fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        .p-art-cover {
          width: 100%;
          height: 380px;
          border-radius: 24px;
          overflow: hidden;
          background: #F0EDE6;
          margin-bottom: 36px;
          box-shadow: 0 16px 40px rgba(13,15,10,0.06);
        }
        .p-art-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 640px) {
          .p-art-cover { height: 240px; border-radius: 16px; margin-bottom: 24px; }
        }
        .p-art-body {
          font-size: 16px;
          line-height: 1.75;
          color: #2B2E25;
        }
        .p-art-body h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #12140E;
          margin: 32px 0 14px 0;
        }
        .p-art-body p {
          margin: 0 0 18px 0;
        }
        .p-art-body ul, .p-art-body ol {
          padding-left: 24px;
          margin: 0 0 20px 0;
        }
        .p-art-body li {
          margin-bottom: 8px;
        }
        .p-art-body div.answer {
          background: #FFFFFF;
          border-left: 4px solid #B8842C;
          border-radius: 0 16px 16px 0;
          padding: 20px 24px;
          margin: 24px 0;
          box-shadow: 0 8px 24px rgba(13,15,10,0.03);
        }
        .p-art-body div.cta-box {
          display: none;
        }
      `}</style>

      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6E6A5C", marginBottom: 28, flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#12140E", textDecoration: "none", fontWeight: 600 }}>
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/blog" style={{ color: "#12140E", textDecoration: "none", fontWeight: 600 }}>
          Blog
        </Link>
        <span>/</span>
        <span style={{ color: "#B8842C", fontWeight: 600 }}>{post.baslik}</span>
      </nav>

      {/* Makale Başlık & Meta */}
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: "rgba(184, 132, 44, 0.12)", color: "#B8842C", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
            {post.kategori || "Rehber & Yazı"}
          </span>
          {post.okumaSuresi && (
            <span style={{ fontSize: 12, color: "#6E6A5C" }}>⏱️ {post.okumaSuresi}</span>
          )}
          {post.tarih && (
            <span style={{ fontSize: 12, color: "#6E6A5C" }}>📅 {post.tarih}</span>
          )}
        </div>

        <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#12140E", lineHeight: 1.2, margin: "0 0 16px 0" }}>
          {post.baslik}
        </h1>

        {post.ozet && (
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#5E594D", maxWidth: 640, margin: "0 auto", fontStyle: "italic" }}>
            "{post.ozet}"
          </p>
        )}
      </header>

      {/* Kapak Görseli */}
      {cover && (
        <div className="p-art-cover">
          <SafeImg
            src={cover}
            alt={post.baslik}
            fallback={SITE_PHOTOS.interior}
          />
        </div>
      )}

      {/* Makale İçeriği */}
      <article className="p-art-body">
        {bodyHtml ? (
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        ) : (
          <p>{post.ozet}</p>
        )}
      </article>

      {/* Yazar / Restoran Damgası */}
      <div style={{ marginTop: 44, padding: "20px 24px", background: "#FFFFFF", borderRadius: 20, border: "1px solid rgba(13,15,10,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(184,132,44,0.12)", color: "#B8842C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            ✦
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#12140E" }}>Petra Cafe Restaurant</p>
            <p style={{ margin: 0, fontSize: 12, color: "#6E6A5C" }}>Çekmeköy Taşdelen · Yaşam & Lezzet Merkezi</p>
          </div>
        </div>

        <Link
          href="/blog"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(13,15,10,0.15)", textDecoration: "none", color: "#12140E", fontSize: 13, fontWeight: 600 }}
        >
          ← Tüm Yazılar
        </Link>
      </div>

      {/* Rezervasyon Çağrı Kutusu */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(184, 132, 44, 0.25)", borderRadius: 24, padding: "36px 24px", textAlign: "center", marginTop: 40, boxShadow: "0 16px 36px rgba(184,132,44,0.06)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "rgba(184, 132, 44, 0.12)", color: "#B8842C", fontSize: 20, marginBottom: 14 }}>
          🍽️
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.7rem", fontWeight: 700, color: "#12140E", margin: "0 0 10px 0" }}>
          Masanızı Şimdiden Ayırtın
        </h2>
        <p style={{ fontSize: 14, color: "#6E6A5C", maxWidth: 480, margin: "0 auto 20px auto", lineHeight: 1.6 }}>
          Kahvaltı, akşam yemeği veya özel günleriniz için 30 saniyede online rezervasyon oluşturun.
        </p>
        <Link
          href="/#rezervasyon"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#D9A441", color: "#0A0D14", padding: "12px 28px", borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: "none" }}
        >
          📅 Rezervasyon Formu
        </Link>
      </div>

      {/* Önerilen Diğer Yazılar */}
      {otherPosts.length > 0 && (
        <section style={{ marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(13,15,10,0.1)" }}>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.4rem", margin: "0 0 20px 0", color: "#12140E" }}>
            📖 İlginizi Çekebilir
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                style={{ background: "#FFFFFF", padding: "20px", borderRadius: 20, border: "1px solid rgba(13,15,10,0.08)", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 999, background: "rgba(184, 132, 44, 0.12)", color: "#B8842C", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
                    {other.kategori || "Blog"}
                  </span>
                  <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: "1.15rem", margin: "6px 0 8px 0", color: "#12140E", lineHeight: 1.3 }}>
                    {other.baslik}
                  </h3>
                  {other.ozet && <p style={{ fontSize: 13, color: "#6E6A5C", margin: 0, lineHeight: 1.5 }}>{other.ozet}</p>}
                </div>
                <span style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: "#B8842C" }}>
                  Yazıyı Oku →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
