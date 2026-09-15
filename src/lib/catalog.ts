export type Service = {
  id: string;
  name: string;
  summary: string;
  minutes: number;
  price: number;
};

export type Barber = {
  id: string;
  name: string;
  short: string;
  bio: string;
  photo: string;
  specialties: string[];
};

export type DayHours = { open: string; close: string };

export const SHOP = {
  name: "Oficio",
  fullName: "Oficio Barbería",
  tagline: "Corte y oficio en Barrio Italia",
  address: "Av. Italia 1489, Ñuñoa",
  city: "Santiago",
  metro: "Irarrázaval · 6 min a pie",
  phoneDisplay: "+56 9 8765 4321",
  phoneTel: "+56987654321",
  instagram: "@oficiobarberia",
  email: "hola@oficiobarberia.cl",
} as const;

export const SERVICES: Service[] = [
  {
    id: "corte",
    name: "Corte",
    summary: "Tijera y máquina. Conversamos el largo y lo dejamos listo para el resto de la semana.",
    minutes: 45,
    price: 16000,
  },
  {
    id: "fade",
    name: "Fade",
    summary: "Degradado limpio, de skin fade a taper. El trabajo de Tomás, si lo pides.",
    minutes: 50,
    price: 18000,
  },
  {
    id: "barba",
    name: "Barba",
    summary: "Perfilado, contornos y aceite. Para quien ya trae la barba y quiere orden.",
    minutes: 30,
    price: 12000,
  },
  {
    id: "combo",
    name: "Corte y barba",
    summary: "La visita completa. Un solo bloque, sin apuro entre una cosa y la otra.",
    minutes: 70,
    price: 26000,
  },
  {
    id: "afeitado",
    name: "Afeitado clásico",
    summary: "Toalla caliente, brocha y navaja. El oficio de Elías, de principio a fin.",
    minutes: 40,
    price: 15000,
  },
  {
    id: "junior",
    name: "Corte junior",
    summary: "Hasta 12 años. Con tiempo y sin teatro. Mejor en la silla de Camila.",
    minutes: 30,
    price: 12000,
  },
];

export const BARBERS: Barber[] = [
  {
    id: "tomas",
    name: "Tomás Herrera",
    short: "Tomás",
    bio: "Lleva el fade como una medida, no como una moda. Poco de más, nada de menos.",
    photo: "/images/tomas.jpg",
    specialties: ["Fade", "Corte clásico", "Taper"],
  },
  {
    id: "camila",
    name: "Camila Soto",
    short: "Camila",
    bio: "Textura, flequillo y cortes que se mueven. Quien pide algo distinto, se sienta con ella.",
    photo: "/images/camila.jpg",
    specialties: ["Textura", "Junior", "Corte con forma"],
  },
  {
    id: "elias",
    name: "Elías Vidal",
    short: "Elías",
    bio: "Barba y afeitado de toalla caliente. El más lento de los tres, a propósito.",
    photo: "/images/elias.jpg",
    specialties: ["Barba", "Afeitado", "Toalla caliente"],
  },
];

/** 0 = domingo … 6 = sábado. Lunes cerrado. */
export const WEEK_HOURS: Record<number, DayHours | null> = {
  0: { open: "11:00", close: "15:00" },
  1: null,
  2: { open: "11:00", close: "20:00" },
  3: { open: "11:00", close: "20:00" },
  4: { open: "11:00", close: "20:00" },
  5: { open: "11:00", close: "20:00" },
  6: { open: "10:00", close: "18:00" },
};

export const HOURS_COPY = [
  { days: "Martes a viernes", hours: "11:00 – 20:00" },
  { days: "Sábado", hours: "10:00 – 18:00" },
  { days: "Domingo", hours: "11:00 – 15:00" },
  { days: "Lunes", hours: "Cerrado" },
] as const;

export const SLOT_STEP = 30;
export const BOOKING_HORIZON_DAYS = 14;
export const ANY_BARBER = "any";

export const BOBBA = {
  name: "Bobbasystem",
  url: "https://bobbasystem.cl",
  whatsapp:
    "https://wa.me/56998054574?text=Hola%2C%20vi%20la%20demo%20de%20Oficio%20Barber%C3%ADa%20y%20quisiera%20conversar%20sobre%20una%20soluci%C3%B3n%20para%20mi%20negocio.",
} as const;

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getBarber(id: string): Barber | undefined {
  return BARBERS.find((b) => b.id === id);
}
