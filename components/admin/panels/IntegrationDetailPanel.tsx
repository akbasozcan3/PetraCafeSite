"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import {
  ArrowLeft,
  Loader2,
  Package,
  RefreshCw,
  Save,
  ShoppingBag,
} from "lucide-react";

type FieldDef = {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  secret?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
};

type Meta = {
  id: string;
  name: string;
  description: string;
  docsUrl?: string;
  webhookPath: string;
  capabilities: string[];
  fields: FieldDef[];
};

type Settings = {
  enabled: boolean;
  connected: boolean;
  fields: Record<string, string | boolean>;
  secretsSet: Record<string, boolean>;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  unsupportedNotes?: string[];
};

type Product = {
  externalId: string;
  name: string;
  categoryName?: string;
  price?: string | number | null;
};

type Order = {
  id: string;
  orderCode?: string;
  status?: string;
  totalPrice?: number | string;
  customerName?: string;
  address?: string;
  source: string;
};

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "İstek başarısız");
  return data as T;
}

export default function IntegrationDetailPanel({ providerSlug }: { providerSlug: string }) {
  const apiId = providerSlug.replace(/-/g, "_");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const base = `/api/v1/admin/integrations/${apiId}`;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiJson<{ meta: Meta; settings: Settings }>(`${base}/settings`);
      setMeta(data.meta);
      setSettings(data.settings);
      const next: Record<string, string | boolean> = {
        enabled: data.settings.enabled,
      };
      for (const f of data.meta.fields) {
        if (f.key === "enabled") continue;
        if (f.secret) next[f.key] = "";
        else next[f.key] = (data.settings.fields[f.key] as string) || "";
      }
      setForm(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    void load();
  }, [load]);

  const caps = useMemo(() => new Set(meta?.capabilities || []), [meta]);

  const save = async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      const payload: Record<string, unknown> = { ...form };
      // Don't send empty secrets
      for (const f of meta?.fields || []) {
        if (f.secret && !String(payload[f.key] || "").trim()) delete payload[f.key];
      }
      const data = await apiJson<{ settings: Settings }>(`${base}/settings`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setSettings(data.settings);
      setForm((prev) => {
        const cleared = { ...prev };
        for (const f of meta?.fields || []) {
          if (f.secret) cleared[f.key] = "";
        }
        return cleared;
      });
      setOk("Ayarlar kaydedildi. Secret alanlar maskeli tutulur.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const test = async () => {
    setTesting(true);
    setError("");
    setOk("");
    try {
      const data = await apiJson<{ message: string; settings: Settings; success: boolean }>(
        `${base}/test`,
        { method: "POST", body: "{}" }
      );
      setSettings(data.settings);
      if (data.success) setOk(data.message);
      else setError(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Test başarısız");
      await load();
    } finally {
      setTesting(false);
    }
  };

  const fetchMenu = async () => {
    setMenuLoading(true);
    setError("");
    try {
      const data = await apiJson<{ products: Product[] }>(`${base}/menu`);
      setProducts(data.products || []);
      setOk(`${data.products?.length || 0} ürün alındı.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Menü alınamadı");
    } finally {
      setMenuLoading(false);
    }
  };

  const sync = async () => {
    setSyncing(true);
    setError("");
    setOk("");
    try {
      const data = await apiJson<{
        result: {
          productCount: number;
          created: number;
          updated: number;
          skipped: number;
          unmatched: number;
        };
      }>(`${base}/sync`, { method: "POST", body: "{}" });
      const r = data.result;
      setOk(
        `✓ ${r.productCount} ürün bulundu · ✓ ${r.updated} güncellendi · ✓ ${r.created} yeni · ⚠ ${r.unmatched} eşleştirilemedi`
      );
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Senkron başarısız");
    } finally {
      setSyncing(false);
    }
  };

  const loadOrders = async (refresh: boolean) => {
    setOrdersLoading(true);
    setError("");
    try {
      const q = refresh ? "?refresh=1" : "";
      const data = await apiJson<{ orders: Order[] }>(`${base}/orders${q}`);
      setOrders(data.orders || []);
      if (refresh) setOk("Siparişler yenilendi.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Siparişler alınamadı");
    } finally {
      setOrdersLoading(false);
    }
  };

  const orderAction = async (action: string, orderId: string) => {
    try {
      await apiJson(`${base}/orders`, {
        method: "POST",
        body: JSON.stringify({ action, orderId, preparationTime: 30 }),
      });
      setOk(`Sipariş işlemi: ${action}`);
      await loadOrders(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "İşlem başarısız");
    }
  };

  if (loading && !meta) return <AdminLoading />;
  if (!meta) {
    return (
      <>
        <AdminPageHeader title="Entegrasyon" />
        <AdminAlert message={error || "Bulunamadı"} type="error" />
        <Link href="/admin/integrations">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" /> Geri
          </Button>
        </Link>
      </>
    );
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <>
      <div className="mb-4">
        <Link
          href="/admin/integrations"
          className="inline-flex items-center gap-1 text-sm text-[#8A9BB0] hover:text-[#EEE9E0]"
        >
          <ArrowLeft className="h-4 w-4" /> Entegrasyonlar
        </Link>
      </div>
      <AdminPageHeader title={meta.name} description={meta.description} />
      <AdminAlert message={error} type="error" />
      <AdminAlert message={ok} type="success" />

      <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-4 font-semibold text-[#F8F8F8]">Ayarlar</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {meta.fields.map((f) => {
            if (f.type === "checkbox") {
              return (
                <label
                  key={f.key}
                  className="flex items-center gap-3 text-sm text-[#EEE9E0] md:col-span-2"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form[f.key])}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                    className="h-4 w-4 rounded border-white/20"
                  />
                  {f.label}
                </label>
              );
            }
            if (f.type === "select") {
              return (
                <div key={f.key} className="space-y-2">
                  <label className="block text-sm font-medium text-[#8A9BB0]">{f.label}</label>
                  <select
                    value={String(form[f.key] || "")}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 text-sm text-[#EEE9E0]"
                  >
                    {(f.options || []).map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {f.help && <p className="text-xs text-[#8A9BB0]">{f.help}</p>}
                </div>
              );
            }
            const secretSet = f.secret && settings?.secretsSet?.[f.key];
            return (
              <div key={f.key}>
                <Input
                  label={`${f.label}${secretSet ? " (kayıtlı — değiştirmek için yazın)" : ""}`}
                  type={f.secret ? "password" : "text"}
                  autoComplete={f.secret ? "new-password" : "off"}
                  placeholder={secretSet ? "••••••••••••••••" : f.placeholder}
                  value={String(form[f.key] ?? "")}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
                {f.help && <p className="mt-1 text-xs text-[#8A9BB0]">{f.help}</p>}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-[#8A9BB0]">
          Webhook URL:{" "}
          <code className="text-[#C8703A]">
            {siteUrl}
            {meta.webhookPath}
          </code>
          {meta.docsUrl && (
            <>
              {" · "}
              <a
                href={meta.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#EEE9E0]"
              >
                Resmi doküman
              </a>
            </>
          )}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
          {caps.has("testConnection") && (
            <Button variant="outline" onClick={() => void test()} disabled={testing}>
              {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Bağlantıyı Test Et
            </Button>
          )}
        </div>
      </section>

      {(caps.has("getMenu") || caps.has("syncMenu")) && (
        <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#F8F8F8]">
            <Package className="h-4 w-4 text-[#C8703A]" /> Menü / Ürünler
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {caps.has("getMenu") && (
              <Button variant="outline" onClick={() => void fetchMenu()} disabled={menuLoading}>
                {menuLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Menüleri Getir
              </Button>
            )}
            {caps.has("syncMenu") && (
              <Button onClick={() => void sync()} disabled={syncing}>
                {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Şimdi Senkronize Et
              </Button>
            )}
          </div>
          {products.length > 0 && (
            <div className="max-h-72 overflow-auto rounded-xl border border-white/[0.06]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0D1117] text-[#8A9BB0]">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Ürün</th>
                    <th className="px-3 py-2">Kategori</th>
                    <th className="px-3 py-2">Fiyat</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 80).map((p) => (
                    <tr key={p.externalId} className="border-t border-white/[0.04] text-[#EEE9E0]">
                      <td className="px-3 py-2 font-mono text-xs">{p.externalId}</td>
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2">{p.categoryName || "—"}</td>
                      <td className="px-3 py-2">{p.price ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {caps.has("getOrders") && (
        <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#F8F8F8]">
            <ShoppingBag className="h-4 w-4 text-[#C8703A]" /> Siparişler
          </h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => void loadOrders(false)} disabled={ordersLoading}>
              Kayıtlı
            </Button>
            <Button onClick={() => void loadOrders(true)} disabled={ordersLoading}>
              {ordersLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Platformdan Çek
            </Button>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-[#8A9BB0]">Sipariş yok.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="rounded-xl border border-white/[0.06] bg-[#0D1117]/60 p-4 text-sm text-[#EEE9E0]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">
                        {o.orderCode || o.id}{" "}
                        <span className="text-xs text-[#8A9BB0]">({o.status || "?"})</span>
                      </p>
                      <p className="text-[#8A9BB0]">
                        {o.customerName || "Müşteri"} · {o.totalPrice ?? "—"}
                      </p>
                      {o.address && <p className="mt-1 text-xs text-[#8A9BB0]">{o.address}</p>}
                    </div>
                    {caps.has("updateOrderStatus") && (
                      <div className="flex flex-wrap gap-1">
                        <Button size="sm" variant="outline" onClick={() => void orderAction("picked", o.id)}>
                          Hazırlanıyor
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => void orderAction("invoiced", o.id)}>
                          Hazır
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => void orderAction("deliver", o.id)}>
                          Teslim
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => void orderAction("cancel", o.id)}>
                          İptal
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {(settings?.unsupportedNotes?.length || 0) > 0 && (
        <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="mb-2 font-semibold text-amber-200">Desteklenmeyen / Notlar</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-[#8A9BB0]">
            {settings!.unsupportedNotes!.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
