"use client";

import { useEffect, useMemo, useState } from "react";
import { displayHours, reservationSlotsForDate } from "@/lib/content/hours";
import { resolveMediaUrl } from "@/lib/admin/media-url";
import { liveMedia, SITE_PHOTOS } from "@/lib/content/media-fallbacks";
import {
  formatPhoneInput,
  isPhoneTypingKey,
  sanitizePhoneDigits,
} from "@/lib/content/contact-utils";
import SafeImg from "@/components/site/SafeImg";
import SiteIcon from "@/components/site/SiteIcon";
import type { BolumBaslik, IletisimContent, RezervasyonCopy } from "@/lib/content/types";

const GUESTS = Array.from({ length: 20 }, (_, i) => i + 1);

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function maxIso() {
  const d = new Date();
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
  const minDate = todayIso();
  const maxDate = maxIso();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const img = resolveMediaUrl(liveMedia(image, SITE_PHOTOS.interior));
  const hours = displayHours(iletisim);
  const slots = useMemo(() => reservationSlotsForDate(date, iletisim), [date, iletisim]);
  const closed = slots.length === 0;

  useEffect(() => {
    if (!slots.length) {
      setTime("");
      return;
    }
    if (!slots.includes(time)) setTime(slots[0]);
  }, [slots, time]);

  const ticks = [
    hours,
    ...((copy?.maddeler || []).filter((line) => line.trim())),
  ].filter(Boolean) as string[];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (closed || !time || !slots.includes(time)) {
      setStatus("err");
      setError(copy?.hataKapali || "Bu gün kapalıyız veya saat çalışma saatleri dışında.");
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
          date,
          time,
          guests,
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
          <div className="petra-form__row petra-form__row--3">
            <div className="field">
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="petra-form__date"
                lang="tr"
              />
            </div>
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
                  <option value="">{copy?.kapaliMetin || "Bu gün kapalıyız"}</option>
                ) : (
                  slots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))
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
            <label htmlFor="rsv-note">{copy?.labelNot || "Not"}</label>
            <textarea
              id="rsv-note"
              name="note"
              maxLength={500}
              rows={4}
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
