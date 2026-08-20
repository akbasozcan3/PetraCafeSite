"use client";


import { useState } from "react";
import { Loader2, Save, FileText, Shield, Check, Globe, Building, ArrowRight } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import { DEFAULT_CONTENT } from "@/lib/content/defaults";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const TABS = [
  { id: "gizlilikPolitikasi", label: "Gizlilik & KVKK", icon: Shield, color: "#10B981" },
  { id: "rezervasyonKosullari", label: "Rezervasyon & İptal Koşulları", icon: Check, color: "#D9A441" },
  { id: "kullanimKosullari", label: "Kullanım Koşulları", icon: FileText, color: "#3B82F6" },
  { id: "cerezPolitikasi", label: "Çerez Politikası", icon: Globe, color: "#8B5CF6" },
  { id: "ticariBilgiler", label: "İşletme & Ticari Bilgiler", icon: Building, color: "#EC4899" },
];

export default function AdminSozlesmelerPage() {
  const { content, loading, setContent } = useAdminContent();
  const [activeTab, setActiveTab] = useState("gizlilikPolitikasi");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const legal = (content?.legal as any) || (DEFAULT_CONTENT.legal as any);
  const currentDoc = legal?.[activeTab] || (DEFAULT_CONTENT.legal as any)?.[activeTab] || { title: "", lead: "", body: "" };

  const handleUpdate = (field: string, value: string) => {
    if (!content) return;
    const updatedLegal = {
      ...legal,
      [activeTab]: {
        ...currentDoc,
        [field]: value,
      },
    };
    setContent({
      ...content,
      legal: updatedLegal,
    });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.updateContent({ legal: content.legal });
      setContent(res.data);
      setMessage({ type: "ok", text: "✅ Yasal metinler ve sözleşmeler başarıyla kaydedildi!" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "err", text: `Hata: ${err?.message || "Kayıt başarısız"}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-white/50 text-sm">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Sözleşmeler yükleniyor...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <AdminPageHeader
        title="Sözleşmeler, KVKK & Hukuki Metinler"
        description="Web sitenizde yer alan Gizlilik, KVKK, Rezervasyon/İptal Koşulları, Çerez Politikası ve Ticari Bilgileri yönetin."
      />

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold border ${
            message.type === "ok"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/15 border-red-500/30 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Üst Sekmeler */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                isActive
                  ? "bg-[#D9A441] text-[#0D0F0A] shadow-lg shadow-[#D9A441]/20 scale-[1.02]"
                  : "bg-[#141E2E] text-[#8A9BB0] hover:text-white hover:bg-[#1A2638] border border-white/[0.06]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Alanı */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">Düzenlenen Sözleşme</span>
            <h2 className="text-lg font-extrabold text-white">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={
                activeTab === "gizlilikPolitikasi"
                  ? "/gizlilik-politikasi"
                  : activeTab === "rezervasyonKosullari"
                  ? "/rezervasyon-kosullari"
                  : activeTab === "kullanimKosullari"
                  ? "/kullanim-kosullari"
                  : activeTab === "cerezPolitikasi"
                  ? "/cerez-politikasi"
                  : "/ticari-bilgiler"
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white/70 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition"
            >
              <span>Canlıda Gör</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#D9A441] text-[#0D0F0A] text-xs font-extrabold shadow-md hover:bg-[#c99534] transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Sayfa Başlığı *
          </label>
          <input
            type="text"
            value={currentDoc.title || ""}
            onChange={(e) => handleUpdate("title", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-4 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            placeholder="Sözleşme başlığı"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Özet / Giriş Metni (Lead)
          </label>
          <input
            type="text"
            value={currentDoc.lead || ""}
            onChange={(e) => handleUpdate("lead", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-4 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            placeholder="Kısa bilgilendirme özeti"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8A9BB0] mb-1.5">
            Sözleşme / Metin Gövdesi *
          </label>
          <textarea
            rows={14}
            value={currentDoc.body || ""}
            onChange={(e) => handleUpdate("body", e.target.value)}
            className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] p-4 text-xs font-mono leading-relaxed text-[#EEE9E0] focus:border-[#D9A441] focus:outline-none"
            placeholder="Maddeleri buraya yazın..."
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] text-xs font-extrabold shadow-md hover:bg-[#c99534] transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Metinleri Kaydet
          </button>
        </div>
      </section>
    </div>
  );
}
