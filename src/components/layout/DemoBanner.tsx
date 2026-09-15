import { Link } from "@tanstack/react-router";
import { BOBBA } from "@/lib/catalog";

export function DemoBanner() {
  return (
    <div className="border-b border-hairline bg-panel px-4 py-2.5 text-center text-xs tracking-wide text-stone sm:text-[13px]">
      Proyecto demo de{" "}
      <a href={BOBBA.url} className="text-paper underline-offset-2 hover:underline">
        Bobbasystem
      </a>
      <span className="hidden sm:inline"> · un sitio con reservas para un negocio de barrio</span>
      {" · "}
      <Link to="/caso" className="text-paper underline-offset-2 hover:underline">
        Ver el caso
      </Link>
    </div>
  );
}
