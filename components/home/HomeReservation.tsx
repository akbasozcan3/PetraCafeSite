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
import { ArrowLeft, ArrowRight, Check, Calendar, Users, Clock, Sparkles, CreditCard, ShieldCheck, X } from "lucide-react";

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

  // Steps Durumu: 1 = Tarih/Saat/Kişi, 2 = Masa Seçimi, 3 = İletişim & Onay/Ödeme
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
  const [paymentChoice, setPaymentChoice] = useState<"free" | "paytr">("free");
  const [paytrToken, setPaytrToken] = useState<string | null>(null);
  const [showPaytrModal, setShowPaytrModal] = useState(false);
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
    if (!selectedTable) {
      setStatus("err");
      setError("Lütfen rezervasyonunuz için havuz krokisinden veya listeden bir masa/loca seçiniz.");
      return;
    }
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

    // Eğer kullanıcı PayTR ile Online Kapora Ödemesini seçtiyse:
    if (paymentChoice === "paytr") {
      try {
        const payRes = await fetch("/api/v1/payment/paytr/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 250, // 250 TL Kapora Bedeli
            userEmail: email.trim() || `${digits}@petra.local`,
            userName: name,
            userPhone: phone,
            userAddress: "Petra Cafe & Restaurant Rezervasyon",
            basket: [
              { name: `Petra Rezervasyon Kaporası (${date} - ${time})`, price: 250, quantity: 1 },
            ],
          }),
        });

        const rawText = await payRes.text();
        let payData: { token?: string; error?: string } = {};
        try {
          payData = JSON.parse(rawText);
        } catch {
          throw new Error("PayTR Sanal POS bağlantısı kurulamadı. Lütfen admin panelinden PayTR anahtarlarınızı kontrol edin veya Normal Rezervasyon seçeneğini kullanın.");
        }

        if (!payRes.ok || !payData.token) {
          throw new Error(payData.error || "PayTR mağaza anahtarları eksik veya ödeme başlatılamadı.");
        }
        setPaytrToken(payData.token);
        setShowPaytrModal(true);
        setStatus("idle");
        return;
      } catch (err: any) {
        setStatus("err");
        setError(err?.message || "Ödeme bağlantısı kurulamadı. Normal Rezervasyon seçeneğiyle devam edebilirsiniz.");
        return;
      }
    }


    // Standart Rezervasyon Talebi (Ücretsiz / Kapıda Ödeme):
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
      <div className="wrap rsv" style={{ alignItems: "center" }}>
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
        <div
          className="form petra-form rsv__form"
          data-fade=""
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: "26px 22px",
            boxShadow: "0 22px 50px -20px rgba(0,0,0,0.35)",
            border: "1px solid rgba(184, 132, 44, 0.25)",
          }}
        >
          {/* STEPPER BAŞLIK & İNDİKATÖRÜ */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                background: "rgba(184, 132, 44, 0.15)",
                color: "#b8842c",
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <Sparkles style={{ width: 13, height: 13 }} />
              Adım {currentStep} / 3
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#6e6a5c" }}>
              {currentStep === 1
                ? "Tarih, Saat & Kişi"
                : currentStep === 2
                ? "Masa & Loca Seçimi"
                : "İletişim & Onay"}
            </span>
          </div>

          {/* İlerleme Çubuğu */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
            <div
              onClick={() => setCurrentStep(1)}
              style={{
                height: 6,
                borderRadius: 999,
                background: currentStep === 1 ? "#d9a441" : currentStep > 1 ? "#12150e" : "rgba(13, 15, 10, 0.12)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              title="1. Adım: Tarih & Kişi"
            />
            <div
              onClick={() => (time ? setCurrentStep(2) : null)}
              style={{
                height: 6,
                borderRadius: 999,
                background: currentStep === 2 ? "#d9a441" : currentStep > 2 ? "#12150e" : "rgba(13, 15, 10, 0.12)",
                cursor: time ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
              }}
              title="2. Adım: Masa Seçimi"
            />
            <div
              onClick={() => (time ? setCurrentStep(3) : null)}
              style={{
                height: 6,
                borderRadius: 999,
                background: currentStep === 3 ? "#d9a441" : "rgba(13, 15, 10, 0.12)",
                cursor: time ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
              }}
              title="3. Adım: Onay"
            />
          </div>

          {status === "ok" ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1.5px solid rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: "bold",
                  margin: "0 auto 14px",
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.3rem", fontWeight: 700, color: "#0d0f0a" }}>
                Rezervasyon Talebiniz Alındı!
              </h3>
              <p style={{ margin: "0 0 22px", fontSize: "0.92rem", color: "#6e6a5c", lineHeight: 1.5 }}>
                {copy?.successMetin ||
                  "Rezervasyon talebiniz başarıyla kaydedildi. Ekibimiz sizinle iletişime geçerek teyit edecektir."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setCurrentStep(1);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 46,
                  padding: "0 26px",
                  borderRadius: 12,
                  background: "#d9a441",
                  color: "#0d0f0a",
                  fontWeight: 700,
                  fontSize: 13.5,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(217, 164, 65, 0.35)",
                }}
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
                  <div className="petra-form__head" style={{ marginBottom: 16 }}>
                    <p className="petra-form__kicker">1. ADIM</p>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0d0f0a", margin: "4px 0" }}>
                      Ne zaman gelmek istersiniz?
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "#6e6a5c", margin: 0 }}>
                      Tarih, saat ve kişi sayısını belirleyin.
                    </p>
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

                  <div className="petra-form__row" style={{ marginTop: 14 }}>
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

                  {error && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 10 }}>{error}</p>}

                  <div style={{ marginTop: 22 }}>
                    <button
                      type="button"
                      onClick={handleNextToStep2}
                      disabled={closed || !time}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        width: "100%",
                        minHeight: 50,
                        padding: "14px 22px",
                        borderRadius: 14,
                        background: "#12150e",
                        color: "#f4eee1",
                        fontSize: 14.5,
                        fontWeight: 700,
                        border: "none",
                        cursor: closed || !time ? "not-allowed" : "pointer",
                        opacity: closed || !time ? 0.6 : 1,
                        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span>Masamı Seç (2. Adım)</span>
                      <ArrowRight style={{ width: 17, height: 17 }} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 2: İNTERAKTİF MASA & LOCA SEÇİMİ (KROKİDEN) */}
              {/* ========================================================================= */}
              {currentStep === 2 && (
                <div>
                  <div className="petra-form__head" style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <p className="petra-form__kicker">2. ADIM</p>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0d0f0a", margin: "4px 0" }}>
                          Masa / Loca Seçin
                        </h3>
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          padding: "4px 10px",
                          borderRadius: 8,
                          background: "rgba(184, 132, 44, 0.15)",
                          color: "#b8842c",
                          fontSize: 11.5,
                          fontWeight: 700,
                        }}
                      >
                        {date} · {time} · {guests} Kişi
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#6e6a5c", margin: 0 }}>
                      Havuz krokisindeki yeşil masalara dokunarak dilediğiniz yeri seçin.
                    </p>
                  </div>

                  {/* Lüks İnteraktif Kat Planı Bileşeni */}
                  <InteractiveFloorPlan
                    selectedTableId={selectedTable?.id}
                    onSelectTable={(tbl) => setSelectedTable(tbl)}
                    bookedTableIds={bookedTables}
                    guestsCount={guests}
                  />

                  {/* Adım Butonları */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        minHeight: 50,
                        padding: "12px 14px",
                        borderRadius: 14,
                        background: "#f6f1e6",
                        color: "#0d0f0a",
                        fontWeight: 600,
                        fontSize: 13,
                        border: "1px solid rgba(13, 15, 10, 0.12)",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} />
                      <span>Geri</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextToStep3}
                      style={{
                        flex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        minHeight: 50,
                        padding: "12px 18px",
                        borderRadius: 14,
                        background: "#12150e",
                        color: "#f4eee1",
                        fontWeight: 700,
                        fontSize: 13.5,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <span>İletişim & Onay (3. Adım)</span>
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* ADIM 3: İLETİŞİM BİLGİLERİ & ÖDEME SEÇENEĞİ */}
              {/* ========================================================================= */}
              {currentStep === 3 && (
                <form onSubmit={submit}>
                  <div className="petra-form__head" style={{ marginBottom: 12 }}>
                    <p className="petra-form__kicker">3. ADIM (SON)</p>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0d0f0a", margin: "4px 0" }}>
                      Misafir Bilgileri & Onay
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6e6a5c", margin: 0 }}>
                      Rezervasyon teyidi için bilgilerinizi girin.
                    </p>
                  </div>

                  {/* Rezervasyon Özet Kartı */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 14px",
                      borderRadius: 12,
                      background: "rgba(184, 132, 44, 0.08)",
                      border: "1px solid rgba(184, 132, 44, 0.25)",
                      marginBottom: 14,
                      fontSize: 12.5,
                      color: "#0d0f0a",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                      <Calendar style={{ width: 13, height: 13, color: "#b8842c" }} /> {date}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                      <Clock style={{ width: 13, height: 13, color: "#b8842c" }} /> {time}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                      <Users style={{ width: 13, height: 13, color: "#b8842c" }} /> {guests} Kişi
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700, color: "#b8842c" }}>
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

                  <div className="field" style={{ marginTop: 10 }}>
                    <label htmlFor="rsv-email">
                      E-Posta <span style={{ fontSize: 11, fontWeight: 400, color: "#b8842c" }}>(Onay maili almak için)</span>
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
                  </div>

                  <div className="field" style={{ marginTop: 10 }}>
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

                  {/* ÖDEME TERCİHİ SEÇENEKLERİ (PayTR & Ücretsiz Seçenek) */}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(13,15,10,0.1)" }}>
                    <label style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0d0f0a", display: "block", marginBottom: 8 }}>
                      Ödeme & Rezervasyon Türü
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div
                        onClick={() => setPaymentChoice("free")}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: paymentChoice === "free" ? "2px solid #b8842c" : "1px solid rgba(13,15,10,0.12)",
                          background: paymentChoice === "free" ? "rgba(184, 132, 44, 0.1)" : "#f6f1e6",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <input
                            type="radio"
                            name="paymentOption"
                            checked={paymentChoice === "free"}
                            onChange={() => setPaymentChoice("free")}
                            style={{ width: "auto", minHeight: "auto", margin: 0 }}
                          />
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#0d0f0a" }}>Normal Rezervasyon</span>
                        </div>
                        <p style={{ margin: "4px 0 0", fontSize: 10.5, color: "#6e6a5c" }}>
                          Ücretsiz talep oluşturun, restoranda ödeyin.
                        </p>
                      </div>

                      <div
                        onClick={() => setPaymentChoice("paytr")}
                        style={{
                          padding: "10px 12px",
                          borderRadius: 12,
                          border: paymentChoice === "paytr" ? "2px solid #b8842c" : "1px solid rgba(13,15,10,0.12)",
                          background: paymentChoice === "paytr" ? "rgba(184, 132, 44, 0.1)" : "#f6f1e6",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <input
                            type="radio"
                            name="paymentOption"
                            checked={paymentChoice === "paytr"}
                            onChange={() => setPaymentChoice("paytr")}
                            style={{ width: "auto", minHeight: "auto", margin: 0 }}
                          />
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#b8842c", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <CreditCard style={{ width: 13, height: 13 }} /> PayTR ile Öde
                          </span>
                        </div>
                        <p style={{ margin: "4px 0 0", fontSize: 10.5, color: "#6e6a5c" }}>
                          250 TL kapora ile masanızı anında garantileyin.
                        </p>
                      </div>
                    </div>
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

                  {error && <p style={{ color: "#dc2626", fontSize: 13, marginTop: 10 }}>{error}</p>}

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        minHeight: 50,
                        padding: "12px 14px",
                        borderRadius: 14,
                        background: "#f6f1e6",
                        color: "#0d0f0a",
                        fontWeight: 600,
                        fontSize: 13,
                        border: "1px solid rgba(13, 15, 10, 0.12)",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} />
                      <span>Geri</span>
                    </button>

                    <button
                      type="submit"
                      disabled={status === "saving"}
                      style={{
                        flex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        minHeight: 50,
                        padding: "12px 18px",
                        borderRadius: 14,
                        background: paymentChoice === "paytr" ? "#b8842c" : "#12150e",
                        color: "#f4eee1",
                        fontWeight: 700,
                        fontSize: 13.5,
                        border: "none",
                        cursor: status === "saving" ? "not-allowed" : "pointer",
                        opacity: status === "saving" ? 0.6 : 1,
                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {status === "saving" ? (
                        <span>{copy?.gonderiliyor || "İletiliyor…"}</span>
                      ) : paymentChoice === "paytr" ? (
                        <>
                          <span>PayTR ile 250 TL Öde</span>
                          <CreditCard style={{ width: 16, height: 16 }} />
                        </>
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

      {/* PayTR 3D Secure Canlı Ödeme Modalı */}
      {showPaytrModal && paytrToken && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 580,
              maxHeight: "90vh",
              background: "#ffffff",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Başlık */}
            <div
              style={{
                padding: "16px 20px",
                background: "#12150e",
                color: "#f4eee1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck style={{ width: 20, height: 20, color: "#d9a441" }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>PayTR 3D Secure Güvenli Ödeme</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                    250.00 TL Masa Rezervasyon Kaporası
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPaytrModal(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  color: "#ffffff",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* PayTR iframe */}
            <iframe
              src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
              id="paytriframe"
              style={{
                width: "100%",
                height: 520,
                border: "none",
              }}
              title="PayTR Sanal POS Ödeme Formu"
            />
          </div>
        </div>
      )}
    </section>
  );
}