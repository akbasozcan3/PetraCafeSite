# Taşdelen Fırıncı — Production Kurulum

Next.js 16 App Router: SSR ana sayfa (`/`), katalog (`/urunler`), blog (`/blog`), admin (`/admin`).  
Sipariş: WhatsApp / telefon — web sepet ve üyelik yok.  
Yayın adımları: **[PUBLISH.md](./PUBLISH.md)**.

## Gereksinimler

- Node.js 20+
- npm

## Kurulum

```bash
cp .env.example .env.local
# JWT_SECRET değiştirin (production'da zorunlu, ≥32 karakter)

npm install
npm run init-admin -- ozcanakbas38@gmail.com Sifre123!
npm run seed-content    # galeri, yorumlar, makaleler (ilk kurulum)
npm run import-menu     # menüyü içe aktar (gerekirse)
npm run dev
```

| Adres | URL |
|-------|-----|
| **Site** | http://localhost:3010/ |
| **Admin** | http://localhost:3010/admin/login |

> Port **3010** kullanılır. `3000` başka projeler için ayrılmış olabilir.

## Admin giriş

| Alan | Değer |
|------|-------|
| E-posta | `data/auth.json` veya `init-admin` ile oluşturulan |
| Şifre | `init-admin` ile belirlenen |

```bash
npm run init-admin -- email@domain.com YeniSifre123!
```

Panelden **Ayarlar → Şifre Değiştir** ile şifre güncellenebilir.

## Admin paneli (13 bölüm)

| Sekme | İşlev |
|-------|-------|
| Özet | Dashboard, hızlı erişim |
| Menü / Ürünler | 14 kategori, ürün CRUD, favori yıldız, linkler |
| Navbar | Logo, menü linkleri, telefon CTA |
| Görseller | Hero, hakkımızda, OG görselleri (yükleme) |
| Metinler | Hero, marquee, hakkımızda |
| Bölümler | Menü, galeri, yorumlar, SSS başlıkları |
| Pastalar | Özel pasta bölümü metin + görseller |
| Galeri | Ana sayfa galeri kartları |
| Yorumlar | Müşteri yorumları |
| Makaleler | Blog kartları (slug → `/blog/slug/slug`) |
| Duyuru | Üst duyuru bandı |
| İletişim | Telefon, adres, WhatsApp, Instagram |
| Ayarlar | Şifre değiştir |

## API

| Uç | Açıklama |
|----|----------|
| `GET /api/content` | Public site içeriği (rewrite → v1) |
| `GET /api/v1/content` | Public site içeriği |
| `GET /api/v1/health` | Sağlık kontrolü |
| `POST /api/v1/auth/login` | Admin giriş (rate limit: 8/dk) |
| `GET /api/v1/auth/session` | Oturum kontrolü |
| `POST /api/v1/auth/session` | Çıkış |
| `GET /api/v1/admin/content` | Admin içerik (auth) |
| `PUT /api/v1/admin/content` | İçerik güncelle (auth) |
| `POST /api/v1/admin/upload` | Görsel yükle (auth) |
| `PUT /api/v1/admin/settings` | Şifre değiştir (auth) |
| `GET /api/static-html/[...path]` | Uzantısız HTML sayfaları (`/urunler/*`, `/blog/*`) |

## Mimari

```
public/          → Next.js tarafından sunulan statik dosyalar
  app/page.tsx   → Ana sayfa (/)
  urunler/       → Ürün kategori sayfaları (uzantısız HTML)
  blog/          → Blog sayfaları
  assets/        → CSS, JS, görseller (junction → /assets)
data/
  content.json   → CMS veritabanı (JSON)
  auth.json      → Admin hesabı (bcrypt)
app/             → Next.js admin + API
proxy.ts         → Admin auth + uzantısız HTML Content-Type düzeltmesi
```

**CMS akışı:** Admin kaydeder → `data/content.json` → statik sayfalar `GET /api/content` ile yükler → `cms-ext.js` + `content.js` DOM'u günceller.

**Uzantısız sayfalar:** `/urunler/ekmek-cesitleri/ekmek-cesitleri` gibi linkler `proxy.ts` üzerinden `text/html` olarak sunulur (indirme sorunu giderildi).

## Production (VPS)

```bash
cp .env.example .env.local
# JWT_SECRET doldurun (min 32 karakter, benzersiz)
# SITE_URL=https://www.firincitasdelen.com.tr

npm install
npm run init-admin -- admin@firincitasdelen.com.tr GuvenliSifre!
npm run build
PORT=3010 NODE_ENV=production npm start
```

Standalone (önerilen):

```bash
npm run build
# Çıktı: .next/standalone (+ public + static otomatik kopyalanır)
cd .next/standalone
PORT=3010 NODE_ENV=production node server.js
```

PM2:

```bash
pm2 start npm --name firinci -- start -- -p 3010
# veya standalone:
pm2 start .next/standalone/server.js --name firinci --cwd .next/standalone
pm2 save
```

**Kalıcı dosyalar** (volume mount):
- `data/content.json`
- `data/auth.json`
- `public/uploads/`

### Yayın öncesi kontrol

- [ ] `JWT_SECRET` dolu (≥32 karakter)
- [ ] `npm run typecheck` temiz
- [ ] `npm run build` başarılı
- [ ] `GET /api/v1/health` → `{"ok":true}`
- [ ] `GET /api/content` menü/görseller geliyor
- [ ] Admin login çalışıyor (`/admin/login`)
- [ ] Ana sayfa: `https://DOMAIN/`
- [ ] HTTPS + Nginx reverse proxy

### Nginx

```nginx
server {
  listen 80;
  server_name www.firincitasdelen.com.tr;

  location / {
    proxy_pass http://127.0.0.1:3010;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Vercel (demo / yayın)

Bu proje Vercel'e hazırdır. Windows junction'ları build öncesi gerçek dosyaya çevrilir.

### 1) GitHub'a yükle

```bash
git init
git add .
git commit -m "Fırın CMS — Vercel demo ready"
# GitHub'da boş repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI/REPO.git
git push -u origin main
```

### 2) Vercel import

1. [vercel.com](https://vercel.com) → **Add New Project** → GitHub repo
2. Framework: **Next.js** (otomatik)
3. Build Command: `npm run build:vercel` (vercel.json'da tanımlı)
4. Environment Variables:

| Değişken | Örnek | Zorunlu |
|----------|--------|---------|
| `JWT_SECRET` | 48+ hex karakter | Evet |
| `ADMIN_EMAIL` | `demo@firinci.com` | Evet (demo giriş) |
| `ADMIN_PASSWORD` | güçlü şifre | Evet |
| `SITE_URL` | `https://xxx.vercel.app` | Evet |
| `ALLOW_ENV_ADMIN` | `true` | Önerilir |
| `DATABASE_URL` | Neon Postgres URL | Admin **kayıt** için |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Görsel yükleme için |

5. Deploy → site: `https://xxx.vercel.app` · admin: `/admin/login`

### Demo notları

- **Sadece göstermek:** JSON içerik yeter; fırıncılara link atıp gezdirirsiniz.
- **Admin'den değiştirmek:** Neon (ücretsiz) bağla → `npm run db:setup` + `npm run db:migrate` (lokal, DATABASE_URL ile) → Vercel'e aynı `DATABASE_URL`'i ekle.
- **Görsel yükleme:** Vercel → Storage → Blob → token'ı env'e ekle.

### Yayın öncesi kontrol

- [ ] `npm run typecheck` temiz
- [ ] `npm run build:vercel` başarılı
- [ ] `GET /api/v1/health` → ok
- [ ] Ana sayfa + `/admin/login` açılıyor
- [ ] Telefon / WhatsApp / Instagram admin'den değişiyor (Postgres varken)

## Güvenlik

- `JWT_SECRET` production'da benzersiz olmalı
- `data/auth.json` repoya eklenmemeli (.gitignore)
- Admin `/admin` — robots.txt ile indexlenmez
- Login rate limit: 8 deneme / dakika

## Yardımcı scriptler

```bash
npm run init-admin -- email sifre   # Admin hesabı oluştur
npm run seed-content               # Boş galeri/yorum/makale doldur
npm run import-menu                # Menüyü CMS'e aktar
npm run build:vercel               # Vercel build (standalone yok)
npm run preflight                  # typecheck + vercel build
```

## Notlar

- `npm run sync-public` build öncesi `assets` / `urunler` / `blog` klasörlerini `public/` altına gerçek kopya olarak yazar (Vercel uyumu).
- Eski Express sunucusu kaldırıldı; tüm backend Next.js üzerinden çalışır.
