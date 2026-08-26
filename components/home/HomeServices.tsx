"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type TouchEvent } from "react";
import type { SiteContent, HizmetItem } from "@/lib/content/types";
import { iconFromLabel, type SiteIconId } from "@/lib/content/site-icons";
import { resolveHref } from "@/lib/site/resolveHref";
import SiteIcon from "@/components/site/SiteIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeServices({ content }: { content: SiteContent }) {
  const bolum = content.bolumlar?.hizmetler;
  const list = (content.hizmetler || []).filter((item) => item.label?.trim());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = list.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Eyebrow: DB'de yanlış değer gelse de "HİZMETLER" doğru göster
  const rawEyebrow = bolum?.eyebrow || "";
  const eyebrowText = (() => {
    const m = rawEyebrow.match(/^(\d{1,2})\s*[·.\-]\s*(.+)$/);
    if (m) {
      const num = m[1].padStart(2, "0");
      const label = m[2].trim();
      const clean = /^petra(\s+yaşam(\s+merkezi)?)?$/i.test(label) ? "HİZMETLER" : label;
      return `${num} · ${clean}`;
    }
    if (rawEyebrow.trim()) return rawEyebrow.trim();
    return "02 · HİZMETLER";
  })();

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || total <= visibleCount) return;
    const timer = window.setInterval(handleNext, 4200);
    return () => window.clearInterval(timer);
  }, [handleNext, isPaused, total, visibleCount]);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!total) return null;

  const hasNext = currentIndex < maxIndex;
  const hasPrev = currentIndex > 0;

  return (
    <>
      {/*
       * Section: overflow:hidden — tüm taşan kartları keser.
       * Blur overlay'ler section'a relative konumlanır, wrap'ın dışında.
       * Bu sayede wrap'ın padding/margin'i blur'ü etkilemez.
       */}
      <section
        className="section section--warm hizmet-sec"
        id="hizmetler"
        aria-label="Hizmetler"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="wrap hs-inner">
          {/* ── HEADER ── */}
          <div className="hs-head">
            <div className="hs-copy">
              <p className="eyebrow hs-eyebrow" data-fade="">
                {eyebrowText}
              </p>
              <h2 className="hs-title" data-split="">
                {bolum?.baslik || "Cafe · Restaurant · Pool & Beach"}
              </h2>
              <p className="hs-lead" data-fade="">
                {bolum?.lead ||
                  "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve ve nargile — havuz kenarında veya salonda."}
              </p>
            </div>

            <div className="hs-controls" aria-label="Hizmet slayt kontrolleri">
              <span className="hs-counter" aria-live="polite">
                <b>{String(currentIndex + 1).padStart(2, "0")}</b>
                <span>/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </span>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Önceki hizmet"
                disabled={!hasPrev && total <= visibleCount}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Sonraki hizmet"
                disabled={!hasNext && total <= visibleCount}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ── SLIDER ── */}
          <div
            className="hs-track-wrap"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Blur overlay'ler track-wrap'a relative — tam kart bölgesini örter */}
            <div className="hs-fade hs-fade--l" aria-hidden="true" data-visible={hasPrev ? "1" : "0"} />
            <div className="hs-fade hs-fade--r" aria-hidden="true" data-visible={hasNext ? "1" : "0"} />
            <div
              className="hs-track"
              style={{
                transform: `translate3d(-${currentIndex * (100 / visibleCount)}%, 0, 0)`,
              }}
            >
              {list.map((item, idx) => (
                <ServiceSlide
                  key={`${item.label}-${idx}`}
                  item={item}
                  index={idx}
                  visibleCount={visibleCount}
                />
              ))}
            </div>
          </div>

          {/* ── DOTS ── */}
          {total > visibleCount && (
            <div className="hs-dots" role="tablist" aria-label="Hizmet slaytları">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Slayt ${i + 1}`}
                  aria-selected={currentIndex === i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* ═══ Section ═══ */
        .hizmet-sec {
          position: relative;
          overflow: hidden;
        }
        .hs-inner {
          max-width: 1240px;
          position: relative;
          z-index: 1;
        }

        /* ═══ Eyebrow ═══ */
        .hs-eyebrow {
          color: var(--brass-lo, #b8842c) !important;
        }

        /* ═══ Header ═══ */
        .hs-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: clamp(32px, 4vw, 52px);
        }
        .hs-copy { max-width: 680px; }

        .hs-title {
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.12;
        }
        .hs-lead {
          max-width: 60ch;
          margin: 12px 0 0;
          color: #5a5f52;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.68;
        }

        /* ═══ Kontroller ═══ */
        .hs-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
        }
        .hs-counter {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 40px;
          padding: 0 14px;
          border: 1px solid rgba(22,25,15,.09);
          border-radius: 999px;
          background: rgba(255,255,255,.8);
          color: #7c8173;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 700;
        }
        .hs-counter b { color: #b8842c; }

        .hs-controls button {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(22,25,15,.1);
          border-radius: 13px;
          background: #fff;
          color: #16190f;
          cursor: pointer;
          font: inherit;
          transition: background .22s, border-color .22s, transform .22s, color .22s;
        }
        .hs-controls button:disabled { opacity: .35; cursor: default; }

        /* ═══ Blur fade overlay'ler ═══
         * Track wrap'a RELATIVE konumlanır (section'a değil).
         * Böylece tam olarak kartların yanlarını örter.
         * ══════════════════════════════════════════ */
        .hs-track-wrap {
          position: relative; /* fade'lere referans noktası */
        }
        .hs-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 3;
          width: clamp(70px, 9vw, 130px);
          pointer-events: none;
          transition: opacity .35s ease;
        }
        .hs-fade[data-visible="0"] { opacity: 0; }
        .hs-fade[data-visible="1"] { opacity: 1; }

        .hs-fade--l {
          left: 0;
          background: linear-gradient(
            to right,
            var(--paper, #fbf8f1) 0%,
            var(--paper, #fbf8f1) 20%,
            rgba(251,248,241,.75) 60%,
            rgba(251,248,241,0) 100%
          );
        }
        .hs-fade--r {
          right: 0;
          background: linear-gradient(
            to left,
            var(--paper, #fbf8f1) 0%,
            var(--paper, #fbf8f1) 20%,
            rgba(251,248,241,.75) 60%,
            rgba(251,248,241,0) 100%
          );
        }

        /* ═══ Track ═══ */
        .hs-track-wrap {
          position: relative;
          padding: 14px 0 18px;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }
        .hs-track-wrap:active { cursor: grabbing; }

        .hs-track {
          display: flex;
          align-items: stretch;
          width: 100%;
          transition: transform .52s cubic-bezier(.22,.61,.36,1);
          will-change: transform;
        }

        /* ═══ Slide ═══ */
        .hs-slide {
          flex: 0 0 auto;
          min-width: 0;
          padding: 0 9px;
          box-sizing: border-box;
        }

        /* ═══ Kart ═══ */
        .hs-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
          height: 100%;
          overflow: hidden;
          padding: clamp(22px, 2.4vw, 30px);
          border: 1px solid rgba(22,25,15,.08);
          border-radius: 22px;
          background: rgba(255,255,255,.94);
          color: inherit;
          text-decoration: none;
          transition: border-color .25s, background .25s, transform .28s;
        }

        /* Watermark */
        .hs-card__wm {
          position: absolute;
          right: 14px;
          bottom: -8px;
          color: rgba(22,25,15,.03);
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(60px, 7vw, 88px);
          font-weight: 800;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* İkon */
        .hs-card__top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .hs-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border: 1px solid rgba(217,164,65,.3);
          border-radius: 14px;
          background: linear-gradient(135deg, #faf6ef, #ede5d5);
          color: #b8842c;
        }
        .hs-card__emoji { font-size: 24px; line-height: 1; }

        /* İçerik */
        .hs-card__body {
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .hs-card__title {
          display: block;
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(19px, 1.8vw, 24px);
          font-weight: 700;
          line-height: 1.2;
        }
        .hs-card__text {
          display: block;
          margin: 10px 0 0;
          color: #5c6153;
          font-size: 14.5px;
          line-height: 1.65;
        }

        /* Footer */
        .hs-card__foot {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid rgba(22,25,15,.07);
          font-size: 12px;
          font-weight: 700;
        }
        .hs-card__signal {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #9e6e19;
        }
        .hs-card__signal i {
          width: 6px; height: 6px;
          flex: 0 0 6px;
          border-radius: 999px;
          background: #d9a441;
          display: block;
        }
        .hs-card__num {
          color: rgba(22,25,15,.38);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
        }

        /* Alt çizgi hover */
        .hs-card__line {
          position: absolute;
          right: 0; bottom: 0; left: 0;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #d9a441, transparent);
          opacity: 0;
          transition: opacity .25s;
          border-radius: 0 0 22px 22px;
        }

        /* ═══ Dots ═══ */
        .hs-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 28px;
        }
        .hs-dots button {
          appearance: none;
          border: 0; padding: 0;
          width: 8px; height: 8px;
          border-radius: 999px;
          background: rgba(22,25,15,.16);
          cursor: pointer;
          transition: width .28s, background .28s;
        }
        .hs-dots button[aria-selected="true"] {
          width: 30px;
          background: #d9a441;
        }

        /* ═══ Hover states ═══ */
        @media (hover: hover) {
          .hs-controls button:not(:disabled):hover {
            border-color: #d9a441;
            background: #d9a441;
            color: #fff;
            transform: translateY(-2px);
          }
          .hs-card:hover {
            border-color: rgba(217,164,65,.45);
            background: #fff;
            transform: translateY(-5px);
          }
          .hs-card:hover .hs-card__title { color: #9e6e19; }
          .hs-card:hover .hs-card__line { opacity: 1; }
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 860px) {
          .hs-head {
            align-items: flex-start;
            flex-direction: column;
          }
        }
        @media (max-width: 640px) {
          .hs-controls { width: 100%; justify-content: space-between; }
          .hs-counter { margin-right: auto; }
          .hs-card { min-height: 280px; }
        }
      `}</style>
    </>
  );
}

function ServiceSlide({
  item,
  index,
  visibleCount,
}: {
  item: HizmetItem;
  index: number;
  visibleCount: number;
}) {
  const icon = (item.icon || iconFromLabel(item.label)) as SiteIconId;
  const num = String(index + 1).padStart(2, "0");
  const href = item.href?.trim() ? resolveHref(item.href) : "";
  const footLabel = href ? "Detayları incele" : "Petra hizmeti";

  const inner = (
    <>
      <span className="hs-card__wm" aria-hidden="true">{num}</span>
      <span className="hs-card__top">
        <span className="hs-card__icon" aria-hidden="true">
          <SiteIcon name={icon} size={23} />
        </span>
        {item.emoji && (
          <span className="hs-card__emoji" aria-hidden="true">{item.emoji}</span>
        )}
      </span>
      <span className="hs-card__body">
        <strong className="hs-card__title">{item.label}</strong>
        {item.aciklama && (
          <span className="hs-card__text">{item.aciklama}</span>
        )}
      </span>
      <span className="hs-card__foot">
        <span className="hs-card__signal">
          <i aria-hidden="true" />
          <span>{footLabel}</span>
        </span>
        <span className="hs-card__num">#{num}</span>
      </span>
      <span className="hs-card__line" aria-hidden="true" />
    </>
  );

  return (
    <div className="hs-slide" style={{ width: `${100 / visibleCount}%` }}>
      {href ? (
        <Link href={href} className="hs-card" aria-label={`${item.label} detaylarını aç`}>
          {inner}
        </Link>
      ) : (
        <span className="hs-card">{inner}</span>
      )}
    </div>
  );
}
