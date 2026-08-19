"use client";

import { useEffect, useState } from "react";
import type { YorumItem, YorumlarMeta } from "@/lib/content/types";

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2) || "M"
  );
}

function StarIcon({ on }: { on: boolean }) {
  return (
    <svg
      className={on ? "is-on" : "is-off"}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2.35l2.62 6.28 6.83.55-5.2 4.48 1.57 6.64L12 16.92 6.18 20.3l1.57-6.64-5.2-4.48 6.83-.55L12 2.35z"
      />
    </svg>
  );
}

function StarRow({ n, className }: { n: number; className?: string }) {
  const stars = Math.max(1, Math.min(5, n));
  return (
    <div className={className} aria-label={`5 üzerinden ${stars} yıldız`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} on={i < stars} />
      ))}
    </div>
  );
}

export default function HomeReviews({
  items,
  bolum,
  meta,
}: {
  items: YorumItem[];
  bolum?: { eyebrow?: string; baslik?: string; lead?: string };
  meta?: YorumlarMeta;
}) {
  const list = items?.length ? items : [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dogrulama = meta?.dogrulamaEtiketi || "Doğrulanmış Google Yorumu";
  const unvanDef = meta?.unvanVarsayilan || "Misafir";

  useEffect(() => {
    if (list.length <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [list.length, paused, index]);

  if (!list.length) return null;

  function pad(n: number) {
    return (n < 10 ? "0" : "") + n;
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + list.length) % list.length);
  }

  const badgeHref = meta?.googleUrl || "";
  const eyebrow = bolum?.eyebrow || "Misafir Yorumları";

  return (
    <section className="section reviews" id="yorumlar" aria-labelledby="yorumlarBaslik">
      <div className="wrap reviews-wrap">
        <header className="reviews-head">
          <p className="eyebrow reviews-kicker" data-fade="">
            {eyebrow}
          </p>
          <h2 className="h2" id="yorumlarBaslik" data-split="">
            {bolum?.baslik || "Petralovers"}
          </h2>
          {bolum?.lead ? (
            <p className="lead reviews-lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
        </header>

        <div
          className={`reviews-stage${paused ? " is-paused" : ""}`}
          id="yorumlar-kart"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            (e.currentTarget as HTMLElement & { _sx?: number })._sx =
              e.touches[0]?.clientX;
          }}
          onTouchEnd={(e) => {
            const el = e.currentTarget as HTMLElement & { _sx?: number };
            const start = el._sx;
            if (start == null) return;
            const dx = (e.changedTouches[0]?.clientX ?? 0) - start;
            el._sx = undefined;
            if (Math.abs(dx) < 40) return;
            go(dx < 0 ? 1 : -1);
          }}
        >
          <div className="yorumlar reviews-track" id="yorumlarTrack" aria-live="polite">
            {list.map((y, i) => {
              const name = y.ad || "Misafir";
              const stars = Math.max(1, Math.min(5, y.yildiz || 5));
              const text = String(y.metin || "")
                .trim()
                .replace(/^[“"']+|[”"']+$/g, "");
              return (
                <figure
                  key={`${name}-${i}`}
                  className={`yorum${i === index ? " is-active" : ""}`}
                  aria-hidden={i !== index}
                >
                  <div className="yorum__top">
                    <StarRow n={stars} className="yorum__yildiz" />
                    <span className="yorum__quote" aria-hidden="true">
                      <svg width="36" height="28" viewBox="0 0 36 28">
                        <path
                          fill="currentColor"
                          d="M0 28V16.4C0 7.2 4.9 1.6 14.6 0l1.2 4.1C9.8 6 7.2 9.6 7.2 16.2H14V28H0zm20.6 0V16.4c0-9.2 4.8-14.8 14.5-16.4L36.3 4c-6 1.9-8.6 5.5-8.6 12.1h6.8V28H20.6z"
                        />
                      </svg>
                    </span>
                  </div>
                  <blockquote>{text}</blockquote>
                  <figcaption>
                    <div className="yorum__avatar" aria-hidden="true">
                      {initials(name)}
                    </div>
                    <div className="yorum__meta">
                      <b>{name}</b>
                      <span>
                        {y.unvan || unvanDef}
                        <i className="yorum__sep" aria-hidden="true">
                          ·
                        </i>
                        <span className="yorum__verified">
                          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.16" />
                            <path
                              fill="currentColor"
                              d="M10.2 15.4l-3.1-3.1 1.1-1.1 2 2 4.6-4.6 1.1 1.1z"
                            />
                          </svg>
                          {dogrulama}
                        </span>
                      </span>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <div className="reviews-progress" aria-hidden="true">
            <i id="reviewsProgress" key={index} />
          </div>

          {list.length > 1 ? (
            <div className="reviews-controls" aria-label="Yorum gezintisi">
              <button
                type="button"
                className="reviews-btn reviews-btn--prev"
                id="reviewPrev"
                aria-label="Önceki yorum"
                onClick={() => go(-1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="reviews-dots" id="reviewsDots" role="tablist" aria-label="Yorumlar">
                {list.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`reviews-dot${i === index ? " is-active" : ""}`}
                    aria-label={`Yorum ${i + 1}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <div className="reviews-counter" aria-live="polite">
                <span id="reviewCurrent">{pad(index + 1)}</span>
                <span className="reviews-counter-slash">/</span>
                <span id="reviewTotal">{pad(list.length)}</span>
              </div>
              <button
                type="button"
                className="reviews-btn reviews-btn--next"
                id="reviewNext"
                aria-label="Sonraki yorum"
                onClick={() => go(1)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <a
          className="reviews-badge"
          id="reviewsBadge"
          href={badgeHref || "#yorumlar"}
          target={badgeHref ? "_blank" : undefined}
          rel={badgeHref ? "noopener noreferrer" : undefined}
        >
          <span className="reviews-badge-g" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 48 48" focusable="false">
              <path
                fill="#FFC107"
                d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.1 5.5l.1.1 6.3 5.2C39.2 36.9 44 32 44 24c0-1.3-.1-2.6-.4-3.9z"
              />
            </svg>
          </span>
          <StarRow n={5} className="reviews-badge-stars" />
          <b className="reviews-score">{meta?.googleSkor || ""}</b>
          <span className="reviews-count">
            {meta?.googleSayacMetin || ""}
          </span>
          <span className="reviews-badge-cta">{meta?.badgeCta || ""}</span>
        </a>
      </div>
    </section>
  );
}
