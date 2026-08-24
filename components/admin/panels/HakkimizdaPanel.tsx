"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api/client";
import Upload from "@/components/admin/ui/Upload";
import AdminImage from "@/components/admin/ui/AdminImage";
import HeroTextEditor from "@/components/admin/ui/HeroTextEditor";
import ColorField from "@/components/admin/ui/ColorField";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import SectionHint from "@/components/admin/ui/SectionHint";
import AdminPageHeader, {
  AdminAlert,
  AdminLoading,
} from "@/components/admin/AdminPageHeader";
import type { BolumBaslik } from "@/lib/content/types";
import { SITE_ICON_OPTIONS } from "@/lib/content/site-icons";

const fieldClass =
  "w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none focus:ring-1 focus:ring-[#C8703A]/20";

export default function HakkimizdaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;
  const h = content.hakkimizda || ({} as any);

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        hakkimizda: content.hakkimizda,
        images: content.images,
      });
      setContent(res.data);
      setMessage("Hakkımızda başarıyla kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const totalWords = ((h.lead || "") + " " + (h.body || []).join(" ")).trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <AdminPageHeader
        title="Hakkımızda & Yaşam Merkezi Yönetimi"
        description="Ana sayfa ve /hakkimizda sayfasındaki tüm metinler, kelime limiti, 4 yaşam deneyimi, istatistikler, zaman çizelgesi, organizasyonlar ve S.S.S."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2">
            <span>{saving ? "Kaydediliyor…" : "💾 Tüm Değişiklikleri Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="hakkimizda" label="Hakkımızda" />
      <AdminAlert message={message} />

      <div className="space-y-6">
        
        {/* 1. BAŞLIKLAR VE GİRİŞ */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <span>🏷️</span> Üst Başlıklar ve Giriş Metni
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Üst etiket (Eyebrow)"
              value={h.eyebrow || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, eyebrow: e.target.value },
                })
              }
              placeholder="HAKKIMIZDA & YAŞAM MERKEZİ"
            />
            <Input
              label="Ana Başlık (H1)"
              value={h.baslik || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, baslik: e.target.value },
                })
              }
              placeholder="Petra Yaşam Merkezi'nde Cafe & Restaurant"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Giriş / Vurgu Cümlesi (Lead)
            </label>
            <textarea
              value={h.lead || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, lead: e.target.value },
                })
              }
              rows={2}
              className={fieldClass}
              placeholder="Keyif, konfor ve kalite — kahvaltıdan akşam yemeğine, havuz kenarından organizasyona."
            />
          </div>
        </section>

        {/* 2. KISACA KUTUSU */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <span>💡</span> Kısaca Kutusu (Öne Çıkan Bilgi)
          </h3>
          <Input
            label="Kutu Başlığı"
            value={h.answerBaslik || ""}
            onChange={(e) =>
              setContent({
                ...content,
                hakkimizda: { ...h, answerBaslik: e.target.value },
              })
            }
            placeholder="Kısaca Petra"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Kısaca Özeti Metni
            </label>
            <textarea
              value={h.answerMetin || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, answerMetin: e.target.value },
                })
              }
              rows={3}
              className={fieldClass}
              placeholder="Petra Cafe Restaurant, Çekmeköy Taşdelen’de Petra Yaşam Merkezi içinde dünya mutfağı, serpme kahvaltı, İtalyan tatlı ve kokteyl, kahve, nargile ve havuz–plaj sunar."
            />
          </div>
        </section>

        {/* 3. ANA SAYFA KELİME LİMİTİ & ÖNİZLEME AYARI */}
        <section className="space-y-4 rounded-2xl border border-[#D9A441]/40 bg-[#1A1813] p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#E8B84B] flex items-center gap-2">
              <span>🔢</span> Ana Sayfa Kelime Limiti (Önizleme Ayarı)
            </h3>
            <span className="text-xs font-bold text-[#E8B84B] bg-[#D9A441]/20 px-3 py-1 rounded-full border border-[#D9A441]/40">
              Şu Anki Ayar: {h.homeWordLimit || 100} Kelime (Toplam Makale: {totalWords} Kelime)
            </span>
          </div>
          
          <p className="text-xs text-[#C8B89A] leading-relaxed">
            Ana sayfadaki "Hakkımızda" bölümünde makalenin kaç kelimesinin gösterileceğini belirler. Metin bu kelime sayısına ulaştığında kesilir ve altına <strong className="text-white">"Devamını Oku →"</strong> butonu eklenerek kullanıcı <strong className="text-[#E8B84B]">/hakkimizda</strong> sayfasına yönlendirilir.
          </p>

          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              type="number"
              min={10}
              max={5000}
              value={h.homeWordLimit || 100}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: {
                    ...h,
                    homeWordLimit: parseInt(e.target.value, 10) || 100,
                  },
                })
              }
              className={fieldClass}
            />
            <div className="flex flex-wrap gap-2 items-center">
              {[40, 80, 150, 300, 500, totalWords || 600].map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() =>
                    setContent({
                      ...content,
                      hakkimizda: { ...h, homeWordLimit: preset },
                    })
                  }
                  className={`text-xs px-3 py-2 rounded-lg font-bold border transition-colors ${
                    (h.homeWordLimit || 100) === preset
                      ? "bg-[#D9A441] text-[#0D0F0A] border-[#D9A441]"
                      : "bg-white/5 text-[#E8B84B] border-white/10 hover:bg-white/10"
                  }`}
                >
                  {pIdx === 5 ? `Tümü (${preset})` : `${preset} Kelime`}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PARAGRAFLAR & DETAYLI MAKALE */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>📝</span> Makale Paragrafları & Başlıklar (/hakkimizda Sayfası)
            </h3>
            <span className="text-xs font-semibold text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-1 rounded-lg border border-[#D9A441]/30">
              {h.body?.length || 0} Paragraf
            </span>
          </div>

          <div className="rounded-xl border border-[#D9A441]/30 bg-[#1A1813] p-4 text-xs space-y-2">
            <b className="text-[#E8B84B] flex items-center gap-1.5 font-bold">
              <span>💡</span> Başlık ve Yazı Biçimlendirme İpuçları:
            </b>
            <div className="grid gap-2 sm:grid-cols-2 text-[#C8B89A]">
              <div><code className="text-[#E8B84B] bg-black/40 px-1.5 py-0.5 rounded font-mono"># Büyük Başlık</code> ➔ Beyaz Büyük Başlık (H1)</div>
              <div><code className="text-[#E8B84B] bg-black/40 px-1.5 py-0.5 rounded font-mono">## Alt Başlık</code> ➔ Altın Sarısı Başlık (H2)</div>
              <div><code className="text-[#E8B84B] bg-black/40 px-1.5 py-0.5 rounded font-mono">**Kalın Yazı**</code> ➔ <strong>Kalın Metin</strong></div>
              <div><code className="text-[#E8B84B] bg-black/40 px-1.5 py-0.5 rounded font-mono">&gt; Alıntı Cümlesi</code> ➔ Vurgulu Alıntı Kutusu</div>
            </div>
          </div>

          {(h.body || []).map((p: string, i: number) => (
            <div key={i} className="space-y-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-[#8A9BB0]">
                    Paragraf {i + 1}
                  </label>
                  <span className="text-[11px] text-[#6B7A94]">
                    ({(p || "").trim().split(/\s+/).filter(Boolean).length} kelime)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300"
                  onClick={() =>
                    setContent({
                      ...content,
                      hakkimizda: {
                        ...h,
                        body: h.body.filter((_: any, j: number) => j !== i),
                      },
                    })
                  }
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Sil
                </Button>
              </div>
              <textarea
                value={p}
                onChange={(e) => {
                  const body = [...(h.body || [])];
                  body[i] = e.target.value;
                  setContent({
                    ...content,
                    hakkimizda: { ...h, body },
                  });
                }}
                rows={3}
                className={fieldClass}
                placeholder={`Paragraf ${i + 1} içeriği...`}
              />
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContent({
                ...content,
                hakkimizda: { ...h, body: [...(h.body || []), ""] },
              })
            }
            className="border-dashed border-white/20 text-[#D9A441] hover:bg-white/5"
          >
            <Plus className="h-4 w-4 mr-1" /> Yeni Paragraf Ekle
          </Button>
        </section>

        {/* 5. RAKAMLARLA PETRA / İSTATİSTİKLER */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>📊</span> Rakamlarla Petra (İstatistik Göstergeleri)
            </h3>
            <p className="text-xs text-[#8A9BB0]">
              /hakkimizda sayfasının üstündeki 4'lü sayaç/istatistik kartları.
            </p>
          </div>

          <div className="space-y-3">
            {((h.stats || h.ozet || []) as any[]).map((item: any, i: number) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4 md:grid-cols-[1fr_1.5fr_1.5fr_auto]"
              >
                <Input
                  label="Büyük Değer (Ör: 08:00 – 02:00)"
                  value={item.b || ""}
                  onChange={(e) => {
                    const stats = [...((h.stats || h.ozet || []) as any[])];
                    stats[i] = { ...stats[i], b: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, stats },
                    });
                  }}
                />
                <Input
                  label="Başlık (Ör: Cafe & Restoran Açık)"
                  value={item.span || ""}
                  onChange={(e) => {
                    const stats = [...((h.stats || h.ozet || []) as any[])];
                    stats[i] = { ...stats[i], span: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, stats },
                    });
                  }}
                />
                <Input
                  label="Alt Açıklama"
                  value={item.sub || ""}
                  onChange={(e) => {
                    const stats = [...((h.stats || h.ozet || []) as any[])];
                    stats[i] = { ...stats[i], sub: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, stats },
                    });
                  }}
                  placeholder="Haftanın 7 günü kesintisiz lezzet"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end text-red-400 hover:text-red-300"
                  onClick={() => {
                    const stats = ((h.stats || h.ozet || []) as any[]).filter((_: any, j: number) => j !== i);
                    setContent({
                      ...content,
                      hakkimizda: { ...h, stats },
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const stats = [...((h.stats || h.ozet || []) as any[]), { b: "", span: "", sub: "" }];
                setContent({
                  ...content,
                  hakkimizda: { ...h, stats },
                });
              }}
              className="border-dashed border-white/20 text-[#D9A441]"
            >
              <Plus className="h-4 w-4 mr-1" /> İstatistik Kartı Ekle
            </Button>
          </div>
        </section>

        {/* 6. DÖRT TEMEL YAŞAM DENEYİMİ (EXPERIENCES) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>🍽️</span> 4 Ana Yaşam Deneyimi (Kartlar)
            </h3>
            <p className="text-xs text-[#8A9BB0]">
              Kahvaltı, Dünya Mutfağı, Havuz & Beach, Tatlı & Nargile kartları.
            </p>
          </div>

          <div className="space-y-4">
            {(h.experiences || []).map((exp: any, i: number) => (
              <div key={i} className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-sm font-bold text-[#D9A441]">
                    Deneyim #{i + 1}: {exp.title || "Yeni Deneyim"}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => {
                      const experiences = (h.experiences || []).filter((_: any, j: number) => j !== i);
                      setContent({
                        ...content,
                        hakkimizda: { ...h, experiences },
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Sil
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <Input
                    label="Deneyim Başlığı"
                    value={exp.title || ""}
                    onChange={(e) => {
                      const experiences = [...(h.experiences || [])];
                      experiences[i] = { ...experiences[i], title: e.target.value };
                      setContent({
                        ...content,
                        hakkimizda: { ...h, experiences },
                      });
                    }}
                    placeholder="Zengin Serpme Kahvaltı"
                  />
                  <Input
                    label="Servis Saatleri"
                    value={exp.hours || ""}
                    onChange={(e) => {
                      const experiences = [...(h.experiences || [])];
                      experiences[i] = { ...experiences[i], hours: e.target.value };
                      setContent({
                        ...content,
                        hakkimizda: { ...h, experiences },
                      });
                    }}
                    placeholder="08:00 – 14:00"
                  />
                  <Input
                    label="Vurgu Etiketi"
                    value={exp.tag || ""}
                    onChange={(e) => {
                      const experiences = [...(h.experiences || [])];
                      experiences[i] = { ...experiences[i], tag: e.target.value };
                      setContent({
                        ...content,
                        hakkimizda: { ...h, experiences },
                      });
                    }}
                    placeholder="Her Sabah Taze"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">
                    Açıklama Metni
                  </label>
                  <textarea
                    value={exp.desc || ""}
                    onChange={(e) => {
                      const experiences = [...(h.experiences || [])];
                      experiences[i] = { ...experiences[i], desc: e.target.value };
                      setContent({
                        ...content,
                        hakkimizda: { ...h, experiences },
                      });
                    }}
                    rows={2}
                    className={fieldClass}
                    placeholder="Deneyim açıklaması..."
                  />
                </div>

                <Input
                  label="Özellik Maddeleri (Virgülle ayırarak yazın)"
                  value={Array.isArray(exp.features) ? exp.features.join(", ") : (exp.features || "")}
                  onChange={(e) => {
                    const experiences = [...(h.experiences || [])];
                    experiences[i] = {
                      ...experiences[i],
                      features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, experiences },
                    });
                  }}
                  placeholder="Sınırsız Demlik Çay, Taş Fırın Çıtır Pişi, Yöresel Doğal Lezzetler"
                />
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const experiences = [
                  ...(h.experiences || []),
                  { title: "", hours: "", tag: "", desc: "", features: [] },
                ];
                setContent({
                  ...content,
                  hakkimizda: { ...h, experiences },
                });
              }}
              className="border-dashed border-white/20 text-[#D9A441]"
            >
              <Plus className="h-4 w-4 mr-1" /> Deneyim Kartı Ekle
            </Button>
          </div>
        </section>

        {/* 7. BİR GÜNÜN PETRA'DAKİ AKIŞI (TIMELINE) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>⏰</span> Bir Günün Petra'daki Akışı (24 Saat Zaman Çizelgesi)
            </h3>
          </div>

          <div className="space-y-3">
            {(h.timeline || []).map((step: any, i: number) => (
              <div key={i} className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4 md:grid-cols-[1fr_1.5fr_2fr_auto]">
                <Input
                  label="Saat Dilimi"
                  value={step.time || ""}
                  onChange={(e) => {
                    const timeline = [...(h.timeline || [])];
                    timeline[i] = { ...timeline[i], time: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, timeline },
                    });
                  }}
                  placeholder="08:00 – 12:00"
                />
                <Input
                  label="Başlık"
                  value={step.title || ""}
                  onChange={(e) => {
                    const timeline = [...(h.timeline || [])];
                    timeline[i] = { ...timeline[i], title: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, timeline },
                    });
                  }}
                  placeholder="Güne Enerjik ve Taze Başlangıç"
                />
                <Input
                  label="Açıklama"
                  value={step.desc || ""}
                  onChange={(e) => {
                    const timeline = [...(h.timeline || [])];
                    timeline[i] = { ...timeline[i], desc: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, timeline },
                    });
                  }}
                  placeholder="Zaman çizelgesi açıklaması..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end text-red-400 hover:text-red-300"
                  onClick={() => {
                    const timeline = (h.timeline || []).filter((_: any, j: number) => j !== i);
                    setContent({
                      ...content,
                      hakkimizda: { ...h, timeline },
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const timeline = [
                  ...(h.timeline || []),
                  { time: "", title: "", desc: "" },
                ];
                setContent({
                  ...content,
                  hakkimizda: { ...h, timeline },
                });
              }}
              className="border-dashed border-white/20 text-[#D9A441]"
            >
              <Plus className="h-4 w-4 mr-1" /> Zaman Dilimi Ekle
            </Button>
          </div>
        </section>

        {/* 8. TEMEL DEĞERLERİMİZ (VALUES) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>🛡️</span> Temel Değerlerimiz & Standartlarımız
            </h3>
          </div>

          <div className="space-y-3">
            {(h.values || []).map((val: any, i: number) => (
              <div key={i} className="grid gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4 md:grid-cols-[1.5fr_2.5fr_auto]">
                <Input
                  label="Değer Başlığı"
                  value={val.title || ""}
                  onChange={(e) => {
                    const values = [...(h.values || [])];
                    values[i] = { ...values[i], title: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, values },
                    });
                  }}
                  placeholder="Tavizsiz Hijyen & Kalite"
                />
                <Input
                  label="Açıklama"
                  value={val.desc || ""}
                  onChange={(e) => {
                    const values = [...(h.values || [])];
                    values[i] = { ...values[i], desc: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, values },
                    });
                  }}
                  placeholder="Değer açıklaması..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end text-red-400 hover:text-red-300"
                  onClick={() => {
                    const values = (h.values || []).filter((_: any, j: number) => j !== i);
                    setContent({
                      ...content,
                      hakkimizda: { ...h, values },
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const values = [
                  ...(h.values || []),
                  { title: "", desc: "" },
                ];
                setContent({
                  ...content,
                  hakkimizda: { ...h, values },
                });
              }}
              className="border-dashed border-white/20 text-[#D9A441]"
            >
              <Plus className="h-4 w-4 mr-1" /> Değer Maddesi Ekle
            </Button>
          </div>
        </section>

        {/* 9. ÖZEL GÜNLER & ORGANİZASYON */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <span>🎉</span> Özel Gün & Organizasyon Vitrini
          </h3>
          <Input
            label="Bölüm Başlığı"
            value={h.eventsTitle || ""}
            onChange={(e) =>
              setContent({
                ...content,
                hakkimizda: { ...h, eventsTitle: e.target.value },
              })
            }
            placeholder="Unutulmaz Anlar İçin Özel Organizasyon Masaları"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
              Açıklama Metni
            </label>
            <textarea
              value={h.eventsLead || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, eventsLead: e.target.value },
                })
              }
              rows={2}
              className={fieldClass}
              placeholder="Doğum günleri, evlilik teklifleri, mezuniyet ve kurumsal davetlerinizde..."
            />
          </div>
          <Input
            label="Öne Çıkan Etiketler (Virgülle ayırarak yazın)"
            value={Array.isArray(h.eventsTags) ? h.eventsTags.join(", ") : (h.eventsTags || "")}
            onChange={(e) =>
              setContent({
                ...content,
                hakkimizda: {
                  ...h,
                  eventsTags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                },
              })
            }
            placeholder="Doğum Günü Kutlamaları, Evlilik Teklifi & Yıldönümü, Kurumsal Şirket Yemekleri"
          />
        </section>

        {/* 10. TESİS İMKANLARI */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <span>🏊</span> Tesis Olanakları & İmkânlar (Rozetler)
          </h3>
          <Input
            label="İmkân Maddeleri (Virgülle ayırarak yazın)"
            value={Array.isArray(h.amenities) ? h.amenities.join(", ") : (h.amenities || "")}
            onChange={(e) =>
              setContent({
                ...content,
                hakkimizda: {
                  ...h,
                  amenities: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                },
              })
            }
            placeholder="Açık Yüzme & Çocuk Havuzu, Açık Teras & Klimalı Salonlar, Geniş Otopark İmkânı, Ücretsiz Wi-Fi"
          />
        </section>

        {/* 11. SIKÇA SORULAN SORULAR */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <span>❓</span> Sıkça Sorulan Sorular (Hakkımızda S.S.S.)
            </h3>
          </div>

          <div className="space-y-3">
            {(h.faqs || []).map((faq: any, i: number) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0D1117] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D9A441]">Soru #{i + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => {
                      const faqs = (h.faqs || []).filter((_: any, j: number) => j !== i);
                      setContent({
                        ...content,
                        hakkimizda: { ...h, faqs },
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Sil
                  </Button>
                </div>
                <Input
                  label="Soru"
                  value={faq.q || ""}
                  onChange={(e) => {
                    const faqs = [...(h.faqs || [])];
                    faqs[i] = { ...faqs[i], q: e.target.value };
                    setContent({
                      ...content,
                      hakkimizda: { ...h, faqs },
                    });
                  }}
                  placeholder="Serpme kahvaltı için rezervasyon gerekli mi?"
                />
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#8A9BB0]">Cevap</label>
                  <textarea
                    value={faq.a || ""}
                    onChange={(e) => {
                      const faqs = [...(h.faqs || [])];
                      faqs[i] = { ...faqs[i], a: e.target.value };
                      setContent({
                        ...content,
                        hakkimizda: { ...h, faqs },
                      });
                    }}
                    rows={2}
                    className={fieldClass}
                    placeholder="Cevap metni..."
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const faqs = [
                  ...(h.faqs || []),
                  { q: "", a: "" },
                ];
                setContent({
                  ...content,
                  hakkimizda: { ...h, faqs },
                });
              }}
              className="border-dashed border-white/20 text-[#D9A441]"
            >
              <Plus className="h-4 w-4 mr-1" /> Soru Ekle
            </Button>
          </div>
        </section>

        {/* 12. GÖRSEL VE ROZET */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <span>🖼️</span> Fotoğraf ve Rozet Ayarları
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Rozet Başlık"
              value={h.badgeBaslik || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, badgeBaslik: e.target.value },
                })
              }
              placeholder="Petra Yaşam Merkezi"
            />
            <Input
              label="Rozet Alt Metin"
              value={h.badgeAlt || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  hakkimizda: { ...h, badgeAlt: e.target.value },
                })
              }
              placeholder="Cafe · Restaurant · Pool & Beach"
            />
          </div>
          <div>
            <h4 className="mb-2 font-medium text-[#EEE9E0]">Hakkımızda Görseli</h4>
            {content.images?.aboutInterior ? (
              <div className="mb-3 flex items-center gap-3">
                <div className="h-28 w-40 overflow-hidden rounded-lg border border-white/10">
                  <AdminImage src={content.images.aboutInterior} alt="Hakkımızda" />
                </div>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    try {
                      const images = {
                        ...content.images,
                        aboutInterior: "",
                      };
                      const res = await api.updateContent({ images });
                      setContent(res.data);
                      setMessage("Görsel kaldırıldı.");
                    } catch (err) {
                      setMessage(
                        err instanceof Error ? err.message : "Kaldırılamadı"
                      );
                    }
                  }}
                >
                  Kaldır
                </Button>
              </div>
            ) : (
              <p className="mb-2 text-sm text-[#8A9BB0]">
                Henüz özel görsel yok — sitedeki varsayılan fotoğraf kullanılmaktadır.
              </p>
            )}
            <Upload
              uploadKey="aboutInterior"
              accept="image/*"
              onComplete={async () => {
                try {
                  const res = await api.getAdminContent();
                  setContent(res.data);
                  setMessage("Görsel başarıyla yüklendi.");
                } catch (err) {
                  setMessage(
                    err instanceof Error
                      ? err.message
                      : "Yükleme sonrası güncelleme başarısız"
                  );
                }
              }}
              onError={(err) => setMessage(err.message)}
            />
          </div>
        </section>

      </div>
    </>
  );
}

export function HeroPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (loading || !content) return <AdminLoading />;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        hero: content.hero,
        marquee: content.marquee,
      });
      setContent(res.data);
      setMessage("Hero ve şerit kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Kapı / Hero"
        description="Ana sayfa giriş sahnesi, karşılama yazısı ve kayan şerit kelimeleri."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Hero Kaydet"}</span>
          </Button>
        }
      />
      <AdminAlert message={message} />
      <div className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Hero (Giriş)</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Marka"
              value={content.hero.fallbackMark}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, fallbackMark: e.target.value },
                })
              }
            />
            <Input
              label="Slogan"
              value={content.hero.fallbackTagline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, fallbackTagline: e.target.value },
                })
              }
            />
            <Input
              label="Kaydır ipucu"
              value={content.hero.scrollHint}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, scrollHint: e.target.value },
                })
              }
            />
            <p className="-mt-2 text-xs text-[#6B7A94]">
              Metin Admin’den gelir. Konum sabit: hero sahnesinin alt ortası. Karşılama yazısıyla birlikte kaymaz.
            </p>
            <Input
              label="Yüklenirken metin"
              value={content.hero.bootText || "Kapı açılıyor"}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, bootText: e.target.value },
                })
              }
            />
          </div>
          <div className="space-y-4 rounded-xl border border-white/[0.06] bg-[#0D1117]/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0]">
                  Kapı açılınca görünen yazı
                </p>
                <p className="mt-1 text-xs text-[#6B7A94]">
                  Telefon ve bilgisayarda aynı: kapı açılıp içeri girince belirir, sonra kaybolur. “Aşağı kaydırın” ayrı, altta sabit.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={content.hero.welcomeAktif === true}
                onClick={() =>
                  setContent({
                    ...content,
                    hero: {
                      ...content.hero,
                      welcomeAktif: !(content.hero.welcomeAktif === true),
                    },
                  })
                }
                className={
                  content.hero.welcomeAktif === true
                    ? "inline-flex items-center gap-2 rounded-full border border-[#C8703A]/40 bg-[#C8703A]/15 px-4 py-2 text-sm font-semibold text-[#E8B84B]"
                    : "inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#8A9BB0]"
                }
              >
                <span
                  className={
                    content.hero.welcomeAktif === true
                      ? "h-2.5 w-2.5 rounded-full bg-[#E8B84B]"
                      : "h-2.5 w-2.5 rounded-full bg-[#4A5568]"
                  }
                />
                {content.hero.welcomeAktif === true ? "Gözüksün" : "Gözükmesin"}
              </button>
            </div>
            {content.hero.welcomeAktif === true && (
              <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0D1117]/80 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#EEE9E0]">Koyu kutu</p>
                  <p className="text-xs text-[#6B7A94]">Yazının arkasındaki cam / renk. Kapalıysa yazı fotoğrafın üstünde durur.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={content.hero.welcomeKutu === true}
                  onClick={() =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeKutu: !(content.hero.welcomeKutu === true),
                      },
                    })
                  }
                  className={
                    content.hero.welcomeKutu === true
                      ? "inline-flex items-center gap-2 rounded-full border border-[#C8703A]/40 bg-[#C8703A]/15 px-4 py-2 text-sm font-semibold text-[#E8B84B]"
                      : "inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#8A9BB0]"
                  }
                >
                  {content.hero.welcomeKutu === true ? "Açık" : "Kapalı"}
                </button>
              </div>
              {content.hero.welcomeKutu === true ? (
                <div className="grid gap-3 md:grid-cols-3">
                  <ColorField
                    label="Kutu rengi"
                    value={content.hero.welcomeKutuRenk || "#0A0C09"}
                    onChange={(next) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, welcomeKutuRenk: next },
                      })
                    }
                    hint="Yazının arkasındaki dolgu"
                  />
                  <ColorField
                    label="Çerçeve rengi"
                    value={content.hero.welcomeKutuKenar || "#E8B84B"}
                    onChange={(next) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, welcomeKutuKenar: next },
                      })
                    }
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[#8A9BB0]">
                      Yoğunluk ({content.hero.welcomeKutuOpaklik ?? 58}%)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={content.hero.welcomeKutuOpaklik ?? 58}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: {
                            ...content.hero,
                            welcomeKutuOpaklik: Number(e.target.value),
                          },
                        })
                      }
                      className="mt-3 w-full accent-[#C8703A]"
                    />
                    <p className="text-[11px] text-[#6B7A94]">0 şeffaf, 90 koyu.</p>
                  </div>
                </div>
              ) : null}
              <div className="grid gap-3 md:grid-cols-3">
                <Input
                  label="Üst etiket"
                  value={content.hero.welcomeEyebrow || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeEyebrow: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label="Başlık"
                  value={content.hero.welcomeTitle || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeTitle: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  label="Alt metin"
                  value={content.hero.welcomeLead || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        welcomeLead: e.target.value,
                      },
                    })
                  }
                />
              </div>
              </>
            )}

            {/* Hero Loadingi (Kapı Açılıyor) */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-3">
              <h4 className="text-sm font-semibold text-[#E8B84B]">Hero Loadingi (Kapı Açılıyor)</h4>
              <p className="text-xs text-[#8A9BB0]">
                3D kapı ve hero sahneleri yüklenirken ekranda dönen çemberin ve yükleme yazısının içeriği ve rengi.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Hero Loading Metni"
                  value={content.hero.bootText || ""}
                  placeholder="Kapı açılıyor"
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        bootText: e.target.value,
                      },
                    })
                  }
                />
                <ColorField
                  label="Hero Loading Rengi (Metin & Dönen İkon)"
                  value={content.hero.textStyles?.boot?.color || "#D9A441"}
                  onChange={(val) =>
                    setContent({
                      ...content,
                      hero: {
                        ...content.hero,
                        textStyles: {
                          ...(content.hero.textStyles || {}),
                          boot: {
                            ...(content.hero.textStyles?.boot || {}),
                            color: val,
                          },
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <HeroTextEditor
            imageUrl={
              liveMedia(content.images?.heroPoster || content.images?.heroCephe, SITE_PHOTOS.facade) ||
              SITE_PHOTOS.facade
            }
            phoneImageUrl={
              liveMedia(
                content.images?.heroMobile ||
                  content.images?.heroPoster ||
                  content.images?.heroCephe,
                SITE_PHOTOS.facade
              ) || SITE_PHOTOS.facade
            }
            welcomeAktif={content.hero.welcomeAktif === true}
            welcomeKutu={content.hero.welcomeKutu === true}
            welcomeKutuRenk={content.hero.welcomeKutuRenk}
            welcomeKutuKenar={content.hero.welcomeKutuKenar}
            welcomeKutuOpaklik={content.hero.welcomeKutuOpaklik}
            desktop={content.hero.textStyles}
            phone={content.hero.textStylesMobile}
            preview={{
              mark: content.hero.fallbackMark || "PETRA",
              slogan: content.hero.fallbackTagline || "Slogan",
              scroll: content.hero.scrollHint || "Aşağı kaydırın",
              boot: content.hero.bootText || "Kapı açılıyor",
              welcomeEyebrow: content.hero.welcomeEyebrow || "Üst etiket",
              welcomeTitle: content.hero.welcomeTitle || "Başlık",
              welcomeLead: content.hero.welcomeLead || "Alt metin",
            }}
            onChange={(device, next) =>
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  ...(device === "phone"
                    ? { textStylesMobile: next }
                    : { textStyles: next }),
                },
              })
            }
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="font-semibold text-[#F8F8F8]">Kayan şerit kelimeleri</h3>
          {content.marquee.map((word, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={word}
                onChange={(e) => {
                  const marquee = [...content.marquee];
                  marquee[i] = e.target.value;
                  setContent({ ...content, marquee });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setContent({
                    ...content,
                    marquee: content.marquee.filter((_, j) => j !== i),
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
                marquee: [...content.marquee, "YENİ"],
              })
            }
          >
            <Plus className="h-4 w-4" /> Kelime ekle
          </Button>
        </section>
      </div>
    </>
  );
}

export function PastaPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;
  const p = content.pasta;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({ pasta: content.pasta });
      setContent(res.data);
      setMessage("Havuz & Plaj kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Havuz, Plaj ve Organizasyon"
        description="Saatler, tarife, yüzme dersi, kurallar ve Instagram — afiş bilgileri burada. Görsel zorunlu değil."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md">
            <span>{saving ? "Kaydediliyor…" : "💾 Havuz & Plaj Kaydet"}</span>
          </Button>
        }
      />
      <SectionHint anchor="pasta" label="Havuz & Plaj" />
      <AdminAlert message={message} />
      <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Üst etiket"
            value={p.eyebrow}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, eyebrow: e.target.value },
              })
            }
          />
          <Input
            label="Başlık"
            value={p.baslik}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, baslik: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
            Açıklama
          </label>
          <textarea
            value={p.lead}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, lead: e.target.value },
              })
            }
            rows={3}
            className={fieldClass}
          />
        </div>
        <Input
          label="Slogan"
          value={p.slogan || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, slogan: e.target.value } })
          }
          placeholder="Lezzet, keyif ve serinliğin buluştuğu yer"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Cafe saatleri"
            value={p.cafeSaat || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, cafeSaat: e.target.value } })
            }
            placeholder="08:00 – 24:00"
          />
          <Input
            label="Havuz saatleri"
            value={p.havuzSaat || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, havuzSaat: e.target.value } })
            }
            placeholder="09:00 – 18:00"
          />
          <Input
            label="Havuz derinliği"
            value={p.derinlik || ""}
            onChange={(e) =>
              setContent({ ...content, pasta: { ...p, derinlik: e.target.value } })
            }
            placeholder="1.45 m – 1.95 m"
          />
        </div>
        <Input
          label="Instagram"
          value={p.instagramHref || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, instagramHref: e.target.value } })
          }
          placeholder="https://www.instagram.com/petracaferestaurant/"
        />
        <Input
          label="Instagram etiketi"
          value={p.instagramEtiket || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, instagramEtiket: e.target.value } })
          }
          placeholder="@petracaferestaurant"
        />

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Petra House fiyatları</h4>
        <Input
          label="Tablo başlığı"
          value={p.fiyatBaslik || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, fiyatBaslik: e.target.value } })
          }
        />
        {(p.fiyatlar || []).map((row, i) => (
          <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
            <Input
              label={i === 0 ? "Kategori" : undefined}
              value={row.kategori}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], kategori: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Input
              label={i === 0 ? "Hafta içi" : undefined}
              value={row.haftaIci}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], haftaIci: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Input
              label={i === 0 ? "Hafta sonu" : undefined}
              value={row.haftaSonu}
              onChange={(e) => {
                const fiyatlar = [...(p.fiyatlar || [])];
                fiyatlar[i] = { ...fiyatlar[i], haftaSonu: e.target.value };
                setContent({ ...content, pasta: { ...p, fiyatlar } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, fiyatlar: (p.fiyatlar || []).filter((_, j) => j !== i) },
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
              pasta: {
                ...p,
                fiyatlar: [...(p.fiyatlar || []), { kategori: "", haftaIci: "", haftaSonu: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Fiyat satırı
        </Button>
        <textarea
          value={p.fiyatNot || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, fiyatNot: e.target.value } })
          }
          rows={2}
          placeholder="0–2 yaş ücretsiz · mayo ve bone zorunlu…"
          className={fieldClass}
        />

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Yüzme dersleri</h4>
        <Input
          label="Ders başlığı"
          value={p.dersBaslik || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, dersBaslik: e.target.value } })
          }
        />
        <Input
          label="Ders özeti"
          value={p.dersLead || ""}
          onChange={(e) =>
            setContent({ ...content, pasta: { ...p, dersLead: e.target.value } })
          }
        />
        {(p.dersler || []).map((d, i) => (
          <div key={i} className="grid gap-2 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[1fr_1fr_auto]">
            <Input
              label="Tür"
              value={d.baslik}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], baslik: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
            />
            <Input
              label="Kısa vurgu"
              value={d.kicker || ""}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], kicker: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, dersler: (p.dersler || []).filter((_, j) => j !== i) },
                })
              }
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
            <textarea
              value={d.metin}
              onChange={(e) => {
                const dersler = [...(p.dersler || [])];
                dersler[i] = { ...dersler[i], metin: e.target.value };
                setContent({ ...content, pasta: { ...p, dersler } });
              }}
              rows={2}
              className={`${fieldClass} md:col-span-3`}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setContent({
              ...content,
              pasta: {
                ...p,
                dersler: [...(p.dersler || []), { baslik: "", kicker: "", metin: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Ders türü
        </Button>

        <h4 className="pt-2 font-medium text-[#EEE9E0]">Kurallar (küçük yazı)</h4>
        {(p.kurallar || []).map((k, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={k}
              onChange={(e) => {
                const kurallar = [...(p.kurallar || [])];
                kurallar[i] = e.target.value;
                setContent({ ...content, pasta: { ...p, kurallar } });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: { ...p, kurallar: (p.kurallar || []).filter((_, j) => j !== i) },
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
              pasta: { ...p, kurallar: [...(p.kurallar || []), ""] },
            })
          }
        >
          <Plus className="h-4 w-4" /> Kural
        </Button>

        <div className="grid gap-3">
          <label className="block text-sm text-[#EEE9E0]">
            Madde listesi (tikli satırlar)
          </label>
          {(p.maddeler || []).map((m, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={m}
                onChange={(e) => {
                  const maddeler = [...p.maddeler];
                  maddeler[i] = e.target.value;
                  setContent({
                    ...content,
                    pasta: { ...p, maddeler },
                  });
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const maddeler = p.maddeler.filter((_, j) => j !== i);
                  setContent({
                    ...content,
                    pasta: { ...p, maddeler },
                  });
                }}
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
                pasta: { ...p, maddeler: [...p.maddeler, ""] },
              })
            }
          >
            <Plus className="h-4 w-4" /> Madde ekle
          </Button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#8A9BB0]">
            Alt metin (CTA üstü)
          </label>
          <textarea
            value={p.body}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, body: e.target.value },
              })
            }
            rows={2}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Buton yazısı"
            value={p.ctaLabel}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, ctaLabel: e.target.value },
              })
            }
          />
          <Input
            label="Buton linki"
            value={p.ctaHref}
            onChange={(e) =>
              setContent({
                ...content,
                pasta: { ...p, ctaHref: e.target.value },
              })
            }
          />
        </div>
        <h4 className="pt-2 font-medium text-[#EEE9E0]">Bölüm görselleri</h4>
        {(p.gorseller || []).map((g, i) => (
          <div
            key={i}
            className="grid gap-3 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[100px_1fr_1fr_auto]"
          >
            {g.src ? (
              <div className="h-20 overflow-hidden rounded-lg">
                <AdminImage src={g.src} alt={g.alt || ""} />
              </div>
            ) : (
              <div className="h-20 rounded-lg bg-[#0D1117]" />
            )}
            <div>
              <label className="mb-1 block text-sm text-[#EEE9E0]">
                Görsel yükle
              </label>
              <Upload
                accept="image/*"
                onComplete={async (results) => {
                  const first = results?.[0];
                  if (first?.url) {
                    const gorseller = [...p.gorseller];
                    gorseller[i] = { ...gorseller[i], src: first.url };
                    setContent({
                      ...content,
                      pasta: { ...p, gorseller },
                    });
                    setMessage("Görsel yüklendi.");
                  }
                }}
                onError={(err) => setMessage(err.message)}
                uploadKey="pasta"
              />
            </div>
            <Input
              label="Alt metin"
              value={g.alt}
              onChange={(e) => {
                const gorseller = [...p.gorseller];
                gorseller[i] = { ...gorseller[i], alt: e.target.value };
                setContent({
                  ...content,
                  pasta: { ...p, gorseller },
                });
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() =>
                setContent({
                  ...content,
                  pasta: {
                    ...p,
                    gorseller: (p.gorseller || []).filter((_, j) => j !== i),
                  },
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
              pasta: {
                ...p,
                gorseller: [...(p.gorseller || []), { src: "", alt: "" }],
              },
            })
          }
        >
          <Plus className="h-4 w-4" /> Görsel ekle
        </Button>
      </section>
    </>
  );
}

export function BolumlarPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  if (loading || !content) return <AdminLoading />;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api.updateContent({
        bolumlar: content.bolumlar,
        ziyaret: content.ziyaret,
        hizmetler: content.hizmetler,
        rezervasyon: content.rezervasyon,
      });
      setContent(res.data);
      setMessage("Bölüm metinleri kaydedildi.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const keys = ["hizmetler", "menu", "galeri", "yorumlar", "sss", "rezervasyon"] as const;
  const labels: Record<(typeof keys)[number], string> = {
    hizmetler: "Hizmetler (Instagram)",
    menu: "Menü",
    galeri: "Galeri",
    yorumlar: "Yorumlar",
    sss: "S.S.S.",
    rezervasyon: "Rezervasyon",
  };
  const emptyBolum: BolumBaslik = { eyebrow: "", baslik: "", lead: "" };
  const ziyaret = content.ziyaret || [
    { k: "Saatler", v: "", n: "" },
    { k: "Rezervasyon", v: "", n: "" },
    { k: "Havuz & Plaj", v: "", n: "" },
    { k: "Konum", v: "", n: "" },
  ];
  const hizmetler = content.hizmetler?.length
    ? content.hizmetler
    : [
        { label: "Restoran", icon: "utensils", href: "/menu", aciklama: "Salon ve teras servisi" },
        { label: "Serpme Kahvaltı", icon: "sunrise", href: "/menu/kahvalti", aciklama: "Tabak ve 2 kişilik serpme" },
        { label: "Pizzalar", icon: "chef", href: "/menu/pizzalar", aciklama: "Fırın pizza" },
        { label: "POOL & BEACH", icon: "waves", href: "#pasta", aciklama: "Havuz 09:00–18:00" },
        { label: "Yüzme dersleri", icon: "calendar", href: "#yuzme", aciklama: "Birebir ve grup" },
        { label: "Kahve", icon: "coffee", href: "/menu/kahve", aciklama: "Sıcak ve soğuk kahve" },
        { label: "Kokteyller", icon: "wine", href: "/menu/kokteyller", aciklama: "Mocktail ve frozen" },
        { label: "Tatlılar", icon: "cake", href: "/menu/tatlilar", aciklama: "Tatlı menüsü" },
        { label: "Nargile", icon: "flame", href: "/menu/nargile", aciklama: "Nakhla, El Fakher, Adalya" },
      ];
  const rsv = content.rezervasyon || {
    maddeler: [],
    ctaLabel: "",
    successMetin: "",
  };

  return (
    <>
      <AdminPageHeader
        title="Bölüm Başlıkları"
        description="Ana sayfa bölüm başlıkları, Instagram hizmet kartları ve ziyaret şeridi. Hepsi sitede görünür."
      />
      <AdminAlert message={message} />
      <div className="space-y-4">
        {keys.map((key) => {
          const b = content.bolumlar[key] || emptyBolum;
          return (
            <section
              key={key}
              className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4"
            >
              <h3 className="mb-3 font-medium text-[#C8703A]">{labels[key]}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <Input
                  label="Üst etiket"
                  value={b.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, eyebrow: e.target.value },
                      },
                    })
                  }
                />
                <Input
                  label="Başlık"
                  value={b.baslik}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, baslik: e.target.value },
                      },
                    })
                  }
                />
                <Input
                  label="Kısa açıklama"
                  value={b.lead || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      bolumlar: {
                        ...content.bolumlar,
                        [key]: { ...b, lead: e.target.value },
                      },
                    })
                  }
                />
              </div>
              {key === "menu" ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <Input
                    label="Birincil buton"
                    value={b.ctaLabel || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, ctaLabel: e.target.value },
                        },
                      })
                    }
                    placeholder="Masa ayırtın"
                  />
                  <Input
                    label="Birincil link"
                    value={b.ctaHref || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, ctaHref: e.target.value },
                        },
                      })
                    }
                    placeholder="#rezervasyon"
                  />
                  <Input
                    label="İkinci buton"
                    value={b.cta2Label || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, cta2Label: e.target.value },
                        },
                      })
                    }
                    placeholder="Tüm menü"
                  />
                  <Input
                    label="İkinci link"
                    value={b.cta2Href || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        bolumlar: {
                          ...content.bolumlar,
                          menu: { ...b, cta2Href: e.target.value },
                        },
                      })
                    }
                    placeholder="/menu"
                  />
                </div>
              ) : null}
            </section>
          );
        })}

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <h3 className="mb-1 font-semibold text-[#D9A441] flex items-center gap-2">
            <span>✦</span> Ziyaret & Hızlı Bilgi Şeridi
          </h3>
          <p className="mb-3 text-xs text-[#6B7A94]">
            Ana sayfadaki 4'lü vitrin kartları (Saatler, Rezervasyon, Havuz ve Konum).
          </p>
          <div className="space-y-3">
            {ziyaret.map((item, i) => (
              <div key={i} className="grid gap-2 rounded-xl border border-white/[0.06] bg-[#0E1522] p-3 md:grid-cols-[1fr_1.2fr_1.5fr_1fr_auto]">
                <Input
                  label="Etiket (Ör: Saatler)"
                  value={item.k}
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, k: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Input
                  label="Vurgu / Değer"
                  value={item.v}
                  placeholder="08:00 – 02:00"
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, v: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Input
                  label="Alt Açıklama"
                  value={item.n}
                  placeholder="Cafe açık · Havuz 09:00–18:00"
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, n: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Input
                  label="Link (Opsiyonel)"
                  value={item.href || ""}
                  placeholder="#rezervasyon vb."
                  onChange={(e) => {
                    const next = [...ziyaret];
                    next[i] = { ...item, href: e.target.value };
                    setContent({ ...content, ziyaret: next });
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
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
              <Plus className="h-4 w-4 mr-1" /> Kart Ekle
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-medium text-[#C8703A]">Hizmet kartları</h3>
              <p className="mt-1 text-xs text-[#6B7A94]">
                Instagram bio satırları. Link boşsa kart tıklanmaz. Menü / havuz sayfalarına bağlayın.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setContent({
                  ...content,
                  hizmetler: [
                    ...hizmetler,
                    { label: "", icon: "utensils", href: "", aciklama: "" },
                  ],
                })
              }
            >
              <Plus className="h-4 w-4" />
              Ekle
            </Button>
          </div>
          <div className="space-y-3">
            {hizmetler.map((item, i) => (
              <div
                key={i}
                className="grid gap-2 rounded-xl border border-white/[0.06] p-3 md:grid-cols-[160px_1fr_1fr_auto]"
              >
                <label className="block text-sm font-medium text-[#8A9BB0]">
                  İkon
                  <select
                    className="mt-2 h-11 w-full rounded-xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]"
                    value={item.icon || ""}
                    onChange={(e) => {
                      const next = [...hizmetler];
                      next[i] = { ...item, icon: e.target.value };
                      setContent({ ...content, hizmetler: next });
                    }}
                  >
                    <option value="">Otomatik</option>
                    {SITE_ICON_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <Input
                  label="Başlık"
                  value={item.label}
                  onChange={(e) => {
                    const next = [...hizmetler];
                    next[i] = { ...item, label: e.target.value };
                    setContent({ ...content, hizmetler: next });
                  }}
                />
                <Input
                  label="Link"
                  value={item.href || ""}
                  onChange={(e) => {
                    const next = [...hizmetler];
                    next[i] = { ...item, href: e.target.value };
                    setContent({ ...content, hizmetler: next });
                  }}
                  placeholder="/menu/kahve veya #pasta"
                />
                <button
                  type="button"
                  className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-[#8A9BB0] hover:text-red-400"
                  aria-label="Kartı sil"
                  onClick={() => {
                    const next = hizmetler.filter((_, idx) => idx !== i);
                    setContent({ ...content, hizmetler: next });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="md:col-span-4">
                  <Input
                    label="Kısa açıklama"
                    value={item.aciklama || ""}
                    onChange={(e) => {
                      const next = [...hizmetler];
                      next[i] = { ...item, aciklama: e.target.value };
                      setContent({ ...content, hizmetler: next });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
          <h3 className="mb-3 font-medium text-[#C8703A]">Rezervasyon formu</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Gönder butonu"
              value={rsv.ctaLabel || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  rezervasyon: { ...rsv, ctaLabel: e.target.value },
                })
              }
            />
            <Input
              label="Başarı mesajı"
              value={rsv.successMetin || ""}
              onChange={(e) =>
                setContent({
                  ...content,
                  rezervasyon: { ...rsv, successMetin: e.target.value },
                })
              }
            />
          </div>
          <label className="mb-2 mt-3 block text-sm font-medium text-[#8A9BB0]">
            Maddeler (her satır bir madde)
          </label>
          <textarea
            className="w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0]"
            rows={4}
            value={(rsv.maddeler || []).join("\n")}
            onChange={(e) =>
              setContent({
                ...content,
                rezervasyon: {
                  ...rsv,
                  maddeler: e.target.value.split("\n"),
                },
              })
            }
          />
        </section>

      </div>
    </>
  );
}
