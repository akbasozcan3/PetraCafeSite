import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { cleanRawText } from "@/lib/content/markdown-parser";
import {
  Calendar,
  Clock,
  ArrowRight,
  Phone,
  CalendarCheck,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const b = content?.sayfalar?.blog;
  const brand = content?.brand?.displayName || "Petra Cafe Restaurant";
  const title = `Petra Defteri & Blog | ${brand}`;
  const description =
    cleanRawText(b?.lead || "") ||
    "Petra Cafe Restaurant lezzet rehberi, serpme kahvaltı, şefin önerileri, havuz & etkinlik ipuçları.";
  return {
    title,
    description,
    alternates: { canonical: "https://petra-cafe-site.vercel.app/blog" },
    openGraph: {
      title,
      description,
      url: "https://petra-cafe-site.vercel.app/blog",
      type: "website",
      siteName: brand,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(tel);

  return (
    <div className="page-hakkimizda page-blog" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 24px) 60px" }}>
      {/* 1. BREADCRUMBS (En Üst Navigasyon) */}
      <div style={{ margin: "12px 0 20px" }}>
        <Breadcrumbs items={[{ label: "Blog & Gastronomi" }]} />
      </div>

      {/* 2. EDİTORYAL BAŞLIK ALANI */}
      <header className="about-head-sec" style={{ paddingBottom: 0, marginBottom: "32px", borderBottom: "none" }}>
        <div className="about-head-sec__badge" style={{ display: "inline-flex", width: "fit-content" }}>
          <BookOpen size={14} />
          <span>{cleanRawText(b?.eyebrow || "") || "PETRA DEFTERİ"}</span>
        </div>

        <h1 className="about-head-sec__title">
          {cleanRawText(b?.baslik || "") || "Lezzet, Kahvaltı & Yaşam Rehberi"}
        </h1>

        <p className="about-head-sec__lead" style={{ maxWidth: "62ch" }}>
          {cleanRawText(b?.lead || "") ||
            "Taşdelen'in gözde buluşma noktasından şefin tarif sırları, mevsimsel lezzet kartları, masa rezervasyonu ve havuz rehberi."}
        </p>
      </header>

      {/* 2. MAKALE LİSTESİ — MODERN EDİTORYAL KARTLAR */}
      {!posts.length ? (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(13, 15, 10, 0.08)",
            padding: "48px 24px",
            textAlign: "center",
            color: "var(--muted, #6E6A5C)",
          }}
        >
          <Sparkles size={32} style={{ margin: "0 auto 12px", opacity: 0.5 }} />
          <p style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Henüz yayınlanmış bir yazı bulunmuyor.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginTop: "12px",
          }}
        >
          {posts.map((m, idx) => {
            const cover = resolveMediaUrl(liveMedia(m.kapak, idx % 2 === 0 ? SITE_PHOTOS.interior : SITE_PHOTOS.facade));
            return (
              <Link
                key={m.slug}
                href={`/blog/${m.slug}`}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "22px",
                  border: "1.5px solid rgba(13, 15, 10, 0.08)",
                  boxShadow: "0 8px 24px -8px rgba(13, 15, 10, 0.06)",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="blog-card-hover"
              >
                {/* Kapak Görseli */}
                {cover ? (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9.5", overflow: "hidden", background: "#16190F" }}>
                    <SafeImg
                      src={cover}
                      alt={cleanRawText(m.baslik || "")}
                      fallback={SITE_PHOTOS.interior}
                      className="w-full h-full object-cover"
                    />
                    {m.kategori ? (
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: "rgba(13, 15, 10, 0.8)",
                          backdropFilter: "blur(8px)",
                          color: "#D9A441",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "999px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          border: "1px solid rgba(217, 164, 65, 0.3)",
                        }}
                      >
                        {cleanRawText(m.kategori)}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {/* Kart Gövdesi */}
                <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: "1 1 auto", justifyContent: "space-between" }}>
                  <div>
                    {/* Meta Bilgiler (Tarih + Okuma Süresi) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "12px", color: "var(--muted, #6E6A5C)", fontWeight: 500, marginBottom: "10px" }}>
                      {m.tarih ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={13} color="var(--brass-lo, #B8842C)" />
                          {m.tarih}
                        </span>
                      ) : null}
                      {m.okumaSuresi ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={13} color="var(--brass-lo, #B8842C)" />
                          {m.okumaSuresi}
                        </span>
                      ) : null}
                    </div>

                    {/* Makale Başlığı */}
                    <h2
                      style={{
                        fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
                        fontSize: "clamp(18px, 1.8vw, 21px)",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: "var(--ink, #0D0F0A)",
                        margin: "0 0 10px",
                      }}
                    >
                      {cleanRawText(m.baslik)}
                    </h2>

                    {/* Makale Özeti */}
                    {m.ozet ? (
                      <p
                        style={{
                          fontSize: "13.5px",
                          lineHeight: 1.6,
                          color: "#555A4C",
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {cleanRawText(m.ozet)}
                      </p>
                    ) : null}
                  </div>

                  {/* Devamını Oku Butonu */}
                  <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid rgba(13, 15, 10, 0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--brass-lo, #B8842C)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      Yazıyı Oku <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 3. REZERVASYON & İLETİŞİM BANNER */}
      <section
        style={{
          marginTop: "48px",
          background: "var(--cream-2, #F3EDE0)",
          borderRadius: "24px",
          border: "1.5px solid rgba(13, 15, 10, 0.08)",
          padding: "clamp(28px, 4vw, 40px)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--f-head, 'Playfair Display', Georgia, serif)",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 600,
            color: "var(--ink, #0D0F0A)",
            margin: 0,
          }}
        >
          {cleanRawText(b?.ctaBaslik || "") || "Petra'da Masanızı Hazırlayalım"}
        </h2>
        <p style={{ fontSize: "14.5px", color: "#555A4C", maxWidth: "56ch", margin: 0 }}>
          {cleanRawText(b?.ctaMetin || "") ||
            "Zengin serpme kahvaltımız, taş fırın lezzetlerimiz ve açık havuzumuzla keyif dolu bir gün için yerinizi ayırtın."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "6px", justifyContent: "center" }}>
          <Link href="/#rezervasyon" className="btn btn--light">
            <CalendarCheck size={16} />
            Masa Rezervasyonu Yap
          </Link>
          <a href={`tel:${telHref}`} className="btn">
            <Phone size={15} />
            {tel}
          </a>
        </div>
      </section>

      <style>{`
        .blog-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(184, 132, 44, 0.4) !important;
          box-shadow: 0 16px 36px -10px rgba(184, 132, 44, 0.18) !important;
        }
        .blog-card-hover:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
