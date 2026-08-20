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
      />
      <AdminAlert message={message} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#C8703A]/25 bg-[#C8703A]/8 px-4 py-3">
        <p className="text-sm text-[#C8D0DC]">
          Yazılar, görseller ve listeler API üzerinden <code>/api/v1/content</code> ile yayınlanır.
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E8B84B]"
        >
          Siteyi aç <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <section className="mb-6 space-y-3">
        {HOME_SECTION_META.map((sec, idx) => {
          const on = goster[sec.id] !== false;
          return (
            <div
              key={sec.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4"
            >
              <span className="w-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B7A94]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <label className="flex items-center gap-2 text-sm text-[#EEE9E0]">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={(e) => setOn(sec.id, e.target.checked)}
                />
                {on ? "Açık" : "Kapalı"}
              </label>
              <div className="min-w-[12rem] flex-1">
                <p className="font-semibold text-[#F8F8F8]">{sec.label}</p>
                <p className="text-xs text-[#6B7A94]">{sec.description}</p>
              </div>
              <Link
                href={sec.admin}
                className="inline-flex items-center gap-1 text-sm font-medium text-[#C8703A]"
              >
                Düzenle <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href={sec.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8A9BB0] hover:text-[#EEE9E0]"
              >
                Sitede
              </a>
            </div>
          );
        })}
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Ziyaret şeridi</h3>
        <p className="text-xs text-[#6B7A94]">
          Ana sayfadaki bilgi kartları. Değer boşsa ilk kart saatleri, ikinci kart telefonu iletişimden alır.
        </p>
        <div className="space-y-3">
          {ziyaret.map((item, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <Input
                label="Etiket"
                value={item.k}
                onChange={(e) => {
                  const next = [...ziyaret];
                  next[i] = { ...item, k: e.target.value };
                  setContent({ ...content, ziyaret: next });
                }}
              />
              <Input
                label="Değer"
                value={item.v}
                onChange={(e) => {
                  const next = [...ziyaret];
                  next[i] = { ...item, v: e.target.value };
                  setContent({ ...content, ziyaret: next });
                }}
              />
              <Input
                label="Alt satır"
                value={item.n}
                onChange={(e) => {
                  const next = [...ziyaret];
                  next[i] = { ...item, n: e.target.value };
                  setContent({ ...content, ziyaret: next });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="self-end"
                onClick={() =>
                  setContent({
                    ...content,
                    ziyaret: ziyaret.filter((_, j) => j !== i),
                  })
                }
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                ziyaret: [...ziyaret, { k: "", v: "", n: "" }],
              })
            }
          >
            <Plus className="h-4 w-4" /> Kart ekle
          </Button>
        </div>
      </section>

      <section className="mb-6 space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="font-semibold text-[#F8F8F8]">Rezervasyon formu ayarları & Kişi kapasitesi</h3>
        <div className="grid gap-3 md:grid-cols-2">
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

      <SaveBar onSave={save} saving={saving} />
    </>
  );
}
