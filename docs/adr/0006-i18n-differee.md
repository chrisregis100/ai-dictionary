# ADR 0006 — Internationalisation différée (français seul en Phase 1)

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

Le PRD source fourni par le propriétaire (non versionné dans le dépôt) prévoyait une ouverture internationale avec le français en tête. Implémenter dès Phase 1 des routes `[locale]`, des catalogues de traductions et du contenu multilingue pour le dictionnaire (71 fiches), le blog et les futurs catalogues alourdirait le dépôt sans demande utilisateur mesurée. `lib/site.ts` fixe déjà `locale: "fr_FR"`.

## Décision

- **Phase 1** : interface et contenus produit en **français uniquement**.
- **Préparation** sans refonte i18n complète :
  - Centraliser les **chaînes UI partagées** (éviter le français dispersé en dur dans des dizaines de composants sans fichier commun — fichier ou module cible à définir dans SPECS/BACKLOG).
  - Déclarer **toutes les routes publiques et libellés de navigation** dans `lib/routes.ts` (à créer), source unique pour la nav et les liens internes.
- **Ne pas** introduire de segment de route `[locale]` ni de middleware de détection de langue **avant une demande produit explicite** et un plan de traduction du contenu (fiches MD, articles blog, catalogues TS).
- Le dictionnaire conserve les champs `sourceTerm` en anglais dans le frontmatter lorsque pertinent ; l'UI reste en français.

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| `next-intl` + `[locale]` dès Phase 1 | Coût élevé ; contenu FR incomplet sur nouvelles sections |
| Anglais par défaut | Public cible francophone ; `siteConfig` déjà FR |
| Duplication de sites par langue | Contraire à ADR 0001 (plateforme unique) |

## Conséquences

**Positives**

- Livraison plus rapide des pages `/ressources`, `/outils`, `/formations`.
- `lib/routes.ts` facilitera une migration future vers `[locale]` (préfixe ou domaine).

**Négatives**

- Dette de chaînes encore éparpillées jusqu'à centralisation effective.
- SEO international limité au `fr_FR` et hreflang non prioritaire.

**Dettes**

- Créer `lib/routes.ts` et y migrer la navigation (`components/site-header.tsx`, etc.).
- Auditer et extraire les chaînes UI lors d'une phase i18n.
- Pas de date fixée pour l'ouverture EN ou autres langues.

## Références

- `lib/site.ts` (`locale: "fr_FR"`)
- `lib/routes.ts` (fichier cible, non présent au 2026-10-11)
- `components/site-header.tsx`, `components/mobile-nav.tsx`
- `docs/PRD.md` (sections 3.5, 9, 17)
