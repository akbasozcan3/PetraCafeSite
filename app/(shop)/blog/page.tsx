import type { Metadata } from "next";
import Link from "next/link";
import { getPublicContent } from "@/lib/db/content";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const title = b?.baslik || "Blog";
  const description =
    b?.lead ||
    "Ekşi maya, ekmek saklama ve pasta siparişi üzerine pratik rehberler.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title: `${title} | Taşdelen Fırıncı`,
      description,
    },
  };
}

export default async function BlogIndexPage() {
  const content = await getPublicContent();
  const b = content.sayfalar?.blog;
  const posts = (content.makaleler || []).filter((m) => m.yayinda !== false);

  return (
    <div className="section">
      <div className="wrap">
        <nav className="crumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <span aria-current="page">Blog</span>
        </nav>

        <div className="section__head">
          <p className="eyebrow">{b?.eyebrow || "Blog"}</p>
          <h1 className="h2">{b?.baslik || "Ekmeğin ardındaki bilgi"}</h1>
          {b?.lead ? <p className="lead">{b.lead}</p> : null}
        </div>

        <div className="posts blog-list">
          {posts.map((m) => (
            <Link className="post" href={`/blog/${m.slug}`} key={m.slug}>
              <div className="post__meta">
                {m.kategori ? <b>{m.kategori}</b> : null}
                {m.tarih ? <time>{m.tarih}</time> : null}
                {m.okumaSuresi ? <span>{m.okumaSuresi}</span> : null}
              </div>
              <div>
                <h2>{m.baslik}</h2>
                {m.ozet ? <p>{m.ozet}</p> : null}
              </div>
            </Link>
          ))}
        </div>

        <div className="cta-box">
          <h2>{b?.ctaBaslik || "Aklınıza takılan bir şey mi var?"}</h2>
          <p>
            {b?.ctaMetin ||
              "Fırına uğrayıp ustalarımıza sorabilir ya da doğrudan arayabilirsiniz."}
          </p>
          <a href="tel:+905523400202" className="btn btn--lg">
            0552 340 02 02
          </a>
        </div>
      </div>
    </div>
  );
}
