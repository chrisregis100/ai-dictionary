# Dev Hero — Spécifications techniques

| Champ       | Valeur                                                     |
| ----------- | ---------------------------------------------------------- |
| **Version** | 2.0                                                        |
| **Date**    | 2026-10-11                                                 |
| **Statut**  | Actif — aligné sur le dépôt et les décisions du 2026-10-11 |

## Documents liés

- [PRD.md](./PRD.md) — exigences produit
- [BACKLOG.md](./BACKLOG.md) — backlog et priorisation
- [adr/README.md](./adr/README.md) — index des décisions d'architecture
- [README.md](../README.md) — installation et scripts
- [CONTENT.md](../CONTENT.md) — conventions éditoriales du dictionnaire

---

## 1. Vue d'ensemble et décisions structurantes

Dev Hero est une application Next.js. Elle regroupe le dictionnaire IA (`/dictionnaire`), le blog éditorial (Prisma / Neon), le catalogue de ressources (`/ressources`, Phase 1), la présentation des outils et formations (listes d'attente lorsque le produit n'est pas livré), et la newsletter (Resend). Le français est la seule langue produit en Phase 1.

### Décisions D1–D7 (2026-10-11)

Aligné sur [PRD.md §17.1](./PRD.md#171-décisions-prises-2026-10-11).

| ID  | Sujet                                                                                       | ADR                                                       |
| --- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| D1  | Ce dépôt Next.js est la plateforme Dev Hero ; le dictionnaire est le module `/dictionnaire` | [0001](./adr/0001-depot-unique-plateforme-dev-hero.md)    |
| D2  | Direction visuelle dark-first, accent `#ff6600`, thème clair au toggle                      | [0002](./adr/0002-direction-visuelle-dark-first.md)       |
| D3  | Navigation Phase 1 : Ressources / Outils / Formations / À propos / Newsletter               | [0001](./adr/0001-depot-unique-plateforme-dev-hero.md)    |
| D4  | Ressources, formations, guides en fichiers `content/` (TS + Zod) ; Prisma réservé au blog   | [0003](./adr/0003-contenus-statiques-types.md)            |
| D5  | Blog existant sur Prisma/Neon + Stack Auth                                                  | [0004](./adr/0004-blog-prisma-neon-stack-auth.md)         |
| D6  | Newsletter et listes d'attente via Resend (audiences distinctes)                            | [0005](./adr/0005-newsletter-et-listes-attente-resend.md) |
| D7  | i18n différée : français seul ; préparation sans routes `[locale]`                          | [0006](./adr/0006-i18n-differee.md)                       |

---

## 2. Stack et contraintes d'ingénierie

### 2.1 Versions (état au 2026-10-11)

| Couche          | Technologie                                                                    | Version             |
| --------------- | ------------------------------------------------------------------------------ | ------------------- |
| Framework       | Next.js (`cacheComponents`, `partialPrefetching`)                              | 16.4.0              |
| UI              | React                                                                          | 19.3.0              |
| Styles          | Tailwind CSS (+ `@tailwindcss/turbopack`)                                      | ^4                  |
| ORM / BDD blog  | Prisma, `@prisma/adapter-neon`, `@neondatabase/serverless`                     | ^7.10.0 / ^1.2.0    |
| Auth admin      | `@stackframe/stack`                                                            | ^2.8.108            |
| Validation      | Zod                                                                            | ^4.6.5              |
| État URL        | `nuqs`                                                                         | ^2.10.1             |
| E-mail          | Resend                                                                         | ^6.32.1             |
| Icônes          | `@deemlol/next-icons`                                                          | ^0.2.7              |
| UI              | Radix Dialog/Slot, cmdk, CVA, clsx, tailwind-merge                             | stables             |
| Markdown        | gray-matter, react-markdown, remark-gfm, rehype-slug, rehype-autolink-headings | voir `package.json` |
| Tests           | Vitest, Playwright                                                             | ^5 / ^1.64          |
| Langage         | TypeScript                                                                     | ^5                  |
| Package manager | pnpm                                                                           | 10.29.3             |

Pas de Supabase, pas de middleware global, pas de MDX.

### 2.2 Contraintes obligatoires

| Règle                        | Application                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Server Components par défaut | Pages et layouts en RSC sauf besoin DOM, hooks, Web APIs ou contexte client                                 |
| `'use client'`               | Uniquement sur les composants feuille interactifs                                                           |
| Zod                          | Schéma en entrée de chaque Server Action (`safeParse`, retour d'erreur typé)                                |
| Cache                        | `revalidatePath` ou `revalidateTag` après toute mutation affectant l'UI                                     |
| SEO                          | `generateMetadata()` sur chaque page publique                                                               |
| Icônes                       | `@deemlol/next-icons` seule bibliothèque d'icônes                                                           |
| Classes                      | `cn()` depuis `lib/utils.ts` ; pas de classes Tailwind construites par concaténation de segments dynamiques |
| TypeScript                   | Pas de `as any` ni `@ts-ignore`                                                                             |
| Fichiers composants          | Nommage kebab-case (`site-header.tsx`, `resource-browser.tsx`)                                              |

---

## 3. Arborescence cible du dépôt

Légende : **existant** | **à créer** | **à modifier**

```
app/
  page.tsx                          à modifier   # landing
  layout.tsx                        à modifier   # viewport.themeColor
  globals.css                       existant
  sitemap.ts                        à modifier   # blog, ressources, outils, formations, légales
  robots.ts                         existant
  manifest.ts                       existant
  icon.tsx                          existant
  not-found.tsx                     existant
  ressources/
    page.tsx                        à créer
  dictionnaire/                     existant
  blog/                             existant
  outils/
    page.tsx                        à créer
    dev-hero-build/
      page.tsx                      à créer
  formations/
    page.tsx                        à créer
    [slug]/
      page.tsx                      à créer
  a-propos/
    page.tsx                        à modifier
  newsletter/
    page.tsx                        existant
  mentions-legales/
    page.tsx                        à créer
  confidentialite/
    page.tsx                        à créer
  admin/                            existant
  handler/[...stack]/               existant

components/
  site-header.tsx                   à modifier   # mainNav depuis lib/routes.ts
  site-footer.tsx                   à modifier   # colonnes + légal
  mobile-nav.tsx                    à modifier   # même source que header
  landing/*                         à modifier   # piliers, curriculum, bannière
  resources/
    resource-browser.tsx            à créer      # client feuille, nuqs
  newsletter/newsletter-form.tsx    à modifier   # consentement, source
  ui/button.tsx, badge.tsx, input.tsx   existant
  ui/card.tsx                       à créer
  ui/checkbox.tsx (ou équivalent)   à créer      # consentement
  ui/select.tsx ou segmented        à créer      # filtres ressources
  (autres composants dictionnaire/blog) existant

content/
  curriculum.ts                     existant
  entries/*.md                      existant     # liens /notions/* à corriger ou 301
  resources.ts                      à créer
  courses.ts                        à créer
  tools.ts                          à créer

lib/
  routes.ts                         à créer
  site.ts                           existant
  theme.ts                          à modifier   # dev-hero-theme
  resources/
    schema.ts                       à créer
    queries.ts                      à créer
  courses/
    schema.ts                       à créer
    queries.ts                      à créer
  tools/
    schema.ts                       à créer
    queries.ts                      à créer      # getTools()
  dictionary.ts, validate-dictionary.ts, schema.ts   existant
  blog/                             existant
  analytics.ts                      à modifier   # nouveaux événements
  (db, og, seo, modules, utils)     existant

actions/
  newsletter-actions.ts             à modifier   # source, audiences, honeypot, consentement
  articles-actions.ts               existant

docs/
  PRD.md, SPECS.md, BACKLOG.md, adr/   existant / en cours

prisma/
  schema.prisma                     existant
```

---

## 4. Carte des routes

### Routes publiques

| Route                     | Type (RSC / segment)              | Source de données                         | metadata           | OG                                  | JSON-LD                                     | Statut                       |
| ------------------------- | --------------------------------- | ----------------------------------------- | ------------------ | ----------------------------------- | ------------------------------------------- | ---------------------------- |
| `/`                       | RSC page                          | statique + `getEntries`, blog publié      | `generateMetadata` | racine / partagé                    | Organization, WebSite                       | existant, **à modifier**     |
| `/ressources`             | RSC page + client feuille filtres | `getResources` (+ dérivées dict/blog)     | oui                | à définir                           | `ItemList` (à ajouter)                      | **à créer**                  |
| `/dictionnaire`           | RSC                               | `getEntries`, curriculum                  | oui                | existant                            | `DefinedTermSet` (existant)                 | existant                     |
| `/dictionnaire/[slug]`    | RSC SSG                           | Markdown + validation                     | oui                | `opengraph-image` existant          | `DefinedTerm`, `BreadcrumbList` (existants) | existant                     |
| `/dictionnaire/recherche` | RSC + client (`search-screen`)    | `nuqs` + recherche                        | oui                | —                                   | —                                           | existant                     |
| `/blog`                   | RSC                               | Prisma `Post` PUBLISHED                   | oui                | —                                   | —                                           | existant                     |
| `/blog/[slug]`            | RSC                               | Prisma                                    | oui                | **à ajouter** `opengraph-image.tsx` | `Article` (à créer)                         | existant                     |
| `/outils`                 | RSC                               | `getTools`, `content/tools.ts`            | oui                | —                                   | —                                           | **à créer**                  |
| `/outils/dev-hero-build`  | RSC + formulaire client           | `content/tools.ts`, waitlist              | oui                | —                                   | —                                           | **à créer**, liste d'attente |
| `/formations`             | RSC                               | `getCourses`                              | oui                | —                                   | —                                           | **à créer**                  |
| `/formations/[slug]`      | RSC SSG                           | `getCourse(slug)`, `generateStaticParams` | oui                | **à ajouter** `opengraph-image.tsx` | `Course`                                    | **à créer**                  |
| `/a-propos`               | RSC                               | statique                                  | oui                | —                                   | —                                           | existant, **à modifier**     |
| `/newsletter`             | RSC + form client                 | Server Action Resend                      | oui                | —                                   | —                                           | existant                     |
| `/mentions-legales`       | RSC statique                      | statique                                  | oui                | —                                   | —                                           | **à créer**                  |
| `/confidentialite`        | RSC statique                      | statique                                  | oui                | —                                   | —                                           | **à créer**                  |

Phase 1 : pas de page détail `/ressources/[slug]` ; chaque `Resource.url` pointe vers une route interne ou une URL externe.

### Administration et auth

| Route                     | Type          | Source         | Statut   |
| ------------------------- | ------------- | -------------- | -------- |
| `/admin`                  | RSC           | Stack session  | existant |
| `/admin/articles`         | RSC           | Prisma         | existant |
| `/admin/articles/nouveau` | RSC + form    | Server Actions | existant |
| `/admin/articles/[id]`    | RSC + form    | Prisma         | existant |
| `/handler/[...stack]`     | Stack handler | Stack          | existant |

### Redirections (`next.config.ts`)

| Source           | Destination               | Permanent |
| ---------------- | ------------------------- | --------- |
| `/notions/:slug` | `/dictionnaire/:slug`     | oui       |
| `/recherche`     | `/dictionnaire/recherche` | oui       |

---

## 5. Navigation et `lib/routes.ts`

### 5.1 Objet `routes` (cible)

Fichier **à créer** : `lib/routes.ts`. Chaque entrée expose `href` et `label`. Typage via `satisfies` sur un record readonly.

```typescript
export const routes = {
  home: { href: "/", label: "Accueil" },
  ressources: { href: "/ressources", label: "Ressources" },
  dictionnaire: { href: "/dictionnaire", label: "Dictionnaire" },
  dictionnaireRecherche: {
    href: "/dictionnaire/recherche",
    label: "Recherche",
  },
  blog: { href: "/blog", label: "Blog" },
  outils: { href: "/outils", label: "Outils" },
  devHeroBuild: { href: "/outils/dev-hero-build", label: "Dev Hero Build" },
  formations: { href: "/formations", label: "Formations" },
  aPropos: { href: "/a-propos", label: "À propos" },
  newsletter: { href: "/newsletter", label: "Newsletter" },
  mentionsLegales: { href: "/mentions-legales", label: "Mentions légales" },
  confidentialite: { href: "/confidentialite", label: "Confidentialité" },
} as const satisfies Record<string, { href: string; label: string }>;

export type RouteKey = keyof typeof routes;
```

### 5.2 `mainNav`

Ordre fixe Phase 1 :

1. `routes.ressources`
2. `routes.outils`
3. `routes.formations`
4. `routes.aPropos`
5. `routes.newsletter`

`components/site-header.tsx` et `components/mobile-nav.tsx` consomment `mainNav` dérivé de `routes` (pas de tableaux locaux dupliqués).

### 5.3 Règles

- Aucun lien de navigation vers une route sans contenu ni liste d'attente explicite.
- Le dictionnaire et le blog restent accessibles via `/ressources`, le footer et la recherche (⌘K), pas obligatoirement dans `mainNav`.

### 5.4 Footer (cible)

| Colonne        | Liens typiques                                                      |
| -------------- | ------------------------------------------------------------------- |
| **Ressources** | Dictionnaire, Blog, Catalogue `/ressources`, Recherche dictionnaire |
| **Plateforme** | Outils, Formations, Newsletter, À propos                            |
| **Légal**      | Mentions légales, Confidentialité                                   |

`NewsletterForm` peut rester dans la colonne de marque ; source par défaut `newsletter`.

---

## 6. Modèles de données

### 6.1 Schémas Zod (Zod v4)

#### `lib/resources/schema.ts`

```typescript
import { z } from "zod";

export const resourceTypeSchema = z.enum([
  "article",
  "guide",
  "tutoriel",
  "reference",
  "code",
  "workflow",
  "depot",
  "outil",
  "formation",
]);

export const resourcePillarSchema = z.enum([
  "learn",
  "build",
  "apply",
  "connect",
]);

export const resourceStatusSchema = z.enum(["available", "coming-soon"]);

export const resourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  type: resourceTypeSchema,
  pillar: resourcePillarSchema,
  tags: z.array(z.string()),
  url: z.string().min(1), // route interne (/blog/…) ou URL absolue https://
  status: resourceStatusSchema,
  featured: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const resourcesFileSchema = z.array(resourceSchema);

export type Resource = z.infer<typeof resourceSchema>;
```

Validation au chargement : parser `content/resources.ts` avec `resourcesFileSchema` ; en cas d'échec, lever une erreur au build (même philosophie que `validateDictionary` / tests Vitest).

#### `lib/courses/schema.ts`

```typescript
import { z } from "zod";

export const courseLevelSchema = z.enum([
  "debutant",
  "intermediaire",
  "avance",
]);

export const courseStatusSchema = z.enum([
  "available",
  "coming-soon",
  "waitlist",
]);

export const courseCurriculumBlockSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)),
});

export const courseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  level: courseLevelSchema,
  prerequisites: z.array(z.string()),
  curriculum: z.array(courseCurriculumBlockSchema),
  price: z.number().nonnegative().optional(),
  currency: z.literal("EUR").optional(),
  enrollmentUrl: z.url().optional(),
  status: courseStatusSchema,
});

export const coursesFileSchema = z.array(courseSchema);

export type Course = z.infer<typeof courseSchema>;
```

#### `lib/tools/schema.ts`

```typescript
import { z } from "zod";

export const toolStatusSchema = z.enum([
  "available",
  "coming-soon",
  "waitlist",
]);

export const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  status: toolStatusSchema,
  docsUrl: z.url().optional(),
  repoUrl: z.url().optional(),
});

export const toolsFileSchema = z.array(toolSchema);

export type Tool = z.infer<typeof toolSchema>;
```

### 6.2 Fichiers de contenu

| Fichier                | Rôle                                               | Statut  |
| ---------------------- | -------------------------------------------------- | ------- |
| `content/resources.ts` | Export des ressources statiques + re-export validé | à créer |
| `content/courses.ts`   | Catalogue formations                               | à créer |
| `content/tools.ts`     | Catalogue outils (dont Dev Hero Build)             | à créer |

### 6.3 Helpers (cible)

| Fonction                               | Fichier suggéré            | Comportement                                    |
| -------------------------------------- | -------------------------- | ----------------------------------------------- |
| `getResources({ type?, pillar?, q? })` | `lib/resources/queries.ts` | Filtre sur tableau validé + ressources dérivées |
| `getFeaturedResources()`               | idem                       | `featured === true`, statut `available`         |
| `getCourses()`                         | `lib/courses/queries.ts`   | Toutes les formations validées                  |
| `getCourse(slug)`                      | idem                       | Une formation ou `undefined`                    |
| `getTools()`                           | `lib/tools/queries.ts`     | Tous les outils validés                         |

### 6.4 Ressources dérivées (règle produit)

Pour que `/ressources` ne soit jamais vide :

1. **Dictionnaire** : une `Resource` de type `reference`, pilier `learn`, par section du curriculum (`content/curriculum.ts`, 7 sections : `model`, `sessions`, `tools`, `failures`, `handoffs`, `memory`, `patterns`). `url` = `/dictionnaire` avec ancre ou liste filtrée par section (implémentation au choix, documentée dans le helper).
2. **Blog** : une `Resource` de type `article` par `Post` au statut `PUBLISHED`, `url` = `/blog/[slug]`, pilier `learn` ou `apply` selon taxonomie éditoriale.

Les entrées dérivées sont fusionnées au runtime dans `getResources` (ou matérialisées dans `content/resources.ts` via script — décision d'implémentation ; le comportement observable doit respecter la règle).

### 6.5 `Post` (Prisma — existant)

Modèle `Post` : `id`, `slug` (unique), `title`, `excerpt`, `contentMd`, `status` (`DRAFT` | `PUBLISHED`), `publishedAt?`, `createdAt`, `updatedAt`. Schéma : `prisma/schema.prisma`.

### 6.6 Dictionnaire (existant)

- Fiches : `content/entries/*.md`, frontmatter validé par `entrySchema` (`lib/schema.ts`).
- Sept sections : `content/curriculum.ts` (`model`, `sessions`, `tools`, `failures`, `handoffs`, `memory`, `patterns`).
- Chargement : `lib/dictionary.ts`, validation : `lib/validate-dictionary.ts`, échec build via tests / chargement strict.

---

## 7. Spécification par page (routes publiques)

### `/` — Landing

| Élément                    | Spécification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**               | Proposition de valeur Dev Hero, quatre piliers Learn / Build / Apply / Connect, accès aux modules existants et listes d'attente honnêtes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Sections (ordre)**       | 1) Bannière (message plateforme, pas seulement dictionnaire) — `components/landing/announcement-banner.tsx` **à modifier** ; 2) Hero — `landing-hero.tsx`, `hero-mockup.tsx` ; 3) Quatre piliers (Learn, Build, Apply, Connect) — remplacer ou compléter `landing-paths.tsx` ; 4) **Sept sections curriculum** — remplacer la taxonomie inventée de `landing-categories.tsx` (Prompting, Architecture, Agents, RAG, Evaluation) par les titres réels de `content/curriculum.ts` ; 5) Termes vedettes — `landing-terms.tsx` ; 6) Dev Hero Build — statut **liste d'attente**, lien `/outils/dev-hero-build` ; 7) Articles récents — `landing-posts.tsx` ; 8) CTA newsletter — `landing-cta.tsx`. |
| **Données**                | `getEntries`, posts publiés, `getFeaturedResources` (après Lot 1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **État vide**              | Masquer blocs blog si aucun post publié ; ressources toujours non vides grâce aux dérivées.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **CTA unique par section** | Ex. hero → dictionnaire ou ressources ; Build → liste d'attente.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **metadata**               | Existant dans `app/page.tsx` ou layout ; à aligner sur `siteConfig`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### `/ressources`

| Élément        | Spécification                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Objectif**   | Catalogue filtrable de toutes les ressources (statiques + dérivées).                                                                                                                                         |
| **Sections**   | En-tête + filtres + grille/liste.                                                                                                                                                                            |
| **Composants** | Page RSC `app/ressources/page.tsx` **à créer** ; `components/resources/resource-browser.tsx` **à créer** (`'use client'`, `nuqs` : `type`, `pilier`, `q`) ; cartes réutilisant styles `post-card` / `badge`. |
| **Données**    | `getResources({ type, pillar, q })`.                                                                                                                                                                         |
| **État vide**  | Interdit en production (règle dérivées) ; filtres sans résultat → message « Aucune ressource pour ces critères ».                                                                                            |
| **CTA**        | Chaque carte → `resource.url` ; événement `resource_click`.                                                                                                                                                  |

### `/dictionnaire`, `/dictionnaire/[slug]`, `/dictionnaire/recherche`

Comportement existant conservé. Dette : liens `/notions/*` dans le corps des fiches → `/dictionnaire/*` ou s'appuyer sur la 301 permanente (documenter le choix dans le backlog Lot 0).

### `/blog`, `/blog/[slug]`

Existants. Ajouter au sitemap ; OG image sur `[slug]` Phase 1.

### `/outils`

| Élément        | Spécification                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**   | Présenter les outils de la plateforme et liens docs/repo.                                                                                                                                                                               |
| **Sections**   | Intro + liste `Tool` avec badges de statut.                                                                                                                                                                                             |
| **Composants** | Page **à créer** ; cartes listant chaque `Tool` — en Phase 1, seul le détail `/outils/dev-hero-build` existe ; les autres outils mènent vers `docsUrl` / `repoUrl` ou restent en statut `coming-soon` / `waitlist` sans route `[slug]`. |
| **Données**    | `getTools()`.                                                                                                                                                                                                                           |

### `/outils/dev-hero-build`

| Élément        | Spécification                                                                                                                                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objectif**   | Page produit **sans** promettre la disponibilité du framework.                                                                                                                                                  |
| **Sections**   | 1) Positionnement ; 2) Workflow **Specify → Plan → Approve → Implement → Verify → Review → Deliver** (étapes nommées explicitement) ; 3) Statut `waitlist` ; 4) Formulaire liste d'attente (`source: "build"`). |
| **Composants** | Page RSC + formulaire client (réutiliser pattern `newsletter-form` ou variante).                                                                                                                                |
| **CTA**        | Inscription liste d'attente uniquement.                                                                                                                                                                         |

### `/formations`, `/formations/[slug]`

| Élément                | Spécification                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Objectif**           | Catalogue et fiches programme ; inscription externe ou liste d'attente.                                            |
| **`[slug]`**           | `generateStaticParams` depuis `getCourses()` ; `enrollmentUrl` ou formulaire `source: "formations"` si `waitlist`. |
| **Composants**         | Pages **à créer** ; affichage niveau, prérequis, curriculum, prix optionnel.                                       |
| **metadata / JSON-LD** | `Course` sur la fiche.                                                                                             |

### `/a-propos`

Réécriture autour des quatre piliers, du rôle du dictionnaire, du blog, du catalogue ressources, des outils (Build en attente) et des formations. RSC statique enrichi.

### `/newsletter`

Existant ; étendre formulaire : consentement obligatoire, honeypot, `source` (défaut `newsletter`).

### `/mentions-legales`, `/confidentialite`

RSC statiques, contenu juridique minimal structuré (titres, responsable, hébergeur, données Resend/Umami). `generateMetadata` chacune.

---

## 8. Newsletter et listes d'attente

Fichier : `actions/newsletter-actions.ts` (**à modifier**).

### 8.1 Schéma d'entrée (cible)

```typescript
const subscribeSchema = z.object({
  email: z.string().trim().min(1).email(),
  consent: z.literal("true", { error: "Consentement requis." }),
  source: z.enum(["newsletter", "build", "formations"]),
  website: z.string().max(0).optional(), // honeypot — rejet silencieux ou erreur générique
});
```

### 8.2 Mapping audience Resend

| `source`     | Variable d'environnement        | Repli                |
| ------------ | ------------------------------- | -------------------- |
| `newsletter` | `RESEND_AUDIENCE_ID`            | —                    |
| `build`      | `RESEND_AUDIENCE_ID_BUILD`      | `RESEND_AUDIENCE_ID` |
| `formations` | `RESEND_AUDIENCE_ID_FORMATIONS` | `RESEND_AUDIENCE_ID` |

Variables : `RESEND_API_KEY` (serveur uniquement).

### 8.3 Comportement

- Succès affiché **uniquement** après réponse Resend sans erreur.
- Contact déjà existant (code erreur doublon Resend) → traiter comme **succès** côté UX.
- Pas de table locale ; désinscription gérée côté Resend / lien fournisseur.
- Honeypot : champ caché `website` ; si rempli, ne pas appeler Resend (réponse neutre).

### 8.4 Décisions ouvertes

| Sujet             | Options à trancher                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Double opt-in** | Activation Resend + e-mail de confirmation vs inscription directe (voir ADR 0005).                                                                           |
| **Rate limiting** | Middleware edge, Upstash Redis, limitation par IP dans la Server Action, ou dépendance Vercel Firewall ; documenter le choix avant production à fort trafic. |

---

## 9. Design system

### 9.1 Tokens (`app/globals.css`)

**`:root` (clair)**

| Variable              | Valeur    |
| --------------------- | --------- |
| `--background`        | `#f4efe8` |
| `--foreground`        | `#121214` |
| `--muted`             | `#ebe4db` |
| `--muted-foreground`  | `#5c574f` |
| `--card`              | `#fffdf8` |
| `--card-foreground`   | `#121214` |
| `--surface`           | `#ebe6de` |
| `--border`            | `#d9d0c4` |
| `--accent`            | `#ff6600` |
| `--accent-foreground` | `#ffffff` |
| `--accent-hover`      | `#ea580c` |
| `--destructive`       | `#dc2626` |
| `--ring`              | `#ff6600` |

**`.dark`**

| Variable              | Valeur    |
| --------------------- | --------- |
| `--background`        | `#050505` |
| `--foreground`        | `#fafafa` |
| `--muted`             | `#121216` |
| `--muted-foreground`  | `#a1a1aa` |
| `--card`              | `#0d0d10` |
| `--card-foreground`   | `#fafafa` |
| `--surface`           | `#09090b` |
| `--border`            | `#26262c` |
| `--accent`            | `#ff6600` |
| `--accent-foreground` | `#050505` |
| `--accent-hover`      | `#f97316` |
| `--destructive`       | `#f87171` |
| `--ring`              | `#f97316` |

Polices : Outfit (`--font-outfit`, `assets/fonts/Outfit-Variable.woff2`), mono via `--font-mono`. Thème par défaut : sombre (`lib/theme.ts`, `html` `color-scheme: dark`).

Utilitaires existants : `.glass-card`, `.hero-glow`, `.hero-grid`, `.orange-glow`, `.link-underline`, `.heading-anchor`.

### 9.2 Primitives UI

| Composant                   | Statut                              |
| --------------------------- | ----------------------------------- |
| `components/ui/button.tsx`  | existant (variants CVA)             |
| `components/ui/badge.tsx`   | existant                            |
| `components/ui/input.tsx`   | existant                            |
| `components/ui/card.tsx`    | à créer                             |
| Checkbox / consentement     | à créer (Radix ou natif accessible) |
| Select ou segmented control | à créer (filtres `/ressources`)     |

### 9.3 Accessibilité

- Focus visible sur liens et contrôles interactifs.
- Labels associés aux champs formulaire (newsletter, listes d'attente).
- Contrastes : viser WCAG AA ; combinaisons à surveiller :
  - `#ff6600` sur `#050505` (accent sombre) — texte court / UI.
  - `#ff6600` sur `#f4efe8` (fond clair) — **le contraste du texte orange sur fond clair doit être vérifié** ; l'orange est réservé aux surfaces, bordures et accents, pas au corps de texte long sur fond clair.

---

## 10. SEO et partage

| Exigence              | Détail                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sitemap**           | Inclure `/`, dictionnaire, blog (liste + slugs publiés), `/ressources`, `/outils`, `/formations` (+ slugs), `/newsletter`, `/a-propos`, légales                                                                                                                                                                                                                               |
| **Canoniques**        | `alternates.canonical` par page publique                                                                                                                                                                                                                                                                                                                                      |
| **OG**                | Racine et dictionnaire existants ; ajouter `app/blog/[slug]/opengraph-image.tsx`, `app/formations/[slug]/opengraph-image.tsx`                                                                                                                                                                                                                                                 |
| **JSON-LD**           | Existant : `DefinedTermSet` (`/dictionnaire`), `DefinedTerm` + `BreadcrumbList` (`/dictionnaire/[slug]`, `lib/seo/structured-data.ts`, `buildBreadcrumbSchema`). À ajouter : `ItemList` (`/ressources`), `Course` (`/formations/[slug]`), `Article` (`/blog/[slug]`). Étendre `BreadcrumbList` aux nouvelles pages profondes (ressources, outils, formations, blog, légales). |
| **robots / manifest** | `app/robots.ts` (robots), `app/manifest.ts` (manifest)                                                                                                                                                                                                                                                                                                                        |

---

## 11. Analytics (Umami)

Fichier : `lib/analytics.ts`, chargement : `components/analytics/umami-analytics.tsx`.

Variables : `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_SCRIPT_URL`.

| Événement         | Statut                 | Contexte                                                                        |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------- |
| `search`          | existant               | Recherche dictionnaire                                                          |
| `term_click`      | existant               | Clic fiche                                                                      |
| `filter_apply`    | existant (non branché) | À utiliser sur filtres ressources ou retirer si redondant avec `resource_click` |
| `outbound_click`  | existant               | Liens externes                                                                  |
| `cta_click`       | existant               | CTA landing                                                                     |
| `resource_click`  | **à ajouter**          | `slug` ou `id`, `type`                                                          |
| `waitlist_submit` | **à ajouter**          | `source`: `build` \| `formations` \| `newsletter`                               |
| `course_click`    | **à ajouter**          | `slug` formation                                                                |

---

## 12. i18n-readiness (ADR 0006)

- Langue HTML : `lang="fr"` (`app/layout.tsx`).
- `siteConfig.locale` : `"fr_FR"` (`lib/site.ts`).
- Chaînes UI partagées : migrer vers `lib/routes.ts` (labels), conserver descriptions longues dans `siteConfig` et contenus `content/*`.
- Pas de bibliothèque i18n en Phase 1 ; prévoir clés stables pour une future couche `[locale]`.

---

## 13. Qualité et CI

### 13.1 Pipeline (`.github/workflows/ci.yml`)

Ordre : `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` → `pnpm exec playwright install --with-deps chromium` → `pnpm build` → `pnpm test:e2e` ; `content:upstream` et `content:audit` en avertissement (`continue-on-error: true`).

### 13.2 Tests à ajouter (Phase 1)

| Domaine                           | Fichier suggéré                      |
| --------------------------------- | ------------------------------------ |
| Schémas resources/courses/tools   | `lib/resources/schema.test.ts`, etc. |
| `lib/routes.ts`                   | `lib/routes.test.ts`                 |
| E2E filtres `/ressources`         | `e2e/ressources.spec.ts`             |
| E2E liste d'attente (mock Resend) | `e2e/waitlist.spec.ts`               |

### 13.3 Checklist « done » (extrait)

- [ ] `pnpm lint`, `typecheck`, `test`, `build`, `test:e2e` verts
- [ ] Server Actions avec Zod ; `revalidatePath` après mutations blog
- [ ] `generateMetadata` sur chaque route publique Phase 1
- [ ] `'use client'` uniquement sur feuilles
- [ ] Aucun secret `NEXT_PUBLIC_*` hors clés Stack/Umami/site URL
- [ ] Pas de `console.log` de debug
- [ ] Cross-links docs à jour (README, PRD, SPECS, BACKLOG)

---

## 14. Sécurité

| Mesure          | Détail                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Secrets serveur | `RESEND_API_KEY`, `DATABASE_URL`, `STACK_SECRET_SERVER_KEY` — jamais exposés au client                                                 |
| Admin           | Stack Auth sur `/admin` ; **dette** : pas de rôle admin — proposer garde via liste `ADMIN_EMAILS` (env) ou `serverMetadata.role` Stack |
| Validation      | Zod sur toutes les Server Actions                                                                                                      |
| Données perso   | Newsletter uniquement chez Resend ; pas de stockage local e-mail                                                                       |
| Dépendances     | CI build + audits manuels périodiques                                                                                                  |

---

## 15. Critères d'acceptation Phase 1 (vérifiables par route)

Reprennent [PRD.md §13](./PRD.md#13-critères-dacceptation-mvp-phase-1).

| Route / domaine                         | Critère vérifiable                                                                                                                                                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                     | Proposition de valeur visible sans scroll excessif ; quatre piliers nommés ; Dev Hero Build affiché en liste d'attente ; sept sections curriculum (pas l'ancienne taxonomie) ; liens header/footer fonctionnels |
| `mainNav`                               | Entrées Ressources, Outils, Formations, À propos, Newsletter — aucune 404 vide                                                                                                                                  |
| `/ressources`                           | Filtres `type`, `pilier`, `q` (nuqs) ; au moins une ressource sans filtre ; clic sortant tracké                                                                                                                 |
| `/dictionnaire/*`                       | Inchangé fonctionnellement ; build + tests dictionnaire verts                                                                                                                                                   |
| `/blog`                                 | Liste posts publiés ; slugs dans sitemap                                                                                                                                                                        |
| `/outils`, `/outils/dev-hero-build`     | Build en `waitlist` ; workflow en 7 étapes nommé ; formulaire `source: build`                                                                                                                                   |
| `/formations`, `/formations/[slug]`     | `generateStaticParams` ; statut visible ; CTA inscription ou waitlist                                                                                                                                           |
| `/newsletter`                           | Consentement + Resend ; succès seulement après OK API ; doublon = succès                                                                                                                                        |
| `/mentions-legales`, `/confidentialite` | Contenu statique accessible                                                                                                                                                                                     |
| `/a-propos`                             | Quatre piliers et périmètre plateforme                                                                                                                                                                          |
| **Global**                              | `pnpm build` OK ; CI verte ; distinction visuelle `available` / `coming-soon` / `waitlist`                                                                                                                      |
| **SEO**                                 | Sitemap complet Phase 1 ; canoniques ; JSON-LD cibles présents                                                                                                                                                  |

---

## 16. Hors périmètre et décisions ouvertes

### Hors périmètre Phase 1

LMS intégré, marketplace formateurs, réseau social, abonnements complexes, dashboard utilisateur, orchestration multi-agents dans le site, app mobile native, gamification, livraison du framework Dev Hero Build dans ce dépôt.

### Décisions ouvertes

- Double opt-in newsletter (§8.4).
- Rate limiting inscriptions (§8.4).
- Domaine public (`devhero.si` non confirmé dans le code).
- Outil de vente des formations (externe non choisi).
- Licence et calendrier open source Dev Hero Build.
- Correction corps des fiches `/notions/*` vs redirection 301 seule.

---

_Dev Hero — Build better software with AI._
