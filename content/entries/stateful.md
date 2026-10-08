---
term: Stateful
slug: stateful
section: sessions
description: "Qui retient d'un coup à l'autre. La session l'est entre tours ; l'agent peut le devenir entre sessions, via une mémoire écrite."
sourceTerm: Stateful
related:
  - stateless
  - session
  - memory-system
  - environment
---

« Stateful » signifie avec état : l'information est portée d'un coup au suivant. Une [session](/notions/session) est avec état d'un [tour](/notions/turn) à l'autre : le [contexte](/notions/context) s'accumule à mesure qu'elle avance. Un [agent](/notions/agent) peut devenir avec état d'une session à l'autre si un [système de mémoire](/notions/memory-system) écrit dans l'[environnement](/notions/environment) et recharge ces écrits au démarrage suivant. Le [modèle](/notions/model), lui, n'est jamais avec état. L'inverse est [stateless](/notions/stateless), sans état.

Chaque couche range son état à un endroit différent :

| Couche | Avec état ? | Comment |
| --- | --- | --- |
| Modèle | Jamais | Paramètres gelés ; il ne voit que le contenu de chaque requête |
| Session | Entre tours | Le [harnais](/notions/harness) ajoute chaque message et résultat d'outil à l'historique |
| Harnais | Entre sessions | Fichiers de mémoire, [AGENTS.md](/notions/agents-md), artefacts de passation : écrits, puis rechargés |
| Environnement | Toujours | Les fichiers persistent, session ouverte ou non |

Chaque couche fabrique son état en relisant quelque chose rangé une couche plus bas. La session paraît continue parce que le harnais renvoie l'historique complet au modèle sans état ; l'agent se souvient entre sessions parce que le harnais recharge des fichiers depuis l'environnement. Aucun état ne loge dans le modèle lui-même.

L'état n'est pas toujours souhaitable. Tout ce qui est porté influence la suite : une hypothèse fausse prise tôt dans la session est portée aussi, et colore chaque réponse qui suit. Le [nettoyage](/notions/clearing) est le geste délibéré de jeter l'état de session pour repartir de ce qui est écrit.

## À éviter

- Conclure que « le modèle a appris » quand c'est le harnais qui a relu un fichier.
- Garder une longue session par confort de « mémoire » alors qu'elle charrie des hypothèses fausses.

## En situation

> « Il s'est souvenu de mes préférences d'hier : le modèle les a apprises ? »

> « Non. Le harnais les a écrites dans un fichier de mémoire et rechargées au démarrage. Le modèle n'a rien vu d'hier. »
