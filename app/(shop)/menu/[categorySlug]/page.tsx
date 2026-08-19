import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
import {
  findCategory,
  findProductBySlugOnly,
  formatPriceLabel,
  getCategorySlug,
  getProductSlug,
  isProductActive,
  listCategories,
} from "@/lib/catalog/catalog";
import { categoryHref, productHref } from "@/lib/content/slugify";
import { resolveProductImage } from "@/lib/catalog/product-image";
import { sanitizeArticleHtml } from "@/lib/security/html";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import MenuProductCard from "@/components/shop/MenuProductCard";

export const revalidate = 60;

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const content = await getPublicContent();
  const cat = findCategory(content, categorySlug);
  if (!cat) {
    const product = findProductBySlugOnly(content, categorySlug);
    if (product) {
      return {
        title: product.ad,
        description: product.aciklama || product.not || undefined,
      };
    }
    return { title: "Kategori", robots: { index: false, follow: true } };
  }
  return {
    title: cat.ad,
    description: cat.aciklama || `${cat.ad} — Petra Cafe Restaurant`,
    alternates: { canonical: categoryHref(getCategorySlug(cat)) },
    openGraph: {
      title: `${cat.ad} | Petra Cafe Restaurant`,
      description: cat.aciklama || undefined,
    },
    twitter: {
      card: "summary",
      title: `${cat.ad} | Petra Cafe Restaurant`,
      description: cat.aciklama || undefined,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const content = await getPublicContent();
  const cat = findCategory(content, categorySlug);

  if (!cat) {
    const product = findProductBySlugOnly(content, categorySlug);
    if (product) redirect(product.href);
    notFound();
  }

  const slug = getCategorySlug(cat);
  const products = (cat.urunler || []).filter(isProductActive);
  const allCats = listCategories(content);
  const hub = content.sayfalar?.urunKategori;

  return (
    <div className="menu-page">
      <header className="menu-page__hero menu-page__hero--sm">
        <p className="menu-page__crumb">
          <Link href="/menu">Menü</Link>
          <span aria-hidden="true"> / </span>
          {cat.ad}
        </p>
        <p className="menu-page__kicker">{hub?.eyebrow || "Menü"}</p>
        <h1>{cat.ad}</h1>
        {cat.aciklama ? <p className="menu-page__lead">{cat.aciklama}</p> : null}
        {cat.banner ? (
          <p className="menu-page__banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveMediaUrl(liveMedia(cat.banner, SITE_PHOTOS.interior))}
              alt=""
            />
          </p>
        ) : null}
      </header>

      <nav className="menu-page__toc" aria-label="Menü bölümleri">
        <Link href="/menu">Tümü</Link>
        {allCats.map((g) => {
          const s = getCategorySlug(g);
          return (
            <Link
              key={s}
              href={categoryHref(s)}
              className={s === slug ? "is-active" : undefined}
            >
              {g.ad}
            </Link>
          );
        })}
      </nav>

      {!products.length ? (
        <p className="menu-page__empty">{content.menu?.emptyMetin || "Bu bölümde henüz tabak yok."}</p>
      ) : (
        <ul className="menu-page__list">
          {products.map((u) => {
            const pSlug = getProductSlug(u);
            const href = productHref(pSlug, slug);
            const img = resolveProductImage(u, cat);
            const price = formatPriceLabel(u.fiyat);
            return (
              <MenuProductCard
                key={pSlug}
                ad={u.ad}
                slug={pSlug}
                href={href}
                fiyatLabel={price || hub?.fiyatSorulur || "Fiyat sorulur"}
                hasPrice={Boolean(price)}
                desc={u.aciklama || u.not || undefined}
                imageUrl={img.url}
                imageAlt={img.alt}
                ozelSiparis={Boolean(u.ozelSiparis)}
              />
            );
          })}
        </ul>
      )}

      {cat.govdeHtml ? (
        <article
          className="menu-page__article"
          dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(cat.govdeHtml) }}
        />
      ) : null}

      {cat.sss?.length ? (
        <section className="menu-page__faq" aria-label="Sık sorulanlar">
          {cat.sss
            .filter((item) => item.soru?.trim() && item.cevap?.trim())
            .map((item) => (
              <details key={item.soru}>
                <summary>{item.soru}</summary>
                <p>{item.cevap}</p>
              </details>
            ))}
        </section>
      ) : null}
    </div>
  );
}
