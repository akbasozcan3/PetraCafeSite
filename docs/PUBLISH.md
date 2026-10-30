# Yayın (Vercel) kontrol listesi

Site artık **Next.js App Router**: ana sayfa `/`, ürünler `/urunler`, blog `/blog`, admin `/admin`.  
Müşteri üyelik / sepet / favori yok — sipariş WhatsApp veya telefon.  
`/index.htm` otomatik `/` adresine yönlenir.

## 1) Vercel ortam değişkenleri (zorunlu)

| Değişken | Açıklama |
|----------|----------|
| `JWT_SECRET` | En az 32 karakter, benzersiz. Boş/zayıf olursa production’da admin kırılır. |
| `SITE_URL` | Canlı HTTPS kök, örn. `https://www.firincitasdelen.com.tr` |
| `DATABASE_URL` | Neon/Postgres connection string (admin + CMS) |

## 2) Önerilen

| Değişken | Açıklama |
|----------|----------|
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` `SMTP_FROM` `SMTP_TO` | Rezervasyon / iletişim e-postası. Gmail: 587 + uygulama şifresi |
| `TELEGRAM_BOT_TOKEN` `TELEGRAM_CHAT_ID` | Grup bildirimleri. Chat id `-100...` |
| `BLOB_READ_WRITE_TOKEN` | Admin görsel yükleme (Vercel Blob) — **canlıda zorunlu** |

> **Önemli:** Lokal admin'den yüklenen görseller `/uploads/site/...` olarak kaydedilir; bu klasör git'e girmez.
> Vercel'de ya admin'den tekrar yükleyin (Blob URL kaydedilir) ya da lokalden:
> `npm run publish-uploads` → commit → push.

## 3) Admin kullanıcı

1. Local/Neon’da: `npm run db:setup` → `npm run db:migrate` → `npm run init-admin`
2. Production’da **demo şifre kullanma** (`demo@firinci.com` / örnek `.env`).
3. `ALLOW_ENV_ADMIN=false` tercih et (DB kullanıcısı yeterliyse).

### Database yoksa (müşteri demosu)

Site yine çalışır: içerik `data/content.json` + `public/assets/cms/` görsellerinden gelir.
Admin panelden canlı kayıt **yapılmaz** (DATABASE_URL gerekir). Demo için yeterli.
Kalıcı admin/CMS için Neon (ücretsiz) + `DATABASE_URL` ekleyin.

## 4) Build / deploy

```bash
npm run preflight          # typecheck + build:vercel
# veya Vercel Git deploy — buildCommand: npm run build:vercel
```

## 5) Yayın sonrası duman testi

- [ ] `/` — hero, menü, galeri, iletişim (CMS metinleri)
- [ ] Admin kaydet → `/` hard refresh yansıyor
- [ ] `/urunler` — kategori / ürün (sepet/giriş yok)
- [ ] Ürün detay — 1200×500 vitrin görseli + WhatsApp CTA
- [ ] `/blog` — liste + yazı
- [ ] `/admin` — giriş + içerik paneli
- [ ] `/index.htm` → `/` (308)
- [ ] `/hesabim`, `/sepet`, `/favoriler` → `/urunler`

## Rotalar

| Yol | Kaynak |
|-----|--------|
| `/` | SSR homepage (`getPublicContent`) |
| `/urunler/*` | App Router katalog |
| `/blog`, `/blog/[slug]` | App Router |
| `/hesabim/*`, `/sepet`, `/favoriler` | → `/urunler` |
| `/admin` | Yönetim paneli |
| `/index.htm` | → `/` |
