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
import type { MenuGrup, MenuUrun } from "@/lib/content/types";
import Input from "@/components/admin/ui/Input";
import Select from "@/components/admin/ui/Select";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import { SITE_PAGE_URLS } from "@/lib/admin/page-urls";
import Upload from "@/components/admin/ui/Upload";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import SectionHint from "@/components/admin/ui/SectionHint";
import BolumBaslikFields from "@/components/admin/ui/BolumBaslikFields";

export default function MenuPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [open, setOpen] = useState<number | null>(0);

  if (loading || !content) return <AdminLoading />;

  const menu = content.menu ?? {
    baslik: content.bolumlar.menu.baslik,
    giris: content.bolumlar.menu.lead,
    legend: "★ işaretliler en çok tercih edilenler.",
    hepsiMetin: "Tüm ürünleri inceleyin →",
    hepsiLink: "urunler/urunler",
    not: "",
    gruplar: [],
  };

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
  };

  const updateMenu = (patch: Partial<typeof menu>) =>
    setContent({ ...content, menu: { ...menu, ...patch } });

  const updateGroup = (i: number, g: MenuGrup) => {
    const gruplar = [...menu.gruplar];
    gruplar[i] = g;
    updateMenu({ gruplar });
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
    if (/^(urunler|blog)\//i.test(href)) return `/${href}`;
    return href;
  };

  const save = async () => {
    setSaving(true);
    try {
      const gruplar = menu.gruplar.map((g) => {
        const count = g.urunler.filter((u) => u.ad?.trim()).length;
        return {
          ...g,
          link: absSitePath(g.link),
          tumLink: absSitePath(g.tumLink),
          adet: count ? `${count} çeşit` : g.adet,
          urunler: g.urunler.map((u) => ({
            ...u,
            link: absSitePath(u.link),
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
        hepsiMetin: menu.hepsiMetin?.includes("→")
          ? `${gruplar.length} kategoride ${totalProducts} çeşidin tamamını inceleyin →`
          : menu.hepsiMetin,
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
      });
      setContent(res.data);
      showMessage(
        "Menü ve ürünler başarıyla kaydedildi — site anında güncellenir.",
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

  return (
    <>
      <AdminPageHeader
        title="Ürünler"
        description={`${menu.gruplar.length} kategori · ${totalProducts} ürün — Ana sayfa menü bölümü ve kategori sayfaları.`}
      />
      <SectionHint anchor="menu" label="Ürünler / Menü" />
      <AdminAlert message={message} type={messageType} />

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
        <Input
          label="Yıldız açıklaması"
          value={menu.legend || ""}
          onChange={(e) => updateMenu({ legend: e.target.value })}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Tüm ürünler buton metni"
            value={menu.hepsiMetin || ""}
            onChange={(e) => updateMenu({ hepsiMetin: e.target.value })}
          />
          <Select
            label="Tüm ürünler sayfa adresi"
            value={menu.hepsiLink || "urunler/urunler"}
            options={SITE_PAGE_URLS}
            onChange={(e) => updateMenu({ hepsiLink: e.target.value })}
          />
        </div>
        <textarea
          value={menu.not || ""}
          onChange={(e) => updateMenu({ not: e.target.value })}
          rows={2}
          className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20"
          placeholder="Alt not (ör: Gramaj, alerjen ve fiyat bilgisi)"
        />
      </section>

      <div className="space-y-4">
        {menu.gruplar.map((grup, gi) => (
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

              <div className="flex items-center gap-2">
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
                      onChange={(e) =>
                        updateGroup(gi, { ...grup, ad: e.target.value })
                      }
                    />
                    <Input
                      label="Adet Etiketi (ör: 12 çeşit)"
                      value={grup.adet || ""}
                      onChange={(e) =>
                        updateGroup(gi, { ...grup, adet: e.target.value })
                      }
                      placeholder="12 çeşit"
                    />
                    <Select
                      label="Kategori sayfa adresi"
                      value={grup.link || ""}
                      options={SITE_PAGE_URLS}
                      onChange={(e) =>
                        updateGroup(gi, { ...grup, link: e.target.value })
                      }
                    />
                    <Select
                      label="Kategori detay adresi"
                      value={grup.tumLink || ""}
                      options={SITE_PAGE_URLS}
                      onChange={(e) =>
                        updateGroup(gi, { ...grup, tumLink: e.target.value })
                      }
                    />
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
                            updateGroup(gi, {
                              ...grup,
                              image: files[0].url,
                            });
                            showMessage(`${grup.ad} kapak görseli güncellendi.`, "success");
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
                            updateGroup(gi, {
                              ...grup,
                              banner: files[0].url,
                            });
                            showMessage(`${grup.ad} banner görseli güncellendi.`, "success");
                          }
                        }}
                        onError={(err) => showMessage(err.message, "error")}
                      />
                    </div>
                  </div>
                </div>


                {/* Ürünler */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A9BB0]">
                      Ürünler ({grup.urunler.length})
                    </h4>
                  </div>
                  {grup.urunler.map((urun, ui) => (
                    <ProductRow
                      key={ui}
                      urun={urun}
                      onChange={(u) => {
                        const urunler = [...grup.urunler];
                        urunler[ui] = u;
                        updateGroup(gi, { ...grup, urunler });
                      }}
                      onDelete={() =>
                        updateGroup(gi, {
                          ...grup,
                          urunler: grup.urunler.filter((_, j) => j !== ui),
                        })
                      }
                      onMoveUp={() => {
                        if (ui === 0) return;
                        const urunler = [...grup.urunler];
                        [urunler[ui - 1], urunler[ui]] = [
                          urunler[ui],
                          urunler[ui - 1],
                        ];
                        updateGroup(gi, { ...grup, urunler });
                      }}
                      onMoveDown={() => {
                        if (ui === grup.urunler.length - 1) return;
                        const urunler = [...grup.urunler];
                        [urunler[ui + 1], urunler[ui]] = [
                          urunler[ui],
                          urunler[ui + 1],
                        ];
                        updateGroup(gi, { ...grup, urunler });
                      }}
                      isFirst={ui === 0}
                      isLast={ui === grup.urunler.length - 1}
                      onError={(msg) => showMessage(msg, "error")}
                    />
                  ))}
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateGroup(gi, {
                          ...grup,
                          urunler: [
                            ...grup.urunler,
                            {
                              ad: "Yeni Ürün",
                              fav: false,
                              link: grup.link || "urunler/urunler",
                            },
                          ],
                        })
                      }
                    >
                      <Plus className="h-4 w-4" /> Yeni Ürün Ekle
                    </Button>
                  </div>
                </div>

                {/* Kategori Sil */}
                <div className="pt-4 border-t border-white/[0.04]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={() => {
                      if (
                        confirm(
                          `"${grup.ad}" kategorisini ve altındaki ürünleri silmek istediğinizden emin misiniz?`
                        )
                      ) {
                        updateMenu({
                          gruplar: menu.gruplar.filter((_, j) => j !== gi),
                        });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" /> Bu Kategoriyi Sil
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
                  link: "urunler/urunler",
                  tumLink: "urunler/urunler",
                  image: "",
                  banner: "",
                  aciklama: "",
                  govdeHtml: "",
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
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onError,
}: {
  urun: MenuUrun;
  onChange: (u: MenuUrun) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onError?: (msg: string) => void;
}) {
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
        ) : (
          <div className="mb-2 flex h-20 items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02]">
            <ImageIcon className="h-6 w-6 text-[#4A5568]" />
          </div>
        )}

        <Upload
          uploadKey=""
          onComplete={(files) => {
            if (files[0]) {
              onChange({
                ...urun,
                image: files[0].url,
              });
            }
          }}
          onError={(err) => {
            if (onError) onError(err.message);
          }}
        />
      </div>

      <Input
        label="Ürün Adı"
        value={urun.ad}
        onChange={(e) =>
          onChange({
            ...urun,
            ad: e.target.value,
          })
        }
        placeholder="Ör: Papatya Ekmeği"
      />

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

      <Select
        label="Ürün sayfa adresi"
        value={urun.link || ""}
        options={SITE_PAGE_URLS}
        onChange={(e) =>
          onChange({
            ...urun,
            link: e.target.value,
          })
        }
      />

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
          title={urun.fav ? "Favoriden Çıkar" : "Favori Yap"}
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