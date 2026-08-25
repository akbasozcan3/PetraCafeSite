"use client";

import { useState } from "react";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";
import { api } from "@/lib/api/client";
import {
  Dumbbell,
  Plus,
  Trash2,
  Sparkles,
  Clock,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
} from "lucide-react";

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
    ozellikler: [
      { baslik: "%35 Ön Kayıt Avantajı", alt: "Erken dönem üyelik indirimi", ikon: "sparkles" },
      { baslik: "Kardiyo & Serbest Ağırlık", alt: "Modern istasyonlar & dambıllar", ikon: "dumbbell" },
      { baslik: "Havuz & Teras Entegrasyonu", alt: "Antrenman sonrası serinleme", ikon: "waves" },
      { baslik: "07:00 – 23:00 Kesintisiz", alt: "Haftanın 7 günü açık salon", ikon: "clock" },
    ],
    bentoGorseller: [
      { src: "/assets/cms/hero-ic.webp", alt: "Petra Fitness & Antrenman Alanı", rozet: "Kardiyo & Serbest Ağırlık" },
      { src: "/assets/cms/hero-cephe.webp", alt: "Petra Spor ve Yaşam Kompleksi", rozet: "Ferah & Hijyenik Salon" },
    ],
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

  const updateSpor = (patch: Partial<typeof s>) => {
    setContent({
      ...content,
      sporSalonu: { ...s, ...patch },
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Spor Salonu CMS & Yönetimi"
        description="Petra Spor Salonu sayfası (/spor-salonu), anasayfa spor kartı, 2'li bento vitrini ve iletişim bilgilerini yönetin."
        actions={
          <a
            href="/spor-salonu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-[#EEE9E0] border border-white/10 transition"
          >
            <span>Canlı Sayfayı Aç</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#D9A441]" />
          </a>
        }
      />

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl border ${
            messageType === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {message}
        </div>
      )}

      <SaveBar saving={saving} onSave={handleSave} label="Spor Salonunu Kaydet" />

      <div className="space-y-6 pb-28 max-w-6xl">
        {/* 1. BAŞLIK VE SPOT */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-[#E8B84B]" /> 1. Genel Bilgiler & Başlık
            </h3>
            <span className="text-xs text-[#8A9BB0]">Ana başlık ve tanıtım metni</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Ana Başlık (H1)"
              value={s.baslik || ""}
              onChange={(e: any) => updateSpor({ baslik: e.target.value })}
              placeholder="Petra Spor Salonu"
            />
            <Input
              label="Çalışma Saatleri"
              value={s.saatler || ""}
              onChange={(e: any) => updateSpor({ saatler: e.target.value })}
              placeholder="Haftanın 7 Günü: 07:00 – 23:00"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8A9BB0]">
              Spot / Tanıtım Metni (Lead)
            </label>
            <textarea
              value={s.lead || ""}
              onChange={(e: any) => updateSpor({ lead: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-2.5 text-sm text-[#EEE9E0] placeholder:text-[#6B7A94] focus:border-[#E8B84B] focus:outline-none"
              placeholder="Çekmeköy Taşdelen Megakent Sitesi içerisinde; modern kardiyo ve serbest ağırlık ekipmanları..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3 pt-2">
            <Input
              label="Danışma & WhatsApp Telefonu"
              value={s.telefon || ""}
              onChange={(e: any) => updateSpor({ telefon: e.target.value })}
              placeholder="0530 608 90 51"
            />
            <Input
              label="İkinci Telefon (Sabit Hat)"
              value={s.telefon2 || ""}
              onChange={(e: any) => updateSpor({ telefon2: e.target.value })}
              placeholder="+90 216 706 80 51"
            />
            <Input
              label="Instagram Kullanıcı Adı"
              value={s.instagram || ""}
              onChange={(e: any) => updateSpor({ instagram: e.target.value })}
              placeholder="@petrasporsalonu"
            />
          </div>
        </section>

        {/* 2. ANASAYFA 4 CAM EFEKTLİ ÖZELLİK KARTÇIĞI */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#E8B84B]" /> 2. Anasayfa 4 Cam Efektli Özellik Kartçığı
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Anasayfa Spor Salonu kartında 2x2 düzende sergilenen cam efektli özellikler.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [
                  ...(s.ozellikler || []),
                  { baslik: "Yeni Özellik", alt: "Özellik açıklaması", ikon: "sparkles" },
                ];
                updateSpor({ ozellikler: next });
              }}
              className="border-dashed border-white/20 text-[#D9A441] hover:bg-white/5"
            >
              <Plus className="h-4 w-4 mr-1" /> Kart Ekle
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(s.ozellikler || []).map((oz: any, i: number) => (
              <div
                key={i}
                className="space-y-2.5 rounded-xl border border-white/[0.08] bg-[#0D1117] p-3.5 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E8B84B]">Özellik #{i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = (s.ozellikler || []).filter((_: any, idx: number) => idx !== i);
                        updateSpor({ ozellikler: next });
                      }}
                      className="text-[#8A9BB0] hover:text-red-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <Input
                    label="Başlık"
                    value={oz.baslik || ""}
                    onChange={(e: any) => {
                      const next = [...(s.ozellikler || [])];
                      next[i] = { ...oz, baslik: e.target.value };
                      updateSpor({ ozellikler: next });
                    }}
                    placeholder="%35 Ön Kayıt Avantajı"
                  />
                  <Input
                    label="Alt Açıklama"
                    value={oz.alt || ""}
                    onChange={(e: any) => {
                      const next = [...(s.ozellikler || [])];
                      next[i] = { ...oz, alt: e.target.value };
                      updateSpor({ ozellikler: next });
                    }}
                    placeholder="Erken dönem üyelik indirimi"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SAĞDAKİ 2'Lİ BENTO FOTOĞRAF VİTRİNİ */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#E8B84B]" /> 3. Sağ Taraf 2'li Bento Fotoğraf Vitrini
              </h3>
              <p className="text-xs text-[#8A9BB0] mt-0.5">
                Anasayfa Spor Salonu kartının sağ tarafındaki lüks 2 fotoğraf ve altlarındaki yüzen rozetler.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(s.bentoGorseller || []).map((b: any, i: number) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-white/10 bg-[#0D1117] p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E8B84B]">Fotoğraf #{i + 1}</span>
                </div>
                <div className="relative h-36 w-full overflow-hidden rounded-lg bg-black border border-white/10">
                  <img
                    src={b.src || "/assets/cms/hero-ic.webp"}
                    alt={b.alt || "Önizleme"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <Input
                  label="Görsel Yolu (URL / CMS)"
                  value={b.src || ""}
                  onChange={(e: any) => {
                    const next = [...(s.bentoGorseller || [])];
                    next[i] = { ...b, src: e.target.value };
                    updateSpor({ bentoGorseller: next });
                  }}
                  placeholder="/assets/cms/hero-ic.webp"
                />
                <Input
                  label="Yüzen Rozet Metni (Badge)"
                  value={b.rozet || ""}
                  onChange={(e: any) => {
                    const next = [...(s.bentoGorseller || [])];
                    next[i] = { ...b, rozet: e.target.value };
                    updateSpor({ bentoGorseller: next });
                  }}
                  placeholder="Kardiyo & Serbest Ağırlık"
                />
                <Input
                  label="Görsel Alt Metni"
                  value={b.alt || ""}
                  onChange={(e: any) => {
                    const next = [...(s.bentoGorseller || [])];
                    next[i] = { ...b, alt: e.target.value };
                    updateSpor({ bentoGorseller: next });
                  }}
                  placeholder="Petra Fitness & Antrenman Alanı"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 4. ANTRENMAN ALANLARI */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#E8B84B]" /> 4. /spor-salonu Sayfası Antrenman Alanları
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
                const next = [
                  ...(s.alanlar || []),
                  { baslik: "Yeni Alan", kicker: "Kondisyon", metin: "Açıklama...", ikon: "dumbbell" },
                ];
                updateSpor({ alanlar: next });
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
                      updateSpor({ alanlar: next });
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
                    updateSpor({ alanlar: next });
                  }}
                  placeholder="Kardiyo İstasyonları"
                />
                <Input
                  label="Alt Başlık / Kicker"
                  value={alan.kicker || ""}
                  onChange={(e: any) => {
                    const next = [...(s.alanlar || [])];
                    next[i] = { ...alan, kicker: e.target.value };
                    updateSpor({ alanlar: next });
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
                      updateSpor({ alanlar: next });
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

        {/* 5. TESİS İMKANLARI (CHECKLIST) */}
        <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-[#F8F8F8] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#7C8B4F]" /> 5. Ekipman ve Tesis İmkanları
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next = [...(s.imkanlar || []), ""];
                updateSpor({ imkanlar: next });
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
                    updateSpor({ imkanlar: next });
                  }}
                  className="w-full bg-transparent text-sm text-[#EEE9E0] focus:outline-none"
                  placeholder="Örn: Hijyenik Soyunma Odaları"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next = (s.imkanlar || []).filter((_: any, i: number) => i !== idx);
                    updateSpor({ imkanlar: next });
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
