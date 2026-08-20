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

  return (
    <article className="shop-blog shop-article">
      <nav className="crumbs" aria-label="Sayfa yolu">
        <Link href="/">Ana Sayfa</Link>
        <span>/</span>
        <Link href="/blog">Blog</Link>
        <span>/</span>
        <span aria-current="page">{post.baslik}</span>
      </nav>

      <header className="article__head">
        <p className="ys-hero__eyebrow">{post.kategori || "Blog"}</p>
        <h1>{post.baslik}</h1>
        <div className="article__meta">
          {post.tarih ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <CalendarIcon />
              <time>{post.tarih}</time>
            </span>
          ) : null}
          {post.okumaSuresi ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <ClockIcon />
              <span>{post.okumaSuresi}</span>
            </span>
          ) : null}
        </div>
        {post.ozet ? <p className="article__lead">{post.ozet}</p> : null}
      </header>

      {cover ? (
        <figure className="article__cover">
          <SafeImg src={cover} alt={post.baslik} fallback={SITE_PHOTOS.interior} />
        </figure>
      ) : null}

      {bodyHtml ? (
        <div
          className="blog-article__body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : (
        <p className="body">{post.ozet}</p>
      )}

      <style>{`
        .blog-article__body .cta-box,
        .shop-article .cta-box {
          margin-top: 36px !important;
          padding: 30px 32px !important;
          background: #ffffff !important;
          border: 1px solid rgba(184, 132, 44, 0.25) !important;
          border-radius: 22px !important;
          box-shadow: 0 12px 32px rgba(13, 15, 10, 0.04) !important;
        }
        .blog-article__body .cta-box h2,
        .shop-article .cta-box h2 {
          margin: 0 0 10px 0 !important;
          font-family: var(--f-head, "Playfair Display", Georgia, serif) !important;
          font-size: 1.45rem !important;
          font-weight: 700 !important;
          color: #12140E !important;
          line-height: 1.25 !important;
        }
        .blog-article__body .cta-box p,
        .shop-article .cta-box p {
          margin: 0 0 18px 0 !important;
          color: #5E594D !important;
          font-size: 0.98rem !important;
          line-height: 1.6 !important;
        }
        .blog-article__body .cta-box .btn,
        .shop-article .cta-box .btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 48px !important;
          padding: 0 26px !important;
          border-radius: 999px !important;
          background: #D9A441 !important;
          color: #0D0F0A !important;
          font-weight: 700 !important;
          font-size: 15px !important;
          text-decoration: none !important;
          box-shadow: 0 8px 20px rgba(217, 164, 65, 0.25) !important;
          transition: all 0.2s ease !important;
        }
        .blog-article__body .cta-box .btn:hover,
        .shop-article .cta-box .btn:hover {
          background: #E5B55E !important;
          transform: translateY(-2px) !important;
        }
      `}</style>
    </article>
  );
}
