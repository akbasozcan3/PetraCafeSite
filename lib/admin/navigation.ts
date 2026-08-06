import {
  LayoutDashboard,
  Image,
  Megaphone,
  Phone,
  Settings,
  LayoutList,
  Menu,
  FileText,
  Images,
  MessageSquare,
  Cake,
  Layout,
  Search,
  Activity,
  Users,
  ScrollText,
  DatabaseBackup,
  Files,
  BookOpen,
  DoorOpen,
  Info,
  type LucideIcon,
} from "lucide-react";
import type { Permission } from "@/lib/admin/roles";

export interface AdminNavItem {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  group?: string;
  /** If set, nav item is hidden unless user has this permission */
  permission?: Permission;
}

/** Sol menü grup sırası — site bölümleriyle aynı dil */
export const adminNavGroups = [
  "Genel",
  "Ana Sayfa",
  "Site",
  "Sistem",
] as const;

export type AdminNavGroup = (typeof adminNavGroups)[number];

export const adminNavItems: AdminNavItem[] = [
  // Genel
  {
    href: "/admin",
    label: "Özet",
    description: "Site haritası ve hızlı erişim",
    icon: LayoutDashboard,
    group: "Genel",
  },
  {
    href: "/admin/sistem",
    label: "Sistem",
    description: "Sağlık ve yayın kontrolü",
    icon: Activity,
    group: "Genel",
    permission: "system:read",
  },

  // Ana sayfa bölümleri (sitedeki sıra)
  {
    href: "/admin/hakkimizda",
    label: "Hakkımızda",
    description: "Başlık, kısaca, paragraflar, rozet",
    icon: Info,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/menu",
    label: "Ürünler / Kategori",
    description: "Kategoriler, ürün listeleri, görseller, SSS",
    icon: LayoutList,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/pasta",
    label: "Özel Pastalar",
    description: "Şeker hamurlu pasta bölümü",
    icon: Cake,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/galeri",
    label: "Galeri",
    description: "Galeri fotoğrafları ve başlık",
    icon: Images,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/yorumlar",
    label: "Yorumlar",
    description: "Müşteri yorumları",
    icon: MessageSquare,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/sss",
    label: "S.S.S.",
    description: "Sıkça sorulan sorular",
    icon: FileText,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/makaleler",
    label: "Fırın Günlüğü",
    description: "Blog yazıları",
    icon: BookOpen,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/iletisim",
    label: "İletişim",
    description: "Telefon, adres, WhatsApp, e-posta",
    icon: Phone,
    group: "Ana Sayfa",
    permission: "content:read",
  },

  // Site ayarları
  {
    href: "/admin/hero",
    label: "Kapı / Hero",
    description: "Giriş sahnesi ve kayan şerit",
    icon: DoorOpen,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/navbar",
    label: "Üst Menü & Logo",
    description: "Navigasyon linkleri, telefon butonu",
    icon: Menu,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/images",
    label: "Logo & Görseller",
    description: "Logo, favicon, hero görselleri",
    icon: Image,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/duyuru",
    label: "Duyuru",
    description: "Üst duyuru bandı",
    icon: Megaphone,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/bolumlar",
    label: "Bölüm Başlıkları",
    description: "Menü / galeri / yorum / SSS başlıkları",
    icon: Layout,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/sayfalar",
    label: "Alt Sayfa Metinleri",
    description: "Ürünler, kategori, blog sayfa metinleri",
    icon: Files,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/site",
    label: "SEO & Footer",
    description: "SEO, footer, yasal metinler",
    icon: Search,
    group: "Site",
    permission: "seo:write",
  },
  {
    href: "/admin/diger",
    label: "Ek Metinler",
    description: "Opsiyonel manifesto / hikaye",
    icon: FileText,
    group: "Site",
    permission: "content:read",
  },

  // Sistem
  {
    href: "/admin/kullanicilar",
    label: "Kullanıcılar",
    description: "Roller ve yetkiler",
    icon: Users,
    group: "Sistem",
    permission: "users:manage",
  },
  {
    href: "/admin/loglar",
    label: "Aktivite",
    description: "İşlem günlüğü",
    icon: ScrollText,
    group: "Sistem",
    permission: "logs:read",
  },
  {
    href: "/admin/yedekler",
    label: "Yedekler",
    description: "Yedekle / geri yükle",
    icon: DatabaseBackup,
    group: "Sistem",
    permission: "backup:manage",
  },
  {
    href: "/admin/settings",
    label: "Hesap",
    description: "Şifre ve güvenlik",
    icon: Settings,
    group: "Sistem",
    permission: "settings:password",
  },
];

export function filterNavByPermission(
  can: (p: Permission) => boolean
): AdminNavItem[] {
  return adminNavItems.filter((item) => !item.permission || can(item.permission));
}
