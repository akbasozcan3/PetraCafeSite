import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import {
  formatPriceLabel,
  getCategorySlug,
  getProductSlug,
  isProductActive,
  listCategories,
} from "@/lib/catalog/catalog";
import { categoryHref, productHref } from "@/lib/content/slugify";
import { resolveProductImage } from "@/lib/catalog/product-image";
import { categoryIcon } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";

export default function HomeMenuPreview({ content }: { content: SiteContent }) {
  const bolum = content.bolumlar?.menu;
  const menu = content.menu;
  const cats = listCategories(content);
  const legend = menu?.legend || "★ işaretliler şefin önerileridir.";

  const featured = cats
    .flatMap((g) => {
      const catSlug = getCategorySlug(g);
      return (g.urunler || [])
        .filter((u) => isProductActive(u) && u.fav)
        .map((u) => ({
          ...u,
          catSlug,
          catName: g.ad,
          href: productHref(getProductSlug(u), catSlug),
          photo: resolveProductImage(u, g),
        }));
    })
    .slice(0, 3);

  if (!cats.length) {
    return (
      <section className="section section--warm" id="menu">
        <div className="wrap">
          <div className="section__head rmenu__head">
            <p className="eyebrow">{bolum?.eyebrow || "Menümüz"}</p>
            <h2 className="h2">{bolum?.baslik || menu?.baslik || "Şefin Sofrası"}</h2>
            <p className="lead">{menu?.emptyMetin || "Menü yakında yayınlanacak."}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--warm" id="menu">
      <div className="wrap">
        <div className="section__head rmenu__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Menümüz"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || menu?.baslik || "Şefin Sofrası"}
          </h2>
          <p className="lead" data-fade="">
            {bolum?.lead ||
              menu?.giris ||
              "Başlangıçlar, ana yemekler, tatlılar ve içecekler."}
          </p>
          <p className="menu__legend" data-fade="">
            <i aria-hidden="true">★</i> {legend.replace(/^★\s*/, "")}
          </p>
        </div>

        <div className="rmenu" data-fade="">
          {cats.map((g, i) => {
            const slug = getCategorySlug(g);
            return (
              <input
                key={`radio-${slug}`}
                className="rmenu__radio"
                type="radio"
                name="rmenu-cat"
                id={`rmenu-${slug}`}
                data-i={String(i)}
                defaultChecked={i === 0}
              />
            );
          })}

          <div className="rmenu__tabs" role="tablist" aria-label="Menü bölümleri">
            {cats.map((g, i) => {
              const slug = getCategorySlug(g);
              const count = (g.urunler || []).filter(isProductActive).length;
              return (
                <label
                  key={slug}
                  htmlFor={`rmenu-${slug}`}
                  role="tab"
                  className="rmenu__tab"
                  data-i={String(i)}
                >
                  <span className="rmenu__tab-ico" aria-hidden="true">
                    <SiteIcon name={categoryIcon(slug)} size={16} />
                  </span>
                  <span>{g.ad}</span>
                  <em>{count}</em>
                </label>
              );
            })}
          </div>

          {featured.length > 0 ? (
            <div className="rmenu__featured" data-stagger="">
              {featured.map((u) => {
                const img = u.photo.url;
                const price = formatPriceLabel(u.fiyat);
                return (
                  <Link key={u.slug || u.ad} href={u.href} className="rmenu__pick">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={u.photo.alt} />
                    <span className="rmenu__pick-body">
                      <span className="rmenu__pick-cat">{u.catName}</span>
                      <strong>{u.ad}</strong>
                      {u.aciklama ? <em>{u.aciklama}</em> : null}
                      {price ? <b>{price}</b> : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}

          {cats.map((g, i) => {
            const slug = getCategorySlug(g);
            const dishes = (g.urunler || []).filter(isProductActive);
            return (
              <div
                key={slug}
                className="rmenu__board rmenu__panel"
                data-i={String(i)}
              >
                <div className="rmenu__board-head">
                  <h3>{g.ad}</h3>
                  {g.aciklama ? <p>{g.aciklama}</p> : null}
                </div>
                <ul className="rmenu__list">
                  {dishes.length ? (
                    dishes.map((u) => {
                    const pSlug = getProductSlug(u);
                    const href = productHref(pSlug, slug);
                    const price = formatPriceLabel(u.fiyat);
                    return (
                      <li key={pSlug} className={u.fav ? "is-fav" : undefined}>
                        <Link href={href} className="rmenu__item">
                          <span className="rmenu__row">
                            <span className="rmenu__name">
                              {u.ad}
                              {u.fav ? (
                                <i className="rmenu__star" aria-label="Şefin önerisi">
                                  ★
                                </i>
                              ) : null}
                            </span>
                            <span className="rmenu__dots" aria-hidden="true" />
                            {price ? <span className="rmenu__price">{price}</span> : null}
                          </span>
                          {u.aciklama || u.not ? (
                            <span className="rmenu__desc">{u.aciklama || u.not}</span>
                          ) : null}
                        </Link>
                      </li>
                    );
                    })
                  ) : (
                    <li className="rmenu__empty">
                      {menu?.emptyMetin || "Bu bölümde yayında tabak yok."}
                    </li>
                  )}
                </ul>
                <Link className="rmenu__more" href={categoryHref(slug)}>
                  {(menu?.tumMetinSablon || "{ad} bölümünün tamamı →").replace(
                    "{ad}",
                    g.ad
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {menu?.not ? (
          <p className="menu__note rmenu__note" data-fade="">
            {menu.not}
          </p>
        ) : null}

        <div className="rmenu__cta" data-fade="">
          <a className="btn btn--lg" href={bolum?.ctaHref || "#rezervasyon"}>
            {bolum?.ctaLabel || "Masa ayırtın"}
          </a>
          <Link className="btn btn--lg btn--light" href={bolum?.cta2Href || "/menu"}>
            {bolum?.cta2Label || "Tüm menü"}
          </Link>
        </div>
      </div>
    </section>
  );
}
