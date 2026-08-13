import type { Metadata } from "next";
import Link from "next/link";
import { getContentAsync } from "@/lib/db/content";
import {
  formatPriceLabel,
  getCategorySlug,
  getProductSlug,
  isProductActive,
  listCategories,
} from "@/lib/catalog/catalog";
import { categoryHref, productHref } from "@/lib/content/slugify";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { resolveProductImage } from "@/lib/catalog/product-image";
import MenuProductCard from "@/components/shop/MenuProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Taşdelen Fırıncı menü — ekmek, simit, börek, tatlı ve pastalar.",
  alternates: { canonical: "/urunler" },
  openGraph: {
    title: "Ürünler | Taşdelen Fırıncı",
    description: "Fırın menümüzü inceleyin; WhatsApp veya telefonla sipariş verin.",
  },
};

export default async function UrunlerPage() {
  const content = await getContentAsync();
  const cats = listCategories(content);
  const total = cats.reduce(
    (n, g) => n + (g.urunler || []).filter(isProductActive).length,
    0
  );
  const hub = content.sayfalar?.urunler;
  const brand =
    content.brand?.displayName || content.seo?.siteName || "Taşdelen Fırıncı";
  const title =
    hub?.baslikSablon
      ?.replace("{n}", String(cats.length))
      .replace("{m}", String(total)) || `${brand} Menü`;
  const lead =
    hub?.lead ||
    `${cats.length} kategori · ${total} ürün. İnceleyin; sipariş için WhatsApp veya telefon.`;

  return (
    <div className="ys">
      <header className="ys-hero">
        <div className="ys-hero__text">
          <p className="ys-hero__eyebrow">{hub?.eyebrow || "Menü"}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          <p className="ys-hero__note">
            {hub?.altNot ||
              "Sunum menüsü — sepet yok; fırından gel-al veya iletişime geçin."}
          </p>
        </div>
      </header>

      {!cats.length ? (
        <div className="shop-card">
          <p>Henüz kategori bulunmuyor.</p>
        </div>
      ) : (
        <div className="ys-layout">
          <aside className="ys-side" aria-label="Kategoriler">
            <p className="ys-side__title">Kategoriler</p>
            <nav className="ys-side__nav">
              {cats.map((g) => {
                const slug = getCategorySlug(g);
                const count = (g.urunler || []).filter(isProductActive).length;
                return (
                  <a key={slug} href={`#kat-${slug}`}>
                    <span>{g.ad}</span>
                    <em>{count}</em>
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="ys-main">
            <div className="ys-chips" aria-label="Hızlı kategori">
              {cats.map((g) => {
                const slug = getCategorySlug(g);
                const count = (g.urunler || []).filter(isProductActive).length;
                return (
                  <a key={slug} href={`#kat-${slug}`}>
                    {g.ad}
                    <em>{count}</em>
                  </a>
                );
              })}
            </div>

            {cats.map((g) => {
              const slug = getCategorySlug(g);
              const products = (g.urunler || []).filter(isProductActive);
              const cover =
                resolveMediaUrl(g.image || g.banner || "") ||
                "/assets/img/product-placeholder.svg";
              return (
                <div
                  key={slug}
                  id={`kat-${slug}`}
                  className="ys-section"
                  aria-labelledby={`title-${slug}`}
                >
                  <div className="ys-section__head">
                    <div>
                      <h2 id={`title-${slug}`}>{g.ad}</h2>
                      {g.aciklama ? <p>{g.aciklama}</p> : null}
                    </div>
                    <Link className="ys-section__all" href={categoryHref(slug)}>
                      Tümü
                    </Link>
                  </div>

                  {!products.length ? (
                    <p className="ys-empty">Bu kategoride henüz ürün bulunmuyor.</p>
                  ) : (
                    <ul className="ys-list">
                      {products.map((u) => {
                        const pSlug = getProductSlug(u);
                        const href = productHref(pSlug, slug);
                        const img = resolveProductImage(u, g);
                        const price = formatPriceLabel(u.fiyat);
                        const imgUrl =
                          img.url !== "/assets/img/product-placeholder.svg"
                            ? img.url
                            : cover;
                        return (
                          <MenuProductCard
                            key={pSlug}
                            ad={u.ad}
                            slug={pSlug}
                            href={href}
                            fiyatLabel={price || "Fiyat sorulur"}
                            hasPrice={Boolean(price)}
                            desc={u.aciklama || u.not || undefined}
                            imageUrl={imgUrl}
                            imageAlt={img.alt}
                            ozelSiparis={Boolean(u.ozelSiparis)}
                          />
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
