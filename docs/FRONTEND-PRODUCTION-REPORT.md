# Frontend — sunum sitesi

**Rol:** Fırın sunum / katalog. Web sepet, üyelik, favori yok.  
Sipariş: WhatsApp + telefon. Katalog sync: Trendyol Go / Yemeksepeti (admin entegrasyonları).

## Canlı JS

| Kaynak | Görev |
|--------|--------|
| `public/assets/js/hero/*` | 3B kapı sahnesi (Three.js) |
| `HomeMotion` → GSAP / ScrollTrigger / Lenis | Scroll fade + başlık split |
| React (Next) | Nav, menü, ürün, blog, footer |

**Kaldırıldı:** `cms-ext.js`, `main.js`, `site-loader.js`, `content.js`, `content-api.js`, `scene.js`

## Yönetim

Tüm içerik `/admin` panellerinden. Kaydet → CMS → SSR sayfalar.

| Bölüm | Admin |
|-------|--------|
| Kapı / marquee / boot metni | `/admin/hero` |
| Üst menü | `/admin/navbar` |
| Ürünler & kategoriler | `/admin/menu` |
| Sayfa metinleri / ürün detay notları | `/admin/sayfalar` |
| İletişim / WhatsApp | `/admin/iletisim`, `/admin/site` |
