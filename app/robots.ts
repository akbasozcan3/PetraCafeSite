import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/db/content";
import { publicOrigin } from "@/lib/site/canonical";

export const revalidate = 3600; // 1 saat — sık değişmez

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getPublicContent().catch(() => null);
  const origin = publicOrigin(content);
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/login",
          "/_next/",
        ],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
