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
  whatsappBase,
  ozelSiparis,
  categoryName,
  categoryHref,
  aciklama,
  phoneHref,
  notes,
  waLabel,
  telLabel,
  priceAskLabel,
}: {
  ad: string;
  slug: string;
  fiyat?: string;
  image: string;
  href: string;
  gallery: string[];
  varyantlar?: string[];
  /** wa.me / whatsapp link without message (CMS iletisim) */
  whatsappBase?: string;
  ozelSiparis?: boolean;
  categoryName?: string;
  categoryHref?: string;
  aciklama?: string;
  phoneHref?: string;
  notes?: string[];
  waLabel?: string;
  telLabel?: string;
  priceAskLabel?: string;
}) {
  const [active, setActive] = useState(gallery[0] || image);
  const [variant, setVariant] = useState(varyantlar?.[0] || "");
  const hasPrice = Boolean(fiyat);
  const tel = phoneHref || "";
  const noteLines = notes?.filter(Boolean) || [];
  const ask = priceAskLabel || "Fiyat sorulur";

  const wa = useMemo(() => {
    const text = encodeURIComponent(
      `Merhaba, ${ad}${variant ? ` (${variant})` : ""} hakkında bilgi / sipariş vermek istiyorum.`
    );
    const base = (whatsappBase || "").trim();
    if (!base) return `https://wa.me/?text=${text}`;
    if (base.includes("text=")) return base;
    const sep = base.includes("?") ? "&" : "?";
    // normalize wa.me/905... or full whatsapp URL
    if (/wa\.me\//i.test(base) || /whatsapp\.com/i.test(base)) {
      return `${base.replace(/\?.*$/, "")}${sep}text=${text}`;
    }
    const digits = base.replace(/\D/g, "");
    return digits
      ? `https://wa.me/${digits}?text=${text}`
      : `https://wa.me/?text=${text}`;
  }, [ad, variant, whatsappBase]);

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
          {hasPrice ? fiyat : ask}
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
            {waLabel || "WhatsApp ile Sipariş"}
          </a>
          {tel ? (
            <a className="pd__btn pd__btn--ghost" href={tel}>
              {telLabel || "Telefonla Ara"}
            </a>
          ) : null}
        </div>

        {noteLines.length ? (
          <ul className="pd__notes">
            {noteLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
