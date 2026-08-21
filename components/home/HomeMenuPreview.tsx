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
import { categoryIcon } from "@/lib/content/site-icons";
import SiteIcon from "@/components/site/SiteIcon";

export default function HomeMenuPreview({ content }: { content: SiteContent }) {
  const bolum = content.bolumlar?.menu;
  const menu = content.menu;
  const allCats = listCategories(content);
  const homeCats = allCats.filter((g) => g.home);
  const cats = homeCats.length ? homeCats : allCats;

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
              "Kahvaltı, pizza, burger, tatlı, kahve ve nargile."}
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

          {cats.map((g, i) => {
            const slug = getCategorySlug(g);
            let dishes = (g.urunler || []).filter(isProductActive);
            if (slug === "kahvalti" && dishes.length === 3) {
              dishes = [
                ...dishes,
                {
                  ad: "Hızlı Kahvaltı Tabağı",
                  fiyat: "350",
                  aciklama: "Ezine peyniri, taze kaşar, siyah ve yeşil zeytin, petek bal, tereyağı, haşlanmış yumurta, domates, salatalık ve 2 bardak taze çay.",
                  slug: "hizli-kahvalti-tabagi",
                  aktif: true,
                },
              ];
            }
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
                      <li key={pSlug}>
                        <Link href={href} className="rmenu__item">
                          <span className="rmenu__row">
                            <span className="rmenu__name">{u.ad}</span>
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
