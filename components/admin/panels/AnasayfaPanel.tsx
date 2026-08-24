"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ExternalLink, Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import { HOME_SECTION_META } from "@/lib/content/sections";
import type { BolumGoster, HomeSectionId } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

export default function AnasayfaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const { can } = useAdminSession();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;

  const goster: BolumGoster = {
    ...(DEFAULT_CONTENT.bolumGoster || {}),
    ...(content.bolumGoster || {}),
  };
  const rsv = {
    ...(DEFAULT_CONTENT.rezervasyon || {}),
    ...(content.rezervasyon || {}),
  };
  const msg = {
    ...(DEFAULT_CONTENT.mesajForm || {}),
    ...(content.mesajForm || {}),
  };
  const ziyaret = content.ziyaret?.length
    ? content.ziyaret
    : DEFAULT_CONTENT.ziyaret || [];
  const seo = content.seo;

  const setOn = (id: HomeSectionId, on: boolean) => {
    setContent({
      ...content,
      bolumGoster: { ...goster, [id]: on },
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload: Partial<typeof content> = {
        bolumGoster: content.bolumGoster,
        bolumlar: content.bolumlar,
        rezervasyon: content.rezervasyon,
        mesajForm: content.mesajForm,
        ziyaret: content.ziyaret,
      };
      if (can("seo:write")) payload.seo = content.seo;
      const res = await api.updateContent(payload);
      setContent(res.data);
      setMessage("Ana sayfa kaydedildi. Siteyi yenileyin.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Ana sayfa CMS"
        description="Sitedeki sırayla tüm bölümler. Aç/kapa, yazıları düzenle, ilgili görsel ve liste ekranlarına geç."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Değişiklikleri Kaydet"}</span>
          </Button>
        }
      />
      <AdminAlert message={message} />

      <div className="mb-6 rounded-2xl border border-[#C8703A]/25 bg-[#C8703A]/8 px-4 py-3">
        <span className="text-sm text-[#EEE9E0]">
          Bölüm sıralaması sabittir (Hakkımızda → Hizmetler → Menü → Havuz → Galeri → Blog → Yorumlar → SSS → Rezervasyon → İletişim). Görünürlüğü açıp kapatabilirsiniz.
        </span>
      </div>

      <section className="mb-6 space-y-3 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Bölüm görünürlüğü (Aç / Kapat)</h3>
        <p className="text-xs text-[#6B7A94]">
          Duyuru çubuğu ve ana sayfa bölümlerini tek tıkla gizleyin veya gösterin.
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {HOME_SECTION_META.map((sec) => {
            const on = goster[sec.id] !== false;
            return (
              <label
                key={sec.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition ${
                  on
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[0.08] bg-[#0E1522] text-[#6B7A94]"
                }`}
              >
                <span>{sec.label}</span>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={(e) => setOn(sec.id, e.target.checked)}
                  className="rounded border-white/20 bg-transparent text-emerald-500"
                />
              </label>
            );
          })}
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#F8F8F8] flex items-center gap-2">
              <span className="text-[#D9A441]">✦</span> Ziyaret & Hızlı Bilgi Şeridi (4'lü Kart Vitrini)
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Ana sayfanın üst kısmında yer alan Saatler, Rezervasyon, Havuz ve Konum bilgi kartlarını buradan özelleştirebilirsiniz.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {ziyaret.map((item, i) => (
            <div
              key={i}
              className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0E1522] p-4 md:grid-cols-[1fr_1.2fr_1.5fr_1fr_auto]"
            >
              <Input
                label="Üst Başlık (Ör: SAATLER)"
                value={item.k}
                placeholder="Saatler"
                onChange={(e) => {
                  const arr = [...ziyaret];
                  arr[i] = { ...arr[i], k: e.target.value };
                  setContent({ ...content, ziyaret: arr });
                }}
              />
              <Input
                label="Vurgu / Büyük Yazı"
                value={item.v}
                placeholder="08:00 – 02:00"
                onChange={(e) => {
                  const arr = [...ziyaret];
                  arr[i] = { ...arr[i], v: e.target.value };
                  setContent({ ...content, ziyaret: arr });
                }}
              />
              <Input
                label="Alt Açıklama"
                value={item.n}
                placeholder="Cafe açık · Havuz 09:00–18:00"
                onChange={(e) => {
                  const arr = [...ziyaret];
                  arr[i] = { ...arr[i], n: e.target.value };
                  setContent({ ...content, ziyaret: arr });
                }}
              />
              <Input
                label="Bağlantı / Link (Opsiyonel)"
                value={item.href || ""}
                placeholder="#rezervasyon veya tel:..."
                onChange={(e) => {
                  const arr = [...ziyaret];
                  arr[i] = { ...arr[i], href: e.target.value };
                  setContent({ ...content, ziyaret: arr });
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-end text-red-400 hover:text-red-300"
                onClick={() =>
                  setContent({
                    ...content,
                    ziyaret: ziyaret.filter((_, j) => j !== i),
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
                ziyaret: [...ziyaret, { k: "", v: "", n: "", href: "" }],
              })
            }
            className="border-dashed border-white/20 text-[#D9A441]"
          >
            <Plus className="h-4 w-4 mr-1" /> Yeni Bilgi Kartı Ekle
          </Button>
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Rezervasyon bölümü & Form ayarları</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Bölüm Başlığı (Sol Alan)"
            value={content.bolumlar?.rezervasyon?.baslik || ""}
            placeholder="Masanızı ayırtın"
            onChange={(e) =>
              setContent({
                ...content,
                bolumlar: {
                  ...content.bolumlar,
                  rezervasyon: {
                    eyebrow: "Rezervasyon",
                    lead: "",
                    ...content.bolumlar?.rezervasyon,
                    baslik: e.target.value,
                  },
                },
              })
            }
          />
          <Input
            label="Bölüm Üst Etiket (Eyebrow)"
            value={content.bolumlar?.rezervasyon?.eyebrow || ""}
            placeholder="Rezervasyon"
            onChange={(e) =>
              setContent({
                ...content,
                bolumlar: {
                  ...content.bolumlar,
                  rezervasyon: {
                    baslik: "Masanızı ayırtın",
                    lead: "",
                    ...content.bolumlar?.rezervasyon,
                    eyebrow: e.target.value,
                  },
                },
              })
            }
          />
          <div className="md:col-span-2">
            <Input
              label="Bölüm Açıklama Metni (Lead)"
              value={content.bolumlar?.rezervasyon?.lead || ""}
              placeholder="Tarih, saat ve kişi sayısını bırakın; ekibimiz telefonla onaylar..."
              onChange={(e) =>
                setContent({
                  ...content,
                  bolumlar: {
                    ...content.bolumlar,
                    rezervasyon: {
                      eyebrow: "Rezervasyon",
                      baslik: "Masanızı ayırtın",
                      ...content.bolumlar?.rezervasyon,
                      lead: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
          <Input
            label="Minimum Kişi Sayısı"
            type="number"
            value={rsv.minKisi !== undefined ? String(rsv.minKisi) : "1"}
            onChange={(e) =>
              setContent({
                ...content,
                rezervasyon: { ...rsv, minKisi: Math.max(1, Number(e.target.value) || 1) },
              })
            }
          />
          <Input
            label="Maksimum Kişi Sayısı (Max Masa Kapasitesi)"
            type="number"
            value={rsv.maxKisi !== undefined ? String(rsv.maxKisi) : "8"}
            onChange={(e) =>
              setContent({
                ...content,
                rezervasyon: { ...rsv, maxKisi: Math.max(1, Number(e.target.value) || 8) },
              })
            }
          />
          <Input
            label="Form üst etiket"
            value={rsv.formKicker || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, formKicker: e.target.value } })
            }
          />
          <Input
            label="Form başlık"
            value={rsv.formBaslik || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, formBaslik: e.target.value } })
            }
          />

          <Input
            label="Form açıklama"
            value={rsv.formLead || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, formLead: e.target.value } })
            }
          />
          <Input
            label="Gönder butonu"
            value={rsv.ctaLabel || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, ctaLabel: e.target.value } })
            }
          />
          <Input
            label="Başarı mesajı"
            value={rsv.successMetin || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, successMetin: e.target.value } })
            }
          />
          <Input
            label="Gönderiliyor…"
            value={rsv.gonderiliyor || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, gonderiliyor: e.target.value } })
            }
          />
          <Input
            label="Etiket: Tarih"
            value={rsv.labelTarih || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelTarih: e.target.value } })
            }
          />
          <Input
            label="Etiket: Saat"
            value={rsv.labelSaat || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelSaat: e.target.value } })
            }
          />
          <Input
            label="Etiket: Kişi"
            value={rsv.labelKisi || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelKisi: e.target.value } })
            }
          />
          <Input
            label="Kişi şablonu"
            value={rsv.kisiSablon || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, kisiSablon: e.target.value } })
            }
            placeholder="{n} kişi"
          />
          <Input
            label="Etiket: Ad"
            value={rsv.labelAd || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelAd: e.target.value } })
            }
          />
          <Input
            label="Etiket: Telefon"
            value={rsv.labelTelefon || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelTelefon: e.target.value } })
            }
          />
          <Input
            label="Etiket: Not"
            value={rsv.labelNot || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, labelNot: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: Ad"
            value={rsv.placeholderAd || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, placeholderAd: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: Telefon"
            value={rsv.placeholderTelefon || ""}
            onChange={(e) =>
              setContent({
                ...content,
                rezervasyon: { ...rsv, placeholderTelefon: e.target.value },
              })
            }
          />
          <Input
            label="Yer tutucu: Not"
            value={rsv.placeholderNot || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, placeholderNot: e.target.value } })
            }
          />
          <Input
            label="Kapalı gün metni"
            value={rsv.kapaliMetin || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, kapaliMetin: e.target.value } })
            }
          />
          <Input
            label="Görsel alt yazısı"
            value={rsv.gorselAlt || ""}
            onChange={(e) =>
              setContent({ ...content, rezervasyon: { ...rsv, gorselAlt: e.target.value } })
            }
          />
        </div>
        <label className="mb-2 mt-2 block text-sm font-medium text-[#8A9BB0]">
          Maddeler (her satır bir madde)
        </label>
        <textarea
          className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
          rows={4}
          value={(rsv.maddeler || []).join("\n")}
          onChange={(e) =>
            setContent({
              ...content,
              rezervasyon: { ...rsv, maddeler: e.target.value.split("\n") },
            })
          }
        />
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">İletişim mesaj formu</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Üst etiket"
            value={msg.kicker || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, kicker: e.target.value } })}
          />
          <Input
            label="Başlık"
            value={msg.baslik || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, baslik: e.target.value } })}
          />
          <Input
            label="Açıklama"
            value={msg.lead || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, lead: e.target.value } })}
          />
          <Input
            label="Gönder butonu"
            value={msg.gonder || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, gonder: e.target.value } })}
          />
          <Input
            label="Başarı mesajı"
            value={msg.success || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, success: e.target.value } })}
          />
          <Input
            label="Gönderiliyor…"
            value={msg.gonderiliyor || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, gonderiliyor: e.target.value } })
            }
          />
          <Input
            label="Etiket: Ad"
            value={msg.labelAd || ""}
            onChange={(e) => setContent({ ...content, mesajForm: { ...msg, labelAd: e.target.value } })}
          />
          <Input
            label="Etiket: Telefon"
            value={msg.labelTelefon || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, labelTelefon: e.target.value } })
            }
          />
          <Input
            label="Etiket: E-posta"
            value={msg.labelEposta || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, labelEposta: e.target.value } })
            }
          />
          <Input
            label="Etiket: Mesaj"
            value={msg.labelMesaj || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, labelMesaj: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: Ad"
            value={msg.placeholderAd || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, placeholderAd: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: Telefon"
            value={msg.placeholderTelefon || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, placeholderTelefon: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: E-posta"
            value={msg.placeholderEposta || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, placeholderEposta: e.target.value } })
            }
          />
          <Input
            label="Yer tutucu: Mesaj"
            value={msg.placeholderMesaj || ""}
            onChange={(e) =>
              setContent({ ...content, mesajForm: { ...msg, placeholderMesaj: e.target.value } })
            }
          />
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Google / şema (ana sayfa)</h3>
        <p className="text-xs text-[#6B7A94]">
          Arama sonuçlarındaki restoran kartı. Mutfakları virgülle ayırın.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Mutfaklar"
            value={seo.servesCuisine || ""}
            onChange={(e) =>
              setContent({ ...content, seo: { ...seo, servesCuisine: e.target.value } })
            }
          />
          <Input
            label="Fiyat aralığı"
            value={seo.priceRange || ""}
            onChange={(e) =>
              setContent({ ...content, seo: { ...seo, priceRange: e.target.value } })
            }
            placeholder="₺₺₺"
          />
          <Input
            label="İlçe / yerleşim"
            value={seo.addressLocality || ""}
            onChange={(e) =>
              setContent({ ...content, seo: { ...seo, addressLocality: e.target.value } })
            }
          />
          <Input
            label="İl / bölge"
            value={seo.addressRegion || ""}
            onChange={(e) =>
              setContent({ ...content, seo: { ...seo, addressRegion: e.target.value } })
            }
          />
          <Input
            label="Ülke kodu"
            value={seo.addressCountry || ""}
            onChange={(e) =>
              setContent({ ...content, seo: { ...seo, addressCountry: e.target.value } })
            }
          />
          <label className="flex items-center gap-2 self-end text-sm text-[#EEE9E0]">
            <input
              type="checkbox"
              checked={seo.acceptsReservations !== false}
              onChange={(e) =>
                setContent({
                  ...content,
                  seo: { ...seo, acceptsReservations: e.target.checked },
                })
              }
            />
            Rezervasyon kabul eder
          </label>
        </div>
      </section>
    </>
  );
}
