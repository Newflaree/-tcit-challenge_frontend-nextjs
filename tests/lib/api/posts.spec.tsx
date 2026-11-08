import { server } from "@/test/mocks/server";
import { errorHandlers } from "@/test/mocks/handlers";
import { http, HttpResponse } from "msw";
import { API_URL } from "@/config/env";
import { createPost, deletePost, getPosts } from "@/lib/api/posts";

describe("api/posts", () => {
  it("getPosts devuelve el listado", async () => {
    const posts = await getPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("getPosts lanza ApiError en 500", async () => {
    server.use(errorHandlers.listPostsFails);
    await expect(getPosts()).rejects.toMatchObject({ status: 500 });
  });

  it("createPost devuelve el post creado", async () => {
    const post = await createPost({ name: "Nuevo", description: "Desc" });
    expect(post.name).toBe("Nuevo");
  });

  it("createPost lanza ApiError en 500", async () => {
    server.use(errorHandlers.createPostFails);
    await expect(
      createPost({ name: "Nuevo", description: "Desc" }),
    ).rejects.toMatchObject({ status: 500 });
  });

  it("deletePost devuelve el post eliminado", async () => {
    const post = await deletePost(1);
    expect(post.id).toBe(1);
  });

  it("deletePost lanza ApiError en 404", async () => {
    await expect(deletePost(999)).rejects.toMatchObject({ status: 404 });
  });

  it("getPosts maneja message como array", async () => {
    server.use(
      http.get(`${API_URL}/posts`, () =>
        HttpResponse.json({ message: ["a", "b"], error: "Bad" }, { status: 400 }),
      ),
    );
    await expect(getPosts()).rejects.toMatchObject({ message: "a, b" });
  });

  it("getPosts conserva mensaje por defecto si el cuerpo no es JSON", async () => {
    server.use(
      http.get(`${API_URL}/posts`, () =>
        new HttpResponse("not json", { status: 500, headers: { "Content-Type": "text/plain" } }),
      ),
    );
    await expect(getPosts()).rejects.toMatchObject({ message: "Error 500" });
  });

  it("deletePost maneja respuesta 204", async () => {
    server.use(
      http.delete(`${API_URL}/posts/:id`, () => new HttpResponse(null, { status: 204 })),
    );
    const post = await deletePost(5);
    expect(post).toEqual({ id: 5 });
  });
});
