"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";
import { ArrowLeft, RefreshCw } from "lucide-react";

type Order = {
  id: string;
  orderCode?: string;
  status?: string;
  totalPrice?: number | string;
  customerName?: string;
  address?: string;
  source: string;
  updatedAt?: string;
};

async function apiJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "include", cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "İstek başarısız");
  return data as T;
}

const FILTERS = [
  { id: "all", label: "Tümü" },
  { id: "trendyol_go", label: "Trendyol Go" },
  { id: "yemeksepeti", label: "Yemeksepeti" },
] as const;

export default function IntegrationOrdersPanel() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const q = filter === "all" ? "all" : filter;
      const data = await apiJson<{ orders: Order[] }>(
        `/api/v1/admin/integrations?orders=1&source=${q}`
      );
      setOrders(data.orders || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

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
      <AdminPageHeader
        title="Entegrasyon Siparişleri"
        description="Kaynak: TRENDYOL_GO / YEMEKSEPETI. Web sepeti yok — yerel sipariş WhatsApp ile."
      />
      <AdminAlert message={error} type="error" />

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.id}
            size="sm"
            variant={filter === f.id ? "primary" : "outline"}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
        <Button size="sm" variant="ghost" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <AdminLoading />
      ) : orders.length === 0 ? (
        <p className="text-sm text-[#8A9BB0]">Bu filtrede sipariş yok.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={`${o.source}-${o.id}`}
              className="rounded-xl border border-white/[0.06] bg-[#141E2E]/80 p-4 text-sm text-[#EEE9E0]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">
                  {o.orderCode || o.id}{" "}
                  <span className="text-xs uppercase text-[#C8703A]">{o.source}</span>
                </p>
                <span className="text-xs text-[#8A9BB0]">{o.status || "—"}</span>
              </div>
              <p className="mt-1 text-[#8A9BB0]">
                {o.customerName || "Müşteri"} · {o.totalPrice ?? "—"}
              </p>
              {o.address && <p className="mt-1 text-xs text-[#8A9BB0]">{o.address}</p>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
