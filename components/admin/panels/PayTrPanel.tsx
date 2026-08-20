"use client";

import { useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import { CreditCard, Save, CheckCircle2, ShieldCheck, Key, HelpCircle, ExternalLink } from "lucide-react";

export default function PayTrPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error">("success");

  const [form, setForm] = useState({
    merchantId: "",
    merchantKey: "",
    merchantSalt: "",
    testMode: true,
    noInstallment: true,
  });

  useEffect(() => {
    fetch("/api/v1/admin/integrations/paytr", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.config) {
          setForm({
            merchantId: data.config.merchantId || "",
            merchantKey: data.config.merchantKey || "",
            merchantSalt: data.config.merchantSalt || "",
            testMode: Boolean(data.config.testMode),
            noInstallment: data.config.noInstallment !== false,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/v1/admin/integrations/paytr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi");
      setMsg("PayTR Sanal POS ayarları başarıyla kaydedildi.");
      setMsgType("success");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Hata oluştu");
      setMsgType("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="PayTR Sanal POS & Online Ödeme"
        description="3D Secure Kredi Kartı ödeme altyapısı ve mağaza anahtarları."
      />
      <AdminAlert message={msg} type={msgType} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sol Alan: POS Ayar Formu */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-[#D9A441] font-semibold text-base">
                <CreditCard className="h-5 w-5" />
                <span>Mağaza Kimlik Bilgileri</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${form.merchantId ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
                {form.merchantId ? "POS Aktif" : "Eksik Bilgi"}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                PayTR Mağaza Numarası (Merchant ID)
              </label>
              <input
                type="text"
                required
                placeholder="Örn: 123456"
                value={form.merchantId}
                onChange={(e) => setForm({ ...form, merchantId: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm text-white focus:border-[#D9A441] focus:outline-none font-mono"
              />
              <p className="mt-1 text-[11px] text-white/40">PayTR Mağaza panelinizin sağ üst köşesinde yazan 6 haneli numara.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Mağaza Parolası (Merchant Key)
              </label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                value={form.merchantKey}
                onChange={(e) => setForm({ ...form, merchantKey: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm text-white focus:border-[#D9A441] focus:outline-none font-mono"
              />
              <p className="mt-1 text-[11px] text-white/40">PayTR Paneli &gt; Entegrasyon Bilgileri sayfasından alınır.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Mağaza Gizli Anahtarı (Merchant Salt)
              </label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                value={form.merchantSalt}
                onChange={(e) => setForm({ ...form, merchantSalt: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm text-white focus:border-[#D9A441] focus:outline-none font-mono"
              />
              <p className="mt-1 text-[11px] text-white/40">PayTR Paneli &gt; Entegrasyon Bilgileri sayfasından alınır.</p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-3">
              <label className="flex items-center gap-3 text-sm text-white/90 cursor-pointer bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <input
                  type="checkbox"
                  checked={form.testMode}
                  onChange={(e) => setForm({ ...form, testMode: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-[#0D1117] text-[#D9A441] focus:ring-0"
                />
                <div>
                  <span className="font-semibold block">Test Modu (Deneme Ödemeleri)</span>
                  <span className="text-xs text-white/50">Canlıda gerçek para çekmek için bu kutunun işaretini kaldırın.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-sm text-white/90 cursor-pointer bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <input
                  type="checkbox"
                  checked={form.noInstallment}
                  onChange={(e) => setForm({ ...form, noInstallment: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-[#0D1117] text-[#D9A441] focus:ring-0"
                />
                <div>
                  <span className="font-semibold block">Tek Çekim Zorunlu</span>
                  <span className="text-xs text-white/50">Taksit seçeneklerini kapatır, yalnızca tek çekim ödeme alır.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4" />
                {saving ? "Kaydediliyor…" : "PayTR Bilgilerini Kaydet"}
              </Button>
            </div>
          </form>
        </div>

        {/* Sağ Alan: PayTR Panel Bilgilendirmesi & Webhook */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              PayTR Paneline Girilecek Bilgiler
            </h3>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              PayTR mağaza panelinize (<a href="https://www.paytr.com/magaza" target="_blank" rel="noreferrer" className="text-[#D9A441] underline inline-flex items-center gap-1">paytr.com <ExternalLink className="h-3 w-3" /></a>) giriş yapıp <b>Ayarlar / Bildirim URL</b> kısmına aşağıdaki adresi yapıştırın:
            </p>

            <div className="p-3 bg-[#0D1117] border border-white/10 rounded-xl">
              <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">Bildirim URL (Callback)</span>
              <code className="text-xs text-[#D9A441] font-mono break-all select-all block">
                https://petra-cafe-site.vercel.app/api/v1/payment/paytr/callback
              </code>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 text-xs text-white/70 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <HelpCircle className="h-4 w-4 text-[#D9A441]" />
              Nasıl Çalışır?
            </h4>
            <p>1. Müşteri online ödeme yapmak istediğinde PayTR 3D Secure ekranı açılır.</p>
            <p>2. Müşteri SMS şifresiyle ödemeyi onaylar.</p>
            <p>3. PayTR sunucuları sistemimizdeki Callback URL'ye anında sinyal göndererek siparişi <b>Ödendi</b> yapar.</p>
            <p>4. Müşteri başarı sayfasına yönlendirilir.</p>
          </div>
        </div>
      </div>
    </>
  );
}