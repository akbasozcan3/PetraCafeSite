import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";
const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  // Vercel/Netlify kendi runtime'ını kullanır; standalone yalnızca VPS/PM2 için
  ...(isVercel || isNetlify ? {} : { output: "standalone" as const }),
  poweredByHeader: false,
  compress: true,
  outputFileTracingIncludes: {
    "/*": ["./lib/db/schema.sql", "./data/content.json"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  serverExternalPackages: ["pg", "nodemailer", "bcryptjs"],
  webpack: (config, { dir }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": dir,
    };
    return config;
  },
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 3600,
  },

  async redirects() {
    return [
      {
        source: "/menu/ana-yemekler",
        destination: "/menu/izgaralar",
        permanent: true,
      },
      {
        source: "/menu/baslangiclar",
        destination: "/menu/salatalar",
        permanent: true,
      },
      {
        source: "/menu/italyan-kokteyller",
        destination: "/menu/kokteyller",
        permanent: true,
      },
      {
        source: "/urunler",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/urunler/:path*",
        destination: "/menu/:path*",
        permanent: true,
      },
      {
        source: "/index.htm",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.htm/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug/:slugDup",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/api/content", destination: "/api/v1/content" },
      { source: "/api/health", destination: "/api/v1/health" },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/uploads/:path*.svg",
        headers: [
          { key: "Content-Type", value: "image/svg+xml; charset=utf-8" },
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/uploads/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/assets/img/hero-cephe.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/img/hero-mobile.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/img/hero-ic.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/img/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/js/hero/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/css/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/js/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
