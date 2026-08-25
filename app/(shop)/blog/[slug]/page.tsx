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
  ArrowRight,
  CalendarCheck,
  Phone,
  Bookmark,
  MessageCircle,
  MapPin,
  Sparkles,
  Share2,
  Utensils,
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
  const wa = content.iletisim?.whatsapp || "905306089051";
  const waClean = wa.replace(/\D/g, "");
  const waHref = `https://wa.me/${waClean}?text=${encodeURIComponent("Merhaba, rezervasyon hakkında bilgi almak istiyorum.")}`;
  const adres = content.iletisim?.adresSatir1 || "Taşdelen, Çekmeköy / İstanbul";

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
    <article className="page-hakkimizda page-article" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px) 80px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. EDİTORYAL BAŞLIK ALANI (Geniş & Ferah) */}
      <header className="article__head" style={{ marginBottom: "28px", maxWidth: "920px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {/* Satır 1: Breadcrumb */}
        <div style={{ marginBottom: "10px", width: "100%", display: "block" }}>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: cleanRawText(post.baslik) },
            ]}
          />
        </div>

        {/* Satır 2: Kategori Rozeti */}
        {post.kategori ? (
          <div style={{ marginBottom: "16px", display: "block" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 14px",
                borderRadius: "999px",
                background: "rgba(217, 164, 65, 0.12)",
                color: "var(--brass-lo, #B8842C)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <Bookmark size={13} />
              <span>{cleanRawText(post.kategori)}</span>
            </div>
          </div>
        ) : null}

        <h1
          style={{
            fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
            fontSize: "clamp(28px, 4.4vw, 48px)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "var(--ink, #0D0F0A)",
            margin: "0 0 18px",
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
            gap: "20px",
            fontSize: "13.5px",
            color: "var(--muted, #6E6A5C)",
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(13, 15, 10, 0.1)",
          }}
        >
          {post.tarih ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Calendar size={15} color="var(--brass-lo, #B8842C)" />
              <time>{post.tarih}</time>
            </span>
          ) : null}
          {post.okumaSuresi ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Clock size={15} color="var(--brass-lo, #B8842C)" />
              <span>{post.okumaSuresi}</span>
            </span>
          ) : null}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--olive-lo, #5A6838)" }} />
            <span>{brandName} Mutfak & Yaşam Ekibi</span>
          </span>
        </div>

        {post.ozet ? (
          <p
            style={{
              fontSize: "clamp(17px, 1.8vw, 20.5px)",
              lineHeight: 1.6,
              color: "#35392D",
              margin: "24px 0 0",
              fontWeight: 500,
            }}
          >
            {cleanRawText(post.ozet)}
          </p>
        ) : null}
      </header>

      {/* 3. BÜYÜK SİNEMATİK KAPAK GÖRSELİ (16:9 Oranlı, Geniş & Şık) */}
      {cover ? (
        <figure
          style={{
            margin: "0 0 44px",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1.5px solid rgba(13, 15, 10, 0.08)",
            boxShadow: "0 16px 40px -12px rgba(13, 15, 10, 0.12)",
            background: "#16190F",
            width: "100%",
            aspectRatio: "16 / 8.5",
            maxHeight: "460px",
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

      {/* 4. 2 KOLONLU EDİTORYAL DÜZEN (Sol: Geniş Makale Gövdesi, Sağ: Sticky Rezervasyon Paneli) */}
      <div
        className="blog-detail-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "44px",
          alignItems: "start",
        }}
      >
        <div style={{ maxWidth: "100%" }}>
          {/* Makale Gövdesi */}
          {bodyHtml ? (
            <div
              className="blog-article__body"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
              style={{
                fontSize: "17px",
                lineHeight: 1.85,
                color: "#2C3024",
              }}
            />
          ) : (
            <p style={{ fontSize: "17px", lineHeight: 1.85, color: "#2C3024" }}>{post.ozet}</p>
          )}

          {/* Makale Sonu Bilgilendirme ve Rezervasyon Butonları */}
          <div
            style={{
              marginTop: "48px",
              padding: "28px 30px",
              background: "var(--cream-2, #F3EDE0)",
              borderRadius: "22px",
              border: "1.5px solid rgba(13, 15, 10, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <h3 style={{ fontFamily: "var(--f-head, serif)", fontSize: "20px", fontWeight: 700, margin: "0 0 6px", color: "var(--ink, #0D0F0A)" }}>
                Petra'da Masanızı Ayırtın
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#5E594D", maxWidth: "46ch" }}>
                Günün her saatinde zengin menümüz ve huzurlu açık alanımızla hizmetinizdeyiz.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link href="/#rezervasyon" className="btn btn--light" style={{ minHeight: "44px", fontSize: "14px" }}>
                <CalendarCheck size={16} />
                Masa Rezervasyonu
              </Link>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn" style={{ minHeight: "44px", fontSize: "14px", background: "#25D366", color: "#0B140C" }}>
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. DİĞER YAZILARIMIZ / İLGİLİ MAKALELER */}
      {otherPosts.length > 0 ? (
        <section
          style={{
            marginTop: "60px",
            paddingTop: "36px",
            borderTop: "1.5px solid rgba(13, 15, 10, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brass-lo, #B8842C)", margin: "0 0 4px" }}>
                DEFTERDEN
              </p>
              <h2
                style={{
                  fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 600,
                  color: "var(--ink, #0D0F0A)",
                  margin: 0,
                }}
              >
                Diğer Makaleler & Rehberler
              </h2>
            </div>
            <Link
              href="/blog"
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--brass-lo, #B8842C)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Tüm Blog Yazıları <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "22px" }}>
            {otherPosts.map((op) => (
              <Link
                key={op.slug}
                href={`/blog/${op.slug}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1px solid rgba(13, 15, 10, 0.08)",
                  padding: "24px",
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "0 6px 20px -8px rgba(13, 15, 10, 0.06)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                className="blog-card-hover"
              >
                <div>
                  <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--brass-lo, #B8842C)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {cleanRawText(op.kategori || "Blog")}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--f-head, serif)",
                      fontSize: "18.5px",
                      fontWeight: 600,
                      color: "var(--ink, #0D0F0A)",
                      margin: "8px 0 10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {cleanRawText(op.baslik)}
                  </h3>
                  {op.ozet ? (
                    <p style={{ fontSize: "14px", color: "#6E6A5C", margin: "0 0 16px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {cleanRawText(op.ozet)}
                    </p>
                  ) : null}
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--olive-lo, #5A6838)", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  Okumaya Devam Et <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <style>{`
        .blog-article__body h2 {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          margin: 40px 0 16px;
          letter-spacing: -0.015em;
          line-height: 1.25;
        }
        .blog-article__body h3 {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: clamp(18px, 2.2vw, 23px);
          font-weight: 600;
          color: var(--ink, #0D0F0A);
          margin: 30px 0 12px;
          line-height: 1.35;
        }
        .blog-article__body p {
          margin: 0 0 20px;
          line-height: 1.85;
          color: #34382C;
          font-size: 17px;
        }
        .blog-article__body ul, .blog-article__body ol {
          margin: 0 0 26px;
          padding-left: 26px;
          display: grid;
          gap: 10px;
        }
        .blog-article__body li {
          line-height: 1.75;
          color: #34382C;
          font-size: 16.5px;
        }
        .blog-article__body .answer {
          margin: 28px 0 32px;
          padding: 24px 28px;
          border-radius: 20px;
          background: rgba(124, 139, 79, 0.12);
          border-left: 4px solid var(--olive, #7C8B4F);
        }
        .blog-article__body .answer b {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--olive-lo, #5A6838);
          margin-bottom: 8px;
        }
        .blog-article__body .answer p {
          margin: 0;
          font-size: 16.5px;
          color: var(--ink, #0D0F0A);
          line-height: 1.7;
        }
        .blog-article__body .cta-box {
          margin-top: 40px !important;
          padding: 32px 34px !important;
          background: #FFFFFF !important;
          border: 1.5px solid rgba(184, 132, 44, 0.35) !important;
          border-radius: 24px !important;
          box-shadow: 0 12px 36px rgba(13, 15, 10, 0.06) !important;
          color: #0D0F0A !important;
        }
        .blog-article__body .cta-box h2 {
          margin: 0 0 10px 0 !important;
          font-family: var(--f-head, "Playfair Display", Georgia, serif) !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: #0D0F0A !important;
        }
        .blog-article__body .cta-box p {
          margin: 0 0 18px 0 !important;
          color: #5E594D !important;
          font-size: 1rem !important;
        }
        .blog-article__body .cta-box .btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 48px !important;
          padding: 0 26px !important;
          border-radius: 999px !important;
          background: var(--brass, #D9A441) !important;
          color: #0D0F0A !important;
          font-weight: 700 !important;
          font-size: 15px !important;
          text-decoration: none !important;
          box-shadow: 0 6px 18px rgba(217, 164, 65, 0.25) !important;
          transition: all 0.2s ease !important;
        }
      `}</style>
    </article>
  );
}
