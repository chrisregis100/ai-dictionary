---
term: Knowledge cutoff
slug: knowledge-cutoff
section: failures
description: "Date au-delà de laquelle le modèle ne sait rien. Ce qui est sorti après est un piège à fabrication, sauf docs chargées en contexte."
sourceTerm: Knowledge cutoff
related:
  - parametric-knowledge
  - contextual-knowledge
  - training
---

La knowledge cutoff — la date de coupure des connaissances — est la date au-delà de laquelle un [modèle](/notions/model) n'a plus aucune [connaissance paramétrique](/notions/parametric-knowledge). Chaque version de modèle sort avec sa propre coupure. Les bibliothèques, les API et les événements postérieurs n'existent pas pour lui, sauf si leurs docs sont chargées en [connaissance contextuelle](/notions/contextual-knowledge).

La coupure découle de la fabrication des modèles. L'[entraînement](/notions/training) fige un instantané de texte dans les [paramètres](/notions/parameters), puis les paramètres ne bougent plus. Le modèle ne sait pas que son savoir a un bord : interrogé sur quelque chose d'après la coupure, il ne refuse pas, il extrapole à partir de ce qu'il connaît de plus proche.

C'est ce qui rend le piège silencieux. Du code écrit contre une vieille version d'une bibliothèque a l'air plausible, compile souvent, et ne casse que sur les parties qui ont changé. Rien ne signale l'erreur avant l'exécution.

Le remède est toujours le même : mettre l'information à jour dans le [contexte](/notions/context). Charger le changelog, pointer les définitions de types de la version installée, faire lire les docs sur le web. N'importe quoi dans le contexte l'emporte sur rien dans les paramètres.

## À éviter

- Croire que le modèle refusera de répondre au-delà de sa coupure : il extrapole sans prévenir.
- Mettre à jour une dépendance sans charger son changelog, puis s'étonner de retrouver l'ancienne syntaxe.

## En situation

> « Il s'obstine à écrire la syntaxe v3 du SDK, on est en v5. »

> « La v5 est sortie après sa date de coupure. Charge le changelog v5 en contexte, sinon il continuera à fabriquer à partir de la version restée dans ses paramètres. »
