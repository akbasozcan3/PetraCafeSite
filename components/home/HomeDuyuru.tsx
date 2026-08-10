"use client";

import { useEffect } from "react";

/** Sets html.duyuru-acik when banner is present (nav offset). */
export default function HomeDuyuru({
  aktif,
  metin,
}: {
  aktif?: boolean;
  metin?: string;
}) {
  const show = Boolean(aktif && metin);

  useEffect(() => {
    document.documentElement.classList.toggle("duyuru-acik", show);
    return () => document.documentElement.classList.remove("duyuru-acik");
  }, [show]);

  if (!show) return null;
  return (
    <div className="duyuru" id="duyuru" role="status">
      {metin}
    </div>
  );
}
