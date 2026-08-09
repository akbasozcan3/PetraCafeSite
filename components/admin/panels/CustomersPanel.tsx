"use client";

import { useCallback, useEffect, useState } from "react";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Button from "@/components/admin/ui/Button";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  createdAt?: string;
  active?: boolean;
};

export default function CustomersPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/web-shop?kind=customers", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yüklenemedi");
      setCustomers(data.customers || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading && !customers.length) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title="Müşteriler"
        description="Storefront müşteri hesapları. Admin hesaplarından tamamen ayrıdır."
      />
      <AdminAlert message={error} type="error" />
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={() => void load()}>
          Yenile
        </Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0D1117] text-[#8A9BB0]">
            <tr>
              <th className="px-4 py-3">Ad</th>
              <th className="px-4 py-3">E-posta</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Doğrulama</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-white/[0.06]">
                <td className="px-4 py-3 text-[#EEE9E0]">{c.name}</td>
                <td className="px-4 py-3 text-[#8A9BB0]">{c.email}</td>
                <td className="px-4 py-3 text-[#8A9BB0]">{c.phone}</td>
                <td className="px-4 py-3">
                  {c.emailVerified ? (
                    <span className="text-emerald-300">Doğrulandı</span>
                  ) : (
                    <span className="text-amber-300">Bekliyor</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!customers.length ? (
          <p className="p-4 text-sm text-[#8A9BB0]">Henüz müşteri yok.</p>
        ) : null}
      </div>
    </>
  );
}
