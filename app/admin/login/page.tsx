import type { Metadata } from "next";
import { getPublicContent } from "@/lib/db/content";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { siteFaviconHref } from "@/lib/content/favicon";
import AdminLoginPage from "./login-client";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const icon = siteFaviconHref(content);
  return {
    title: "Admin Giriş",
    robots: { index: false, follow: false },
    icons: {
      icon: [{ url: icon }],
      shortcut: icon,
      apple: icon,
    },
  };
}

export default async function Page() {
  const content = await getPublicContent();
  const logoSrc = liveMedia(content.images?.logo, SITE_PHOTOS.mark) || SITE_PHOTOS.mark;
  const brandName =
    content.brand?.displayName || content.seo?.siteName || "Petra Cafe Restaurant";
  return (
    <AdminLoginPage
      logoSrc={logoSrc}
      brandName={brandName}
      faviconHref={siteFaviconHref(content)}
    />
  );
}
