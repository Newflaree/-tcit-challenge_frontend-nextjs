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

# verificar formato
npm run format:check

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

Estrategia definida en la HU-03. La matriz de casos por flujo, por nivel y por
HU vive en [`../docs/testing/matriz-pruebas.md`](../docs/testing/matriz-pruebas.md).

| Comando | Qué ejecuta | Requiere |
|---|---|---|
| `npm run test` | Tests unitarios e integración (Jest + `next/jest`, jsdom) | Nada |
| `npm run test:watch` | Unitarios en modo watch | Nada |
| `npm run test:cov` | Unitarios + cobertura con umbrales | Nada |
| `npm run test:e2e` | Tests E2E (Playwright, Chromium) | Servidor de desarrollo (se levanta solo) |

Prerrequisito único para E2E: `npx playwright install chromium` (ya ejecutado
en la instalación inicial; repetirlo tras actualizar Playwright).

**Reproducibilidad:** `npm run typecheck` depende de los tipos generados por
Next (`next-env.d.ts` y `.next/types`). Tras un clon fresco, ejecuta
`npm run build` (o `npm run dev`) una vez antes de `npm run typecheck`; el
workflow de CI hace el build antes del typecheck por este motivo.

### Herramientas

- **Jest + `next/jest`** como runner y transformador (SWC).
- **React Testing Library + `jest-dom`** para componentes y queries accesibles.
- **MSW 3** intercepta todo el HTTP: los handlers base cubren listar, crear,
  eliminar y error al nivel del contrato (`src/test/mocks/handlers.ts`); una
  petición sin handler falla el test (`onUnhandledFrame: "error"`).
- **Playwright** con un único proyecto Chromium; smoke de carga inicial en
  `e2e/smoke.spec.ts`.

### Cobertura

`npm run test:cov` aplica umbrales mínimos por módulo crítico
(`jest.config.ts`):

- `./src/config/`: 90% statements / 80% branches / 90% functions / 90% lines.

Política: al incorporar `src/features/**`, `src/store/**` y `src/lib/**`
(HU-12+) se agregan sus umbrales con líneas/funciones ≥ 80 y ramas ≥ 70.

### Regla “una sola llamada al listado por vista”

Definida aquí y en la matriz §5; los tests funcionales llegan en HU-20. Plan:

1. **Unitario (HU-12/20):** montar el hook/vista dentro de un
   `QueryClientProvider` y afirmar que, tras remontaje, cambio de foco y
   navegación simulada, no se repite la petición. La configuración esperada es
   `staleTime` alto, `refetchOnWindowFocus: false`, `refetchOnReconnect: false`
   y `refetchOnMount: false`, verificada por el número de llamadas (no por
   opciones internas).
2. **Integración (HU-20):** con MSW, un contador sobre `GET /api/posts`
   (evento `request:start`/`response:mocked`) afirma `calls === 1` después de
   montar → desmontar → remontar → `visibilitychange`/focus. Las mutaciones
   actualizan la caché con `setQueryData` y el contador de `GET` sigue en 1.
3. **E2E:** no aplica (declarado en la matriz de la HU-03).

### Aislamiento

- Los tests no llaman al backend real: MSW intercepta todo el HTTP.
- Los datos son sintéticos (`src/test/fixtures/posts.ts`, espejo de
  `tcit-test-back/test/fixtures/posts.json`).
- El render central está en `src/test/test-utils.tsx` y se extenderá con los
  providers en HU-12.

Las historias de usuario y el flujo de ramas están en `../docs/hu/README.md`.
