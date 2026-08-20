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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [bookedTables, setBookedTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
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
          // Eğer seçili masa o saatte dolduysa seçimi uyar ve kaldır
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
      setShowFloorPlan(false);
      setNote("");
    } catch {
      setStatus("err");
      setError(copy?.hataBaglanti || "Bağlantı hatası. Lütfen telefonla deneyin.");
    }
  };

  return (
    <section className="section section--dark rsv-sec" id="rezervasyon">
      <div className="wrap rsv">
        <div>
          <p className="eyebrow" data-fade="">
            {bolum?.eyebrow || "Rezervasyon"}
          </p>
          <h2 className="h2" data-split="">
            {bolum?.baslik || "Masınızı ayırtın"}
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

        <form className="form petra-form rsv__form" onSubmit={submit} data-fade="">
          <div className="petra-form__head">
            <p className="petra-form__kicker">{copy?.formKicker || bolum?.eyebrow || "Rezervasyon"}</p>
            <h3>{copy?.formBaslik || "Tarih ve saat seçin"}</h3>
            {copy?.formLead ? <p>{copy.formLead}</p> : null}
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

          {/* İnteraktif Masa & Loca Seçimi Tetikleyici Buton */}
          <div className="petra-form__table-select my-2">
            <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] transition">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#D9A441] uppercase tracking-wider">
                  Masa & Loca Tercihi (Opsiyonel)
                </p>
                {selectedTable ? (
                  <p className="text-sm font-bold text-[#F4EEE1] mt-0.5 flex items-center gap-1.5 truncate">
                    <span>🪑</span>
                    <span className="text-[#D9A441]">{selectedTable.name}</span>
                    <span className="text-xs text-white/50 font-normal">({selectedTable.capacity} Kişilik)</span>
                  </p>
                ) : (
                  <p className="text-xs text-white/70 mt-0.5">
                    Havuz başı veya VIP localardan dilediğinizi krokiden seçin.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowFloorPlan((prev) => !prev)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 flex-shrink-0 ${
                  selectedTable
                    ? "bg-[#D9A441] text-[#0D0F0A] shadow-md hover:bg-[#b8842c]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span>{showFloorPlan ? "Planı Kapat ▲" : selectedTable ? "Masayı Değiştir ▾" : "Krokiden Seç ▾"}</span>
              </button>
            </div>

            {/* İnteraktif Kat Planı Modalı / Açılır Paneli */}
            {showFloorPlan ? (
              <div className="mt-3 animate-fadeIn">
                <InteractiveFloorPlan
                  selectedTableId={selectedTable?.id}
                  onSelectTable={(tbl) => {
                    setSelectedTable(tbl);
                    if (tbl) {
                      // Masa seçilince otomatik kapatmak yerine açık bırakabiliriz veya seçimi onaylatabiliriz
                    }
                  }}
                  bookedTableIds={bookedTables}
                  guestsCount={guests}
                  date={date}
                  time={time}
                />
              </div>
            ) : null}
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
                placeholder={copy?.placeholderAd || ""}
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
                autoComplete="tel"
                required
                inputMode="numeric"
                pattern="[0-9 ]*"
                maxLength={14}
                placeholder={copy?.placeholderTelefon || contactPhone || ""}
                value={phone}
                onKeyDown={(e) => {
                  if (!isPhoneTypingKey(e.key, e.ctrlKey || e.metaKey || e.altKey)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="rsv-email">
              E-posta <i>(Opsiyonel)</i>
            </label>
            <input
              id="rsv-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={120}
              placeholder="ornek@eposta.com (Onay maili almak için)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="petra-form__hint" style={{ marginTop: 4, fontSize: 12, color: "#8E8A7E" }}>
              Rezervasyon onayınız bu adrese e-posta olarak da iletilir.
            </p>
          </div>
          <div className="field">
            <label htmlFor="rsv-note">{copy?.labelNot || "Not"}</label>
            <textarea
              id="rsv-note"
              name="note"
              maxLength={500}
              rows={3}
              placeholder={copy?.placeholderNot || ""}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="rsv__hp" aria-hidden="true">
            <label htmlFor="rsv-web">Website</label>
            <input
              id="rsv-web"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {error ? (
            <p className="err" role="alert">
              {error}
            </p>
          ) : null}
          {status === "ok" ? (
            <p className="form__note" role="status" aria-live="polite">
              {copy?.successMetin || "Talebiniz alındı. Onay için sizi arayacağız."}
            </p>
          ) : null}
          <button
            className="btn btn--lg petra-form__submit"
            type="submit"
            disabled={status === "saving" || closed}
          >
            {status === "saving"
              ? copy?.gonderiliyor || "Gönderiliyor…"
              : status === "ok"
                ? copy?.ctaLabel || "Yeni rezervasyon"
                : copy?.ctaLabel || "Rezervasyon gönder"}
          </button>
        </form>
      </div>
    </section>
  );
}
