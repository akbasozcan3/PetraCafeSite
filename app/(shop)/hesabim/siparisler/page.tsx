"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  publicCode: string;
  status: string;
  totalText?: string;
  createdAt: string;
};

export default function SiparislerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/v1/customer/orders", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Giriş gerekli.");
        return;
      }
      setOrders(data.orders || []);
    })();
  }, []);

  return (
    <>
      <h1>Siparişlerim</h1>
      <p className="lead">
        <Link href="/hesabim">← Hesabım</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {!orders.length && !error ? (
        <div className="shop-card">Henüz sipariş yok.</div>
      ) : (
        orders.map((o) => (
          <div className="shop-card" key={o.id}>
            <div className="shop-row" style={{ border: 0 }}>
              <div>
                <strong>{o.publicCode}</strong>
                <div style={{ color: "#6e6a5c" }}>
                  {new Date(o.createdAt).toLocaleString("tr-TR")} · {o.status}
                </div>
                <div style={{ fontSize: "0.9rem" }}>{o.totalText}</div>
              </div>
              <Link className="shop-btn shop-btn--ghost" href={`/hesabim/siparis/${o.publicCode}`}>
                Detay
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
