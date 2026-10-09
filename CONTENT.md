# Écrire une fiche

Le site affiche des explications françaises originales. Le dépôt [dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding) sert de liste de notions et d'ordre pédagogique. On ne recopie pas son texte.

## Fichier

Une fiche est un Markdown dans `content/entries/<slug>.md`.

```yaml
---
term: Token
slug: token
section: model
description: Une phrase française de 140 caractères maximum.
sourceTerm: Token
related:
  - model
---
```

- `term` reste le libellé anglais, affiché tel quel.
- `slug` est le nom du fichier, en minuscules et tirets.
- `section` est l'identifiant du curriculum (`model`, `sessions`, `tools`, `failures`, `handoffs`, `memory`, `patterns`).
- `description` tient en 140 caractères. Elle sert la carte du sentier et la recherche.
- `sourceTerm` est le nom du fichier upstream, sans `.md`, pour la veille.
- `related` liste des slugs qui existent déjà.

Ajoute le slug dans `content/curriculum.ts`, dans la section qui lui correspond. Une fiche hors curriculum, ou un slug du curriculum sans fichier, fait échouer les tests.

## Corps

Écris en français simple. La première phrase d'un paragraphe dit la chose, sans formule d'accroche.

Couvre, dans cet ordre quand la notion s'y prête :

1. Ce que le mot désigne.
2. Le mécanisme.
3. Le symptôme qu'on a déjà rencontré, s'il y en a un vrai.
4. Quoi faire.
5. Un tableau si la matière se compare (niveaux, phases, avant / après).
6. `## À éviter` : les formulations qui brouillent le diagnostic.
7. `## En situation` : un court échange, deux répliques.

Pas de remplissage pour atteindre une longueur. Pas de superlatif, pas de promesse.

Le terme anglais s'écrit comme dans `term`. Le premier passage dans la fiche peut pointer vers `/notions/<slug>` si la cible existe. Les passages suivants restent du texte, sans second lien vers la même cible.

## Veille

`pnpm content:upstream` compare les noms de fichiers du glossaire source aux `sourceTerm` locaux. Il signale les ajouts, les retraits et les renommages possibles. Il ne récupère pas le corps des fiches.

## Audit éditorial

`pnpm content:audit` parcourt toutes les fiches chargées comme sur le site (même source que les tests de schéma). L’outil est entièrement local : aucune requête HTTP, aucun modèle de langage. Il ne réécrit pas le Markdown ; il produit seulement des rapports dans `reports/`, répertoire listé dans `.gitignore`.

### Rapports générés

| Fichier | Usage |
| --- | --- |
| `reports/content-audit.json` | Données structurées : chaque fiche, ses findings, son score, le drapeau `requiresHumanReview`. |
| `reports/content-audit.md` | Lecture humaine : tableau par section du curriculum, puis la **file de revue**. |

Le Markdown résume par section le nombre de fiches, de findings, de fiches à revoir et le score moyen (0–100).

### File de revue

La file liste les fiches où `requiresHumanReview` est vrai, triées du score le plus bas au plus haut. Une fiche entre dans la file dès qu’elle a au moins un finding en **error** ou **warning** (les **info** seuls ne suffisent pas).

Chaque ligne de finding indique :

- la **sévérité** (`error`, `warning`, `info`) ;
- l’**axe** (`structure`, `linguistique`, `typographie`) ;
- une **preuve** textuelle et une **recommandation** actionnable.

Le **score** par fiche part de 100 et retire 35 points par `error`, 15 par `warning` (les `info` ne pénalisent pas). Il classe la priorité, pas la qualité réelle du texte.

### Règles couvertes (aperçu)

- **Structure** : rubriques `## À éviter` et `## En situation` présentes et dans le bon ordre ; le premier paragraphe du corps nomme le terme (`term`).
- **Linguistique** : mots anglais courants résiduels dans le corps (liste fixe dans `lib/audit/linguistic.ts`), hors terme et `sourceTerm`.
- **Typographie** : apostrophes droites (`'`) signalées pour vérification vers l’apostrophe typographique française (`’`).

D’autres critères de cette page (longueur de `description`, liens internes, ton) ne sont pas audités ici ; `pnpm test` continue de valider le schéma, le curriculum et les liens.

### Limites

Les alertes sont **heuristiques**. Exemples de faux positifs fréquents : le terme anglais absent du premier paragraphe alors qu’il est nommé autrement ; un mot de la liste anglaise présent dans un contexte acceptable ; apostrophes droites volontaires dans du code cité.

Ne corrigez pas une fiche uniquement parce que l’audit l’a signalée : lisez la preuve, puis décidez. L’audit n’est pas encore branché comme **échec bloquant** en CI ; gardez-le comme aide à la revue locale avant merge ou publication.
