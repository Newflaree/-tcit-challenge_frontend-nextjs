import { render, screen } from "@testing-library/react";

import { TextareaField, TextField } from "@/components/ui/FormField";

describe("TextField", () => {
  it("asocia label, input y error", () => {
    render(<TextField label="Nombre" error="El nombre es obligatorio" />);

    const input = screen.getByLabelText("Nombre");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "El nombre es obligatorio",
    );
  });

  it("muestra hint cuando no hay error", () => {
    render(<TextField label="Nombre" hint="Entre 1 y 120 caracteres" />);
    expect(screen.getByText("Entre 1 y 120 caracteres")).toBeInTheDocument();
  });

  it("acepta className", () => {
    render(<TextField label="Nombre" className="custom-class" />);
    expect(screen.getByLabelText("Nombre")).toHaveClass("custom-class");
  });

describe("TextareaField", () => {
  it("asocia label y error", () => {
    render(<TextareaField label="Descripción" error="La descripción es obligatoria" />);
    const ta = screen.getByLabelText("Descripción");
    expect(ta).toBeInTheDocument();
    expect(ta).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("La descripción es obligatoria");
  });

  it("muestra hint cuando no hay error", () => {
    render(<TextareaField label="Descripción" hint="Entre 1 y 1000 caracteres" />);
    expect(screen.getByText("Entre 1 y 1000 caracteres")).toBeInTheDocument();
  });

  it("acepta className", () => {
    render(<TextareaField label="Descripción" className="custom-class" />);
    expect(screen.getByLabelText("Descripción")).toHaveClass("custom-class");
  });
});
});
