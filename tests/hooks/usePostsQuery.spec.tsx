import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { createQueryClient } from "@/lib/query-client";
import { usePostsQuery } from "@/posts/presentation/hooks/usePostsQuery";
import { useCreatePostMutation } from "@/posts/presentation/hooks/useCreatePostMutation";
import { useDeletePostMutation } from "@/posts/presentation/hooks/useDeletePostMutation";
import { server } from "@/test/mocks/server";
import { errorHandlers } from "@/test/mocks/handlers";
import {
  postsFixture,
  newPostFixture,
  createdPostFixture,
} from "@/test/fixtures/posts";

function makeWrapper() {
  const queryClient = createQueryClient();
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, Wrapper };
}

describe("usePostsQuery", () => {
  it("devuelve datos y estados de carga", async () => {
    const { Wrapper } = makeWrapper();
    const { result } = renderHook(() => usePostsQuery(), { wrapper: Wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(postsFixture);
  });

  it("expone error cuando el endpoint falla", async () => {
    server.use(errorHandlers.listPostsFails);

    const { Wrapper } = makeWrapper();
    const { result } = renderHook(() => usePostsQuery(), { wrapper: Wrapper });

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 5000 },
    );

    expect(result.current.error).toBeDefined();
  });
});

describe("Regla: una sola llamada al listado", () => {
  it("sólo se realiza un GET /api/posts al montar", async () => {
    let calls = 0;
    server.events.on("request:start", ({ request }) => {
      if (request.method === "GET" && request.url.includes("/posts")) {
        calls += 1;
      }
    });

    const { Wrapper } = makeWrapper();
    const { result } = renderHook(() => usePostsQuery(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(calls).toBe(1);

    server.events.removeAllListeners("request:start");
  });

  it("crear agrega el post a la caché sin repetir el GET", async () => {
    let getCalls = 0;
    server.events.on("request:start", ({ request }) => {
      if (request.method === "GET" && request.url.includes("/posts")) {
        getCalls += 1;
      }
    });

    const { queryClient, Wrapper } = makeWrapper();

    queryClient.setQueryData(["posts"], postsFixture);

    const { result: mutationResult } = renderHook(
      () => useCreatePostMutation(),
      { wrapper: Wrapper },
    );

    await mutationResult.current.mutateAsync(newPostFixture);

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached).toHaveLength(postsFixture.length + 1);
    expect(cached?.[0]).toEqual(createdPostFixture);
    expect(getCalls).toBe(0);

    server.events.removeAllListeners("request:start");
  });

  it("eliminar quita el post de la caché sin repetir el GET", async () => {
    let getCalls = 0;
    server.events.on("request:start", ({ request }) => {
      if (request.method === "GET" && request.url.includes("/posts")) {
        getCalls += 1;
      }
    });

    const { queryClient, Wrapper } = makeWrapper();
    queryClient.setQueryData(["posts"], postsFixture);

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await mutationResult.current.mutateAsync(1);

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached).toHaveLength(postsFixture.length - 1);
    expect(cached?.find((p) => p.id === 1)).toBeUndefined();
    expect(getCalls).toBe(0);

    server.events.removeAllListeners("request:start");
  });

  it("eliminar con éxito sin caché no rompe la UI", async () => {
    const { queryClient, Wrapper } = makeWrapper();
    // no seed

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await expect(mutationResult.current.mutateAsync(1)).resolves.toBeDefined();
    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached).toBeUndefined();
  });

  it("eliminar 404 sin caché no rompe la UI", async () => {
    const { server } = await import("@/test/mocks/server");
    const { API_URL } = await import("@/config/env");
    const { http, HttpResponse } = await import("msw");
    server.use(
      http.delete(`${API_URL}/posts/:id`, () =>
        HttpResponse.json({ statusCode: 404, message: "no", error: "Not Found" }, { status: 404 }),
      ),
    );

    const { queryClient, Wrapper } = makeWrapper();
    // no seed

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await expect(mutationResult.current.mutateAsync(999)).rejects.toBeDefined();
    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached).toBeUndefined();
  });

  it("eliminar con error de red mantiene el post en la caché", async () => {
    const { http, HttpResponse } = await import("msw");
    const { API_URL } = await import("@/config/env");
    const { server } = await import("@/test/mocks/server");
    server.use(
      http.delete(`${API_URL}/posts/:id`, () => HttpResponse.error()),
    );

    const { queryClient, Wrapper } = makeWrapper();
    queryClient.setQueryData(["posts"], postsFixture);

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await expect(mutationResult.current.mutateAsync(1)).rejects.toBeDefined();

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached?.find((p) => p.id === 1)).toBeDefined();
  });

  it("eliminar con error 500 mantiene el post en la caché", async () => {
    const { server } = await import("@/test/mocks/server");
    const { errorHandlers } = await import("@/test/mocks/handlers");
    server.use(errorHandlers.deletePostFails);

    const { queryClient, Wrapper } = makeWrapper();
    queryClient.setQueryData(["posts"], postsFixture);

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await expect(mutationResult.current.mutateAsync(1)).rejects.toBeDefined();

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached?.find((p) => p.id === 1)).toBeDefined();

    server.events.removeAllListeners("request:start");
  });

  it("eliminar con 404 sincroniza la caché sin repetir el GET", async () => {
    let getCalls = 0;
    server.events.on("request:start", ({ request }) => {
      if (request.method === "GET" && request.url.includes("/posts")) {
        getCalls += 1;
      }
    });

    const { queryClient, Wrapper } = makeWrapper();
    queryClient.setQueryData(["posts"], [
      ...postsFixture,
      { id: 999, name: "Fantasma", description: "desc" },
    ]);

    const { result: mutationResult } = renderHook(
      () => useDeletePostMutation(),
      { wrapper: Wrapper },
    );

    await expect(mutationResult.current.mutateAsync(999)).rejects.toBeDefined();

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached?.find((p) => p.id === 999)).toBeUndefined();
    expect(getCalls).toBe(0);

    server.events.removeAllListeners("request:start");
  });

  it("crear con caché vacía inicializa la caché", async () => {
    const { queryClient, Wrapper } = makeWrapper();

    const { result: mutationResult } = renderHook(
      () => useCreatePostMutation(),
      { wrapper: Wrapper },
    );

    await mutationResult.current.mutateAsync(newPostFixture);

    const cached = queryClient.getQueryData<typeof postsFixture>(["posts"]);
    expect(cached).toHaveLength(1);
    expect(cached?.[0]).toEqual(createdPostFixture);
  });
});
