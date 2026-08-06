"use client";

import { cn } from "@/lib/admin/cn";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AD";
}

export default function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-[#C8703A] font-semibold text-[#0A0F18]",
        size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm",
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
