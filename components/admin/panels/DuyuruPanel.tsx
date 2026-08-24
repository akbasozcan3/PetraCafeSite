"use client";

import { useState } from "react";
import { Loader2, Save, Trash2, Megaphone, Sparkles, Eye, CheckCircle2, ArrowRight, X } from "lucide-react";
import { api } from "@/lib/api/client";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import Button from "@/components/admin/ui/Button";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";

const PRESET_ANNOUNCEMENTS = [
  {
    title: "🏊‍♂️ Havuz & Beach Sezonu Açılışı",
    text: "Havuz & Beach kulübümüz sezona açıldı! Şezlong ve loca rezervasyonlarınızı şimdiden yaptırın.",
    stil: "gold",
    ikon: "🏊‍♂️",
    butonMetin: "Loca Ayırt",
    butonLink: "#rezervasyon",
  },
  {
    title: "🥐 Zengin Serpme Kahvaltı",
    text: "Hafta sonuna özel eşsiz doğa ve havuz manzaralı serpme kahvaltımız sizleri bekliyor.",
    stil: "gold",
    ikon: "🥐",
    butonMetin: "Menüyü İncele",
    butonLink: "#menu",
  },
  {
    title: "🎶 Canlı Müzik & Akustik Gece",
    text: "Bu Cuma ve Cumartesi akşamı havuz başında canlı müzik performansıyla buluşuyoruz!",
    stil: "dark",
    ikon: "🎶",
    butonMetin: "Masa Rezerve Et",
    butonLink: "#rezervasyon",
  },
  {
    title: "🌙 Ramazan & Özel İftar Menüsü",
    text: "Ramazan ayı boyunca zengin iftar sofralarımız ve geleneksel tatlılarımızla hizmetinizdeyiz.",
    stil: "green",
    ikon: "🌙",
    butonMetin: "İftar Rezervasyonu",
    butonLink: "#rezervasyon",
  },
];

const STYLES = [
  { id: "gold", name: "👑 Petra Lüks Altın", bg: "#d9a441", text: "#0d0f0a" },
  { id: "blue", name: "🌊 Havuz Mavisi", bg: "#0284c7", text: "#ffffff" },
  { id: "green", name: "🌿 Zümrüt Yeşili", bg: "#10b981", text: "#ffffff" },
  { id: "red", name: "🔥 Mercan Kırmızı", bg: "#e11d48", text: "#ffffff" },
  { id: "dark", name: "🖤 Asil Gece Siyahı", bg: "#141E2E", text: "#EEE9E0" },
];

export default function DuyuruPanel() {
  const { content, loading, setContent } = useAdminContent();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const duyuru = content?.duyuru || { aktif: false, metin: "" };
  const duyuruData = duyuru as any;

  const handleUpdate = (updates: Partial<typeof duyuruData>) => {
    if (!content) return;
    setContent({
      ...content,
      duyuru: {
        ...duyuru,
        ...updates,
      },
    });
  };

  const save = async () => {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.updateContent({ duyuru: content.duyuru });
      setContent(res.data);
      setMessage({ type: "ok", text: "✅ Duyuru başarıyla kaydedildi ve yayına alındı!" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Kayıt başarısız" });
    } finally {
      setSaving(false);
    }
  };

  const clearAndDisable = async () => {
    if (!confirm("Duyuru bandını tamamen kapatıp metni silmek istediğinize emin misiniz?")) return;
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const newDuyuru = { aktif: false, metin: "", butonMetin: "", butonLink: "" };
      const res = await api.updateContent({ duyuru: newDuyuru });
      setContent(res.data);
      setMessage({ type: "ok", text: "🗑️ Duyuru bandı kapatıldı ve temizlendi." });
      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Silme başarısız" });
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (preset: typeof PRESET_ANNOUNCEMENTS[0]) => {
    handleUpdate({
      aktif: true,
      metin: preset.text,
      stil: preset.stil as any,
      ikon: preset.ikon,
      butonMetin: preset.butonMetin,
      butonLink: preset.butonLink,
    });
  };

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const isLive = Boolean(duyuru.aktif && duyuru.metin);

  return (
    <>
      <AdminPageHeader
        title="Duyuru Bandı Yönetimi"
        description="Web sitenizin en üstünde yer alan duyuru, kampanya ve bildirim bandını canlı yönetin."
        actions={
          <Button onClick={save} disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>{saving ? "Kaydediliyor…" : "💾 Duyuruyu Kaydet"}</span>
          </Button>
        }
      />

      {message && (
        <div
          className={`mb-6 rounded-xl border p-4 text-sm font-semibold ${
            message.type === "ok"
              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
              : "border-red-500/30 bg-red-500/15 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* CANLI ÖNİZLEME (LIVE PREVIEW) */}
      <section className="mb-6 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[#D9A441]" />
            <h3 className="text-sm font-bold text-white">Sitedeki Canlı Görünüm (Önizleme)</h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isLive
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/10 text-[#8A9BB0] border border-white/10"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-gray-500"}`} />
            {isLive ? "Yayında" : "Kapalı / Gösterilmiyor"}
          </span>
        </div>

        {duyuru.metin ? (
          <div
            className="relative flex flex-wrap items-center justify-center gap-3 rounded-xl p-3.5 text-center text-sm font-semibold shadow-inner transition-all"
            style={{
              background:
                duyuruData.stil === "blue"
                  ? "linear-gradient(90deg, #0369a1, #0284c7)"
                  : duyuruData.stil === "green"
                  ? "linear-gradient(90deg, #047857, #10b981)"
                  : duyuruData.stil === "red"
                  ? "linear-gradient(90deg, #be123c, #e11d48)"
                  : duyuruData.stil === "dark"
                  ? "#0D1117"
                  : "linear-gradient(90deg, #b8842c, #d9a441, #b8842c)",
              color: duyuruData.stil === "gold" ? "#0D0F0A" : "#FFFFFF",
            }}
          >
            <span className="text-base">{duyuruData.ikon || "📢"}</span>
            <span>{duyuru.metin}</span>

            {duyuruData.butonMetin && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold shadow"
                style={{
                  background: duyuruData.stil === "gold" ? "#0D0F0A" : "#FFFFFF",
                  color: duyuruData.stil === "gold" ? "#FFFFFF" : "#0D0F0A",
                }}
              >
                {duyuruData.butonMetin}
                <ArrowRight className="h-3 w-3" />
              </span>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-[#8A9BB0]">
            Henüz bir duyuru metni girilmedi. Aşağıdaki formdan duyuru yazabilir veya hazır şablon seçebilirsiniz.
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOL: DUYURU DÜZENLEME FORMU */}
        <section className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 shadow-lg">
          <h3 className="text-base font-bold text-white mb-4">Duyuru Detayları</h3>

          <div className="space-y-4">
            {/* Aç / Kapa Butonu */}
            <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0D1117] p-4">
              <div>
                <span className="block text-sm font-bold text-white">Duyuru Bandını Sitede Yayınla</span>
                <span className="text-xs text-[#8A9BB0]">Açık olduğunda sitenin en üstünde duyuru bandı aktif olur.</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={duyuru.aktif ?? false}
                  onChange={(e) => handleUpdate({ aktif: e.target.checked })}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#D9A441] peer-checked:after:translate-x-full peer-checked:after:bg-[#0D0F0A]" />
              </label>
            </div>

            {/* Duyuru Metni */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A9BB0]">
                Duyuru Metni *
              </label>
              <textarea
                value={duyuru.metin ?? ""}
                onChange={(e) => handleUpdate({ metin: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#D9A441] focus:outline-none"
                placeholder="Örn: Havuz ve şezlong rezervasyonlarımız başladı! Detaylı bilgi için..."
              />
            </div>

            {/* İkon & Stil Seçimi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A9BB0]">
                  Başlık İkonu (Emoji)
                </label>
                <div className="flex items-center gap-2">
                  {["📢", "🏊‍♂️", "🥐", "🎶", "🌙", "🔥", "⚠️", "✨"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleUpdate({ ikon: emoji })}
                      className={`h-9 w-9 rounded-lg text-base transition ${
                        (duyuruData.ikon || "📢") === emoji
                          ? "bg-[#D9A441] text-[#0D0F0A] scale-110 shadow"
                          : "bg-[#0D1117] text-white hover:bg-white/10"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A9BB0]">
                  Tema & Renk Stili
                </label>
                <select
                  value={duyuruData.stil || "gold"}
                  onChange={(e) => handleUpdate({ stil: e.target.value as any })}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-3.5 py-2 text-xs font-semibold text-white focus:border-[#D9A441] focus:outline-none"
                >
                  {STYLES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Opsiyonel Buton & Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A9BB0]">
                  Buton Metni (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  value={duyuruData.butonMetin || ""}
                  onChange={(e) => handleUpdate({ butonMetin: e.target.value })}
                  placeholder="Örn: Rezervasyon Yap"
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#D9A441] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#8A9BB0]">
                  Buton Hedef Linki
                </label>
                <input
                  type="text"
                  value={duyuruData.butonLink || ""}
                  onChange={(e) => handleUpdate({ butonLink: e.target.value })}
                  placeholder="#rezervasyon veya https://..."
                  className="w-full rounded-xl border border-white/[0.1] bg-[#0D1117] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#D9A441] focus:outline-none"
                />
              </div>
            </div>

            {/* Butonlar: Kaydet & Duyuruyu Sil */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={clearAndDisable}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Duyuruyu Kapat & Sil
              </button>

              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-6 py-2.5 text-xs font-extrabold text-[#0D0F0A] shadow-md transition hover:bg-[#c99534] disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Duyuruyu Kaydet & Yayınla
              </button>
            </div>
          </div>
        </section>

        {/* SAĞ: HAZIR DUYURU ŞABLONLARI */}
        <section className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[#D9A441]" />
            <h3 className="text-sm font-bold text-white">Hızlı Duyuru Şablonları</h3>
          </div>
          <p className="text-xs text-[#8A9BB0] mb-4">
            Tek tıkla hazır bir konsepti seçip hemen sitenizde yayınlayabilirsiniz:
          </p>

          <div className="space-y-3">
            {PRESET_ANNOUNCEMENTS.map((preset, idx) => (
              <div
                key={idx}
                onClick={() => applyPreset(preset)}
                className="group cursor-pointer rounded-xl border border-white/[0.06] bg-[#0D1117] p-3 transition hover:border-[#D9A441]/40 hover:bg-[#1A2638]"
              >
                <h4 className="text-xs font-bold text-white group-hover:text-[#D9A441] transition flex items-center justify-between">
                  <span>{preset.title}</span>
                  <span className="text-[10px] text-[#8A9BB0] opacity-0 group-hover:opacity-100 transition">Uygula →</span>
                </h4>
                <p className="text-[11px] text-[#8A9BB0] mt-1 line-clamp-2">{preset.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

