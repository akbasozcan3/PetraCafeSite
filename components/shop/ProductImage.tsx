"use client";

import { useState } from "react";

const PLACEHOLDER = "/assets/img/product-placeholder.svg";

export default function ProductImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const url = !src || failed ? PLACEHOLDER : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
