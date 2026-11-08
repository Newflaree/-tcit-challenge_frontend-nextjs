import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EmptyState, ErrorState } from "@/shared/components/ui/Alert";

describe("EmptyState", () => {
  it("muestra el título y la descripción", () => {
    render(<EmptyState title="Sin posts" description="Crea el primero." />);
    expect(screen.getByText("Sin posts")).toBeInTheDocument();
    expect(screen.getByText("Crea el primero.")).toBeInTheDocument();
  });

  it("muestra la acción opcional", () => {
    render(
      <EmptyState
        title="Sin posts"
        action={<button type="button">Crear</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Crear" })).toBeInTheDocument();
  });
});

describe("ErrorState", () => {
  it("muestra el mensaje y el botón de reintento", async () => {
    const user = userEvent.setup();
    const onRetry = jest.fn();
    render(<ErrorState message="Falló la carga" onRetry={onRetry} />);
    expect(screen.getByText("Falló la carga")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Reintentar" });
    await user.click(button);
    expect(onRetry).toHaveBeenCalled();
  });

  it("no muestra botón si no hay onRetry", () => {
    render(<ErrorState message="Falló" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
