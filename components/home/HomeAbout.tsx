"use client";

import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { parseArticleContent } from "@/lib/content/markdown-parser";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

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
  // Extract clean text paragraphs (exclude headings for preview summary)
  const paragraphBlocks = parsedBlocks.filter((b) => b.type === "p" || b.type === "quote");
  const firstPara = paragraphBlocks[0]?.text || "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır.";
  const secondPara = paragraphBlocks[1]?.text || "Günün ilk ışıklarında zengin serpme kahvaltımızla güne başlayabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz.";

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2 items-start">
        {/* SOL: METİN, KISACA KARTI VE BLURLU ÖNİZLEME */}
        <div>
          <p className="eyebrow" data-fade="">
            {h.eyebrow || "02 · HAKKIMIZDA"}
          </p>
          <h1 className="h2" data-split="">
            {h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant"}
          </h1>

          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="" style={{ marginBottom: "1.25rem" }}>
              <b>{h.answerBaslik || "Kısaca"}</b>
              <p>{h.answerMetin}</p>
            </div>
          )}

          {h.lead ? (
            <p className="lead" data-fade="" style={{ marginBottom: "1.25rem", fontWeight: 600 }}>
              {h.lead}
            </p>
          ) : null}

          {/* BLURLU & GÖLGELİ ÖNİZLEME KUTUSU */}
          <div
            data-fade=""
            style={{
              position: "relative",
              borderRadius: "18px",
              padding: "18px 20px 70px 20px",
              background: "rgba(255, 255, 255, 0.65)",
              border: "1px solid rgba(217, 164, 65, 0.25)",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p className="body" style={{ margin: 0, lineHeight: 1.75, color: "#3E3A32" }}>
                {firstPara}
              </p>
              <p className="body" style={{ margin: 0, lineHeight: 1.75, color: "#3E3A32" }}>
                {secondPara}
              </p>
            </div>

            {/* ALT BLUR VE GRADIENT GEÇİŞ KATMANI */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "95px",
                background: "linear-gradient(to bottom, rgba(251, 248, 241, 0) 0%, rgba(251, 248, 241, 0.85) 45%, rgba(251, 248, 241, 1) 100%)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                padding: "0 20px 14px 20px",
                pointerEvents: "auto",
              }}
            >
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
                  boxShadow: "0 8px 24px -4px rgba(217, 164, 65, 0.5)",
                  transition: "all 0.25s ease",
                }}
                className="hover:scale-[1.03] active:scale-[0.98]"
              >
                <BookOpen size={18} />
                <span>Devamını Oku & Hikayemiz</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* ÖZET KARTLARI */}
          {h.ozet?.length ? (
            <div className="ozet" data-stagger="" style={{ marginTop: "1rem" }}>
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

        {/* SAĞ: STICKY TİLT-CARD FOTOĞRAF VE ROZET */}
        <div data-fade="" style={{ position: "sticky", top: "calc(var(--nav-h, 80px) + 24px)" }}>
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
