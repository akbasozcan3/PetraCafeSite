"use client";

import { useEffect, useMemo } from "react";

function isDarkHex(hex?: string): boolean {
  if (!hex) return false;
  const raw = hex.replace("#", "").trim();
  if (raw.length < 6) return false;
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.45;
}

/** Tema değişkenlerini html/body’ye yazar; data-theme attribute set eder. */
export default function ThemeDocument({
  vars,
}: {
  vars: Record<string, string>;
}) {
  const serialized = useMemo(() => JSON.stringify(vars), [vars]);

  useEffect(() => {
    const parsed = JSON.parse(serialized) as Record<string, string>;
    const root = document.documentElement;
    const body = document.body;
    const keys = Object.keys(parsed);
    for (const key of keys) root.style.setProperty(key, parsed[key]);

    const isDark = isDarkHex(parsed["--paper"]);
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.classList.toggle("theme-dark", isDark);
    root.classList.toggle("theme-light", !isDark);

    if (parsed["--paper"]) {
      root.style.backgroundColor = parsed["--paper"];
      body.style.backgroundColor = parsed["--paper"];
    }
    if (parsed["--ink"]) body.style.color = parsed["--ink"];

    return () => {
      for (const key of keys) root.style.removeProperty(key);
      root.style.removeProperty("background-color");
      body.style.removeProperty("background-color");
      body.style.removeProperty("color");
      root.removeAttribute("data-theme");
      root.classList.remove("theme-dark", "theme-light");
    };
  }, [serialized]);

  return null;
}

