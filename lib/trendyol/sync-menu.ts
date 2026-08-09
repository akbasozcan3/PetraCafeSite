import type { MenuContent, MenuGrup, MenuUrun, SiteContent } from "@/lib/content/types";
import { getContentAsync, saveContentAsync } from "@/lib/db/content";
import { TrendyolMealClient } from "./client";
import { patchMeta } from "./store";

function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function asArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.products)) return o.products;
    if (Array.isArray(o.content)) return o.content;
    if (Array.isArray(o.items)) return o.items;
    if (Array.isArray(o.data)) return o.data;
  }
  return [];
}

function pickString(...vals: unknown[]): string {
  for (const v of vals) {
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number" && Number.isFinite(v)) return String(v);
  }
  return "";
}

function pickPrice(...vals: unknown[]): string {
  for (const v of vals) {
    if (typeof v === "number" && Number.isFinite(v)) {
      return v.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function productImage(p: Record<string, unknown>): string {
  const imgs = p.images;
  if (Array.isArray(imgs) && imgs[0]) {
    const first = imgs[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && "url" in first) {
      return String((first as { url: unknown }).url || "");
    }
  }
  return pickString(p.imageUrl, p.image, p.thumbnailUrl);
}

function productCategory(p: Record<string, unknown>): { id: string; name: string } {
  const cat = p.category;
  if (cat && typeof cat === "object") {
    const c = cat as Record<string, unknown>;
    return {
      id: pickString(c.id, c.categoryId),
      name: pickString(c.name, c.title, c.categoryName) || "Trendyol Menü",
    };
  }
  return {
    id: pickString(p.categoryId),
    name: pickString(p.categoryName, p.sectionName) || "Trendyol Menü",
  };
}

export type SyncResult = {
  productCount: number;
  categoryCount: number;
  created: number;
  updated: number;
  skipped: number;
};

/**
 * Trendyol ürünlerini mevcut menu.gruplar içine upsert eder.
 * trendyolId eşleşmeyen yerel ürünler silinmez.
 */
export async function syncMenuFromTrendyol(): Promise<SyncResult> {
  const client = await TrendyolMealClient.fromStore();
  const raw = await client.getProducts();
  const products = asArray(raw);

  const content = await getContentAsync();
  const menu: MenuContent = content.menu
    ? { ...content.menu, gruplar: [...(content.menu.gruplar || [])] }
    : { gruplar: [] };

  const gruplar = menu.gruplar.map((g) => ({
    ...g,
    urunler: [...(g.urunler || [])],
  }));

  let created = 0;
  let updated = 0;
  let skipped = 0;
  const touchedCategories = new Set<string>();

  for (const item of products) {
    if (!item || typeof item !== "object") {
      skipped += 1;
      continue;
    }
    const p = item as Record<string, unknown>;
    const trendyolId = pickString(p.id, p.productId);
    const name = pickString(p.name, p.title, p.productName);
    if (!trendyolId || !name) {
      skipped += 1;
      continue;
    }

    const { id: catId, name: catName } = productCategory(p);
    touchedCategories.add(catId || catName);

    let grup =
      gruplar.find((g) => g.trendyolCategoryId && catId && g.trendyolCategoryId === catId) ||
      gruplar.find((g) => g.ad === catName && (g.trendyolCategoryId || g.source === "trendyol"));

    if (!grup) {
      grup = {
        ad: catName,
        slug: slugify(catName) || `trendyol-${slugify(catId) || "kategori"}`,
        trendyolCategoryId: catId || undefined,
        source: "trendyol",
        urunler: [],
      };
      gruplar.push(grup);
    } else {
      if (catId) grup.trendyolCategoryId = catId;
      grup.source = grup.source || "trendyol";
    }

    const mapped: MenuUrun = {
      ad: name,
      slug: slugify(name) || `ty-${trendyolId}`,
      aciklama: pickString(p.description, p.desc, p.longDescription) || undefined,
      image: productImage(p) || undefined,
      fiyat: pickPrice(p.sellingPrice, p.price, p.listPrice) || undefined,
      trendyolId,
      source: "trendyol",
      aktif:
        typeof p.status === "string"
          ? !/passive|inactive|disabled|sold.?out/i.test(p.status)
          : p.active === false
            ? false
            : true,
    };

    const idx = grup.urunler.findIndex((u) => u.trendyolId === trendyolId);
    if (idx >= 0) {
      const prev = grup.urunler[idx];
      grup.urunler[idx] = {
        ...prev,
        ...mapped,
        // Yerel link/fav korunur
        link: prev.link || mapped.link,
        fav: prev.fav,
        image: mapped.image || prev.image,
      };
      updated += 1;
    } else {
      grup.urunler.push(mapped);
      created += 1;
    }
  }

  menu.gruplar = gruplar;
  const partial: Partial<SiteContent> = { menu };
  await saveContentAsync(partial);

  const result: SyncResult = {
    productCount: products.length,
    categoryCount: touchedCategories.size,
    created,
    updated,
    skipped,
  };

  await patchMeta({
    lastSyncAt: new Date().toISOString(),
    lastSyncProductCount: result.productCount,
  });

  return result;
}

export function normalizeMenuPayload(raw: unknown) {
  return asArray(raw).map((item) => {
    if (!item || typeof item !== "object") return item;
    const p = item as Record<string, unknown>;
    const cat = productCategory(p);
    return {
      id: pickString(p.id, p.productId),
      name: pickString(p.name, p.title, p.productName),
      description: pickString(p.description, p.desc),
      sellingPrice: p.sellingPrice ?? p.price ?? null,
      status: p.status ?? null,
      image: productImage(p) || null,
      categoryId: cat.id || null,
      categoryName: cat.name,
      rawKeys: Object.keys(p),
    };
  });
}
