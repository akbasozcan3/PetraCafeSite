import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    content.images?.aboutInterior ||
      content.images?.icMekan ||
      "/assets/img/ic-mekan.jpg"
  );

  if (!h) return null;

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2">
        <div>
          <p className="eyebrow" data-fade="">
            {h.eyebrow || "Hakkımızda"}
          </p>
          <h1 className="h2" data-split="">
            {h.baslik || "Taşdelen'in fırını ve pastanesi"}
          </h1>
          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="">
              <b>{h.answerBaslik || "Kısaca"}</b>
              <p>{h.answerMetin}</p>
            </div>
          )}
          {h.lead ? (
            <p className="lead" data-fade="">
              {h.lead}
            </p>
          ) : null}
          {(h.body || []).map((text, i) => (
            <p className="body" data-fade="" key={i}>
              {text}
            </p>
          ))}
          {h.ozet?.length ? (
            <div className="ozet">
              {h.ozet.map((item) => (
                <div className="ozet__i" key={`${item.b}-${item.span}`}>
                  <b>{item.b}</b>
                  <span>{item.span}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <div className="tilt-card" data-reveal-mask="">
            <div className="tilt-card__inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="Taşdelen Fırıncı iç mekân"
                loading="eager"
                decoding="async"
                width={1800}
                height={1350}
              />
              <div className="tilt-card__badge">
                <b>{h.badgeBaslik || "Taze"}</b>
                <span>{h.badgeAlt || "Lezzetli · Doğal"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
