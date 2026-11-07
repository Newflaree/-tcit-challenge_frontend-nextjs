import { useState } from "react";
import { render, screen, userEvent, within } from "@/test/test-utils";

/**
 * Prueba de harness de React Testing Library + jest-dom + user-event.
 * Usa un componente de muestra con queries accesibles (getByRole,
 * getByLabelText), como pide la estrategia de la HU-03.
 */
function SampleForm() {
  const [count, setCount] = useState(0);

  return (
    <form aria-label="Formulario de muestra">
      <label htmlFor="sample-name">Nombre</label>
      <input id="sample-name" name="name" type="text" />
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Incrementar
      </button>
      <output data-testid="sample-count">{count}</output>
    </form>
  );
}

describe("Harness de Testing Library", () => {
  it("renderiza y expone queries accesibles con matchers de jest-dom", () => {
    render(<SampleForm />);

    expect(
      screen.getByRole("form", { name: "Formulario de muestra" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Incrementar" }),
    ).toBeInTheDocument();
  });

  it("interactúa con user-event", async () => {
    const user = userEvent.setup();
    render(<SampleForm />);

    await user.type(screen.getByLabelText("Nombre"), "Segundo post");
    expect(screen.getByLabelText("Nombre")).toHaveValue("Segundo post");

    await user.click(screen.getByRole("button", { name: "Incrementar" }));
    await user.click(screen.getByRole("button", { name: "Incrementar" }));

    const form = screen.getByRole("form", { name: "Formulario de muestra" });
    expect(within(form).getByTestId("sample-count")).toHaveTextContent("2");
  });
});
