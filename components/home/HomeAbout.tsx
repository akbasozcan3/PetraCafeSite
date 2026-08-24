"use client";

import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { parseArticleContent, formatInlineText, cleanRawText } from "@/lib/content/markdown-parser";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  if (!h) return null;

  const parsedBlocks = parseArticleContent(h.body || []);
  const paragraphBlocks = parsedBlocks.filter((b) => b.type === "p" || b.type === "quote");
  
  // Compact preview paragraphs for homepage
  const firstPara = paragraphBlocks[0]?.text || "Petra Cafe Restaurant; lezzetin, keyfin, konforun ve güzel anların buluştuğu yer.";
  const secondPara = paragraphBlocks[1]?.text || "";

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2 items-center">
        {/* SOL: SADE, ŞIK VE KISA TANITIM METNİ */}
        <div>
          <p className="eyebrow" data-fade="">
            {cleanRawText(h.eyebrow || "Hakkımızda")}
          </p>
          <h1 className="h2" data-split="">
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant")}
          </h1>

          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="" style={{ marginBottom: "1rem" }}>
              <b>{cleanRawText(h.answerBaslik || "Kısaca")}</b>
              <p>{cleanRawText(h.answerMetin)}</p>
            </div>
          )}

          {h.lead ? (
            <p className="lead" data-fade="" style={{ marginBottom: "1rem", fontWeight: 600 }}>
              {formatInlineText(h.lead)}
            </p>
          ) : null}

          {/* PARAGRAF METNİ (KISA, NET VE FORMATLI) */}
          <div className="space-y-2 mb-6" data-fade="">
            <p className="body" style={{ margin: 0, lineHeight: 1.7, color: "#3E3A32" }}>
              {formatInlineText(firstPara)}
            </p>
            {secondPara && (
              <p className="body" style={{ margin: 0, lineHeight: 1.7, color: "#3E3A32" }}>
                {formatInlineText(secondPara)}
              </p>
            )}
          </div>

          {/* DEVAMINI OKU & HAKKIMIZDA SAYFASI BUTONU */}
          <div className="mb-6" data-fade="">
            <Link
              href="/hakkimizda"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 22px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #D9A441 0%, #B8842C 100%)",
                color: "#0D0F0A",
                fontSize: "0.92rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 24px -4px rgba(217, 164, 65, 0.4)",
                transition: "all 0.25s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen size={18} />
              <span>Devamını Oku & Hikayemiz</span>
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* ÖZET KARTLARI */}
          {h.ozet?.length ? (
            <div className="ozet" data-stagger="" style={{ marginTop: "0.5rem" }}>
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
