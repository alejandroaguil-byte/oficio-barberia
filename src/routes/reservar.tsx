import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/input";
import { ANY_BARBER, BARBERS, SERVICES, SHOP, getBarber, getService } from "@/lib/catalog";
import { useBookingStore } from "@/lib/booking-store";
import { availableTimes, pickBarberForSlot, upcomingOpenDays } from "@/lib/slots";
import { formatLongDate, formatShortDate } from "@/lib/time";
import { useHydrated } from "@/lib/use-hydrated";
import { cn, formatClp } from "@/lib/utils";

export const Route = createFileRoute("/reservar")({ component: ReservarPage });

type Draft = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  note: string;
};

const empty: Draft = {
  serviceId: "",
  barberId: ANY_BARBER,
  date: "",
  time: "",
  clientName: "",
  clientPhone: "",
  note: "",
};

function ReservarPage() {
  const hydrated = useHydrated();
  const bookings = useBookingStore((s) => s.bookings);
  const addBooking = useBookingStore((s) => s.addBooking);
  const [draft, setDraft] = useState<Draft>(empty);
  const [doneId, setDoneId] = useState<string | null>(null);

  const service = getService(draft.serviceId);
  const days = useMemo(() => upcomingOpenDays(10), []);
  const times = useMemo(() => {
    if (!hydrated || !service || !draft.date) return [];
    return availableTimes(bookings, draft.barberId, draft.date, service);
  }, [hydrated, bookings, draft.barberId, draft.date, service]);

  const step = !draft.serviceId ? 1 : !draft.date || !draft.time ? 2 : 3;
  const confirmed = doneId ? bookings.find((b) => b.id === doneId) : null;

  function patch(partial: Partial<Draft>) {
    setDraft((d) => ({ ...d, ...partial }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !draft.date || !draft.time) return;
    const barberId = pickBarberForSlot(bookings, draft.date, draft.time, service.minutes, draft.barberId);
    if (!barberId) {
      toast("Ese horario se ocupó. Elige otro.");
      return;
    }
    if (draft.clientName.trim().length < 2 || draft.clientPhone.trim().length < 8) {
      toast("Necesitamos un nombre y un teléfono para confirmar.");
      return;
    }
    const booking = addBooking({
      serviceId: service.id,
      serviceName: service.name,
      minutes: service.minutes,
      price: service.price,
      barberId,
      date: draft.date,
      time: draft.time,
      clientName: draft.clientName.trim(),
      clientPhone: draft.clientPhone.trim(),
      note: draft.note.trim(),
      source: "web",
    });
    setDoneId(booking.id);
  }

  if (confirmed) {
    const barber = getBarber(confirmed.barberId);
    return (
      <PageShell>
        <main className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex size-12 items-center justify-center rounded-full border border-hairline">
            <Check className="size-5" />
          </div>
          <h1 className="mt-6 font-display text-4xl tracking-tight">Silla reservada.</h1>
          <p className="mt-3 text-sm text-stone">
            En un local real esto llegaría por WhatsApp. Aquí puedes verla ahora en el panel del
            equipo.
          </p>
          <dl className="mt-8 space-y-3 border-y border-hairline py-6 text-sm">
            <Row label="Servicio" value={`${confirmed.serviceName} · ${confirmed.minutes} min`} />
            <Row label="Con" value={barber?.name ?? confirmed.barberId} />
            <Row label="Cuándo" value={`${formatLongDate(confirmed.date)} · ${confirmed.time}`} />
            <Row label="A nombre de" value={confirmed.clientName} />
            <Row label="Precio" value={formatClp(confirmed.price)} />
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/panel">Ver en el panel</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDoneId(null);
                setDraft(empty);
              }}
            >
              Otra reserva
            </Button>
          </div>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Reservar</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Elige silla y hora.</h1>
        <p className="mt-3 max-w-xl text-sm text-stone">
          Lo que aparece libre está libre. Sin lista de espera, sin “te confirmo en un rato”.
        </p>

        <ol className="mt-8 flex gap-6 text-xs uppercase tracking-[0.14em] text-stone">
          <li className={cn(step === 1 && "text-paper")}>01 Servicio</li>
          <li className={cn(step === 2 && "text-paper")}>02 Horario</li>
          <li className={cn(step === 3 && "text-paper")}>03 Tus datos</li>
        </ol>

        {step > 1 && (
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-1 text-sm text-stone hover:text-paper"
            onClick={() => {
              if (step === 3) patch({ time: "" });
              else patch({ serviceId: "", date: "", time: "" });
            }}
          >
            <ChevronLeft className="size-4" />
            Volver
          </button>
        )}

        {step === 1 && (
          <div className="mt-8 grid gap-3">
            {SERVICES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => patch({ serviceId: item.id, date: "", time: "" })}
                className="rounded-xl border border-hairline bg-panel p-5 text-left transition-colors hover:border-stone"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-2xl tracking-tight">{item.name}</span>
                  <span className="text-sm tabular-nums text-stone">{formatClp(item.price)}</span>
                </div>
                <p className="mt-1 text-sm text-stone">{item.summary}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-cream">{item.minutes} min</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && service && (
          <div className="mt-8">
            <p className="text-sm text-cream">
              {service.name} · {service.minutes} min · {formatClp(service.price)}
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-stone">Con quién</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <BarberPick
                active={draft.barberId === ANY_BARBER}
                label="Da igual"
                caption="Primera silla libre"
                onClick={() => patch({ barberId: ANY_BARBER, time: "" })}
              />
              {BARBERS.map((barber) => (
                <BarberPick
                  key={barber.id}
                  active={draft.barberId === barber.id}
                  label={barber.short}
                  caption={barber.specialties[0]}
                  photo={barber.photo}
                  onClick={() => patch({ barberId: barber.id, time: "" })}
                />
              ))}
            </div>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-stone">Día</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {days.map((ymd) => (
                <button
                  key={ymd}
                  type="button"
                  onClick={() => patch({ date: ymd, time: "" })}
                  className={cn(
                    "min-w-24 shrink-0 rounded-lg border px-3 py-3 text-left text-sm capitalize",
                    draft.date === ymd
                      ? "border-paper bg-paper text-ink"
                      : "border-hairline text-paper hover:border-stone",
                  )}
                >
                  {formatShortDate(ymd)}
                </button>
              ))}
            </div>

            {draft.date && (
              <>
                <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-stone">
                  Hora · {formatLongDate(draft.date)}
                </p>
                {!hydrated ? (
                  <p className="mt-4 text-sm text-stone">Cargando horarios…</p>
                ) : times.length === 0 ? (
                  <p className="mt-4 text-sm text-stone">
                    No quedan huecos ese día con esa silla. Prueba otro día o “da igual”.
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => patch({ time })}
                        className={cn(
                          "h-11 rounded-md border text-sm tabular-nums",
                          draft.time === time
                            ? "border-paper bg-paper text-ink"
                            : "border-hairline hover:border-stone",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {step === 3 && service && (
          <form className="mt-8 space-y-5" onSubmit={submit}>
            <p className="rounded-lg border border-hairline bg-panel px-4 py-3 text-sm text-cream">
              {service.name} con{" "}
              {draft.barberId === ANY_BARBER ? "quien esté libre" : getBarber(draft.barberId)?.short} ·{" "}
              {formatLongDate(draft.date)} a las {draft.time}
            </p>
            <div>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input
                id="name"
                autoComplete="name"
                value={draft.clientName}
                onChange={(e) => patch({ clientName: e.target.value })}
                placeholder="Cómo te llamas"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={draft.clientPhone}
                onChange={(e) => patch({ clientPhone: e.target.value })}
                placeholder="+56 9"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="note">Nota para el barbero (opcional)</FieldLabel>
              <Textarea
                id="note"
                value={draft.note}
                onChange={(e) => patch({ note: e.target.value })}
                placeholder="Un flequillo más corto, la barba más llena…"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Confirmar reserva
            </Button>
            <p className="text-xs text-stone">
              Demo: los datos quedan en este navegador. En un proyecto real irían al local, no a una
              bandeja pública. {SHOP.name} no es un negocio verdadero.
            </p>
          </form>
        )}
      </main>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

function BarberPick({
  active,
  label,
  caption,
  photo,
  onClick,
}: {
  active: boolean;
  label: string;
  caption: string;
  photo?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border p-3 text-left",
        active ? "border-paper bg-paper text-ink" : "border-hairline hover:border-stone",
      )}
    >
      {photo ? (
        <img src={photo} alt="" className="mb-2 h-16 w-full rounded-md object-cover object-top" />
      ) : (
        <div className={cn("mb-2 h-16 rounded-md", active ? "bg-cream" : "bg-panel")} />
      )}
      <p className="text-sm font-medium">{label}</p>
      <p className={cn("text-xs", active ? "text-ink/60" : "text-stone")}>{caption}</p>
    </button>
  );
}
