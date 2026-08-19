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

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);
  const tel = content.iletisim?.telefon || "";
  const telHref = phoneToTelHref(
    content.iletisim?.telefonHam || content.iletisim?.telefon || ""
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
        <h1>{b?.baslik || "Petra defteri"}</h1>
        {b?.lead ? <p>{b.lead}</p> : null}
      </header>

      {!posts.length ? (
        <div className="shop-card">
          <p>Henüz yayınlanmış yazı yok.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((m) => {
            const cover = resolveMediaUrl(liveMedia(m.kapak, SITE_PHOTOS.interior));
            return (
              <Link className="blog-card" href={`/blog/${m.slug}`} key={m.slug}>
                <span className="blog-card__cover">
                  <SafeImg
                    src={cover || SITE_PHOTOS.interior}
                    alt={m.baslik}
                    fallback={SITE_PHOTOS.interior}
                  />
                </span>
                <span className="blog-card__body">
                  <span className="blog-card__meta">
                    {m.kategori ? <b>{m.kategori}</b> : null}
                    {m.tarih ? <time>{m.tarih}</time> : null}
                    {m.okumaSuresi ? <em>{m.okumaSuresi}</em> : null}
                  </span>
                  <h2>{m.baslik}</h2>
                  {m.ozet ? <p>{m.ozet}</p> : null}
                  <span className="blog-card__more">Yazıyı oku</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div className="cta-box">
        <h2>{b?.ctaBaslik || "Masa veya havuz için yazın"}</h2>
        <p>
          {b?.ctaMetin ||
            "Rezervasyon ve sorularınız için bizi arayın veya Instagram’dan yazın."}
        </p>
        {telHref ? (
          <a href={`tel:${telHref}`} className="btn btn--lg">
            {tel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
