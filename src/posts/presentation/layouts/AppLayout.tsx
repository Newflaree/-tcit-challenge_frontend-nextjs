import type { ReactNode } from "react";

import { Providers } from "@/app/providers";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Layout reutilizable de la aplicación.
 *
 * Envuelve el árbol con los providers globales (Redux + TanStack Query)
 * para que `app/layout.tsx` solo gestione metadatos y fuentes.
 */
export function AppLayout({ children }: AppLayoutProps) {
  return <Providers>{children}</Providers>;
}
