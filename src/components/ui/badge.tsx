import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/booking-types";
import { STATUS_LABEL } from "@/lib/booking-types";

const tones: Record<BookingStatus, string> = {
  pending: "border-stone/40 text-cream",
  confirmed: "border-paper/30 text-paper",
  seated: "border-paper/60 bg-paper/10 text-paper",
  done: "border-hairline text-stone",
  cancelled: "border-danger/40 text-danger",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-2.5 text-[11px] font-medium uppercase tracking-[0.12em]",
        tones[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
