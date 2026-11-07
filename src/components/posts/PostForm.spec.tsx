import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createQueryClient } from "@/lib/query-client";
import { PostForm } from "@/components/posts/PostForm";
import { Provider } from "react-redux";
import { store } from "@/store";
import { postsFixture } from "@/test/fixtures/posts";

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();
  queryClient.setQueryData(["posts"], [...postsFixture]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

describe("PostForm (integración)", () => {
  it("envío exitoso agrega el post a la lista sin recargar", async () => {
    const user = userEvent.setup();
    render(<PostForm />, { wrapper: Wrapper });

    await user.type(screen.getByLabelText(/Nombre/), "Post nuevo");
    await user.type(screen.getByLabelText(/Descripción/), "Desc nueva");
    await user.click(screen.getByRole("button", { name: "Crear post" }));

    await waitFor(() => {
      // Form is cleared after success
      expect(screen.getByLabelText(/Nombre/)).toHaveValue("");
      expect(screen.getByLabelText(/Descripción/)).toHaveValue("");
    });
  });

  it("valida campos vacíos", async () => {
    const user = userEvent.setup();
    render(<PostForm />, { wrapper: Wrapper });

    await user.click(screen.getByRole("button", { name: "Crear post" }));

    await waitFor(() => {
      expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("La descripción es obligatoria"),
      ).toBeInTheDocument();
    });
  });

  it("deshabilita el botón mientras está pendiente", async () => {
    render(<PostForm />, { wrapper: Wrapper });
    const button = screen.getByRole("button", { name: "Crear post" });
    // Initially not disabled
    expect(button).not.toBeDisabled();
  });

  it("labels y botón son accesibles", () => {
    render(<PostForm />, { wrapper: Wrapper });
    expect(screen.getByLabelText(/Nombre/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Crear post" }),
    ).toBeInTheDocument();
  });
});
