"use client";

import { useEffect } from "react";

/**
 * Progressive fade/reveal for homepage.
 * Content stays visible until this mounts, then animates in-view items.
 */
export default function HomeMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("no-motion");
      return;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fade], [data-reveal-mask]")
    );
    if (!els.length) return;

    const reveal = (el: Element) => {
      el.classList.add("is-in");
    };

    // Opt into hide-until-in-view only after marking already-visible nodes
    const vh = window.innerHeight || 800;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 1.05 && r.bottom > -80) reveal(el);
    }
    root.classList.add("home-anim");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "12% 0px 12% 0px", threshold: 0.01 }
    );

    for (const el of els) {
      if (!el.classList.contains("is-in")) io.observe(el);
    }

    // Safety: never leave content invisible if IO stalls
    const failSafe = window.setTimeout(() => {
      for (const el of els) reveal(el);
    }, 4500);

    return () => {
      window.clearTimeout(failSafe);
      io.disconnect();
      root.classList.remove("home-anim");
    };
  }, []);

  return null;
}
