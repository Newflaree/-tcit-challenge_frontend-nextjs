import { expect, test } from "@playwright/test";

/**
 * Smoke test de la estrategia HU-03: la vista inicial carga y responde 200.
 * Los flujos funcionales (alta/baja/filtro) llegan en HU-20 sobre esta base.
 */
test("carga inicial de la vista", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.locator("main")).toBeVisible();
});
