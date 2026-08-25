import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import { readLegacyBlogArticleHtml } from "@/lib/content/blog-legacy";
import { sanitizeArticleHtml } from "@/lib/security/html";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText } from "@/lib/content/markdown-parser";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Phone,
  Bookmark,
  Share2,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) {
    return { title: "Yazı bulunamadı", robots: { index: false, follow: true } };
  }
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const cover = resolveMediaUrl(liveMedia(post.kapak, SITE_PHOTOS.facade));
  const title = `${cleanRawText(post.baslik)} | ${brand}`;
  const description = cleanRawText(post.ozet || post.baslik);
  const canonicalUrl = `https://petra-cafe-site.vercel.app/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      images: cover ? [{ url: cover, width: 1200, height: 630, alt: cleanRawText(post.baslik) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) notFound();

  const brandName = content.brand?.displayName || "Petra Cafe Restaurant";
  const bodyHtml = sanitizeArticleHtml(
    post.govdeHtml || readLegacyBlogArticleHtml(slug) || ""
  );
  const cover = resolveMediaUrl(liveMedia(post.kapak, SITE_PHOTOS.interior));
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);

  // İlgili diğer makaleler (en fazla 2 adet)
  const otherPosts = (content.makaleler || [])
    .filter((m) => m.slug !== slug && m.yayinda !== false)
    .slice(0, 2);

  // Structured Data (Schema.org BlogPosting)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: cleanRawText(post.baslik),
    description: cleanRawText(post.ozet || post.baslik),
    image: cover || undefined,
    datePublished: post.tarih || "2026-08-25",
    author: {
      "@type": "Organization",
      name: brandName,
      url: "https://petra-cafe-site.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: resolveMediaUrl(content.images?.logo) || undefined,
      },
    },
  };

  return (
    <article className="page-hakkimizda page-article" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px) 60px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. BREADCRUMBS */}
      <div style={{ margin: "8px 0 20px" }}>
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: cleanRawText(post.baslik) },
          ]}
        />
      </div>

      {/* 2. EDİTORYAL MAKALE BAŞLIĞI */}
      <header className="article__head" style={{ marginBottom: "28px" }}>
        {post.kategori ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "999px",
              background: "rgba(217, 164, 65, 0.12)",
              color: "var(--brass-lo, #B8842C)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            <Bookmark size={12} />
            <span>{cleanRawText(post.kategori)}</span>
          </div>
        ) : null}

        <h1
          style={{
            fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 600,
            lineHeight: 1.18,
            color: "var(--ink, #0D0F0A)",
            margin: "0 0 16px",
            letterSpacing: "-0.015em",
          }}
        >
          {cleanRawText(post.baslik)}
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "18px",
            fontSize: "13px",
            color: "var(--muted, #6E6A5C)",
            paddingBottom: "18px",
            borderBottom: "1px solid rgba(13, 15, 10, 0.08)",
          }}
        >
          {post.tarih ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Calendar size={14} color="var(--brass-lo, #B8842C)" />
              <time>{post.tarih}</time>
            </span>
          ) : null}
          {post.okumaSuresi ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Clock size={14} color="var(--brass-lo, #B8842C)" />
              <span>{post.okumaSuresi}</span>
            </span>
          ) : null}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--olive-lo, #5A6838)" }} />
            <span>{brandName} Mutfak Ekibi</span>
          </span>
        </div>

        {post.ozet ? (
          <p
            style={{
              fontSize: "clamp(16px, 1.6vw, 18.5px)",
              lineHeight: 1.65,
              color: "#3A3E32",
              margin: "20px 0 0",
              fontWeight: 500,
            }}
          >
            {cleanRawText(post.ozet)}
          </p>
        ) : null}
      </header>

      {/* 3. KAPAK GÖRSELİ */}
      {cover ? (
        <figure
          style={{
            margin: "0 0 36px",
            borderRadius: "22px",
            overflow: "hidden",
            border: "1.5px solid rgba(13, 15, 10, 0.08)",
            boxShadow: "0 12px 32px -12px rgba(13, 15, 10, 0.1)",
            background: "#16190F",
            width: "100%",
            aspectRatio: "16 / 9",
            maxHeight: "380px",
            position: "relative",
          }}
        >
          <SafeImg
            src={cover}
            alt={cleanRawText(post.baslik)}
            fallback={SITE_PHOTOS.interior}
            className="w-full h-full object-cover object-center block"
          />
        </figure>
      ) : null}

      {/* 4. MAKALE GÖVDESİ */}
      {bodyHtml ? (
        <div
          className="blog-article__body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#2C3024",
          }}
        />
      ) : (
        <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#2C3024" }}>{post.ozet}</p>
      )}

      {/* 5. DİĞER YAZILARIMIZ & ÖNERİLER */}
      {otherPosts.length > 0 ? (
        <section
          style={{
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1.5px solid rgba(13, 15, 10, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2
              style={{
                fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                fontSize: "22px",
                fontWeight: 600,
                color: "var(--ink, #0D0F0A)",
                margin: 0,
              }}
            >
              Diğer Makaleler
            </h2>
            <Link
              href="/blog"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--brass-lo, #B8842C)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Tümünü Gör <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
            {otherPosts.map((op) => (
              <Link
                key={op.slug}
                href={`/blog/${op.slug}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  border: "1px solid rgba(13, 15, 10, 0.08)",
                  padding: "18px 20px",
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0 4px 14px -6px rgba(13, 15, 10, 0.05)",
                  transition: "all 0.2s ease",
                }}
                className="blog-card-hover"
              >
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--brass-lo, #B8842C)", textTransform: "uppercase" }}>
                  {cleanRawText(op.kategori || "Blog")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--f-head, serif)",
                    fontSize: "16.5px",
                    fontWeight: 600,
                    color: "var(--ink, #0D0F0A)",
                    margin: "6px 0 8px",
                    lineHeight: 1.35,
                  }}
                >
                  {cleanRawText(op.baslik)}
                </h3>
                <span style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--olive-lo, #5A6838)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Okumaya Başla <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* 6. BLOG REZERVASYON BANNER */}
      <div
        style={{
          marginTop: "40px",
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "22px",
          border: "1.5px solid rgba(13, 15, 10, 0.08)",
          padding: "28px 24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--ink, #0D0F0A)",
            margin: 0,
          }}
        >
          Petra'da Özel Bir Gün İçin Rezervasyon
        </h3>
        <p style={{ fontSize: "14px", color: "#555A4C", maxWidth: "50ch", margin: 0 }}>
          Kahvaltı, öğle/akşam yemeği veya havuz başı keyif için hemen online masanızı ayırtın.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "4px" }}>
          <Link href="/#rezervasyon" className="btn btn--light" style={{ minHeight: "44px", fontSize: "14px" }}>
            <CalendarCheck size={15} />
            Masa Rezervasyonu
          </Link>
          <a href={`tel:${telHref}`} className="btn" style={{ minHeight: "44px", fontSize: "14px" }}>
            <Phone size={14} />
            {tel}
          </a>
        </div>
      </div>

      <style>{`
        .blog-article__body h2 {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          margin: 32px 0 12px;
          letter-spacing: -0.01em;
        }
        .blog-article__body h3 {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: clamp(17px, 2vw, 21px);
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          margin: 24px 0 10px;
        }
        .blog-article__body p {
          margin: 0 0 18px;
          line-height: 1.8;
          color: #383C30;
        }
        .blog-article__body ul, .blog-article__body ol {
          margin: 0 0 22px;
          padding-left: 24px;
          display: grid;
          gap: 8px;
        }
        .blog-article__body li {
          line-height: 1.7;
          color: #383C30;
        }
        .blog-article__body .answer {
          margin: 24px 0 28px;
          padding: 20px 24px;
          border-radius: 18px;
          background: rgba(124, 139, 79, 0.12);
          border-left: 4px solid var(--olive, #7C8B4F);
        }
        .blog-article__body .answer b {
          display: block;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--olive-lo, #5A6838);
          margin-bottom: 6px;
        }
        .blog-article__body .answer p {
          margin: 0;
          font-size: 15.5px;
          color: var(--ink, #0D0F0A);
        }
        .blog-article__body .cta-box {
          margin-top: 36px !important;
          padding: 28px 30px !important;
          background: #FFFFFF !important;
          border: 1.5px solid rgba(184, 132, 44, 0.3) !important;
          border-radius: 22px !important;
          box-shadow: 0 10px 30px rgba(13, 15, 10, 0.05) !important;
          color: #0D0F0A !important;
        }
        .blog-article__body .cta-box h2 {
          margin: 0 0 8px 0 !important;
          font-family: var(--f-head, "Playfair Display", Georgia, serif) !important;
          font-size: 1.4rem !important;
          font-weight: 700 !important;
          color: #0D0F0A !important;
        }
        .blog-article__body .cta-box p {
          margin: 0 0 16px 0 !important;
          color: #5E594D !important;
          font-size: 0.95rem !important;
        }
        .blog-article__body .cta-box .btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 46px !important;
          padding: 0 24px !important;
          border-radius: 999px !important;
          background: var(--brass, #D9A441) !important;
          color: #0D0F0A !important;
          font-weight: 700 !important;
          font-size: 14.5px !important;
          text-decoration: none !important;
          box-shadow: 0 6px 18px rgba(217, 164, 65, 0.25) !important;
          transition: all 0.2s ease !important;
        }
      `}</style>
    </article>
  );
}
