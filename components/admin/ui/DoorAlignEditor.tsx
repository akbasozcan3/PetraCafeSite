"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Copy,
  Minus,
  Monitor,
  Move,
  Plus,
  RotateCcw,
  Smartphone,
} from "lucide-react";
import { heroMediaVersion, resolveMediaUrl, withCacheBust } from "@/lib/admin/media-url";
import { cn } from "@/lib/admin/cn";
import Button from "@/components/admin/ui/Button";
import {
  type DoorDevice,
  type DoorUv,
  DEFAULT_DOOR_UV,
  DEFAULT_DOOR_UV_MOBILE,
  clampDoorUv,
  moveDoorUv,
  phoneCoverCropUv,
  scaleDoorUv,
} from "@/lib/content/door-uv";

const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const;
type Handle = (typeof HANDLES)[number];

const PHONE_ASPECT = 390 / 844;
const HANDLE_CURSOR: Record<Handle, string> = {
  nw: "nwse-resize",
  se: "nwse-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
};

function uvFromPoint(el: HTMLElement, clientX: number, clientY: number): { u: number; v: number } {
  const r = el.getBoundingClientRect();
  return {
    u: Math.max(0, Math.min(1, (clientX - r.left) / Math.max(1, r.width))),
    v: Math.max(0, Math.min(1, (clientY - r.top) / Math.max(1, r.height))),
  };
}

function resizeUv(origin: DoorUv, handle: Handle, u: number, v: number): DoorUv {
  let { u0, u1, v0, v1 } = origin;
  if (handle.includes("w")) u0 = u;
  if (handle.includes("e")) u1 = u;
  if (handle.includes("n")) v0 = v;
  if (handle.includes("s")) v1 = v;
  if (u1 < u0) [u0, u1] = [u1, u0];
  if (v1 < v0) [v0, v1] = [v1, v0];
  return clampDoorUv({ u0, u1, v0, v1 });
}

function pct(n: number) {
  return `${(n * 100).toFixed(2)}%`;
}

export default function DoorAlignEditor({
  imageUrl,
  desktopUv,
  phoneUv,
  onChange,
}: {
  imageUrl?: string | null;
  desktopUv: DoorUv;
  phoneUv: DoorUv;
  onChange: (device: DoorDevice, uv: DoorUv) => void;
}) {
  const [device, setDevice] = useState<DoorDevice>("desktop");
  const [imgAspect, setImgAspect] = useState(16 / 9);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: "move" | "draw" | Handle;
    startU: number;
    startV: number;
    origin: DoorUv;
  } | null>(null);

  const uv = clampDoorUv(device === "phone" ? phoneUv : desktopUv);
  const url = imageUrl
    ? withCacheBust(resolveMediaUrl(imageUrl), heroMediaVersion(imageUrl))
    : "";

  const commit = useCallback(
    (next: DoorUv) => onChange(device, clampDoorUv(next)),
    [device, onChange]
  );

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || e.button === 2) return;
    const { u, v } = uvFromPoint(stage, e.clientX, e.clientY);
    const handleEl = (e.target as HTMLElement | null)?.closest?.("[data-handle]");
    const handle = (handleEl?.getAttribute("data-handle") || "") as Handle | "";
    const inside = u >= uv.u0 && u <= uv.u1 && v >= uv.v0 && v <= uv.v1;

    dragRef.current = handle
      ? { mode: handle, startU: u, startV: v, origin: uv }
      : inside
        ? { mode: "move", startU: u, startV: v, origin: uv }
        : { mode: "draw", startU: u, startV: v, origin: uv };

    stage.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const { u, v } = uvFromPoint(stage, e.clientX, e.clientY);
    if (drag.mode === "move") {
      commit(moveDoorUv(drag.origin, u - drag.startU, v - drag.startV));
      return;
    }
    if (drag.mode === "draw") {
      if (Math.abs(u - drag.startU) < 0.012 && Math.abs(v - drag.startV) < 0.012) return;
      commit(
        clampDoorUv({
          u0: Math.min(drag.startU, u),
          u1: Math.max(drag.startU, u),
          v0: Math.min(drag.startV, v),
          v1: Math.max(drag.startV, v),
        })
      );
      return;
    }
    commit(resizeUv(drag.origin, drag.mode, u, v));
  };

  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    dragRef.current = null;
    if (!drag || !stage || drag.mode !== "draw") return;
    const { u, v } = uvFromPoint(stage, e.clientX, e.clientY);
    if (Math.abs(u - drag.startU) < 0.012 && Math.abs(v - drag.startV) < 0.012) {
      commit(moveDoorUv(uv, u - (uv.u0 + uv.u1) / 2, v - (uv.v0 + uv.v1) / 2));
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const step = e.shiftKey ? 0.02 : 0.006;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        commit(moveDoorUv(uv, -step, 0));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        commit(moveDoorUv(uv, step, 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        commit(moveDoorUv(uv, 0, -step));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        commit(moveDoorUv(uv, 0, step));
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        commit(scaleDoorUv(uv, 1.06));
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        commit(scaleDoorUv(uv, 0.94));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commit, uv]);

  const crop = phoneCoverCropUv(imgAspect, PHONE_ASPECT, (uv.u0 + uv.u1) / 2);
  const previewDoor = {
    left: (uv.u0 - crop.u0) / Math.max(0.001, crop.u1 - crop.u0),
    top: (uv.v0 - crop.v0) / Math.max(0.001, crop.v1 - crop.v0),
    width: (uv.u1 - uv.u0) / Math.max(0.001, crop.u1 - crop.u0),
    height: (uv.v1 - uv.v0) / Math.max(0.001, crop.v1 - crop.v0),
  };

  if (!url) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[#0D1117] px-4 py-8 text-center text-sm text-[#6B7A94]">
        Önce cephe fotoğrafını yükleyin, sonra kapıyı fotoğrafın üstünde hizalayın.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8B84B]/25 bg-[#0D1117]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#F8F8F8]">Kapı hizası</p>
          <p className="text-[11px] text-[#8A9BB0]">
            Fotoğraf aynı kalır. Sadece altın kutuyu gerçek kapının üstüne getirin.
          </p>
        </div>
        <div className="flex rounded-xl border border-white/[0.08] bg-[#141E2E] p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              device === "desktop"
                ? "bg-[#E8B84B] text-[#0A0F18]"
                : "text-[#8A9BB0] hover:text-[#EEE9E0]"
            )}
          >
            <Monitor className="h-3.5 w-3.5" />
            Bilgisayar
          </button>
          <button
            type="button"
            onClick={() => setDevice("phone")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              device === "phone"
                ? "bg-[#E8B84B] text-[#0A0F18]"
                : "text-[#8A9BB0] hover:text-[#EEE9E0]"
            )}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Telefon
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_180px]">
        <div
          ref={stageRef}
          className="relative select-none overflow-hidden rounded-xl bg-black touch-none"
          style={{ cursor: "crosshair" }}
          onPointerDown={onPointer}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Kapı cephesi"
            draggable={false}
            className="pointer-events-none block h-auto w-full object-contain object-center"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                setImgAspect(img.naturalWidth / img.naturalHeight);
              }
            }}
          />

          {device === "phone" && (
            <div
              className="pointer-events-none absolute border border-dashed border-sky-300/70 bg-sky-400/10"
              style={{
                left: pct(crop.u0),
                width: pct(crop.u1 - crop.u0),
                top: pct(crop.v0),
                height: pct(crop.v1 - crop.v0),
              }}
            />
          )}

          <div
            className="absolute border-2 border-[#E8B84B] bg-[#E8B84B]/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
            style={{
              left: pct(uv.u0),
              top: pct(uv.v0),
              width: pct(uv.u1 - uv.u0),
              height: pct(uv.v1 - uv.v0),
              cursor: "move",
            }}
          >
            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-[#E8B84B]/70" />
            <div className="absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#0A0F18]/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#E8B84B]">
              <Move className="h-3 w-3" />
              KAPİ
            </div>
            {HANDLES.map((h) => (
              <span
                key={h}
                data-handle={h}
                className="absolute z-10 h-3 w-3 rounded-sm border border-[#0A0F18] bg-[#E8B84B]"
                style={{
                  cursor: HANDLE_CURSOR[h],
                  left: h.includes("w") ? "-6px" : h.includes("e") ? "auto" : "50%",
                  right: h.includes("e") ? "-6px" : "auto",
                  top: h.includes("n") ? "-6px" : h.includes("s") ? "auto" : "50%",
                  bottom: h.includes("s") ? "-6px" : "auto",
                  transform:
                    !h.includes("w") && !h.includes("e")
                      ? "translateX(-50%)"
                      : !h.includes("n") && !h.includes("s")
                        ? "translateY(-50%)"
                        : undefined,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7A94]">
            {device === "phone" ? "Telefon önizleme" : "Canlı kutu"}
          </p>
          {device === "phone" ? (
            <div className="w-[148px] overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c2430] bg-black shadow-xl">
              <div className="relative aspect-[390/844] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="absolute max-w-none"
                  style={{
                    left: `${(-crop.u0 / (crop.u1 - crop.u0)) * 100}%`,
                    top: `${(-crop.v0 / (crop.v1 - crop.v0)) * 100}%`,
                    width: `${(1 / (crop.u1 - crop.u0)) * 100}%`,
                    height: `${(1 / (crop.v1 - crop.v0)) * 100}%`,
                  }}
                />
                <div
                  className="absolute border border-[#E8B84B]"
                  style={{
                    left: `${previewDoor.left * 100}%`,
                    top: `${previewDoor.top * 100}%`,
                    width: `${previewDoor.width * 100}%`,
                    height: `${previewDoor.height * 100}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="px-2 text-center text-[11px] leading-relaxed text-[#6B7A94]">
              Bilgisayarda tüm cephe görünür. Kutuyu gerçek cam kapının üzerine oturtun.
            </p>
          )}
          {device === "phone" && (
            <p className="px-1 text-center text-[10px] leading-relaxed text-[#6B7A94]">
              Kesik mavi çerçeve telefonda görünen kadraj. Altın kutu açılan kapı.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-4 py-3">
        <Button type="button" variant="secondary" size="sm" onClick={() => commit(scaleDoorUv(uv, 0.92))}>
          <Minus className="h-3.5 w-3.5" />
          Küçült
        </Button>
        <input
          type="range"
          min={0.55}
          max={1.55}
          step={0.01}
          aria-label="Kapı boyutu"
          value={Math.min(1.55, Math.max(0.55, (uv.u1 - uv.u0) / ((device === "phone" ? DEFAULT_DOOR_UV_MOBILE : DEFAULT_DOOR_UV).u1 - (device === "phone" ? DEFAULT_DOOR_UV_MOBILE : DEFAULT_DOOR_UV).u0)))}
          onChange={(e) => {
            const base = device === "phone" ? DEFAULT_DOOR_UV_MOBILE : DEFAULT_DOOR_UV;
            const targetW = (base.u1 - base.u0) * Number(e.target.value);
            const factor = targetW / Math.max(0.02, uv.u1 - uv.u0);
            commit(scaleDoorUv(uv, factor));
          }}
          className="h-1.5 w-28 cursor-pointer accent-[#E8B84B]"
        />
        <Button type="button" variant="secondary" size="sm" onClick={() => commit(scaleDoorUv(uv, 1.08))}>
          <Plus className="h-3.5 w-3.5" />
          Büyüt
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            onChange(device === "phone" ? "phone" : "desktop", device === "phone" ? desktopUv : phoneUv)
          }
        >
          <Copy className="h-3.5 w-3.5" />
          {device === "phone" ? "Bilgisayardan kopyala" : "Telefondan kopyala"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            commit({ ...(device === "phone" ? DEFAULT_DOOR_UV_MOBILE : DEFAULT_DOOR_UV) })
          }
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Sıfırla
        </Button>
      </div>
    </div>
  );
}
