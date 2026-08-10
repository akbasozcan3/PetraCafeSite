import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import { readLegacyBlogArticleHtml } from "@/lib/content/blog-legacy";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) return { title: "Yazı bulunamadı" };
  return {
    title: post.baslik,
    description: post.ozet || post.baslik,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.baslik,
      description: post.ozet || undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const content = await getPublicContent();
  const post = (content.makaleler || []).find((m) => m.slug === slug);
  if (!post || post.yayinda === false) notFound();

  const bodyHtml = post.govdeHtml || readLegacyBlogArticleHtml(slug);

  return (
    <div className="section">
      <div className="wrap">
        <article className="article blog-article">
          <nav className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span aria-current="page">{post.baslik}</span>
          </nav>

          <header className="article__head">
            <h1>{post.baslik}</h1>
            <div className="article__meta">
              {post.tarih ? <time>{post.tarih}</time> : null}
              {post.okumaSuresi ? (
                <>
                  <span>·</span>
                  <span>{post.okumaSuresi}</span>
                </>
              ) : null}
              {post.kategori ? (
                <>
                  <span>·</span>
                  <span>{post.kategori}</span>
                </>
              ) : null}
            </div>
            {post.ozet ? <p className="article__lead">{post.ozet}</p> : null}
          </header>

          {bodyHtml ? (
            <div
              className="blog-article__body"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="body">{post.ozet}</p>
          )}
        </article>
      </div>
    </div>
  );
}
