import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";
import { phoneToTelHref } from "@/lib/content/contact-utils";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SafeImg from "@/components/site/SafeImg";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const title = b?.baslik || "Blog";
  const description =
    b?.lead ||
    "Rezervasyon, kahvaltı, havuz ve mekân üzerine kısa yazılar.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
  };
}

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

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "0530 608 90 51";
  const telHref = phoneToTelHref(
    content.iletisim?.telefonHam || content.iletisim?.telefon || "05306089051"
  );

  return (
    <div className="shop-blog">
      <nav className="crumbs" aria-label="Sayfa yolu">
        <Link href="/">Ana Sayfa</Link>
        <span>/</span>
        <span aria-current="page">Blog</span>
      </nav>

      <header className="ys-hero ys-hero--sm">
        <p className="ys-hero__eyebrow">{b?.eyebrow || "Blog"}</p>
        <h1>{b?.baslik || "Petra Defteri"}</h1>
        {b?.lead ? <p>{b.lead}</p> : null}
      </header>

      {!posts.length ? (
        <div className="shop-card">
          <p>Henüz yayınlanmış yazı yok.</p>
        </div>
      ) : (
        <div className="blog-list">
          {posts.map((m) => {
            const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
            return (
              <Link
                className="post-magazine-card"
                href={`/blog/${m.slug}`}
                key={m.slug}
              >
                {cover ? (
                  <div className="post-magazine-card__thumb">
                    <SafeImg
                      src={cover}
                      alt={m.baslik}
                      fallback={SITE_PHOTOS.interior}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div className="post-magazine-card__body">
                  <div>
                    <div className="post-magazine-card__meta">
                      {m.kategori ? (
                        <span className="post-magazine-card__badge">
                          {m.kategori}
                        </span>
                      ) : null}
                      {m.tarih ? (
                        <span className="post-magazine-card__info">
                          <CalendarIcon />
                          {m.tarih}
                        </span>
                      ) : null}
                      {m.okumaSuresi ? (
                        <span className="post-magazine-card__info">
                          <ClockIcon />
                          {m.okumaSuresi}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="post-magazine-card__title">
                      {m.baslik}
                    </h2>

                    {m.ozet ? (
                      <p className="post-magazine-card__lead">
                        {m.ozet}
                      </p>
                    ) : null}
                  </div>

                  <div className="post-magazine-card__footer">
                    <span className="post-magazine-card__btn">
                      Yazıyı İncele <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="blog-cta-banner">
        <h2>{b?.ctaBaslik || "Masa veya Havuz İçin Rezervasyon"}</h2>
        <p>
          {b?.ctaMetin ||
            "Taşdelen'in huzurlu atmosferinde keyifli bir gün için online rezervasyon yapın veya bizi arayın."}
        </p>
        <div className="blog-cta-actions">
          <Link href="/#rezervasyon" className="btn btn--lg btn--light">
            <CalendarCheckIcon />
            Rezervasyon Formu
          </Link>
          {telHref ? (
            <a href={`tel:${telHref}`} className="btn btn--lg btn--ghost">
              <PhoneIcon />
              {tel}
            </a>
          ) : null}
        </div>
      </div>

      <style>{`
        .blog-list {
          display: grid;
          gap: 24px;
          margin: 28px 0;
        }
        .post-magazine-card {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 28px;
          padding: 22px;
          background: var(--card-bg, #ffffff);
          border-radius: 22px;
          border: 1px solid var(--card-border, rgba(13, 15, 10, 0.09));
          box-shadow: 0 10px 30px rgba(13, 15, 10, 0.05);
          text-decoration: none !important;
          color: var(--card-text, #12140E) !important;
          transition: all 0.2s ease;
        }
        .post-magazine-card:hover {
          border-color: var(--brass, rgba(184, 132, 44, 0.5));
          box-shadow: 0 14px 36px rgba(184, 132, 44, 0.15);
          transform: translateY(-2px);
        }
        .post-magazine-card__thumb {
          flex: 0 0 320px;
          width: 320px;
          height: 210px;
          border-radius: 16px;
          overflow: hidden;
          background: #141810;
        }
        .post-magazine-card__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .post-magazine-card__body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4px 0;
          min-width: 0;
        }
        .post-magazine-card__meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 14px;
          margin-bottom: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .post-magazine-card__badge {
          background: rgba(217, 164, 65, 0.16);
          color: var(--brass, #B8842C);
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
        }
        .post-magazine-card__info {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--card-muted, #6E6A5C);
          font-size: 0.78rem;
        }
        .post-magazine-card__title {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: clamp(1.25rem, 2.2vw, 1.45rem);
          font-weight: 700;
          line-height: 1.3;
          color: var(--card-text, #12140E);
          margin: 0 0 10px 0;
        }
        .post-magazine-card__lead {
          font-size: 0.96rem;
          line-height: 1.6;
          color: var(--card-muted, #5E594D);
          margin: 0;
        }
        .post-magazine-card__footer {
          margin-top: 16px;
        }
        .post-magazine-card__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--brass, #B8842C);
        }

        .blog-cta-banner {
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--card-border, rgba(184, 132, 44, 0.25));
          border-radius: 22px;
          padding: 32px 28px;
          margin-top: 40px;
          box-shadow: 0 10px 30px rgba(13,15,10,0.05);
          color: var(--card-text, #12140E);
        }
        .blog-cta-banner h2 {
          font-family: var(--f-head, "Playfair Display", Georgia, serif);
          font-size: 1.45rem;
          color: var(--card-text, #12140E);
          font-weight: 700;
          margin: 0 0 8px 0;
        }
        .blog-cta-banner p {
          color: var(--card-muted, #5E594D);
          font-size: 0.96rem;
          line-height: 1.6;
          margin: 0 0 20px 0;
        }
        .blog-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .blog-cta-actions .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .post-magazine-card {
            flex-direction: column !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          .post-magazine-card__thumb {
            flex: none !important;
            width: 100% !important;
            height: 200px !important;
          }
          .post-magazine-card__body {
            padding: 0 !important;
          }
          .post-magazine-card__title {
            font-size: 1.25rem !important;
          }
          .blog-cta-banner {
            padding: 22px 18px !important;
          }
          .blog-cta-actions .btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
