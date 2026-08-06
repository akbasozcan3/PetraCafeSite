"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/admin/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  allowCustom?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, allowCustom = true, value, onChange, ...props }, ref) => {
    const isCustomValue = value && !options.some((o) => o.value === value);

    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-[#8A9BB0]">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            className={cn(
              "w-full h-11 bg-[#0D1117] border border-white/[0.06] rounded-2xl text-[#EEE9E0] text-sm px-4 transition-all duration-200 cursor-pointer appearance-none",
              "focus:outline-none focus:border-[#C8703A]/40 focus:ring-1 focus:ring-[#C8703A]/20",
              error && "border-red-500/40",
              className
            )}
            {...props}
          >
            <option value="" disabled className="bg-[#141E2E] text-[#8A9BB0]">
              -- Seçiniz --
            </option>
            {isCustomValue && (
              <option value={String(value)} className="bg-[#141E2E] text-[#EEE9E0]">
                {String(value)} (Özel URL)
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#141E2E] text-[#EEE9E0]">
                {opt.label} ({opt.value})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7A94]">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
