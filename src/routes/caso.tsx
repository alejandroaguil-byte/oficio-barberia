import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { BOBBA, SHOP } from "@/lib/catalog";

export const Route = createFileRoute("/caso")({ component: CasoPage });

export function CasoPage() {
  return (
    <PageShell>
      <main className="bg-paper text-ink">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">Caso · {BOBBA.name}</p>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Oficio: un local de barrio con las reservas en un solo lugar.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-stone">
            Oficio no existe. Es una barbería ficticia, armada para mostrar — con un caso concreto —
            el tipo de solución que {BOBBA.name} construye para pequeños negocios de Santiago: una
            página que consigue clientes y una herramienta que ordena el día.
          </p>
        </section>

        <img
          src="/images/storefront.jpg"
          alt="Fachada ficticia de Oficio en Barrio Italia"
          className="mx-auto h-72 w-full max-w-5xl object-cover px-4 sm:h-96 sm:px-6"
        />

        <section className="mx-auto max-w-3xl space-y-12 px-4 py-16 sm:px-6 sm:py-20">
          <Block title="El punto de partida">
            El local funcionaba como tantos en Santiago. Instagram traía consultas. Las horas se
            cerraban por WhatsApp, a veces en una historia, a veces en un mensaje que se perdía
            entre stickers. En el local, el cuaderno de la recepción decía una cosa y la cabeza de
            cada barbero decía otra. Nadie mentía: simplemente no había un lugar común.
          </Block>
          <Block title="Qué se construyó">
            Un sitio con la identidad del local — servicios, equipo, barrio, horarios — y un flujo
            de reserva de un minuto. El cliente elige servicio, silla y hora. Lo que ve libre está
            libre. Sobre esa base, un panel de servicio: el día, las tres sillas, confirmar, sentar,
            walk-in y resetear cuando se quiere volver al escenario inicial.
          </Block>
          <Block title="Por qué importa">
            El cliente deja de preguntar “¿tienes a las 18:00?”. El local deja de reconstruir el
            turno de memoria. La herramienta está hecha alrededor de cómo trabaja una barbería de
            barrio, no alrededor de un sistema genérico de citas.
          </Block>
          <Block title={`Qué demuestra de ${BOBBA.name}`}>
            Tres servicios en una sola pieza. La landing que convierte una visita en una reserva.
            El sitio donde el negocio se presenta con claridad. La aplicación que ordena un proceso
            que hoy consume tiempo. Eso es lo que {BOBBA.name} ofrece a pequeños negocios de
            Santiago: atención directa, una propuesta clara, y una solución que se puede usar el
            mismo día que se publica.
          </Block>
        </section>

        <section className="border-t border-rule">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
            <Step n="01" title="Sitio público" to="/" label="Recorrer Oficio" />
            <Step n="02" title="Reservar" to="/reservar" label="Pedir una silla" />
            <Step n="03" title="Panel" to="/panel" label="Ver el servicio del día" />
          </div>
        </section>

        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
              Santiago · disponible para nuevos proyectos
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight">
              Si tu negocio se parece a este, conversemos.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              No siempre necesitas un sistema complejo. A veces una página clara alcanza para
              conseguir consultas; otras, una agenda a medida te devuelve las horas que hoy se van
              en mensajes. {SHOP.name} es un ejemplo. Tu negocio es el proyecto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={BOBBA.whatsapp}>
                  Conversemos
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={BOBBA.url}>Ir a bobbasystem.cl</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone">{children}</p>
    </div>
  );
}

function Step({ n, title, to, label }: { n: string; title: string; to: "/reservar" | "/panel" | "/"; label: string }) {
  return (
    <div>
      <p className="font-display text-xl text-stone">{n}</p>
      <h3 className="mt-2 font-display text-2xl tracking-tight">{title}</h3>
      <Link to={to} className="mt-3 inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
        {label}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
