# TCIT Posts — Frontend: puesta en marcha

Frontend Next.js (App Router) del challenge de Posts.

- Puerto por defecto: `4200`
- API consumida: `http://localhost:3000/api` (configurable)

## Requisitos

- Node.js 24 o superior.
- npm 10 o superior.

## Instalación

```bash
npm install
cp .env.example .env.local
```

Completar `.env.local` si se desea otra URL de API.

## Variables de entorno

| Variable | Obligatoria | Valor por defecto |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:3000/api` |

Se lee en `src/shared/config/env.ts`.

## Scripts

- `npm run dev` — servidor de desarrollo en `http://localhost:4200`.
- `npm run build` — build de producción.
- `npm run start` — sirve la build.
- `npm run lint` — ESLint.
- `npm run format` / `format:check` — Prettier.
- `npm run typecheck` — `tsc --noEmit`.
- `npm test` — tests unitarios/integración (Jest + RTL + MSW).
- `npm run test:cov` — cobertura (100%).
- `npm run test:e2e` — tests E2E (Playwright).

## Notas

- `typecheck` requiere un `npm run build` previo en un clon limpio (tipos
  generados por Next.js); el CI lo maneja.
- El frontend usa MSW para mockear la API en tests; no requiere backend real.
