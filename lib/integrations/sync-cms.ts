import type { MenuContent, MenuGrup, MenuUrun, SiteContent } from "@/lib/content/types";
import { getContentAsync, saveContentAsync } from "@/lib/db/content";
import type { IntegrationId, NormalizedProduct, SyncReport } from "./types";
import { slugifyTr } from "@/lib/content/slugify";
import { productHref } from "@/lib/content/slugify";

function slugify(input: string): string {
  return slugifyTr(input);
}

function priceText(price: string | number | null | undefined): string | undefined {
  if (typeof price === "number" && Number.isFinite(price)) {
    return price.toLocaleString("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  if (typeof price === "string" && price.trim()) return price.trim();
  return undefined;
}

function parsePrice(v?: string | number | null): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v !== "string" || !v.trim()) return null;
  const n = Number(
    v
      .replace(/[^\d.,]/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
  );
  return Number.isFinite(n) ? n : null;
}

function findExisting(
  gruplar: MenuGrup[],
  provider: IntegrationId,
  externalId: string
): { grup: MenuGrup; idx: number } | null {
  const externalKey = `${provider}:${externalId}`;
  for (const grup of gruplar) {
    const idx = (grup.urunler || []).findIndex(
      (u) =>
        u.externalId === externalKey ||
        (provider === "trendyol_go" && u.trendyolId === externalId) ||
        (provider === "yemeksepeti" && u.yemeksepetiId === externalId)
    );
    if (idx >= 0) return { grup, idx };
  }
  return null;
}

export type SyncPreview = {
  productCount: number;
  created: number;
  updated: number;
  unchanged: number;
  errors: number;
  priceChanges: Array<{
    name: string;
    externalId: string;
    oldPrice?: string;
    newPrice?: string;
    delta?: number;
  }>;
  errorItems: Array<{ name?: string; externalId?: string; reason: string }>;
};

export function previewProductsSync(
  content: SiteContent,
  provider: IntegrationId,
  products: NormalizedProduct[]
): SyncPreview {
  const gruplar = content.menu?.gruplar || [];
  let created = 0;
  let updated = 0;
  let unchanged = 0;
  let errors = 0;
  const priceChanges: SyncPreview["priceChanges"] = [];
  const errorItems: SyncPreview["errorItems"] = [];

  for (const p of products) {
    if (!p.externalId || !p.name) {
      errors += 1;
      errorItems.push({
        name: p.name,
        externalId: p.externalId,
        reason: "Eksik id veya ad",
      });
      continue;
    }
    const hit = findExisting(gruplar, provider, p.externalId);
    if (!hit) {
      created += 1;
      continue;
    }
    const prev = hit.grup.urunler[hit.idx];
    const nextPrice = priceText(p.price);
    const oldN = parsePrice(prev.fiyat);
    const newN = parsePrice(nextPrice ?? p.price);
    const nameChanged = prev.ad !== p.name;
    const descChanged = (prev.aciklama || "") !== (p.description || "");
    const imgChanged = Boolean(p.image) && prev.externalImageUrl !== p.image;
    const priceChanged =
      nextPrice != null &&
      String(prev.fiyat || "").trim() !== String(nextPrice).trim();

    if (priceChanged && oldN != null && newN != null && oldN !== newN) {
      priceChanges.push({
        name: p.name,
        externalId: p.externalId,
        oldPrice: prev.fiyat,
        newPrice: nextPrice,
        delta: Math.round((newN - oldN) * 100) / 100,
      });
    }

    if (nameChanged || descChanged || imgChanged || priceChanged) updated += 1;
    else unchanged += 1;
  }

  return {
    productCount: products.length,
    created,
    updated,
    unchanged,
    errors,
    priceChanges,
    errorItems,
  };
}

/**
 * Platform ürünlerini CMS menu.gruplar içine upsert eder.
 * Local ürünler (eşleşmeyen external id) silinmez.
 * Admin görseli varsa korunur; API görseli externalImageUrl'e yazılır.
 */
export async function upsertProductsIntoCms(
  provider: IntegrationId,
  products: NormalizedProduct[]
): Promise<SyncReport & { priceChanges: SyncPreview["priceChanges"] }> {
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
  let unmatched = 0;
  const cats = new Set<string>();
  const priceChanges: SyncPreview["priceChanges"] = [];
  const now = new Date().toISOString();

  for (const p of products) {
    if (!p.externalId || !p.name) {
      skipped += 1;
      unmatched += 1;
      continue;
    }
    const catName = p.categoryName || "Entegrasyon Menü";
    const catId = p.categoryId || "";
    cats.add(catId || catName);

    let grup =
      (catId &&
        gruplar.find((g) => g.integrationCategoryId === `${provider}:${catId}`)) ||
      gruplar.find((g) => g.ad === catName && g.source === provider);

    if (!grup) {
      grup = {
        ad: catName,
        slug: slugify(catName) || `${provider}-${slugify(catId) || "kategori"}`,
        integrationCategoryId: catId ? `${provider}:${catId}` : undefined,
        source: provider,
        urunler: [],
      };
      gruplar.push(grup);
    } else {
      if (catId) grup.integrationCategoryId = `${provider}:${catId}`;
      grup.source = provider;
    }

    const externalKey = `${provider}:${p.externalId}`;
    const slug = slugify(p.name) || `${provider}-${p.externalId}`;
    const nextPrice = priceText(p.price);
    const mappedBase: MenuUrun = {
      ad: p.name,
      slug,
      aciklama: p.description || undefined,
      externalImageUrl: p.image || undefined,
      fiyat: nextPrice,
      trendyolId: provider === "trendyol_go" ? p.externalId : undefined,
      yemeksepetiId: provider === "yemeksepeti" ? p.externalId : undefined,
      externalId: externalKey,
      source: provider,
      sources: [provider],
      aktif: p.available !== false,
      lastSyncedAt: now,
      link: productHref(slug, grup.slug || slugify(catName)),
    };

    const idx = grup.urunler.findIndex(
      (u) =>
        u.externalId === externalKey ||
        (provider === "trendyol_go" && u.trendyolId === p.externalId) ||
        (provider === "yemeksepeti" && u.yemeksepetiId === p.externalId)
    );

    if (idx >= 0) {
      const prev = grup.urunler[idx];
      const autoPrice = prev.autoUpdatePrice !== false;
      const oldN = parsePrice(prev.fiyat);
      const newN = parsePrice(nextPrice ?? p.price);
      if (
        autoPrice &&
        nextPrice &&
        String(prev.fiyat || "").trim() !== String(nextPrice).trim() &&
        oldN != null &&
        newN != null
      ) {
        priceChanges.push({
          name: p.name,
          externalId: p.externalId,
          oldPrice: prev.fiyat,
          newPrice: nextPrice,
          delta: Math.round((newN - oldN) * 100) / 100,
        });
      }

      const sources = Array.from(
        new Set([...(prev.sources || []), prev.source, provider].filter(Boolean) as string[])
      );

      // Admin görseli korunur; API görseli yalnızca externalImageUrl
      const keepAdminImage = Boolean(prev.image);
      grup.urunler[idx] = {
        ...prev,
        ...mappedBase,
        link: prev.link || mappedBase.link,
        fav: prev.fav,
        images: prev.images,
        image: keepAdminImage ? prev.image : prev.image || undefined,
        externalImageUrl: p.image || prev.externalImageUrl,
        fiyat: autoPrice && nextPrice ? nextPrice : prev.fiyat || nextPrice,
        autoUpdatePrice: prev.autoUpdatePrice,
        sources,
        varyantlar: prev.varyantlar,
        icindekiler: prev.icindekiler,
        alerjen: prev.alerjen,
        saklama: prev.saklama,
        seoTitle: prev.seoTitle,
        seoDescription: prev.seoDescription,
        ozelSiparis: prev.ozelSiparis,
      };
      updated += 1;
    } else {
      grup.urunler.push({
        ...mappedBase,
        // Entegrasyon görseli image alanına yazılmaz; externalImageUrl kullanılır
        image: undefined,
      });
      created += 1;
    }
  }

  menu.gruplar = gruplar;
  await saveContentAsync({ menu } as Partial<SiteContent>);

  return {
    productCount: products.length,
    categoryCount: cats.size,
    created,
    updated,
    skipped,
    unmatched,
    priceChanges,
  };
}
