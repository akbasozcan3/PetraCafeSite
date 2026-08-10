import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getContentAsync } from "@/lib/db/content";
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
import MenuProductCard from "@/components/shop/MenuProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Props = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const content = await getContentAsync();
  const cat = findCategory(content, categorySlug);
  if (!cat) {
    const product = findProductBySlugOnly(content, categorySlug);
    if (product) {
      return {
        title: product.ad,
        description: product.aciklama || product.not || undefined,
      };
    }
    return { title: "Kategori" };
  }
  return {
    title: cat.ad,
    description: cat.aciklama || `${cat.ad} ürünleri — Taşdelen Fırıncı`,
    alternates: { canonical: categoryHref(getCategorySlug(cat)) },
    openGraph: {
      title: `${cat.ad} | Taşdelen Fırıncı`,
      description: cat.aciklama || undefined,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const content = await getContentAsync();
  const cat = findCategory(content, categorySlug);

  if (!cat) {
    const product = findProductBySlugOnly(content, categorySlug);
    if (product) redirect(product.href);
    notFound();
  }

  const slug = getCategorySlug(cat);
  const products = (cat.urunler || []).filter(isProductActive);
  const allCats = listCategories(content);

  return (
    <div className="ys ys--category">
      <header className="ys-hero ys-hero--sm">
        <p className="oc-crumb">
          <Link href="/urunler">Menü</Link> / {cat.ad}
        </p>
        <h1>{cat.ad}</h1>
        {cat.aciklama ? <p>{cat.aciklama}</p> : null}
      </header>

      <div className="ys-chips" aria-label="Kategoriler">
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
      </div>

      {!products.length ? (
        <div className="shop-card">
          <p>Bu kategoride henüz ürün bulunmuyor.</p>
          <div className="shop-actions">
            <Link className="shop-btn shop-btn--ghost" href="/urunler">
              Tüm menüye dön
            </Link>
          </div>
        </div>
      ) : (
        <ul className="ys-list">
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
                fiyatLabel={price || "Fiyat sorulur"}
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
    </div>
  );
}
