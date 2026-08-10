"use client";

export default function UrunlerError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="shop-card">
      <h1>Bir sorun oluştu</h1>
      <p className="lead">
        Ürünler şu anda yüklenemedi. Lütfen tekrar deneyin.
      </p>
      <button type="button" className="shop-btn" onClick={() => reset()}>
        Yeniden dene
      </button>
    </div>
  );
}
