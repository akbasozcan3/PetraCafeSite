import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getPublicContent } from "@/lib/db/content";
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
import MasaCTA from "@/components/site/MasaCTA";

export const revalidate = 60;

type Props = {
  params: Promise<{ categorySlug: string; productSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const content = await getPublicContent();
  const product = findProduct(content, categorySlug, productSlug);
  if (!product) {
    return { title: "Tabak", robots: { index: false, follow: true } };
  }

  const title = product.seoTitle || product.ad;
  const description =
    product.seoDescription ||
    product.aciklama ||
    product.not ||
    `${product.ad} — Petra Cafe Restaurant`;
  const img = resolveProductImage(product, product.category);

  return {
    title,
    description,
    alternates: { canonical: product.href },
    openGraph: {
      title: `${title} | Petra Cafe Restaurant`,
      description,
      images: img.source !== "fallback" ? [{ url: img.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Petra Cafe Restaurant`,
      description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { categorySlug, productSlug } = await params;
  const content = await getPublicContent();

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
    "";
  const phoneHref = phoneRaw
    ? `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`
    : undefined;
  const whatsappBase =
    content.iletisim?.whatsapp ||
    content.iletisim?.telefonHam ||
    content.iletisim?.telefon ||
    "";
  const uk = content.sayfalar?.urunKategori;
  const detailNotes = (uk?.detayNotlari || "")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

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
    "@type": "MenuItem",
    name: product.ad,
    description: product.aciklama || product.not || undefined,
    image:
      gallery.primary.source !== "fallback" ? gallery.primary.url : undefined,
    menuAddOn: product.categoryName || undefined,
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
        <Link href="/menu">Menü</Link>
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
        whatsappBase={whatsappBase}
        notes={detailNotes}
        waLabel={uk?.detayWaLabel}
        telLabel={uk?.detayTelLabel}
        priceAskLabel={uk?.fiyatSorulur}
      />

      {specs.length ? (
        <section className="pd-specs" aria-label="Tabak bilgileri">
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
            <h2>{uk?.relatedBaslik || "Benzer tabaklar"}</h2>
            <Link href={catHref}>{uk?.relatedHepsi || "Bölümün tamamı"}</Link>
          </div>
          <ul className="menu-page__list pd-related__list">
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

      <MasaCTA
        tel={content.iletisim?.telefon || "0530 608 90 51"}
        telHref={(content.iletisim?.telefon || "0530 608 90 51").replace(/[^\d]/g, "")}
        baslik="Masa ayırtmak ister misiniz?"
        metin="Rezervasyon ve sorularınız için bizi arayın veya formdan yazın."
        btnLabel="Masa Rezervasyonu Yap"
      />
    </div>
  );
}
