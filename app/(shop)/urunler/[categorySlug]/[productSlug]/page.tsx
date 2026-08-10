import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getContentAsync } from "@/lib/db/content";
import {
  findCategory,
  findProduct,
  formatPriceLabel,
  parsePriceNumber,
  relatedProducts,
} from "@/lib/catalog/catalog";
import { categoryHref, productHref } from "@/lib/content/slugify";
import { productGallery, resolveProductImage } from "@/lib/catalog/product-image";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import MenuProductCard from "@/components/shop/MenuProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 60;

type Props = {
  params: Promise<{ categorySlug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const content = await getContentAsync();
  const product = findProduct(content, categorySlug, productSlug);
  if (!product) return { title: "Ürün" };

  const title = product.seoTitle || product.ad;
  const description =
    product.seoDescription ||
    product.aciklama ||
    product.not ||
    `${product.ad} — Taşdelen Fırıncı`;
  const img = resolveProductImage(product, product.category);

  return {
    title,
    description,
    alternates: { canonical: product.href },
    openGraph: {
      title: `${title} | Taşdelen Fırıncı`,
      description,
      images: img.source !== "fallback" ? [{ url: img.url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params;
  const content = await getContentAsync();

  if (categorySlug === productSlug) {
    const cat = findCategory(content, categorySlug);
    if (cat) redirect(categoryHref(categorySlug));
  }

  const product = findProduct(content, categorySlug, productSlug);
  if (!product) notFound();

  const gallery = productGallery(product, product.category);
  const price = formatPriceLabel(product.fiyat);
  const related = relatedProducts(content, product, 6);
  const priceNum = parsePriceNumber(product.fiyat);
  const catHref = categoryHref(product.categorySlug);
  const phoneRaw =
    content.iletisim?.telefonHam ||
    content.iletisim?.telefon ||
    "+905523400202";
  const phoneHref = `tel:${String(phoneRaw).replace(/[^\d+]/g, "") || "+905523400202"}`;

  const specs = [
    product.icindekiler
      ? { title: "İçindekiler", body: product.icindekiler }
      : null,
    product.alerjen ? { title: "Alerjen Bilgisi", body: product.alerjen } : null,
    product.saklama
      ? { title: "Saklama Koşulları", body: product.saklama }
      : null,
    product.not && product.not !== product.aciklama
      ? { title: "Not", body: product.not }
      : null,
  ].filter(Boolean) as { title: string; body: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.ad,
    description: product.aciklama || product.not || undefined,
    image:
      gallery.primary.source !== "fallback" ? gallery.primary.url : undefined,
    brand: { "@type": "Brand", name: "Taşdelen Fırıncı" },
    ...(priceNum != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            price: priceNum,
            availability: "https://schema.org/InStock",
            url: product.href,
          },
        }
      : {}),
  };

  return (
    <div className="pd-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pd-crumb" aria-label="Sayfa yolu">
        <Link href="/urunler">Menü</Link>
        <span aria-hidden="true">/</span>
        <Link href={catHref}>{product.categoryName}</Link>
        <span aria-hidden="true">/</span>
        <span>{product.ad}</span>
      </nav>

      <ProductDetailClient
        ad={product.ad}
        slug={product.slug!}
        fiyat={price || undefined}
        image={gallery.primary.url}
        href={product.href}
        gallery={gallery.urls}
        varyantlar={product.varyantlar}
        ozelSiparis={product.ozelSiparis}
        categoryName={product.categoryName}
        categoryHref={catHref}
        aciklama={product.aciklama || product.not || undefined}
        phoneHref={phoneHref}
      />

      {specs.length ? (
        <section className="pd-specs" aria-label="Ürün bilgileri">
          {specs.map((s) => (
            <article key={s.title} className="pd-specs__item">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      {related.length ? (
        <section className="pd-related">
          <div className="pd-related__head">
            <h2>Benzer Ürünler</h2>
            <Link href={catHref}>Kategorinin tamamı</Link>
          </div>
          <ul className="ys-list pd-related__list">
            {related.map((r) => {
              const img = resolveProductImage(r, r.category);
              const href = productHref(r.slug!, r.categorySlug);
              const rPrice = formatPriceLabel(r.fiyat);
              return (
                <MenuProductCard
                  key={r.slug}
                  ad={r.ad}
                  slug={r.slug!}
                  href={href}
                  fiyatLabel={rPrice || "Fiyat sorulur"}
                  hasPrice={Boolean(rPrice)}
                  desc={r.aciklama || r.not || undefined}
                  imageUrl={img.url}
                  imageAlt={img.alt}
                  ozelSiparis={Boolean(r.ozelSiparis)}
                />
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
