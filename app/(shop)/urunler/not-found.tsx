import Link from "next/link";

export default function UrunlerNotFound() {
  return (
    <div className="shop-card">
      <h1>Sayfa bulunamadı</h1>
      <p className="lead">Aradığınız ürün veya kategori mevcut değil.</p>
      <div className="shop-actions">
        <Link className="shop-btn" href="/urunler">
          Ürünlere dön
        </Link>
      </div>
    </div>
  );
}
