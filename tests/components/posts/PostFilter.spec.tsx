import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PostFilter } from "@/components/posts/PostFilter";

describe("PostFilter", () => {
  it("muestra el botón de limpiar sólo con valor", () => {
    const { rerender } = render(
      <PostFilter value="" onChange={jest.fn()} />,
    );
    expect(screen.queryByRole("button", { name: "Limpiar filtro" })).not.toBeInTheDocument();

    rerender(<PostFilter value="abc" onChange={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Limpiar filtro" })).toBeInTheDocument();
  });

  it("limpia con onChange cuando no hay onClear", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PostFilter value="abc" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Limpiar filtro" }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("usa onClear cuando se proporciona", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onClear = jest.fn();
    render(<PostFilter value="abc" onChange={onChange} onClear={onClear} />);
    await user.click(screen.getByRole("button", { name: "Limpiar filtro" }));
    expect(onClear).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });
});
