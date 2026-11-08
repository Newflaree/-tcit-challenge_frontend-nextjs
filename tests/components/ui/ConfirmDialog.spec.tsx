import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ConfirmDialog, PageHeader } from "@/shared/components/ui/ConfirmDialog";

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

  it("restaura el foco al cerrar", () => {
    const trigger = document.createElement("button");
    trigger.textContent = "abrir";
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(
      <ConfirmDialog
        open={true}
        title="Eliminar"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );
    rerender(
      <ConfirmDialog
        open={false}
        title="Eliminar"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(trigger).toHaveFocus();
    document.body.removeChild(trigger);
  });

describe("PageHeader", () => {
  it("renderiza sin action", () => {
    render(<PageHeader title="Título" description="Desc" />);
    expect(screen.getByRole("heading", { name: "Título" })).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("renderiza sin description ni action", () => {
    render(<PageHeader title="Título" />);
    expect(screen.getByRole("heading", { name: "Título" })).toBeInTheDocument();
  });

  it("renderiza con action", () => {
    render(<PageHeader title="Título" action={<button>Acción</button>} />);
    expect(screen.getByRole("button", { name: "Acción" })).toBeInTheDocument();
  });
});
});
