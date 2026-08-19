"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { heroMediaVersion, resolveMediaUrl, withCacheBust } from "@/lib/admin/media-url";

export default function AdminImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  contain,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  contain?: boolean;
}) {
  const url = src ? withCacheBust(resolveMediaUrl(src), heroMediaVersion(src)) : "";
  const isVector =
    /\.svg(\?|$)/i.test(src || "") ||
    /\.ico(\?|$)/i.test(src || "") ||
    /\.(svg|ico)(\?|$)/i.test((url.split("&")[0] || "").split("?")[0] || "");
  const [failed, setFailed] = useState(false);

  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(src || url.split("?")[0] || "");

  useEffect(() => {
    setFailed(false);
  }, [url]);

  if (!url || failed) {
    return (
      <div className="flex h-full min-h-[120px] w-full flex-col items-center justify-center gap-2 bg-[#0D1117] text-[#6B7A94]">
        <ImageIcon className="h-8 w-8 opacity-60" />
        <span className="px-3 text-center text-[11px] leading-snug">
          {src ? "Önizleme yok — yeniden yükleyin" : "Henüz görsel yok"}
        </span>
      </div>
    );
  }

  if (isVideo) {
    return (
      <video
        src={url}
        className={contain || isVector ? `${className} object-contain bg-transparent` : className}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={contain || isVector ? `${className} object-contain` : className}
      onError={() => setFailed(true)}
    />
  );
}
