import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("no renderiza cuando open es false", () => {
    render(
      <ConfirmDialog
        open={false}
        title="Eliminar"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza cuando open es true", () => {
    render(
      <ConfirmDialog
        open={true}
        title="Eliminar post"
        description="¿Estás seguro?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Eliminar post")).toBeInTheDocument();
    expect(screen.getByText("¿Estás seguro?")).toBeInTheDocument();
  });

  it("cierra con Escape", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(
      <ConfirmDialog
        open={true}
        title="Eliminar"
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />,
    );
    await user.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalled();
  });

  it("enfoca el botón de cancelar al abrir", () => {
    render(
      <ConfirmDialog
        open={true}
        title="Eliminar"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();
  });
});
