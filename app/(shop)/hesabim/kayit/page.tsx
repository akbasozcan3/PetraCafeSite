"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function KayitForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/hesabim";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/v1/customer/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setMsg(data.message || "Kayıt tamam.");
      setTimeout(() => router.push(next), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Kayıt Ol</h1>
      <p className="lead">
        Zaten üye misiniz? <Link href={`/hesabim/giris?next=${encodeURIComponent(next)}`}>Giriş Yap</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {msg ? <div className="shop-alert shop-alert--ok">{msg}</div> : null}
      <form className="shop-card" onSubmit={onSubmit}>
        {(
          [
            ["name", "Ad Soyad", "text"],
            ["email", "E-posta", "email"],
            ["phone", "Telefon", "tel"],
            ["password", "Şifre", "password"],
            ["passwordConfirm", "Şifre Tekrarı", "password"],
          ] as const
        ).map(([key, label, type]) => (
          <div className="shop-field" key={key}>
            <label>{label}</label>
            <input
              type={type}
              required
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <button className="shop-btn" type="submit" disabled={busy}>
          {busy ? "…" : "Kayıt Ol"}
        </button>
      </form>
    </>
  );
}

export default function KayitPage() {
  return (
    <Suspense fallback={<p className="lead">Yükleniyor…</p>}>
      <KayitForm />
    </Suspense>
  );
}
