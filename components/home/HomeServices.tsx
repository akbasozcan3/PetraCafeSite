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
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = list.length;
  const maxIndex = Math.max(0, total - visibleCount);
  const eyebrowText = bolum?.eyebrow || "02 · HİZMETLER";
  const eyebrowMatch = eyebrowText.match(/^(\d{2})\s*[·.-]\s*(.+)$/);
  const eyebrowNumber = eyebrowMatch?.[1] || "02";
  const parsedEyebrowLabel = eyebrowMatch?.[2]?.trim();
  const eyebrowLabel =
    parsedEyebrowLabel && !/^petra(\s+yaşam\s+merkezi)?$/i.test(parsedEyebrowLabel)
      ? parsedEyebrowLabel
      : "HİZMETLER";

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
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!total) return null;

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
          <div className="hizmet-modern__head">
            <div className="hizmet-modern__copy">
              {/* Diğer section'larla aynı pill badge tasarımı */}
              <p className="hizmet-modern__eyebrow" data-fade="">
                <span className="hizmet-modern__eyebrow-num">{eyebrowNumber}</span>
                <span className="hizmet-modern__eyebrow-dot" aria-hidden="true">·</span>
                <span>{eyebrowLabel}</span>
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
              <button type="button" onClick={handlePrev} aria-label="Önceki hizmet">
                <ChevronLeft aria-hidden="true" size={21} />
              </button>
              <button type="button" onClick={handleNext} aria-label="Sonraki hizmet">
                <ChevronRight aria-hidden="true" size={21} />
              </button>
            </div>
          </div>

          {/* Slider wrapper — overflow: hidden ile kırpmayı önle */}
          <div className="hizmet-slider-wrap">
            <div
              className="hizmet-slider"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="hizmet-slider__track"
                style={{ transform: `translate3d(-${currentIndex * (100 / visibleCount)}%, 0, 0)` }}
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

            {/* Kenar solma efektleri — sadece gizlenecek tarafta */}
            {currentIndex > 0 && (
              <span className="hizmet-slider-fade hizmet-slider-fade--left" aria-hidden="true" />
            )}
            {currentIndex < maxIndex && (
              <span className="hizmet-slider-fade hizmet-slider-fade--right" aria-hidden="true" />
            )}
          </div>

          {total > visibleCount ? (
            <div className="hizmet-slider__dots" aria-label="Hizmet slaytları">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Slayt ${dotIdx + 1}`}
                  aria-current={currentIndex === dotIdx ? "true" : undefined}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <style>{`
        /* ── Section wrapper ── */
        .hizmet-modern {
          overflow: hidden;
        }

        .hizmet-modern__inner {
          max-width: 1240px;
        }

        /* ── Header row ── */
        .hizmet-modern__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: clamp(34px, 4vw, 54px);
        }

        .hizmet-modern__copy {
          max-width: 690px;
        }

        /* ── Eyebrow badge — diğer section'larla aynı pill tasarımı ── */
        .hizmet-modern__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 16px;
          padding: 6px 14px 6px 8px;
          border: 1.5px solid rgba(217, 164, 65, 0.38);
          border-radius: 999px;
          background: rgba(217, 164, 65, 0.08);
          color: var(--brass-lo, #b8842c);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.13em;
          line-height: 1;
          text-transform: uppercase;
        }

        .hizmet-modern__eyebrow-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: rgba(217, 164, 65, 0.18);
          border: 1px solid rgba(217, 164, 65, 0.3);
          color: var(--brass, #c9932a);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .hizmet-modern__eyebrow-dot {
          color: rgba(184, 132, 44, 0.45);
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
        }

        /* ── Başlık & lead ── */
        .hizmet-modern__title {
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.12;
        }

        .hizmet-modern__lead {
          max-width: 62ch;
          margin: 14px 0 0;
          color: #5a5f52;
          font-size: clamp(15px, 1.35vw, 18px);
          line-height: 1.65;
        }

        /* ── Kontroller ── */
        .hizmet-modern__controls {
          display: flex;
          align-items: center;
          gap: 11px;
          flex: 0 0 auto;
        }

        .hizmet-modern__counter {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 42px;
          padding: 0 13px;
          border: 1px solid rgba(22, 25, 15, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          color: #7c8173;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 700;
        }

        .hizmet-modern__counter b {
          color: #b8842c;
        }

        .hizmet-modern__controls button,
        .hizmet-slider__dots button {
          appearance: none;
          border: 0;
          cursor: pointer;
          font: inherit;
        }

        .hizmet-modern__controls button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(22, 25, 15, 0.1);
          border-radius: 14px;
          background: #fff;
          color: #16190f;
          transition: background 0.25s var(--ease, ease), border-color 0.25s var(--ease, ease), transform 0.25s var(--ease, ease);
        }

        /* ── Slider wrapper: kenar fade'leri için relative+overflow:hidden ── */
        .hizmet-slider-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        /* ── Kenar solma efektleri ── */
        .hizmet-slider-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 4;
          width: clamp(48px, 6vw, 80px);
          pointer-events: none;
        }

        .hizmet-slider-fade--left {
          left: 0;
          background: linear-gradient(90deg, var(--paper, #fbf8f1) 0%, rgba(251, 248, 241, 0) 100%);
        }

        .hizmet-slider-fade--right {
          right: 0;
          background: linear-gradient(270deg, var(--paper, #fbf8f1) 0%, rgba(251, 248, 241, 0) 100%);
        }

        /* ── Slider ── */
        .hizmet-slider {
          position: relative;
          padding: 12px 0;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }

        .hizmet-slider:active {
          cursor: grabbing;
        }

        .hizmet-slider__track {
          display: flex !important;
          align-items: stretch;
          width: 100%;
          transition: transform 0.5s var(--ease, cubic-bezier(0.22, 0.61, 0.36, 1));
          will-change: transform;
        }

        .hizmet-slider__item {
          flex: 0 0 auto;
          min-width: 0;
          padding: 0 10px;
          box-sizing: border-box;
        }

        /* ── Hizmet kartı ── */
        .hizmet-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 292px;
          height: 100%;
          overflow: hidden;
          padding: clamp(22px, 2.4vw, 30px);
          border: 1px solid rgba(22, 25, 15, 0.08);
          border-radius: var(--r-lg, 22px);
          background: rgba(255, 255, 255, 0.92);
          color: inherit;
          text-decoration: none;
          transition: border-color 0.25s var(--ease, ease), background 0.25s var(--ease, ease), transform 0.25s var(--ease, ease);
        }

        .hizmet-card__watermark {
          position: absolute;
          right: 18px;
          bottom: -5px;
          color: rgba(22, 25, 15, 0.035);
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(58px, 6vw, 82px);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .hizmet-card__top {
          position: relative;
          z-index: 1;
          display: block;
          margin-bottom: 23px;
        }

        .hizmet-card__icons {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .hizmet-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border: 1px solid rgba(217, 164, 65, 0.32);
          border-radius: 14px;
          background: linear-gradient(135deg, #faf7f0, #efe8d8);
          color: #b8842c;
        }

        .hizmet-card__emoji {
          font-size: 25px;
          line-height: 1;
        }

        .hizmet-card__title {
          position: relative;
          z-index: 1;
          display: block;
          margin: 0;
          color: #16190f;
          font-family: var(--f-head), Georgia, serif;
          font-size: clamp(21px, 2vw, 27px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.18;
        }

        .hizmet-card__text {
          position: relative;
          z-index: 1;
          display: block;
          margin: 12px 0 0;
          color: #5a5f52;
          font-size: 15px;
          line-height: 1.62;
        }

        .hizmet-card__foot {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 24px;
          padding-top: 17px;
          border-top: 1px solid rgba(22, 25, 15, 0.07);
          color: #7c8173;
          font-size: 12px;
          font-weight: 700;
        }

        .hizmet-card__signal {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9e6e19;
          min-width: 0;
        }

        .hizmet-card__signal i {
          width: 7px;
          height: 7px;
          flex: 0 0 7px;
          border-radius: 999px;
          background: #d9a441;
          display: block;
        }

        .hizmet-card__index {
          color: rgba(22, 25, 15, 0.45);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
        }

        .hizmet-card__line {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d9a441, transparent);
          opacity: 0;
          transition: opacity 0.25s var(--ease, ease);
        }

        /* ── Dots ── */
        .hizmet-slider__dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .hizmet-slider__dots button {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(22, 25, 15, 0.18);
          transition: width 0.25s var(--ease, ease), background 0.25s var(--ease, ease);
          padding: 0;
        }

        .hizmet-slider__dots button[aria-current="true"] {
          width: 32px;
          background: #d9a441;
        }

        /* ── Hover ── */
        @media (hover: hover) {
          .hizmet-modern__controls button:hover {
            border-color: #d9a441;
            background: #d9a441;
            color: #fff;
            transform: translateY(-2px);
          }

          .hizmet-card:hover {
            border-color: rgba(217, 164, 65, 0.5);
            background: #fff;
            transform: translateY(-4px);
          }

          .hizmet-card:hover .hizmet-card__title {
            color: #9e6e19;
          }

          .hizmet-card:hover .hizmet-card__line {
            opacity: 1;
          }
        }

        /* ── Responsive ── */
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
            min-height: 270px;
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
  const formattedIndex = String(index + 1).padStart(2, "0");
  const href = item.href?.trim() ? resolveHref(item.href) : "";
  const footLabel = href ? "Detayları incele" : "Petra hizmeti";
  const cardContent = (
    <>
      <span className="hizmet-card__watermark" aria-hidden="true">
        {formattedIndex}
      </span>
      <span className="hizmet-card__top">
        <span className="hizmet-card__icons">
          <span className="hizmet-card__icon" aria-hidden="true">
            <SiteIcon name={icon} size={24} />
          </span>
          {item.emoji ? (
            <span className="hizmet-card__emoji" aria-hidden="true">
              {item.emoji}
            </span>
          ) : null}
        </span>
      </span>
      <span>
        <strong className="hizmet-card__title">{item.label}</strong>
        {item.aciklama ? <span className="hizmet-card__text">{item.aciklama}</span> : null}
      </span>
      <span className="hizmet-card__foot">
        <span className="hizmet-card__signal">
          <i aria-hidden="true" />
          <span>{footLabel}</span>
        </span>
        <span className="hizmet-card__index">#{formattedIndex}</span>
      </span>
      <span className="hizmet-card__line" aria-hidden="true" />
    </>
  );

  return (
    <div className="hizmet-slider__item" style={{ width: `${100 / visibleCount}%` }}>
      {href ? (
        <Link href={href} className="hizmet-card hizmet-card--link" aria-label={`${item.label} detaylarını aç`}>
          {cardContent}
        </Link>
      ) : (
        <span className="hizmet-card">{cardContent}</span>
      )}
    </div>
  );
}
