function toBlob(
  canvas: HTMLCanvasElement,
  mime: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) return resolve(blob);
        canvas.toBlob(
          (fallback) =>
            fallback
              ? resolve(fallback)
              : reject(new Error("Görsel işlenemedi. JPEG veya PNG deneyin.")),
          "image/jpeg",
          quality
        );
      },
      mime,
      quality
    );
  });
}

export async function resizeImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.8,
  toWebp = true
): Promise<Blob> {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    const obj = URL.createObjectURL(file);
    img.onerror = () => {
      URL.revokeObjectURL(obj);
      reject(new Error("Görsel okunamadı. JPEG, PNG veya WebP yükleyin."));
    };
    img.onload = async () => {
      try {
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Görsel işlenemedi"));
        ctx.drawImage(img, 0, 0, w, h);
        const mime = toWebp ? "image/webp" : file.type || "image/jpeg";
        resolve(await toBlob(canvas, mime, quality));
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(obj);
      }
    };
    img.src = obj;
  });
}

export function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(new Error("Dosya okunamadı"));
    fr.readAsDataURL(file);
  });
}

/** Crop image to pixel rect then optionally resize/convert. */
export async function cropImageFile(
  file: File,
  crop: { x: number; y: number; width: number; height: number },
  opts?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    webp?: boolean;
  }
): Promise<Blob> {
  const maxWidth = opts?.maxWidth ?? 2000;
  const maxHeight = opts?.maxHeight ?? 2000;
  const quality = opts?.quality ?? 0.82;
  const toWebp = opts?.webp !== false;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const obj = URL.createObjectURL(file);
    img.onerror = () => {
      URL.revokeObjectURL(obj);
      reject(new Error("Görsel yüklenemedi"));
    };
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const sw = Math.max(1, Math.round(crop.width));
        const sh = Math.max(1, Math.round(crop.height));
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas yok"));
        ctx.drawImage(
          img,
          Math.round(crop.x),
          Math.round(crop.y),
          sw,
          sh,
          0,
          0,
          sw,
          sh
        );

        const mime = toWebp ? "image/webp" : file.type || "image/jpeg";
        const ratio = Math.min(maxWidth / sw, maxHeight / sh, 1);
        if (ratio < 1) {
          const out = document.createElement("canvas");
          out.width = Math.round(sw * ratio);
          out.height = Math.round(sh * ratio);
          const octx = out.getContext("2d");
          if (!octx) return reject(new Error("Canvas yok"));
          octx.drawImage(canvas, 0, 0, out.width, out.height);
          toBlob(out, mime, quality).then(resolve, reject);
        } else {
          toBlob(canvas, mime, quality).then(resolve, reject);
        }
      } catch (err) {
        reject(err);
      } finally {
        URL.revokeObjectURL(obj);
      }
    };
    img.src = obj;
  });
}

export function looksLikeIcoFile(file: File): boolean {
  return (
    /\.ico$/i.test(file.name || "") ||
    file.type === "image/x-icon" ||
    file.type === "image/vnd.microsoft.icon"
  );
}

/** ICO tarayıcıda açılırsa PNG’ye çevir (önizleme her yerde çalışsın). */
export async function rasterizeFaviconFile(file: File, size = 128): Promise<Blob> {
  return await new Promise((resolve) => {
    const img = new Image();
    const obj = URL.createObjectURL(file);
    const finish = (blob: Blob) => {
      URL.revokeObjectURL(obj);
      resolve(blob);
    };
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return finish(file);
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => finish(blob || file), "image/png");
      } catch {
        finish(file);
      }
    };
    img.onerror = () => finish(file);
    img.src = obj;
  });
}
