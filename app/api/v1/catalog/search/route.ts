import { getPublicContent } from "@/lib/db/content";
import { formatPriceLabel, searchProducts } from "@/lib/catalog/catalog";
import { resolveProductImage } from "@/lib/catalog/product-image";
import { jsonResponse, errorResponse } from "@/lib/api/helpers";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim().slice(0, 80);
    if (q.length < 2) return jsonResponse({ results: [] });

    const content = await getPublicContent();
    const results = searchProducts(content, q, 20).map((p) => {
      const img = resolveProductImage(p, p.category);
      return {
        ad: p.ad,
        slug: p.slug!,
        fiyat: formatPriceLabel(p.fiyat) || undefined,
        href: p.href,
        image: img.url,
        categoryName: p.categoryName,
      };
    });
    return jsonResponse({ results });
  } catch {
    return errorResponse("Arama geçici olarak kullanılamıyor.", 500);
  }
}
