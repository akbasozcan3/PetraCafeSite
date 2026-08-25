import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/db/content";
import {
  getCategorySlug,
  listCategories,
  listProducts,
} from "@/lib/catalog/catalog";
import { categoryHref } from "@/lib/content/slugify";
import { publicOrigin } from "@/lib/site/canonical";

export const revalidate = 3600; // 1 saat — menü nadiren değişir

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPublicContent();
  const origin = publicOrigin(content);
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${origin}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${origin}/hakkimizda`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${origin}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${origin}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${origin}/havuz-plaj`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${origin}/gizlilik-politikasi`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${origin}/kullanim-kosullari`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${origin}/cerez-politikasi`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${origin}/rezervasyon-kosullari`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${origin}/ticari-bilgiler`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  for (const cat of listCategories(content)) {
    entries.push({
      url: `${origin}${categoryHref(getCategorySlug(cat))}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const product of listProducts(content)) {
    entries.push({
      url: `${origin}${product.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const post of content.makaleler || []) {
    if (post.yayinda === false || !post.slug) continue;
    entries.push({
      url: `${origin}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
