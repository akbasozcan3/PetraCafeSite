"use client";

import type { CSSProperties } from "react";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";

export function brandLogoSrc(logo?: string | null): string {
  return resolveMediaUrl(liveMedia(logo, SITE_PHOTOS.mark)) || SITE_PHOTOS.mark;
}

export function isBrandLogoVideo(url?: string | null): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url || "");
}

/** Public site + admin share the same mark (CMS logo, video, or fallback). */
export default function BrandLogo({
  src,
  alt = "Petra Cafe Restaurant",
  className,
  height = 36,
  style,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  height?: number;
  style?: CSSProperties;
}) {
  const url = brandLogoSrc(src);
  const video = isBrandLogoVideo(url);
  const isSvg = /\.svg(\?|$)/i.test(url);
  const merged = {
    height,
    width: "auto",
    maxWidth: "100%",
    objectFit: "contain" as const,
    background: "transparent",
    ...style,
  };

  if (video) {
    return (
      <video
        className={[className, "is-video"].filter(Boolean).join(" ")}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        height={height}
        style={merged}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={[className, isSvg ? "is-svg" : ""].filter(Boolean).join(" ")}
      src={url}
      alt={alt}
      height={height}
      style={merged}
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src.includes("petra-mark.svg") || el.src.includes("logo.png")) return;
        el.src = SITE_PHOTOS.mark;
      }}
    />
  );
}
