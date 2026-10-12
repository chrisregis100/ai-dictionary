# Dev Hero

**Build better software with AI.**

Plateforme francophone pour comprendre, structurer et pratiquer le développement assisté par l'IA : dictionnaire de référence, blog, catalogue de ressources, présentation d'outils et de formations (listes d'attente lorsque le produit n'est pas encore livré).

## Ce que contient ce dépôt

Une application **Next.js** unique qui regroupe :

| Module | Route | Données |
|--------|-------|---------|
| Landing | `/` | Statique + contenus récents |
| Dictionnaire IA | `/dictionnaire`, `/dictionnaire/[slug]`, `/dictionnaire/recherche` | Markdown (`content/entries/`) + Zod |
| Blog | `/blog`, `/blog/[slug]` | Prisma / Neon |
| Newsletter | `/newsletter` | Resend (pas de table locale) |
| Ressources | `/ressources` | *À venir* — `content/resources.ts` |
| Outils | `/outils`, `/outils/dev-hero-build` | *À venir* — `content/tools.ts` (Build = liste d'attente) |
| Formations | `/formations`, `/formations/[slug]` | *À venir* — `content/courses.ts` |
| À propos | `/a-propos` | Statique |
| Pages légales | `/mentions-legales`, `/confidentialite` | *À venir* |
| Administration blog | `/admin/**` | Stack Auth + Prisma |

Redirections permanentes : `/notions/:slug` → `/dictionnaire/:slug`, `/recherche` → `/dictionnaire/recherche`.

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16.4.0 |
| UI | React 19.3.0, Tailwind CSS 4 |
| Blog / admin | Prisma 7, Neon Postgres, Stack Auth |
| Validation | Zod 4 |
| URL (filtres) | nuqs |
| E-mail | Resend |
| Icônes | @deemlol/next-icons |
| Analytics | Umami |
| Tests | Vitest, Playwright |
| Déploiement | Vercel |

Détails et contraintes d'ingénierie : [docs/SPECS.md](./docs/SPECS.md).

## Démarrer

### Prérequis

- Node.js 22 (aligné sur la CI)
- pnpm 10.29.3 (`packageManager` dans `package.json`)

### Installation

```bash
pnpm install
```

### Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (metadata, sitemap, JSON-LD). Vide en local → `http://localhost:3000` |
| `DATABASE_URL` | Postgres Neon — **requise pour le blog et l'admin** |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | Projet Stack Auth (admin) |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Clé publique Stack |
| `STACK_SECRET_SERVER_KEY` | Clé secrète Stack (serveur uniquement) |
| `RESEND_API_KEY` | Clé API Resend, serveur uniquement. Sans elle, le formulaire reste visible et répond que l'inscription est indisponible |
| `RESEND_AUDIENCE_ID` | Audience newsletter (`source=newsletter`). Sans audience résolue, même repli indisponible |
| `RESEND_AUDIENCE_ID_BUILD` | Audience liste d'attente Dev Hero Build. Absente ou vide : repli sur `RESEND_AUDIENCE_ID` |
| `RESEND_AUDIENCE_ID_FORMATIONS` | Audience liste d'attente formations. Absente ou vide : repli sur `RESEND_AUDIENCE_ID` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Site Umami |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | Script Umami (ex. `https://cloud.umami.is/script.js`) |

Le **dictionnaire** ne nécessite pas la base de données : les fiches sont lues depuis le dépôt au build.

La **newsletter** ne stocke rien dans Postgres. Le serveur valide l'e-mail (Zod), exige une case de consentement non pré-cochée, ignore les soumissions dont le champ honeypot `website` est rempli, et limite les tentatives (5 par adresse e-mail, 20 par adresse IP, sur 10 minutes, en mémoire sur chaque instance). Seule l'adresse e-mail est envoyée à Resend (`contacts.create`, audience legacy). Le build, les tests et la navigation fonctionnent sans ces variables : l'inscription affiche alors « L'inscription est momentanément indisponible ».

Le SDK Resend 6 marque `audienceId` comme déprécié au profit des segments, tout en acceptant encore l'appel. Les variables restent des identifiants d'audience. Si le compte Resend n'a plus que des segments, il faudra trancher un nouveau contrat avant de changer le code.

Sans `DATABASE_URL`, la landing et `/blog` affichent l'état vide (aucun article) au lieu d'échouer. L'admin ne peut pas enregistrer d'articles.

Sans `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` et `STACK_SECRET_SERVER_KEY` ensemble, les pages publiques restent servies et `/admin` indique que l'authentification n'est pas configurée. Les variables `NEXT_PUBLIC_*` sont figées au `next build` : les renseigner dans Vercel avant le déploiement de production.

### Base de données (blog)

Avec `DATABASE_URL` configurée :

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

La configuration Prisma est dans `prisma.config.ts` (schéma `prisma/schema.prisma`, client généré dans `lib/generated/prisma`).

### Serveur de développement

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Serveur Next.js en développement |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur après `build` |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest : schéma et curriculum du dictionnaire, recherche, lemme, veille upstream, audit, données structurées, newsletter |
| `pnpm test:e2e` | Playwright (dictionnaire, ancre Dev Hero Build, newsletter sans clé Resend) |
| `pnpm content:upstream` | Compare les noms de fichiers du glossaire source Matt Pocock aux `sourceTerm` |
| `pnpm content:audit` | Audit éditorial déterministe des fiches → `reports/` |

## Structure

```
app/              # Routes App Router (pages, layouts, sitemap)
components/       # UI partagée (header, landing, dictionnaire, blog…)
content/          # curriculum.ts, entries/*.md, (resources, courses, tools)
lib/              # dictionary, blog, seo, analytics, utils…
actions/          # Server Actions (newsletter, articles)
prisma/           # Schéma et migrations blog
docs/             # PRD, SPECS, BACKLOG, ADR
```

## Routes

| Route | Statut |
|-------|--------|
| `/` | Existant |
| `/dictionnaire`, `/dictionnaire/[slug]`, `/dictionnaire/recherche` | Existant |
| `/blog`, `/blog/[slug]` | Existant (BDD requise) |
| `/newsletter`, `/a-propos` | Existant |
| `/ressources` | À venir |
| `/outils`, `/outils/dev-hero-build` | À venir |
| `/formations`, `/formations/[slug]` | À venir |
| `/mentions-legales`, `/confidentialite` | À venir |
| `/admin`, `/admin/articles/**` | Existant (auth Stack) |

Carte complète : [docs/SPECS.md §4](./docs/SPECS.md#4-carte-des-routes).

## Contenu

- **Fiches dictionnaire** : `content/entries/`, ordre des sections dans `content/curriculum.ts`. Règles d'écriture : [CONTENT.md](./CONTENT.md).
- **Ressources, formations, outils** (catalogues typés) : voir [docs/SPECS.md §6](./docs/SPECS.md#6-modèles-de-données).
- **Articles blog** : interface admin après connexion Stack.

## Qualité

La CI GitHub (`.github/workflows/ci.yml`) enchaîne : lint → typecheck → test → installation Playwright (`pnpm exec playwright install --with-deps chromium`) → build → test:e2e, puis `content:upstream` et `content:audit` en avertissement.

En local, avant une PR :

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e
```

## Déploiement

Cible **Vercel** (`vercel.json`) : install pnpm, `pnpm build`.

| Service | Usage |
|---------|--------|
| **Vercel** | Hébergement Next.js |
| **Neon** | Postgres pour `Post` (blog) |
| **Resend** | Newsletter et listes d'attente |
| **Stack** | Authentification admin |
| **Umami** | Analytics respectueux de la vie privée |

Sans `DATABASE_URL`, le dictionnaire, la landing et la newsletter peuvent être prévisualisés ; le blog affiche son état vide. Le blog réel et l'admin nécessitent la base. L'admin nécessite aussi les clés Stack. La newsletter nécessite `RESEND_API_KEY` et `RESEND_AUDIENCE_ID` (les audiences Build et Formations sont facultatives et retombent sur l'audience générale).

## Documentation

| Document | Contenu |
|----------|---------|
| [docs/PRD.md](./docs/PRD.md) | Exigences produit |
| [docs/SPECS.md](./docs/SPECS.md) | Spécifications techniques |
| [docs/BACKLOG.md](./docs/BACKLOG.md) | Backlog Lot 0–2 |
| [docs/adr/README.md](./docs/adr/README.md) | Décisions d'architecture |

## Crédits

- Glossaire source : [Matt Pocock — dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding) (vocabulaire et ordre des termes ; texte des fiches réécrit en français).
- Plateforme et contenus éditoriaux : **Regis Kiki** ([chrisregis100/ai-dictionary](https://github.com/chrisregis100/ai-dictionary)).
- Licence du dépôt : à définir (aucun fichier `LICENSE` à ce jour).
