"use client";

import { useMemo, useState } from "react";
import { DoorOpen, Sparkles } from "lucide-react";
import { api } from "@/lib/api/client";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import { clampDoorUv } from "@/lib/content/door-uv";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Upload from "@/components/admin/ui/Upload";
import AdminImage from "@/components/admin/ui/AdminImage";
import DoorAlignEditor from "@/components/admin/ui/DoorAlignEditor";
import SaveBar from "@/components/admin/ui/SaveBar";

const BRAND_KEYS = new Set(["logo", "favicon"]);
const DOOR_KEYS = ["heroCephe", "heroIc", "heroPoster"] as const;

export default function ImagesPanel() {
  const { content, imageKeys, loading, setContent } = useAdminContent();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [savingUv, setSavingUv] = useState(false);

  const entries = useMemo(() => Object.entries(imageKeys), [imageKeys]);
  const brand = entries.filter(([key]) => BRAND_KEYS.has(key));
  const door = DOOR_KEYS.map((key) => [key, imageKeys[key]] as const).filter(([, info]) => info);
  const rest = entries.filter(
    ([key]) => !BRAND_KEYS.has(key) && !(DOOR_KEYS as readonly string[]).includes(key)
  );

  const doorUv = clampDoorUv(content?.hero?.doorUv);
  const doorUvMobile = clampDoorUv(content?.hero?.doorUvMobile, doorUv);

  const refresh = async (okMsg: string) => {
    try {
      const res = await api.getAdminContent();
      setContent(res.data);
      setMessage(okMsg);
      setMessageType("success");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Güncelleme başarısız");
      setMessageType("error");
    }
  };

  if (loading) return <AdminLoading />;
  if (!content) return <AdminAlert message="İçerik yüklenemedi." />;

  const saveUv = async () => {
    setSavingUv(true);
    try {
      const res = await api.updateContent({
        hero: { ...content.hero, doorUv, doorUvMobile },
      });
      setContent(res.data);
      setMessage("Kapı hizası kaydedildi. Ana sayfayı Ctrl+F5 ile yenileyin.");
      setMessageType("success");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kayıt başarısız");
      setMessageType("error");
    } finally {
      setSavingUv(false);
    }
  };

  const renderCard = (
    key: string,
    info: { label: string; hint: string },
    opts?: { featured?: boolean; syncPoster?: boolean }
  ) => {
    const url = content.images?.[key];
    const displayUrl =
      key === "logo"
        ? liveMedia(url, SITE_PHOTOS.mark)
        : key === "favicon"
          ? liveMedia(url, SITE_PHOTOS.favicon)
          : url;
    const accept =
      key === "logo"
        ? "image/svg+xml,.svg,image/png,image/webp,image/jpeg,image/gif,video/mp4,video/webm,.mp4,.webm"
        : key === "favicon"
          ? ".ico,image/x-icon,image/vnd.microsoft.icon,image/svg+xml,.svg,image/png,image/webp,image/jpeg"
          : "image/jpeg,image/png,image/webp,image/gif";
    const featured = opts?.featured;

    return (
      <div
        key={key}
        className={
          featured
            ? "overflow-hidden rounded-2xl border border-[#C8703A]/40 bg-[#141E2E] md:col-span-2"
            : "overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141E2E]/80"
        }
      >
        <div
          className={
            featured
              ? "relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#2a1a12,transparent_55%),#0D1117]"
              : key === "favicon"
                ? "flex aspect-square max-h-[220px] items-center justify-center overflow-hidden bg-[repeating-conic-gradient(#1a2230_0%_25%,#0D1117_0%_50%)] bg-[length:16px_16px]"
                : "flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0D1117]"
          }
        >
          <AdminImage
            src={displayUrl}
            alt={info.label}
            contain={featured || key === "logo" || key === "favicon"}
            className={
              featured
                ? "max-h-52 max-w-full object-contain drop-shadow-lg"
                : key === "favicon"
                  ? "h-24 w-24 object-contain drop-shadow-md"
                  : key === "logo"
                    ? "max-h-full max-w-full object-contain p-6"
                    : "h-full w-full object-cover"
            }
          />
        </div>
        <div className="space-y-3 p-4">
          <div>
            <div className="flex items-center gap-2">
              {featured && <DoorOpen className="h-4 w-4 text-[#C8703A]" />}
              {opts?.featured === false && key === "logo" && (
                <Sparkles className="h-4 w-4 text-[#C8703A]" />
              )}
              <p className="font-medium text-[#EEE9E0]">{info.label}</p>
              {url ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                  Yayında
                </span>
              ) : null}
            </div>
            <p className="text-xs text-[#8A9BB0]">{info.hint}</p>
          </div>
          <Upload
            accept={accept}
            uploadKey={key}
            enableCrop={key !== "logo" && key !== "favicon"}
            label={
              key === "heroCephe"
                ? "Kapı cephesi yükle — kırparken kapıyı ortala (4:3)"
                : key === "logo"
                  ? "Logo yükle (SVG önerilir · PNG / WebP)"
                  : key === "favicon"
                    ? "Favicon yükle — ICO / SVG / PNG sürükle-bırak"
                    : undefined
            }
            onComplete={async (results) => {
              if (opts?.syncPoster && results?.[0]?.url) {
                try {
                  await api.updateContent({
                    images: {
                      ...content.images,
                      heroCephe: results[0].url,
                      heroPoster: results[0].url,
                    },
                  });
                } catch {
                  /* uploadKey already saved heroCephe */
                }
              }
              await refresh(
                key === "heroCephe"
                  ? "Kapı cephesi yayınlandı — masaüstü 3D + mobil poster güncellendi. Ana sayfayı yenileyin."
                  : key === "logo"
                    ? "Logo güncellendi — navbar ve footer’da yayınlandı."
                    : key === "favicon"
                      ? "Favicon yayınlandı. Admin ve site sekmesinde görünür."
                      : "Görsel başarıyla güncellendi."
              );
            }}
            onError={(err) => {
              setMessage(err.message);
              setMessageType("error");
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <AdminPageHeader
        title="Görsel & Logo Yönetimi"
        description="Yüklediğiniz fotoğraf kaydedilir ve sitede yayınlanır. Dosya yolları gösterilmez."
      />
      <AdminAlert message={message} type={messageType} />

      <section className="mb-8 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/60 p-5">
        <div className="mb-4 flex items-start gap-3">
          <DoorOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B84B]" />
          <div>
            <h3 className="font-semibold text-[#F8F8F8]">3D açılan kapı</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#8A9BB0]">
              Cephe fotoğrafını yükleyin. Altta kapıyı fotoğrafın üstünde tıklayıp
              sürükleyerek hizalayın — bilgisayar ve telefon ayrı kaydedilir.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {door.map(([key, info]) =>
            renderCard(key, info, {
              featured: key === "heroCephe",
              syncPoster: key === "heroCephe",
            })
          )}
        </div>

        <div className="mt-6 space-y-3">
          <DoorAlignEditor
            imageUrl={content.images?.heroCephe || content.images?.heroPoster}
            desktopUv={doorUv}
            phoneUv={doorUvMobile}
            onChange={(device, next) => {
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  ...(device === "phone"
                    ? { doorUvMobile: next }
                    : { doorUv: next }),
                },
              });
            }}
          />
          <SaveBar onSave={() => void saveUv()} saving={savingUv} label="Kapı hizasını kaydet" />
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#8A9BB0]">
          Marka
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {brand.map(([key, info]) => renderCard(key, info, { featured: key === "logo" }))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#8A9BB0]">
          Diğer site görselleri
        </h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rest.map(([key, info]) => renderCard(key, info))}
        </div>
      </section>
    </>
  );
}
