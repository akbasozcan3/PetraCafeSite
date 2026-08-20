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
      const res = await api.updateContent({ sayfalar, legal: content.legal });
      setContent(res.data);
      setMessage("Sayfa ve Yasal/KVKK metinleri başarıyla kaydedildi.");
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
        description="Menü, kategori ve blog sayfalarındaki başlık / giriş / CTA metinleri. Navbar’daki Menü her zaman /menu sayfasına gider; bu alan o sayfanın yazılarıdır."
      />
      <AdminAlert message={message} />

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#EEE9E0]">Menü sayfası</h2>
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
          <div className="md:col-span-2">
            <Input
              label="Alt not (hub)"
              value={sayfalar.urunler.altNot || ""}
              onChange={(e) =>
                setSayfalar({
                  ...sayfalar,
                  urunler: { ...sayfalar.urunler, altNot: e.target.value },
                })
              }
              placeholder="Sunum menüsü — sepet yok…"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-[#8A9BB0]">
          Başlık şablonunda {"{n}"} = kategori sayısı, {"{m}"} = tabak sayısı.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-4 text-lg font-semibold text-[#EEE9E0]">Menü kategori sayfası</h2>
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
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">Kart notu</label>
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
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Tabak detay notları (her satır bir madde)
            </label>
            <textarea
              className={fieldClass}
              rows={3}
              value={sayfalar.urunKategori.detayNotlari || ""}
              onChange={(e) =>
                setSayfalar({
                  ...sayfalar,
                  urunKategori: {
                    ...sayfalar.urunKategori,
                    detayNotlari: e.target.value,
                  },
                })
              }
              placeholder={"Rezervasyon önerilir\nAlerjen için servise danışın"}
            />
          </div>
          <Input
            label="Detay WhatsApp butonu"
            value={sayfalar.urunKategori.detayWaLabel || ""}
            onChange={(e) =>
              setSayfalar({
                ...sayfalar,
                urunKategori: {
                  ...sayfalar.urunKategori,
                  detayWaLabel: e.target.value,
                },
              })
            }
          />
          <Input
            label="Detay telefon butonu"
            value={sayfalar.urunKategori.detayTelLabel || ""}
            onChange={(e) =>
              setSayfalar({
                ...sayfalar,
                urunKategori: {
                  ...sayfalar.urunKategori,
                  detayTelLabel: e.target.value,
                },
              })
            }
          />
          <Input
            label="Fiyat yoksa metin"
            value={sayfalar.urunKategori.fiyatSorulur || ""}
            onChange={(e) =>
              setSayfalar({
                ...sayfalar,
                urunKategori: {
                  ...sayfalar.urunKategori,
                  fiyatSorulur: e.target.value,
                },
              })
            }
          />
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

      {/* Yasal & KVKK Sayfaları Yönetimi */}
      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h2 className="mb-2 text-lg font-semibold text-[#EEE9E0]">Yasal & KVKK Sayfaları</h2>
        <p className="mb-6 text-xs text-[#6B7A94]">
          Gizlilik Politikası, Rezervasyon / İptal Koşulları, Kullanım Koşulları, Çerez Politikası ve Ticari Bilgiler sayfalarının içerikleri.
        </p>

        <div className="space-y-6">
          {/* 1. Gizlilik Politikası & KVKK */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-[#D9A441] mb-3">1. Gizlilik Politikası ve KVKK Metni (/gizlilik-politikasi)</h3>
            <div className="grid gap-3">
              <Input
                label="Sayfa Başlığı"
                value={content.legal?.gizlilikPolitikasi?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      gizlilikPolitikasi: {
                        ...content.legal?.gizlilikPolitikasi,
                        title: e.target.value,
                        body: content.legal?.gizlilikPolitikasi?.body || "",
                      },
                    },
                  })
                }
              />
              <Input
                label="Özet / Giriş Metni"
                value={content.legal?.gizlilikPolitikasi?.lead || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      gizlilikPolitikasi: {
                        ...content.legal?.gizlilikPolitikasi,
                        title: content.legal?.gizlilikPolitikasi?.title || "",
                        lead: e.target.value,
                        body: content.legal?.gizlilikPolitikasi?.body || "",
                      },
                    },
                  })
                }
              />
              <div>
                <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Detaylı Metin & Maddeler</label>
                <textarea
                  className={fieldClass}
                  rows={6}
                  value={content.legal?.gizlilikPolitikasi?.body || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      legal: {
                        ...content.legal,
                        gizlilikPolitikasi: {
                          ...content.legal?.gizlilikPolitikasi,
                          title: content.legal?.gizlilikPolitikasi?.title || "",
                          body: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* 2. Rezervasyon & İptal Koşulları */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-[#D9A441] mb-3">2. Rezervasyon, İptal ve İade Koşulları (/rezervasyon-kosullari)</h3>
            <div className="grid gap-3">
              <Input
                label="Sayfa Başlığı"
                value={content.legal?.rezervasyonKosullari?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      rezervasyonKosullari: {
                        ...content.legal?.rezervasyonKosullari,
                        title: e.target.value,
                        body: content.legal?.rezervasyonKosullari?.body || "",
                      },
                    },
                  })
                }
              />
              <Input
                label="Özet / Giriş Metni"
                value={content.legal?.rezervasyonKosullari?.lead || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      rezervasyonKosullari: {
                        ...content.legal?.rezervasyonKosullari,
                        title: content.legal?.rezervasyonKosullari?.title || "",
                        lead: e.target.value,
                        body: content.legal?.rezervasyonKosullari?.body || "",
                      },
                    },
                  })
                }
              />
              <div>
                <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Detaylı Metin & Maddeler</label>
                <textarea
                  className={fieldClass}
                  rows={6}
                  value={content.legal?.rezervasyonKosullari?.body || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      legal: {
                        ...content.legal,
                        rezervasyonKosullari: {
                          ...content.legal?.rezervasyonKosullari,
                          title: content.legal?.rezervasyonKosullari?.title || "",
                          body: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* 3. Kullanım Koşulları */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-[#D9A441] mb-3">3. Kullanım Koşulları (/kullanim-kosullari)</h3>
            <div className="grid gap-3">
              <Input
                label="Sayfa Başlığı"
                value={content.legal?.kullanimKosullari?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      kullanimKosullari: {
                        ...content.legal?.kullanimKosullari,
                        title: e.target.value,
                        body: content.legal?.kullanimKosullari?.body || "",
                      },
                    },
                  })
                }
              />
              <div>
                <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Detaylı Metin & Maddeler</label>
                <textarea
                  className={fieldClass}
                  rows={5}
                  value={content.legal?.kullanimKosullari?.body || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      legal: {
                        ...content.legal,
                        kullanimKosullari: {
                          ...content.legal?.kullanimKosullari,
                          title: content.legal?.kullanimKosullari?.title || "",
                          body: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* 4. Çerez Politikası */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-[#D9A441] mb-3">4. Çerez (Cookie) Politikası (/cerez-politikasi)</h3>
            <div className="grid gap-3">
              <Input
                label="Sayfa Başlığı"
                value={content.legal?.cerezPolitikasi?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      cerezPolitikasi: {
                        ...content.legal?.cerezPolitikasi,
                        title: e.target.value,
                        body: content.legal?.cerezPolitikasi?.body || "",
                      },
                    },
                  })
                }
              />
              <div>
                <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Detaylı Metin & Maddeler</label>
                <textarea
                  className={fieldClass}
                  rows={5}
                  value={content.legal?.cerezPolitikasi?.body || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      legal: {
                        ...content.legal,
                        cerezPolitikasi: {
                          ...content.legal?.cerezPolitikasi,
                          title: content.legal?.cerezPolitikasi?.title || "",
                          body: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* 5. İşletme ve Ticari Bilgiler */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-sm font-semibold text-[#D9A441] mb-3">5. İşletme ve Ticari Bilgiler (/ticari-bilgiler)</h3>
            <div className="grid gap-3">
              <Input
                label="Sayfa Başlığı"
                value={content.legal?.ticariBilgiler?.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    legal: {
                      ...content.legal,
                      ticariBilgiler: {
                        ...content.legal?.ticariBilgiler,
                        title: e.target.value,
                        body: content.legal?.ticariBilgiler?.body || "",
                      },
                    },
                  })
                }
              />
              <div>
                <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Detaylı Metin & Maddeler</label>
                <textarea
                  className={fieldClass}
                  rows={5}
                  value={content.legal?.ticariBilgiler?.body || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      legal: {
                        ...content.legal,
                        ticariBilgiler: {
                          ...content.legal?.ticariBilgiler,
                          title: content.legal?.ticariBilgiler?.title || "",
                          body: e.target.value,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
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

