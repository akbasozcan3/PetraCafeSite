"use client";

import { useState } from "react";
import { SITE_PHOTOS } from "@/lib/content/media-fallbacks";

export default function SafeImg({
  src,
  alt,
  fallback = SITE_PHOTOS.interior,
  className,
  loading,
  width,
  height,
}: {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
}) {
  const initial = src || fallback;
  const [url, setUrl] = useState(initial);
  const [tried, setTried] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      onError={() => {
        if (!tried && url !== fallback) {
          setTried(true);
          setUrl(fallback);
        }
      }}
    />
  );
}
