"use client";

import { useState } from "react";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import { api } from "@/lib/api/client";
import { Dumbbell, Plus, Trash2, Sparkles, Clock, Phone, CheckCircle2 } from "lucide-react";
import SiteIcon from "@/components/site/SiteIcon";

export default function SporSalonuPanel() {
  const { content, setContent, loading } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const s = content.sporSalonu || {
    eyebrow: "PETRA YAŞAM MERKEZİ",
    baslik: "Petra Spor Salonu",
    lead: "Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları, ferah antrenman alanları ve sağlıklı yaşam kültürüyle formunuzu zirveye taşıyın.",
    saatler: "Haftanın 7 Günü: 07:00 – 23:00",
    telefon: "0530 608 90 51",
    telefon2: "+90 216 706 80 51",
    instagram: "@petrasporsalonu",
    instagramUrl: "https://www.instagram.com/petrasporsalonu",
    body: [],
    alanlar: [],
    imkanlar: [],
    ctaTitle: "Hedeflerinize Petra ile Ulaşın",
    ctaLead: "Petra Spor Salonu üyelik paketleri, kullanım saatleri ve detaylı bilgi için bize hemen ulaşın veya Instagram'dan takip edin.",
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await api.updateContent({ sporSalonu: s });
      setContent(res.data);
      setMessage("Spor salonu bilgileri başarıyla kaydedildi. Canlı site güncellendi.");
      setMessageType("success");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kayıt başarısız");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Spor Salonu CMS & Ayarları"
        description="Petra Spor Salonu sayfası (/spor-salonu), antrenman alanları, çalışma saatleri ve iletişim bilgilerini yönetin."
      />

      {message && (
        <div className={`mb-6 p-4 rounded-xl border ${messageType === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'}`}>
          {message}
        </div>
      )}

      <SaveBar
        saving={saving}
        onSave={handleSave}
        label="Spor Salonunu Kaydet"
      />

      <div className="space-y-6 pb-28">
        {/* 1. BAŞLIK VE SPOT */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-[#E8B84B]" /> Genel Bilgiler & Başlık
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Üst Rozet (Eyebrow)"
              value={s.eyebrow || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, eyebrow: e.target.value },
                })
              }
              placeholder="PETRA YAŞAM MERKEZİ"
            />
            <Input
              label="Ana Başlık (H1)"
              value={s.baslik || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, baslik: e.target.value },
                })
              }
              placeholder="Petra Spor Salonu"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#8A9BB0]">
              Spot / Tanıtım Metni (Lead)
            </label>
            <textarea
              value={s.lead || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, lead: e.target.value },
                })
              }
              rows={3}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-3 text-sm text-[#EEE9E0] placeholder:text-[#6B7A94] focus:border-[#E8B84B] focus:outline-none"
              placeholder="Spor salonu tanıtım spotu..."
            />
          </div>
        </section>

        {/* 2. İLETİŞİM & SAATLER */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#E8B84B]" /> Çalışma Saatleri & İletişim
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Çalışma Saatleri"
              value={s.saatler || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, saatler: e.target.value },
                })
              }
              placeholder="Haftanın 7 Günü: 07:00 – 23:00"
            />
            <Input
              label="Danışma & WhatsApp Telefonu"
              value={s.telefon || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, telefon: e.target.value },
                })
              }
              placeholder="0530 608 90 51"
            />
            <Input
              label="İkinci Telefon (Sabit Hat)"
              value={s.telefon2 || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, telefon2: e.target.value },
                })
              }
              placeholder="+90 216 706 80 51"
            />
            <Input
              label="Instagram Kullanıcı Adı"
              value={s.instagram || ""}
              onChange={(e: any) =>
                setContent({
                  ...content,
                  sporSalonu: { ...s, instagram: e.target.value },
                })
              }
              placeholder="@petrasporsalonu"
            />
          </div>
          <Input
            label="Instagram Profil Linki"
            value={s.instagramUrl || ""}
            onChange={(e: any) =>
              setContent({
                ...content,
                sporSalonu: { ...s, instagramUrl: e.target.value },
              })
            }
            placeholder="https://www.instagram.com/petrasporsalonu"
          />
        </section>

        {/* 3. ANTRENMAN ALANLARI */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#E8B84B]" /> Antrenman Alanları
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Kardiyo, serbest ağırlık, fonksiyonel ve esneme istasyonları.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [...(s.alanlar || []), { baslik: "", kicker: "", metin: "", ikon: "dumbbell" }];
                setContent({ ...content, sporSalonu: { ...s, alanlar: next } });
              }}
              className="border-dashed border-white/20 text-[#D9A441] hover:bg-white/5"
            >
              <Plus className="h-4 w-4 mr-1" /> Alan Ekle
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(s.alanlar || []).map((alan: any, i: number) => (
              <div key={i} className="space-y-3 rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E8B84B]">Alan #{i + 1}</span>
                  <button
                    type="button"
                    className="text-[#8A9BB0] hover:text-red-400 p-1"
                    onClick={() => {
                      const next = (s.alanlar || []).filter((_: any, idx: number) => idx !== i);
                      setContent({ ...content, sporSalonu: { ...s, alanlar: next } });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <Input
                  label="Alan Başlığı"
                  value={alan.baslik || ""}
                  onChange={(e: any) => {
                    const next = [...(s.alanlar || [])];
                    next[i] = { ...alan, baslik: e.target.value };
                    setContent({ ...content, sporSalonu: { ...s, alanlar: next } });
                  }}
                  placeholder="Kardiyo İstasyonları"
                />
                <Input
                  label="Alt Başlık / Kicker"
                  value={alan.kicker || ""}
                  onChange={(e: any) => {
                    const next = [...(s.alanlar || [])];
                    next[i] = { ...alan, kicker: e.target.value };
                    setContent({ ...content, sporSalonu: { ...s, alanlar: next } });
                  }}
                  placeholder="Kondisyon & Yağ Yakımı"
                />
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#8A9BB0]">Açıklama</label>
                  <textarea
                    value={alan.metin || ""}
                    onChange={(e: any) => {
                      const next = [...(s.alanlar || [])];
                      next[i] = { ...alan, metin: e.target.value };
                      setContent({ ...content, sporSalonu: { ...s, alanlar: next } });
                    }}
                    rows={2}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#141E2E] px-3 py-2 text-xs text-[#EEE9E0] focus:border-[#E8B84B] focus:outline-none"
                    placeholder="Alan açıklaması..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. TESİS İMKANLARI (CHECKLIST) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#7C8B4F]" /> Ekipman ve Tesis İmkanları
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [...(s.imkanlar || []), ""];
                setContent({ ...content, sporSalonu: { ...s, imkanlar: next } });
              }}
              className="border-dashed border-white/20 text-[#D9A441] hover:bg-white/5"
            >
              <Plus className="h-4 w-4 mr-1" /> İmkan Ekle
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {(s.imkanlar || []).map((imkan: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0D1117] p-2.5">
                <input
                  type="text"
                  value={imkan}
                  onChange={(e: any) => {
                    const next = [...(s.imkanlar || [])];
                    next[idx] = e.target.value;
                    setContent({ ...content, sporSalonu: { ...s, imkanlar: next } });
                  }}
                  className="w-full bg-transparent text-sm text-[#EEE9E0] focus:outline-none"
                  placeholder="Örn: Hijyenik Soyunma Odaları"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = (s.imkanlar || []).filter((_: any, i: number) => i !== idx);
                    setContent({ ...content, sporSalonu: { ...s, imkanlar: next } });
                  }}
                  className="text-[#8A9BB0] hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
