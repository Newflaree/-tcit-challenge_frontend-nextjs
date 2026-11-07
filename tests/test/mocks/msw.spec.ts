import { API_URL } from "@/config/env";
import {
  apiErrorFixture,
  createdPostFixture,
  newPostFixture,
  postsFixture,
} from "@/test/fixtures/posts";
import { errorHandlers } from "@/test/mocks/handlers";
import { server } from "@/test/mocks/server";

const postsUrl = `${API_URL}/posts`;

/**
 * Prueba de harness de MSW (HU-03): los handlers base cubren los flujos
 * listar, crear, eliminar y error al nivel del contrato HTTP. Los tests
 * funcionales de cada flujo llegan en HU-20 sobre esta misma base.
 */
describe("MSW mockea la API sin backend real", () => {
  it("sirve el listado canónico en GET /posts", async () => {
    const response = await fetch(postsUrl);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(postsFixture);
  });

  it("responde 201 con el post creado en POST /posts", async () => {
    const response = await fetch(postsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostFixture),
    });

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual(createdPostFixture);
  });

  it("responde 200 al eliminar un post existente", async () => {
    const response = await fetch(`${postsUrl}/1`, { method: "DELETE" });

    expect(response.status).toBe(200);
  });

  it("responde 404 al eliminar un post inexistente", async () => {
    const response = await fetch(`${postsUrl}/999`, { method: "DELETE" });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ statusCode: 404 }),
    );
  });

  it("permite activar estados de error por test con server.use", async () => {
    server.use(errorHandlers.listPostsFails);

    const response = await fetch(postsUrl);

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual(apiErrorFixture);
  });

  it("falla ante una ruta no mockeada en vez de tocar la red", async () => {
    // onUnhandledFrame: "error" convierte cualquier petición sin handler en
    // un error: la prueba de que no se llama al backend real.
    await expect(fetch(`${postsUrl}-ruta-inexistente`)).rejects.toThrow();
  });
});
