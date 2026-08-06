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

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Özet", description: "Genel bakış ve istatistikler", icon: LayoutDashboard, group: "Genel" },
  { href: "/admin/sistem", label: "Sistem", description: "Sağlık ve yayın kontrolü", icon: Activity, group: "Genel", permission: "system:read" },
  { href: "/admin/menu", label: "Ürünler", description: "Kategoriler ve ürün listesi", icon: LayoutList, group: "İçerik", permission: "content:read" },
  { href: "/admin/images", label: "Logo & Görseller", description: "Logo, favicon, hero ve afişler", icon: Image, group: "İçerik", permission: "content:read" },
  { href: "/admin/navbar", label: "Üst Menü & Logo", description: "Logo, navigasyon, telefon butonu", icon: Menu, group: "İçerik", permission: "content:read" },
  { href: "/admin/icerik", label: "Metinler", description: "Hakkımızda ve hero yazıları", icon: FileText, group: "İçerik", permission: "content:read" },
  { href: "/admin/bolumlar", label: "Bölüm Başlıkları", description: "Sayfa bölümü başlıkları", icon: Layout, group: "İçerik", permission: "content:read" },
  { href: "/admin/sayfalar", label: "Sayfa Metinleri", description: "Ürünler, kategori, blog metinleri", icon: Files, group: "İçerik", permission: "content:read" },
  { href: "/admin/pasta", label: "Pastalar", description: "Özel pasta bölümü", icon: Cake, group: "İçerik", permission: "content:read" },
  { href: "/admin/galeri", label: "Galeri", description: "Galeri fotoğrafları", icon: Images, group: "İçerik", permission: "content:read" },
  { href: "/admin/yorumlar", label: "Yorumlar", description: "Müşteri yorumları", icon: MessageSquare, group: "İçerik", permission: "content:read" },
  { href: "/admin/sss", label: "S.S.S.", description: "Sıkça sorulan sorular", icon: FileText, group: "İçerik", permission: "content:read" },
  { href: "/admin/makaleler", label: "Blog", description: "Fırın günlüğü yazıları", icon: FileText, group: "İçerik", permission: "content:read" },
  { href: "/admin/duyuru", label: "Duyuru", description: "Üst duyuru bandı", icon: Megaphone, group: "İçerik", permission: "content:read" },
  { href: "/admin/iletisim", label: "İletişim", description: "Telefon, adres, WhatsApp", icon: Phone, group: "İçerik", permission: "content:read" },
  { href: "/admin/diger", label: "Ek Metinler", description: "Opsiyonel manifesto / hikaye (ileride)", icon: FileText, group: "İçerik", permission: "content:read" },
  { href: "/admin/site", label: "SEO & Footer", description: "SEO, footer, yasal metinler", icon: Search, group: "Sistem", permission: "seo:write" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", description: "Roller ve yetkiler", icon: Users, group: "Sistem", permission: "users:manage" },
  { href: "/admin/loglar", label: "Aktivite", description: "Çok kullanıcılı işlem günlüğü", icon: ScrollText, group: "Sistem", permission: "logs:read" },
  { href: "/admin/yedekler", label: "Yedekler", description: "Yedekle / geri yükle", icon: DatabaseBackup, group: "Sistem", permission: "backup:manage" },
  { href: "/admin/settings", label: "Hesap", description: "Şifre ve güvenlik", icon: Settings, group: "Sistem", permission: "settings:password" },
];

export function filterNavByPermission(
  can: (p: Permission) => boolean
): AdminNavItem[] {
  return adminNavItems.filter((item) => !item.permission || can(item.permission));
}
