---
term: Spec
slug: spec
section: handoffs
description: "Artefact de passation décrivant un travail à plusieurs sessions : objectif, contraintes, décisions, tickets. Le quoi, pas le comment."
sourceTerm: Spec
related:
  - handoff-artifact
  - ticket
  - session
  - smart-zone
---

La spec — la spécification — est un [handoff artifact](/notions/handoff-artifact) qui décrit un travail étalé sur plusieurs [sessions](/notions/session) : ce qu'on construit, pas comment chaque session fait sa part. Elle évolue à mesure que le travail avance. Elle se compose de [tickets](/notions/ticket).

La spec existe parce que les sessions sont jetables et que le gros travail ne l'est pas. Tout ce qui demande plus d'une [fenêtre de contexte](/notions/context-window) d'effort a besoin d'un domicile hors du contexte — un endroit de l'[environnement](/notions/environment) qui survit au [clearing](/notions/clearing) : un fichier du dépôt, une issue GitHub, un tracker que l'agent peut atteindre. La spec est ce domicile : l'objectif, les contraintes, les décisions déjà prises, la liste des tickets et leur état. N'importe quelle session neuve la lit et sait où en est le travail, sans hériter du bruit accumulé par les précédentes.

Les specs ont des styles reconnaissables, hérités de ce que les équipes écrivaient déjà. Le PRD (product requirements document) penche vers le quoi et le pourquoi côté produit : fonctionnalités, comportements, critères d'acceptation. Le design doc ou la RFC penche technique : l'approche retenue, les alternatives écartées, les compromis. En bas de l'échelle, un simple `plan.md` avec une liste de tickets à cocher rend le même service pour une fonctionnalité à plusieurs sessions. Le style compte moins que le rôle : pour l'[agent](/notions/agent), chacun de ces documents est la même chose — la déclaration d'intention durable qu'il relit au début de chaque session.

## À éviter

- Mettre le comment de chaque session dans la spec : c'est l'affaire des tickets.
- Tenter le travail entier dans une seule session parce que « la spec est courte ».
- Laisser la spec figée pendant que les décisions bougent : elle doit suivre le travail.

## En situation

> « Tout ça peut tenir dans une seule session ? »

> « Non. Écris une spec, découpe en tickets, une session par ticket. En une seule session, tu sors de la zone intelligente avant la moitié. »
