import type { BolumBaslik, GaleriItem } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default function HomeGallery({
  bolum,
  items,
}: {
  bolum?: BolumBaslik;
  items: GaleriItem[];
}) {
  if (!items?.length) return null;
  return (
    <section className="section" id="galeri">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Galeri"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Lezzet galerimiz"}
          </h2>
          {bolum?.lead ? (
            <p className="lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
        </div>
        <div className="gallery">
          {items.map((item, i) => {
            const boy = item.boy || "third";
            const src = resolveMediaUrl(item.src);
            if (!src) return null;
            return (
              <figure
                className={`shot shot--${boy}`}
                data-reveal-mask=""
                key={src + item.baslik}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={item.baslik || ""}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
                {item.baslik ? <figcaption>{item.baslik}</figcaption> : null}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
