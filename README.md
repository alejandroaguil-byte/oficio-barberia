# Oficio Barbería

**Demo de portafolio · [Bobbasystem](https://bobbasystem.cl)**

Barbería de barrio en Italia: un sitio que consigue sillas y un panel que ordena el servicio del día.

- Código: [github.com/alejandroaguil-byte/oficio-barberia](https://github.com/alejandroaguil-byte/oficio-barberia)

Oficio es un local ficticio. El proyecto existe para mostrar, con un caso concreto, el tipo de solución que Bobbasystem construye para pequeños negocios de Santiago.

## Recorrer la demo

1. Recorre el sitio como lo haría un cliente.
2. Reserva una silla: servicio, barbero, día y hora.
3. Entra al **panel** y verás esa reserva en la agenda. Confírmala, siéntala, o prueba un walk-in.

Los datos viven en el navegador. **Resetear demo** vuelve al escenario inicial.

## El caso

**Punto de partida.** Las horas se cerraban por WhatsApp. El Instagram traía consultas; el chat las perdía. Cada barbero tenía una versión distinta del día.

**Qué se construyó.** Un sitio con la identidad del local — servicios, equipo, barrio — y un flujo de reserva de un minuto. Sobre esa base, un panel: tres sillas, confirmar, sentar, walk-in.

**Por qué importa.** El cliente deja de preguntar si hay hora a las 18:00. El local deja de reconstruir el turno de memoria.

## Stack

React 19, TanStack Start, Tailwind CSS, Zustand y TypeScript.

## Desarrollo

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

## Publicar en Vercel

En el dashboard de Vercel (equipo Bobbasystem): **Add New** → **Project** → importar `alejandroaguil-byte/oficio-barberia`. El framework se detecta solo. Cada push a `main` vuelve a publicar.

## Bobbasystem

Atención directa, comunicación clara y soluciones pensadas para las necesidades reales de un negocio.

- Sitio: [bobbasystem.cl](https://bobbasystem.cl)
- Santiago · disponible para nuevos proyectos
