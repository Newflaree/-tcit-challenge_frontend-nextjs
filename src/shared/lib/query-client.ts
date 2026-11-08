import { QueryClient } from "@tanstack/react-query";

/**
 * Fábrica del `QueryClient` con defaults explícitos.
 *
 * - `staleTime` alto: evita refetch al remontar.
 * - `refetchOnWindowFocus` / `refetchOnReconnect` / `refetchOnMount`: false:
 *   la regla "una sola llamada al listado por vista" (HU-14/HU-16).
 * - `retry` acotado: 1 reintento para no bloquear la UI.
 *
 * Se instancia por render (useState) para no compartir el cliente entre
 * requests del servidor ni entre tests.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
