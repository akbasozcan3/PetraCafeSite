"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import type { SayfalarContent } from "@/lib/content/types";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";

const emptySayfalar = (): SayfalarContent =>
  structuredClone(DEFAULT_CONTENT.sayfalar || {
    urunler: { eyebrow: "", baslikSablon: "", lead: "" },
    urunKategori: {
      eyebrow: "",
      answerBaslik: "",
      listeBaslikSablon: "",
      kartNot: "",
      ctaBaslik: "",
      ctaWaLabel: "",
      relatedBaslik: "",
      relatedHepsi: "",
    },
    blog: { eyebrow: "", baslik: "", lead: "", ctaBaslik: "", ctaMetin: "" },
  });

export default function SayfalarPanel() {
  const { content, loading, setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const sayfalar = content.sayfalar || emptySayfalar();

  const setSayfalar = (next: SayfalarContent) => {
    setContent({ ...content, sayfalar: next });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await api.updateContent({ sayfalar });
      setContent(res.data);
      setMessage("Sayfa metinleri kaydedildi.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none";

  return (
    <>
      <AdminPageHeader
        title="Sayfa Metinleri"
        description="Ürünler, kategori ve blog sayfalarındaki başlık / giriş / CTA metinlerini düzenleyin."
      />
      <AdminAlert message={message} />

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#EEE9E0]">Ürünler hub</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Üst yazı (eyebrow)"
            value={sayfalar.urunler.eyebrow}
            onChange={(e) =>
              setSayfalar({ ...sayfalar, urunler: { ...sayfalar.urunler, eyebrow: e.target.value } })
            }
          />
          <Input
            label="Başlık şablonu"
            value={sayfalar.urunler.baslikSablon}
            onChange={(e) =>
              setSayfalar({ ...sayfalar, urunler: { ...sayfalar.urunler, baslikSablon: e.target.value } })
            }
            placeholder="{n} kategoride {m} çeşit"
          />
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Giriş metni</label>
            <textarea
              className={fieldClass}
              rows={2}
              value={sayfalar.urunler.lead}
              onChange={(e) =>
                setSayfalar({ ...sayfalar, urunler: { ...sayfalar.urunler, lead: e.target.value } })
              }
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-[#8A9BB0]">
          Başlık şablonunda {"{n}"} = kategori sayısı, {"{m}"} = ürün sayısı.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#EEE9E0]">Ürün kategori sayfası</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["eyebrow", "Üst yazı"],
              ["answerBaslik", "Kısa bilgi başlığı"],
              ["listeBaslikSablon", "Liste başlığı şablonu ({ad})"],
              ["ctaBaslik", "CTA kutu başlığı"],
              ["ctaWaLabel", "WhatsApp buton metni"],
              ["relatedBaslik", "Diğer kategoriler başlığı"],
              ["relatedHepsi", "Tüm kategoriler linki"],
            ] as const
          ).map(([key, label]) => (
            <Input
              key={key}
              label={label}
              value={sayfalar.urunKategori[key]}
              onChange={(e) =>
                setSayfalar({
                  ...sayfalar,
                  urunKategori: { ...sayfalar.urunKategori, [key]: e.target.value },
                })
              }
            />
          ))}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Ürün kartı notu</label>
            <textarea
              className={fieldClass}
              rows={2}
              value={sayfalar.urunKategori.kartNot}
              onChange={(e) =>
                setSayfalar({
                  ...sayfalar,
                  urunKategori: { ...sayfalar.urunKategori, kartNot: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#EEE9E0]">Blog</h2>
        <p className="mb-4 text-xs text-[#6B7A94]">
          Blog listesi sayfasındaki üst yazı, başlık ve giriş metinleri. Marka adı geçmez — her mağaza için uygundur.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Üst yazı"
            value={sayfalar.blog.eyebrow}
            onChange={(e) => setSayfalar({ ...sayfalar, blog: { ...sayfalar.blog, eyebrow: e.target.value } })}
          />
          <Input
            label="Başlık"
            value={sayfalar.blog.baslik}
            onChange={(e) => setSayfalar({ ...sayfalar, blog: { ...sayfalar.blog, baslik: e.target.value } })}
          />
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Giriş</label>
            <textarea
              className={fieldClass}
              rows={2}
              value={sayfalar.blog.lead}
              onChange={(e) => setSayfalar({ ...sayfalar, blog: { ...sayfalar.blog, lead: e.target.value } })}
            />
          </div>
          <Input
            label="Alt CTA başlık"
            value={sayfalar.blog.ctaBaslik}
            onChange={(e) =>
              setSayfalar({ ...sayfalar, blog: { ...sayfalar.blog, ctaBaslik: e.target.value } })
            }
          />
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Alt CTA metin</label>
            <textarea
              className={fieldClass}
              rows={2}
              value={sayfalar.blog.ctaMetin}
              onChange={(e) =>
                setSayfalar({ ...sayfalar, blog: { ...sayfalar.blog, ctaMetin: e.target.value } })
              }
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Kaydet
        </Button>
      </div>
    </>
  );
}
