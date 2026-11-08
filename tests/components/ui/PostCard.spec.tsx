import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PostCard } from "@/shared/components/ui/PostCard";

describe("PostCard", () => {
  it("renderiza nombre, descripción y id", () => {
    render(<PostCard id={7} name="Mi post" description="Desc" />);
    expect(screen.getByRole("heading", { name: "Mi post" })).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("ejecuta onEdit", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();
    render(<PostCard id={1} name="P" description="D" onEdit={onEdit} />);
    await user.click(screen.getByRole("button", { name: "Editar" }));
    expect(onEdit).toHaveBeenCalled();
  });

  it("ejecuta onDelete", async () => {
    const user = userEvent.setup();
    const onDelete = jest.fn();
    render(<PostCard id={1} name="P" description="D" onDelete={onDelete} />);
    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(onDelete).toHaveBeenCalled();
  });

  it("muestra # cuando el nombre no tiene iniciales", () => {
    render(<PostCard id={2} name="   " description="D" />);
    expect(screen.getByText("#")).toBeInTheDocument();
  });
});
