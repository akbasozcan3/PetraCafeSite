"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { iconFromLabel } from "@/lib/content/site-icons";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import { displayHours, looksLikeHours } from "@/lib/content/hours";
import { parseArticleContent } from "@/lib/content/markdown-parser";
import { ChevronDown, ChevronUp, BookOpen, ArrowRight } from "lucide-react";

export default function HomeAbout({ content }: { content: SiteContent }) {
  const [expanded, setExpanded] = useState(false);
  const h = content.hakkimizda;
  const img = resolveMediaUrl(
    liveMedia(
      content.images?.aboutInterior || content.images?.icMekan,
      SITE_PHOTOS.interior
    )
  );

  if (!h) return null;

  const parsedBlocks = parseArticleContent(h.body || []);
  const isLongArticle = parsedBlocks.length > 2 || (h.body || []).join(" ").length > 280;
  const visibleBlocks = !expanded ? parsedBlocks.slice(0, 2) : parsedBlocks;

  return (
    <section className="section" id="hakkimizda">
      <div className="wrap grid-2 items-start">
        {/* SOL: METİN VE MAKALE İÇERİĞİ */}
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
            <p className="lead" data-fade="" style={{ marginBottom: "1.25rem" }}>
              {h.lead}
            </p>
          ) : null}

          {/* PARAGRAFLAR & BAŞLIKLAR */}
          <div className="about-content space-y-3.5" data-fade="">
            {visibleBlocks.map((block, i) => {
              if (block.type === "h1" || block.type === "h2") {
                return (
                  <h3
                    key={i}
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--ink, #0D0F0A)",
                      marginTop: "1.25rem",
                      marginBottom: "0.5rem",
                      fontFamily: "var(--font-serif, inherit)",
                    }}
                  >
                    {block.text}
                  </h3>
                );
              }
              if (block.type === "h3") {
                return (
                  <h4
                    key={i}
                    style={{
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      color: "var(--brass, #D9A441)",
                      marginTop: "1rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {block.text}
                  </h4>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: "3px solid var(--brass, #D9A441)",
                      paddingLeft: "14px",
                      fontStyle: "italic",
                      color: "var(--brass-lo, #8E8A7E)",
                      margin: "12px 0",
                    }}
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return (
                <p className="body" key={i} style={{ lineHeight: 1.75 }}>
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* DEVAMINI OKU & HAKKIMIZDA SAYFASI BUTONLARI */}
          <div className="flex flex-wrap items-center gap-3" style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }}>
            <Link
              href="/hakkimizda"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 20px",
                borderRadius: "14px",
                background: "var(--brass, #D9A441)",
                color: "#0D0F0A",
                fontSize: "0.9rem",
                fontWeight: 800,
                textDecoration: "none",
                transition: "all 0.25s ease",
                boxShadow: "0 6px 18px rgba(217, 164, 65, 0.35)",
              }}
            >
              <BookOpen size={17} />
              <span>Devamını Oku (Hakkımızda Sayfası)</span>
              <ArrowRight size={16} />
            </Link>

            {isLongArticle && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "14px",
                  background: "rgba(13, 15, 10, 0.05)",
                  color: "var(--ink, #0D0F0A)",
                  border: "1px solid rgba(13, 15, 10, 0.12)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {expanded ? (
                  <>
                    <span>Daha Az Göster</span>
                    <ChevronUp size={15} />
                  </>
                ) : (
                  <>
                    <span>Burada Genişlet</span>
                    <ChevronDown size={15} />
                  </>
                )}
              </button>
            )}
          </div>

          {/* ÖZET KARTLARI */}
          {h.ozet?.length ? (
            <div className="ozet" data-stagger="" style={{ marginTop: "1.5rem" }}>
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
