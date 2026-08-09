import type { MenuContent, MenuGrup, MenuUrun, SiteContent } from "@/lib/content/types";
import { getContentAsync, saveContentAsync } from "@/lib/db/content";
import type { IntegrationId, NormalizedProduct, SyncReport } from "./types";

function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function priceText(price: string | number | null | undefined): string | undefined {
  if (typeof price === "number" && Number.isFinite(price)) {
    return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  if (typeof price === "string" && price.trim()) return price.trim();
  return undefined;
}

/**
 * Platform ürünlerini CMS menu.gruplar içine upsert eder.
 * Local ürünler (eşleşmeyen external id) silinmez.
 */
export async function upsertProductsIntoCms(
  provider: IntegrationId,
  products: NormalizedProduct[]
): Promise<SyncReport> {
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
        gruplar.find(
          (g) => g.integrationCategoryId === `${provider}:${catId}`
        )) ||
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
    const mapped: MenuUrun = {
      ad: p.name,
      slug: slugify(p.name) || `${provider}-${p.externalId}`,
      aciklama: p.description || undefined,
      image: p.image || undefined,
      fiyat: priceText(p.price),
      trendyolId: provider === "trendyol_go" ? p.externalId : undefined,
      yemeksepetiId: provider === "yemeksepeti" ? p.externalId : undefined,
      externalId: externalKey,
      source: provider,
      aktif: p.available !== false,
    };

    const idx = grup.urunler.findIndex(
      (u) =>
        u.externalId === externalKey ||
        (provider === "trendyol_go" && u.trendyolId === p.externalId) ||
        (provider === "yemeksepeti" && u.yemeksepetiId === p.externalId)
    );

    if (idx >= 0) {
      const prev = grup.urunler[idx];
      grup.urunler[idx] = {
        ...prev,
        ...mapped,
        link: prev.link,
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
  await saveContentAsync({ menu } as Partial<SiteContent>);

  return {
    productCount: products.length,
    categoryCount: cats.size,
    created,
    updated,
    skipped,
    unmatched,
  };
}
