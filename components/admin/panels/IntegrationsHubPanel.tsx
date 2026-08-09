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

      <section className="mt-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-2 font-semibold text-[#F8F8F8]">Birleşik siparişler</h3>
        <p className="mb-4 text-sm text-[#8A9BB0]">
          Platform siparişlerini kaynak filtreleriyle görüntüle. Web sitesinde sepet/checkout yok;
          yerel siparişler WhatsApp/telefon ile devam eder.
        </p>
        <Link href="/admin/integrations/orders">
          <Button variant="outline">Siparişleri Aç</Button>
        </Link>
      </section>
    </>
  );
}
