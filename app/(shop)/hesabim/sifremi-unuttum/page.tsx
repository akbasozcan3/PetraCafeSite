"use client";

import { useState } from "react";
import Link from "next/link";

export default function SifremiUnuttumPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/v1/customer/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "request", email }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Hata");
    else setMsg(data.message);
  }

  return (
    <>
      <h1>Şifremi Unuttum</h1>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {msg ? <div className="shop-alert shop-alert--ok">{msg}</div> : null}
      <form className="shop-card" onSubmit={onSubmit}>
        <div className="shop-field">
          <label>E-posta</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="shop-btn" type="submit">
          Sıfırlama bağlantısı gönder
        </button>
      </form>
      <p className="lead">
        <Link href="/hesabim/giris">Girişe dön</Link>
      </p>
    </>
  );
}
