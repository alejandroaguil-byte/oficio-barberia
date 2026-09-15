import { Link } from "@tanstack/react-router";
import { BOBBA, SHOP } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-tight">{SHOP.name}</p>
          <p className="mt-2 max-w-xs text-sm text-stone">{SHOP.tagline}. Tres sillas, un barrio, el tiempo justo.</p>
        </div>
        <div className="text-sm text-stone">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-paper">Visítanos</p>
          <p>{SHOP.address}</p>
          <p>{SHOP.city}</p>
          <p className="mt-1">{SHOP.metro}</p>
        </div>
        <div className="text-sm text-stone">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-paper">Esta demo</p>
          <p>
            Sitio ficticio construido por{" "}
            <a href={BOBBA.url} className="text-paper underline-offset-2 hover:underline">
              {BOBBA.name}
            </a>{" "}
            para mostrar cómo se ve un local con reservas en orden.
          </p>
          <Link to="/caso" className="mt-3 inline-block text-paper underline-offset-2 hover:underline">
            Leer el caso
          </Link>
        </div>
      </div>
      <div className="border-t border-hairline px-4 py-4 text-center text-xs text-stone">
        Oficio no es un local real · Demo de portafolio {BOBBA.name}
      </div>
    </footer>
  );
}
