# Selçuklu Pilavcısı — Restaurant Platform & Headless CMS

A modern, high-performance web platform and headless administration panel designed for restaurant, cafe, and food service businesses. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL** with zero-config JSON fallback.

---

## 🚀 Key Features

- **Next.js 16 App Router**: Server-Side Rendered (SSR) homepage, catalog, blog, and dynamic menu pages.
- **Unified Headless CMS (`/admin`)**: Real-time management of brand identity, menu categories, products, prices, hero banners, gallery, customer reviews, and business hours.
- **Flexible Data Layer**: Hybrid storage engine using **PostgreSQL** (Neon / Supabase / Vercel Postgres) for cloud deployment and safe **JSON file fallback** for local offline development.
- **Enterprise Security**: JWT authentication with `jose` and `bcryptjs`, HttpOnly cookies, secure CORS / same-origin assertion, and rate-limiting.
- **Asset Storage**: Integrated with **Vercel Blob** for cloud media uploads, with automatic inline base64 fallback.
- **SEO & Social Optimization**: Dynamic Schema.org structured data (JSON-LD), OpenGraph cards, Twitter Cards, auto-generated `sitemap.xml`, and `robots.txt`.
- **Zero-Friction Ordering**: Direct phone & WhatsApp order links without requiring customer login or cart drop-off.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | Fullstack React framework (App Router) |
| **React 19** | Component architecture & modern hooks |
| **TypeScript 5** | Strict type safety and maintainability |
| **Tailwind CSS 4** | Utility-first responsive styling |
| **PostgreSQL / pg** | Persistent relational database |
| **Vercel Blob** | Cloud object storage for media & uploads |
| **Lucide Icons** | Clean, modern iconography |

---

## 📋 Prerequisites

- **Node.js**: `v20.0.0` or higher (recommended: Node 22 LTS)
- **Package Manager**: `npm` (included with Node.js)
- **Database (Optional for local, recommended for production)**: PostgreSQL / Neon connection string

---

## ⚡ Quickstart

### 1. Clone & Install
```bash
git clone https://github.com/akbasozcan3/PetraCafeSite.git
cd PetraCafeSite
npm install
```

### 2. Environment Configuration
Copy the template environment file:
```bash
cp .env.example .env.local
```
Configure your secrets in `.env.local` (e.g., `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DATABASE_URL`).

### 3. Initialize Admin Account
Create your first administrative user:
```bash
npm run init-admin -- your-email@example.com YourSecurePassword123!
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3010](http://localhost:3010)** in your browser.

- **Public Website:** `http://localhost:3010/`
- **Admin Dashboard:** `http://localhost:3010/admin/login`

---

## 📁 Project Architecture

```text
├── app/                  # Next.js 16 App Router pages and API routes
│   ├── (shop)/           # Public-facing shop & content pages (menu, about, legal)
│   ├── admin/            # CMS Dashboard panels & authentication screens
│   ├── api/              # Secure backend REST API endpoints
│   ├── layout.tsx        # Root HTML layout and global providers
│   ├── page.tsx          # Homepage server component
│   ├── robots.ts         # Automated robots.txt generator
│   └── sitemap.ts        # Automated sitemap.xml generator
├── assets/               # Source media, vendor bundles, and branding assets
├── components/           # Reusable modular UI components
│   ├── admin/            # CMS management forms, inputs, tables, and dialogs
│   ├── home/             # Homepage feature sections (Hero, Menu, Gallery, FAQ)
│   ├── shop/             # Product cards and category filters
│   └── site/             # Navigation, footer, and brand shells
├── data/                 # Seed data, initial content JSON, and database migrations
├── docs/                 # Production deployment and integration documentation
├── lib/                  # Application core libraries (Auth, DB, Security, Mail)
├── public/               # Static web assets (icons, favicons, fonts)
└── scripts/              # Automated build, sync, and database management scripts
```

---

## 📦 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Starts Next.js development server on port 3010 |
| **Type Check** | `npm run typecheck` | Validates TypeScript compilation with 0 errors |
| **Production Build** | `npm run build:vercel` | Synchronizes product pages and compiles production bundle |
| **Preflight** | `npm run preflight` | Runs type checking followed by full production build |
| **Start** | `npm start` | Runs production server on port 3010 |
| **Admin Init** | `npm run init-admin` | Seeds an administrator account into DB and JSON |
| **DB Migrate** | `npm run db:migrate` | Runs database schema migrations |

---

## 🚢 Production Deployment (Vercel)

1. Push your repository to **GitHub** (public or private).
2. Import the project into **Vercel**.
3. In **Settings → Environment Variables**, configure:
   - `DATABASE_URL`: PostgreSQL connection string (e.g. from Vercel Storage → Neon).
   - `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Your initial dashboard login credentials.
   - `BLOB_READ_WRITE_TOKEN`: Token from Vercel Storage → Blob Store.
4. Set Build Command: `npm run build:vercel`.
5. Deploy!

For in-depth publishing details, see **[docs/PUBLISH.md](./docs/PUBLISH.md)**.

---

## 📄 License

Private and proprietary. All rights reserved.
