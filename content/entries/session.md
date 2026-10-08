---
term: Session
slug: session
section: sessions
description: "Passage borné de travail avec l'agent : démarre vide, accumule, finit par nettoyage, fermeture ou compaction."
sourceTerm: Session
related:
  - agent
  - context-window
  - turn
  - clearing
---

La session est un passage borné d'interaction avec un [agent](/notions/agent). Elle démarre vide, accumule messages, [résultats d'outils](/notions/tool-result) et fichiers lus, et se termine quand on la ferme, la [nettoie](/notions/clearing) ou la [compacte](/notions/compaction). La session est ce qui remplit la [fenêtre de contexte](/notions/context-window) : si la fenêtre est la boîte, la session est ce qui s'y entasse. Un travail trop gros pour une seule fenêtre se découpe en plusieurs sessions.

L'historique de la session est la mémoire de travail de l'agent. Le [modèle](/notions/model) est [sans état](/notions/stateless) : tout ce qu'il paraît se rappeler — la demande initiale, le verdict des tests, la décision prise trois tours plus tôt — est dans l'historique, renvoyé à chaque [requête](/notions/model-provider-request). Ce qui n'est pas dans la session n'existe pas pour l'agent.

Cette mémoire s'arrête avec la session. Une nouvelle session repart de rien : l'agent qui connaissait bien le dépôt à la fin de la session d'hier n'en sait rien ce matin. Ce qui survit, c'est le [système de fichiers](/notions/filesystem) : les fichiers écrits pendant une session se relisent dans la suivante. C'est le socle des [passations](/notions/handoff), des [systèmes de mémoire](/notions/memory-system) et d'[AGENTS.md](/notions/agents-md).

C'est toi qui choisis où une session s'arrête. Tout ce qui s'y trouve influence chaque [tour](/notions/turn) suivant : des tâches sans rapport menées dans la même session laissent un résidu qui colore la réponse d'après. Une tâche par session garde le contexte pertinent, et la fin d'une tâche est un bon moment pour nettoyer.

## À éviter

- Étirer une session « pour qu'il garde le contexte » alors qu'elle charrie trois tâches sans lien.
- Attendre d'une nouvelle session qu'elle sache ce qui n'a été écrit dans aucun fichier.

## En situation

> « Une session peut tourner combien de temps avant de se dégrader ? »

> « Ça dépend du travail : un refactor cadré tient plus longtemps qu'une recherche ouverte. Quand la session gonfle, passe la main ou compacte, ne force pas. »
