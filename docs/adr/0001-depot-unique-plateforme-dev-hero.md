# ADR 0001 — Dépôt unique pour la plateforme Dev Hero

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

Le projet a démarré comme un dictionnaire du développement assisté par IA (`ai-dictionary`, fork de [dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding)). La vision produit Dev Hero englobe dictionnaire, blog, catalogue de ressources, outils et formations. Maintenir plusieurs sites ou dépôts fragmenterait la navigation, le design system et le déploiement.

## Décision

- Le dépôt Git `ai-dictionary` (package `ai-dictionary` dans `package.json`) **est** la plateforme Dev Hero.
- Le **AI Dictionary** est un **module** de cette application, exposé aux routes `/dictionnaire`, `/dictionnaire/[slug]` et `/dictionnaire/recherche` — pas un produit ou domaine séparé.
- La **navigation Phase 1** est : Ressources (dictionnaire, blog, guides via `/ressources`), Outils (`/outils`, `/outils/dev-hero-build`), Formations (`/formations`), À propos (`/a-propos`), Newsletter (`/newsletter`).
- Une carte unique des routes et libellés de navigation sera centralisée dans `lib/routes.ts` (à créer).

Branding applicatif : `lib/site.ts` (`name: "Dev Hero"`).

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| Site dictionnaire séparé + site Dev Hero | Double maintenance, SEO et identité fragmentés |
| Monorepo multi-apps dès Phase 1 | Complexité prématurée pour une petite équipe |
| Renommer immédiatement le dépôt Git | Reporté ; le nom `ai-dictionary` reste une dette documentée |

## Conséquences

**Positives**

- Un seul déploiement Vercel, une CI, un design system (`app/globals.css`, composants `components/`).
- Le dictionnaire profite du trafic et de la marque Dev Hero.
- Redirections legacy déjà en place (`/notions/:slug`, `/recherche`).

**Négatives**

- Le nom du package et certaines clés (ex. `THEME_STORAGE_KEY = "ai-dictionary-theme"`) ne reflètent pas encore la marque.
- La landing et la page À propos doivent être réalignées sur les quatre piliers et la nav cible.

**Dettes**

- `package.json` : `"name": "ai-dictionary"` (cible `dev-hero`, voir [BACKLOG.md](../BACKLOG.md) L0-03).
- `THEME_STORAGE_KEY` encore `ai-dictionary-theme` (cible `dev-hero-theme`, L0-02).
- `lib/routes.ts` non encore implémenté.

## Références

- `lib/site.ts`
- `app/dictionnaire/page.tsx`, `app/dictionnaire/[slug]/page.tsx`, `app/dictionnaire/recherche/page.tsx`
- `docs/PRD.md` (sections 6.2, 7, 17)
