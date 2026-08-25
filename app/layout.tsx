import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { publicOrigin } from "@/lib/site/canonical";
import { getPublicContent } from "@/lib/db/content";
import { siteFaviconHref } from "@/lib/content/favicon";
import { resolveMediaUrl } from "@/lib/admin/media-url";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent().catch(() => null);
  const origin = publicOrigin(content);
  const icon = siteFaviconHref(content);
  const title = content?.seo?.title || "Petra Cafe Restaurant";
  const description =
    content?.seo?.description ||
    "Petra Cafe Restaurant — Çekmeköy Taşdelen'de dünya mutfağı, serpme kahvaltı, kahve ve havuz.";
  const og = resolveMediaUrl(
    content?.images?.ogImage || content?.images?.heroCephe || content?.images?.logo
  );

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: "%s | Petra Cafe Restaurant",
    },
    description,
    keywords: [
      "petra cafe",
      "restoran çekmeköy",
      "taşdelen",
      "serpme kahvaltı",
      "havuz",
      "pool beach",
      "rezervasyon",
    ],
    authors: [{ name: "Petra Cafe Restaurant" }],
    creator: "Petra Cafe Restaurant",
    category: "restaurant",
    alternates: {
      canonical: `${origin}/`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [{ url: icon }],
      shortcut: icon,
      apple: icon,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: content?.seo?.siteName || "Petra Cafe Restaurant",
      title: content?.seo?.ogTitle || title,
      description: content?.seo?.ogDescription || description,
      url: `${origin}/`,
      images: og
        ? [{ url: og, width: 1200, height: 630, alt: "Petra Cafe Restaurant" }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: content?.seo?.ogTitle || title,
      description: content?.seo?.ogDescription || description,
      images: og ? [og] : undefined,
    },
  };
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D15",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPublicContent().catch(() => null);
  const rawPaper = String(content?.theme?.paper || "#FBF8F1").replace("#", "").trim();
  let isDark = false;
  if (rawPaper.length >= 6) {
    const r = parseInt(rawPaper.slice(0, 2), 16) / 255;
    const g = parseInt(rawPaper.slice(2, 4), 16) / 255;
    const b = parseInt(rawPaper.slice(4, 6), 16) / 255;
    isDark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.45;
  }

  return (
    <html
      lang="tr"
      data-theme={isDark ? "dark" : "light"}
      className={isDark ? "theme-dark" : "theme-light"}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
