import { expect, test } from "@playwright/test";

const postsFixture = [
  { id: 1, name: "Primer post", description: "Descripción del primer post" },
  { id: 2, name: "Segundo post", description: "Descripción del segundo post" },
];

test("la página carga y muestra posts", async ({ page }) => {
  // Mockear la API para no depender del backend real
  await page.route("**/api/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(postsFixture),
    });
  });

  await page.goto("/");

  // La página carga correctamente
  await expect(page).toHaveURL("/");

  // Se muestran los posts
  await expect(
    page.getByRole("heading", { name: "Primer post" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Segundo post" }),
  ).toBeVisible();
});

test("la página muestra estado vacío sin posts", async ({ page }) => {
  await page.route("**/api/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  await page.goto("/");

  await expect(page.getByText("No hay posts")).toBeVisible();
});

test("crear un post y verlo en la lista", async ({ page }) => {
  const posts: { id: number; name: string; description: string }[] = [];

  await page.route("**/api/posts", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(posts),
      });
    } else if (route.request().method() === "POST") {
      const body = route.request().postDataJSON();
      const created = {
        id: posts.length + 1,
        name: body.name,
        description: body.description,
      };
      posts.push(created);
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(created),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/");

  // Fill the form
  await page.getByLabel(/Nombre/).fill("Post E2E");
  await page.getByLabel(/Descripción/).fill("Descripción E2E");

  // Submit
  await page.getByRole("button", { name: "Crear post" }).click();

  // The post should appear in the list
  await expect(page.getByRole("heading", { name: "Post E2E" })).toBeVisible();
});

test("filtrar por nombre muestra sólo coincidencias", async ({ page }) => {
  await page.route("**/api/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: 1, name: "React post", description: "desc" },
        { id: 2, name: "Vue post", description: "desc" },
      ]),
    });
  });

  await page.goto("/");

  await expect(page.getByText("React post")).toBeVisible();
  await expect(page.getByText("Vue post")).toBeVisible();

  await page.getByPlaceholder("Filtrar por nombre...").fill("react");

  await expect(page.getByText("React post")).toBeVisible();
  await expect(page.getByText("Vue post")).not.toBeVisible();

  // Clear filter restores all
  await page.getByRole("button", { name: "Limpiar filtro" }).click();
  await expect(page.getByText("Vue post")).toBeVisible();
});

test("eliminar un post y verificar que desaparece", async ({ page }) => {
  const posts = [
    { id: 1, name: "Post a borrar", description: "desc" },
    { id: 2, name: "Post que queda", description: "desc" },
  ];

  await page.route("**/api/posts", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(posts.filter((p) => p.id !== 999)),
      });
    } else {
      await route.continue();
    }
  });

  await page.route("**/api/posts/*", async (route) => {
    if (route.request().method() === "DELETE") {
      const id = Number(route.request().url().split("/").pop());
      const idx = posts.findIndex((p) => p.id === id);
      if (idx >= 0) posts.splice(idx, 1);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id }),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/");

  await expect(page.getByText("Post a borrar")).toBeVisible();

  // Click delete on the post card
  const card = page.locator("article", { hasText: "Post a borrar" });
  await card.getByRole("button", { name: "Eliminar" }).click();

  // Confirm dialog appears with post name
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Post a borrar" }),
  ).toBeVisible();

  // Confirm
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Eliminar" })
    .click();

  // Post disappears
  await expect(
    page.getByRole("heading", { name: "Post a borrar" }),
  ).not.toBeVisible();
  await expect(page.getByText("Post que queda")).toBeVisible();
});

test("flujo completo: crear, filtrar y eliminar", async ({ page }) => {
  const posts: { id: number; name: string; description: string }[] = [
    { id: 1, name: "Post existente", description: "desc" },
  ];
  let nextId = 2;

  await page.route("**/api/posts", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(posts),
      });
    } else if (route.request().method() === "POST") {
      const body = route.request().postDataJSON();
      const created = {
        id: nextId++,
        name: body.name,
        description: body.description,
      };
      posts.push(created);
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(created),
      });
    } else {
      await route.continue();
    }
  });

  await page.route("**/api/posts/*", async (route) => {
    if (route.request().method() === "DELETE") {
      const id = Number(route.request().url().split("/").pop());
      const idx = posts.findIndex((p) => p.id === id);
      if (idx >= 0) posts.splice(idx, 1);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ id }),
      });
    } else {
      await route.continue();
    }
  });

  await page.goto("/");

  // Create
  await page.getByLabel(/Nombre/).fill("Nuevo filtrable");
  await page.getByLabel(/Descripción/).fill("desc");
  await page.getByRole("button", { name: "Crear post" }).click();
  await expect(
    page.getByRole("heading", { name: "Nuevo filtrable" }),
  ).toBeVisible();

  // Filter
  await page.getByPlaceholder("Filtrar por nombre...").fill("filtrable");
  await expect(
    page.getByRole("heading", { name: "Nuevo filtrable" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Post existente" }),
  ).not.toBeVisible();

  // Clear filter
  await page.getByRole("button", { name: "Limpiar filtro" }).click();
  await expect(
    page.getByRole("heading", { name: "Post existente" }),
  ).toBeVisible();

  // Delete the created post
  const card = page.locator("article", { hasText: "Nuevo filtrable" });
  await card.getByRole("button", { name: "Eliminar" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Eliminar" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Nuevo filtrable" }),
  ).not.toBeVisible();
});

test("navegación por teclado en formulario", async ({ page }) => {
  await page.route("**/api/posts", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });
  await page.goto("/");
  await page.keyboard.press("Tab");
  // Just ensure no crash and page renders
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
});
