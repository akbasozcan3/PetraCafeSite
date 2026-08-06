export async function resizeImageFile(file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.8, toWebp = true): Promise<Blob> {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (e) => reject(new Error("Image load error"));
    img.onload = async () => {
      try {
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context not available"));
        ctx.drawImage(img, 0, 0, w, h);
        const mime = toWebp ? "image/webp" : file.type || "image/jpeg";
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Conversion failed"));
          resolve(blob);
        }, mime, quality);
      } catch (err) {
        reject(err);
      }
    };
    // Create object URL so CORS not an issue for local files
    img.src = URL.createObjectURL(file);
  });
}

export function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(new Error("File read error"));
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
    img.onerror = () => reject(new Error("Görsel yüklenemedi"));
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

        const ratio = Math.min(maxWidth / sw, maxHeight / sh, 1);
        if (ratio < 1) {
          const out = document.createElement("canvas");
          out.width = Math.round(sw * ratio);
          out.height = Math.round(sh * ratio);
          const octx = out.getContext("2d");
          if (!octx) return reject(new Error("Canvas yok"));
          octx.drawImage(canvas, 0, 0, out.width, out.height);
          out.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))),
            toWebp ? "image/webp" : file.type || "image/jpeg",
            quality
          );
        } else {
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("Crop failed"))),
            toWebp ? "image/webp" : file.type || "image/jpeg",
            quality
          );
        }
      } catch (err) {
        reject(err);
      }
    };
    img.src = URL.createObjectURL(file);
  });
}
