"use client";

import { useState } from "react";
import {
  formatPhoneInput,
  isPhoneTypingKey,
  sanitizePhoneDigits,
} from "@/lib/content/contact-utils";
import type { MesajFormCopy } from "@/lib/content/types";

export default function HomeContactForm({ copy }: { copy?: MesajFormCopy }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = sanitizePhoneDigits(phone);
    if (digits.length < 10 || digits.length > 11) {
      setStatus("err");
      setError(copy?.hataTelefon || "Geçerli bir telefon girin (10–11 hane).");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("err");
      setError("Geçerli bir e-posta girin.");
      return;
    }
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, website }),
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
      setMessage("");
    } catch {
      setStatus("err");
      setError(copy?.hataBaglanti || "Bağlantı hatası. Lütfen telefonla deneyin.");
    }
  };

  return (
    <form className="form petra-form contact-form" onSubmit={submit} data-fade="">
      <div className="petra-form__head">
        <p className="petra-form__kicker">{copy?.kicker || "Mesaj"}</p>
        {copy?.baslik ? <h3>{copy.baslik}</h3> : null}
        {copy?.lead ? <p>{copy.lead}</p> : null}
      </div>
      <div className="field">
        <label htmlFor="msg-name">
          {copy?.labelAd || "Ad soyad"} <i>*</i>
        </label>
        <input
          id="msg-name"
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
      <div className="petra-form__row">
        <div className="field">
          <label htmlFor="msg-phone">
            {copy?.labelTelefon || "Telefon"} <i>*</i>
          </label>
          <input
            id="msg-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            pattern="[0-9 ]*"
            maxLength={14}
            required
            placeholder={copy?.placeholderTelefon || ""}
            value={phone}
            onKeyDown={(e) => {
              if (!isPhoneTypingKey(e.key, e.ctrlKey || e.metaKey || e.altKey)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="msg-email">{copy?.labelEposta || "E-posta"}</label>
          <input
            id="msg-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy?.placeholderEposta || ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="msg-body">
          {copy?.labelMesaj || "Mesaj"} <i>*</i>
        </label>
        <textarea
          id="msg-body"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder={copy?.placeholderMesaj || ""}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="rsv__hp" aria-hidden="true">
        <label htmlFor="msg-web">Website</label>
        <input
          id="msg-web"
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
          {copy?.success || "Mesajınız alındı."}
        </p>
      ) : null}
      <button className="btn btn--lg petra-form__submit" type="submit" disabled={status === "saving"}>
        {status === "saving"
          ? copy?.gonderiliyor || "Gönderiliyor…"
          : status === "ok"
            ? copy?.gonder || "Yeni mesaj"
            : copy?.gonder || "Mesaj gönder"}
      </button>
    </form>
  );
}
