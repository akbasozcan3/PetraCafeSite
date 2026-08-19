"use client";

import { useEffect, useMemo } from "react";

/** Tema değişkenlerini html/body’ye yazar; admin sayfasına geçince temizler. */
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
    };
  }, [serialized]);

  return null;
}
