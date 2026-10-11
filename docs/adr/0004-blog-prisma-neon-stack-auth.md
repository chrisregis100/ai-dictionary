# ADR 0004 — Blog sur Prisma/Neon et authentification Stack

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

Le blog et l'interface d'administration des articles existent déjà : modèle `Post`, Server Actions avec `requireUser()`, routes publiques `/blog` et admin sous `/admin/articles`. L'authentification passe par Stack (`@stackframe/stack`) avec handler `/handler/[...stack]`. La base PostgreSQL est hébergée sur Neon via l'adapter Prisma serverless.

## Décision

- **Conserver** la stack actuelle pour le blog :
  - ORM : Prisma `^7.10.0`, client généré dans `lib/generated/prisma`
  - Base : PostgreSQL Neon (`DATABASE_URL`, `@prisma/adapter-neon`, `@neondatabase/serverless`)
  - Auth : Stack (`NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`)
- **Ne pas** migrer le blog vers des fichiers Markdown statiques en Phase 1.
- **Ne pas** introduire Supabase pour ce dépôt.

Modèle `Post` : `id`, `slug` (unique), `title`, `excerpt`, `contentMd`, `status` (`DRAFT` | `PUBLISHED`), `publishedAt?`, `createdAt`, `updatedAt`.

Actions : `actions/articles-actions.ts` (CRUD, revalidation de chemins).

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| Blog en fichiers MD dans `content/` | Perte du workflow brouillon/publié et de l'admin existante |
| Supabase Auth + RLS | Hors stack actuelle ; coût de migration |
| Auth maison | Moins maintenable que Stack déjà intégré |

## Conséquences

**Positives**

- Admin CRUD opérationnel ; contenu dynamique sans redeploy pour chaque article.
- Alignement avec déploiement Vercel et CI existante.

**Négatives**

- Dépendance à Neon et Stack pour l'édition du blog.
- Variable `DATABASE_URL` obligatoire en production.

**Dettes**

- **Pas de rôle admin** : tout utilisateur authentifié via Stack accède à `/admin` ; à durcir (rôles, allowlist, ou claim Stack).
- Blog **absent du sitemap** à ce jour.
- Pas de middleware Next.js pour protéger `/admin` au niveau edge (protection côté actions/pages uniquement).

## Références

- `prisma/schema.prisma`
- `actions/articles-actions.ts`
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- `app/admin/articles/page.tsx`, `app/admin/articles/nouveau/page.tsx`, `app/admin/articles/[id]/page.tsx`
- `app/handler/[...stack]/page.tsx`
- `docs/PRD.md` (sections 6.7, 6.11, 10.4)
