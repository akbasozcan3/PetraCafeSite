"use client";

import { useMemo, useState } from "react";
import { DoorOpen, ImageIcon, Sparkles } from "lucide-react";
import { api } from "@/lib/api/client";
import { resolveMediaUrl, withCacheBust } from "@/lib/admin/media-url";
import { useAdminContent } from "@/lib/context/AdminContentContext";
import AdminPageHeader, { AdminAlert, AdminLoading } from "@/components/admin/AdminPageHeader";
import Upload from "@/components/admin/ui/Upload";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";
import SaveBar from "@/components/admin/ui/SaveBar";

const BRAND_KEYS = new Set(["logo", "favicon"]);
const DOOR_KEYS = ["heroCephe", "heroIc", "heroPoster"] as const;
const DEFAULT_DOOR_UV = { u0: 0.368, u1: 0.633, v0: 0.552, v1: 1 };

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

  const doorUv = {
    ...DEFAULT_DOOR_UV,
    ...(content?.hero?.doorUv || {}),
  };

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

  const setUv = (patch: Partial<typeof DEFAULT_DOOR_UV>) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        doorUv: { ...doorUv, ...patch },
      },
    });
  };

  const saveUv = async () => {
    setSavingUv(true);
    try {
      const res = await api.updateContent({
        hero: { ...content.hero, doorUv },
      });
      setContent(res.data);
      setMessage("Kapı hizası kaydedildi. Ana sayfayı yenileyin.");
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
    const src = url ? withCacheBust(resolveMediaUrl(url), key) : "";
    const accept =
      key === "logo" || key === "favicon"
        ? "image/svg+xml,.svg,image/png,image/webp,image/jpeg,image/gif"
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
              ? "relative flex min-h-[240px] items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#2a1a12,transparent_55%),#0D1117] p-6"
              : "flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#0D1117]"
          }
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={info.label}
              className={
                featured
                  ? "max-h-52 max-w-full object-contain drop-shadow-lg"
                  : key === "logo" || key === "favicon"
                    ? "max-h-full max-w-full object-contain p-6"
                    : "h-full w-full object-cover"
              }
            />
          ) : (
            <ImageIcon className="h-10 w-10 text-[#4A5568]" />
          )}
          {featured && src && (
            <div
              className="pointer-events-none absolute border-2 border-[#E8B84B]/85 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]"
              style={{
                left: `${doorUv.u0 * 100}%`,
                right: `${(1 - doorUv.u1) * 100}%`,
                top: `${doorUv.v0 * 100}%`,
                bottom: `${(1 - doorUv.v1) * 100}%`,
              }}
              title="Açılan kapı bölgesi"
            />
          )}
        </div>
        <div className="space-y-3 p-4">
          <div>
            <div className="flex items-center gap-2">
              {featured && <DoorOpen className="h-4 w-4 text-[#C8703A]" />}
              {opts?.featured === false && key === "logo" && (
                <Sparkles className="h-4 w-4 text-[#C8703A]" />
              )}
              <p className="font-medium text-[#EEE9E0]">{info.label}</p>
            </div>
            <p className="text-xs text-[#8A9BB0]">{info.hint}</p>
            {url && <p className="mt-1 truncate text-xs text-[#6B7A94]">{url}</p>}
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
                    ? "Favicon (SVG veya PNG)"
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
        description="Açılan kapı = “Kapı cephe (3D)”. Mobilde aynı fotoğraf poster olarak kullanılır."
      />
      <AdminAlert message={message} type={messageType} />

      <section className="mb-8 rounded-2xl border border-[#C8703A]/25 bg-[#141E2E]/60 p-5">
        <div className="mb-4 flex items-start gap-3">
          <DoorOpen className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B84B]" />
          <div>
            <h3 className="font-semibold text-[#F8F8F8]">3D açılan kapı</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#8A9BB0]">
              Ana sayfada kaydırınca açılan kapı buradan gelir. Cephe fotoğrafını yükleyin;
              kırparken <strong className="text-[#EEE9E0]">kapı girişini ortada</strong> bırakın
              (Serbest veya 4:3). “Hero afiş” yalnız yedektir — kapı için değil.
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

        <div className="mt-6 space-y-3 rounded-xl border border-white/[0.06] bg-[#0D1117]/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB0]">
            Kapı hizası (ince ayar)
          </p>
          <p className="text-[11px] text-[#6B7A94]">
            Kapı yanlış yerde açılıyorsa değerleri kaydırın. Sol/sağ 0–1, üst/alt 0–1.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Sol (u0)"
              type="number"
              step="0.005"
              min={0}
              max={1}
              value={String(doorUv.u0)}
              onChange={(e) => setUv({ u0: Number(e.target.value) })}
            />
            <Input
              label="Sağ (u1)"
              type="number"
              step="0.005"
              min={0}
              max={1}
              value={String(doorUv.u1)}
              onChange={(e) => setUv({ u1: Number(e.target.value) })}
            />
            <Input
              label="Üst (v0)"
              type="number"
              step="0.005"
              min={0}
              max={1}
              value={String(doorUv.v0)}
              onChange={(e) => setUv({ v0: Number(e.target.value) })}
            />
            <Input
              label="Alt (v1)"
              type="number"
              step="0.005"
              min={0}
              max={1}
              value={String(doorUv.v1)}
              onChange={(e) => setUv({ v1: Number(e.target.value) })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setContent({
                  ...content,
                  hero: { ...content.hero, doorUv: { ...DEFAULT_DOOR_UV } },
                })
              }
            >
              Varsayılana dön
            </Button>
            <SaveBar onSave={() => void saveUv()} saving={savingUv} />
          </div>
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
