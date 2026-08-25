import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CakeSlice,
  Check,
  ChefHat,
  Clock,
  Coffee,
  Flame,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sunrise,
  UtensilsCrossed,
  Waves,
  Wine,
} from "lucide-react";
import { iconFromLabel, type SiteIconId } from "@/lib/content/site-icons";

export function InstagramIcon({
  size = 22,
  strokeWidth = 1.75,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({
  size = 22,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.53-1.11 1.01-1.53 1.07-.39.06-.9.08-1.46-.1-.36-.11-.82-.27-1.42-.53-2.5-1.08-4.12-3.62-4.24-3.79-.12-.16-1-1.33-1-2.54 0-1.21.63-1.8 1.01-2.05.21-.14.47-.18.63-.18h.46c.15 0 .34-.06.53.4.2.48.68 1.66.74 1.78.06.13.1.27.02.44-.08.17-.12.28-.24.42-.12.15-.26.33-.37.44-.12.12-.24.25-.1.49.14.23.61 1.01 1.32 1.63.91.8 1.67 1.05 1.91 1.17.23.11.37.1.51-.06.14-.16.59-.69.75-.92.15-.24.31-.2.52-.12.21.08 1.33.63 1.56.74.23.11.38.17.44.27.06.09.06.55-.13 1.08"
      />
    </svg>
  );
}

function FacebookMark({
  size = 22,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokMark({
  size = 22,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

const MAP: Record<
  SiteIconId | "check",
  LucideIcon | typeof InstagramIcon | typeof WhatsAppIcon | typeof FacebookMark | typeof TikTokMark
> = {
  utensils: UtensilsCrossed,
  chef: ChefHat,
  sunrise: Sunrise,
  waves: Waves,
  coffee: Coffee,
  wine: Wine,
  cake: CakeSlice,
  flame: Flame,
  phone: Phone,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  facebook: FacebookMark,
  tiktok: TikTokMark,
  mail: Mail,
  map: MapPin,
  clock: Clock,
  calendar: CalendarCheck,
  globe: Globe,
  check: Check,
};

export default function SiteIcon({
  name,
  label,
  size = 22,
  strokeWidth = 1.75,
  className,
}: {
  name?: string;
  label?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const id = (name && name in MAP ? name : iconFromLabel(label || "")) as
    | SiteIconId
    | "check";
  const Icon = MAP[id] || UtensilsCrossed;
  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
