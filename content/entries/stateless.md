---
term: Stateless
slug: stateless
section: sessions
description: "Qui ne retient rien d'un appel à l'autre. Le modèle est sans état entre requêtes ; l'agent, entre sessions, par défaut."
sourceTerm: Stateless
related:
  - stateful
  - session
  - memory-system
  - model
---

« Stateless » signifie sans état : rien n'est retenu d'un appel au suivant. Le [modèle](/notions/model) est sans état entre deux [requêtes](/notions/model-provider-request) : chaque requête renvoie l'intégralité de la [fenêtre de contexte](/notions/context-window), parce que le modèle n'a aucun autre moyen de voir quoi que ce soit. Un [agent](/notions/agent) est sans état entre deux [sessions](/notions/session) : par défaut, une nouvelle session démarre vide, sans trace des précédentes. L'inverse est [stateful](/notions/stateful), avec état.

Le modèle est sans état de façon permanente. Ses [paramètres](/notions/parameters) sont gelés à la fin de l'entraînement, et rien de ce que tu fais à l'inférence ne les modifie. Le modèle n'apprend pas de tes corrections, ne se souvient pas d'avoir entendu la même remarque hier, et n'apprend pas à te connaître, quelle que soit l'impression de continuité. Cette continuité, au sein d'une session, est fabriquée par le [harnais](/notions/harness) : il conserve l'historique et le renvoie en entier à chaque requête. Le modèle ne se souvient pas de la conversation ; il la relit.

La conséquence pratique : pour qu'une chose survive d'une session à l'autre, il faut l'écrire quelque part que l'agent relira. C'est le rôle des fichiers [AGENTS.md](/notions/agents-md), des [systèmes de mémoire](/notions/memory-system) et des [artefacts de passation](/notions/handoff-artifact) : des fichiers chargés dans le [contexte](/notions/context) des sessions futures, qui tiennent lieu de la mémoire que le modèle n'a pas. Quand l'agent refait une erreur déjà corrigée, la question n'est pas « pourquoi n'a-t-il pas appris ? » — il ne le peut pas — mais « où écrire la correction pour que chaque session future la lise ? ».

## À éviter

- Dire « le modèle me connaît » ou « il a fini par apprendre » : rien n'a bougé dans les paramètres.
- Répéter la même correction de vive voix à chaque session au lieu de l'écrire dans un fichier relu au démarrage.

## En situation

> « Pourquoi oublie-t-il la convention chaque fois que je repars de zéro ? »

> « Le modèle est sans état : la nouvelle session démarre vide. Si tu veux que ça tienne, écris-le dans AGENTS.md ou dans un fichier de mémoire chargé au départ. »
