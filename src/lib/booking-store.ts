import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BARBERS, SERVICES } from "./catalog";
import { addDaysYmd, santiagoYmd } from "./time";
import { hoursFor } from "./slots";
import type { Booking, BookingStatus } from "./booking-types";

type State = {
  bookings: Booking[];
  addBooking: (input: Omit<Booking, "id" | "createdAt" | "status"> & { status?: BookingStatus }) => Booking;
  setStatus: (id: string, status: BookingStatus) => void;
  resetDemo: () => void;
};

function uid(): string {
  return `of-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function seed(): Booking[] {
  const today = santiagoYmd();
  let day = today;
  if (!hoursFor(day)) day = addDaysYmd(today, 1);
  if (!hoursFor(day)) day = addDaysYmd(today, 2);
  const next = hoursFor(addDaysYmd(day, 1)) ? addDaysYmd(day, 1) : addDaysYmd(day, 2);

  const corte = SERVICES[0];
  const fade = SERVICES[1];
  const barba = SERVICES[2];
  const combo = SERVICES[3];
  const afeitado = SERVICES[4];

  const rows: Array<Omit<Booking, "id" | "createdAt">> = [
    {
      serviceId: fade.id,
      serviceName: fade.name,
      minutes: fade.minutes,
      price: fade.price,
      barberId: "tomas",
      date: day,
      time: "11:00",
      clientName: "Matías Rivas",
      clientPhone: "+56 9 8123 4401",
      note: "",
      status: "confirmed",
      source: "web",
    },
    {
      serviceId: corte.id,
      serviceName: corte.name,
      minutes: corte.minutes,
      price: corte.price,
      barberId: "camila",
      date: day,
      time: "11:30",
      clientName: "Sofía Lagos",
      clientPhone: "+56 9 7761 2098",
      note: "Flequillo un poco más corto",
      status: "seated",
      source: "web",
    },
    {
      serviceId: afeitado.id,
      serviceName: afeitado.name,
      minutes: afeitado.minutes,
      price: afeitado.price,
      barberId: "elias",
      date: day,
      time: "12:00",
      clientName: "Pedro Cárdenas",
      clientPhone: "+56 9 6540 1182",
      note: "",
      status: "confirmed",
      source: "walkin",
    },
    {
      serviceId: combo.id,
      serviceName: combo.name,
      minutes: combo.minutes,
      price: combo.price,
      barberId: "tomas",
      date: day,
      time: "16:00",
      clientName: "Ignacio Pérez",
      clientPhone: "+56 9 9981 3340",
      note: "Primera visita",
      status: "pending",
      source: "web",
    },
    {
      serviceId: barba.id,
      serviceName: barba.name,
      minutes: barba.minutes,
      price: barba.price,
      barberId: "elias",
      date: day,
      time: "17:30",
      clientName: "Nicolás Araya",
      clientPhone: "+56 9 6233 7715",
      note: "",
      status: "confirmed",
      source: "web",
    },
    {
      serviceId: fade.id,
      serviceName: fade.name,
      minutes: fade.minutes,
      price: fade.price,
      barberId: "tomas",
      date: next,
      time: "11:00",
      clientName: "Diego Fuentes",
      clientPhone: "+56 9 8455 0199",
      note: "",
      status: "confirmed",
      source: "web",
    },
  ];

  void BARBERS;
  return rows.map((row) => ({ ...row, id: uid(), createdAt: new Date().toISOString() }));
}

export const useBookingStore = create<State>()(
  persist(
    (set, get) => ({
      bookings: seed(),
      addBooking: (input) => {
        const booking: Booking = {
          ...input,
          id: uid(),
          status: input.status ?? "pending",
          createdAt: new Date().toISOString(),
        };
        set({ bookings: [...get().bookings, booking] });
        return booking;
      },
      setStatus: (id, status) => {
        set({
          bookings: get().bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        });
      },
      resetDemo: () => set({ bookings: seed() }),
    }),
    { name: "oficio-bookings-v1" },
  ),
);
