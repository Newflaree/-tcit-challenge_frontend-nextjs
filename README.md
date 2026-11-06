# TCIT Posts — Frontend

Interfaz del challenge de Posts. Construida con Next.js App Router, React,
Redux Toolkit y Tailwind CSS.

- Puerto por defecto: `4200`
- URL de la API: `http://localhost:3000/api` (configurable)
- Documentación del proyecto: [`../README.md`](../README.md)

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior (el repositorio incluye `package-lock.json`).
- Backend en ejecución en `http://localhost:3000`.

## Instalación

```bash
npm install
cp .env.example .env.local
```

El archivo `.env.local` está ignorado por Git. `.env.example` sí se versiona.

## Variables de entorno

| Variable | Obligatoria | Valor por defecto | Descripción |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3000/api` | URL base de la API |

La lectura de la variable está centralizada en `src/config/env.ts`. Si no se
define, la aplicación usa el backend local documentado.

## Comandos

```bash
# desarrollo en http://localhost:4200
npm run dev

# verificar tipos
npm run typecheck

# lint
npm run lint

# build de producción
npm run build

# servir el build en http://localhost:4200
npm run start
```

## Estructura

```text
src/
  app/                 # Rutas y providers del App Router
  config/env.ts        # URL base de la API
  features/            # Slices y componentes por funcionalidad
  store/               # Configuración de Redux Toolkit
```

## Estado y datos

- **Redux** administra estado local/UI, como el filtro por nombre.
- **TanStack Query** administrará el estado del servidor (posts). Se incorpora
  en las HU de frontend.
- El listado se consultará una sola vez por carga de vista; crear y eliminar
  actualizarán la caché sin repetir el `GET`.

## Testing

La estrategia y las herramientas se configuran en las HU de testing
(Jest, React Testing Library, MSW y Playwright). Por ahora los comandos
disponibles son `lint`, `typecheck` y `build`.

Las historias de usuario y el flujo de ramas están en `../docs/hu/README.md`.
