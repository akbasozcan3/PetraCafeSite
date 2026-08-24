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
import { ArrowRight } from "lucide-react";

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
  
  const firstPara = paragraphBlocks[0]?.text || "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır.";
  const secondPara = paragraphBlocks[1]?.text || "Günün ilk ışıklarında zengin serpme kahvaltımızla güne başlayabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.";

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2 items-center">
        {/* SOL: SADE VE KISA ÖNİZLEME (TEASER) */}
        <div>
          <p className="eyebrow" data-fade="">
            {cleanRawText(h.eyebrow || "02 · HAKKIMIZDA")}
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

          {/* KONTROLLÜ YÜKSEKLİK VE AŞAĞI DOĞRU BLUR/FADE KATMANI */}
          <div
            data-fade=""
            style={{
              position: "relative",
              maxHeight: "145px",
              overflow: "hidden",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p className="body" style={{ margin: 0, lineHeight: 1.75, color: "#3E3A32" }}>
                {formatInlineText(firstPara)}
              </p>
              {secondPara && (
                <p className="body" style={{ margin: 0, lineHeight: 1.75, color: "#3E3A32" }}>
                  {formatInlineText(secondPara)}
                </p>
              )}
            </div>

            {/* AŞAĞI DOĞRU YUMUŞAK GRADIENT FADE + HAFİF BLUR EFEKTİ */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "85px",
                background: "linear-gradient(to bottom, rgba(251, 248, 241, 0) 0%, rgba(251, 248, 241, 0.65) 45%, rgba(251, 248, 241, 1) 100%)",
                backdropFilter: "blur(1.5px)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* DOĞRUDAN /hakkimizda ROUTE NAVIGATION BUTONU */}
          <div data-fade="" style={{ marginBottom: "1.75rem" }}>
            <Link
              href="/hakkimizda"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #D9A441 0%, #B8842C 100%)",
                color: "#0D0F0A",
                fontSize: "0.92rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 24px -4px rgba(217, 164, 65, 0.45)",
                transition: "all 0.25s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Devamını Oku</span>
              <ArrowRight size={18} />
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
