"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

import { createQueryClient } from "@/shared/lib/query-client";
import { store } from "@/shared/store";

export function Providers({ children }: { children: ReactNode }) {
  // Instancia única por request/render: evita compartir el QueryClient entre
  // requests del servidor (SSR) y entre tests.
  const [queryClient] = useState(() => createQueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </Provider>
  );
}
