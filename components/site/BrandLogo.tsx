import type { CSSProperties } from "react";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";

export function brandLogoSrc(logo?: string | null): string {
  return resolveMediaUrl(liveMedia(logo, SITE_PHOTOS.mark)) || SITE_PHOTOS.mark;
}

/** Public site + admin share the same mark (CMS logo or petra-mark.svg). */
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
  const isSvg = /\.svg(\?|$)/i.test(url);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={[className, isSvg ? "is-svg" : ""].filter(Boolean).join(" ")}
      src={url}
      alt={alt}
      height={height}
      style={{
        height,
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        ...style,
      }}
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget;
        if (el.src.includes("petra-mark.svg")) return;
        el.src = SITE_PHOTOS.mark;
      }}
    />
  );
}
