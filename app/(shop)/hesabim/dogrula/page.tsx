"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function DogrulaInner() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [msg, setMsg] = useState("Doğrulanıyor…");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!token) {
      setMsg("Token eksik.");
      return;
    }
    void (async () => {
      const res = await fetch("/api/v1/customer/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) {
        setOk(true);
        setMsg("E-posta doğrulandı.");
      } else {
        setMsg(data.error || "Doğrulama başarısız.");
      }
    })();
  }, [token]);

  return (
    <>
      <h1>E-posta Doğrulama</h1>
      <div className={`shop-alert ${ok ? "shop-alert--ok" : "shop-alert--error"}`}>{msg}</div>
      <Link className="shop-btn" href="/hesabim">
        Hesabıma git
      </Link>
    </>
  );
}

export default function DogrulaPage() {
  return (
    <Suspense fallback={<p className="lead">Yükleniyor…</p>}>
      <DogrulaInner />
    </Suspense>
  );
}
