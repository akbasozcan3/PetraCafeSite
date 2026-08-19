import type { BolumBaslik } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { resolveHref } from "@/lib/site/resolveHref";
import SafeImg from "@/components/site/SafeImg";

export default function HomeFaq({
  bolum,
  items,
  image,
}: {
  bolum?: BolumBaslik;
  items: { soru: string; cevap: string }[];
  image?: string;
}) {
  const list = (items || []).filter((item) => String(item.soru || "").trim());
  if (!list.length) return null;

  const img = resolveMediaUrl(liveMedia(image, SITE_PHOTOS.interior));
  const ctaHref = resolveHref(bolum?.ctaHref || "#rezervasyon");
  const ctaLabel = bolum?.ctaLabel || "Masa ayırtın";

  return (
    <section className="section faq-sec" id="sss" aria-labelledby="sssBaslik">
      <div className="wrap faq-layout">
        <div className="faq-intro">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Sık Sorulanlar"}
          </p>
          <h2 className="h2" id="sssBaslik" data-split="">
            {bolum?.baslik || "Rezervasyon, havuz ve menü"}
          </h2>
          {bolum?.lead ? (
            <p className="lead faq-intro__lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
          {img ? (
            <figure className="faq-sec__shot" data-fade="">
              <SafeImg
                src={img}
                alt={bolum?.baslik || "Sık sorulanlar"}
                fallback={SITE_PHOTOS.interior}
              />
            </figure>
          ) : null}
          <a className="faq-intro__cta" href={ctaHref} data-fade="">
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="faq" data-stagger="">
          {list.map((item, i) => (
            <details className="faq__item" key={`${item.soru}-${i}`} open={i === 0}>
              <summary>
                <span>{item.soru}</span>
                <svg className="faq__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="faq__a">
                <p>{item.cevap}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
