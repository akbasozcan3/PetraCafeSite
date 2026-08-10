"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductImage from "./ProductImage";

export default function ProductDetailClient({
  ad,
  fiyat,
  image,
  gallery,
  varyantlar,
  whatsappHref,
  ozelSiparis,
  categoryName,
  categoryHref,
  aciklama,
  phoneHref,
}: {
  ad: string;
  slug: string;
  fiyat?: string;
  image: string;
  href: string;
  gallery: string[];
  varyantlar?: string[];
  whatsappHref?: string;
  ozelSiparis?: boolean;
  categoryName?: string;
  categoryHref?: string;
  aciklama?: string;
  phoneHref?: string;
}) {
  const [active, setActive] = useState(gallery[0] || image);
  const [variant, setVariant] = useState(varyantlar?.[0] || "");
  const hasPrice = Boolean(fiyat);
  const tel = phoneHref || "tel:+905523400202";

  const wa = useMemo(() => {
    if (whatsappHref) return whatsappHref;
    const text = encodeURIComponent(
      `Merhaba, ${ad}${variant ? ` (${variant})` : ""} hakkında bilgi / sipariş vermek istiyorum.`
    );
    return `https://wa.me/905523400202?text=${text}`;
  }, [ad, variant, whatsappHref]);

  return (
    <div className="pd">
      <div className="pd__media">
        <div className="pd__media-frame">
          <ProductImage
            src={active}
            alt={ad}
            className="pd__img"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
        {gallery.length > 1 ? (
          <div className="pd__thumbs" aria-label="Ürün görselleri">
            {gallery.map((url) => (
              <button
                key={url}
                type="button"
                className={url === active ? "is-active" : undefined}
                onClick={() => setActive(url)}
                aria-label="Galeri görseli"
              >
                <ProductImage src={url} alt="" className="pd__thumb" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="pd__info">
        {categoryName ? (
          <p className="pd__cat">
            {categoryHref ? (
              <Link href={categoryHref}>{categoryName}</Link>
            ) : (
              categoryName
            )}
          </p>
        ) : null}

        <h1 className="pd__title">{ad}</h1>

        <p className={`pd__price${!hasPrice ? " pd__price--ask" : ""}`}>
          {hasPrice ? fiyat : "Fiyat sorulur"}
        </p>

        {aciklama ? <p className="pd__lead">{aciklama}</p> : null}

        {varyantlar?.length ? (
          <div className="pd__block">
            <span className="pd__label">Seçenek</span>
            <div className="pd__chips">
              {varyantlar.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={variant === v ? "is-active" : undefined}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {ozelSiparis ? (
          <p className="pd__badge">Özel sipariş — fiyat ve detay için yazın</p>
        ) : null}

        <div className="pd__actions">
          <a
            className="pd__btn pd__btn--primary"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp ile Sipariş
          </a>
          <a className="pd__btn pd__btn--ghost" href={tel}>
            Telefonla Ara
          </a>
        </div>

        <ul className="pd__notes">
          <li>Gel al veya telefon / WhatsApp siparişi</li>
          <li>7/24 WhatsApp ile hızlı yanıt</li>
        </ul>
      </div>
    </div>
  );
}
