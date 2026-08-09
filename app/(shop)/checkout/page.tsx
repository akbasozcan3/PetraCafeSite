"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type CartLine = { slug: string; ad: string; fiyat?: string; qty: number };
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Array<{
    id: string;
    title: string;
    fullName: string;
    phone: string;
    city: string;
    district: string;
    addressLine: string;
  }>;
};

const KEY = "firinci_cart_v1";

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [mode, setMode] = useState<"choose" | "guest" | "ready">("choose");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("Çekmeköy");
  const [addressLine, setAddressLine] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(list) ? list : []);
    } catch {
      setItems([]);
    }
    void (async () => {
      const res = await fetch("/api/v1/customer/session", { credentials: "include" });
      const data = await res.json();
      if (data.customer) {
        setCustomer(data.customer);
        setMode("ready");
        setName(data.customer.name || "");
        setEmail(data.customer.email || "");
        setPhone(data.customer.phone || "");
        const def = data.customer.addresses?.[0];
        if (def) {
          setCity(def.city || "İstanbul");
          setDistrict(def.district || "");
          setAddressLine(def.addressLine || "");
        }
      }
    })();
  }, []);

  const summary = useMemo(
    () => items.map((i) => `${i.ad} x${i.qty}`).join(", "),
    [items]
  );

  async function placeOrder() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/v1/customer/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          paymentMethod,
          note,
          guestName: name,
          guestEmail: email,
          guestPhone: phone,
          address:
            paymentMethod === "store_pickup"
              ? null
              : {
                  title: "Teslimat",
                  fullName: name,
                  phone,
                  city,
                  district,
                  addressLine,
                },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sipariş başarısız");
      localStorage.setItem(KEY, "[]");
      window.dispatchEvent(new Event("firinci-cart"));
      const t = data.accessToken ? `?t=${encodeURIComponent(data.accessToken)}` : "";
      router.push(`/hesabim/siparis/${data.order.publicCode}${t}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata");
    } finally {
      setBusy(false);
    }
  }

  if (!items.length) {
    return (
      <>
        <h1>Checkout</h1>
        <div className="shop-card">
          <p>Sepet boş.</p>
          <Link className="shop-btn" href="/urunler/urunler">
            Ürünlere dön
          </Link>
        </div>
      </>
    );
  }

  if (mode === "choose") {
    return (
      <>
        <h1>Checkout</h1>
        <p className="lead">{summary}</p>
        <div className="shop-card">
          <h2 style={{ marginTop: 0 }}>Nasıl devam edelim?</h2>
          <p>Üye olmadan da sipariş verebilirsiniz.</p>
          <div className="shop-actions">
            <Link className="shop-btn" href="/hesabim/giris?next=/checkout">
              Giriş Yap
            </Link>
            <Link className="shop-btn shop-btn--ghost" href="/hesabim/kayit?next=/checkout">
              Kayıt Ol
            </Link>
            <button type="button" className="shop-btn shop-btn--ghost" onClick={() => setMode("guest")}>
              Üye olmadan devam et
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Checkout</h1>
      <p className="lead">
        {customer ? `Hoş geldiniz, ${customer.name}` : "Misafir sipariş"} — {summary}
      </p>
      {error ? <div className="shop-alert shop-alert--error">{error}</div> : null}

      <div className="shop-card">
        <h2 style={{ marginTop: 0 }}>İletişim</h2>
        <div className="shop-field">
          <label>Ad Soyad</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="shop-field">
          <label>Telefon</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="shop-field">
          <label>E-posta (opsiyonel, onay için)</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      {paymentMethod !== "store_pickup" && (
        <div className="shop-card">
          <h2 style={{ marginTop: 0 }}>Teslimat adresi</h2>
          <div className="shop-field">
            <label>Şehir</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="shop-field">
            <label>İlçe</label>
            <input value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div className="shop-field">
            <label>Adres</label>
            <textarea rows={3} value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
          </div>
        </div>
      )}

      <div className="shop-card">
        <h2 style={{ marginTop: 0 }}>Ödeme</h2>
        <p style={{ color: "#6e6a5c", fontSize: "0.9rem" }}>
          Kart numarası / CVV saklanmaz. Online kart ödemesi için ayrı ödeme sağlayıcısı gerekir.
        </p>
        <div className="shop-field">
          <label>Ödeme yöntemi</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash_on_delivery">Kapıda ödeme (nakit/kart terminal)</option>
            <option value="store_pickup">Mağazadan teslim / yerinde ödeme</option>
            <option value="whatsapp">WhatsApp ile onayla</option>
          </select>
        </div>
        <div className="shop-field">
          <label>Sipariş notu</label>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="shop-actions">
          <button type="button" className="shop-btn" disabled={busy} onClick={() => void placeOrder()}>
            {busy ? "Gönderiliyor…" : "Siparişi Onayla"}
          </button>
          <Link className="shop-btn shop-btn--ghost" href="/sepet">
            Sepete dön
          </Link>
        </div>
      </div>
    </>
  );
}
