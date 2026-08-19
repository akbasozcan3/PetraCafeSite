import Link from "next/link";
import ProductImage from "@/components/shop/ProductImage";

export type MenuProductCardProps = {
  ad: string;
  slug: string;
  href: string;
  fiyatLabel: string;
  hasPrice: boolean;
  desc?: string;
  imageUrl: string;
  imageAlt: string;
  ozelSiparis?: boolean;
};

/** Restoran menü satırı — isim, açıklama, fiyat */
export default function MenuProductCard({
  ad,
  href,
  fiyatLabel,
  hasPrice,
  desc,
  imageUrl,
  imageAlt,
  ozelSiparis,
}: MenuProductCardProps) {
  return (
    <li className="menu-row">
      <Link href={href} className="menu-row__link">
        <span className="menu-row__media">
          <ProductImage src={imageUrl} alt={imageAlt} />
        </span>
        <span className="menu-row__copy">
          <span className="menu-row__line">
            <h3>{ad}</h3>
            <i className="menu-row__dots" aria-hidden="true" />
            <strong className={!hasPrice ? "is-ask" : undefined}>{fiyatLabel}</strong>
          </span>
          {desc ? <span className="menu-row__desc">{desc}</span> : null}
          {ozelSiparis ? <span className="menu-row__tag">Rezervasyonla</span> : null}
        </span>
      </Link>
    </li>
  );
}
