"use client";

import { useEffect } from "react";

function showHeroFallback(reason: string) {
  const w = window as unknown as { __FIRINCI_SCENE?: string };
  if (w.__FIRINCI_SCENE === "ok") {
    // 3B “ok” ama siyah kaldıysa poster’ı geri getir
    if (!document.documentElement.classList.contains("scene-painted")) {
      document.documentElement.classList.add("scene-poster");
      document.documentElement.classList.remove("scene-ready");
      const poster = document.querySelector(".gate__poster") as HTMLElement | null;
      if (poster) {
        poster.style.opacity = "1";
        poster.style.visibility = "visible";
      }
      const boot = document.getElementById("gateBoot");
      if (boot) boot.hidden = true;
      console.warn("[Fırıncı] Hero boyanmadı → poster. Sebep:", reason);
    }
    return;
  }
  w.__FIRINCI_SCENE = "fail";
  document.documentElement.classList.add("scene-failed", "scene-poster");
  document.documentElement.classList.remove("scene-ready", "scene-painted");
  const boot = document.getElementById("gateBoot");
  if (boot) boot.hidden = true;
  const e = document.getElementById("scene");
  if (e) (e as HTMLElement).style.display = "none";
  const poster = document.querySelector(".gate__poster") as HTMLElement | null;
  if (poster) {
    poster.style.opacity = "1";
    poster.style.visibility = "visible";
  }
  console.warn("[Fırıncı] 3B sahne devre dışı → poster. Sebep:", reason);
}

/** Injects CMS boot payload + Three.js hero module + fail-open timeout */
export default function HomeHeroScripts({
  boot,
}: {
  boot: { images: Record<string, string>; hero: unknown };
}) {
  useEffect(() => {
    const w = window as unknown as {
      __FIRINCI_CONTENT?: Record<string, unknown>;
      __FIRINCI_SCENE?: string;
    };
    w.__FIRINCI_CONTENT = {
      ...(w.__FIRINCI_CONTENT || {}),
      images: boot.images,
      hero: boot.hero,
    };

    if (!document.querySelector('script[type="importmap"][data-home-three]')) {
      const map = document.createElement("script");
      map.type = "importmap";
      map.dataset.homeThree = "1";
      map.textContent = JSON.stringify({
        imports: { three: "/assets/vendor/three.module.js" },
      });
      document.head.appendChild(map);
    }

    const onScriptError = (ev: ErrorEvent) => {
      const t = ev.target as HTMLElement | null;
      if (
        t &&
        t.tagName === "SCRIPT" &&
        /hero\/index\.js/.test((t as HTMLScriptElement).src || "")
      ) {
        showHeroFallback("hero modülü yüklenemedi");
      }
    };
    window.addEventListener("error", onScriptError, true);

    const timeout = window.setTimeout(() => {
      if (w.__FIRINCI_SCENE === undefined || w.__FIRINCI_SCENE === "loading") {
        showHeroFallback("hero modülü zaman aşımı");
      }
    }, 14000);

    const existing = document.querySelector(
      'script[data-home-hero="1"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      const boot = (window as unknown as { __firinciHeroBoot?: () => void })
        .__firinciHeroBoot;
      const resize = (window as unknown as { __firinciHeroResize?: () => void })
        .__firinciHeroResize;
      if (typeof boot === "function") boot();
      else resize?.();
    } else {
      w.__FIRINCI_SCENE = w.__FIRINCI_SCENE || "loading";
      const s = document.createElement("script");
      s.type = "module";
      s.src = "/assets/js/hero/index.js?v=20260813x1";
      s.dataset.homeHero = "1";
      document.body.appendChild(s);
    }

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("error", onScriptError, true);
    };
  }, [boot.images, boot.hero]);

  return null;
}
