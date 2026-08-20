import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import { readLegacyBlogArticleHtml } from "@/lib/content/blog-legacy";
import { sanitizeArticleHtml } from "@/lib/security/html";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Sparkles, UtensilsCrossed, BookOpen } from "lucide-react";

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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans">
      {/* Ekmek Kırıntısı (Breadcrumbs) */}
      <nav className="flex items-center gap-2 text-xs font-medium text-[#8A9BB0] mb-8" aria-label="Sayfa yolu">
        <Link href="/" className="hover:text-[#C8703A] transition">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#C8703A] transition">
          Blog
        </Link>
        <span>/</span>
        <span className="text-[#EEE9E0] font-semibold truncate max-w-[240px] sm:max-w-none" aria-current="page">
          {post.baslik}
        </span>
      </nav>

      {/* Makale Başlık & Meta */}
      <header className="mb-10 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <span className="rounded-full bg-[#D9A441]/15 border border-[#D9A441]/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
            {post.kategori || "Rehber & Hikaye"}
          </span>
          {post.okumaSuresi && (
            <span className="flex items-center gap-1 text-xs text-[#8A9BB0]">
              <Clock className="h-3.5 w-3.5 text-[#D9A441]" />
              {post.okumaSuresi}
            </span>
          )}
          {post.tarih && (
            <span className="flex items-center gap-1 text-xs text-[#6B7A94]">
              <Calendar className="h-3.5 w-3.5" />
              {post.tarih}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F8F6F0] leading-[1.2] mb-6">
          {post.baslik}
        </h1>

        {post.ozet && (
          <p className="text-base sm:text-lg text-[#B0BAC7] leading-relaxed border-l-2 border-[#D9A441] pl-4 sm:pl-6 my-6 italic bg-white/[0.02] py-3 rounded-r-xl">
            {post.ozet}
          </p>
        )}
      </header>

      {/* Kapak Görseli */}
      {cover && (
        <figure className="mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121824] shadow-2xl">
          <SafeImg
            src={cover}
            alt={post.baslik}
            fallback={SITE_PHOTOS.interior}
            className="w-full h-[320px] sm:h-[450px] object-cover"
          />
        </figure>
      )}

      {/* Makale İçeriği (Editorial Tipografi) */}
      <article className="prose prose-invert prose-amber max-w-none mb-16 text-[#C8D0DC] leading-relaxed text-base sm:text-lg">
        {bodyHtml ? (
          <div
            className="blog-article-content space-y-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-[#F8F6F0] [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:leading-relaxed [&>p]:text-[#C8D0DC] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>div.answer]:bg-[#141E2E]/90 [&>div.answer]:border [&>div.answer]:border-[#D9A441]/25 [&>div.answer]:rounded-2xl [&>div.answer]:p-6 [&>div.answer]:my-6 [&>div.cta-box]:hidden"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <p>{post.ozet}</p>
        )}
      </article>

      {/* Yazar / Restoran Damgası */}
      <div className="my-10 rounded-2xl border border-white/[0.08] bg-[#121824]/70 p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/25 flex items-center justify-center text-[#D9A441]">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F8F6F0]">Petra Cafe Restaurant Ekibi</p>
            <p className="text-xs text-[#8A9BB0]">Taşdelen, Çekmeköy · Yaşam & Lezzet Merkezi</p>
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-[#EEE9E0] hover:border-[#D9A441]/40 hover:text-[#D9A441] transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Tüm Yazılara Dön
        </Link>
      </div>

      {/* Rezervasyon Çağrı Kutusu */}
      <div className="my-12 rounded-3xl border border-[#D9A441]/30 bg-gradient-to-r from-[#1A2333] to-[#121824] p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F6F0] mb-2">
          Masanızı Şimdiden Ayırtın
        </h3>
        <p className="text-sm sm:text-base text-[#9EABB8] max-w-lg mx-auto mb-6">
          Hafta sonu kahvaltısı, akşam yemeği veya özel günleriniz için 30 saniyede online rezervasyon yapın.
        </p>
        <Link
          href="/#rezervasyon"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D9A441] hover:bg-[#E5B558] text-[#0A0D14] px-8 py-3.5 text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#D9A441]/20 hover:scale-[1.02]"
        >
          <UtensilsCrossed className="h-4 w-4" />
          Rezervasyon Formu
        </Link>
      </div>

      {/* Önerilen Diğer Yazılar */}
      {otherPosts.length > 0 && (
        <section className="pt-10 border-t border-white/[0.08]">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#F8F6F0] mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#D9A441]" />
            İlginizi Çekebilir
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {otherPosts.map((other) => {
              const otherCover = resolveMediaUrl(liveMedia(other.kapak, SITE_PHOTOS.interior));
              return (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121824]/60 p-5 transition hover:border-[#D9A441]/35 hover:bg-[#121824]"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#D9A441] uppercase tracking-wider">
                      {other.kategori || "Blog"}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#F8F6F0] group-hover:text-[#D9A441] transition-colors my-2">
                      {other.baslik}
                    </h4>
                    {other.ozet && (
                      <p className="text-xs text-[#8A9BB0] line-clamp-2">{other.ozet}</p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D9A441] mt-4">
                    Oku <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
