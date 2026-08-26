"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
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

  // Eyebrow: Admin değeri ne olursa olsun "02 · HİZMETLER" formatını koru
  // DB'de "02 · PETRA" gibi yanlış değer gelebilir — güvenli parse
  const rawEyebrow = bolum?.eyebrow || "";
  const eyebrowText = (() => {
    // "NN · XYZ" pattern'ı varsa number kısmını al, label'ı "HİZMETLER" yap
    const m = rawEyebrow.match(/^(\d{1,2})\s*[·.\-]\s*(.+)$/);
    if (m) {
      const num = m[1].padStart(2, "0");
      const label = m[2].trim();
      // Label anlamlıysa göster, değilse fallback
      const clean = /^petra(\s+yaşam(\s+merkezi)?)?$/i.test(label) ? "HİZMETLER" : label;
      return `${num} · ${clean}`;
    }
    // Hiç pattern yoksa: sadece metin varsa onu göster, yoksa default
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
      <section
        className="section section--warm hizmet hizmet-modern"
        id="hizmetler"
        aria-label="Hizmetler"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="wrap hizmet-modern__inner">
          {/* ── HEADER ── */}
          <div className="hizmet-modern__head">
            <div className="hizmet-modern__copy">
              <p className="eyebrow" data-fade="">
                {eyebrowText}
              </p>
              <h2 className="hizmet-modern__title" data-split="">
                {bolum?.baslik || "Cafe · Restaurant · Pool & Beach"}
              </h2>
              <p className="hizmet-modern__lead" data-fade="">
                {bolum?.lead ||
                  "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, taze kahve ve nargile — havuz kenarında veya salonda."}
              </p>
            </div>

            <div className="hizmet-modern__controls" aria-label="Hizmet slayt kontrolleri">
              <span className="hizmet-modern__counter" aria-live="polite">
                <b>{String(currentIndex + 1).padStart(2, "0")}</b>
                <span>/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </span>
              <button type="button" onClick={handlePrev} aria-label="Önceki hizmet" disabled={total <= visibleCount}>
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button type="button" onClick={handleNext} aria-label="Sonraki hizmet" disabled={total <= visibleCount}>
                <ChevronRight aria-hidden="true" size={20} />
              </button>
            </div>
          </div>

          {/* ── SLIDER ── */}
          <div className="hizmet-slider-outer">
            {/* Sol blur — önceki kartlar var */}
            <div
              className="hizmet-blur hizmet-blur--left"
              style={{ opacity: hasPrev ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Sağ blur — sonraki kartlar var */}
            <div
              className="hizmet-blur hizmet-blur--right"
              style={{ opacity: hasNext ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Track wrapper */}
            <div
              className="hizmet-track-wrap"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="hizmet-track"
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
          </div>

          {/* ── DOTS ── */}
          {total > visibleCount && (
            <div className="hizmet-dots" role="tablist" aria-label="Hizmet slaytları">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  role="tab"
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Slayt ${dotIdx + 1}`}
                  aria-selected={currentIndex === dotIdx}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* ─── Eyebrow renk override ─── */
        #hizmetler .eyebrow {
          color: var(--brass-lo, #b8842c);
        }

        /* ─── Section wrapper ─── */
        .hizmet-modern {
          overflow: visible; /* fade dışarı taşmasın diye outer'da handle ediyoruz */
        }
        .hizmet-modern__inner {
          max-width: 1240px;
        }

        /* ─── Header ─── */
        .hizmet-modern__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: clamp(32px, 4vw, 52px);
        }
        .hizmet-modern__copy {
          max-width: 680px;
        }
        .hizmet-modern__title {
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.12;
        }
        .hizmet-modern__lead {
          max-width: 60ch;
          margin: 12px 0 0;
          color: #5a5f52;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.68;
        }

        /* ─── Kontroller ─── */
        .hizmet-modern__controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
        }
        .hizmet-modern__counter {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 40px;
          padding: 0 12px;
          border: 1px solid rgba(22, 25, 15, 0.09);
          border-radius: 999px;
          background: rgba(255,255,255,0.8);
          color: #7c8173;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 700;
        }
        .hizmet-modern__counter b {
          color: #b8842c;
        }
        .hizmet-modern__controls button {
          appearance: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(22, 25, 15, 0.1);
          border-radius: 13px;
          background: #fff;
          color: #16190f;
          cursor: pointer;
          font: inherit;
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease, opacity 0.22s ease;
        }
        .hizmet-modern__controls button:disabled {
          opacity: 0.35;
          cursor: default;
        }

        /* ─── Slider outer: clip + pozisyon ─── */
        .hizmet-slider-outer {
          position: relative;
          /* Kartların yukarı/aşağı taşmasına izin ver ama yanlara kessin */
          overflow: hidden;
          /* Sağ/sol blur için padding yok — blur absolute overlay */
        }

        /* ─── Blur overlay'ler ─── */
        .hizmet-blur {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 5;
          width: clamp(60px, 8vw, 120px);
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .hizmet-blur--left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--paper, #fbf8f1) 0%,
            var(--paper, #fbf8f1) 30%,
            rgba(251, 248, 241, 0.6) 65%,
            rgba(251, 248, 241, 0) 100%
          );
        }
        .hizmet-blur--right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--paper, #fbf8f1) 0%,
            var(--paper, #fbf8f1) 30%,
            rgba(251, 248, 241, 0.6) 65%,
            rgba(251, 248, 241, 0) 100%
          );
        }

        /* ─── Track wrapper ─── */
        .hizmet-track-wrap {
          padding: 14px 0 18px;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }
        .hizmet-track-wrap:active {
          cursor: grabbing;
        }
        .hizmet-track {
          display: flex;
          align-items: stretch;
          width: 100%;
          transition: transform 0.52s cubic-bezier(0.22, 0.61, 0.36, 1);
          will-change: transform;
        }

        /* ─── Slide item ─── */
        .hizmet-slide {
          flex: 0 0 auto;
          min-width: 0;
          padding: 0 9px;
          box-sizing: border-box;
        }

        /* ─── Kart ─── */
        .hizmet-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
          height: 100%;
          overflow: hidden;
          padding: clamp(22px, 2.4vw, 30px);
          border: 1px solid rgba(22, 25, 15, 0.08);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.94);
          color: inherit;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.28s ease;
        }

        /* Watermark numarası */
        .hizmet-card__wm {
          position: absolute;
          right: 14px;
          bottom: -8px;
          color: rgba(22, 25, 15, 0.03);
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(60px, 7vw, 88px);
          font-weight: 800;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.03em;
        }

        /* İkon alanı */
        .hizmet-card__top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .hizmet-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border: 1px solid rgba(217, 164, 65, 0.3);
          border-radius: 14px;
          background: linear-gradient(135deg, #faf6ef, #ede5d5);
          color: #b8842c;
        }
        .hizmet-card__emoji {
          font-size: 24px;
          line-height: 1;
        }

        /* Başlık ve metin */
        .hizmet-card__body {
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .hizmet-card__title {
          display: block;
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(19px, 1.8vw, 24px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.005em;
        }
        .hizmet-card__text {
          display: block;
          margin: 10px 0 0;
          color: #5c6153;
          font-size: 14.5px;
          line-height: 1.65;
        }

        /* Footer */
        .hizmet-card__foot {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid rgba(22, 25, 15, 0.07);
          font-size: 12px;
          font-weight: 700;
        }
        .hizmet-card__signal {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #9e6e19;
        }
        .hizmet-card__signal i {
          width: 6px;
          height: 6px;
          flex: 0 0 6px;
          border-radius: 999px;
          background: #d9a441;
          display: block;
        }
        .hizmet-card__num {
          color: rgba(22, 25, 15, 0.38);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
        }

        /* Alt çizgi animasyonu */
        .hizmet-card__line {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2.5px;
          background: linear-gradient(90deg, transparent 0%, #d9a441 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 0 0 22px 22px;
        }

        /* ─── Dots ─── */
        .hizmet-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 28px;
        }
        .hizmet-dots button {
          appearance: none;
          border: 0;
          padding: 0;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(22, 25, 15, 0.16);
          cursor: pointer;
          transition: width 0.28s ease, background 0.28s ease;
        }
        .hizmet-dots button[aria-selected="true"] {
          width: 30px;
          background: #d9a441;
        }

        /* ─── Hover ─── */
        @media (hover: hover) {
          .hizmet-modern__controls button:not(:disabled):hover {
            border-color: #d9a441;
            background: #d9a441;
            color: #fff;
            transform: translateY(-2px);
          }
          .hizmet-card:hover {
            border-color: rgba(217, 164, 65, 0.45);
            background: #fff;
            transform: translateY(-5px);
          }
          .hizmet-card:hover .hizmet-card__title {
            color: #9e6e19;
          }
          .hizmet-card:hover .hizmet-card__line {
            opacity: 1;
          }
        }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .hizmet-modern__head {
            align-items: flex-start;
            flex-direction: column;
          }
        }
        @media (max-width: 640px) {
          .hizmet-modern__controls {
            width: 100%;
            justify-content: space-between;
          }
          .hizmet-modern__counter {
            margin-right: auto;
          }
          .hizmet-card {
            min-height: 280px;
          }
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
      {/* Watermark */}
      <span className="hizmet-card__wm" aria-hidden="true">{num}</span>

      {/* İkon */}
      <span className="hizmet-card__top">
        <span className="hizmet-card__icon" aria-hidden="true">
          <SiteIcon name={icon} size={23} />
        </span>
        {item.emoji && (
          <span className="hizmet-card__emoji" aria-hidden="true">{item.emoji}</span>
        )}
      </span>

      {/* İçerik */}
      <span className="hizmet-card__body">
        <strong className="hizmet-card__title">{item.label}</strong>
        {item.aciklama && (
          <span className="hizmet-card__text">{item.aciklama}</span>
        )}
      </span>

      {/* Footer */}
      <span className="hizmet-card__foot">
        <span className="hizmet-card__signal">
          <i aria-hidden="true" />
          <span>{footLabel}</span>
        </span>
        <span className="hizmet-card__num">#{num}</span>
      </span>

      {/* Alt çizgi */}
      <span className="hizmet-card__line" aria-hidden="true" />
    </>
  );

  return (
    <div className="hizmet-slide" style={{ width: `${100 / visibleCount}%` }}>
      {href ? (
        <Link
          href={href}
          className="hizmet-card hizmet-card--link"
          aria-label={`${item.label} detaylarını aç`}
        >
          {inner}
        </Link>
      ) : (
        <span className="hizmet-card">{inner}</span>
      )}
    </div>
  );
}
