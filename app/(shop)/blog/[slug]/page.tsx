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
    title: post.baslik,
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
          {post.tarih ? <time>{post.tarih}</time> : null}
          {post.okumaSuresi ? (
            <>
              <span>·</span>
              <span>{post.okumaSuresi}</span>
            </>
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
    </article>
  );
}
