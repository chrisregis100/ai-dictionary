import { expect, test } from "@playwright/test";

test("parcourt une notion, cherche, et garde l'état compris", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Le modèle" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Token", exact: true }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Token" }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Notions liées" })
    .getByRole("link", { name: "Model", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Model" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "J'ai compris" }).click();
  await expect(page.getByRole("button", { name: "Compris" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.reload();
  await expect(page.getByRole("button", { name: "Compris" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.goto("/recherche");
  await page
    .getByRole("searchbox", { name: "Rechercher une notion" })
    .fill("cache");
  await expect(page).toHaveURL(/q=cache/);
  await page.getByRole("link", { name: "Prefix cache", exact: true }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "Prefix cache" }),
  ).toBeVisible();
});
