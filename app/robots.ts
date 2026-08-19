import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/db/content";
import { publicOrigin } from "@/lib/site/canonical";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getPublicContent().catch(() => null);
  const origin = publicOrigin(content);
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/login"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
