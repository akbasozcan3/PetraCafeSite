/**
 * Instagram hizmetleri + menü grupları (kokteyl, kahve, nargile, İtalyan tatlı).
 * Hero / 3B kapıya dokunmaz. data/content.json günceller.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data", "content.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

function item(cat, ad, slug, fiyat, aciklama, extra = {}) {
  return {
    ad,
    slug,
    fiyat,
    aciklama,
    fav: Boolean(extra.fav),
    aktif: extra.aktif !== false,
    alerjen: extra.alerjen || "",
    not: extra.not || "",
    link: `/menu/${cat}/${slug}`,
    ...(extra.image ? { image: extra.image } : {}),
  };
}

function upsertProducts(existing = [], incoming = []) {
  const map = new Map(existing.filter((u) => u?.slug).map((u) => [u.slug, u]));
  for (const u of incoming) {
    if (!u?.slug) continue;
    const prev = map.get(u.slug);
    map.set(u.slug, prev ? { ...prev, ...u, link: u.link || prev.link } : u);
  }
  return [...map.values()];
}

function upsertGroup(gruplar, slug, group) {
  const i = gruplar.findIndex((g) => g.slug === slug);
  if (i >= 0) {
    const prev = gruplar[i];
    gruplar[i] = {
      ...prev,
      ...group,
      urunler: upsertProducts(prev.urunler, group.urunler),
    };
    const n = gruplar[i].urunler.filter((u) => u.aktif !== false).length;
    gruplar[i].adet = `${n} çeşit`;
  } else {
    gruplar.push({
      ...group,
      adet: group.adet || `${(group.urunler || []).length} çeşit`,
    });
  }
}

if (data.navbar?.links && !data.navbar.links.some((l) => l.href === "#hizmetler")) {
  const i = data.navbar.links.findIndex((l) => l.href === "#hakkimizda");
  const row = { label: "Hizmetler", href: "#hizmetler" };
  if (i >= 0) data.navbar.links.splice(i + 1, 0, row);
  else data.navbar.links.unshift(row);
}

data.hizmetler = [
  {
    label: "Spor ve Jimnastik",
    href: "/spor-salonu",
    aciklama: "Spor salonu ve jimnastik imkanları",
    icon: "dumbbell",
  },
  {
    label: "Dünya Mutfağı ve Serpme Kahvaltı",
    href: "/menu",
    aciklama: "Geniş içerikli serpme kahvaltının yanı sıra dünya mutfağından seçkin lezzetler",
    icon: "chef",
  },
  {
    label: "Canlı Müzik ve Karaoke",
    href: "/#rezervasyon",
    aciklama: "Belirli günlerde düzenlenen canlı müzik geceleri ve karaoke eğlenceleri",
    icon: "music",
  },
  {
    label: "İçecek ve Tatlı Çeşitleri",
    href: "/menu/tatlilar",
    aciklama: "Özel İtalyan tatlıları, özel kahveler ve alkolsüz kokteyl çeşitleri",
    icon: "cake",
  },
  {
    label: "Havuz Locaları ve Nargile",
    href: "/havuz-plaj",
    aciklama: "Havuz kenarında dinlenebileceğiniz özel localar ve nargile hizmeti",
    icon: "waves",
  },
  {
    label: "Market",
    href: "/#iletisim",
    aciklama: "Tesis içinde gün boyu temel ihtiyaçlarınızı karşılayabileceğiniz bir market alanı",
    icon: "store",
  },
];

data.bolumlar = {
  ...data.bolumlar,
  menu: {
    ...(data.bolumlar?.menu || {}),
    eyebrow: data.bolumlar?.menu?.eyebrow || "Menümüz",
    baslik: "Kahvaltı, dünya mutfağı, kahve",
    lead: "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller, kahve, nargile ve havuz kenarı.",
    ctaLabel: data.bolumlar?.menu?.ctaLabel || "Masa ayırtın",
    ctaHref: data.bolumlar?.menu?.ctaHref || "#rezervasyon",
    cta2Label: data.bolumlar?.menu?.cta2Label || "Tüm menü",
    cta2Href: data.bolumlar?.menu?.cta2Href || "/menu",
  },
  hizmetler: {
    eyebrow: "Petra",
    baslik: "Cafe · Restaurant · Pool & Beach",
    lead: "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve ve nargile — havuz kenarında veya salonda.",
  },
};

data.marquee = [
  "PETRA",
  "DÜNYA MUTFAĞI",
  "SERPME KAHVALTI",
  "POOL & BEACH",
  "COFFEE & FOOD",
  "İTALYAN KOKTEYLLERİ",
  "İTALYAN TATLI",
  "NARGİLE",
  "ORGANİZASYON",
  "YÜZME DERSLERİ",
  "ÇEKMEKÖY",
  "TAŞDELEN",
  "KEYİF KONFOR KALİTE",
];

if (data.hakkimizda) {
  data.hakkimizda.body = [
    "Menümüzde serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyller, kahve ve nargile bulunur. Havuz kenarında veya salonda servis edilir.",
    data.hakkimizda.body?.[1] ||
      "Mekânımız Sultançiftliği Mahallesi, Selen Sokak No:1, Megakent / Petra Yaşam Merkezi’ndedir. Havuz, plaj ve kafe-restoran aynı çatı altındadır.",
    data.hakkimizda.body?.[2] ||
      "Doğum günü, kurumsal davet ve özel günler için organizasyon masası kurulur. Yüzme dersleri birebir veya grup olarak planlanır.",
  ];
  data.hakkimizda.answerMetin =
    "Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar. 0530 608 90 51.";
}

if (data.hero) {
  data.hero.welcomeLead =
    "Dünya mutfağı, serpme kahvaltı, İtalyan tatlı & kokteyl, kahve, nargile ve havuz başı. Keyif, konfor ve kalite.";
}

const sssItems = data.sss?.items || [];
function hasSoru(re) {
  return sssItems.some((x) => re.test(x.soru || ""));
}
if (!hasSoru(/kokteyl|tatlı/i)) {
  sssItems.push({
    soru: "İtalyan kokteyl ve tatlı var mı?",
    cevap:
      "Evet. Aperol Spritz, Negroni, Bellini ve İtalyan tatlı çeşitleri (tiramisu, panna cotta, cannoli, affogato) menüde.",
  });
}
if (!hasSoru(/nargile/i)) {
  sssItems.push({
    soru: "Nargile var mı?",
    cevap:
      "Evet. Elma, karpuz-nane, üzüm, nane-limon ve özel karışımlar sunulur. Yoğun saatlerde köşe için rezervasyon önerilir.",
  });
}
data.sss = { ...(data.sss || {}), items: sssItems };

if (data.footer) {
  data.footer.slogan =
    "Keyif, konfor ve kalite.\nDünya mutfağı · serpme kahvaltı · İtalyan tatlı & kokteyl · nargile · pool & beach.";
  const petra = data.footer.kolonlar?.find((k) => /petra|keşif|keşif/i.test(k.baslik || "") || k.baslik === "Petra");
  if (petra?.links && !petra.links.some((l) => /hizmet/i.test(l.label || "") || l.href === "#hizmetler")) {
    const i = petra.links.findIndex((l) => l.href === "#hakkimizda");
    const row = { label: "Hizmetler", href: "#hizmetler" };
    if (i >= 0) petra.links.splice(i + 1, 0, row);
    else petra.links.unshift(row);
  }
}

if (data.seo) {
  data.seo.title = "Petra Cafe Restaurant — Dünya Mutfağı · Havuz | Çekmeköy";
  data.seo.description =
    "Çekmeköy Taşdelen’de Petra Cafe Restaurant. Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz. 0530 608 90 51";
  data.seo.ogDescription =
    "Cafe, restaurant, pool & beach — İtalyan tatlı, kokteyl, kahve ve nargile. Petra Yaşam Merkezi, Taşdelen.";
}

if (data.sayfalar?.urunler) {
  data.sayfalar.urunler.lead =
    "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve ve nargile. Masa ayırtmak için rezervasyon formunu kullanın.";
}

if (data.menu?.gruplar) {
  const gruplar = data.menu.gruplar;

  const ana = gruplar.find((g) => g.slug === "ana-yemekler");
  if (ana) {
    ana.ad = "Dünya Mutfağı";
    ana.aciklama = "Dünya mutfağı — ızgara, fırın, deniz ve İtalyan tabaklar.";
  }

  const icecek = gruplar.find((g) => g.slug === "icecekler");
  const coffeeSlugs = new Set(["espresso", "turk-kahvesi", "soguk-brew"]);
  const movedCoffee = [];
  if (icecek?.urunler) {
    icecek.urunler = icecek.urunler.filter((u) => {
      if (coffeeSlugs.has(u.slug)) {
        movedCoffee.push(u);
        return false;
      }
      return true;
    });
    icecek.aciklama = "Şarap, limonata ve alkolsüz seçkiler. Kokteyller ayrı bölümde.";
    icecek.adet = `${icecek.urunler.filter((u) => u.aktif !== false).length} çeşit`;
  }

  upsertGroup(gruplar, "tatlilar", {
    ad: "İtalyan Tatlı çeşitleri",
    slug: "tatlilar",
    link: "/menu/tatlilar",
    tumLink: "/menu/tatlilar",
    aciklama: "İtalyan tatlı çeşitleri ve ev yapımı tatlılar.",
    urunler: [
      item("tatlilar", "Tiramisu", "tiramisu", "250", "Espresso, mascarpone, kakao ve savoiardi.", {
        alerjen: "Süt, yumurta, gluten",
      }),
      item("tatlilar", "Panna Cotta", "panna-cotta", "240", "Vanilyalı krema, orman meyvesi sosu.", {
        fav: true,
        alerjen: "Süt",
      }),
      item("tatlilar", "Cannoli", "cannoli", "260", "Kızarmış hamur, ricotta, antep fıstığı ve portakal kabuğu.", {
        alerjen: "Gluten, süt, yumurta, kuruyemiş",
      }),
      item("tatlilar", "Affogato", "affogato", "180", "Vanilyalı gelato üzerine sıcak espresso.", {
        alerjen: "Süt",
      }),
      item(
        "tatlilar",
        "Fıstıklı Gelato",
        "fistikli-gelato",
        "190",
        "Antep fıstıklı İtalyan dondurma, kırık fıstık.",
        { alerjen: "Süt, kuruyemiş" }
      ),
    ],
  });

  upsertGroup(gruplar, "italyan-kokteyller", {
    ad: "İtalyan Kokteylleri",
    slug: "italyan-kokteyller",
    link: "/menu/italyan-kokteyller",
    tumLink: "/menu/italyan-kokteyller",
    aciklama: "Aperitivo — spritz, klasik İtalyan kokteyller ve espresso martini.",
    urunler: [
      item("italyan-kokteyller", "Aperol Spritz", "aperol-spritz", "280", "Aperol, prosecco, soda ve portakal.", {
        fav: true,
      }),
      item("italyan-kokteyller", "Negroni", "negroni", "290", "Gin, Campari, kırmızı vermut, portakal kabuğu.", {
        fav: true,
      }),
      item("italyan-kokteyller", "Bellini", "bellini", "260", "Prosecco ve şeftali püresi."),
      item("italyan-kokteyller", "Limoncello Spritz", "limoncello-spritz", "270", "Limoncello, prosecco, soda, limon."),
      item("italyan-kokteyller", "Hugo", "hugo", "270", "Elderflower, prosecco, nane ve lime."),
      item(
        "italyan-kokteyller",
        "Espresso Martini",
        "espresso-martini",
        "290",
        "Vodka, espresso, kahve likörü.",
        { alerjen: "" }
      ),
    ],
  });

  const kahveUrunler = [];
  const kahveSeen = new Set();
  for (const u of [
    ...movedCoffee.map((u) => ({ ...u, link: `/menu/kahve/${u.slug}` })),
    item("kahve", "Espresso", "espresso", "80", "Çift shot, koyu kavrum."),
    item("kahve", "Türk Kahvesi", "turk-kahvesi", "70", "Közde, orta şeker veya sade."),
    item("kahve", "Latte", "latte", "110", "Espresso, buharlanmış süt.", { alerjen: "Süt", fav: true }),
    item("kahve", "Cappuccino", "cappuccino", "110", "Espresso, süt köpüğü.", { alerjen: "Süt" }),
    item("kahve", "Filtre Kahve", "filtre-kahve", "95", "Günün çekirdeği, uzun demleme."),
    item("kahve", "Soğuk Brew", "soguk-brew", "95", "12 saat demleme, buz ve portakal kabuğu."),
    item("kahve", "Ice Latte", "ice-latte", "120", "Espresso, soğuk süt, buz.", { alerjen: "Süt" }),
    item("kahve", "Mocha", "mocha", "130", "Espresso, kakao, süt.", { alerjen: "Süt" }),
  ]) {
    if (!u.slug || kahveSeen.has(u.slug)) continue;
    kahveSeen.add(u.slug);
    kahveUrunler.push(u);
  }

  upsertGroup(gruplar, "kahve", {
    ad: "Kahve",
    slug: "kahve",
    link: "/menu/kahve",
    tumLink: "/menu/kahve",
    aciklama: "Espresso, Türk kahvesi, latte ve soğuk kahve — Coffee & Food.",
    urunler: kahveUrunler,
  });

  upsertGroup(gruplar, "nargile", {
    ad: "Nargile",
    slug: "nargile",
    link: "/menu/nargile",
    tumLink: "/menu/nargile",
    aciklama: "En iyi nargile çeşitleri — elma, karpuz-nane, üzüm ve özel karışımlar.",
    urunler: [
      item("nargile", "Elma", "nargile-elma", "350", "Klasik elma aroması.", { fav: true }),
      item("nargile", "Karpuz Nane", "nargile-karpuz-nane", "350", "Karpuz ve taze nane."),
      item("nargile", "Üzüm", "nargile-uzum", "350", "Tatlı üzüm."),
      item("nargile", "Nane Limon", "nargile-nane-limon", "350", "Nane ve limon, ferah."),
      item("nargile", "Love 66", "nargile-love-66", "380", "Kavun, karpuz, nane ve karışık meyve.", { fav: true }),
      item("nargile", "Petra Special", "nargile-petra-special", "400", "Evin özel karışımı — servise sorun."),
    ],
  });

  data.menu.baslik = "Petra Menü";
  data.menu.giris =
    "Serpme kahvaltı, dünya mutfağı, İtalyan tatlı ve kokteyl, kahve ve nargile. Havuz kenarında veya salonda.";
  data.menu.hepsiLink = "/menu";
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("OK: hizmetler + menü grupları yazıldı →", file);
console.log(
  "Gruplar:",
  (data.menu?.gruplar || []).map((g) => `${g.ad} (${g.slug}, ${(g.urunler || []).length})`).join(" | ")
);
