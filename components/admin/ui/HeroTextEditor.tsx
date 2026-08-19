"use client";

import { useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { heroMediaVersion, resolveMediaUrl, withCacheBust } from "@/lib/admin/media-url";
import { cn } from "@/lib/admin/cn";
import { hexToRgba } from "@/lib/content/color";
import ColorField from "@/components/admin/ui/ColorField";
import {
  DEFAULT_HERO_TEXT,
  HERO_TEXT_KEYS,
  HERO_TEXT_LABELS,
  clampHeroText,
  resolveHeroTextMap,
  type HeroTextKey,
  type HeroTextMap,
  type HeroTextStyle,
} from "@/lib/content/hero-text";

type Device = "desktop" | "phone";
type Phase = "closed" | "open";

const CARD_KEYS: HeroTextKey[] = ["welcomeEyebrow", "welcomeTitle", "welcomeLead"];

export default function HeroTextEditor({
  imageUrl,
  phoneImageUrl,
  welcomeAktif = true,
  welcomeKutu = false,
  welcomeKutuRenk = "#0A0C09",
  welcomeKutuKenar = "#E8B84B",
  welcomeKutuOpaklik = 58,
  desktop,
  phone,
  preview,
  onChange,
}: {
  imageUrl?: string | null;
  phoneImageUrl?: string | null;
  welcomeAktif?: boolean;
  welcomeKutu?: boolean;
  welcomeKutuRenk?: string;
  welcomeKutuKenar?: string;
  welcomeKutuOpaklik?: number;
  desktop?: HeroTextMap | null;
  phone?: HeroTextMap | null;
  preview: Record<HeroTextKey, string>;
  onChange: (device: Device, next: HeroTextMap) => void;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const [phase, setPhase] = useState<Phase>("open");
  const [selected, setSelected] = useState<HeroTextKey>("welcomeTitle");
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ key: HeroTextKey; ox: number; oy: number; sx: number; sy: number } | null>(null);

  const map = resolveHeroTextMap(desktop, phone, device === "phone");
  const src = device === "phone" ? phoneImageUrl || imageUrl : imageUrl;
  const url = src ? withCacheBust(resolveMediaUrl(src), heroMediaVersion(src)) : "";
  const current = map[selected];
  const showCard = welcomeAktif && phase === "open";

  const commitKey = (key: HeroTextKey, next: HeroTextStyle) => {
    const base = device === "phone" ? { ...(phone || {}) } : { ...(desktop || {}) };
    onChange(device, { ...base, [key]: next });
  };

  const onPointerDown = (key: HeroTextKey, e: React.PointerEvent) => {
    if (key === "scroll" || CARD_KEYS.includes(key)) return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const s = map[key];
    setSelected(key);
    dragRef.current = {
      key,
      ox: s.x,
      oy: s.y,
      sx: ((e.clientX - r.left) / Math.max(1, r.width)) * 100,
      sy: ((e.clientY - r.top) / Math.max(1, r.height)) * 100,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const r = stage.getBoundingClientRect();
    const x = ((e.clientX - r.left) / Math.max(1, r.width)) * 100;
    const y = ((e.clientY - r.top) / Math.max(1, r.height)) * 100;
    commitKey(
      drag.key,
      clampHeroText(
        {
          ...map[drag.key],
          x: drag.ox + (x - drag.sx),
          y: drag.oy + (y - drag.sy),
        },
        DEFAULT_HERO_TEXT[drag.key]
      )
    );
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const scroll = map.scroll;
  const scale = device === "phone" ? 0.42 : 0.55;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#F8F8F8]">Yazı hizalama</p>
          <p className="text-[12px] text-[#6B7A94]">
            Önizleme sitedeki gibi: kapı kapalıyken yalnızca altta kaydır ipucu; içeri girince cam kart ortaya çıkar.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-xl border border-white/[0.08] p-1">
            <button
              type="button"
              onClick={() => setPhase("closed")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold",
                phase === "closed" ? "bg-white/10 text-[#E8B84B]" : "text-[#8A9BB0]"
              )}
            >
              Kapı kapalı
            </button>
            <button
              type="button"
              onClick={() => setPhase("open")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold",
                phase === "open" ? "bg-white/10 text-[#E8B84B]" : "text-[#8A9BB0]"
              )}
            >
              İçeri girince
            </button>
          </div>
          <div className="flex rounded-xl border border-white/[0.08] p-1">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
                device === "desktop" ? "bg-white/10 text-[#E8B84B]" : "text-[#8A9BB0]"
              )}
            >
              <Monitor className="h-3.5 w-3.5" /> Bilgisayar
            </button>
            <button
              type="button"
              onClick={() => setDevice("phone")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
                device === "phone" ? "bg-white/10 text-[#E8B84B]" : "text-[#8A9BB0]"
              )}
            >
              <Smartphone className="h-3.5 w-3.5" /> Telefon
            </button>
          </div>
        </div>
      </div>

      <div className={device === "phone" ? "mx-auto w-full max-w-[280px]" : "w-full"}>
        <div
          ref={stageRef}
          className="relative overflow-hidden rounded-xl border border-[#E8B84B]/20 bg-black select-none touch-none"
          style={{ aspectRatio: device === "phone" ? "390 / 844" : "16 / 9" }}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          ) : (
            <div className="absolute inset-0 bg-[#12150E]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />

          {(["slogan", "boot"] as HeroTextKey[]).map((key) => {
            const s = map[key];
            if (s.gizle && key !== selected) return null;
            const active = selected === key;
            return (
              <button
                key={key}
                type="button"
                onPointerDown={(e) => onPointerDown(key, e)}
                className={cn(
                  "absolute max-w-[80%] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded px-2 py-1 text-center leading-tight",
                  active ? "ring-2 ring-[#E8B84B]" : "ring-1 ring-white/20",
                  s.gizle ? "opacity-40" : "opacity-100"
                )}
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  color: s.color,
                  fontSize: Math.max(10, Math.min(device === "phone" ? 22 : 40, s.size * scale)),
                  fontWeight: s.weight,
                  fontFamily:
                    s.font === "sans"
                      ? "Inter, system-ui, sans-serif"
                      : '"Playfair Display", Georgia, serif',
                }}
              >
                {preview[key] || HERO_TEXT_LABELS[key]}
              </button>
            );
          })}

          {showCard ? (
            <div className="absolute inset-x-[8%] top-[38%] flex -translate-y-1/2 justify-center sm:inset-x-[18%] sm:top-[46%]">
              <div
                className={cn(
                  "w-full max-w-[360px] text-center",
                  welcomeKutu
                    ? "rounded-[2px] border px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
                    : "px-1 py-0",
                  CARD_KEYS.includes(selected) ? "ring-2 ring-[#E8B84B]" : ""
                )}
                style={
                  welcomeKutu
                    ? {
                        background: hexToRgba(welcomeKutuRenk, welcomeKutuOpaklik / 100),
                        borderColor: hexToRgba(welcomeKutuKenar, 0.45),
                      }
                    : undefined
                }
              >
                {CARD_KEYS.map((key) => {
                  const s = map[key];
                  if (s.gizle) return null;
                  return (
                    <button
                      key={key}
                      type="button"
                      onPointerDown={() => setSelected(key)}
                      className={cn(
                        "block w-full cursor-pointer text-center leading-tight",
                        key === "welcomeEyebrow" && "mb-1.5 uppercase tracking-[0.16em]",
                        key === "welcomeLead" && "mt-1.5",
                        selected === key && "outline outline-1 outline-[#E8B84B]/70"
                      )}
                      style={{
                        color: s.color,
                        fontSize: Math.max(
                          9,
                          Math.min(
                            device === "phone" ? 20 : 36,
                            s.size * (device === "phone" ? 0.38 : 0.5)
                          )
                        ),
                        fontWeight: s.weight,
                        fontFamily:
                          s.font === "sans"
                            ? "Inter, system-ui, sans-serif"
                            : '"Playfair Display", Georgia, serif',
                      }}
                    >
                      {preview[key] || HERO_TEXT_LABELS[key]}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="absolute left-1/2 top-[44%] w-[80%] -translate-x-1/2 text-center text-[10px] tracking-wide text-white/45">
              {welcomeAktif
                ? "Kart kapı açılınca burada belirir"
                : "Karşılama kartı kapalı (Gözükmesin)"}
            </p>
          )}

          {!scroll.gizle ? (
            <button
              type="button"
              onPointerDown={() => setSelected("scroll")}
              className={cn(
                "absolute left-1/2 bottom-[4%] flex w-max -translate-x-1/2 flex-col items-center gap-1.5",
                selected === "scroll" ? "ring-2 ring-[#E8B84B] rounded-md px-2 py-1" : ""
              )}
            >
              <span
                className="block h-[22px] w-[14px] rounded-full border-2 border-white/90"
                aria-hidden
              />
              <span
                className="block text-center uppercase tracking-[0.22em]"
                style={{
                  color: scroll.color,
                  fontSize: Math.max(8, Math.min(12, scroll.size * 0.7)),
                  fontWeight: scroll.weight,
                  fontFamily:
                    scroll.font === "sans"
                      ? "Inter, system-ui, sans-serif"
                      : '"Playfair Display", Georgia, serif',
                }}
              >
                {preview.scroll || "Aşağı kaydırın"}
              </span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-sm font-medium text-[#8A9BB0]">
          Seçili yazı
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as HeroTextKey)}
            className="mt-1.5 h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]"
          >
            {HERO_TEXT_KEYS.filter((key) => key !== "mark").map((key) => (
              <option key={key} value={key}>
                {HERO_TEXT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-[#8A9BB0]">
          Font
          <select
            value={current.font}
            onChange={(e) =>
              commitKey(selected, {
                ...current,
                font: e.target.value === "sans" ? "sans" : "serif",
              })
            }
            className="mt-1.5 h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]"
          >
            <option value="serif">Playfair (serif)</option>
            <option value="sans">Inter (sans)</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-[#8A9BB0]">
          Kalınlık
          <select
            value={current.weight}
            onChange={(e) =>
              commitKey(selected, {
                ...current,
                weight: Number(e.target.value) as HeroTextStyle["weight"],
              })
            }
            className="mt-1.5 h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-3 text-sm text-[#EEE9E0]"
          >
            <option value={400}>400 Regular</option>
            <option value={500}>500 Medium</option>
            <option value={600}>600 Semibold</option>
            <option value={700}>700 Bold</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-[#8A9BB0]">
          Punto ({current.size}px)
          <input
            type="range"
            min={10}
            max={72}
            value={current.size}
            onChange={(e) =>
              commitKey(selected, { ...current, size: Number(e.target.value) })
            }
            className="mt-3 w-full accent-[#E8B84B]"
          />
        </label>
        <ColorField
          label="Renk"
          value={current.color}
          onChange={(color) => commitKey(selected, { ...current, color })}
        />
        <label className="flex cursor-pointer items-center gap-3 self-end pb-2 text-sm text-[#EEE9E0]">
          <input
            type="checkbox"
            checked={current.gizle === true}
            onChange={(e) => commitKey(selected, { ...current, gizle: e.target.checked })}
            className="h-4 w-4 accent-[#C8703A]"
          />
          Sitede gizle
        </label>
      </div>
    </div>
  );
}
