import type { ReactNode } from "react";
import { DemoBanner } from "./DemoBanner";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({
  children,
  invertedHeader = false,
}: {
  children: ReactNode;
  invertedHeader?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <DemoBanner />
      <SiteHeader inverted={invertedHeader} />
      {children}
      <SiteFooter />
    </div>
  );
}
