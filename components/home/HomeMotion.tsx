"use client";

import { useEffect } from "react";

type GsapLike = {
  registerPlugin: (...args: unknown[]) => void;
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  to: (targets: unknown, vars: Record<string, unknown>) => unknown;
  fromTo: (
    targets: unknown,
    from: Record<string, unknown>,
    to: Record<string, unknown>
  ) => unknown;
  ticker: {
    add: (fn: (time: number) => void) => void;
    lagSmoothing: (n: number) => void;
  };
  utils: { toArray: (sel: string) => Element[] };
};

type ScrollTriggerLike = {
  refresh: () => void;
  update: () => void;
  getAll: () => { kill: () => void }[];
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-home-motion="${src}"]`
    );
    if (existing) {
      if (existing.dataset.loaded === "1") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.homeMotion = src;
    s.onload = () => {
      s.dataset.loaded = "1";
      resolve();
    };
    s.onerror = () => reject(new Error(`Script failed: ${src}`));
    document.head.appendChild(s);
  });
}

/** Split headline into overflow-hidden word wraps (matches legacy main.js). */
function splitWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.splitDone === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>("span.w > i"));
  }
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (!text) return [];
  el.textContent = "";
  const frag = document.createDocumentFragment();
  const inners: HTMLElement[] = [];
  text.split(" ").forEach((word) => {
    const wrap = document.createElement("span");
    wrap.className = "w";
    const inner = document.createElement("i");
    inner.textContent = word;
    wrap.appendChild(inner);
    frag.appendChild(wrap);
    frag.appendChild(document.createTextNode(" "));
    inners.push(inner);
  });
  el.appendChild(frag);
  el.dataset.splitDone = "1";
  return inners;
}

function markOnce(el: HTMLElement): boolean {
  if (el.dataset.ef === "1") return false;
  el.dataset.ef = "1";
  return true;
}

/**
 * Homepage scroll / split animations via GSAP + ScrollTrigger
 * (same effects as legacy assets/js/main.js — without nav/form conflicts).
 */
export default function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("no-motion");
      return;
    }

    let cancelled = false;
    let lenis: { destroy: () => void; raf: (t: number) => void; on: Function } | null =
      null;
    let tickerFn: ((t: number) => void) | null = null;

    (async () => {
      try {
        await loadScript("/assets/vendor/gsap.min.js");
        await loadScript("/assets/vendor/ScrollTrigger.min.js");
      } catch (err) {
        console.warn("[Fırıncı] GSAP yüklenemedi — basit fade kullanılıyor.", err);
        if (!cancelled) bootCssFallback();
        return;
      }

      try {
        await loadScript("/assets/vendor/lenis.min.js");
      } catch {
        /* Lenis optional */
      }

      if (cancelled) return;

      const w = window as unknown as {
        gsap?: GsapLike;
        ScrollTrigger?: ScrollTriggerLike;
        Lenis?: new (opts: Record<string, unknown>) => {
          destroy: () => void;
          raf: (t: number) => void;
          on: (ev: string, fn: () => void) => void;
        };
        __firinciLenis?: unknown;
        __firinciHeroRefresh?: () => void;
      };

      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;
      if (!gsap || !ScrollTrigger) {
        bootCssFallback();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      root.classList.add("gsap-ready");
      root.classList.remove("no-motion");

      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (w.Lenis && !isTouch) {
        lenis = new w.Lenis({
          lerp: 0.09,
          wheelMultiplier: 1,
          smoothWheel: true,
          syncTouch: false,
        });
        lenis.on("scroll", () => {
          ScrollTrigger.update();
          w.__firinciHeroRefresh?.();
        });
        window.addEventListener(
          "resize",
          () => {
            (
              window as unknown as { __firinciHeroResize?: () => void }
            ).__firinciHeroResize?.();
          },
          { passive: true }
        );
        tickerFn = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
        w.__firinciLenis = lenis;
      }

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (!markOnce(el)) return;
        const words = splitWords(el);
        if (!words.length) return;
        gsap.set(words, { yPercent: 118 });
        gsap.to(words, {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        if (!markOnce(el)) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      document
        .querySelectorAll<HTMLElement>("[data-reveal-mask]")
        .forEach((el) => {
          if (!markOnce(el)) return;
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.25,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 84%" },
            }
          );
        });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        if (!markOnce(el)) return;
        const amount = parseFloat(el.getAttribute("data-parallax") || "15") || 15;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
      window.addEventListener(
        "load",
        () => {
          ScrollTrigger.refresh();
        },
        { once: true }
      );
    })();

    function bootCssFallback() {
      root.classList.add("home-anim");
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-fade], [data-reveal-mask]")
      );
      const reveal = (el: Element) => el.classList.add("is-in");
      const vh = window.innerHeight || 800;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92) reveal(el);
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              reveal(e.target);
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      for (const el of els) {
        if (!el.classList.contains("is-in")) io.observe(el);
      }
      (bootCssFallback as unknown as { io?: IntersectionObserver }).io = io;
    }

    return () => {
      cancelled = true;
      try {
        const ST = (window as unknown as { ScrollTrigger?: ScrollTriggerLike })
          .ScrollTrigger;
        ST?.getAll?.().forEach((t) => t.kill());
      } catch {
        /* ignore */
      }
      try {
        const gsap = (window as unknown as { gsap?: GsapLike }).gsap;
        if (gsap && tickerFn) {
          // gsap.ticker.remove may exist
          const ticker = gsap.ticker as unknown as {
            remove?: (fn: (t: number) => void) => void;
          };
          ticker.remove?.(tickerFn);
        }
      } catch {
        /* ignore */
      }
      try {
        lenis?.destroy();
      } catch {
        /* ignore */
      }
      const io = (bootCssFallback as unknown as { io?: IntersectionObserver }).io;
      io?.disconnect();
      root.classList.remove("home-anim", "gsap-ready");
    };
  }, []);

  return null;
}
