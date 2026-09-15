import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SHOP } from "@/lib/catalog";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/reservar", label: "Reservar" },
  { to: "/panel", label: "Panel" },
  { to: "/caso", label: "El caso" },
] as const;

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b backdrop-blur-md",
        inverted ? "border-rule/80 bg-paper/90 text-ink" : "border-hairline/80 bg-ink/85 text-paper",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-tight">{SHOP.name}</span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-stone sm:inline">Barbería</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "transition-opacity hover:opacity-100",
                pathname === link.to ? "opacity-100" : "opacity-60",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant={inverted ? "ink" : "primary"} className="min-w-28">
            <Link to="/reservar">Reservar silla</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-hairline px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-3 text-sm",
                pathname === link.to ? "text-paper" : "text-stone",
                inverted && (pathname === link.to ? "text-ink" : "text-stone"),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
