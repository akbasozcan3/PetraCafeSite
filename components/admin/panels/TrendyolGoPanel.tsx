"use client";

import { useCallback, useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import {
  CheckCircle2,
  Link2,
  Loader2,
  Package,
  RefreshCw,
  Save,
  ShoppingBag,
  XCircle,
} from "lucide-react";

type PublicSettings = {
  enabled: boolean;
  environment: "production" | "stage";
  apiBaseUrl: string;
  supplierId: string;
  restaurantId: string;
  agentName: string;
  webhookUsername: string;
  apiKeySet: boolean;
  apiSecretSet: boolean;
  webhookPasswordSet: boolean;
  lastTestAt?: string;
  lastTestOk?: boolean;
  lastTestMessage?: string;
  lastSyncAt?: string;
  lastSyncProductCount?: number;
  lastOrderPollAt?: string;
  updatedAt?: string;
  defaultBaseUrl: string;
  webhookPath: string;
};

type MenuRow = {
  id: string;
  name: string;
  description?: string;
  sellingPrice?: number | string | null;
  status?: string | null;
  image?: string | null;
  categoryName?: string;
};

type OrderRow = {
  id: string;
  orderCode?: string;
  status?: string;
  totalPrice?: number | string;
  customerName?: string;
  address?: string;
  phoneNumber?: string;
  customerNote?: string;
  paymentMethodText?: string;
  packageCreationDate?: string | number;
  products?: unknown[];
  source?: string;
  updatedAt?: string;
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

export default function TrendyolGoPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [form, setForm] = useState({
    enabled: false,
    environment: "production" as "production" | "stage",
    apiBaseUrl: "",
    supplierId: "",
    restaurantId: "",
    agentName: "",
    webhookUsername: "",
    apiKey: "",
    apiSecret: "",
    webhookPassword: "",
  });
  const [menuRows, setMenuRows] = useState<MenuRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiJson<{ settings: PublicSettings }>(
        "/api/v1/admin/integrations/trendyol/settings"
      );
      setSettings(data.settings);
      setForm((f) => ({
        ...f,
        enabled: data.settings.enabled,
        environment: data.settings.environment,
        apiBaseUrl: data.settings.apiBaseUrl || "",
        supplierId: data.settings.supplierId || "",
        restaurantId: data.settings.restaurantId || "",
        agentName: data.settings.agentName || "",
        webhookUsername: data.settings.webhookUsername || "",
        apiKey: "",
        apiSecret: "",
        webhookPassword: "",
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ayarlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      const payload: Record<string, unknown> = {
        enabled: form.enabled,
        environment: form.environment,
        apiBaseUrl: form.apiBaseUrl,
        supplierId: form.supplierId,
        restaurantId: form.restaurantId,
        agentName: form.agentName,
        webhookUsername: form.webhookUsername,
      };
      if (form.apiKey.trim()) payload.apiKey = form.apiKey.trim();
      if (form.apiSecret.trim()) payload.apiSecret = form.apiSecret.trim();
      if (form.webhookPassword.trim()) payload.webhookPassword = form.webhookPassword.trim();

      const data = await apiJson<{ settings: PublicSettings }>(
        "/api/v1/admin/integrations/trendyol/settings",
        { method: "PUT", body: JSON.stringify(payload) }
      );
      setSettings(data.settings);
      setForm((f) => ({ ...f, apiKey: "", apiSecret: "", webhookPassword: "" }));
      setOk("Ayarlar kaydedildi. Secret alanlar maskeli tutulur.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kayıt başarısız");
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setError("");
    setOk("");
    try {
      const data = await apiJson<{ message: string; settings: PublicSettings }>(
        "/api/v1/admin/integrations/trendyol/test",
        { method: "POST", body: "{}" }
      );
      setSettings(data.settings);
      setOk(data.message);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bağlantı testi başarısız");
      await load();
    } finally {
      setTesting(false);
    }
  };

  const fetchMenu = async () => {
    setMenuLoading(true);
    setError("");
    try {
      const data = await apiJson<{ products: MenuRow[] }>(
        "/api/v1/admin/integrations/trendyol/menu"
      );
      setMenuRows(data.products || []);
      setOk(`${data.products?.length || 0} ürün Trendyol'dan alındı.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Menü alınamadı");
    } finally {
      setMenuLoading(false);
    }
  };

  const syncMenu = async () => {
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
        };
      }>("/api/v1/admin/integrations/trendyol/sync", {
        method: "POST",
        body: "{}",
      });
      setOk(
        `Senkron tamam: ${data.result.productCount} ürün (yeni ${data.result.created}, güncellenen ${data.result.updated}, atlanan ${data.result.skipped}). Yerel ürünler silinmedi.`
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
      const q = refresh ? "?refresh=1&status=Created" : "";
      const data = await apiJson<{ orders: OrderRow[] }>(
        `/api/v1/admin/integrations/trendyol/orders${q}`
      );
      setOrders(data.orders || []);
      if (refresh) setOk("Siparişler Trendyol'dan yenilendi.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Siparişler alınamadı");
    } finally {
      setOrdersLoading(false);
    }
  };

  const orderAction = async (action: string, packageId: string) => {
    setError("");
    try {
      await apiJson("/api/v1/admin/integrations/trendyol/orders", {
        method: "POST",
        body: JSON.stringify({ action, packageId, preparationTime: 30 }),
      });
      setOk(`Sipariş işlemi: ${action}`);
      await loadOrders(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sipariş işlemi başarısız");
    }
  };

  if (loading && !settings) return <AdminLoading />;

  const siteUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  return (
    <>
      <AdminPageHeader
        title="Trendyol Go"
        description="Trendyol Yemek (Meal GW) entegrasyonu — kimlik bilgileri yalnızca sunucuda saklanır."
      />
      <AdminAlert message={error} type="error" />
      <AdminAlert message={ok} type="success" />

      {/* Özet */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Bağlantı"
          value={
            settings?.lastTestOk === true
              ? "Başarılı"
              : settings?.lastTestOk === false
                ? "Hatalı"
                : "Test edilmedi"
          }
          ok={settings?.lastTestOk}
        />
        <SummaryCard
          label="Durum"
          value={form.enabled ? "Aktif" : "Pasif"}
          ok={form.enabled}
        />
        <SummaryCard
          label="Son senkron"
          value={
            settings?.lastSyncAt
              ? new Date(settings.lastSyncAt).toLocaleString("tr-TR")
              : "—"
          }
        />
        <SummaryCard
          label="Ürün (son sync)"
          value={String(settings?.lastSyncProductCount ?? "—")}
        />
      </div>

      {/* Ayarlar */}
      <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#F8F8F8]">
          <Link2 className="h-4 w-4 text-[#C8703A]" /> Ayarlar
        </h3>

        <label className="mb-4 flex items-center gap-3 text-sm text-[#EEE9E0]">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            className="h-4 w-4 rounded border-white/20"
          />
          Entegrasyon aktif
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#8A9BB0]">Ortam</label>
            <select
              value={form.environment}
              onChange={(e) =>
                setForm({
                  ...form,
                  environment: e.target.value as "production" | "stage",
                })
              }
              className="h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 text-sm text-[#EEE9E0]"
            >
              <option value="production">Production (api.trendyol.com/mealgw)</option>
              <option value="stage">Stage (stageapi.trendyol.com/mealgw)</option>
            </select>
          </div>
          <Input
            label="API Base URL (opsiyonel override)"
            placeholder={settings?.defaultBaseUrl || "https://api.trendyol.com/mealgw"}
            value={form.apiBaseUrl}
            onChange={(e) => setForm({ ...form, apiBaseUrl: e.target.value })}
          />
          <Input
            label="Supplier ID (Satıcı / Cari ID)"
            value={form.supplierId}
            onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
          />
          <Input
            label="Restaurant ID (Store ID)"
            value={form.restaurantId}
            onChange={(e) => setForm({ ...form, restaurantId: e.target.value })}
          />
          <Input
            label={`API Key${settings?.apiKeySet ? " (kayıtlı — değiştirmek için yazın)" : ""}`}
            type="password"
            autoComplete="new-password"
            placeholder={settings?.apiKeySet ? "••••••••••••••••" : ""}
            value={form.apiKey}
            onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
          />
          <Input
            label={`API Secret${settings?.apiSecretSet ? " (kayıtlı — değiştirmek için yazın)" : ""}`}
            type="password"
            autoComplete="new-password"
            placeholder={settings?.apiSecretSet ? "••••••••••••••••" : ""}
            value={form.apiSecret}
            onChange={(e) => setForm({ ...form, apiSecret: e.target.value })}
          />
          <Input
            label="User-Agent adı (boş = SelfIntegration)"
            value={form.agentName}
            onChange={(e) => setForm({ ...form, agentName: e.target.value })}
          />
          <Input
            label="Webhook Basic Auth kullanıcı adı"
            value={form.webhookUsername}
            onChange={(e) => setForm({ ...form, webhookUsername: e.target.value })}
          />
          <Input
            label={`Webhook Basic Auth şifre${settings?.webhookPasswordSet ? " (kayıtlı)" : ""}`}
            type="password"
            autoComplete="new-password"
            placeholder={settings?.webhookPasswordSet ? "••••••••••••••••" : ""}
            value={form.webhookPassword}
            onChange={(e) => setForm({ ...form, webhookPassword: e.target.value })}
          />
        </div>

        <p className="mt-4 text-xs text-[#8A9BB0]">
          Credential kaynağı: Trendyol Partner Panel → Hesap Bilgilerim → Entegrasyon Bilgileri.
          Webhook URL:{" "}
          <code className="text-[#C8703A]">
            {siteUrl}
            {settings?.webhookPath || "/api/integrations/trendyol/webhook"}
          </code>
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button onClick={() => void save()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
          <Button variant="outline" onClick={() => void testConnection()} disabled={testing}>
            {testing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Bağlantıyı Test Et
          </Button>
        </div>
        {settings?.lastTestMessage && (
          <p className="mt-3 text-sm text-[#8A9BB0]">
            Son test: {settings.lastTestMessage}
            {settings.lastTestAt
              ? ` (${new Date(settings.lastTestAt).toLocaleString("tr-TR")})`
              : ""}
          </p>
        )}
      </section>

      {/* Menü */}
      <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#F8F8F8]">
          <Package className="h-4 w-4 text-[#C8703A]" /> Menü / Ürünler
        </h3>
        <p className="mb-4 text-sm text-[#8A9BB0]">
          Trendyol menüsünü çeker; senkron ile mevcut CMS ürünlerine{" "}
          <code>trendyolId</code> üzerinden upsert eder. Yerel ürünler silinmez.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => void fetchMenu()} disabled={menuLoading}>
            {menuLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Menüyü Getir
          </Button>
          <Button onClick={() => void syncMenu()} disabled={syncing}>
            {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Menüyü Senkronize Et
          </Button>
        </div>
        {menuRows.length > 0 && (
          <div className="max-h-80 overflow-auto rounded-xl border border-white/[0.06]">
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
                {menuRows.slice(0, 100).map((p) => (
                  <tr key={p.id} className="border-t border-white/[0.04] text-[#EEE9E0]">
                    <td className="px-3 py-2 font-mono text-xs">{p.id}</td>
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.categoryName || "—"}</td>
                    <td className="px-3 py-2">{p.sellingPrice ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Siparişler */}
      <section className="mb-8 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-[#F8F8F8]">
          <ShoppingBag className="h-4 w-4 text-[#C8703A]" /> Trendyol Go Siparişleri
        </h3>
        <p className="mb-4 text-sm text-[#8A9BB0]">
          Site üzerinden Trendyol&apos;a sipariş iletimi Meal GW dokümanında self-serve desteklenmiyor.
          Burada Trendyol&apos;dan gelen paket siparişleri listelenir ve durum güncellenir. Ödeme kartı
          alma bu API ile yapılmaz.
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => void loadOrders(false)} disabled={ordersLoading}>
            Kayıtlı siparişler
          </Button>
          <Button onClick={() => void loadOrders(true)} disabled={ordersLoading}>
            {ordersLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Trendyol&apos;dan çek (Created)
          </Button>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-[#8A9BB0]">Henüz sipariş yok.</p>
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
                      {o.customerName || "Müşteri"} · {o.totalPrice ?? "—"} ·{" "}
                      {o.paymentMethodText || "—"}
                    </p>
                    {o.address && <p className="mt-1 text-xs text-[#8A9BB0]">{o.address}</p>}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Button size="sm" variant="outline" onClick={() => void orderAction("picked", o.id)}>
                      Hazırlanıyor
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void orderAction("invoiced", o.id)}>
                      Hazır
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void orderAction("ship", o.id)}>
                      Yola çıktı
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => void orderAction("deliver", o.id)}>
                      Teslim
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => void orderAction("cancel", o.id)}>
                      İptal
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function SummaryCard({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
      <p className="text-xs uppercase tracking-wide text-[#8A9BB0]">{label}</p>
      <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#F8F8F8]">
        {ok === true && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
        {ok === false && <XCircle className="h-4 w-4 text-red-400" />}
        {value}
      </p>
    </div>
  );
}
