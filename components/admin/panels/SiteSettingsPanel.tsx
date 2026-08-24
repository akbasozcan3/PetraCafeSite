"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import ColorField from "@/components/admin/ui/ColorField";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, {
  AdminAlert,
  AdminGate,
} from "@/components/admin/AdminPageHeader";
import type { FooterColumn, FooterLink } from "@/lib/content/types";
import { resolveTheme } from "@/lib/content/theme";
import AdminImage from "@/components/admin/ui/AdminImage";

export default function SiteSettingsPanel() {
  const { setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  return (
    <AdminGate>
      {(content) => {
        const seo = content.seo;
        const footer = content.footer;
        const wa = content.waFloat;
        const legal = content.legal;
        const meta = content.yorumlarMeta || {
          googleSayacMetin: "",
          googleSkor: "",
          dogrulamaEtiketi: "",
          googleUrl: "",
        };

        const show = (msg: string, type: "success" | "error") => {
          setMessage(msg);
          setMessageType(type);
        };

        const save = async () => {
          setSaving(true);
          setMessage("");
          try {
            const res = await api.updateContent({
              brand: content.brand,
              seo: content.seo,
              footer: content.footer,
              waFloat: content.waFloat,
              legal: content.legal,
              yorumlarMeta: content.yorumlarMeta,
              navbar: content.navbar,
              hero: content.hero,
            });
            setContent(res.data);
            show("Site ayarları kaydedildi.", "success");
          } catch (e) {
            show(e instanceof Error ? e.message : "Kayıt başarısız", "error");
          } finally {
            setSaving(false);
          }
        };

        const updateCol = (i: number, col: FooterColumn) => {
          const kolonlar = [...footer.kolonlar];
          kolonlar[i] = col;
          setContent({ ...content, footer: { ...footer, kolonlar } });
        };

        const updateLink = (ci: number, li: number, link: FooterLink) => {
          const links = [...footer.kolonlar[ci].links];
          links[li] = link;
          updateCol(ci, { ...footer.kolonlar[ci], links });
        };

        return (
          <>
            <AdminPageHeader
              title="Site & SEO"
              description="Mağaza adı, SEO, footer, WhatsApp butonu ve yasal metinler."
              actions={
                <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
                  <span>{saving ? "Kaydediliyor…" : "💾 Ayarları Kaydet"}</span>
                </Button>
              }
            />
            <AdminAlert message={message} type={messageType} />

            <section className="mb-6 space-y-4 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Mağaza markası</h3>
              <p className="text-xs text-[#6B7A94]">
                Bu isim SEO site adı, footer markası, navbar kısaltması ve hero yedek markasına otomatik yansır.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Mağaza / marka adı"
                  value={content.brand?.displayName || seo.siteName || footer.markaAdi || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      brand: {
                        displayName: e.target.value,
                        shortName: content.brand?.shortName || content.navbar?.logoText || "",
                      },
                      seo: { ...seo, siteName: e.target.value },
                      footer: { ...footer, markaAdi: e.target.value },
                    })
                  }
                  placeholder="Örn. Akcan Fırın"
                />
                <Input
                  label="Kısa ad (navbar / hero)"
                  value={content.brand?.shortName || content.navbar?.logoText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      brand: {
                        displayName:
                          content.brand?.displayName || seo.siteName || footer.markaAdi || "",
                        shortName: e.target.value,
                      },
                      navbar: { ...content.navbar, logoText: e.target.value },
                    })
                  }
                  placeholder="Örn. AKCAN"
                />
              </div>
            </section>

            <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">SEO</h3>
              <Input
                label="Sayfa başlığı (title)"
                value={seo.title}
                onChange={(e) =>
                  setContent({ ...content, seo: { ...seo, title: e.target.value } })
                }
              />
              <div>
                <label className="mb-2 block text-sm text-[#8A9BB0]">Açıklama (description)</label>
                <textarea
                  value={seo.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, description: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="OG başlık"
                  value={seo.ogTitle}
                  onChange={(e) =>
                    setContent({ ...content, seo: { ...seo, ogTitle: e.target.value } })
                  }
                />
                <Input
                  label="Site adı"
                  value={seo.siteName}
                  onChange={(e) =>
                    setContent({ ...content, seo: { ...seo, siteName: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#8A9BB0]">OG açıklama</label>
                <textarea
                  value={seo.ogDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, ogDescription: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Canonical URL"
                  value={seo.canonicalUrl}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, canonicalUrl: e.target.value },
                    })
                  }
                />
                <Input
                  label="Tema rengi"
                  value={seo.themeColor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, themeColor: e.target.value },
                    })
                  }
                />
              </div>
              <p className="text-xs text-[#6B7A94]">Google restoran şeması (ana sayfa JSON-LD)</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Mutfaklar (virgülle)"
                  value={seo.servesCuisine || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, servesCuisine: e.target.value },
                    })
                  }
                />
                <Input
                  label="Fiyat aralığı"
                  value={seo.priceRange || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, priceRange: e.target.value },
                    })
                  }
                />
                <Input
                  label="İlçe"
                  value={seo.addressLocality || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, addressLocality: e.target.value },
                    })
                  }
                />
                <Input
                  label="İl"
                  value={seo.addressRegion || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      seo: { ...seo, addressRegion: e.target.value },
                    })
                  }
                />
              </div>
            </section>

            <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">WhatsApp yüzen buton</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Başlık"
                  value={wa.baslik}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      waFloat: { ...wa, baslik: e.target.value },
                    })
                  }
                />
                <Input
                  label="Alt yazı"
                  value={wa.alt}
                  onChange={(e) =>
                    setContent({ ...content, waFloat: { ...wa, alt: e.target.value } })
                  }
                />
                <Input
                  label="Hazır mesaj"
                  value={wa.onYazi}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      waFloat: { ...wa, onYazi: e.target.value },
                    })
                  }
                />
                <Input
                  label="Erişilebilirlik etiketi"
                  value={wa.ariaLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      waFloat: { ...wa, ariaLabel: e.target.value },
                    })
                  }
                />
              </div>
            </section>

            <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Yorum rozeti</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Skor"
                  value={meta.googleSkor}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      yorumlarMeta: { ...meta, googleSkor: e.target.value },
                    })
                  }
                />
                <Input
                  label="Sayaç metni"
                  value={meta.googleSayacMetin}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      yorumlarMeta: { ...meta, googleSayacMetin: e.target.value },
                    })
                  }
                />
                <Input
                  label="Doğrulama etiketi"
                  value={meta.dogrulamaEtiketi}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      yorumlarMeta: { ...meta, dogrulamaEtiketi: e.target.value },
                    })
                  }
                />
                <Input
                  label="Google bağlantısı"
                  value={meta.googleUrl || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      yorumlarMeta: { ...meta, googleUrl: e.target.value },
                    })
                  }
                />
              </div>
            </section>

            <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Footer & Logo Ayarları</h3>

              {/* Footer Logo Önizleme ve Boyut Ayarları */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-4 space-y-3">
                <label className="text-sm font-semibold text-[#D9A441] block">
                  Footer Logo Önizleme & Boyutlandırma
                </label>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center justify-center p-3 rounded-lg bg-[#141E2E] border border-white/[0.1] min-w-[120px] min-h-[70px]">
                    <div style={{ width: `${footer.logoWidth || 160}px`, height: `${footer.logoHeight || 52}px` }}>
                      <AdminImage
                        src={content.images?.logo}
                        alt="Footer Logo Önizleme"
                        contain
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-[#8A9BB0] mb-1 block">
                        Genişlik: <b className="text-white">{footer.logoWidth || 160}px</b>
                      </label>
                      <input
                        type="range"
                        min={60}
                        max={300}
                        step={5}
                        value={footer.logoWidth || 160}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: {
                              ...footer,
                              logoWidth: parseInt(e.target.value, 10),
                            },
                          })
                        }
                        className="w-full accent-[#D9A441]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#8A9BB0] mb-1 block">
                        Yükseklik: <b className="text-white">{footer.logoHeight || 52}px</b>
                      </label>
                      <input
                        type="range"
                        min={30}
                        max={140}
                        step={2}
                        value={footer.logoHeight || 52}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            footer: {
                              ...footer,
                              logoHeight: parseInt(e.target.value, 10),
                            },
                          })
                        }
                        className="w-full accent-[#D9A441]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Marka adı"
                  value={footer.markaAdi}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...footer, markaAdi: e.target.value },
                    })
                  }
                />
                <Input
                  label="Yasal metin"
                  value={footer.yasalMetin}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...footer, yasalMetin: e.target.value },
                    })
                  }
                />
                <Input
                  label="İletişim kolon başlığı"
                  value={footer.iletisimBaslik || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...footer, iletisimBaslik: e.target.value },
                    })
                  }
                />
                <Input
                  label="WhatsApp etiketi"
                  value={footer.whatsappEtiket || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...footer, whatsappEtiket: e.target.value },
                    })
                  }
                />
                <ColorField
                  label="Footer Arka Plan Rengi (Zemin)"
                  value={resolveTheme(content.theme).footerBg}
                  onChange={(val) =>
                    setContent({
                      ...content,
                      theme: { ...resolveTheme(content.theme), footerBg: val },
                    })
                  }
                />
                <ColorField
                  label="Footer Yazı Rengi"
                  value={resolveTheme(content.theme).footerText}
                  onChange={(val) =>
                    setContent({
                      ...content,
                      theme: { ...resolveTheme(content.theme), footerText: val },
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[#8A9BB0]">Slogan</label>
                <textarea
                  value={footer.slogan}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...footer, slogan: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                />
              </div>
              <p className="text-xs text-[#6B7A94]">Alt çubuk linkleri (Menü / Blog / Rezervasyon)</p>
              {(footer.barLinks || []).map((link, i) => (
                <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <Input
                    label="Etiket"
                    value={link.label}
                    onChange={(e) => {
                      const barLinks = [...(footer.barLinks || [])];
                      barLinks[i] = { ...link, label: e.target.value };
                      setContent({ ...content, footer: { ...footer, barLinks } });
                    }}
                  />
                  <Input
                    label="Bağlantı"
                    value={link.href}
                    onChange={(e) => {
                      const barLinks = [...(footer.barLinks || [])];
                      barLinks[i] = { ...link, href: e.target.value };
                      setContent({ ...content, footer: { ...footer, barLinks } });
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="self-end text-red-400"
                    onClick={() =>
                      setContent({
                        ...content,
                        footer: {
                          ...footer,
                          barLinks: (footer.barLinks || []).filter((_, j) => j !== i),
                        },
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setContent({
                    ...content,
                    footer: {
                      ...footer,
                      barLinks: [...(footer.barLinks || []), { label: "", href: "/" }],
                    },
                  })
                }
              >
                <Plus className="h-4 w-4" /> Alt link ekle
              </Button>

              {footer.kolonlar.map((col, ci) => (
                <div
                  key={ci}
                  className="space-y-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4"
                >
                  <Input
                    label={`Kolon ${ci + 1} başlığı`}
                    value={col.baslik}
                    onChange={(e) => updateCol(ci, { ...col, baslik: e.target.value })}
                  />
                  {col.links.map((link, li) => (
                    <div key={li} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                      <Input
                        label="Etiket"
                        value={link.label}
                        onChange={(e) =>
                          updateLink(ci, li, { ...link, label: e.target.value })
                        }
                      />
                      <Input
                        label="Bağlantı"
                        value={link.href}
                        onChange={(e) =>
                          updateLink(ci, li, { ...link, href: e.target.value })
                        }
                      />
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400"
                          onClick={() =>
                            updateCol(ci, {
                              ...col,
                              links: col.links.filter((_, j) => j !== li),
                            })
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateCol(ci, {
                        ...col,
                        links: [...col.links, { label: "", href: "#" }],
                      })
                    }
                  >
                    <Plus className="h-4 w-4" /> Link Ekle
                  </Button>
                </div>
              ))}
            </section>

            <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
              <h3 className="font-semibold text-[#F8F8F8]">Yasal metinler</h3>
              {(
                [
                  ["kvkk", "KVKK"],
                  ["gizlilik", "Gizlilik"],
                  ["cerez", "Çerez"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label className="mb-2 block text-sm text-[#8A9BB0]">{label}</label>
                  <textarea
                    value={legal[key]}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        legal: { ...legal, [key]: e.target.value },
                      })
                    }
                    rows={2}
                    className="w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
                  />
                </div>
              ))}
            </section>
          </>
        );
      }}
    </AdminGate>
  );
}
