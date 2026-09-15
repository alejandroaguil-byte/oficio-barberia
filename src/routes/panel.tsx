import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import type { Booking, BookingStatus } from "@/lib/booking-types";
import { useBookingStore } from "@/lib/booking-store";
import { BARBERS, SERVICES, getService } from "@/lib/catalog";
import { availableTimes, hoursFor, pickBarberForSlot, upcomingOpenDays } from "@/lib/slots";
import { formatDayHeading, formatLongDate, santiagoYmd } from "@/lib/time";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, formatClp } from "@/lib/utils";

export const Route = createFileRoute("/panel")({ component: PanelPage });

function PanelPage() {
  const hydrated = useHydrated();
  const bookings = useBookingStore((s) => s.bookings);
  const setStatus = useBookingStore((s) => s.setStatus);
  const addBooking = useBookingStore((s) => s.addBooking);
  const resetDemo = useBookingStore((s) => s.resetDemo);
  const days = useMemo(() => upcomingOpenDays(8), []);
  const [day, setDay] = useState(santiagoYmd());
  const selected = hoursFor(day) ? day : (days[0] ?? day);
  const [walkin, setWalkin] = useState({ serviceId: SERVICES[0].id, barberId: BARBERS[0].id, name: "" });

  const ofDay = bookings
    .filter((b) => b.date === selected)
    .sort((a, b) => a.time.localeCompare(b.time) || a.barberId.localeCompare(b.barberId));

  const live = ofDay.filter((b) => b.status !== "cancelled" && b.status !== "done");
  const pending = ofDay.filter((b) => b.status === "pending").length;
  const seated = ofDay.filter((b) => b.status === "seated").length;
  const take = ofDay
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  function addWalkin(e: React.FormEvent) {
    e.preventDefault();
    const service = getService(walkin.serviceId);
    if (!service || walkin.name.trim().length < 2) {
      toast("Falta el nombre del walk-in.");
      return;
    }
    const times = availableTimes(bookings, walkin.barberId, selected, service);
    const time = times[0];
    if (!time) {
      toast("Esa silla no tiene un hueco que alcance hoy.");
      return;
    }
    const barberId = pickBarberForSlot(bookings, selected, time, service.minutes, walkin.barberId);
    if (!barberId) {
      toast("Esa silla se ocupó.");
      return;
    }
    addBooking({
      serviceId: service.id,
      serviceName: service.name,
      minutes: service.minutes,
      price: service.price,
      barberId,
      date: selected,
      time,
      clientName: walkin.name.trim(),
      clientPhone: "Walk-in",
      note: "",
      status: "confirmed",
      source: "walkin",
    });
    setWalkin((w) => ({ ...w, name: "" }));
    toast(`Walk-in a las ${time}.`);
  }

  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Panel del local</p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">El servicio del día.</h1>
            <p className="mt-2 max-w-xl text-sm text-stone">
              En un proyecto real este panel estaría protegido. Aquí cualquiera puede usarlo para
              ver cómo trabaja el local después de una reserva.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              resetDemo();
              toast("Demo restaurada.");
            }}
          >
            Resetear demo
          </Button>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {days.map((ymd) => (
            <button
              key={ymd}
              type="button"
              onClick={() => setDay(ymd)}
              className={cn(
                "shrink-0 rounded-lg border px-3 py-2 text-sm",
                selected === ymd ? "border-paper bg-paper text-ink" : "border-hairline hover:border-stone",
              )}
            >
              {formatDayHeading(ymd)}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Stat label="En el día" value={hydrated ? String(live.length) : "—"} hint="activas" />
          <Stat label="Por confirmar" value={hydrated ? String(pending) : "—"} />
          <Stat label="En silla" value={hydrated ? String(seated) : "—"} />
          <Stat label="Estimado" value={hydrated ? formatClp(take) : "—"} hint="si se atienden" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="grid gap-4 md:grid-cols-3">
            {BARBERS.map((barber) => {
              const rows = ofDay.filter((b) => b.barberId === barber.id);
              return (
                <section key={barber.id} className="rounded-xl border border-hairline bg-panel p-4">
                  <div className="flex items-center gap-3">
                    <img src={barber.photo} alt="" className="size-10 rounded-md object-cover object-top" />
                    <div>
                      <h2 className="font-display text-xl tracking-tight">{barber.short}</h2>
                      <p className="text-xs text-stone">{hoursFor(selected)?.open} – {hoursFor(selected)?.close}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {!hydrated && <p className="text-sm text-stone">Cargando…</p>}
                    {hydrated && rows.length === 0 && (
                      <p className="py-6 text-sm text-stone">Silla libre este día.</p>
                    )}
                    {hydrated &&
                      rows.map((booking) => (
                        <AppointmentCard
                          key={booking.id}
                          booking={booking}
                          onStatus={(status) => setStatus(booking.id, status)}
                        />
                      ))}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="h-fit rounded-xl border border-hairline bg-panel p-4">
            <h2 className="font-display text-xl tracking-tight">Walk-in</h2>
            <p className="mt-1 text-xs text-stone">
              Alguien llegó sin reserva. Lo sentamos en el primer hueco que alcance.
            </p>
            <form className="mt-4 space-y-3" onSubmit={addWalkin}>
              <div>
                <FieldLabel htmlFor="w-name">Nombre</FieldLabel>
                <Input
                  id="w-name"
                  value={walkin.name}
                  onChange={(e) => setWalkin({ ...walkin, name: e.target.value })}
                  placeholder="Quién llegó"
                />
              </div>
              <div>
                <FieldLabel htmlFor="w-service">Servicio</FieldLabel>
                <select
                  id="w-service"
                  className="h-11 w-full rounded-md border border-hairline bg-panel px-3 text-sm"
                  value={walkin.serviceId}
                  onChange={(e) => setWalkin({ ...walkin, serviceId: e.target.value })}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="w-barber">Silla</FieldLabel>
                <select
                  id="w-barber"
                  className="h-11 w-full rounded-md border border-hairline bg-panel px-3 text-sm"
                  value={walkin.barberId}
                  onChange={(e) => setWalkin({ ...walkin, barberId: e.target.value })}
                >
                  {BARBERS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.short}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" className="w-full" size="sm">
                Sentar walk-in
              </Button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-stone">
              {formatLongDate(selected)}. Los datos viven en este navegador.
            </p>
          </aside>
        </div>
      </main>
    </PageShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-hairline bg-panel px-4 py-4">
      <p className="text-xs uppercase tracking-[0.14em] text-stone">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-stone">{hint}</p> : null}
    </div>
  );
}

function AppointmentCard({
  booking,
  onStatus,
}: {
  booking: Booking;
  onStatus: (status: BookingStatus) => void;
}) {
  const next: Partial<Record<BookingStatus, BookingStatus>> = {
    pending: "confirmed",
    confirmed: "seated",
    seated: "done",
  };
  const nextLabel: Partial<Record<BookingStatus, string>> = {
    pending: "Confirmar",
    confirmed: "Sentar",
    seated: "Listo",
  };
  const nxt = next[booking.status];

  return (
    <article className="rounded-lg border border-hairline bg-ink p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm tabular-nums text-cream">{booking.time}</p>
          <p className="font-medium leading-tight">{booking.clientName}</p>
          <p className="text-xs text-stone">
            {booking.serviceName} · {booking.minutes} min
            {booking.source === "walkin" ? " · walk-in" : ""}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      {booking.note ? <p className="mt-2 text-xs text-cream">“{booking.note}”</p> : null}
      {booking.status !== "cancelled" && booking.status !== "done" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {nxt && (
            <Button size="sm" variant="primary" className="h-9 px-3 text-xs" onClick={() => onStatus(nxt)}>
              {nextLabel[booking.status]}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-9 px-3 text-xs"
            onClick={() => onStatus("cancelled")}
          >
            Cancelar
          </Button>
        </div>
      )}
    </article>
  );
}
