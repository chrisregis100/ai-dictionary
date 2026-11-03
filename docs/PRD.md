# Dev Hero — Document d'exigences produit (PRD)

| Champ | Valeur |
|--------|--------|
| **Version** | 2.0 |
| **Date** | 2026-10-11 |
| **Statut** | Actif — aligné sur le dépôt `ai-dictionary` et les décisions du 2026-10-11 |
| **Langue produit (Phase 1)** | Français (`fr_FR`, voir `lib/site.ts`) |

**Slogan** : Build better software with AI.

## Documents liés

- [SPECS.md](./SPECS.md) — spécifications techniques détaillées
- [BACKLOG.md](./BACKLOG.md) — backlog et priorisation
- [adr/](./adr/) — décisions d'architecture (ADR)
- [README.md](../README.md) — installation et contribution
- [CONTENT.md](../CONTENT.md) — conventions éditoriales du dictionnaire

---

## 1. Présentation

### 1.1 Qu'est-ce que Dev Hero ?

Dev Hero est une plateforme web pour les développeurs qui veulent comprendre, maîtriser et utiliser l'IA dans leur processus de développement. Elle combine ressources éducatives, outils (à terme), formations (présentation et listes d'attente en Phase 1) et, plus tard, des méthodes pour structurer le cycle de développement avec l'IA.

Ce n'est ni une simple bibliothèque d'articles ni une plateforme de cours fermée. L'application est un **dépôt unique** Next.js : le dictionnaire IA n'est pas un site séparé, mais un **module** accessible sous `/dictionnaire` (voir [ADR 0001](./adr/0001-depot-unique-plateforme-dev-hero.md)).

**Conviction** : l'IA accélère le développement logiciel, mais la qualité du résultat dépend toujours de la manière dont le développeur conçoit, structure, vérifie et livre son travail.

### 1.2 Vision

Devenir une référence francophone pour apprendre et appliquer les meilleures pratiques du développement assisté par IA, autour d'un écosystème cohérent : ressources, méthodes de travail avec les agents, outils, formations et, à terme, communauté.

### 1.3 Mission

Donner connaissances, outils et méthodes pour concevoir, développer et livrer de meilleurs logiciels avec l'IA.

### 1.4 Proposition de valeur

Permettre de passer de l'utilisation ponctuelle de l'IA à une maîtrise structurée : comprendre les concepts (dictionnaire), s'informer (blog, catalogue de ressources), découvrir des ressources fiables, préparer l'usage d'outils et de formations lorsqu'ils seront disponibles, et améliorer qualité, maintenabilité et fiabilité par la pratique.

---

## 2. Problème

1. Compréhension fragmentée des concepts liés à l'IA et au développement assisté.
2. Utilisation superficielle de l'IA sans méthode pour planifier, implémenter, tester et vérifier.
3. Workflows avec agents difficiles à structurer et à documenter.
4. Manque de ressources directement applicables, en français clair.
5. Difficulté à progresser de façon méthodique sans parcours ni repères communs.

---

## 3. Public

| Segment | Description |
|---------|-------------|
| 3.1 | Développeurs utilisant Cursor, Claude Code, Codex et outils similaires |
| 3.2 | Étudiants, juniors, autodidactes, profils intermédiaires |
| 3.3 | Seniors, indépendants, leads techniques |
| 3.4 | Petites équipes cherchant des repères partagés |
| 3.5 | Audience internationale à terme ; **Phase 1 : français uniquement** ([ADR 0006](./adr/0006-i18n-differee.md)) |

---

## 4. Principes produit

| # | Principe | Application |
|---|----------|-------------|
| 4.1 | L'ingénierie avant la génération de code | Contenus et outils favorisent spécification, revue et vérification |
| 4.2 | Apprentissage par la pratique | Liens vers dépôts, guides reproductibles, dictionnaire actionnable |
| 4.3 | Indépendance vis-à-vis des fournisseurs d'IA | Objectif d'architecture et de contenu, pas une garantie absolue |
| 4.4 | Transparence | Distinction claire entre **existant**, **liste d'attente** et **à construire** |
| 4.5 | Simplicité | Une application web, pas de microservices au lancement |
| 4.6 | Valeur gratuite avant monétisation | Dictionnaire, blog et ressources de base accessibles sans paiement |

---

## 5. Architecture fonctionnelle — quatre piliers

Organisation **fonctionnelle** (pas quatre applications distinctes). Les contenus catalogués portent un champ `pillar` : `learn` | `build` | `apply` | `connect` (modèle `Resource`, voir section 10).

| Pilier | Rôle | Exemples Phase 1 |
|--------|------|------------------|
| **Learn** | Comprendre et progresser | Dictionnaire (`/dictionnaire`), blog (`/blog`), guides et articles du catalogue `/ressources` |
| **Build** | Produire avec méthode et outils | Page Dev Hero Build (`/outils/dev-hero-build`, **liste d'attente** — produit non disponible), ressources type `workflow`, `depot`, `outil` |
| **Apply** | Mettre en pratique | Tutoriels, démos, retours d'expérience (catalogue et blog) |
| **Connect** | Rester informé et contribuer | Newsletter (`/newsletter`), annonces, liens GitHub (`lib/site.ts`) |

---

## 6. Fonctionnalités

Légende des statuts : **existant** | **à construire** | **liste d'attente**.

### 6.1 Landing (P0)

**Statut** : existant (`app/page.tsx`), **à réaligner** avec la navigation Phase 1 et les quatre piliers.

Exigences : navigation principale, hero, présentation des ressources et des outils, accès newsletter, vision et principes, contenus récents (blog, termes), mise en avant **honnête** de Dev Hero Build (non disponible — liste d'attente uniquement), footer. La page doit rester pertinente même lorsque les offres payantes ou le framework ne sont pas livrés : ne pas présenter le futur comme accessible.

### 6.2 Dictionnaire (AI Dictionary) (P0)

**Statut** : **existant** — module de cette application.

| Route | Statut |
|-------|--------|
| `/dictionnaire` | existant |
| `/dictionnaire/[slug]` | existant |
| `/dictionnaire/recherche` | existant |

Fonctions : liste par sections (`content/curriculum.ts`), fiches Markdown (`content/entries/*.md`), définitions, contexte, exemples, recherche, termes liés, validation Zod au build, OG et JSON-LD (`DefinedTermSet` sur `/dictionnaire`, `DefinedTerm` et `BreadcrumbList` sur `/dictionnaire/[slug]`), scripts `pnpm content:audit` et `pnpm content:upstream`. Redirections : `/notions/:slug` → `/dictionnaire/:slug`, `/recherche` → `/dictionnaire/recherche`.

**Dette connue** : les liens internes des 71 fiches pointent encore vers `/notions/*` ; la taxonomie affichée sur la landing (`components/landing/landing-categories.tsx`) ne reflète pas encore les sept sections du curriculum.

### 6.3 Bibliothèque de ressources (P0)

**Statut** : **à construire** (`/ressources`).

Types supportés (modèle `Resource`) : `article`, `guide`, `tutoriel`, `reference`, `code`, `workflow`, `depot`, `outil`, `formation`. Champs : titre, description, type, pilier, tags, lien (route interne ou URL absolue), statut `available` | `coming-soon`, dates optionnelles, mise en avant.

Exigences : catalogue filtrable (type, pilier, recherche `?q=` via `nuqs`), aucune catégorie vide affichée, pas de page détail dédiée en Phase 1 — chaque entrée mène vers une route interne ou une URL externe. Données : `content/resources.ts` + `lib/resources/schema.ts` ([ADR 0003](./adr/0003-contenus-statiques-types.md)).

### 6.4 Newsletter (P0)

**Statut** : **existant** (`/newsletter`, `actions/newsletter-actions.ts`).

Formulaire : e-mail obligatoire, validation Zod, états chargement / succès / erreur, message de repli si `RESEND_API_KEY` ou `RESEND_AUDIENCE_ID` absents. Inscription via Resend `contacts.create` — **pas de table locale**. Double opt-in : **décision ouverte** ([ADR 0005](./adr/0005-newsletter-et-listes-attente-resend.md)).

Listes d'attente Outils / Formations : audiences Resend distinctes prévues (`RESEND_AUDIENCE_ID_BUILD`, `RESEND_AUDIENCE_ID_FORMATIONS`, repli sur `RESEND_AUDIENCE_ID`) — **à brancher** sur les formulaires des pages concernées.

### 6.5 Dev Hero Build (P1)

**Statut** : **à construire** (présentation + **liste d'attente**). Le framework **n'est pas disponible** sur la plateforme.

Vision produit : orchestration de workflow (Specify → Plan → Approve → Implement → Verify → Review → Deliver), séparation définition / implémentation fournisseur, artefacts consultables, validation humaine — PRD technique distinct à rédiger. MVP site : page produit `/outils/dev-hero-build` sans dashboard web ni promesse de disponibilité immédiate.

### 6.6 Formations (P1)

**Statut** : **à construire**.

| Route | Rôle |
|-------|------|
| `/formations` | Catalogue |
| `/formations/[slug]` | Fiche : programme, niveau, prérequis, prix si connu, `enrollmentUrl` externe ou liste d'attente |

Données : `content/courses.ts` + `lib/courses/schema.ts`. Aucune donnée de paiement stockée dans l'application ; redirection vers inscription externe ou liste d'attente (`status`: `available` | `coming-soon` | `waitlist`).

### 6.7 Articles et tutoriels (P1)

**Statut** : **existant** pour le blog éditorial (`/blog`, `/blog/[slug]`, admin CRUD). Les articles référencés dans le catalogue `/ressources` peuvent pointer vers le blog ou des URLs externes.

Exigences : liste, lecture Markdown, statut brouillon / publié, SEO, contenus associés. **Dette** : le blog n'est pas encore inclus dans le sitemap.

### 6.8 À propos (P0)

**Statut** : existant (`/a-propos`), **à réécrire** autour des quatre piliers et du rôle ressources / outils / formations.

### 6.9 Outils (P1)

**Statut** : **à construire**.

| Route | Rôle |
|-------|------|
| `/outils` | Présentation des outils |
| `/outils/dev-hero-build` | Fiche produit + liste d'attente |

Données outils : `content/tools.ts` + `lib/tools/schema.ts` (modèle `Tool`).

### 6.10 Pages légales (P0)

**Statut** : **à construire** — `/mentions-legales`, `/confidentialite`.

### 6.11 Administration blog (P1)

**Statut** : **existant** — `/admin`, `/admin/articles`, `/admin/articles/nouveau`, `/admin/articles/[id]`, auth Stack `/handler/[...stack]`. **Dette** : pas de rôle admin dédié ; tout utilisateur authentifié accède à l'admin ([ADR 0004](./adr/0004-blog-prisma-neon-stack-auth.md)).

### 6.12 Communauté (P2)

Hors périmètre Phase 1.

---

## 7. Navigation

**Phase 1** (cible : `lib/routes.ts` — **à construire**) :

| Entrée | Contenu |
|--------|---------|
| Accueil | `/` |
| **Ressources** | Dictionnaire, blog, guides (catalogue `/ressources`) |
| **Outils** | `/outils`, Dev Hero Build (liste d'attente) |
| **Formations** | `/formations` (catalogue ; fiches ou liste d'attente) |
| **À propos** | `/a-propos` |
| **Newsletter** | `/newsletter` |

Règles : jamais de page vide sans contenu ni liste d'attente explicite ; responsive desktop, tablette, mobile. Décision : [ADR 0001](./adr/0001-depot-unique-plateforme-dev-hero.md).

---

## 8. Identité et expérience

### 8.1 Direction visuelle

**Statut** : **existant** (refonte « Noir Ciré » en cours).

- **Thème par défaut** : sombre (`html` avec `color-scheme: dark`, classe `.dark`).
- **Thème clair** : disponible via le toggle (`components/theme-toggle.tsx`, clé localStorage `ai-dictionary-theme`).
- **Accent** : `#ff6600` (clair et sombre) ; survol accent sombre `#f97316` / clair `#ea580c`.

Tokens principaux (`app/globals.css`) :

| Token | Clair (`:root`) | Sombre (`.dark`) |
|-------|-----------------|------------------|
| `--background` | `#f4efe8` | `#050505` |
| `--foreground` | `#121214` | `#fafafa` |
| `--accent` | `#ff6600` | `#ff6600` |
| `--card` | `#fffdf8` | `#0d0d10` |
| `--border` | `#d9d0c4` | `#26262c` |

Typographie : Outfit (`--font-outfit`) + mono. Primitives : `components/ui/button.tsx`, `badge.tsx`, `input.tsx`. Utilitaires : `.glass-card`, `.hero-glow`, `.link-underline`. Icônes : `@deemlol/next-icons` uniquement.

Décision : [ADR 0002](./adr/0002-direction-visuelle-dark-first.md).

**Dette** : `viewport.themeColor` clair (`#f7f4ef`) ne correspond pas exactement à `--background` (`#f4efe8`).

### 8.2 Ton éditorial

Technique, clair, professionnel ; inspiré par la lisibilité de références du secteur sans les copier. Pas de promesses marketing sur des produits non livrés.

### 8.3 UX

Comprendre rapidement quoi, pour qui, où apprendre, quels outils (statut réel), comment rester informé. Une action pertinente par section. Accessibilité : HTML sémantique, navigation clavier, labels, contrastes, textes alternatifs, états et erreurs accessibles.

---

## 9. Exigences techniques

### 9.1 Architecture

- Une application web Next.js (App Router), déployée sur Vercel.
- Dev Hero Build pourra exister comme package ou dépôt distinct ; le site ne fait que le présenter et collecter les listes d'attente en Phase 1.
- Pas de Supabase ; pas de middleware global ; pas de MDX (Markdown via `react-markdown`).

### 9.2 Stack (état au 2026-10-11)

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js `16.4.0` (`cacheComponents`, `partialPrefetching`) |
| UI | React `19.3.0`, Tailwind CSS `^4` |
| Données blog | Prisma `^7.10.0`, `@prisma/adapter-neon`, Neon (`@neondatabase/serverless`) |
| Auth admin | `@stackframe/stack` `^2.8.108` |
| Validation | Zod `^4.6.5` |
| URL state | `nuqs` `^2.10.1` |
| E-mail | Resend `^6.32.1` |
| UI primitives | Radix Dialog/Slot, cmdk, CVA, clsx, tailwind-merge |
| Markdown | gray-matter, react-markdown, remark-gfm, rehype-slug, rehype-autolink-headings |
| Icônes | `@deemlol/next-icons` `^0.2.7` |
| Tests | Vitest, Playwright |
| Package manager | pnpm `10.29.3` |

### 9.3 SEO et performance

Titres et métadonnées par page, URLs stables, `app/robots.ts`, `manifest`, OG (racine et fiches dictionnaire), JSON-LD Organization/WebSite, `DefinedTermSet` (`/dictionnaire`), `DefinedTerm` et `BreadcrumbList` (`/dictionnaire/[slug]`). Sitemap partiel (**blog à intégrer**). JS client limité ; pas d'animations lourdes ; images et polices optimisées.

### 9.4 Analytics

Umami (script, variables `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_SCRIPT_URL`). Événements documentés : `search`, `term_click`, `filter_apply`, `outbound_click`, `cta_click`.

### 9.5 Sécurité

Secrets serveur uniquement (`RESEND_API_KEY`, `DATABASE_URL`, `STACK_SECRET_SERVER_KEY`, etc.). Validation Zod sur les Server Actions. Données minimales pour la newsletter. CI : lint → typecheck → test → build → e2e (GitHub Actions).

### 9.6 Variables d'environnement (référence)

`NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`, `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_AUDIENCE_ID_BUILD`, `RESEND_AUDIENCE_ID_FORMATIONS`, `NEXT_PUBLIC_UMAMI_*`.

---

## 10. Modèles de données

### 10.1 Resource (Zod / TypeScript — à construire)

Fichiers cibles : `content/resources.ts`, `lib/resources/schema.ts`.

```text
Resource {
  id, title, slug, description,
  type: "article" | "guide" | "tutoriel" | "reference" | "code" | "workflow" | "depot" | "outil" | "formation",
  pillar: "learn" | "build" | "apply" | "connect",
  tags: string[],
  url: string,  // route interne ou URL absolue
  status: "available" | "coming-soon",
  featured?: boolean,
  publishedAt?, updatedAt?
}
```

### 10.2 Course (Zod / TypeScript — à construire)

Fichiers cibles : `content/courses.ts`, `lib/courses/schema.ts`.

```text
Course {
  id, title, slug, description,
  level: "debutant" | "intermediaire" | "avance",
  prerequisites: string[],
  curriculum: { title, items: string[] }[],
  price?: number,
  currency?: "EUR",
  enrollmentUrl?: string,
  status: "available" | "coming-soon" | "waitlist"
}
```

Aucune donnée de paiement stockée dans l'application.

### 10.3 Tool (Zod / TypeScript — à construire)

Fichiers cibles : `content/tools.ts`, `lib/tools/schema.ts`.

```text
Tool {
  id, name, slug, description,
  status: "available" | "coming-soon" | "waitlist",
  docsUrl?, repoUrl?
}
```

### 10.4 Post (Prisma — existant)

Schéma : `prisma/schema.prisma` — `id`, `slug` (unique), `title`, `excerpt`, `contentMd`, `status` (`DRAFT` | `PUBLISHED`), `publishedAt?`, `createdAt`, `updatedAt`.

### 10.5 Dictionnaire (existant)

Fiches : `content/entries/*.md`. Frontmatter : `term`, `slug`, `section`, `description`, `sourceTerm`, `related`. Sept sections dans `content/curriculum.ts` : `model` (Le modèle), `sessions` (Sessions, fenêtres de contexte et tours), `tools` (Outils et environnement), `failures` (Modes d'échec), `handoffs` (Passations), `memory` (Mémoire et pilotage), `patterns` (Façons de travailler). Environ 71 fiches en SSG.

### 10.6 Newsletter

Pas de modèle en base : contacts gérés par Resend ([ADR 0005](./adr/0005-newsletter-et-listes-attente-resend.md)).

---

## 11. Monétisation

Formations, ateliers, produits numériques, offres outils avancées, licences ou abonnements au framework **si** la valeur est démontrée, prestations — **pas tout au lancement**. Priorité à l'audience et aux contenus gratuits (dictionnaire, blog, catalogue). Phase 1 : présentation et redirection externe ou liste d'attente uniquement.

---

## 12. Roadmap

| Phase | Contenu | Statut indicatif |
|-------|---------|------------------|
| **1 — Fondation** | Landing réalignée, identité, nav (`lib/routes.ts`), dictionnaire intégré, `/ressources`, newsletter, SEO/analytics, pages légales, `/outils` et `/formations` (catalogue + listes d'attente) | en cours |
| **2 — Écosystème ressources** | Enrichissement catalogue, filtres, guides, doc outils, parcours | à venir |
| **3 — Dev Hero Build** | Livraison produit (hors site seul) | à venir |
| **4 — Formations et monétisation** | Parcours commercial, outil de vente (décision ouverte) | à venir |
| **5 — Communauté** | Échanges structurés | à venir |

Les phases 2 à 5 peuvent se chevaucher.

---

## 13. Critères d'acceptation MVP (Phase 1)

**Présentation** : proposition de valeur au premier écran ; sections accessibles ; liens fonctionnels ; mobile et desktop.

**Newsletter** : validation, transmission Resend, erreurs explicites, succès après réponse positive ; consentement affiché ; désinscription côté fournisseur.

**Contenus** : ressources et formations référencées avec métadonnées et statut ; aucun lien vers une page vide ; Dev Hero Build clairement en liste d'attente.

**Technique** : `pnpm build` sans erreur ; CI verte ; secrets hors client ; formulaires robustes ; perf et a11y de base vérifiées ; déploiement Vercel documenté dans README.

**Produit** : distinction nette disponible / futur ; place identifiable pour newsletter, ressources et framework.

---

## 14. Indicateurs

Acquisition (visiteurs, sources), engagement (recherches dictionnaire, clics ressources, blog), conversion (inscriptions newsletter, listes d'attente Build/Formations, confirmations si double opt-in activé), adoption future du framework (doc, installs, contributions).

**Aucune cible chiffrée** dans ce document : les objectifs seront fixés après collecte via Umami et Resend.

---

## 15. Hors périmètre MVP

LMS sur mesure, marketplace de formateurs, réseau social intégré, abonnement complexe, tableau de bord utilisateur, orchestration multi-agents dans le site, compatibilité exhaustive de tous les fournisseurs IA, application mobile native, gamification.

---

## 16. Risques

| Risque | Atténuation |
|--------|-------------|
| Dispersion des priorités | Roadmap par phases, backlog ([BACKLOG.md](./BACKLOG.md)) |
| Ressources limitées | Contenus typés réutilisables, automation (`content:audit`) |
| Dépendance fournisseurs (Resend, Neon, Stack, Vercel) | Documenter exports et variables ; messages de repli |
| Incohérence visuelle ou éditoriale | Design tokens centralisés, ADR, SPECS |
| Décalage promesse / réalité | Statuts `coming-soon` / `waitlist`, pas de page « produit disponible » pour Build |

---

## 17. Décisions

### 17.1 Décisions prises (2026-10-11)

| ID | Sujet | ADR |
|----|--------|-----|
| D1 | Ce dépôt Next.js est la plateforme Dev Hero ; le dictionnaire est le module `/dictionnaire` | [0001](./adr/0001-depot-unique-plateforme-dev-hero.md) |
| D2 | Direction visuelle dark-first, accent `#ff6600`, thème clair au toggle | [0002](./adr/0002-direction-visuelle-dark-first.md) |
| D3 | Navigation Phase 1 : Ressources / Outils / Formations / À propos / Newsletter | [0001](./adr/0001-depot-unique-plateforme-dev-hero.md) |
| D4 | Ressources, formations, guides en fichiers `content/` (TS + Zod) ; Prisma réservé au blog | [0003](./adr/0003-contenus-statiques-types.md) |
| D5 | Blog existant sur Prisma/Neon + Stack Auth | [0004](./adr/0004-blog-prisma-neon-stack-auth.md) |
| D6 | Newsletter et listes d'attente via Resend (audiences distinctes) | [0005](./adr/0005-newsletter-et-listes-attente-resend.md) |
| D7 | i18n différée : français seul ; préparation sans routes `[locale]` | [0006](./adr/0006-i18n-differee.md) |

### 17.2 Décisions encore ouvertes

- **Double opt-in newsletter** : conformité et expérience utilisateur à trancher avant extension RGPD stricte.
- **Domaine public** : `devhero.si` envisagé — non confirmé dans le code (`NEXT_PUBLIC_SITE_URL` / Vercel).
- **Système de vente des formations** : outil externe (Stripe, plateforme tierce, etc.) non choisi.
- **Stratégie open source de Dev Hero Build** : licence, dépôt et calendrier de publication non fixés.

---

## 18. Définition synthétique

Dev Hero est une plateforme qui aide les développeurs à apprendre, à appliquer et à améliorer les pratiques du développement logiciel assisté par l'IA. Elle regroupe un dictionnaire de référence, un blog, un catalogue de ressources, la présentation d'outils et de formations, et une newsletter — avec une feuille de route vers des outils d'orchestration et des parcours formateurs, toujours en distinguant ce qui est disponible de ce qui est en préparation.

**Dev Hero — Build better software with AI.**
