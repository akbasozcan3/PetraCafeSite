"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import { ArrowRight, CheckCircle2, Plug, RefreshCw, XCircle } from "lucide-react";

type ProviderCard = {
  id: string;
  name: string;
  description: string;
  webhookPath: string;
  settings: {
    enabled: boolean;
    connected: boolean;
    lastTestOk?: boolean;
    lastSyncAt?: string;
    lastSyncProductCount?: number;
    lastTestMessage?: string;
  };
};

async function apiJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "include", cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "İstek başarısız");
  return data as T;
}

export default function IntegrationsHubPanel() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [providers, setProviders] = useState<ProviderCard[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiJson<{ providers: ProviderCard[] }>("/api/v1/admin/integrations");
      setProviders(data.providers || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading && providers.length === 0) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="Entegrasyonlar"
        description="Yemek platformu bağlantıları. Credential'lar yalnızca sunucuda şifreli saklanır."
      />
      <AdminAlert message={error} type="error" />

      <div className="mb-6 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" /> Yenile
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {providers.map((p) => {
          const linked = p.settings.enabled && p.settings.lastTestOk === true;
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[#F8F8F8]">
                    <Plug className="h-5 w-5 text-[#C8703A]" />
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#8A9BB0]">{p.description}</p>
                </div>
                {linked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Bağlı
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#8A9BB0]">
                    <XCircle className="h-3.5 w-3.5" /> Bağlı değil
                  </span>
                )}
              </div>

              <ul className="mb-4 space-y-1 text-xs text-[#8A9BB0]">
                <li>Aktif: {p.settings.enabled ? "ON" : "OFF"}</li>
                <li>
                  Son senkron:{" "}
                  {p.settings.lastSyncAt
                    ? new Date(p.settings.lastSyncAt).toLocaleString("tr-TR")
                    : "—"}
                  {typeof p.settings.lastSyncProductCount === "number"
                    ? ` (${p.settings.lastSyncProductCount} ürün)`
                    : ""}
                </li>
                {p.settings.lastTestMessage && (
                  <li>Son test: {p.settings.lastTestMessage}</li>
                )}
              </ul>

              <Link href={`/admin/integrations/${p.id.replace(/_/g, "-")}`}>
                <Button className="w-full sm:w-auto">
                  Ayarları Yönet <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* PayTR Ödeme Entegrasyonu Yönetimi */}
      <PayTrAdminCard />

      <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-2 font-semibold text-[#F8F8F8]">Birleşik siparişler</h3>
        <p className="mb-4 text-sm text-[#8A9BB0]">
          Platform siparişlerini ve online ödemeleri filtreleriyle görüntüle.
        </p>
        <Link href="/admin/integrations/orders">
          <Button variant="outline">Siparişleri Aç</Button>
        </Link>
      </section>
    </>
  );
}

function PayTrAdminCard() {
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

  return (
    <div className="mt-6 rounded-2xl border border-[#D9A441]/30 bg-[#16190F]/90 p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441]/20 text-[#D9A441] border border-[#D9A441]/30 font-bold">
            💳
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F4EEE1]">PayTR Sanal POS & Online Ödeme</h3>
            <p className="text-xs text-white/60">
              Kredi / Banka Kartı ile 3D Secure güvenli ödeme altyapısı.
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${form.merchantId ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
          {form.merchantId ? "POS Yapılandırıldı" : "Kurulum Bekliyor"}
        </span>
      </div>

      {msg && (
        <div className={`mb-4 p-3 rounded-xl text-xs font-medium ${msgType === "success" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-red-500/15 text-red-300 border border-red-500/30"}`}>
          {msg}
        </div>
      )}

      {loading ? (
        <p className="text-xs text-white/50 py-4">Yükleniyor…</p>
      ) : (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              PayTR Mağaza No (Merchant ID)
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 123456"
              value={form.merchantId}
              onChange={(e) => setForm({ ...form, merchantId: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-3.5 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              PayTR Mağaza Parolası (Merchant Key)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={form.merchantKey}
              onChange={(e) => setForm({ ...form, merchantKey: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-3.5 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              PayTR Mağaza Gizli Anahtar (Merchant Salt)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={form.merchantSalt}
              onChange={(e) => setForm({ ...form, merchantSalt: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-3.5 py-2.5 text-sm text-white focus:border-[#D9A441] focus:outline-none"
            />
          </div>

          <div className="flex flex-col justify-center space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={form.testMode}
                onChange={(e) => setForm({ ...form, testMode: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-[#0D1117] text-[#D9A441] focus:ring-0"
              />
              <span>Test Modu (Canlıya alırken işareti kaldırın)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={form.noInstallment}
                onChange={(e) => setForm({ ...form, noInstallment: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-[#0D1117] text-[#D9A441] focus:ring-0"
              />
              <span>Yalnızca Tek Çekim (Taksit Kapalı)</span>
            </label>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-white/40">
              PayTR Bildirim URL: <code className="text-[#D9A441] bg-black/40 px-2 py-0.5 rounded">https://petra-cafe-site.vercel.app/api/v1/payment/paytr/callback</code>
            </p>
            <Button type="submit" disabled={saving}>
              {saving ? "Kaydediliyor…" : "PayTR Ayarlarını Kaydet"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

