# Frontend üretim durumu — sunum sitesi

**Rol:** Fırın sunum / katalog sitesi. Web sepet, üyelik, favori yok.  
Sipariş: WhatsApp + telefon (+ opsiyonel Trendyol Go / Yemeksepeti entegrasyonları admin’de).

## Canlı yüzey

| Yol | Durum |
|-----|--------|
| `/` | SSR ana sayfa (CMS + hero island) |
| `/urunler` | Menü kataloğu (kart grid, İncele) |
| `/urunler/...` | Ürün detay — 1200×500 vitrin, WhatsApp / telefon |
| `/blog` | App Router blog |
| `/admin` | CMS |
| `/hesabim`, `/sepet`, `/favoriler`, `/checkout` | → `/urunler` |

## Marka

Cream / charcoal / brass (`style.css` + `storefront.css`). Playfair + Inter.

## Bilinçli olarak kaldırılan e-ticaret

Nav: giriş, üye, arama, favori, sepet. Sticky cart ve müşteri auth UI silindi.
