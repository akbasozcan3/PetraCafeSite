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

/** Fırın menü kartı — sunum / katalog (sepet yok) */
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
    <li className="ys-item">
      <Link href={href} className="ys-item__card">
        <span className="ys-item__media">
          <ProductImage src={imageUrl} alt={imageAlt} />
        </span>
        <span className="ys-item__body">
          <span className="ys-item__top">
            <h3>{ad}</h3>
          </span>
          {desc ? <span className="ys-item__desc">{desc}</span> : null}
          <span className="ys-item__foot">
            <strong className={!hasPrice ? "ys-price--ask" : undefined}>
              {fiyatLabel}
            </strong>
            <span className="ys-item__link">
              {ozelSiparis ? "Özel sipariş" : "İncele"}
            </span>
          </span>
        </span>
      </Link>
    </li>
  );
}
