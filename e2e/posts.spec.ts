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
