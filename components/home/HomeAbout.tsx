import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
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
            {h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant"}
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
            <div className="ozet" data-stagger="">
              {h.ozet.map((item) => (
                <div className="ozet__i" key={`${item.b}-${item.span}`}>
                  <span className="ozet__ico">
                    <SiteIcon name={iconFromLabel(`${item.b} ${item.span}`)} size={20} />
                  </span>
                  <b>{looksLikeHours(item.b) ? displayHours(content.iletisim) : item.b}</b>
                  <span>{item.span}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div data-fade="">
          <div className="tilt-card">
            <div className="tilt-card__inner">
              <SafeImg
                src={img}
                alt={h.badgeBaslik ? `${h.badgeBaslik} — iç mekân` : "Restoran iç mekân"}
                fallback={SITE_PHOTOS.interior}
                loading="eager"
                width={1800}
                height={1350}
              />
              <div
                className="tilt-card__badge"
                style={{
                  background: "var(--card-bg, #ffffff)",
                  border: "1.5px solid var(--card-border, rgba(217, 164, 65, 0.4))",
                  backdropFilter: "blur(14px)",
                  borderRadius: 14,
                  padding: "12px 18px",
                  boxShadow: "0 14px 34px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <b style={{ color: "var(--card-text, #0d0f0a)", display: "block", fontSize: "1.18rem", fontWeight: 800 }}>
                  {h.badgeBaslik || "Petra"}
                </b>
                <span style={{ color: "var(--brass-lo, #b8842c)", display: "block", fontSize: "0.85rem", fontWeight: 800, marginTop: 3, letterSpacing: "0.02em" }}>
                  {h.badgeAlt || "Cafe · Restaurant · Pool"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
