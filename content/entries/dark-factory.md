---
term: Dark factory
slug: dark-factory
section: patterns
description: "Base de code, ou zone d’une base, où une software factory écrit le code et où aucun humain ne le lit jamais."
sourceTerm: Dark factory
related:
  - software-factory
  - vibe-coding
  - human-review
  - automated-check
---

La dark factory (usine éteinte) est une base de code, ou une zone d’une base, où une [software factory](/notions/software-factory) écrit le code et où aucun humain ne le lit. Il n’y a pas de [relecture humaine](/notions/human-review). Des humains peuvent encore écrire les tickets qui lancent le travail ; personne ne lit le code qui en sort. Le nom vient des usines « lights-out », qui produisent sans personne dans l’atelier, lumières éteintes.

Une dark factory est du [vibe coding](/notions/vibe-coding) à l’échelle d’une zone de code, pas d’un changement. En vibe codant, tu choisis de ne pas lire un changement que tu as demandé, mais tu sais qu’il existe. Dans une dark factory, l’équipe fait ce choix une seule fois, pour toute la zone : ensuite, personne ne demande chaque changement ni ne le voit, et les changements arrivent au rythme où les déclencheurs lancent du travail.

Le problème se montre à la casse. Tu ne sais pas ce qui a changé, puisque personne n’a lu les changements. Il faut déboguer du code que personne dans l’équipe n’a jamais lu ; la cause peut se trouver dans n’importe lequel de nombreux changements, et chacun avait passé les contrôles. Les [vérifications automatiques](/notions/automated-check) et la [relecture automatisée](/notions/automated-review) sont les seules barrières : ce qu’elles ne trouvent pas entre dans le code.

| | Software factory | Dark factory |
| --- | --- | --- |
| Lancement des sessions | Par déclencheurs | Par déclencheurs |
| Relecture humaine | Oui, par exemple sur les PR | Aucune |
| Portée du choix | Changement par changement | Une fois, pour toute la zone |

## À éviter

- Dire « dark » d’une base parce que l’usine tourne sans personne qui regarde : des sessions AFK dont un humain relit les PR, c’est une software factory, pas une dark factory.
- Croire que des contrôles verts suffisent : ils ne trouvent que ce qu’ils affirment, et ici rien d’autre ne barre la route.

## En situation

> « Qui a changé la logique de retry du service de facturation ? Personne dans l’équipe ne s’en souvient. »

> « La facturation est une dark factory : les agents fusionnent tout ce qui passe la CI. Personne n’a lu ce changement. »
