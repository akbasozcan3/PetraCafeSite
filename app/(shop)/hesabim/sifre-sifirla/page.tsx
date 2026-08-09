"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetInner() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/v1/customer/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "confirm", token, password }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Hata");
    else setMsg("Şifre güncellendi. Giriş yapabilirsiniz.");
  }

  return (
    <>
      <h1>Şifre Sıfırla</h1>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {msg ? (
        <div className="shop-alert shop-alert--ok">
          {msg} <Link href="/hesabim/giris">Giriş Yap</Link>
        </div>
      ) : (
        <form className="shop-card" onSubmit={onSubmit}>
          <div className="shop-field">
            <label>Yeni şifre</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="shop-btn" type="submit">
            Kaydet
          </button>
        </form>
      )}
    </>
  );
}

export default function SifreSifirlaPage() {
  return (
    <Suspense fallback={<p className="lead">Yükleniyor…</p>}>
      <ResetInner />
    </Suspense>
  );
}
