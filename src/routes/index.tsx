import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Clock3, MapPin, Scissors } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { BARBERS, HOURS_COPY, SERVICES, SHOP } from "@/lib/catalog";
import { formatClp } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <PageShell>
      <section className="relative isolate min-h-[88dvh] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Interior de Oficio: tres sillas de cuero frente a los espejos"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cream">{SHOP.address}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-7xl">
            Un corte claro, hecho con tiempo.
          </h1>
          <p className="mt-5 max-w-lg text-base text-cream/90 sm:text-lg">
            Tres sillas en Barrio Italia. Eliges el servicio, eliges con quién, y dejas de esperar el
            visto de WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/reservar">
                Reservar silla
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-panel">
        <div className="mx-auto grid max-w-6xl divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
          <Fact icon={<Scissors className="size-4" />} label="Tres sillas" value="Tomás, Camila y Elías" />
          <Fact icon={<Clock3 className="size-4" />} label="Sin lista de espera" value="Reservas en un minuto" />
          <Fact icon={<MapPin className="size-4" />} label="Ñuñoa" value={SHOP.metro} />
        </div>
      </section>

      <section id="servicios" className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Servicios</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Lo que hacemos, sin lista eterna.</h2>
            </div>
            <p className="max-w-sm text-sm text-stone">
              Precios en pesos chilenos. El tiempo es el bloque que reservamos para ti — no apuramos
              el corte para meter a otro.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="rounded-xl border border-rule bg-cream/50 p-5 sm:p-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tight">{service.name}</h3>
                  <p className="text-sm tabular-nums text-stone">{formatClp(service.price)}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone">{service.summary}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ink/70">{service.minutes} min</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="ink" size="lg">
              <Link to="/reservar">Elegir servicio y hora</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">El equipo</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight sm:text-5xl">
            Eliges silla, no un turno anónimo.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {BARBERS.map((barber) => (
              <article key={barber.id} className="group">
                <div className="overflow-hidden rounded-xl bg-panel">
                  <img
                    src={barber.photo}
                    alt={barber.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-tight">{barber.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{barber.bio}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-cream">
                  {barber.specialties.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <img
          src="/images/cut.jpg"
          alt="Manos de un barbero terminando un corte a tijera"
          className="h-72 w-full object-cover md:h-full"
        />
        <div className="flex flex-col justify-center bg-panel px-6 py-16 sm:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Cómo reservar</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">Tres pasos. Nada de ida y vuelta.</h2>
          <ol className="mt-8 space-y-5 text-sm text-cream">
            <li className="flex gap-4">
              <span className="font-display text-xl text-stone">01</span>
              <span>Elige el servicio y, si quieres, con quién sentarte.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-xl text-stone">02</span>
              <span>Mira los huecos reales de la agenda. Lo que ves está libre.</span>
            </li>
            <li className="flex gap-4">
              <span className="font-display text-xl text-stone">03</span>
              <span>Deja tu nombre y teléfono. El local confirma desde el panel.</span>
            </li>
          </ol>
          <div className="mt-8">
            <Button asChild>
              <Link to="/reservar">Reservar ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">El local</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">Barrio Italia, a la altura de la vereda.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
              {SHOP.address}. Entrada a nivel, tres sillas, sin música a todo volumen. Si vienes en metro,
              Irarrázaval queda a seis minutos.
            </p>
            <dl className="mt-8 grid gap-3 text-sm">
              {HOURS_COPY.map((row) => (
                <div key={row.days} className="flex justify-between border-b border-rule pb-2">
                  <dt>{row.days}</dt>
                  <dd className="tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm">
              <a href={`tel:${SHOP.phoneTel}`} className="underline-offset-2 hover:underline">
                {SHOP.phoneDisplay}
              </a>
              <span className="text-stone"> · {SHOP.instagram}</span>
            </p>
          </div>
          <img
            src="/images/storefront.jpg"
            alt="Fachada de Oficio en una esquina arbolada de Barrio Italia"
            className="h-80 w-full rounded-xl object-cover md:h-[28rem]"
          />
        </div>
      </section>
    </PageShell>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-6 py-6">
      <span className="mt-0.5 text-stone">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-stone">{label}</p>
        <p className="mt-1 text-sm text-paper">{value}</p>
      </div>
    </div>
  );
}
