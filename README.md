# Dictionnaire d'IA coding

Vocabulaire du codage avec l'IA, en français. Les termes restent en anglais (`Token`, `Harness`, `Prefix cache`). Les explications sont une réécriture originale, dans l'ordre du glossaire de [Matt Pocock](https://github.com/mattpocock/dictionary-of-ai-coding). Le texte source n'est pas recopié.

## Lancer

```bash
pnpm install
pnpm dev
```

Le dictionnaire est sur `/`. Une fiche est sur `/notions/token`. La recherche partageable est sur `/recherche?q=cache`, et l'accueil filtre aussi via `/?q=`.

## Contenu

Les fiches vivent dans `content/entries`. L'ordre des sections est dans `content/curriculum.ts`. Les règles d'écriture sont dans `CONTENT.md`.

```bash
pnpm content:upstream
```

Ce script compare les noms de fichiers du glossaire source aux champs `sourceTerm`. Il signale les ajouts, retraits et renommages possibles. Il ne télécharge pas le corps des fiches. En CI, un écart est un avertissement : il ne bloque pas le déploiement.

```bash
pnpm content:audit
```

Audit éditorial **déterministe** : pas d’appel réseau, pas d’IA. Il lit les fiches dans `content/entries`, applique des règles heuristiques (`lib/audit/`) et **ne modifie aucun fichier**. Les rapports vont dans `reports/` (`content-audit.json`, `content-audit.md`), dossier ignoré par Git.

Les résultats orientent une **revue humaine** ; ils ne remplacent pas le jugement éditorial. Interprétation des findings, file de revue et limites de l’outil : voir [CONTENT.md](./CONTENT.md#audit-éditorial).

L’audit n’est pas encore un **contrôle bloquant** en intégration continue : lancez-le en local avant une passe éditoriale.

## Vérifier

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm test` valide le schéma, les slugs, les liens et le curriculum. `pnpm test:e2e` ouvre l'accueil, filtre le dictionnaire, ouvre une fiche, puis suit une notion liée.

## Déployer

Le projet est prévu pour Vercel (`vercel.json`). Branche le dépôt : Vercel détecte Next.js, installe avec pnpm et lance `pnpm build`. Pas de base de données.
