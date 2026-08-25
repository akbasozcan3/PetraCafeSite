import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import {
  formatPriceLabel,
  getCategorySlug,
  getProductSlug,
  isProductActive,
  listCategories,
} from "@/lib/catalog/catalog";
import { productHref } from "@/lib/content/slugify";
import { resolveProductImage } from "@/lib/catalog/product-image";
import { categoryCover } from "@/lib/content/media-fallbacks";
import MenuProductCard from "@/components/shop/MenuProductCard";
import Breadcrumbs from "@/components/site/Breadcrumbs";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const hub = content.sayfalar?.urunler;
  const brand =
    content.brand?.displayName || content.seo?.siteName || "Petra Cafe Restaurant";
  const title = hub?.eyebrow ? `${hub.eyebrow} | ${brand}` : "Menü";
  const description =
    hub?.lead ||
    "Petra Cafe Restaurant menü — kahvaltı, dünya mutfağı, tatlılar ve kahve.";
  return {
    title: hub?.eyebrow || "Menü",
    description,
    alternates: { canonical: "/menu" },
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function MenuPage() {
  const content = await getPublicContent();
  const cats = listCategories(content);
  const total = cats.reduce(
    (n, g) => n + (g.urunler || []).filter(isProductActive).length,
    0
  );
  const hub = content.sayfalar?.urunler;
  const title =
    hub?.baslikSablon
      ?.replace("{n}", String(cats.length))
      .replace("{m}", String(total)) || "Petra Cafe Restaurant Menü";
  const lead =
    hub?.lead ||
    `${cats.length} bölüm · ${total} tabak. Masa için rezervasyon formunu kullanın.`;

  return (
    <div className="menu-page">
      <div style={{ margin: "4px 0 16px" }}>
        <Breadcrumbs items={[{ label: "Menü" }]} />
      </div>
      <header className="menu-page__hero">
        <p className="menu-page__kicker">{hub?.eyebrow || "Menü"}</p>
        <h1>{title}</h1>
        <p className="menu-page__lead">{lead}</p>
        {hub?.altNot ? <p className="menu-page__note">{hub.altNot}</p> : null}
      </header>

      {!cats.length ? (
        <p className="menu-page__empty">Henüz kategori bulunmuyor.</p>
      ) : (
        <>
          <nav className="menu-page__toc" aria-label="Menü bölümleri">
            {cats.map((g) => {
              const slug = getCategorySlug(g);
              return (
                <a key={slug} href={`#kat-${slug}`}>
                  {g.ad}
                </a>
              );
            })}
          </nav>

          {cats.map((g) => {
            const slug = getCategorySlug(g);
            const products = (g.urunler || []).filter(isProductActive);
            const cover = categoryCover(slug);
            return (
              <section
                key={slug}
                id={`kat-${slug}`}
                className="menu-page__sec"
                aria-labelledby={`title-${slug}`}
              >
                <header className="menu-page__sec-head">
                  <h2 id={`title-${slug}`}>{g.ad}</h2>
                  {g.aciklama ? <p>{g.aciklama}</p> : null}
                </header>
                {!products.length ? (
                  <p className="menu-page__empty">Bu bölümde henüz tabak yok.</p>
                ) : (
                  <ul className="menu-page__list">
                    {products.map((u) => {
                      const pSlug = getProductSlug(u);
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
                          href={productHref(pSlug, slug)}
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
              </section>
            );
          })}

          {content.menu?.not ? (
            <div
              style={{
                marginTop: 48,
                marginBottom: 32,
                borderRadius: 20,
                border: "1px solid var(--card-border, rgba(184, 132, 44, 0.25))",
                background: "var(--card-bg, #FAF6EE)",
                color: "var(--card-muted, #7C6E53)",
                padding: "20px 24px",
                textAlign: "center",
                boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.6, maxWidth: 640, marginInline: "auto" }}>
                ℹ️ {content.menu.not}
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
