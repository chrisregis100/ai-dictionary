# Dev Hero — Backlog

| Champ | Valeur |
|--------|--------|
| **Version** | 2.0 |
| **Date** | 2026-10-11 |

Documents liés : [PRD.md](./PRD.md), [SPECS.md](./SPECS.md), [adr/README.md](./adr/README.md).

Légende **Statut** : `à faire` | `en cours` | `fait` | `bloqué`

Légende **Priorité** : `P0` (bloquant MVP) | `P1` (Phase 1) | `P2` (Phase 2)

---

## Lot 0 — Correctifs immédiats sur le diff en cours

Exécuter et **committer la refonte visuelle en un commit dédié** avant d'entamer le Lot 1.

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L0-01 | Harmoniser `viewport.themeColor` clair avec `--background` `#f4efe8` | `app/layout.tsx` | P0 | à faire |
| L0-02 | Renommer `THEME_STORAGE_KEY` en `dev-hero-theme` | `lib/theme.ts`, `components/theme-toggle.tsx` (si référence) | P0 | à faire |
| L0-03 | Renommer le package `name` → `dev-hero` | `package.json` | P1 | à faire |
| L0-04 | Ajouter les articles publiés au sitemap | `app/sitemap.ts`, `lib/blog/queries.ts` | P0 | à faire |
| L0-05 | Remplacer la taxonomie inventée de la landing par les 7 sections de `content/curriculum.ts` | `components/landing/landing-categories.tsx`, éventuellement `app/page.tsx` | P0 | à faire |
| L0-06 | Réécrire les liens `/notions/*` dans les fiches vers `/dictionnaire/*` **ou** documenter le maintien de la 301 seule | `content/entries/*.md`, note dans `CONTENT.md` | P1 | à faire |
| L0-07 | Fraunces : `Fraunces144pt-Bold.ttf` est chargée pour les OG (`lib/og/fonts.ts`) ; supprimer les WOFF2 inutilisés (`Fraunces-Variable.woff2`, `Fraunces-Variable-Italic.woff2`) et mettre à jour `assets/fonts/README.md` **ou** décider de retirer Fraunces des images OG (passer aux titres Outfit uniquement) | `assets/fonts/README.md`, `assets/fonts/Fraunces-Variable*.woff2`, `lib/og/fonts.ts` | P2 | à faire |
| L0-08 | Corriger `components/dictionary-hero.tsx` : `SOURCE_GLOSSARY_URL` et le libellé affiché pointent vers `chrisregis100/ai-dictionary` au lieu du glossaire source `mattpocock/dictionary-of-ai-coding` ; utiliser `siteConfig.upstreamUrl` pour le glossaire et `siteConfig.githubUrl` pour ce dépôt, sans URL en dur | `components/dictionary-hero.tsx` | P1 | à faire |
| L0-09 | Vérifier `filter_apply` : brancher sur filtres ressources ou supprimer l'export mort | `lib/analytics.ts`, futur `components/resources/resource-browser.tsx` | P2 | à faire |
| L0-10 | Commit dédié : refonte visuelle « Noir Ciré » / branding Dev Hero | ensemble du diff en cours | P0 | à faire |

---

## Lot 1 — Phase 1 Fondation

Ordre d'implémentation recommandé (chaque ligne dépend des précédentes dans son groupe).

### 1. Routes et navigation

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-01 | Créer `routes`, `mainNav`, types `satisfies` | `lib/routes.ts`, `lib/routes.test.ts` | P0 | à faire |
| L1-02 | Brancher header sur `mainNav` | `components/site-header.tsx` | P0 | à faire |
| L1-03 | Brancher mobile nav sur `mainNav` | `components/mobile-nav.tsx` | P0 | à faire |
| L1-04 | Refondre footer (Ressources / Plateforme / Légal) | `components/site-footer.tsx` | P0 | à faire |

### 2. Schémas Zod et contenus statiques

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-05 | Schéma `Resource` | `lib/resources/schema.ts`, `lib/resources/schema.test.ts` | P0 | à faire |
| L1-06 | Données ressources initiales | `content/resources.ts` | P0 | à faire |
| L1-07 | Schéma `Course` | `lib/courses/schema.ts`, `lib/courses/schema.test.ts` | P0 | à faire |
| L1-08 | Données formations initiales | `content/courses.ts` | P0 | à faire |
| L1-09 | Schéma `Tool` | `lib/tools/schema.ts`, `lib/tools/schema.test.ts` | P0 | à faire |
| L1-10 | Données outils (dont Dev Hero Build `waitlist`) | `content/tools.ts` | P0 | à faire |

### 3. Helpers et ressources dérivées

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-11 | `getResources`, `getFeaturedResources` + fusion dict/blog | `lib/resources/queries.ts` | P0 | à faire |
| L1-12 | `getCourses`, `getCourse` | `lib/courses/queries.ts` | P0 | à faire |
| L1-13 | `getTools` | `lib/tools/queries.ts` | P1 | à faire |

### 4. Pages publiques

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-14 | Catalogue ressources + filtres nuqs | `app/ressources/page.tsx`, `components/resources/resource-browser.tsx` | P0 | à faire |
| L1-15 | Index outils | `app/outils/page.tsx` | P1 | à faire |
| L1-16 | Dev Hero Build (workflow 7 étapes + waitlist) | `app/outils/dev-hero-build/page.tsx` | P1 | à faire |
| L1-17 | Catalogue formations | `app/formations/page.tsx` | P1 | à faire |
| L1-18 | Fiche formation SSG | `app/formations/[slug]/page.tsx` | P1 | à faire |
| L1-19 | Mentions légales | `app/mentions-legales/page.tsx` | P0 | à faire |
| L1-20 | Confidentialité | `app/confidentialite/page.tsx` | P0 | à faire |

### 5. Newsletter et listes d'attente

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-21 | Étendre action : `source`, audiences, honeypot, consentement, doublon | `actions/newsletter-actions.ts`, `lib/newsletter-form-state.ts` | P0 | à faire |
| L1-22 | Mettre à jour formulaires (newsletter, build, formations) | `components/newsletter/newsletter-form.tsx`, formulaires waitlist pages outils/formations | P0 | à faire |
| L1-23 | Documenter variables Resend dans `.env.example` | `.env.example` | P1 | à faire |

### 6. Landing et à propos

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-24 | Landing : piliers, bannière plateforme, Build waitlist | `app/page.tsx`, `components/landing/*.tsx` | P0 | à faire |
| L1-25 | Réécrire à propos (4 piliers) | `app/a-propos/page.tsx` | P0 | à faire |

### 7. SEO, OG, JSON-LD

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-26 | Étendre sitemap (ressources, outils, formations, légales, blog slugs) | `app/sitemap.ts` | P0 | à faire |
| L1-27 | OG images blog et formations | `app/blog/[slug]/opengraph-image.tsx`, `app/formations/[slug]/opengraph-image.tsx` | P1 | à faire |
| L1-28 | JSON-LD : ajouter `ItemList`, `Course`, `Article` ; étendre `BreadcrumbList` (`buildBreadcrumbSchema`) aux nouvelles pages | `lib/seo/structured-data.ts`, pages `/ressources`, `/formations/[slug]`, `/blog/[slug]`, etc. | P1 | à faire |

### 8. Analytics

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-29 | Événements `resource_click`, `waitlist_submit`, `course_click` | `lib/analytics.ts`, composants cartes / formulaires | P1 | à faire |

### 9. UI primitives

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-30 | Composant `card` | `components/ui/card.tsx` | P1 | à faire |
| L1-31 | Checkbox consentement | `components/ui/checkbox.tsx` (ou équivalent) | P0 | à faire |
| L1-32 | Select / segmented filtres | `components/ui/select.tsx` ou variante | P1 | à faire |

### 10. Tests et documentation

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-33 | E2E filtres `/ressources` | `e2e/ressources.spec.ts` (ou chemin existant playwright) | P1 | à faire |
| L1-34 | E2E liste d'attente (mock Resend) | `e2e/waitlist.spec.ts` | P1 | à faire |
| L1-35 | README et renvois CONTENT / SPECS à jour | `README.md`, `CONTENT.md` (si nécessaire) | P0 | à faire |

### 11. Sécurité admin (dette)

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L1-36 | Restreindre `/admin` via `ADMIN_EMAILS` ou rôle Stack | `app/admin/layout.tsx`, `stack.ts`, env | P1 | à faire |

---

## Lot 2 — Phase 2 (aperçu)

| ID | Tâche | Fichiers | Priorité | Statut |
|----|--------|----------|----------|--------|
| L2-01 | Tags, catégories, auteur, image sur `Post` | `prisma/schema.prisma`, migration, `components/admin/article-form.tsx`, `lib/blog/schema.ts` | P2 | à faire |
| L2-02 | Temps de lecture articles | `lib/blog/format.ts`, `app/blog/[slug]/page.tsx` | P2 | à faire |
| L2-03 | `generateStaticParams` pour routes blog | `app/blog/[slug]/page.tsx` | P2 | à faire |
| L2-04 | Coloration syntaxique code blog | dépendance + composant markdown | P2 | à faire |
| L2-05 | Flux RSS blog | `app/feed.xml/route.ts` ou équivalent | P2 | à faire |
| L2-06 | Parcours d'apprentissage (guides enchaînés) | `content/`, `/ressources` ou routes dédiées | P2 | à faire |
| L2-07 | Rôle admin Stack / métadonnées serveur | `stack.ts`, doc ADR 0004 | P2 | à faire |

---

## Décisions ouvertes

| Sujet | Notes |
|-------|--------|
| **Double opt-in** | Conformité RGPD vs friction ; voir [ADR 0005](./adr/0005-newsletter-et-listes-attente-resend.md) |
| **Rate limiting** | Server Action vs edge vs Redis ; voir [SPECS.md §8.4](./SPECS.md#84-décisions-ouvertes) |
| **Domaine `devhero.si`** | Non confirmé ; `NEXT_PUBLIC_SITE_URL` / Vercel |
| **Outil de vente formations** | Stripe, plateforme tierce, autre — non choisi |
| **Open source Dev Hero Build** | Licence, dépôt, calendrier — non fixés |

---

*Backlog aligné sur [SPECS.md](./SPECS.md) et [PRD.md](./PRD.md).*
