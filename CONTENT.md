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
