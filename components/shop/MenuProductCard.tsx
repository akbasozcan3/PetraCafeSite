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
      <Link href={href} className="ys-item__media" tabIndex={-1}>
        <ProductImage src={imageUrl} alt={imageAlt} />
      </Link>
      <div className="ys-item__body">
        <div className="ys-item__top">
          <Link href={href}>
            <h3>{ad}</h3>
          </Link>
        </div>
        {desc ? <p className="ys-item__desc">{desc}</p> : null}
        <div className="ys-item__foot">
          <strong className={!hasPrice ? "ys-price--ask" : undefined}>
            {fiyatLabel}
          </strong>
          <Link className="ys-item__link" href={href}>
            {ozelSiparis ? "Özel sipariş" : "İncele"}
          </Link>
        </div>
      </div>
    </li>
  );
}
