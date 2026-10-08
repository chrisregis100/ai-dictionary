# Dictionnaire d'IA coding

Vocabulaire du codage avec l'IA, en français. Les termes restent en anglais (`Token`, `Harness`, `Prefix cache`). Les explications sont une réécriture originale, dans l'ordre du glossaire de [Matt Pocock](https://github.com/mattpocock/dictionary-of-ai-coding). Le texte source n'est pas recopié.

## Lancer

```bash
pnpm install
pnpm dev
```

Le parcours est sur `/`. Une fiche est sur `/notions/token`. La recherche partageable est sur `/recherche?q=cache`.

## Contenu

Les fiches vivent dans `content/entries`. L'ordre des sections est dans `content/curriculum.ts`. Les règles d'écriture sont dans `CONTENT.md`.

```bash
pnpm content:upstream
```

Ce script compare les noms de fichiers du glossaire source aux champs `sourceTerm`. Il signale les ajouts, retraits et renommages possibles. Il ne télécharge pas le corps des fiches. En CI, un écart est un avertissement : il ne bloque pas le déploiement.

## Vérifier

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm test` valide le schéma, les slugs, les liens et le curriculum. `pnpm test:e2e` ouvre le parcours, suit une notion liée, cherche un terme, puis vérifie que « compris » survit au rechargement.

## Déployer

Le projet est prévu pour Vercel (`vercel.json`). Branche le dépôt : Vercel détecte Next.js, installe avec pnpm et lance `pnpm build`. Pas de base de données. La progression « compris » reste dans le navigateur.
