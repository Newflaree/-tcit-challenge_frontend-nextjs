import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/shared/components/ui/Button";

describe("Button", () => {
  it("renderiza la variante primary por defecto", () => {
    render(<Button>Guardar</Button>);
    const button = screen.getByRole("button", { name: "Guardar" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("respeta disabled", () => {
    render(<Button disabled>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeDisabled();
  });

  it("muestra loading y deshabilita", () => {
    render(<Button loading>Guardar</Button>);
    const button = screen.getByRole("button", { name: /Guardar/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("soporta variantes", () => {
    const { rerender } = render(<Button variant="danger">Eliminar</Button>);
    expect(
      screen.getByRole("button", { name: "Eliminar" }),
    ).toBeInTheDocument();
    rerender(<Button variant="secondary">Cancelar</Button>);
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
  });

  it("ejecuta onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalled();
  });
});
