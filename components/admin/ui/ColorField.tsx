"use client";

function toPickerHex(value: string): string {
  const v = String(value || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const h = v.slice(1);
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return "#000000";
}

export default function ColorField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#8A9BB0]">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          aria-label={label}
          value={toPickerHex(value)}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-11 w-12 cursor-pointer rounded-xl border border-white/[0.08] bg-[#0D1117] p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="h-11 flex-1 rounded-2xl border border-white/[0.06] bg-[#0D1117] px-3 font-mono text-sm text-[#EEE9E0] focus:border-[#C8703A]/40 focus:outline-none"
        />
      </div>
      {hint ? <p className="text-[11px] text-[#6B7A94]">{hint}</p> : null}
    </div>
  );
}
