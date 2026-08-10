import Link from "next/link";
import { ExternalLink } from "lucide-react";

/** Admin panellerinde “bu alan sitede nereye gider” ipucu */
export default function SectionHint({
  anchor,
  label,
  href,
}: {
  anchor?: string;
  label: string;
  href?: string;
}) {
  const link =
    href ||
    (anchor
      ? `/#${anchor.replace(/^#/, "")}`
      : "/");
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#C8703A]/20 bg-[#C8703A]/8 px-4 py-3 text-sm text-[#E8B84B]">
      <span>
        Site bölümü: <strong className="text-[#EEE9E0]">{label}</strong>
      </span>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#EEE9E0] hover:text-[#C8703A]"
      >
        Sitede gör <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
