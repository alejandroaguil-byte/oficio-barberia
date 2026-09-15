export type BookingStatus = "pending" | "confirmed" | "seated" | "done" | "cancelled";

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  minutes: number;
  price: number;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  note: string;
  status: BookingStatus;
  source: "web" | "walkin";
  createdAt: string;
};

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Por confirmar",
  confirmed: "Confirmada",
  seated: "En silla",
  done: "Lista",
  cancelled: "Cancelada",
};
