import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { createQueryClient } from "@/shared/lib/query-client";
import { store } from "@/shared/store";

describe("createQueryClient", () => {
  it("aplica los defaults explícitos de la estrategia", () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions().queries;

    expect(defaults?.staleTime).toBe(5 * 60 * 1000);
    expect(defaults?.refetchOnWindowFocus).toBe(false);
    expect(defaults?.refetchOnReconnect).toBe(false);
    expect(defaults?.refetchOnMount).toBe(false);
    expect(defaults?.retry).toBe(1);
  });

  it("crea instancias independientes (no se comparte entre renders)", () => {
    const a = createQueryClient();
    const b = createQueryClient();

    expect(a).not.toBe(b);
  });
});

describe("Providers smoke", () => {
  it("renderiza con Redux y TanStack Query a la vez", () => {
    const queryClient = createQueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <span>hola</span>
        </QueryClientProvider>
      </Provider>,
    );

    expect(screen.getByText("hola")).toBeInTheDocument();
  });
});
