import { BARBERS, SLOT_STEP, WEEK_HOURS, type Service } from "./catalog";
import { addDaysYmd, santiagoHm, santiagoYmd, toMinutes, weekdaySun0 } from "./time";
import type { Booking } from "./booking-types";

export function hoursFor(ymd: string) {
  return WEEK_HOURS[weekdaySun0(ymd)] ?? null;
}

export function isOpen(ymd: string): boolean {
  return hoursFor(ymd) !== null;
}

export function slotRange(ymd: string, minutes: number): string[] {
  const hours = hoursFor(ymd);
  if (!hours) return [];
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const out: string[] = [];
  for (let t = open; t + minutes <= close; t += SLOT_STEP) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return out;
}

function isActive(booking: Booking): boolean {
  return booking.status !== "cancelled";
}

function overlaps(aStart: number, aDur: number, bStart: number, bDur: number): boolean {
  return aStart < bStart + bDur && bStart < aStart + aDur;
}

export function barberBusy(
  bookings: Booking[],
  barberId: string,
  ymd: string,
  time: string,
  minutes: number,
  ignoreId?: string,
): boolean {
  const start = toMinutes(time);
  return bookings.some(
    (b) =>
      b.id !== ignoreId &&
      isActive(b) &&
      b.barberId === barberId &&
      b.date === ymd &&
      overlaps(start, minutes, toMinutes(b.time), b.minutes),
  );
}

function isPastSlot(ymd: string, time: string): boolean {
  const today = santiagoYmd();
  if (ymd < today) return true;
  if (ymd > today) return false;
  return toMinutes(time) <= toMinutes(santiagoHm());
}

export function availableTimes(
  bookings: Booking[],
  barberId: string,
  ymd: string,
  service: Service,
): string[] {
  return slotRange(ymd, service.minutes).filter((time) => {
    if (isPastSlot(ymd, time)) return false;
    if (barberId === "any") {
      return BARBERS.some((barber) => !barberBusy(bookings, barber.id, ymd, time, service.minutes));
    }
    return !barberBusy(bookings, barberId, ymd, time, service.minutes);
  });
}

export function pickBarberForSlot(
  bookings: Booking[],
  ymd: string,
  time: string,
  minutes: number,
  preferred: string,
): string | null {
  if (preferred !== "any") {
    return barberBusy(bookings, preferred, ymd, time, minutes) ? null : preferred;
  }
  const free = BARBERS.filter((b) => !barberBusy(bookings, b.id, ymd, time, minutes));
  if (free.length === 0) return null;
  free.sort((a, b) => {
    const ca = bookings.filter((x) => isActive(x) && x.barberId === a.id && x.date === ymd).length;
    const cb = bookings.filter((x) => isActive(x) && x.barberId === b.id && x.date === ymd).length;
    return ca - cb;
  });
  return free[0]?.id ?? null;
}

export function upcomingOpenDays(count: number): string[] {
  const start = santiagoYmd();
  const days: string[] = [];
  for (let i = 0; days.length < count && i < 21; i++) {
    const ymd = addDaysYmd(start, i);
    if (isOpen(ymd)) days.push(ymd);
  }
  return days;
}
