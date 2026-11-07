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
