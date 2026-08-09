"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartLine = { slug: string; ad: string; fiyat?: string; qty: number };
const KEY = "firinci_cart_v1";

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeCart(list: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("firinci-cart"));
}

export default function SepetPage() {
  const [items, setItems] = useState<CartLine[]>([]);

  useEffect(() => {
    setItems(readCart());
    const sync = () => setItems(readCart());
    window.addEventListener("storage", sync);
    window.addEventListener("firinci-cart", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("firinci-cart", sync);
    };
  }, []);

  function setQty(slug: string, qty: number) {
    const next = readCart()
      .map((x) => ((x.slug || x.ad) === slug ? { ...x, qty } : x))
      .filter((x) => x.qty > 0);
    writeCart(next);
    setItems(next);
  }

  return (
    <>
      <h1>Sepet</h1>
      <p className="lead">Ürünleri kontrol edin, ardından siparişi tamamlayın.</p>

      {!items.length ? (
        <div className="shop-card">
          <p>Sepetiniz boş.</p>
          <div className="shop-actions">
            <Link className="shop-btn" href="/urunler/urunler">
              Ürünlere git
            </Link>
          </div>
        </div>
      ) : (
        <div className="shop-card">
          {items.map((item) => {
            const key = item.slug || item.ad;
            return (
              <div className="shop-row" key={key}>
                <div>
                  <strong>
                    {item.slug ? (
                      <Link href={`/urunler/${item.slug}`}>{item.ad}</Link>
                    ) : (
                      item.ad
                    )}
                  </strong>
                  {item.fiyat ? <div style={{ color: "#6e6a5c" }}>{item.fiyat}</div> : null}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button type="button" className="shop-btn shop-btn--ghost" onClick={() => setQty(key, (item.qty || 1) - 1)}>
                    −
                  </button>
                  <span>{item.qty || 1}</span>
                  <button type="button" className="shop-btn shop-btn--ghost" onClick={() => setQty(key, (item.qty || 1) + 1)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <div className="shop-actions">
            <Link className="shop-btn" href="/checkout">
              Siparişi Tamamla
            </Link>
            <button
              type="button"
              className="shop-btn shop-btn--ghost"
              onClick={() => {
                writeCart([]);
                setItems([]);
              }}
            >
              Sepeti Temizle
            </button>
          </div>
        </div>
      )}
    </>
  );
}
