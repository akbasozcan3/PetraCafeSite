import type { CalismaGunu, IletisimContent } from "./types";
import { parseOpeningHours } from "@/lib/site/canonical";

export const WEEK_DAYS = [
  { gun: "Pazartesi", kisa: "Pzt", schema: "Monday" },
  { gun: "Salı", kisa: "Sal", schema: "Tuesday" },
  { gun: "Çarşamba", kisa: "Çar", schema: "Wednesday" },
  { gun: "Perşembe", kisa: "Per", schema: "Thursday" },
  { gun: "Cuma", kisa: "Cum", schema: "Friday" },
  { gun: "Cumartesi", kisa: "Cmt", schema: "Saturday" },
  { gun: "Pazar", kisa: "Paz", schema: "Sunday" },
] as const;

export function normalizeClock(raw: string, fallback = "08:00"): string {
  const m = String(raw || "").trim().match(/^(\d{1,2})[:.](\d{2})(?::\d{2})?$/);
  if (!m) return fallback;
  const hRaw = Number(m[1]);
  const minRaw = Number(m[2]);
  if (hRaw === 24 && minRaw === 0) return "24:00";
  const h = Math.min(23, Math.max(0, hRaw));
  const min = Math.min(59, Math.max(0, minRaw));
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function defaultHoursProgram(open = "08:00", close = "24:00"): CalismaGunu[] {
  return WEEK_DAYS.map((d) => ({
    gun: d.gun,
    acilis: open,
    kapanis: close,
    kapali: false,
  }));
}

export function resolveHoursProgram(iletisim?: IletisimContent | null): CalismaGunu[] {
  const raw = iletisim?.saatProgrami;
  if (Array.isArray(raw) && raw.length > 0) {
    return WEEK_DAYS.map((d, i) => {
      const row = raw[i] || raw.find((item) => item.gun === d.gun) || {};
      return {
        gun: d.gun,
        acilis: normalizeClock(row.acilis || "08:00", "08:00"),
        kapanis: normalizeClock(row.kapanis || "24:00", "24:00"),
        kapali: row.kapali === true,
      };
    });
  }
  const parsed = parseOpeningHours(iletisim?.saatler);
  return defaultHoursProgram(parsed.opens, parsed.closes);
}

function sameHours(a: CalismaGunu, b: CalismaGunu): boolean {
  if (a.kapali || b.kapali) return a.kapali === b.kapali;
  return a.acilis === b.acilis && a.kapanis === b.kapanis;
}

function rangeLabel(row: CalismaGunu): string {
  if (row.kapali) return "Kapalı";
  return `${row.acilis} – ${row.kapanis}`;
}

/** Navbar, footer, iletişim kartı — tek satır */
export function formatHoursSummary(program: CalismaGunu[]): string {
  const days = program.length === 7 ? program : defaultHoursProgram();
  if (!days.length) return "";
  if (days.every((d) => d.kapali)) return "Kapalı";
  const openDays = days.filter((d) => !d.kapali);
  if (openDays.length && openDays.every((d) => sameHours(d, openDays[0])) && openDays.length === 7) {
    return `Her gün ${openDays[0].acilis} – ${openDays[0].kapanis}`;
  }
  const weekdays = days.slice(0, 5);
  const weekend = days.slice(5);
  const weekOk = weekdays.every((d) => sameHours(d, weekdays[0]));
  const endOk = weekend.every((d) => sameHours(d, weekend[0]));
  if (weekOk && endOk) {
    return `Hafta içi ${rangeLabel(weekdays[0])} · Cmt–Paz ${rangeLabel(weekend[0])}`;
  }
  return days.map((d, i) => `${WEEK_DAYS[i].kisa} ${rangeLabel(d)}`).join(" · ");
}

export function displayHours(iletisim?: IletisimContent | null): string {
  const summary = formatHoursSummary(resolveHoursProgram(iletisim));
  return iletisim?.saatler?.trim() || summary;
}

export function formatHoursFaq(iletisim?: IletisimContent | null): string {
  const saatler = iletisim?.saatler?.trim();
  if (saatler) return saatler;
  return formatHoursSummary(resolveHoursProgram(iletisim));
}

export function looksLikeHours(text: string): boolean {
  return /\d{1,2}[:.]\d{2}\s*[–\-]\s*\d{1,2}[:.]\d{2}/.test(String(text || ""));
}

export function isHoursQuestion(soru: string): boolean {
  return /hangi saat|çalışma saat|kaçta açık|ne zaman açık|saatlerde açık/i.test(String(soru || ""));
}

export function openingHoursJsonLd(iletisim?: IletisimContent | null) {
  return resolveHoursProgram(iletisim)
    .filter((d) => !d.kapali)
    .map((d, i) => {
      const meta = WEEK_DAYS.find((w) => w.gun === d.gun) || WEEK_DAYS[i];
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: meta.schema,
        opens: d.acilis,
        closes: d.kapanis,
      };
    });
}

function minutes(clock: string): number {
  const [h, m] = normalizeClock(clock).split(":").map(Number);
  return h * 60 + m;
}

function clockFromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Açılış dahil, kapanıştan önceki 30 dk dilimleri */
export function reservationSlotsForHours(open: string, close: string): string[] {
  const start = minutes(open);
  const end = minutes(close);
  if (!(end > start)) return [];
  const out: string[] = [];
  for (let t = start; t < end; t += 30) {
    out.push(clockFromMinutes(t));
  }
  return out;
}

export function weekdayIndexFromIso(dateIso: string): number {
  const d = new Date(`${dateIso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return 0;
  const js = d.getDay();
  return js === 0 ? 6 : js - 1;
}

export function hoursForDate(dateIso: string, iletisim?: IletisimContent | null): CalismaGunu {
  const program = resolveHoursProgram(iletisim);
  return program[weekdayIndexFromIso(dateIso)] || program[0];
}

export function reservationSlotsForDate(dateIso: string, iletisim?: IletisimContent | null): string[] {
  const day = hoursForDate(dateIso, iletisim);
  if (day.kapali) return [];
  return reservationSlotsForHours(day.acilis, day.kapanis);
}

export function isAllowedReservationTime(
  dateIso: string,
  time: string,
  iletisim?: IletisimContent | null
): boolean {
  return reservationSlotsForDate(dateIso, iletisim).includes(normalizeClock(time, time));
}
