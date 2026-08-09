"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function GirisForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/hesabim";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/v1/customer/session", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Giriş başarısız");
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Giriş Yap</h1>
      <p className="lead">
        Hesabınız yok mu? <Link href={`/hesabim/kayit?next=${encodeURIComponent(next)}`}>Kayıt Ol</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      <form className="shop-card" onSubmit={onSubmit}>
        <div className="shop-field">
          <label>E-posta</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="shop-field">
          <label>Şifre</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="shop-actions">
          <button className="shop-btn" type="submit" disabled={busy}>
            {busy ? "…" : "Giriş Yap"}
          </button>
          <Link className="shop-btn shop-btn--ghost" href="/hesabim/sifremi-unuttum">
            Şifremi Unuttum
          </Link>
        </div>
      </form>
    </>
  );
}

export default function GirisPage() {
  return (
    <Suspense fallback={<p className="lead">Yükleniyor…</p>}>
      <GirisForm />
    </Suspense>
  );
}
