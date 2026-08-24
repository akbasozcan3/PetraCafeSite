import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  if (!h) return null;

  // Extract clean text and limit to 40 words / characters as configured in admin
  const wordLimit = h.homeWordLimit && h.homeWordLimit > 0 ? h.homeWordLimit : 40;
  
  const rawBody = Array.isArray(h.body) ? h.body.join(" ") : String(h.body || "");
  const sourceText = rawBody.trim() || (h.lead && h.lead.length > 100 ? h.lead : "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır.");
  
  const words = sourceText.split(/\s+/).filter(Boolean);
  const teaserText = words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : sourceText;

  // Only show lead separately if it is short (< 120 chars) to prevent massive text blocks
  const showShortLead = h.lead && h.lead.trim().length <= 120 && h.lead.trim() !== teaserText.trim();

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2">
        <div>
          <p className="eyebrow" data-fade="">
            {cleanRawText(h.eyebrow || "Hakkımızda")}
          </p>
          <h1 className="h2" data-split="">
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant")}
          </h1>
          
          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="">
              <b>{cleanRawText(h.answerBaslik || "Kısaca")}</b>
              <p>{cleanRawText(h.answerMetin)}</p>
            </div>
          )}
          
          {showShortLead ? (
            <p className="lead" data-fade="">
              {formatInlineText(h.lead)}
            </p>
          ) : null}

          {/* 40 KELİMELİK NET ÖNİZLEME + AŞAĞI DOĞRU BLURLU/GRADIENT FADE KATMANI */}
          <div
            data-fade=""
            style={{
              position: "relative",
              maxHeight: "80px",
              overflow: "hidden",
              marginBottom: "1.25rem",
            }}
          >
            <p className="body" style={{ margin: 0, lineHeight: 1.75 }}>
              {formatInlineText(teaserText)}
            </p>

            {/* AŞAĞI DOĞRU YUMUŞAK GRADIENT FADE + BLUR EFEKTİ */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "55px",
                background: "linear-gradient(to bottom, rgba(251, 248, 241, 0) 0%, rgba(251, 248, 241, 0.8) 50%, var(--paper, #FBF8F1) 100%)",
                backdropFilter: "blur(2px)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* DOĞRUDAN /hakkimizda ROUTE NAVIGATION BUTONU */}
          <div data-fade="" style={{ marginBottom: "1.75rem" }}>
            <Link
              href="/hakkimizda"
              className="btn btn--brass"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "0.92rem",
                textDecoration: "none",
                background: "var(--brass, #D9A441)",
                color: "#0D0F0A",
                boxShadow: "0 6px 18px rgba(217, 164, 65, 0.35)",
              }}
            >
              <span>Devamını Oku</span>
              <span>→</span>
            </Link>
          </div>

          {/* ÖZET KARTLARI */}
          {h.ozet?.length ? (
            <div className="ozet" data-stagger="">
              {h.ozet.map((item) => (
                <div className="ozet__i" key={`${item.b}-${item.span}`}>
                  <span className="ozet__ico">
                    <SiteIcon name={iconFromLabel(`${item.b} ${item.span}`)} size={20} />
                  </span>
                  <b>{looksLikeHours(item.b) ? displayHours(content.iletisim) : cleanRawText(item.b)}</b>
                  <span>{cleanRawText(item.span)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* SAĞ: TİLT-CARD FOTOĞRAF VE ROZET */}
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
                  {cleanRawText(h.badgeBaslik || "Petra")}
                </b>
                <span style={{ color: "var(--brass-lo, #b8842c)", display: "block", fontSize: "0.85rem", fontWeight: 800, marginTop: 3, letterSpacing: "0.02em" }}>
                  {cleanRawText(h.badgeAlt || "Cafe · Restaurant · Pool")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
