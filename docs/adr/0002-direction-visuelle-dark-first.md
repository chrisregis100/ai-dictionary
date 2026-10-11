# ADR 0002 — Direction visuelle « Noir Ciré » (dark-first)

| Champ | Valeur |
|--------|--------|
| **Statut** | Acceptée |
| **Date** | 2026-10-11 |

## Contexte

Une première direction produit mentionnait une palette claire dominante (orange `#F97316`, fond `#F9FAFB`) dans un PRD source fourni par le propriétaire (non versionné dans le dépôt). Une refonte « Noir Ciré » est en cours dans le code : fond sombre par défaut, accent orange vif, thème clair optionnel. La documentation produit doit refléter l'implémentation réelle, pas l'ancienne maquette.

## Décision

- **Thème par défaut** : mode sombre (`.dark` sur `html`, `color-scheme: dark` dans `app/globals.css`).
- **Thème clair** : disponible via `components/theme-toggle.tsx` ; persistance `localStorage` avec la clé `ai-dictionary-theme`.
- **Couleur d'accent** : `#ff6600` (`--accent`) en clair et sombre ; survol `--accent-hover` : `#ea580c` (clair), `#f97316` (sombre).
- **Typographie** : Outfit en police principale (`--font-outfit`) ; Fraunces conservée uniquement pour les titres des images OG via `lib/og/fonts.ts` (`Fraunces144pt-Bold.ttf`) ; monospace système pour le code.
- **Composants UI** : primitives dans `components/ui/` (boutons : default, quiet, sage, outline, ghost, link ; badges accent/muted).
- **Icônes** : uniquement `@deemlol/next-icons` (convention projet).

Tokens de fond (extrait) :

| Mode | `--background` | `--foreground` | `--card` |
|------|----------------|----------------|----------|
| Clair (`:root`) | `#f4efe8` | `#121214` | `#fffdf8` |
| Sombre (`.dark`) | `#050505` | `#fafafa` | `#0d0d10` |

## Alternatives envisagées

| Alternative | Raison d'écart |
|-------------|----------------|
| Revenir à la palette claire #F97316 / #F9FAFB du PRD source non versionné | Incohérent avec la refonte déjà intégrée |
| Thème système uniquement sans toggle | Moins de contrôle éditorial sur l'identité « Noir Ciré » |
| Bibliothèque d'icônes tierce (Lucide, etc.) | Règle projet : `@deemlol/next-icons` seulement |

## Conséquences

**Positives**

- Identité distinctive, lisibilité du contenu technique en dark.
- Tokens centralisés dans `app/globals.css` ; utilitaires `.glass-card`, `.hero-glow`, `.link-underline`.

**Négatives**

- Vérifier les contrastes sur tous les états (focus, erreurs formulaires).
- Aligner les métadonnées navigateur avec les tokens (voir dette).

**Dettes**

- `viewport.themeColor` clair `#f7f4ef` ≠ `--background` `#f4efe8`.
- Fichiers `Fraunces-Variable.woff2` et `Fraunces-Variable-Italic.woff2` présents mais non utilisés (seul `Fraunces144pt-Bold.ttf` charge les OG).
- Sections landing (`components/landing/landing-categories.tsx`) encore déconnectées du curriculum réel.

## Références

- `app/globals.css`
- `components/theme-toggle.tsx`
- `components/ui/button.tsx`, `components/ui/badge.tsx`, `components/ui/input.tsx`
- `docs/PRD.md` (section 8.1)
