import { expect, test } from "@playwright/test";

test("filtre l'accueil puis ouvre une fiche", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Le vocabulaire du code assisté par IA/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Le modèle" }),
  ).toBeVisible();

  const search = page.getByRole("searchbox", {
    name: "Chercher dans le dictionnaire",
  });
  await search.fill("token");
  await expect(page).toHaveURL(/q=token/);
  await expect(page.getByText(/notions pour « token »/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Effacer la recherche" })).toBeVisible();

  await page.getByRole("link", { name: "Token", exact: true }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Token" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Copier la page" })).toBeVisible();

  await page
    .getByRole("navigation", { name: "Notions liées" })
    .getByRole("link", { name: "Model", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Model" }),
  ).toBeVisible();
});
