---
term: Environment
slug: environment
section: tools
description: "Le monde sur lequel l'agent agit : tout ce qu'il perçoit par les résultats d'outils et modifie par les appels d'outils."
sourceTerm: Environment
related:
  - filesystem
  - tool-result
  - sandbox
---

L'environment — l'environnement — est le monde sur lequel l'agent agit : tout ce qui existe hors du [harnais](/notions/harness) et que l'[agent](/notions/agent) perçoit par les [résultats d'outils](/notions/tool-result) et modifie par les [appels d'outils](/notions/tool-call). Le harnais fait tourner l'agent ; l'environnement est ce dans quoi l'agent travaille. Le [système de fichiers](/notions/filesystem) est l'environnement le plus courant, mais pas le seul : une base de données, une API distante, une session de navigateur en sont aussi.

L'agent ne voit l'environnement que lorsqu'il regarde. Tout ce qu'il en sait est arrivé par un résultat d'outil : son image du monde est une collection d'instantanés, chacun exact au moment de la prise. Si un fichier change après la lecture — tu l'édites à la main, un build le régénère — l'agent continue de raisonner sur la copie périmée jusqu'à ce que quelque chose provoque une relecture. Un agent qui décrit avec assurance un fichier qui ne ressemble plus à ça, c'est en général ce cas : l'environnement a bougé, pas l'instantané.

L'environnement est aussi la seule couche qui persiste. Le contexte d'une [session](/notions/session) disparaît quand elle se termine ; les fichiers écrits dans l'environnement restent, et la session suivante peut les lire. C'est ce sur quoi reposent les [systèmes de mémoire](/notions/memory-system) et les artefacts de passation. Ce que l'agent doit encore savoir demain doit finir dans l'environnement.

La taille de l'environnement se décide. Un [bac à sable](/notions/sandbox) le rétrécit en limitant ce que l'agent peut atteindre ; ajouter un [outil](/notions/tool) l'étend, en mettant une base ou une API à portée. Ce qui est dans la frontière, l'agent peut le percevoir et le changer ; ce qui est dehors n'existe pas pour lui.

## À éviter

- Employer « environnement » pour le harnais lui-même : le harnais est l'enveloppe, l'environnement est l'espace de travail.
- Supposer que l'agent a vu un changement fait à la main pendant qu'il travaillait.

## En situation

> « L'agent ne voit pas le schéma de la base de staging. »

> « Mets-la dans l'environnement : donne-lui un outil psql en lecture seule sur staging. Le harnais va bien, il n'a juste rien sur quoi agir. »
