"use client";

import { useEffect } from "react";

/** Marks document as Next SSR home so legacy cms-ext skips homepage DOM writes. */
export default function HomeDocumentFlag() {
  useEffect(() => {
    document.documentElement.setAttribute("data-next-home", "1");
    return () => document.documentElement.removeAttribute("data-next-home");
  }, []);
  return null;
}
