import type { MenuGrup, MenuUrun, SiteContent } from "@/lib/content/types";

function stripProduct(u: MenuUrun): MenuUrun {
  return {
    ...u,
    trendyolId: undefined,
    yemeksepetiId: undefined,
    autoUpdatePrice: undefined,
    lastSyncedAt: undefined,
    externalId: undefined,
    sources: undefined,
  };
}

function publicGroup(g: MenuGrup): MenuGrup {
  return {
    ...g,
    trendyolCategoryId: undefined,
    integrationCategoryId: undefined,
    urunler: (g.urunler || [])
      .filter((u) => u.aktif !== false && Boolean(u.ad?.trim()))
      .map(stripProduct),
  };
}

/** Public GET /api/v1/content — hide inactive catalog rows and integration ids. */
export function toPublicSiteContent(content: SiteContent): SiteContent {
  const gruplar = (content.menu?.gruplar || [])
    .filter((g) => g.aktif !== false && Boolean(g.ad?.trim()))
    .map(publicGroup);

  return {
    ...content,
    menu: content.menu ? { ...content.menu, gruplar } : content.menu,
    galeri: (content.galeri || []).filter((item) => item.aktif !== false),
    makaleler: (content.makaleler || []).filter((m) => m.yayinda !== false),
    yorumlar: content.yorumlar || [],
    sss: {
      items: (content.sss?.items || []).filter(
        (item) => String(item.soru || "").trim() && String(item.cevap || "").trim()
      ),
    },
    yorumlarApi: undefined,
    yorumlarSource: undefined,
  };
}
