"use client";

import { useEffect } from "react";

const ALIAS: Record<string, string> = {
  iletisim: "iletisim-form",
  sss: "sss-liste",
};

function scrollToId(raw: string) {
  const id = ALIAS[raw] || raw;
  const el = document.getElementById(id) || document.getElementById(raw);
  if (!el) return false;
  const navH =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
    ) || 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 18;
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  return true;
}

export default function HomeHashScroll() {
  useEffect(() => {
    const run = () => {
      const hash = window.location.hash.replace(/^#/, "").trim();
      if (!hash) return;
      let n = 0;
      const tick = () => {
        if (scrollToId(hash) || n > 24) return;
        n += 1;
        window.setTimeout(tick, 80);
      };
      window.setTimeout(tick, 30);
    };
    run();
    window.addEventListener("hashchange", run);
    window.addEventListener("load", run);
    return () => {
      window.removeEventListener("hashchange", run);
      window.removeEventListener("load", run);
    };
  }, []);
  return null;
}
