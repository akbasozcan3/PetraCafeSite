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
          <div className="rsv-steps__header">
            <span className="rsv-steps__badge">
              <Sparkles style={{ width: 13, height: 13 }} />
              Adım {currentStep} / 3
            </span>
            <span className="rsv-steps__title">
              {currentStep === 1
                ? "Tarih, Saat & Kişi"
                : currentStep === 2
                ? "Masa & Loca Seçimi"
                : "İletişim & Onay"}
            </span>
          </div>

          {/* İlerleme Çubuğu */}
          <div className="rsv-steps__bar">
            <div
              onClick={() => setCurrentStep(1)}
              className={`rsv-steps__segment ${
                currentStep === 1 ? "is-active" : currentStep > 1 ? "is-passed" : ""
              }`}
              title="1. Adım: Tarih & Kişi"
            />
            <div
              onClick={() => (time ? setCurrentStep(2) : null)}
              className={`rsv-steps__segment ${
                currentStep === 2 ? "is-active" : currentStep > 2 ? "is-passed" : ""
              }`}
              title="2. Adım: Masa Seçimi"
            />
            <div
              onClick={() => (time ? setCurrentStep(3) : null)}
              className={`rsv-steps__segment ${
                currentStep === 3 ? "is-active" : ""
              }`}
              title="3. Adım: Onay"
            />
          </div>

          {status === "ok" ? (
            <div className="petra-form__success" style={{ textAlign: "center", padding: "24px 8px" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  margin: "0 auto 16px",
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.25rem", color: "var(--ink, #0d0f0a)" }}>
                Talebiniz Alındı!
              </h3>
              <p style={{ margin: "0 0 20px", fontSize: "0.9rem", color: "var(--muted, #6e6a5c)", lineHeight: 1.5 }}>
                {copy?.successMetin ||
                  "Rezervasyon talebiniz kaydedildi. Ekibimiz en kısa sürede sizinle iletişime geçerek teyit edecektir."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setCurrentStep(1);
                }}
                className="btn btn--gold"
                style={{ minHeight: 46, padding: "0 24px" }}
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
                <div>
                  <div className="petra-form__head">
                    <p className="petra-form__kicker">1. ADIM</p>
                    <h3>Ne zaman gelmek istersiniz?</h3>
                    <p>Tarih, saat ve kişi sayısını belirleyin.</p>
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

                  {error && <p className="petra-form__err" style={{ color: "#dc2626", fontSize: 13, marginTop: 8 }}>{error}</p>}

                  <div className="rsv-steps__actions">
                    <button
                      type="button"
                      onClick={handleNextToStep2}
                      disabled={closed || !time}
                      className="rsv-steps__btn-next"
                    >
                      <span>Masamı Seç (2. Adım)</span>
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 2: İNTERAKTİF MASA & LOCA SEÇİMİ (KROKİDEN) */}
              {/* ========================================================================= */}
              {currentStep === 2 && (
                <div>
                  <div className="petra-form__head">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <p className="petra-form__kicker">2. ADIM</p>
                        <h3>Masa / Loca Seçin</h3>
                      </div>
                      <span className="rsv-steps__badge">
                        {date} · {time} · {guests} Kişi
                      </span>
                    </div>
                    <p>Havuz krokisindeki yeşil masalara dokunarak yerinizi ayırtabilirsiniz.</p>
                  </div>

                  {/* İnteraktif Kroki SVG Bileşeni */}
                  <div className="rsv-floorplan-container">
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
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "#f6f1e6",
                      border: "1px solid rgba(13, 15, 10, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted, #6e6a5c)", display: "block" }}>
                        Seçilen Yer
                      </span>
                      {selectedTable ? (
                        <p style={{ margin: "2px 0 0", fontWeight: 700, color: "var(--brass-lo, #b8842c)", fontSize: 14 }}>
                          🪑 {selectedTable.name} <span style={{ fontSize: 12, color: "#6e6a5c", fontWeight: 400 }}>({selectedTable.capacity} Kişilik)</span>
                        </p>
                      ) : (
                        <p style={{ margin: "2px 0 0", fontWeight: 600, color: "var(--ink, #0d0f0a)", fontSize: 13 }}>
                          Otomatik Masa (Restoranda Belirlenecek)
                        </p>
                      )}
                    </div>
                    {selectedTable ? (
                      <button
                        type="button"
                        onClick={() => setSelectedTable(null)}
                        style={{ background: "none", border: "none", color: "#dc2626", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
                      >
                        Seçimi Kaldır
                      </button>
                    ) : null}
                  </div>

                  {/* Adım Butonları */}
                  <div className="rsv-steps__actions">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="rsv-steps__btn-prev"
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} />
                      <span>Geri (Tarih)</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextToStep3}
                      className="rsv-steps__btn-next"
                    >
                      <span>İletişim Bilgileri (3. Adım)</span>
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 3: İLETİŞİM BİLGİLERİ & REZERVASYON ÖZETİ */}
              {/* ========================================================================= */}
              {currentStep === 3 && (
                <form onSubmit={submit}>
                  <div className="petra-form__head">
                    <p className="petra-form__kicker">3. ADIM (SON)</p>
                    <h3>Misafir Bilgileri</h3>
                    <p>Talebinizi onaylayabilmemiz için bilgilerinizi girin.</p>
                  </div>

                  {/* Rezervasyon Özet Kartı */}
                  <div className="rsv-steps__summary">
                    <span className="rsv-steps__summary-tag">
                      <Calendar style={{ width: 14, height: 14, color: "var(--brass-lo, #b8842c)" }} /> {date}
                    </span>
                    <span className="rsv-steps__summary-tag">
                      <Clock style={{ width: 14, height: 14, color: "var(--brass-lo, #b8842c)" }} /> {time}
                    </span>
                    <span className="rsv-steps__summary-tag">
                      <Users style={{ width: 14, height: 14, color: "var(--brass-lo, #b8842c)" }} /> {guests} Kişi
                    </span>
                    <span className="rsv-steps__summary-tag" style={{ color: "var(--brass-lo, #b8842c)" }}>
                      🪑 {selectedTable ? selectedTable.name : "Otomatik Masa"}
                    </span>
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

                  <div className="field" style={{ marginTop: 12 }}>
                    <label htmlFor="rsv-email">
                      E-Posta <span style={{ fontSize: 11, fontWeight: 400, color: "var(--brass-lo, #b8842c)" }}>(Onay maili almak için opsiyonel)</span>
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
                    <p className="petra-form__hint">
                      Rezervasyon onayınız bu adrese e-posta olarak da iletilir.
                    </p>
                  </div>

                  <div className="field" style={{ marginTop: 12 }}>
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

                  {error && <p className="petra-form__err" style={{ color: "#dc2626", fontSize: 13, marginTop: 8 }}>{error}</p>}

                  <div className="rsv-steps__actions">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="rsv-steps__btn-prev"
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} />
                      <span>Geri (Masa)</span>
                    </button>

                    <button
                      type="submit"
                      disabled={status === "saving"}
                      className="rsv-steps__btn-next"
                    >
                      {status === "saving" ? (
                        <span>{copy?.gonderiliyor || "İletiliyor…"}</span>
                      ) : (
                        <>
                          <span>{copy?.ctaLabel || "Rezervasyonu Tamamla"}</span>
                          <Check style={{ width: 16, height: 16 }} />
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