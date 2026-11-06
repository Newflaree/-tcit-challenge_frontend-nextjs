import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";

/**
 * Render central de los tests. Hoy delega en React Testing Library; cuando
 * existan los providers (HU-12) se envolverá la UI con QueryClientProvider y
 * el Provider de Redux para que los tests de integración no los repitan.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { ...options });
}

export * from "@testing-library/react";
export { renderWithProviders as render, userEvent };
