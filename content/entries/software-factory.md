---
term: Software factory
slug: software-factory
section: patterns
description: "Système où des déclencheurs — ticket, cron, échec de CI — lancent les sessions d’agent à la place des humains."
sourceTerm: Software factory
related:
  - afk
  - dark-factory
  - human-review
  - automated-review
---

La software factory (usine logicielle) est un système de travail où les [sessions](/notions/session) d’[agent](/notions/agent) sont lancées par des déclencheurs — un ticket créé, un horaire, un échec de CI, une autre session qui se termine — plutôt que par une personne. Plus de travail tourne alors en [AFK](/notions/afk), et l’attention humaine se garde pour les décisions [human-in-the-loop](/notions/human-in-the-loop) qui restent.

Sans usine, chaque session commence parce que quelqu’un l’a commencée. Même un travail entièrement AFK attend qu’une personne ouvre la session, la pointe vers le [ticket](/notions/ticket) et la lance. Les équipes veulent livrer plus que ce rythme ne le permet. L’usine retire l’humain du lancement des sessions — et pas nécessairement d’autre chose.

Déclencheurs courants et sessions lancées :

| Déclencheur | Session lancée |
| --- | --- |
| Ticket créé ou étiqueté | Exploration, correction de bug, implémentation qui ouvre une PR |
| Horaire (cron) | Maintenance récurrente — une règle de lint corrigée par nuit |
| Échec de CI, alerte de supervision | Diagnostic, tentative de correction |
| Fin d’une autre session | Travail de suite : une PR ouverte déclenche une [relecture automatisée](/notions/automated-review), dont les commentaires déclenchent une session de reprise |

Une usine n’a pas à couvrir tout le processus. Un seul cron qui lance un seul type de session et ouvre une PR relisible est déjà une usine. Commencer petit est utile : une boucle étroite produit des PR petites et semblables, et les relire montre jusqu’où la boucle mérite confiance avant de l’élargir.

Les humains peuvent se tenir n’importe où dans l’usine : écrire et étiqueter les tickets qui déclenchent les sessions, approuver un plan avant l’implémentation, faire la [relecture humaine](/notions/human-review) avant la fusion. Décider lesquelles de ces décisions restent humaines est la question de conception principale. Une base de code, ou une zone d’une base, où personne ne relit la sortie de l’usine est une [dark factory](/notions/dark-factory).

## À éviter

- Confondre usine et absence de relecture : l’usine retire l’humain du lancement, pas forcément du reste.
- Élargir la boucle avant d’avoir relu ce que la boucle étroite produit.

## En situation

> « Qui a corrigé toutes les violations de no-floating-promises ? »

> « L’usine. Un cron prend une règle de lint par nuit et ouvre une PR. Je la relis le matin. »
