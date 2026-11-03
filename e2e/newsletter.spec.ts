import { expect, test } from "@playwright/test";

test("la section Dev Hero Build est accessible depuis l'accueil", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Découvrir Dev Hero Build" }).first().click();
  await expect(page).toHaveURL(/#dev-hero-build$/);
  await expect(
    page.getByRole("heading", { name: "Une Software Factory méthodique." }),
  ).toBeVisible();
});

test("la newsletter exige un consentement et reste indisponible sans fournisseur", async ({
  page,
}) => {
  await page.goto("/newsletter");
  const main = page.getByRole("main");
  const consent = main.getByRole("checkbox");

  await expect(
    page.getByRole("heading", { level: 1, name: "Reste à jour, en français." }),
  ).toBeVisible();
  await expect(consent).not.toBeChecked();
  await expect(consent).toHaveJSProperty("defaultChecked", false);
  await expect(main.getByText(/Seule ton adresse e-mail est enregistrée/)).toBeVisible();
  await expect(main.getByText(/lien en bas de chaque e-mail/)).toBeVisible();

  await main.getByLabel("Adresse e-mail").fill("ada@example.com");
  await main.getByRole("button", { name: "S'inscrire" }).click();
  await expect(consent).not.toBeChecked();
  await expect(main.getByRole("status")).toHaveText("");

  await consent.check();
  await main.getByRole("button", { name: "S'inscrire" }).click();
  await expect(main.getByRole("status")).toHaveText(
    "L'inscription est momentanément indisponible. Réessaie plus tard.",
  );
});
