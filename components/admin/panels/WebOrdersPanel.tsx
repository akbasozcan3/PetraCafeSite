"use client";

import { useCallback, useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";

type Order = {
  id: string;
  publicCode: string;
  status: string;
  paymentMethod: string;
  guestName?: string;
  guestPhone?: string;
  totalText?: string;
  createdAt: string;
};

export default function WebOrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/web-shop?kind=orders", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yüklenemedi");
      setOrders(data.orders || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(id: string, status: string) {
    const res = await fetch("/api/v1/admin/web-shop", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Güncellenemedi");
      return;
    }
    void load();
  }

  if (loading && !orders.length) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="Web Siparişleri"
        description="Site üzerinden gelen misafir/üyelik siparişleri. Kart bilgisi tutulmaz."
      />
      <AdminAlert message={error} type="error" />
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => void load()}>
          Yenile
        </Button>
      </div>
      <div className="space-y-3">
        {orders.map((o) => (
          <div
            key={o.id}
            className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-[#F8F8F8]">{o.publicCode}</p>
                <p className="text-xs text-[#8A9BB0]">
                  {new Date(o.createdAt).toLocaleString("tr-TR")} · {o.guestName || "—"} ·{" "}
                  {o.guestPhone || "—"}
                </p>
                <p className="mt-1 text-sm text-[#EEE9E0]">{o.totalText}</p>
              </div>
              <select
                className="rounded-lg border border-white/10 bg-[#0D1117] px-3 py-2 text-sm text-[#EEE9E0]"
                value={o.status}
                onChange={(e) => void setStatus(o.id, e.target.value)}
              >
                {["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  )
                )}
              </select>
            </div>
            <p className="mt-2 text-xs text-[#6B7A94]">Ödeme: {o.paymentMethod}</p>
          </div>
        ))}
        {!orders.length ? (
          <p className="text-sm text-[#8A9BB0]">Henüz web siparişi yok.</p>
        ) : null}
      </div>
    </>
  );
}
