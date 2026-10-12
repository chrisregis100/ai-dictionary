# ADR 0003 — Contenus ressources, formations et guides en fichiers typés

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

Le dictionnaire est déjà géré en contenu versionné : Markdown sous `content/entries/*.md`, curriculum TypeScript `content/curriculum.ts`, validation au build. Le blog éditorial nécessite un workflow brouillon/publication et une base relationnelle. Ajouter ressources, formations et outils en base multiplierait les migrations et l'admin pour des catalogues majoritairement statiques en Phase 1.

## Décision

- **Ressources**, **formations** et **outils** sont décrits en **fichiers TypeScript** dans `content/`, avec schémas **Zod** dans `lib/` :
  - `content/resources.ts` + `lib/resources/schema.ts` → modèle `Resource`
  - `content/courses.ts` + `lib/courses/schema.ts` → modèle `Course`
  - `content/tools.ts` + `lib/tools/schema.ts` → modèle `Tool`
- **Prisma / Neon** est **réservé au blog** (`Post` dans `prisma/schema.prisma`).
- Le dictionnaire reste sur Markdown + `content/curriculum.ts` (pas de changement de modèle).
- Phase 1 catalogue `/ressources` : pas de page détail dédiée ; chaque `Resource.url` pointe vers une route interne ou une URL externe.

Champs clés `Resource` : `type`, `pillar` (`learn` | `build` | `apply` | `connect`), `tags`, `status` (`available` | `coming-soon`).

Champs clés `Course` : `level`, `prerequisites`, `curriculum`, `enrollmentUrl?`, `status` (`available` | `coming-soon` | `waitlist`) — **aucune donnée de paiement** en base applicative.

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| Tout contenu en Prisma | Sur-administration pour catalogues peu dynamiques |
| CMS headless externe | Coût, latence, hors contrôle git pour Phase 1 |
| MDX pour ressources | Projet exclut MDX ; Markdown réservé au dictionnaire et `contentMd` du blog |

## Conséquences

**Positives**

- Revue de contenu par PR Git ; validation Zod au build.
- Cohérence avec le pattern dictionnaire déjà éprouvé.
- Séparation claire : statique (catalogues) vs dynamique (articles blog).

**Négatives**

- Pas d'interface admin pour le catalogue sans développement dédié.
- Les contributeurs doivent éditer TypeScript (ou scripts générateurs futurs).

**Dettes**

- Fichiers `content/resources.ts`, `content/courses.ts`, `content/tools.ts` et schémas associés **à créer**.
- Page `/ressources` **à construire**.

## Références

- `content/curriculum.ts`, `content/entries/*.md`
- `prisma/schema.prisma` (modèle `Post` uniquement)
- `lib/dictionary.ts` (pattern de chargement existant)
- `docs/PRD.md` (sections 6.3, 6.6, 10)
