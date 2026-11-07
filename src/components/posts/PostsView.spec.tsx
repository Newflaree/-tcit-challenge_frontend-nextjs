import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { createQueryClient } from "@/lib/query-client";
import { PostsView } from "@/components/posts/PostsView";
import { Provider } from "react-redux";
import { store } from "@/store";
import { server } from "@/test/mocks/server";
import { postsFixture } from "@/test/fixtures/posts";

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();
  // Seed cache to simulate loaded data
  queryClient.setQueryData(["posts"], postsFixture);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

describe("PostsView (integración)", () => {
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
      expect(screen.getByText("No hay posts")).toBeInTheDocument();
    });
  });

  it("muestra ErrorState y reintento cuando falla la petición", async () => {
    const { http, HttpResponse } = await import("msw");
    const { API_URL } = await import("@/config/env");
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
    expect(screen.getByRole("heading", { name: "Posts" })).toBeInTheDocument();
  });
});
