# TRENDYOL GO INTEGRATION REPORT

Tarih: 2026-08-10  
Proje: Taşdelen Fırıncı CMS (`www.firincitasdelen.com.tr`)  
Kaynak API: Trendyol Yemek **Meal GW** (`https://api.trendyol.com/mealgw` / stage)  
Referanslar: Partner Basic Auth (supplierId + API Key + API Secret), community/partner Meal GW path’leri; kullanıcı linki `RFKaya/Trendyol-Yemek-API` (README boş — production path’ler mealgw üzerinden alındı).

---

## Bağlanan API'ler

| Method | Path | Kullanım |
|--------|------|----------|
| GET | `/suppliers/{supplierId}/restaurants` | Bağlantı testi |
| GET | `/suppliers/{supplierId}/restaurants/{restaurantId}/products` | Menü / ürün çekme |
| GET | `/suppliers/{supplierId}/packages?storeId=…` | Sipariş listesi |
| GET | `/suppliers/{supplierId}/packages/{id}?storeId=…` | Sipariş detay (client hazır) |
| PUT | `/suppliers/{supplierId}/packages/picked` | Hazırlanıyor |
| PUT | `/suppliers/{supplierId}/packages/invoiced` | Hazır / faturalandı |
| PUT | `/suppliers/{supplierId}/packages/{id}/manual-shipped` | Yola çıktı |
| PUT | `/suppliers/{supplierId}/packages/{id}/manual-delivered` | Teslim |
| PUT | `/suppliers/{supplierId}/packages/unsupplied` | İptal / karşılanamadı |

Auth: `Authorization: Basic base64(apiKey:apiSecret)` + `User-Agent: {supplierId} - SelfIntegration`

---

## Admin ayarları

- Rota: `/admin/trendyol-go` (Sistem menüsü)
- Yetki: `integrations:manage` (owner + admin)
- Secret’lar AES-256-GCM ile saklanır (`JWT_SECRET` türev anahtar)
- Public content API’ye secret sızmaz
- Admin UI’da secret alanları maskeli; boş bırakınca mevcut değer korunur

---

## Menü/ürün entegrasyonu

- Admin → **Menüyü Getir**: Trendyol ürünlerini listeler
- Mapping yalnızca response’da bulunan alanlardan (`id`, `name`, `sellingPrice`, `description`, `images`, `category` …)

## Ürün senkronizasyonu

- **Menüyü Senkronize Et** → CMS `menu.gruplar` içine `trendyolId` ile upsert
- Yerel (trendyolId’siz) ürünler **silinmez**
- Duplicate üretmez (aynı `trendyolId` güncellenir)

## Sipariş entegrasyonu

- Admin’den Trendyol Created paketleri çekilir ve yerel store’a yazılır
- Durum aksiyonları: picked / invoiced / ship / deliver / cancel

## Webhook

- `POST /api/integrations/trendyol/webhook`
- Basic Auth (admin’de webhook user/pass)
- Idempotent upsert (`eventHash`)
- Not: Meal GW webhook kaydı partner paneline bağlı olabilir; polling desteklenir

## Ödeme

- **Desteklenmiyor:** Trendyol Meal GW, web sitede karttan ödeme alma sağlamaz
- Mevcut site WhatsApp/telefon sipariş akışı korundu

## Güvenlik

- Server-side only API client
- `NEXT_PUBLIC_*` yok
- CSRF: `assertSameOrigin` admin mutation’larda
- Webhook: timing-safe Basic Auth
- Secret’lar loglanmaz
- `.gitignore`: `data/integrations/`

## Testler

Manuel checklist (credential yokken canlı API çağrıları 401 beklenir):

1. Admin login  
2. `/admin/trendyol-go` açılır  
3. Credential kaydet → maskeli geri dönüş  
4. Connection test (geçersiz → kullanıcı dostu hata)  
5. Entegrasyon kapalıyken site/menü CMS normal çalışır  
6. Sync kapalıyken hata mesajı  
7. Webhook yetkisiz → 401  

## Build sonucu

- `npm run build`: **BAŞARILI** (Next.js 16.2.10, exit 0)
- Yeni rota: `/admin/trendyol-go` + Trendyol API route’ları build çıktısında görünüyor
- `next lint`: Next 16 CLI `lint` alt komutu bu projede dizin hatası verdi (mevcut script uyumsuzluğu); TypeScript build geçti

## Desteklenmeyen işlemler

| İşlem | Durum |
|-------|--------|
| Siteden Trendyol’a sipariş push | Meal GW self-serve dokümanda yok |
| Web sitede Trendyol kart ödemesi | Yok |
| Marketplace product V2 endpoint’leri | Yemek için mealgw kullanılır; marketplace karıştırılmaz |
| RFKaya repo endpoint’leri | Repo içeriksiz |

## Manuel yapılması gerekenler

1. Partner Panel’den Supplier ID, Restaurant ID, API Key, API Secret al  
2. Admin → Trendyol Go → kaydet → Bağlantıyı Test Et  
3. Vercel’de `DATABASE_URL` önerilir (credential kalıcılığı)  
4. Güçlü `JWT_SECRET` (≥32) zorunlu (şifreleme)  
5. İsteğe bağlı: Partner’a webhook URL + Basic Auth bildir  

---

## Admin’e girilecek alanlar (gerçek)

| Alan | Gerekli mi | Açıklama |
|------|------------|----------|
| Supplier ID | Evet | Satıcı / cari ID (path’te) |
| Restaurant ID / Store ID | Evet (menü+sipariş) | Restoran kimliği |
| API Key | Evet | Basic Auth kullanıcı |
| API Secret | Evet | Basic Auth parola |
| Environment | Evet | production / stage |
| API Base URL | Hayır | Boşsa mealgw varsayılanı |
| Agent Name | Hayır | User-Agent; boş = SelfIntegration |
| Webhook Username | Webhook kullanılacaksa | Inbound Basic Auth |
| Webhook Password | Webhook kullanılacaksa | Inbound Basic Auth |
| Entegrasyon aktif | Evet | Kapalıyken site eski CMS ile çalışır |
