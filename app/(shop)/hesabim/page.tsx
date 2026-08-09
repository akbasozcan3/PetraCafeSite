"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
};

export default function HesabimPage() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/v1/customer/session", { credentials: "include" });
      const data = await res.json();
      setCustomer(data.customer || null);
      setLoading(false);
    })();
  }, []);

  async function logout() {
    await fetch("/api/v1/customer/session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setCustomer(null);
  }

  if (loading) return <p className="lead">Yükleniyor…</p>;

  if (!customer) {
    return (
      <>
        <h1>Hesabım</h1>
        <p className="lead">Giriş yapın veya üye olmadan sipariş verin.</p>
        <div className="shop-card">
          <div className="shop-actions">
            <Link className="shop-btn" href="/hesabim/giris">
              Giriş Yap
            </Link>
            <Link className="shop-btn shop-btn--ghost" href="/hesabim/kayit">
              Kayıt Ol
            </Link>
            <Link className="shop-btn shop-btn--ghost" href="/sepet">
              Sepete git
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Merhaba, {customer.name}</h1>
      <p className="lead">
        {customer.email}
        {!customer.emailVerified ? " · E-posta doğrulanmadı" : " · Doğrulandı"}
      </p>
      <div className="shop-card">
        <div className="shop-actions" style={{ flexDirection: "column", alignItems: "stretch" }}>
          <Link className="shop-btn shop-btn--ghost" href="/hesabim/profil">
            Profilim
          </Link>
          <Link className="shop-btn shop-btn--ghost" href="/hesabim/siparisler">
            Siparişlerim
          </Link>
          <Link className="shop-btn shop-btn--ghost" href="/hesabim/adresler">
            Adreslerim
          </Link>
          <Link className="shop-btn shop-btn--ghost" href="/sepet">
            Sepet
          </Link>
          <button type="button" className="shop-btn" onClick={() => void logout()}>
            Çıkış Yap
          </button>
        </div>
      </div>
    </>
  );
}
