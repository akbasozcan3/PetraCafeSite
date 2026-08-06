"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, X, Maximize2 } from "lucide-react";
import Button from "@/components/admin/ui/Button";

export type CropRect = { x: number; y: number; width: number; height: number };

type AspectPreset = "free" | "1:1" | "16:9" | "4:3" | "3:4";

const ASPECTS: { id: AspectPreset; label: string; ratio: number | null }[] = [
  { id: "free", label: "Serbest", ratio: null },
  { id: "1:1", label: "1:1", ratio: 1 },
  { id: "16:9", label: "16:9", ratio: 16 / 9 },
  { id: "4:3", label: "4:3", ratio: 4 / 3 },
  { id: "3:4", label: "3:4", ratio: 3 / 4 },
];

function fitAspect(
  nw: number,
  nh: number,
  ratio: number | null
): CropRect {
  if (!ratio) {
    return { x: 0, y: 0, width: nw, height: nh };
  }
  let w = nw;
  let h = w / ratio;
  if (h > nh) {
    h = nh;
    w = h * ratio;
  }
  return {
    x: Math.round((nw - w) / 2),
    y: Math.round((nh - h) / 2),
    width: Math.round(w),
    height: Math.round(h),
  };
}

export default function CropModal({
  file,
  onConfirm,
  onCancel,
  onSkip,
}: {
  file: File;
  onConfirm: (crop: CropRect) => void;
  onCancel: () => void;
  onSkip: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [aspect, setAspect] = useState<AspectPreset>("free");
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, width: 0, height: 0 });
  const [ready, setReady] = useState(false);
  const dragRef = useRef<{
    mode: "move" | "resize";
    startX: number;
    startY: number;
    origin: CropRect;
  } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxW = 720;
    const maxH = 420;
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
    const dw = Math.round(img.naturalWidth * scale);
    const dh = Math.round(img.naturalHeight * scale);
    canvas.width = dw;
    canvas.height = dh;

    ctx.clearRect(0, 0, dw, dh);
    ctx.drawImage(img, 0, 0, dw, dh);

    // dim outside crop
    const sx = (crop.x / img.naturalWidth) * dw;
    const sy = (crop.y / img.naturalHeight) * dh;
    const sw = (crop.width / img.naturalWidth) * dw;
    const sh = (crop.height / img.naturalHeight) * dh;

    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, dw, dh);
    ctx.clearRect(sx, sy, sw, sh);
    ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, sx, sy, sw, sh);

    ctx.strokeStyle = "#C8703A";
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, sy, sw, sh);

    // corner handles
    const hs = 8;
    ctx.fillStyle = "#C8703A";
    [
      [sx, sy],
      [sx + sw, sy],
      [sx, sy + sh],
      [sx + sw, sy + sh],
    ].forEach(([hx, hy]) => {
      ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
    });
  }, [crop]);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const initial = fitAspect(img.naturalWidth, img.naturalHeight, null);
      setCrop(initial);
      setReady(true);
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!ready) return;
    draw();
  }, [ready, crop, draw]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const ratio = ASPECTS.find((a) => a.id === aspect)?.ratio ?? null;
    setCrop(fitAspect(img.naturalWidth, img.naturalHeight, ratio));
  }, [aspect]);

  const toNatural = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const nx = ((clientX - rect.left) / rect.width) * img.naturalWidth;
    const ny = ((clientY - rect.top) / rect.height) * img.naturalHeight;
    return { x: nx, y: ny };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = toNatural(e.clientX, e.clientY);
    const nearCorner =
      Math.hypot(p.x - (crop.x + crop.width), p.y - (crop.y + crop.height)) <
      Math.max(crop.width, crop.height) * 0.08;
    dragRef.current = {
      mode: nearCorner ? "resize" : "move",
      startX: p.x,
      startY: p.y,
      origin: { ...crop },
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !imgRef.current) return;
    const img = imgRef.current;
    const p = toNatural(e.clientX, e.clientY);
    const { mode, startX, startY, origin } = dragRef.current;
    const dx = p.x - startX;
    const dy = p.y - startY;
    const ratio = ASPECTS.find((a) => a.id === aspect)?.ratio ?? null;

    if (mode === "move") {
      let x = origin.x + dx;
      let y = origin.y + dy;
      x = Math.max(0, Math.min(img.naturalWidth - origin.width, x));
      y = Math.max(0, Math.min(img.naturalHeight - origin.height, y));
      setCrop({ ...origin, x: Math.round(x), y: Math.round(y) });
    } else {
      let width = Math.max(40, origin.width + dx);
      let height = Math.max(40, origin.height + dy);
      if (ratio) {
        height = width / ratio;
      }
      if (origin.x + width > img.naturalWidth) width = img.naturalWidth - origin.x;
      if (origin.y + height > img.naturalHeight) {
        height = img.naturalHeight - origin.y;
        if (ratio) width = height * ratio;
      }
      setCrop({
        ...origin,
        width: Math.round(width),
        height: Math.round(height),
      });
    }
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0D1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[#F8F8F8]">Görsel kırp</h3>
            <p className="text-xs text-[#6B7A94]">Alanı sürükleyin · köşeden boyutlandırın</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-2 text-[#8A9BB0] hover:bg-white/[0.06] hover:text-[#EEE9E0]"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {ASPECTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAspect(a.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  aspect === a.id
                    ? "bg-[#C8703A]/20 text-[#C8703A]"
                    : "bg-white/[0.04] text-[#8A9BB0] hover:text-[#EEE9E0]"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center rounded-xl bg-black/40 p-3">
            <canvas
              ref={canvasRef}
              className="max-h-[420px] max-w-full cursor-move touch-none rounded-lg"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </div>

          <p className="text-center text-[11px] text-[#6B7A94]">
            {ready
              ? `${Math.round(crop.width)} × ${Math.round(crop.height)} px`
              : "Yükleniyor…"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-4">
          <Button variant="ghost" size="sm" onClick={onSkip}>
            <Maximize2 className="h-4 w-4" /> Kırpmadan yükle
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              İptal
            </Button>
            <Button size="sm" onClick={() => onConfirm(crop)} disabled={!ready}>
              <Check className="h-4 w-4" /> Uygula ve yükle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
