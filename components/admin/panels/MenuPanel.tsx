"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  ImageIcon,
} from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import type { MenuContent, MenuGrup, MenuUrun } from "@/lib/content/types";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import Upload from "@/components/admin/ui/Upload";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SectionHint from "@/components/admin/ui/SectionHint";
import BolumBaslikFields from "@/components/admin/ui/BolumBaslikFields";
import { slugifyTr, categoryHref } from "@/lib/content/slugify";
import { uniqueSlug } from "@/lib/content/ensure-product-slugs";

function emptyMenu(content: { bolumlar: { menu: { baslik?: string; lead?: string } } }): MenuContent {
  return {
    baslik: content.bolumlar.menu.baslik,
    giris: content.bolumlar.menu.lead,
    legend: "★ işaretliler en çok tercih edilenler.",
    hepsiMetin: "Tüm menüyü inceleyin →",
    hepsiLink: "/menu",
    not: "",
    gruplar: [],
  };
}

export default function MenuPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newDish, setNewDish] = useState({ ad: "", fiyat: "" });

  if (loading || !content) return <AdminLoading />;

  const menu = content.menu ?? emptyMenu(content);

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
  };

  const updateMenu = (patch: Partial<MenuContent>) =>
    setContent((prev) => {
      if (!prev) return prev;
      const current = prev.menu ?? emptyMenu(prev);
      return { ...prev, menu: { ...current, ...patch } };
    });

  const updateGroup = (i: number, g: MenuGrup) => {
    setContent((prev) => {
      if (!prev) return prev;
      const current = prev.menu ?? emptyMenu(prev);
      const gruplar = [...current.gruplar];
      gruplar[i] = g;
      return { ...prev, menu: { ...current, gruplar } };
    });
  };

  const patchGroup = (i: number, fn: (g: MenuGrup) => MenuGrup) => {
    setContent((prev) => {
      if (!prev) return prev;
      const current = prev.menu ?? emptyMenu(prev);
      const gruplar = [...current.gruplar];
      if (!gruplar[i]) return prev;
      gruplar[i] = fn(gruplar[i]);
      return { ...prev, menu: { ...current, gruplar } };
    });
  };

  const moveGroup = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= menu.gruplar.length) return;
    const gruplar = [...menu.gruplar];
    const temp = gruplar[index];
    gruplar[index] = gruplar[targetIndex];
    gruplar[targetIndex] = temp;
    updateMenu({ gruplar });
    setOpen(targetIndex);
  };

  const absSitePath = (href?: string) => {
    if (!href) return href;
    if (/^(https?:|tel:|mailto:|whatsapp:|#|\/)/i.test(href) || /wa\.me/i.test(href)) {
      return href;
    }
    if (/^(urunler|menu|blog)\//i.test(href)) return `/${href}`.replace(/^\/urunler/i, "/menu");
    return href;
  };

  const save = async () => {
    setSaving(true);
    try {
      const gruplar = menu.gruplar.map((g) => {
        const count = g.urunler.filter((u) => u.ad?.trim()).length;
        return {
          ...g,
          slug: g.slug || slugifyTr(g.ad),
          link: absSitePath(g.link) || categoryHref(g.slug || slugifyTr(g.ad)),
          tumLink: absSitePath(g.tumLink) || categoryHref(g.slug || slugifyTr(g.ad)),
          adet: count ? `${count} çeşit` : g.adet,
          urunler: g.urunler
            .filter((u) => u.ad?.trim())
            .map((u) => ({
            ...u,
            // WhatsApp numarası İletişim admininden gelir; eski wa.me ürün linklerini temizle
            link:
              u.link && /wa\.me|whatsapp/i.test(u.link)
                ? undefined
                : absSitePath(u.link),
          })),
        };
      });
      const totalProducts = gruplar.reduce(
        (n, g) => n + g.urunler.filter((u) => u.ad?.trim()).length,
        0
      );
      const nextMenu = {
        ...menu,
        hepsiLink: absSitePath(menu.hepsiLink) || menu.hepsiLink,
        gruplar,
      };
      const res = await api.updateContent({
        menu: nextMenu,
        bolumlar: {
          ...content.bolumlar,
          menu: {
            ...content.bolumlar.menu,
            baslik: nextMenu.baslik || content.bolumlar.menu.baslik,
            lead: nextMenu.giris || content.bolumlar.menu.lead,
          },
        },
        sayfalar: content.sayfalar,
      });
      setContent(res.data);
      showMessage(
        `${totalProducts} tabak kaydedildi. Menü ve kategori sayfaları güncellendi.`,
        "success"
      );
    } catch (e) {
      showMessage(
        e instanceof Error ? e.message : "Kayıt başarısız",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const totalProducts = menu.gruplar.reduce(
    (n, g) => n + g.urunler.length,
    0
  );
  const q = query.trim().toLocaleLowerCase("tr-TR");
  const visibleGroups = menu.gruplar
    .map((g, gi) => {
      const all = g.urunler.map((urun, ui) => ({ urun, ui }));
      if (!q) return { g, gi, urunler: all };
      const catHit = g.ad.toLocaleLowerCase("tr-TR").includes(q);
      const urunler = all.filter(({ urun }) =>
        `${urun.ad} ${urun.aciklama || ""} ${urun.fiyat || ""}`
          .toLocaleLowerCase("tr-TR")
          .includes(q)
      );
      if (!catHit && !urunler.length) return null;
      return { g, gi, urunler: catHit && urunler.length === 0 ? all : urunler };
    })
    .filter(Boolean) as { g: MenuGrup; gi: number; urunler: { urun: MenuUrun; ui: number }[] }[];

  const addCategory = () => {
    const ad = newCat.trim();
    if (!ad) {
      showMessage("Kategori adı yazın.", "error");
      return;
    }
    const used = new Set(
      menu.gruplar.map((g) => g.slug || slugifyTr(g.ad)).filter(Boolean)
    );
    used.add("menu");
    used.add("urunler");
    const slug = uniqueSlug(slugifyTr(ad) || "kategori", used);
    const href = categoryHref(slug);
    updateMenu({
      gruplar: [
        ...menu.gruplar,
        {
          ad,
          slug,
          adet: "0 çeşit",
          link: href,
          tumLink: href,
          image: "",
          banner: "",
          aciklama: "",
          govdeHtml: "",
          aktif: true,
          urunler: [],
        },
      ],
    });
    setOpen(menu.gruplar.length);
    setNewCat("");
    showMessage(`“${ad}” eklendi. Tabak ekleyip Kaydet’e basın.`, "success");
  };

  const addDish = (gi: number) => {
    const ad = newDish.ad.trim();
    if (!ad) {
      showMessage("Tabak adı yazın.", "error");
      return;
    }
    const fiyat = newDish.fiyat.trim();
    setContent((prev) => {
      if (!prev?.menu) return prev;
      const current = prev.menu;
      const gruplar = [...current.gruplar];
      const grup = gruplar[gi];
      if (!grup) return prev;
      gruplar[gi] = {
        ...grup,
        urunler: [
          {
            ad,
            fiyat,
            fav: false,
            aktif: true,
            source: "local",
          },
          ...grup.urunler,
        ],
      };
      return { ...prev, menu: { ...current, gruplar } };
    });
    setNewDish({ ad: "", fiyat: "" });
    setOpen(gi);
    showMessage(`“${ad}” eklendi — Kaydet’e basınca sitede görünür.`, "success");
  };

  return (
    <>
      <AdminPageHeader
        title="Menü Yönetimi"
        description={`${menu.gruplar.length} bölüm · ${totalProducts} tabak — ana sayfa menüsü ve kategori sayfaları.`}
      />
      <SectionHint anchor="menu" label="Menü Yönetimi" />
      <AdminAlert message={message} type={messageType} />

      <div className="mb-4 space-y-3 rounded-2xl border border-[#C8703A]/30 bg-[#C8703A]/8 p-4">
        <p className="text-sm font-medium text-[#EEE9E0]">Hızlı ekle</p>
        <p className="text-xs text-[#8A9BB0]">
          Kategori veya tabak yazın, ekleyin, sonra alttaki Kaydet. Adres (URL) otomatik oluşur.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            label="Yeni kategori"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Örn. Serpme Kahvaltı"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCategory();
              }
            }}
          />
          <Button className="sm:mt-7" onClick={addCategory}>
            <Plus className="h-4 w-4" /> Kategori ekle
          </Button>
        </div>
        <Input
          label="Ara (kategori veya tabak)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kahvaltı, Aperol, nargile…"
        />
      </div>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <BolumBaslikFields
          value={content.bolumlar.menu}
          onChange={(menuBolum) => {
            setContent({
              ...content,
              bolumlar: { ...content.bolumlar, menu: menuBolum },
              menu: {
                ...menu,
                baslik: menuBolum.baslik,
                giris: menuBolum.lead || menu.giris,
              },
            });
          }}
        />
        <h3 className="pt-2 font-semibold text-[#F8F8F8]">Menü ekstra metinler</h3>
        <p className="text-xs text-[#6B7A94]">
          Ürün satırına tıklayınca detay sayfası açılır. WhatsApp ve telefon Admin → İletişim’deki numaraya gider.
        </p>
        <Input
          label="Yıldız açıklaması (ana menü + kategori kart notu)"
          value={menu.legend || ""}
          onChange={(e) => updateMenu({ legend: e.target.value })}
        />
        <Input
          label="Kategori ürün kartı notu (opsiyonel, yıldız metnini ezer)"
          value={menu.kartNot || content.sayfalar?.urunKategori?.kartNot || ""}
          onChange={(e) => {
            const kartNot = e.target.value;
            const urunKategori = {
              ...(content.sayfalar?.urunKategori || {
                eyebrow: "Menü",
                answerBaslik: "Kısa bilgi",
                listeBaslikSablon: "{ad} listesi",
                kartNot: "",
                ctaBaslik: "Rezervasyon & bilgi",
                ctaWaLabel: "WhatsApp’tan yazın",
                relatedBaslik: "Diğer kategoriler",
                relatedHepsi: "Tüm menü",
              }),
              kartNot,
            };
            setContent({
              ...content,
              menu: { ...menu, kartNot },
              sayfalar: content.sayfalar
                ? { ...content.sayfalar, urunKategori }
                : undefined,
            });
          }}
        />
        <Input
          label="Kategori “tümü” link şablonu"
          value={menu.tumMetinSablon || "{ad} hakkında bilgi →"}
          onChange={(e) => updateMenu({ tumMetinSablon: e.target.value })}
        />
        <p className="text-xs text-[#6B7A94]">{"{ad}"} yerine kategori adı yazılır</p>
        <Input
          label="Boş kategori metni (ana sayfa)"
          value={menu.emptyMetin || ""}
          onChange={(e) => updateMenu({ emptyMetin: e.target.value })}
          placeholder="Bu bölümde yayında tabak yok."
        />
        <textarea
          value={menu.not || ""}
          onChange={(e) => updateMenu({ not: e.target.value })}
          rows={2}
          className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20"
          placeholder="Alt not (ör: Gramaj, alerjen ve fiyat bilgisi)"
        />
      </section>

      <div className="space-y-4">
        {visibleGroups.map(({ g: grup, gi, urunler }) => (
          <div
            key={gi}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 transition"
          >
            <div className="flex w-full items-center justify-between px-5 py-4 bg-white/[0.02]">
              <button
                type="button"
                className="flex items-center gap-3 text-left flex-1"
                onClick={() => setOpen(open === gi ? null : gi)}
              >
                <div>
                  <p className="font-semibold text-[#EEE9E0] text-base">
                    {grup.ad || "Kategori"}
                  </p>
                  <p className="text-xs text-[#8A9BB0]">
                    {grup.urunler.length} ürün ·{" "}
                    {grup.adet || "adet belirtilmemiş"}
                    {grup.image && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[#C8703A]">
                        <ImageIcon className="h-3 w-3" /> Görsel var
                      </span>
                    )}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Yukarı taşı"
                  disabled={gi === 0}
                  onClick={() => moveGroup(gi, "up")}
                  className="rounded-lg p-1.5 text-[#6B7A94] hover:bg-white/[0.06] hover:text-[#EEE9E0] disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Aşağı taşı"
                  disabled={gi === menu.gruplar.length - 1}
                  onClick={() => moveGroup(gi, "down")}
                  className="rounded-lg p-1.5 text-[#6B7A94] hover:bg-white/[0.06] hover:text-[#EEE9E0] disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title={`“${grup.ad || "Kategori"}” kategorisini sil`}
                  aria-label="Kategoriyi sil"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      confirm(
                        `"${grup.ad || "Bu kategori"}" silinsin mi?\n\nAltındaki ${grup.urunler.length} ürün de silinir. Kaydet’e basmayı unutma.`
                      )
                    ) {
                      updateMenu({
                        gruplar: menu.gruplar.filter((_, j) => j !== gi),
                      });
                      if (open === gi) setOpen(null);
                      showMessage(
                        `"${grup.ad || "Kategori"}" kaldırıldı — kaydetmeyi unutma.`,
                        "success"
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/35 bg-red-500/15 px-2.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/25 hover:text-red-200"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Sil
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(open === gi ? null : gi)}
                  className="rounded-lg p-1.5 text-[#8A9BB0] hover:bg-white/[0.06]"
                >
                  {open === gi ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {open === gi && (
              <div className="space-y-6 border-t border-white/[0.06] p-5">
                {/* Kategori Temel Bilgileri */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8A9BB0]">
                    Kategori Bilgileri
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Kategori Adı"
                      value={grup.ad}
                      onChange={(e) => {
                        const ad = e.target.value;
                        const auto = slugifyTr(ad);
                        const locked =
                          Boolean(grup.slug) && grup.slug !== slugifyTr(grup.ad);
                        updateGroup(gi, {
                          ...grup,
                          ad,
                          slug: locked ? grup.slug : auto,
                          link: locked ? grup.link : categoryHref(auto),
                          tumLink: locked ? grup.tumLink : categoryHref(auto),
                        });
                      }}
                    />
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]">
                      <input
                        type="checkbox"
                        checked={grup.aktif !== false}
                        onChange={(e) =>
                          updateGroup(gi, { ...grup, aktif: e.target.checked })
                        }
                      />
                      Sitede yayınla
                    </label>
                    <Input
                      label="Adet Etiketi (ör: 12 çeşit)"
                      value={grup.adet || ""}
                      onChange={(e) =>
                        updateGroup(gi, { ...grup, adet: e.target.value })
                      }
                      placeholder="12 çeşit"
                    />
                    <Input
                      label="Sayfa adresi (otomatik)"
                      value={grup.slug ? categoryHref(grup.slug) : grup.link || ""}
                      onChange={(e) => {
                        const raw = e.target.value.trim();
                        const slug =
                          slugifyTr(raw.replace(/^\/menu\/?/i, "")) ||
                          slugifyTr(grup.ad);
                        updateGroup(gi, {
                          ...grup,
                          slug,
                          link: categoryHref(slug),
                          tumLink: categoryHref(slug),
                        });
                      }}
                      placeholder="/menu/kahvalti"
                    />
                    <p className="text-xs text-[#6B7A94] md:col-span-2">
                      Adı yazmanız yeterli. Adres kayıttan sonra kesinleşir.
                    </p>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
                        Kategori Açıklaması (kısa bilgi)
                      </label>
                      <textarea
                        value={grup.aciklama || ""}
                        onChange={(e) =>
                          updateGroup(gi, {
                            ...grup,
                            aciklama: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20"
                        placeholder="Kategori sayfasındaki kısa bilgi paragrafı"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
                        Uzun içerik (HTML)
                      </label>
                      <textarea
                        value={grup.govdeHtml || ""}
                        onChange={(e) =>
                          updateGroup(gi, {
                            ...grup,
                            govdeHtml: e.target.value,
                          })
                        }
                        rows={8}
                        className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 font-mono text-xs text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20"
                        placeholder="<h2>...</h2><p>...</p> — kategori sayfasındaki makale gövdesi"
                      />
                      <p className="mt-1 text-xs text-[#6B7A94]">
                        FAQ hariç makale gövdesi. Sık sorulanlar aşağıdan ayrı düzenlenir.
                      </p>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A9BB0]">
                          Sık sorulanlar (kategori SSS)
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            updateGroup(gi, {
                              ...grup,
                              sss: [
                                ...(grup.sss || []),
                                { soru: "", cevap: "" },
                              ],
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs text-[#EEE9E0] hover:bg-white/[0.04]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Soru ekle
                        </button>
                      </div>
                      {(grup.sss || []).length === 0 ? (
                        <p className="text-xs text-[#6B7A94]">
                          Bu kategoride henüz SSS yok. Eklemek için “Soru ekle”ye tıklayın.
                        </p>
                      ) : (
                        (grup.sss || []).map((item, si) => (
                          <div
                            key={si}
                            className="space-y-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3"
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1 space-y-2">
                                <Input
                                  label={`Soru ${si + 1}`}
                                  value={item.soru}
                                  onChange={(e) => {
                                    const sss = [...(grup.sss || [])];
                                    sss[si] = {
                                      ...sss[si],
                                      soru: e.target.value,
                                    };
                                    updateGroup(gi, { ...grup, sss });
                                  }}
                                />
                                <textarea
                                  value={item.cevap}
                                  onChange={(e) => {
                                    const sss = [...(grup.sss || [])];
                                    sss[si] = {
                                      ...sss[si],
                                      cevap: e.target.value,
                                    };
                                    updateGroup(gi, { ...grup, sss });
                                  }}
                                  rows={3}
                                  className="w-full rounded-2xl border border-white/[0.06] bg-[#0A0E14] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20"
                                  placeholder="Cevap"
                                />
                              </div>
                              <button
                                type="button"
                                title="Sil"
                                onClick={() => {
                                  const sss = (grup.sss || []).filter(
                                    (_, i) => i !== si
                                  );
                                  updateGroup(gi, { ...grup, sss });
                                }}
                                className="mt-7 rounded-lg p-2 text-[#6B7A94] hover:bg-red-500/10 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Kategori Görselleri */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8A9BB0]">
                    Kategori Görselleri
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Kategori Kapak Görseli */}
                    <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-[#EEE9E0]">
                          Kapak Görseli
                          <span className="ml-1 text-xs text-[#6B7A94]">
                            (kategori kartı)
                          </span>
                        </label>
                        {grup.image && (
                          <span className="text-xs font-semibold text-emerald-400">✓ Görsel Yüklü</span>
                        )}
                      </div>
                      {grup.image ? (
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={resolveMediaUrl(grup.image)}
                            alt={grup.ad}
                            className="max-h-48 w-full object-contain p-1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateGroup(gi, { ...grup, image: "" })
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/90 text-white shadow-lg transition hover:bg-red-600"
                            title="Görseli kaldır"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02]">
                          <ImageIcon className="h-8 w-8 text-[#4A5568]" />
                        </div>
                      )}
                      <Upload
                        uploadKey={`category-image-${gi}`}
                        label="Kapak Görseli Yükle"
                        onComplete={(files) => {
                          if (files[0]) {
                            patchGroup(gi, (g) => ({ ...g, image: files[0].url }));
                            showMessage("Kapak görseli yüklendi. Kaydetmeyi unutmayın.", "success");
                          }
                        }}
                        onError={(err) => showMessage(err.message, "error")}
                      />
                    </div>

                    {/* Kategori Banner Görseli */}
                    <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-[#EEE9E0]">
                          Banner Görseli
                          <span className="ml-1 text-xs text-[#6B7A94]">
                            (sayfa başlığı üstü)
                          </span>
                        </label>
                        {grup.banner && (
                          <span className="text-xs font-semibold text-emerald-400">✓ Banner Yüklü</span>
                        )}
                      </div>
                      {grup.banner ? (
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={resolveMediaUrl(grup.banner)}
                            alt={`${grup.ad} banner`}
                            className="max-h-48 w-full object-contain p-1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateGroup(gi, { ...grup, banner: "" })
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/90 text-white shadow-lg transition hover:bg-red-600"
                            title="Bannerı kaldır"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02]">
                          <ImageIcon className="h-8 w-8 text-[#4A5568]" />
                        </div>
                      )}
                      <Upload
                        uploadKey={`category-banner-${gi}`}
                        label="Banner Görseli Yükle"
                        onComplete={(files) => {
                          if (files[0]) {
                            patchGroup(gi, (g) => ({ ...g, banner: files[0].url }));
                            showMessage("Banner görseli yüklendi. Kaydetmeyi unutmayın.", "success");
                          }
                        }}
                        onError={(err) => showMessage(err.message, "error")}
                      />
                    </div>
                  </div>
                </div>


                {/* Ürünler */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9BB0]">
                    Tabaklar ({grup.urunler.length})
                  </h4>
                  <div className="grid gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 sm:grid-cols-[1fr_8rem_auto]">
                    <Input
                      label="Tabak adı"
                      value={open === gi ? newDish.ad : ""}
                      onChange={(e) => setNewDish((s) => ({ ...s, ad: e.target.value }))}
                      placeholder="Örn. Serpme Kahvaltı"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addDish(gi);
                        }
                      }}
                    />
                    <Input
                      label="Fiyat"
                      value={open === gi ? newDish.fiyat : ""}
                      onChange={(e) => setNewDish((s) => ({ ...s, fiyat: e.target.value }))}
                      placeholder="850"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addDish(gi);
                        }
                      }}
                    />
                    <Button className="sm:mt-7" onClick={() => addDish(gi)}>
                      <Plus className="h-4 w-4" /> Tabak ekle
                    </Button>
                  </div>
                  {urunler.map(({ urun, ui }) => (
                    <ProductRow
                      key={urun.id || urun.slug || `${gi}-${ui}`}
                      urun={urun}
                      categorySlug={
                        grup.slug ||
                        String(grup.link || "")
                          .replace(/^\/?(urunler|menu)\//, "")
                          .split("/")[0] ||
                        undefined
                      }
                      onChange={(u) => {
                        const next = [...grup.urunler];
                        next[ui] = u;
                        updateGroup(gi, { ...grup, urunler: next });
                      }}
                      onDelete={() =>
                        updateGroup(gi, {
                          ...grup,
                          urunler: grup.urunler.filter((_, j) => j !== ui),
                        })
                      }
                      onMoveUp={() => {
                        if (ui === 0) return;
                        const next = [...grup.urunler];
                        [next[ui - 1], next[ui]] = [next[ui], next[ui - 1]];
                        updateGroup(gi, { ...grup, urunler: next });
                      }}
                      onMoveDown={() => {
                        if (ui === grup.urunler.length - 1) return;
                        const next = [...grup.urunler];
                        [next[ui + 1], next[ui]] = [next[ui], next[ui + 1]];
                        updateGroup(gi, { ...grup, urunler: next });
                      }}
                      isFirst={ui === 0}
                      isLast={ui === grup.urunler.length - 1}
                      onError={(msg) => showMessage(msg, "error")}
                    />
                  ))}
                </div>

                {/* Kategori Sil — belirgin alan */}
                <div className="mt-2 rounded-xl border border-red-500/25 bg-red-500/[0.07] p-4">
                  <p className="mb-3 text-xs text-red-200/80">
                    Bu kategori siteden kalkar; içindeki ürünler de silinir. Geri almak için Kaydet’ten önce sayfayı yenileme.
                  </p>
                  <Button
                    variant="danger"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      if (
                        confirm(
                          `"${grup.ad}" kategorisini ve altındaki ${grup.urunler.length} ürünü silmek istediğinizden emin misiniz?`
                        )
                      ) {
                        updateMenu({
                          gruplar: menu.gruplar.filter((_, j) => j !== gi),
                        });
                        setOpen(null);
                        showMessage(
                          `"${grup.ad}" kaldırıldı — kaydetmeyi unutma.`,
                          "success"
                        );
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" /> Bu kategoriyi sil
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full py-3"
          onClick={() =>
            updateMenu({
              gruplar: [
                ...menu.gruplar,
                {
                  ad: "Yeni Kategori",
                  adet: "0 çeşit",
                  link: "/menu",
                  tumLink: "/menu",
                  image: "",
                  banner: "",
                  aciklama: "",
                  govdeHtml: "",
                  aktif: true,
                  urunler: [],
                },
              ],
            })
          }
        >
          <Plus className="h-4 w-4" /> Yeni Kategori Ekle
        </Button>
      </div>

      <div className="mt-8">
        <SaveBar onSave={save} saving={saving} />
      </div>
    </>
  );
}

function ProductRow({
  urun,
  categorySlug,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onError,
}: {
  urun: MenuUrun;
  categorySlug?: string;
  onChange: (u: MenuUrun) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onError?: (msg: string) => void;
}) {
  const [more, setMore] = useState(false);
  const detailHref =
    urun.slug && categorySlug
      ? `/menu/${categorySlug}/${urun.slug}`
      : urun.slug
        ? `/menu/${urun.slug}`
        : "";
  const gallery = [...(urun.images || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
  const sourceLabel =
    urun.source === "trendyol_go" || urun.externalId?.startsWith("trendyol_go:")
      ? "Trendyol Go"
      : urun.source === "yemeksepeti" || urun.externalId?.startsWith("yemeksepeti:")
        ? "Yemeksepeti"
        : "Manuel";

  return (
    <div className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 md:grid-cols-[170px_1.5fr_1fr_1.5fr_auto]">
      {/* Ürün Görseli */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
          Ürün Görseli
        </label>

        {urun.image ? (
          <div className="relative mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveMediaUrl(urun.image)}
              alt={urun.ad}
              className="h-28 w-full rounded-xl border border-white/10 object-cover"
            />
            <button
              type="button"
              onClick={() => onChange({ ...urun, image: "" })}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/80 text-white transition hover:bg-red-600"
              title="Görseli kaldır"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ) : urun.externalImageUrl ? (
          <div className="relative mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveMediaUrl(urun.externalImageUrl)}
              alt={urun.ad}
              className="h-28 w-full rounded-xl border border-dashed border-orange-400/30 object-cover"
            />
            <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-orange-200">
              API görseli
            </span>
          </div>
        ) : (
          <div className="mb-2 flex h-20 items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02]">
            <ImageIcon className="h-6 w-6 text-[#4A5568]" />
          </div>
        )}

        <Upload
          uploadKey=""
          accept="image/*,image/svg+xml,.svg,image/jpeg,image/png,image/webp,image/gif,image/avif"
          label="Ana görsel yükle / değiştir"
          onComplete={(files) => {
            if (files[0]) {
              onChange({
                ...urun,
                image: files[0].url,
                images: [
                  {
                    url: files[0].url,
                    alt: urun.ad,
                    source: "admin",
                    order: 0,
                    isPrimary: true,
                  },
                  ...(urun.images || []).filter((img) => img.url !== files[0].url),
                ],
              });
            }
          }}
          onError={(err) => {
            if (onError) onError(err.message);
          }}
        />
        <p className="mt-1.5 text-[11px] leading-snug text-[#8A9BB0]">
          Önerilen: <strong className="text-[#C9D1D9]">1200×500 px</strong>{" "}
          (geniş vitrin). JPEG/WebP, yatay kompozisyon — ürün sayfasında tam
          genişlikte görünür.
        </p>
        <div className="mt-2">
          <Upload
            uploadKey=""
            accept="image/*,image/svg+xml,.svg,image/jpeg,image/png,image/webp,image/gif,image/avif"
            label="Galeriye ekle"
            multiple
            onComplete={(files) => {
              const start = (urun.images || []).length;
              const added = files.map((f, i) => ({
                url: f.url,
                alt: urun.ad,
                source: "admin" as const,
                order: start + i,
                isPrimary: false,
              }));
              onChange({
                ...urun,
                images: [...(urun.images || []), ...added],
                image: urun.image || files[0]?.url || "",
              });
            }}
            onError={(err) => {
              if (onError) onError(err.message);
            }}
          />
        </div>
        {gallery.length > 0 ? (
          <div className="mt-2 space-y-1">
            {gallery.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="flex items-center gap-1 rounded-lg border border-white/[0.06] p-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(img.url)}
                  alt=""
                  className="h-8 w-8 rounded object-cover"
                />
                <button
                  type="button"
                  className="rounded px-1 text-[10px] text-[#8A9BB0] hover:bg-white/5"
                  title="Yukarı"
                  onClick={() => {
                    if (i === 0) return;
                    const next = [...gallery];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    onChange({
                      ...urun,
                      images: next.map((x, order) => ({ ...x, order })),
                    });
                  }}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="rounded px-1 text-[10px] text-[#8A9BB0] hover:bg-white/5"
                  title="Ana görsel"
                  onClick={() =>
                    onChange({
                      ...urun,
                      image: img.url,
                      images: gallery.map((x, order) => ({
                        ...x,
                        order,
                        isPrimary: x.url === img.url,
                      })),
                    })
                  }
                >
                  Ana
                </button>
                <button
                  type="button"
                  className="ml-auto rounded px-1 text-[10px] text-red-300 hover:bg-red-500/10"
                  onClick={() => {
                    const next = gallery.filter((_, j) => j !== i);
                    onChange({
                      ...urun,
                      images: next.map((x, order) => ({ ...x, order })),
                      image:
                        urun.image === img.url
                          ? next[0]?.url || ""
                          : urun.image,
                    });
                  }}
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Input
          label="Tabak adı"
          value={urun.ad}
          onChange={(e) =>
            onChange({
              ...urun,
              ad: e.target.value,
            })
          }
          placeholder="Örn. Serpme Kahvaltı"
        />
        {more ? (
          <>
          <Input
            label="Ürün slug (SEO)"
          value={urun.slug || ""}
          onChange={(e) => {
            const slug = e.target.value
              .toLocaleLowerCase("tr-TR")
              .replace(/ğ/g, "g")
              .replace(/ü/g, "u")
              .replace(/ş/g, "s")
              .replace(/ı/g, "i")
              .replace(/ö/g, "o")
              .replace(/ç/g, "c")
              .replace(/[^a-z0-9-]+/g, "-")
              .replace(/-+/g, "-");
            onChange({
              ...urun,
              slug,
              link: slug
                ? categorySlug
                  ? `/menu/${categorySlug}/${slug}`
                  : `/menu/${slug}`
                : urun.link,
            });
          }}
          placeholder="cavdar-ekmegi"
        />
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-[#8A9BB0]">
            Kaynak: [{sourceLabel}]
          </span>
          {(urun.trendyolId ||
            urun.source === "trendyol_go" ||
            urun.externalId?.startsWith("trendyol_go:")) && (
            <span className="rounded-md bg-orange-500/15 px-2 py-0.5 text-[10px] text-orange-300">
              Trendyol Go
            </span>
          )}
          {(urun.yemeksepetiId ||
            urun.source === "yemeksepeti" ||
            urun.externalId?.startsWith("yemeksepeti:")) && (
            <span className="rounded-md bg-pink-500/15 px-2 py-0.5 text-[10px] text-pink-300">
              Yemeksepeti
            </span>
          )}
        </div>
        {urun.externalId ? (
          <p className="text-[10px] text-[#8A9BB0]">
            External ID: {urun.externalId}
            {urun.lastSyncedAt
              ? ` · Son sync: ${new Date(urun.lastSyncedAt).toLocaleString("tr-TR")}`
              : ""}
          </p>
        ) : null}
          </>
        ) : null}
      </div>

      <div className="space-y-2">
        <Input
          label="Alt Not / Çeşit"
          value={urun.not || ""}
          onChange={(e) =>
            onChange({
              ...urun,
              not: e.target.value,
            })
          }
          placeholder="susamlı · çörekotlu"
        />
        <Input
          label="Fiyat"
          value={urun.fiyat || ""}
          onChange={(e) =>
            onChange({
              ...urun,
              fiyat: e.target.value,
            })
          }
          placeholder="Ör: 420"
        />
        <Input
          label="Açıklama"
          value={urun.aciklama || ""}
          onChange={(e) =>
            onChange({
              ...urun,
              aciklama: e.target.value,
            })
          }
          placeholder="Tabak açıklaması"
        />
        <label className="flex items-center gap-2 text-xs text-[#8A9BB0]">
          <input
            type="checkbox"
            checked={urun.aktif !== false}
            onChange={(e) => onChange({ ...urun, aktif: e.target.checked })}
          />
          Sitede yayınla
        </label>
        <button
          type="button"
          className="text-xs font-medium text-[#C8703A]"
          onClick={() => setMore((v) => !v)}
        >
          {more ? "Azalt" : "Alerjen, SEO, varyant…"}
        </button>
        {more ? (
          <>
        <Input
          label="Gramaj / varyantlar (virgülle)"
          value={(urun.varyantlar || []).join(", ")}
          onChange={(e) =>
            onChange({
              ...urun,
              varyantlar: e.target.value
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
            })
          }
          placeholder="250 g, 500 g, 1 kg"
        />
        <label className="flex items-center gap-2 text-xs text-[#8A9BB0]">
          <input
            type="checkbox"
            checked={urun.autoUpdatePrice !== false}
            onChange={(e) =>
              onChange({ ...urun, autoUpdatePrice: e.target.checked })
            }
          />
          API fiyatını otomatik güncelle
        </label>
        <label className="flex items-center gap-2 text-xs text-[#8A9BB0]">
          <input
            type="checkbox"
            checked={Boolean(urun.ozelSiparis)}
            onChange={(e) =>
              onChange({ ...urun, ozelSiparis: e.target.checked })
            }
          />
          Özel sipariş (WhatsApp / telefon)
        </label>
          </>
        ) : null}
      </div>

      <div className="space-y-1 text-xs text-[#8A9BB0]">
        <p>Detay adresi</p>
        <code className="block rounded-lg bg-black/30 px-2 py-1.5 text-[11px] text-[#C8703A]">
          {detailHref || "Kayıtta otomatik slug üretilir"}
        </code>
        {more ? (
          <>
        <Input
          label="İçindekiler"
          value={urun.icindekiler || ""}
          onChange={(e) => onChange({ ...urun, icindekiler: e.target.value })}
        />
        <Input
          label="Alerjen"
          value={urun.alerjen || ""}
          onChange={(e) => onChange({ ...urun, alerjen: e.target.value })}
        />
        <Input
          label="Saklama"
          value={urun.saklama || ""}
          onChange={(e) => onChange({ ...urun, saklama: e.target.value })}
        />
        <Input
          label="SEO title"
          value={urun.seoTitle || ""}
          onChange={(e) => onChange({ ...urun, seoTitle: e.target.value })}
        />
        <Input
          label="SEO description"
          value={urun.seoDescription || ""}
          onChange={(e) =>
            onChange({ ...urun, seoDescription: e.target.value })
          }
        />
          </>
        ) : null}
      </div>

      <div className="flex items-end justify-end gap-2 pb-0.5">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-[#6B7A94] transition hover:bg-white/[0.06] disabled:opacity-30"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] text-[#6B7A94] transition hover:bg-white/[0.06] disabled:opacity-30"
        >
          <ArrowDown className="h-5 w-5" />
        </button>

        <button
          type="button"
          title={urun.fav ? "Vitrinden çıkar" : "Vitrine al (★)"}
          onClick={() =>
            onChange({
              ...urun,
              fav: !urun.fav,
            })
          }
          className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
            urun.fav
              ? "border-[#C8703A]/40 bg-[#C8703A]/20 text-[#C8703A]"
              : "border-white/[0.04] bg-white/[0.02] text-[#6B7A94]"
          }`}
        >
          <Star
            className="h-5 w-5"
            fill={urun.fav ? "currentColor" : "none"}
          />
        </button>

        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl text-red-400 hover:bg-red-500/10"
          onClick={onDelete}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}