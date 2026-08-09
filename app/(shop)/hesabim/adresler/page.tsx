"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Address = {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressLine: string;
};

function newId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `addr-${Date.now()}`;
}

export default function AdreslerPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/v1/customer/profile", { credentials: "include" });
    if (!res.ok) {
      setError("Giriş gerekli.");
      return;
    }
    const data = await res.json();
    setAddresses(data.customer?.addresses || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(list: Address[]) {
    setError("");
    const res = await fetch("/api/v1/customer/profile", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addresses: list }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Kayıt başarısız");
    else {
      setMsg("Adresler kaydedildi.");
      setAddresses(data.customer?.addresses || list);
    }
  }

  return (
    <>
      <h1>Adreslerim</h1>
      <p className="lead">
        <Link href="/hesabim">← Hesabım</Link>
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}
      {msg ? <div className="shop-alert shop-alert--ok">{msg}</div> : null}

      {addresses.map((a, idx) => (
        <div className="shop-card" key={a.id}>
          {(
            [
              ["title", "Başlık"],
              ["fullName", "Ad Soyad"],
              ["phone", "Telefon"],
              ["city", "Şehir"],
              ["district", "İlçe"],
              ["addressLine", "Adres"],
            ] as const
          ).map(([key, label]) => (
            <div className="shop-field" key={key}>
              <label>{label}</label>
              <input
                value={a[key]}
                onChange={(e) => {
                  const next = [...addresses];
                  next[idx] = { ...a, [key]: e.target.value };
                  setAddresses(next);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="shop-btn shop-btn--ghost"
            onClick={() => void save(addresses.filter((x) => x.id !== a.id))}
          >
            Sil
          </button>
        </div>
      ))}

      <div className="shop-actions">
        <button
          type="button"
          className="shop-btn shop-btn--ghost"
          onClick={() =>
            setAddresses([
              ...addresses,
              {
                id: newId(),
                title: "Ev",
                fullName: "",
                phone: "",
                city: "İstanbul",
                district: "Çekmeköy",
                addressLine: "",
              },
            ])
          }
        >
          Yeni adres
        </button>
        <button type="button" className="shop-btn" onClick={() => void save(addresses)}>
          Kaydet
        </button>
      </div>
    </>
  );
}
