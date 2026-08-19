import type { BolumBaslik, GaleriItem } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { DEFAULT_GALLERY, liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import SafeImg from "@/components/site/SafeImg";

export default function HomeGallery({
  bolum,
  items,
}: {
  bolum?: BolumBaslik;
  items: GaleriItem[];
}) {
  const mapped = (items || [])
    .filter((item) => item.aktif !== false)
    .filter((item) => item.baslik?.trim() || item.src?.trim())
    .map((item, i) => ({
      ...item,
      src: liveMedia(item.src, DEFAULT_GALLERY[i % DEFAULT_GALLERY.length].src),
      boy: item.boy || DEFAULT_GALLERY[i % DEFAULT_GALLERY.length].boy,
    }));
  const shots = mapped;

  return (
    <section className="section" id="galeri">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Galeri"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Salon, sofra ve havuz"}
          </h2>
          {bolum?.lead ? (
            <p className="lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
        </div>
        {!shots.length ? (
          <p className="lead" data-fade="">
            Fotoğraflar yakında.
          </p>
        ) : (
        <div className="gallery" data-stagger="">
          {shots.map((item, i) => {
            const boy = item.boy || "third";
            const src = resolveMediaUrl(item.src) || SITE_PHOTOS.interior;
            return (
              <figure className={`shot shot--${boy}`} key={`${src}-${item.baslik}-${i}`}>
                <SafeImg
                  src={src}
                  alt={item.baslik || bolum?.baslik || "Galeri"}
                  fallback={SITE_PHOTOS.interior}
                  loading={i < 2 ? "eager" : "lazy"}
                />
                {item.baslik ? <figcaption>{item.baslik}</figcaption> : null}
              </figure>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
