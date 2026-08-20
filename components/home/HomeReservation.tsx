"use client";

import { useEffect, useMemo, useState } from "react";
import { displayHours, nextBookableDate, reservationSlotsForDate } from "@/lib/content/hours";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import {
  formatPhoneInput,
  isPhoneTypingKey,
  sanitizePhoneDigits,
} from "@/lib/content/contact-utils";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import InteractiveFloorPlan from "@/components/site/InteractiveFloorPlan";
import { RestaurantTable } from "@/lib/content/tables-data";
import type { BolumBaslik, IletisimContent, RezervasyonCopy } from "@/lib/content/types";
import { ArrowLeft, ArrowRight, Check, Calendar, Users, Clock, Sparkles } from "lucide-react";

const GUESTS = Array.from({ length: 20 }, (_, i) => i + 1);

function maxIsoFrom(minDate: string) {
  const d = new Date(`${minDate}T12:00:00`);
  d.setDate(d.getDate() + 90);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function HomeReservation({
  contactPhone,
  iletisim,
  bolum,
  copy,
  image,
}: {
  contactPhone?: string;
  iletisim?: IletisimContent;
  bolum?: BolumBaslik;
  copy?: RezervasyonCopy;
  image?: string;
}) {
  const minDate = nextBookableDate(iletisim);
  const maxDate = maxIsoFrom(minDate);

  // Steps Durumu: 1 = Tarih/Saat/Kişi, 2 = Masa Seçimi, 3 = İletişim & Onay
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [bookedTables, setBookedTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const img = resolveMediaUrl(liveMedia(image, SITE_PHOTOS.interior));
  const hours = displayHours(iletisim);
  const slots = useMemo(() => reservationSlotsForDate(date, iletisim), [date, iletisim]);
  const availableSlots = useMemo(
    () => slots.filter((s) => !bookedTimes.includes(s)),
    [slots, bookedTimes]
  );
  const closed = slots.length === 0 || availableSlots.length === 0;

  useEffect(() => {
    if (date < minDate) setDate(minDate);
  }, [date, minDate]);

  // Tarih veya saat değiştiğinde dolu saatleri ve dolu masaları çek
  useEffect(() => {
    let active = true;
    const timeParam = time ? `&time=${encodeURIComponent(time)}` : "";
    void fetch(`/api/v1/reservations?date=${encodeURIComponent(date)}${timeParam}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (Array.isArray(d?.bookedTimes)) {
          setBookedTimes(d.bookedTimes);
        }
        if (Array.isArray(d?.bookedTables)) {
          setBookedTables(d.bookedTables);
          if (selectedTable && d.bookedTables.includes(selectedTable.id)) {
            setSelectedTable(null);
          }
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [date, time, selectedTable]);

  useEffect(() => {
    if (!availableSlots.length) {
      setTime("");
      return;
    }
    if (!availableSlots.includes(time)) {
      setTime(availableSlots[0]);
    }
  }, [availableSlots, time]);

  const ticks = [
    hours,
    ...((copy?.maddeler || []).filter((line) => line.trim())),
  ].filter(Boolean) as string[];

  // Adım İlerletme Fonksiyonları
  const handleNextToStep2 = () => {
    if (closed || !time || !slots.includes(time)) {
      setStatus("err");
      setError(
        copy?.hataKapali ||
          "Bu tarih için uygun saat kalmadı. Lütfen başka bir gün veya saat seçin."
      );
      return;
    }
    setError("");
    setStatus("idle");
    setCurrentStep(2);
  };

  const handleNextToStep3 = () => {
    setError("");
    setStatus("idle");
    setCurrentStep(3);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (closed || !time || !slots.includes(time)) {
      setStatus("err");
      setError(
        copy?.hataKapali ||
          "Bu tarih için uygun saat kalmadı. Lütfen başka bir gün seçin."
      );
      return;
    }
    const digits = sanitizePhoneDigits(phone);
    if (digits.length < 10 || digits.length > 11) {
      setStatus("err");
      setError(copy?.hataTelefon || "Geçerli bir telefon girin (10–11 hane).");
      return;
    }
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/v1/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email.trim() || undefined,
          date,
          time,
          guests,
          tableId: selectedTable?.id || undefined,
          tableName: selectedTable?.name || undefined,
          note,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setError(data.error || "Gönderilemedi.");
        return;
      }
      setStatus("ok");
      setName("");
      setPhone("");
      setEmail("");
      setSelectedTable(null);
      setNote("");
    } catch {
      setStatus("err");
      setError(copy?.hataBaglanti || "Bağlantı hatası. Lütfen telefonla deneyin.");
    }
  };

  return (
    <section className="section section--dark rsv-sec" id="rezervasyon">
      <div className="wrap rsv">
        {/* Sol Alan: Tanıtım & Fotoğraf */}
        <div>
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Rezervasyon"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Masanızı ayırtın"}
          </h2>
          {bolum?.lead ? (
            <p className="lead" data-fade="">
              {bolum.lead}
            </p>
          ) : null}
          {ticks.length ? (
            <ul className="ticks" data-fade="">
              {ticks.map((line) => (
                <li key={line}>
                  <span className="tick-ico">
                    <SiteIcon name="check" size={18} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {img ? (
            <figure className="rsv__shot" data-fade="">
              <SafeImg
                src={img}
                alt={copy?.gorselAlt || bolum?.baslik || "Rezervasyon"}
                fallback={SITE_PHOTOS.interior}
              />
            </figure>
          ) : null}
        </div>

        {/* Sağ Alan: Adımlı Rezervasyon Formu (Steps Wizard) */}
        <div className="form petra-form rsv__form" data-fade="">
          {/* STEPPER BAŞLIK & İNDİKATÖRÜ */}
          <div className="mb-5 border-b border-white/10 pb-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D9A441] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Adım {currentStep} / 3
              </span>
              <span className="text-xs text-white/50">
                {currentStep === 1
                  ? "Tarih, Saat & Kişi"
                  : currentStep === 2
                  ? "Masa & Loca Seçimi"
                  : "İletişim & Onay"}
              </span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="grid grid-cols-3 gap-2">
              <div
                onClick={() => setCurrentStep(1)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentStep >= 1 ? "bg-[#D9A441]" : "bg-white/10"
                }`}
                title="1. Adım: Tarih & Kişi"
              />
              <div
                onClick={() => (time ? setCurrentStep(2) : null)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  time ? "cursor-pointer" : "cursor-not-allowed"
                } ${currentStep >= 2 ? "bg-[#D9A441]" : "bg-white/10"}`}
                title="2. Adım: Masa Seçimi"
              />
              <div
                onClick={() => (time ? setCurrentStep(3) : null)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  time ? "cursor-pointer" : "cursor-not-allowed"
                } ${currentStep === 3 ? "bg-[#D9A441]" : "bg-white/10"}`}
                title="3. Adım: Onay"
              />
            </div>
          </div>

          {status === "ok" ? (
            <div className="petra-form__success text-center py-8 animate-fadeIn">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-[#F4EEE1] mb-2">Talebiniz Alındı!</h3>
              <p className="text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
                {copy?.successMetin ||
                  "Rezervasyon talebiniz kaydedildi. Ekibimiz en kısa sürede sizinle iletişime geçerek teyit edecektir."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setCurrentStep(1);
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold text-xs hover:bg-[#E5B555] transition shadow-md"
              >
                Yeni Rezervasyon Oluştur
              </button>
            </div>
          ) : (
            <div>
              {/* ========================================================================= */}
              {/* ADIM 1: TARİH, SAAT VE KİŞİ SAYISI */}
              {/* ========================================================================= */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="petra-form__head">
                    <p className="petra-form__kicker">1. Adım</p>
                    <h3 className="text-lg font-bold text-[#F4EEE1]">Ne zaman gelmek istersiniz?</h3>
                    <p className="text-xs text-white/60">Tarih, saat ve kişi sayısını belirleyin.</p>
                  </div>

                  <div className="petra-form__row petra-form__row--date">
                    <div className="field field--date">
                      <label htmlFor="rsv-date">
                        {copy?.labelTarih || "Tarih"} <i>*</i>
                      </label>
                      <input
                        id="rsv-date"
                        name="date"
                        type="date"
                        required
                        min={minDate}
                        max={maxDate}
                        value={date < minDate ? minDate : date}
                        onChange={(e) => {
                          const next = e.target.value;
                          setDate(next < minDate ? minDate : next);
                        }}
                        className="petra-form__date"
                        lang="tr"
                      />
                      <p className="petra-form__hint">Geçmiş gün ve saat seçilemez.</p>
                    </div>
                  </div>

                  <div className="petra-form__row">
                    <div className="field">
                      <label htmlFor="rsv-time">
                        {copy?.labelSaat || "Saat"} <i>*</i>
                      </label>
                      <select
                        id="rsv-time"
                        name="time"
                        required={!closed}
                        disabled={closed}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        {closed ? (
                          <option value="">
                            {slots.length > 0 && availableSlots.length === 0
                              ? "Bu günün tüm saatleri doludur"
                              : copy?.kapaliMetin || "Bu gün için uygun saat yok"}
                          </option>
                        ) : (
                          slots.map((s) => {
                            const isBooked = bookedTimes.includes(s);
                            return (
                              <option key={s} value={s} disabled={isBooked}>
                                {s} {isBooked ? "— (Dolu)" : ""}
                              </option>
                            );
                          })
                        )}
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="rsv-guests">
                        {copy?.labelKisi || "Kişi"} <i>*</i>
                      </label>
                      <select
                        id="rsv-guests"
                        name="guests"
                        required
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                      >
                        {GUESTS.map((n) => (
                          <option key={n} value={n}>
                            {(copy?.kisiSablon || "{n} kişi").replace("{n}", String(n))}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && <p className="petra-form__err text-xs text-red-400">{error}</p>}

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleNextToStep2}
                      disabled={closed || !time}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold text-sm hover:bg-[#E5B555] transition shadow-lg disabled:opacity-50"
                    >
                      <span>Masamı Seç (2. Adım)</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 2: İNTERAKTİF MASA & LOCA SEÇİMİ (KROKİDEN) */}
              {/* ========================================================================= */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="petra-form__head">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="petra-form__kicker">2. Adım</p>
                        <h3 className="text-lg font-bold text-[#F4EEE1]">Masa / Loca Seçin</h3>
                      </div>
                      <span className="text-xs text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-1 rounded-lg border border-[#D9A441]/20">
                        {date} · {time} · {guests} Kişi
                      </span>
                    </div>
                    <p className="text-xs text-white/70">
                      Havuz krokisindeki yeşil masalara dokunarak yerinizi ayırtabilirsiniz.
                    </p>
                  </div>

                  {/* İnteraktif Kroki SVG Bileşeni */}
                  <div className="border border-white/10 rounded-2xl p-2 sm:p-3 bg-[#0D1117] shadow-inner">
                    <InteractiveFloorPlan
                      selectedTableId={selectedTable?.id}
                      onSelectTable={(tbl) => setSelectedTable(tbl)}
                      bookedTableIds={bookedTables}
                      guestsCount={guests}
                      date={date}
                      time={time}
                    />
                  </div>

                  {/* Seçilen Masa Durum Bildirimi */}
                  <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-white/50 block">Seçilen Yer</span>
                      {selectedTable ? (
                        <p className="text-sm font-bold text-[#D9A441] truncate flex items-center gap-1.5">
                          <span>🪑</span>
                          <span>{selectedTable.name}</span>
                          <span className="text-xs text-white/60 font-normal">({selectedTable.capacity} Kişilik)</span>
                        </p>
                      ) : (
                        <p className="text-xs text-white/80 font-medium">
                          Otomatik Masa (Restoranda Belirlenecek)
                        </p>
                      )}
                    </div>
                    {selectedTable ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTable(null)}
                        className="text-xs text-red-300 hover:text-red-200 underline shrink-0"
                      >
                        Seçimi Kaldır
                      </button>
                    ) : null}
                  </div>

                  {/* Adım Butonları */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border border-white/15 text-white/80 font-semibold text-xs hover:bg-white/5 transition"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Geri (Tarih)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextToStep3}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold text-xs hover:bg-[#E5B555] transition shadow-lg"
                    >
                      <span>İletişim Bilgileri (3. Adım)</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 3: İLETİŞİM BİLGİLERİ & REZERVASYON ÖZETİ */}
              {/* ========================================================================= */}
              {currentStep === 3 && (
                <form onSubmit={submit} className="space-y-4 animate-fadeIn">
                  <div className="petra-form__head">
                    <p className="petra-form__kicker">3. Adım (Son)</p>
                    <h3 className="text-lg font-bold text-[#F4EEE1]">Misafir Bilgileri</h3>
                    <p className="text-xs text-white/60">Talebinizi onaylayabilmemiz için bilgilerinizi girin.</p>
                  </div>

                  {/* Rezervasyon Özet Kartı */}
                  <div className="p-3.5 rounded-xl border border-[#D9A441]/30 bg-[#D9A441]/10 text-xs text-[#F4EEE1] space-y-1.5">
                    <p className="font-bold text-[#D9A441] text-[11px] uppercase tracking-wider">Rezervasyon Özeti</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#D9A441]" /> {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#D9A441]" /> {time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-[#D9A441]" /> {guests} Kişi
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#D9A441]">
                        🪑 {selectedTable ? selectedTable.name : "Otomatik Masa"}
                      </span>
                    </div>
                  </div>

                  <div className="petra-form__row">
                    <div className="field">
                      <label htmlFor="rsv-name">
                        {copy?.labelAd || "Ad soyad"} <i>*</i>
                      </label>
                      <input
                        id="rsv-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder={copy?.placeholderAd || "Adınız soyadınız"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="rsv-phone">
                        {copy?.labelTelefon || "Telefon"} <i>*</i>
                      </label>
                      <input
                        id="rsv-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        placeholder={copy?.placeholderTelefon || contactPhone || "0530 608 90 51"}
                        value={phone}
                        onKeyDown={(e) => {
                          if (isPhoneTypingKey(e.key, e.ctrlKey || e.metaKey || e.altKey)) return;
                          if (e.key === "Backspace" || e.key === "Delete" || e.key === "Tab") return;
                          if (e.ctrlKey || e.metaKey) return;
                          e.preventDefault();
                        }}
                        onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="rsv-email">
                      E-Posta <span className="text-[#D9A441] text-[10px] font-normal">(Onay maili almak için opsiyonel)</span>
                    </label>
                    <input
                      id="rsv-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="ornek@posta.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="petra-form__hint text-xs text-white/50 mt-1">
                      Rezervasyon onayınız bu adrese e-posta olarak da iletilir.
                    </p>
                  </div>

                  <div className="field">
                    <label htmlFor="rsv-note">{copy?.labelNot || "Özel Not / İstek"}</label>
                    <textarea
                      id="rsv-note"
                      name="note"
                      rows={2}
                      placeholder={copy?.placeholderNot || "Alerjen, kutlama veya özel isteklerinizi belirtebilirsiniz…"}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  {/* Honeypot Bot Koruması */}
                  <div className="petra-form__hp" aria-hidden="true" style={{ display: "none" }}>
                    <label htmlFor="rsv-website">Website</label>
                    <input
                      id="rsv-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {error && <p className="petra-form__err text-xs text-red-400">{error}</p>}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl border border-white/15 text-white/80 font-semibold text-xs hover:bg-white/5 transition"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Geri (Masa)</span>
                    </button>

                    <button
                      type="submit"
                      disabled={status === "saving"}
                      className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D9A441] text-[#0D0F0A] font-bold text-sm hover:bg-[#E5B555] transition shadow-xl disabled:opacity-50"
                    >
                      {status === "saving" ? (
                        <span>{copy?.gonderiliyor || "İletiliyor…"}</span>
                      ) : (
                        <>
                          <span>{copy?.ctaLabel || "Rezervasyonu Tamamla"}</span>
                          <Check className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}