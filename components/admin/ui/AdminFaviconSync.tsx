"use client";

import { useEffect } from "react";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import { withCacheBust, heroMediaVersion } from "@/lib/admin/media-url";
import { faviconLinkType, siteFaviconHref } from "@/lib/content/favicon";

function applyFavicon(href: string) {
  const type = faviconLinkType(href);
  const busted = withCacheBust(href, heroMediaVersion(href));

  const setLink = (rel: string) => {
    let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.appendChild(link);
    }
    if (type) link.type = type;
    else link.removeAttribute("type");
    link.href = busted;
  };

  setLink("icon");
  setLink("shortcut icon");
  setLink("apple-touch-icon");
}

export function StaticFavicon({ href }: { href: string }) {
  useEffect(() => {
    if (href) applyFavicon(href);
  }, [href]);
  return null;
}

export default function AdminFaviconSync() {
  const { content } = useAdminContent();

  useEffect(() => {
    applyFavicon(siteFaviconHref(content));
  }, [content?.images?.favicon]);

  return null;
}
