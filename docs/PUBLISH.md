# Production Deployment Checklist (Vercel)

This application is built with the **Next.js App Router**: SSR Homepage (`/`), Menu/Catalog (`/menu`), Blog (`/blog`), and Headless Admin Dashboard (`/admin`).

Ordering is powered directly by WhatsApp and telephone lines without friction.

---

## 1. Environment Variables (Required)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Neon / Supabase / Vercel Postgres) for persistent CMS and admin accounts. |
| `ADMIN_EMAIL` | Administrator login email address for the dashboard (`/admin`). |
| `ADMIN_PASSWORD` | Administrator login password. |
| `SITE_URL` | Production public HTTPS origin (e.g. `https://petra-cafe-site.vercel.app`). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob access token for media uploads. |

---

## 2. Recommended / Optional Services

| Variable | Description |
|----------|-------------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | Transactional email settings for customer notifications and contact form messages. |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Instant Telegram bot notifications for contact requests. |

---

## 3. Database Persistence

Serverless platforms like Vercel have read-only temporary file systems.
- For all edits made in the admin panel (`/admin`) to persist permanently across serverless instances, connect a PostgreSQL database via **Vercel Storage → Neon** (Free Tier available).
- The application will automatically create all necessary tables on first boot with zero manual SQL configuration.

---

## 4. Build and Verify

To verify locally before pushing:
```bash
npm run preflight    # Runs full typecheck + next build:vercel
```

In Vercel Project Settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build:vercel`
- **Output Directory**: `.next`

---

## 5. Post-Deployment Smoke Test

- [ ] `/` — Homepage renders Hero, Services, Menu, Gallery, and Contact sections cleanly.
- [ ] `/menu` — Category filter and product showcase load without errors.
- [ ] `/admin` — Login works with credentials from environment variables.
- [ ] `/admin/site` — Updates to brand name and metadata cascade across the site.
- [ ] Contact CTA — Phone and WhatsApp buttons trigger direct communication.
