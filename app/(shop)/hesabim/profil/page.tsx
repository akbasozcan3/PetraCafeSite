"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/v1/customer/profile", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setName(data.customer?.name || "");
      setPhone(data.customer?.phone || "");
      setEmail(data.customer?.email || "");
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/v1/customer/profile", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Kayıt başarısız");
    else setMsg("Profil güncellendi.");
  }

  return (
    <>
      <h1>Profilim</h1>
      <p className="lead">
        <Link href="/hesabim">← Hesabım</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {msg ? <div className="shop-alert shop-alert--ok">{msg}</div> : null}
      <form className="shop-card" onSubmit={save}>
        <div className="shop-field">
          <label>E-posta</label>
          <input value={email} disabled />
        </div>
        <div className="shop-field">
          <label>Ad Soyad</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="shop-field">
          <label>Telefon</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button className="shop-btn" type="submit">
          Kaydet
        </button>
      </form>
    </>
  );
}
