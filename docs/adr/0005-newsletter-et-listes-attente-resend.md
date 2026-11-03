# ADR 0005 — Newsletter et listes d'attente via Resend

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

La newsletter est un pilier Phase 1 (Connect). Il ne faut pas stocker les abonnés dans PostgreSQL : peu de logique métier locale, besoin d'outil d'envoi et de gestion des désinscriptions. Resend est déjà intégré pour la page `/newsletter`. Les pages Outils (Dev Hero Build) et Formations devront collecter des e-mails de **liste d'attente** vers des audiences distinctes.

## Décision

- **Inscription newsletter générale** : Server Action `subscribeToNewsletter` dans `actions/newsletter-actions.ts` — validation Zod de l'e-mail, appel `resend.contacts.create` avec `audienceId` issu de `RESEND_AUDIENCE_ID`.
- **Secrets** : `RESEND_API_KEY` et audiences **uniquement côté serveur** ; jamais exposés au client.
- **Pas de table locale** pour les abonnés.
- **Listes d'attente** (cible Phase 1) :
  - Outils / Dev Hero Build → audience `RESEND_AUDIENCE_ID_BUILD`
  - Formations → audience `RESEND_AUDIENCE_ID_FORMATIONS`
  - Si une variable d'audience spécifique est absente, **repli** sur `RESEND_AUDIENCE_ID`.
- **Comportement actuel** (2026-10-11) : seule la newsletter générale est branchée sur `RESEND_AUDIENCE_ID` ; les formulaires Build/Formations **à implémenter** avec les audiences dédiées.
- **Double opt-in** : **non implémenté** ; décision produit **ouverte** (voir PRD section 17.2).

En cas d'absence de clés Resend, l'action retourne un message d'indisponibilité sans simuler un succès.

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| Table `Subscriber` en Prisma | Duplication avec Resend ; désinscription et campagnes plus lourdes |
| Un seul audience pour tout | Moins de segmentation pour Build vs Formations |
| Double opt-in obligatoire dès jour 1 | Non tranché ; impact légal et UX à évaluer |

## Conséquences

**Positives**

- Données minimales côté application ; export et campagnes via Resend.
- Pattern Server Action + Zod cohérent avec le reste du projet.

**Négatives**

- Dépendance forte à Resend et à la configuration des audiences dans leur dashboard.
- Gestion des doublons et erreurs déléguée à l'API Resend (messages utilisateur génériques).

**Dettes**

- Brancher les listes d'attente `/outils/dev-hero-build` et `/formations/[slug]` sur `RESEND_AUDIENCE_ID_BUILD` et `RESEND_AUDIENCE_ID_FORMATIONS`.
- Trancher le **double opt-in** et adapter le message de succès (« Vérifie ta boîte mail » vs confirmation réelle).
- Documenter le flux de désinscription (lien Resend / page dédiée).

## Références

- `actions/newsletter-actions.ts`
- `app/newsletter/page.tsx`
- `components/newsletter/newsletter-form.tsx`
- `lib/newsletter-form-state.ts` (type d'état formulaire)
- Variables : `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_AUDIENCE_ID_BUILD`, `RESEND_AUDIENCE_ID_FORMATIONS`
- `docs/PRD.md` (sections 6.4, 10.6, 17)
