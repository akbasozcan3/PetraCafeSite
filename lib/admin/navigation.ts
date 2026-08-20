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
  Waves,
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
  Plug,
  Palette,
  CalendarDays,
  Inbox,
  Home,
  CreditCard,
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
    href: "/admin/anasayfa",
    label: "Ana Sayfa CMS",
    description: "Tüm bölümler, yazılar, aç/kapa ve form metinleri",
    icon: Home,
    group: "Ana Sayfa",
    permission: "content:read",
  },
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
    label: "Menü Yönetimi",
    description: "Yemek ekle, sil, fiyat ve açıklama güncelle",
    icon: LayoutList,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/rezervasyonlar",
    label: "Rezervasyonlar",
    description: "Masa taleplerini onayla veya reddet",
    icon: CalendarDays,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/masa-plani",
    label: "Masa & Kroki Editörü",
    description: "Masaları canlı krokide sürükle ve konumlandır",
    icon: Layout,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/mesajlar",
    label: "Mesajlar",
    description: "Siteden gelen iletişim formları",
    icon: Inbox,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/pasta",
    label: "Havuz & Plaj",
    description: "Havuz tarifesi, yüzme ve organizasyon bölümü",
    icon: Waves,
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
    label: "Blog",
    description: "Yazılar, özetler ve yayın durumu",
    icon: BookOpen,
    group: "Ana Sayfa",
    permission: "content:read",
  },
  {
    href: "/admin/iletisim",
    label: "İletişim",
    description: "Telefon, adres, WhatsApp, gün gün açılış-kapanış",
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
    description: "Logo, menü linkleri, sağdaki Rezervasyon butonu",
    icon: Menu,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/tema",
    label: "Tema & Renkler",
    description: "Navbar, zemin, vurgu ve footer renkleri",
    icon: Palette,
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
    description: "Bölüm başlıkları, ziyaret şeridi, Instagram hizmetleri",
    icon: Layout,
    group: "Site",
    permission: "content:read",
  },
  {
    href: "/admin/sayfalar",
    label: "Alt Sayfa Metinleri",
    description: "Menü, kategori ve blog sayfa metinleri",
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
    href: "/admin/integrations",
    label: "Entegrasyonlar",
    description: "Trendyol Go, Yemeksepeti ve diğerleri",
    icon: Plug,
    group: "Sistem",
    permission: "integrations:manage",
  },
  {
    href: "/admin/paytr",
    label: "PayTR Sanal POS",
    description: "3D Secure kredi kartı ödeme ve anahtarlar",
    icon: CreditCard,
    group: "Sistem",
    permission: "integrations:manage",
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
