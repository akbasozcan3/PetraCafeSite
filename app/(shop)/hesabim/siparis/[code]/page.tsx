"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

function SiparisInner() {
  const params = useParams();
  const search = useSearchParams();
  const code = String(params.code || "");
  const t = search.get("t") || "";
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void (async () => {
      const q = new URLSearchParams({ id: code });
      if (t) q.set("t", t);
      const res = await fetch(`/api/v1/customer/orders?${q}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sipariş bulunamadı veya erişim yok.");
        return;
      }
      setOrder(data.order);
    })();
  }, [code, t]);

  return (
    <>
      <h1>Sipariş {code}</h1>
      <p className="lead">
        <Link href="/hesabim/siparisler">← Siparişlerim</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {order ? (
        <div className="shop-card">
          <p>
            <strong>Durum:</strong> {String(order.status)}
          </p>
          <p>
            <strong>Ödeme:</strong> {String(order.paymentMethod)}
          </p>
          <p>
            <strong>Ürünler:</strong> {String(order.totalText || "")}
          </p>
          <p style={{ color: "#6e6a5c", fontSize: "0.9rem" }}>
            Kart bilgisi saklanmaz. Sipariş onayı fırın tarafından yapılır.
          </p>
        </div>
      ) : null}
    </>
  );
}

export default function SiparisDetayPage() {
  return (
    <Suspense fallback={<p className="lead">Yükleniyor…</p>}>
      <SiparisInner />
    </Suspense>
  );
}
