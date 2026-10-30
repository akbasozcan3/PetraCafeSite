# INTEGRATION PRODUCTION REPORT

Tarih: 2026-08-10  
Proje: Taşdelen Fırıncı CMS  
Mimari: `lib/integrations` + `IntegrationProvider` registry (Getir vb. eklenebilir)

---

## Trendyol Go

| Alan | Durum |
|------|--------|
| Authentication | Basic Auth (API Key + API Secret), User-Agent, Supplier ID |
| Connection test | GET `/suppliers/{id}/restaurants` |
| Menu | GET `.../restaurants/{restaurantId}/products` |
| Products / Sync | CMS upsert (`trendyolId` / `externalId`) |
| Orders | GET packages + picked/invoiced/ship/deliver/unsupplied |
| Webhooks | `/api/integrations/trendyol/webhook` (Basic Auth) |
| Payment | **Desteklenmiyor** |

### Unsupported
- Web → Trendyol sipariş push  
- Kart ödemesi  

---

## Yemeksepeti

Kaynak: [Partner API](https://developer.yemeksepeti.com/api-specifications)

| Alan | Durum |
|------|--------|
| Authentication | OAuth2 Client Credentials → Bearer token (2h cache) |
| Connection test | GET `/v2/chains/{chain_id}/vendors/{vendor_id}/status` |
| Menu | GET `/v2/chains/{chain_id}/vendors/{vendor_id}/catalog` |
| Products / Sync | CMS upsert (`yemeksepetiId` / `externalId`) |
| Orders | GET `/v2/chains/{chain_id}/vendors/{vendor_id}/orders` |
| Webhooks | `/api/integrations/yemeksepeti/webhook` (Portal secret) |
| Payment | **Desteklenmiyor** |

### Unsupported
- Partner Portal onboarding olmadan canlı kullanım  
- Catalog Assortment push (YS kataloğuna toplu yazma) bu panelde yok  
- Web → YS sipariş oluşturma  
- Kart ödemesi  

---

## Admin

- `/admin/integrations` — hub kartları (Bağlı / Bağlı değil)
- `/admin/integrations/trendyol-go` — ayarlar
- `/admin/integrations/yemeksepeti` — ayarlar
- `/admin/integrations/orders` — filtre: Tümü / Trendyol Go / Yemeksepeti
- `/admin/trendyol-go` → redirect hub detail
- Secret masking, enable/disable, test, sync raporları

## Security

- AES-GCM secrets (`JWT_SECRET`)
- `integrations:manage` yetkisi
- Same-origin CSRF on mutations
- Webhook auth + idempotent upsert
- Secrets not in public content API / logs / `NEXT_PUBLIC_*`

## Tests / Build

- `npm run build` çalıştırılır (sonuç commit notunda)
- Credential olmadan canlı 401 beklenir (fake success yok)

---

### ADMIN'DE GİRİLMESİ GEREKEN GERÇEK BİLGİLER

| Entegrasyon | Alan | Gerekli | Açıklama |
|-------------|------|---------|----------|
| Trendyol Go | Supplier ID | Evet | Satıcı / cari ID |
| Trendyol Go | Restaurant ID | Evet | Store ID |
| Trendyol Go | API Key | Evet | Basic Auth |
| Trendyol Go | API Secret | Evet | Basic Auth |
| Trendyol Go | Environment | Evet | production / stage |
| Trendyol Go | Agent Name | Hayır | User-Agent |
| Trendyol Go | Webhook user/pass | Webhook için | Inbound Basic |
| Yemeksepeti | Chain ID | Evet | Partner Portal |
| Yemeksepeti | Vendor ID | Evet | Outlet/store |
| Yemeksepeti | Client ID | Evet | OAuth2 |
| Yemeksepeti | Client Secret | Evet | OAuth2 |
| Yemeksepeti | Webhook Secret | Webhook için | Portal secret / Basic |
| Yemeksepeti | API Base URL | Hayır | Varsayılan partner host |
