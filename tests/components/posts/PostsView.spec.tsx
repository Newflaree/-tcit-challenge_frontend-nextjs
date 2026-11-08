import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createQueryClient } from "@/shared/lib/query-client";
import { PostsView } from "@/posts/presentation/views/PostsView";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import { server } from "@/test/mocks/server";
import { postsFixture } from "@/test/fixtures/posts";

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();
  queryClient.setQueryData(["posts"], postsFixture);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

describe("PostsView (integración)", () => {
  beforeEach(() => {
    store.dispatch({ type: "posts/clearFilter" });
    store.dispatch({ type: "posts/cancelDelete" });
  });

  it("muestra un PostCard por cada post", async () => {
    render(<PostsView />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
      expect(screen.getByText("Segundo post")).toBeInTheDocument();
      expect(screen.getByText("Tercer post")).toBeInTheDocument();
    });
  });

  it("muestra EmptyState cuando no hay posts", async () => {
    const EmptyWrapper = ({ children }: { children: React.ReactNode }) => {
      const qc = createQueryClient();
      qc.setQueryData(["posts"], []);
      return (
        <Provider store={store}>
          <QueryClientProvider client={qc}>{children}</QueryClientProvider>
        </Provider>
      );
    };

    render(<PostsView />, { wrapper: EmptyWrapper });

    await waitFor(() => {
      expect(screen.getByText("Todavía no hay posts")).toBeInTheDocument();
    });
  });

  it("muestra ErrorState y reintento cuando falla la petición", async () => {
    const { http, HttpResponse } = await import("msw");
    const { API_URL } = await import("@/shared/config/env");
    server.use(
      http.get(`${API_URL}/posts`, () =>
        HttpResponse.json(
          { statusCode: 500, message: "Error", error: "Internal Server Error" },
          { status: 500 },
        ),
      ),
    );

    const ErrorWrapper = ({ children }: { children: React.ReactNode }) => {
      const qc = createQueryClient();
      return (
        <Provider store={store}>
          <QueryClientProvider client={qc}>{children}</QueryClientProvider>
        </Provider>
      );
    };

    render(<PostsView />, { wrapper: ErrorWrapper });

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: "Reintentar" }),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    await userEvent.click(screen.getByRole("button", { name: "Reintentar" }));
  });

  it("renderiza heading principal", () => {
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });
    expect(screen.getByRole("heading", { name: "Tus posts" })).toBeInTheDocument();
  });

  it("muestra 'Sin coincidencias' cuando el filtro no devuelve resultados", async () => {
    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Filtrar por nombre...");
    await user.type(input, "zzzzz");

    await waitFor(() => {
      expect(screen.getByText("Sin coincidencias")).toBeInTheDocument();
    });
  });

  it("elimina un post y lo quita de la lista", async () => {
    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const deleteBtn = screen.getAllByRole("button", { name: "Eliminar" })[0];
    await user.click(deleteBtn);

    const dialog = await screen.findByRole("dialog");
    const confirmBtn = dialog.querySelector("button:last-of-type") as HTMLElement;
    await user.click(confirmBtn);

    await waitFor(() => {
      expect(screen.queryByText("Primer post")).not.toBeInTheDocument();
    });
  });

  it("muestra error si la eliminación falla con 404", async () => {
    const { http, HttpResponse } = await import("msw");
    const { API_URL } = await import("@/shared/config/env");
    server.use(
      http.delete(`${API_URL}/posts/:id`, () =>
        HttpResponse.json(
          { statusCode: 404, message: "no existe", error: "Not Found" },
          { status: 404 },
        ),
      ),
    );

    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const deleteBtn = screen.getAllByRole("button", { name: "Eliminar" })[0];
    await user.click(deleteBtn);

    const dialog = await screen.findByRole("dialog");
    const confirmBtn = dialog.querySelector("button:last-of-type") as HTMLElement;
    await user.click(confirmBtn);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("muestra error si la eliminación falla con 500", async () => {
    const { errorHandlers } = await import("@/test/mocks/handlers");
    server.use(errorHandlers.deletePostFails);

    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const deleteBtn = screen.getAllByRole("button", { name: "Eliminar" })[0];
    await user.click(deleteBtn);

    const dialog = await screen.findByRole("dialog");
    const confirmBtn = dialog.querySelector("button:last-of-type") as HTMLElement;
    await user.click(confirmBtn);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("cancela la eliminación sin efectos", async () => {
    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const deleteBtn = screen.getAllByRole("button", { name: "Eliminar" })[0];
    await user.click(deleteBtn);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });
  });

  it("muestra error si la eliminación falla por red", async () => {
    const { http, HttpResponse } = await import("msw");
    const { API_URL } = await import("@/shared/config/env");
    server.use(
      http.delete(`${API_URL}/posts/:id`, () => HttpResponse.error()),
    );

    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const deleteBtn = screen.getAllByRole("button", { name: "Eliminar" })[0];
    await user.click(deleteBtn);

    const dialog = await screen.findByRole("dialog");
    const confirmBtn = dialog.querySelector("button:last-of-type") as HTMLElement;
    await user.click(confirmBtn);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("renderiza con un único post", () => {
    const qc = createQueryClient();
    qc.setQueryData(["posts"], [postsFixture[0]]);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });
    expect(screen.getByText("Primer post")).toBeInTheDocument();
  });

  it("renderiza con un único post filtrado", () => {
    store.dispatch({ type: "posts/setFilterName", payload: "Primer" });
    const qc = createQueryClient();
    qc.setQueryData(["posts"], [postsFixture[0]]);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });
    expect(screen.getByText("Primer post")).toBeInTheDocument();
    store.dispatch({ type: "posts/clearFilter" });
  });

  it("limpia el filtro con el botón", async () => {
    const user = userEvent.setup();
    const qc = createQueryClient();
    qc.setQueryData(["posts"], postsFixture);
    const W = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
      </Provider>
    );
    render(<PostsView />, { wrapper: W });

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Filtrar por nombre...");
    await user.type(input, "zzzzz");

    const clearBtn = screen.getByRole("button", { name: "Limpiar filtro" });
    await user.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByText("Primer post")).toBeInTheDocument();
    });
  });
});
