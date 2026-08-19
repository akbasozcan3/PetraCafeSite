"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = [
  "[data-fade]",
  "[data-reveal-mask]",
  "[data-stagger]",
  "[data-split]",
  ".site-shop .ys-hero",
  ".site-shop .ys-section",
  ".site-shop .post",
  ".site-shop .shop-card",
  ".site-shop .ys-list",
  ".site-shop .cta-box",
  ".site-shop .pd",
  ".site-shop .pd-specs",
  ".site-shop .pd-related",
].join(", ");

/**
 * Lightweight motion — IntersectionObserver + CSS only.
 * No MutationObserver (3D hero mutates the DOM; GSAP previously froze the tab).
 */
export default function HomeMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("no-motion");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "30% 0px 30% 0px", threshold: 0 }
    );

    const bind = (el: HTMLElement) => {
      if (el.closest(".gate") || el.classList.contains("is-in")) return;
      const vh = window.innerHeight || 800;
      const r = el.getBoundingClientRect();
      // In view, slightly below, or already scrolled past (hash jump).
      if (r.top < vh * 0.97) {
        el.classList.add("is-in");
        io.unobserve(el);
        return;
      }
      io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(bind);
    };

    scan();
    root.classList.add("home-anim");
    const raf = window.requestAnimationFrame(scan);
    const onHash = () => window.requestAnimationFrame(scan);
    window.addEventListener("hashchange", onHash);
    const failsafe = window.setTimeout(scan, 600);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener("hashchange", onHash);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
