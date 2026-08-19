/** Kahvaltı–akşam: 08:00–21:30 (form ve API aynı liste) */
export function reservationTimeSlots(startH = 8, endH = 21): string[] {
  const out: string[] = [];
  for (let h = startH; h <= endH; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}

export const RESERVATION_TIME_SET = new Set(reservationTimeSlots());
