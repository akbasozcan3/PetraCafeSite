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

function InstagramMark({
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

function WhatsAppMark({
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
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.08-1.35A9.92 9.92 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.14 13.77c-.22.62-1.27 1.18-1.76 1.25-.47.07-1.07.1-1.73-.11a15.9 15.9 0 0 1-1.56-.58c-2.72-1.18-4.5-3.93-4.63-4.11-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91 1-2.17.3-.24.66-.3.88-.3h.64c.2 0 .47-.07.72.55.27.65.9 2.18.98 2.34.09.16.14.34.04.56-.1.22-.16.35-.32.54-.16.19-.34.42-.48.56-.15.15-.3.31-.13.6.17.29.77 1.27 1.65 2.05.94.82 1.73 1.08 2.02 1.2.29.12.46.1.63-.06.17-.16.73-.85.92-1.14.19-.29.38-.24.64-.14.26.1 1.64.77 1.92.91.29.14.47.21.54.33.07.12.07.69-.15 1.31z" />
    </svg>
  );
}

const MAP: Record<
  SiteIconId | "check",
  LucideIcon | typeof InstagramMark | typeof WhatsAppMark
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
  whatsapp: WhatsAppMark,
  instagram: InstagramMark,
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
