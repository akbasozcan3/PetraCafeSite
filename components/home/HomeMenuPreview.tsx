import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import {
  getCategorySlug,
  getProductSlug,
  isProductActive,
  listCategories,
} from "@/lib/catalog/catalog";
import { categoryHref, productHref } from "@/lib/content/slugify";

export default function HomeMenuPreview({ content }: { content: SiteContent }) {
  const bolum = content.bolumlar?.menu;
  const menu = content.menu;
  const cats = listCategories(content);
  const legend = menu?.legend || "★ işaretliler en çok tercih edilenler.";

  return (
    <section className="section section--warm" id="menu">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Menü"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || menu?.baslik || "Taşdelen'de taptaze fırın lezzetleri"}
          </h2>
          <p className="lead" data-fade="">
            {bolum?.lead ||
              menu?.giris ||
              "Fırınımızda günlük olarak hazırlanan ürünlerimizi keşfedin."}
          </p>
          <p className="menu__legend" data-fade="">
            <i aria-hidden="true">★</i> {legend.replace(/^★\s*/, "")}
          </p>
          {menu?.not ? (
            <p className="menu__note" data-fade="">
              {menu.not}
            </p>
          ) : null}
        </div>

        <div className="menu">
          {cats.map((g) => {
            const catSlug = getCategorySlug(g);
            const href = categoryHref(catSlug);
            const urunler = (g.urunler || []).filter(isProductActive);
            const adet =
              g.adet ||
              `${(g.urunler || []).filter(isProductActive).length} çeşit`;
            const tumSablon =
              menu?.tumMetinSablon || "{ad} hakkında bilgi →";
            return (
              <div className="menu__group" data-fade="" key={catSlug}>
                <h3>
                  <Link href={href}>{g.ad}</Link>
                  <span className="menu__adet">{adet}</span>
                </h3>
                <ul className="menu__list">
                  {urunler.map((u) => {
                    const slug = getProductSlug(u);
                    const ph = productHref(slug, catSlug);
                    return (
                      <li
                        key={slug}
                        className={u.fav ? "is-fav" : undefined}
                      >
                        <Link href={ph}>
                          <span className="menu__name">
                            <span className="menu__name__label">{u.ad}</span>
                            {u.not ? <em> {u.not}</em> : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link className="menu__tum" href={href}>
                  {tumSablon.replace("{ad}", g.ad)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
