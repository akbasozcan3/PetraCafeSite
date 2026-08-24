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
  
  // ~300 words rich preview
  const parasToPreview = paragraphBlocks.length > 0
    ? paragraphBlocks.slice(0, 3)
    : [
        { type: "p", text: "Petra Cafe Restaurant; İstanbul Çekmeköy Taşdelen'de, Petra Yaşam Merkezi içerisinde lezzet, keyif ve konforu bir araya getiren özel bir yaşam alanıdır. Günün her saatine eşlik eden zengin menüsü, ferah atmosferi ve havuz başı deneyimiyle Petra; yalnızca yemek yemek için değil, sevdiklerinizle unutulmaz anlar biriktirmek için tasarlandı." },
        { type: "p", text: "Günün ilk ışıklarında zengin serpme kahvaltımız ve çıtır lezzetlerimizle güne harika bir başlangıç yapabilir; öğle ve akşam saatlerinde dünya mutfağının seçkin lezzetlerini, taş fırın pizzalarımızı ve ızgaralarımızı tadabilirsiniz." },
        { type: "p", text: "Yaz sezonunda Pool & Beach alanımızda şezlongunuzda güneşlenirken buz gibi imza kokteyllerimizin, İtalyan tatlılarımızın ve özel nargile karışımlarımızın keyfini çıkarabilirsiniz." }
      ];

  return (
    <section className="section" id="hakkimizda" style={{ padding: "4rem 0" }}>
      <div className="wrap grid-2 items-start" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
        
        {/* SOL: 300 KELİMEYE UYGUN ZENGİN ÖNİZLEME */}
        <div>
          <p className="eyebrow" data-fade="" style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.08em", color: "#B8842C", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            {cleanRawText(h.eyebrow || "02 · HAKKIMIZDA")}
          </p>
          <h1 className="h2" data-split="" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2, color: "#0D0F0A", margin: "0 0 1.25rem 0", fontFamily: "var(--font-serif, serif)" }}>
            {cleanRawText(h.baslik || "Petra Yaşam Merkezi'nde cafe & restaurant")}
          </h1>

          {(h.answerBaslik || h.answerMetin) && (
            <div className="answer" data-fade="" style={{ background: "rgba(217, 164, 65, 0.12)", border: "1px solid rgba(217, 164, 65, 0.3)", borderRadius: "14px", padding: "14px 18px", marginBottom: "1.25rem" }}>
              <b style={{ color: "#9E6E1A", display: "block", fontSize: "0.88rem", fontWeight: 800, marginBottom: "4px" }}>
                ✦ {cleanRawText(h.answerBaslik || "Kısaca")}
              </b>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "#3E3A32", lineHeight: 1.65 }}>
                {cleanRawText(h.answerMetin)}
              </p>
            </div>
          )}

          {h.lead ? (
            <p className="lead" data-fade="" style={{ fontSize: "1.08rem", fontWeight: 600, color: "#524D41", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {formatInlineText(h.lead)}
            </p>
          ) : null}

          {/* 300 KELİMELİK METİN VE AŞAĞI DOĞRU BLUR FADE KATMANI */}
          <div
            data-fade=""
            style={{
              position: "relative",
              maxHeight: "220px",
              overflow: "hidden",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {parasToPreview.map((p, idx) => (
                <p key={idx} className="body" style={{ margin: 0, lineHeight: 1.75, color: "#3E3A32", fontSize: "0.95rem" }}>
                  {formatInlineText(p.text || "")}
                </p>
              ))}
            </div>

            {/* AŞAĞI DOĞRU YUMUŞAK GRADIENT FADE + HAFİF BLUR EFEKTİ */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background: "linear-gradient(to bottom, rgba(251, 248, 241, 0) 0%, rgba(251, 248, 241, 0.75) 50%, rgba(251, 248, 241, 1) 100%)",
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
                gap: "10px",
                padding: "13px 26px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #D9A441 0%, #B8842C 100%)",
                color: "#0D0F0A",
                fontSize: "0.95rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 24px -4px rgba(217, 164, 65, 0.45)",
                transition: "all 0.25s ease",
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen size={18} />
              <span>Devamını Oku & Hikayemiz</span>
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
