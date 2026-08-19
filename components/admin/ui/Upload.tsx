"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload as UploadIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { resizeImageFile, cropImageFile, looksLikeIcoFile, rasterizeFaviconFile } from "./imageUtils";
import CropModal, { type CropRect } from "./CropModal";

type UploadResult = { url: string; key?: string };

function isVideoFile(file: File | Blob, name = "") {
  const n = name || (file as File).name || "";
  return (
    (file.type || "").startsWith("video/") || /\.(mp4|webm|mov)$/i.test(n)
  );
}

async function fileLooksLikeSvg(file: File): Promise<boolean> {
  if (file.type === "image/svg+xml" || /\.svg$/i.test(file.name || "")) return true;
  try {
    const head = (await file.slice(0, 2048).text()).replace(/^\uFEFF/, "");
    return /<svg[\s>]/i.test(head);
  } catch {
    return false;
  }
}

async function fileLooksLikeIco(file: File): Promise<boolean> {
  if (looksLikeIcoFile(file)) return true;
  try {
    const buf = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    return buf[0] === 0 && buf[1] === 0 && buf[2] === 1 && buf[3] === 0;
  } catch {
    return false;
  }
}

async function uploadOne(
  file: Blob | File,
  url: string,
  fieldName = "file",
  key = "",
  asSvg = false
): Promise<UploadResult> {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.withCredentials = true;
    xhr.timeout = 60000;
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText || "{}");
        if (xhr.status >= 200 && xhr.status < 300 && data.url)
          resolve({ url: data.url, key: data.key });
        else reject(new Error(data.error || "Yükleme başarısız"));
      } catch {
        reject(new Error("Sunucudan geçersiz yanıt"));
      }
    };
    xhr.onerror = () => reject(new Error("Ağ hatası — yükleme başarısız"));
    xhr.ontimeout = () => reject(new Error("Yükleme zaman aşımına uğradı"));
    const fd = new FormData();
    const rawName = ((file as File).name || "").trim();
    const svg =
      asSvg ||
      file.type === "image/svg+xml" ||
      /\.svg$/i.test(rawName);
    const ico =
      !svg &&
      (/\.ico$/i.test(rawName) ||
        file.type === "image/x-icon" ||
        file.type === "image/vnd.microsoft.icon");
    const video = isVideoFile(file, rawName);
    const mime = svg
      ? "image/svg+xml"
      : ico
        ? "image/x-icon"
        : video
          ? file.type || (/\.webm$/i.test(rawName) ? "video/webm" : "video/mp4")
          : file.type && file.type.startsWith("image/")
            ? file.type
            : "image/webp";
    const ext =
      mime === "image/png"
        ? "png"
        : mime === "image/jpeg"
          ? "jpg"
          : mime === "image/gif"
            ? "gif"
            : mime === "image/avif"
              ? "avif"
              : mime === "image/svg+xml"
                ? "svg"
                : mime === "image/x-icon"
                  ? "ico"
                  : mime === "video/webm"
                    ? "webm"
                    : mime === "video/mp4"
                      ? "mp4"
                      : "webp";
    const filename = svg
      ? (rawName ? rawName.replace(/\.[^.]+$/, "") : "logo") + ".svg"
      : ico
        ? (rawName ? rawName.replace(/\.[^.]+$/, "") : "favicon") + ".ico"
        : video
          ? rawName || `logo.${ext}`
          : `upload.${ext}`;
    const payload = new File([file], filename, { type: mime });
    fd.append(fieldName, payload, filename);
    if (key) fd.append("key", key);
    xhr.send(fd);
  });
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function Upload({
  uploadUrl = "/api/v1/admin/upload",
  accept = "image/*,image/svg+xml,.svg",
  multiple = false,
  maxSize = 8 * 1024 * 1024,
  maxWidth = 2000,
  maxHeight = 2000,
  webp = true,
  quality = 0.82,
  onProgress,
  onComplete,
  onError,
  uploadKey = "",
  label,
  enableCrop = true,
}: {
  uploadUrl?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  webp?: boolean;
  quality?: number;
  uploadKey?: string;
  label?: string;
  enableCrop?: boolean;
  onProgress?: (percent: number, index: number) => void;
  onComplete?: (results: UploadResult[]) => void;
  onError?: (err: Error) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const processAndUpload = useCallback(
    async (file: File, crop?: CropRect) => {
      setStatus("uploading");
      setStatusMsg("");
      try {
        if (file.size > maxSize) {
          throw new Error(
            `Dosya boyutu en fazla ${Math.round(maxSize / 1024 / 1024)}MB olabilir`
          );
        }
        const isSvg = await fileLooksLikeSvg(file);
        const isIco = await fileLooksLikeIco(file);
        const isVideo = isVideoFile(file);
        const mime = file.type || "";
        if (!isSvg && !isIco && !isVideo && !mime.startsWith("image/")) {
          throw new Error("Yalnızca görsel veya MP4 logo yüklenebilir");
        }

        let blob: Blob;
        if (isSvg || isVideo) {
          blob = file;
        } else if (isIco) {
          blob = await rasterizeFaviconFile(file);
        } else if (crop) {
          blob = await cropImageFile(file, crop, {
            maxWidth,
            maxHeight,
            quality,
            webp,
          });
        } else {
          blob = await resizeImageFile(file, maxWidth, maxHeight, quality, webp);
        }

        const res = await uploadOne(blob, uploadUrl, "file", uploadKey, isSvg);
        setStatus("success");
        setStatusMsg("Görsel yüklendi");
        if (onProgress) onProgress(100, 0);
        if (onComplete) onComplete([res]);
        setTimeout(() => setStatus("idle"), 3000);
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error(String(err));
        setStatus("error");
        setStatusMsg(e.message);
        if (onError) onError(e);
        setTimeout(() => setStatus("idle"), 5000);
      } finally {
        if (inputRef.current) inputRef.current.value = "";
        setPendingFile(null);
      }
    },
    [
      maxSize,
      maxWidth,
      maxHeight,
      webp,
      quality,
      uploadUrl,
      uploadKey,
      onProgress,
      onComplete,
      onError,
    ]
  );

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const list = Array.from(files).slice(0, multiple ? undefined : 1);

      if (enableCrop && !multiple && list[0] && !isVideoFile(list[0])) {
        const first = list[0];
        if (!(await fileLooksLikeSvg(first)) && !(await fileLooksLikeIco(first))) {
          setPendingFile(first);
          return;
        }
      }

      setStatus("uploading");
      setStatusMsg("");
      try {
        const results: UploadResult[] = [];
        for (let i = 0; i < list.length; i++) {
          const f = list[i];
          if (f.size > maxSize) {
            throw new Error(
              `Dosya boyutu en fazla ${Math.round(maxSize / 1024 / 1024)}MB olabilir`
            );
          }
          const isSvg = await fileLooksLikeSvg(f);
          const isIco = await fileLooksLikeIco(f);
          const isVideo = isVideoFile(f);
          const mime = f.type || "";
          if (!isSvg && !isIco && !isVideo && !mime.startsWith("image/")) {
            throw new Error("Yalnızca görsel veya MP4 logo yüklenebilir");
          }
          const blob = isSvg || isVideo
            ? f
            : isIco
              ? await rasterizeFaviconFile(f)
              : await resizeImageFile(f, maxWidth, maxHeight, quality, webp);
          const res = await uploadOne(blob, uploadUrl, "file", uploadKey, isSvg);
          results.push(res);
          if (onProgress) onProgress(100, i);
        }
        setStatus("success");
        setStatusMsg(
          multiple ? `${results.length} görsel yüklendi` : "Görsel yüklendi"
        );
        if (onComplete) onComplete(results);
        setTimeout(() => setStatus("idle"), 3000);
      } catch (err: unknown) {
        const e = err instanceof Error ? err : new Error(String(err));
        setStatus("error");
        setStatusMsg(e.message);
        if (onError) onError(e);
        setTimeout(() => setStatus("idle"), 5000);
      } finally {
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [
      multiple,
      enableCrop,
      maxSize,
      maxWidth,
      maxHeight,
      webp,
      quality,
      uploadUrl,
      onProgress,
      onComplete,
      onError,
      uploadKey,
    ]
  );

  const fileAccept = (() => {
    let next = /svg/i.test(accept) ? accept : `${accept},image/svg+xml,.svg`;
    if (uploadKey === "favicon" || /ico/i.test(accept)) {
      if (!/ico/i.test(next)) next += ",.ico,image/x-icon,image/vnd.microsoft.icon";
    }
    return next;
  })();
  const formatHint =
    uploadKey === "favicon" || /ico/i.test(accept)
      ? "ICO · SVG · PNG · WebP"
      : /mp4|video/i.test(accept)
        ? "PNG · SVG · MP4"
        : "SVG · PNG · JPG · WebP";

  const borderColor =
    drag
      ? "border-[#C8703A] ring-2 ring-[#C8703A]/20"
      : status === "success"
        ? "border-emerald-500/40"
        : status === "error"
          ? "border-red-500/40"
          : "border-white/[0.06]";

  return (
    <div>
      {label && (
        <p className="mb-1.5 text-xs font-medium text-[#8A9BB0]">{label}</p>
      )}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`block cursor-pointer rounded-xl border bg-[#0D1117] p-3 transition-all ${borderColor}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={fileAccept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {status === "uploading" ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#C8703A]" />
            ) : status === "success" ? (
              <CheckCircle className="h-4 w-4 text-emerald-400" />
            ) : status === "error" ? (
              <AlertCircle className="h-4 w-4 text-red-400" />
            ) : (
              <UploadIcon className="h-4 w-4 text-[#6B7A94]" />
            )}
            <div>
              {status === "uploading" ? (
                <div className="text-xs text-[#8A9BB0]">Yükleniyor…</div>
              ) : status === "success" ? (
                <div className="text-xs text-emerald-400">{statusMsg}</div>
              ) : status === "error" ? (
                <div className="text-xs text-red-400">{statusMsg}</div>
              ) : (
                <>
                  <div className="text-xs font-medium text-[#EEE9E0]">
                    {drag ? "Bırakın" : "Dosya seç veya sürükle"}
                  </div>
                  <div className="text-[10px] text-[#6B7A94]">
                    {formatHint} · maks {Math.round(maxSize / 1024 / 1024)}MB
                    {/svg|ico/i.test(fileAccept) ? " · SVG/ICO kırpılmaz" : enableCrop && !multiple ? " · kırpma açık" : ""}
                  </div>
                </>
              )}
            </div>
          </div>
          {status === "idle" && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="shrink-0 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-xs text-[#EEE9E0] transition hover:bg-white/[0.08]"
            >
              Seç
            </button>
          )}
        </div>
      </label>

      {pendingFile && (
        <CropModal
          file={pendingFile}
          onConfirm={(crop) => void processAndUpload(pendingFile, crop)}
          onSkip={() => void processAndUpload(pendingFile)}
          onCancel={() => {
            setPendingFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
      )}
    </div>
  );
}
