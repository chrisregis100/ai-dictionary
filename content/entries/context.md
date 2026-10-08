---
term: Context
slug: context
section: sessions
description: "Ce que l'agent sait d'utile pour la tâche en cours. Une affaire de qualité, pas de volume : le bon fait chargé au bon moment."
sourceTerm: Context
related:
  - context-window
  - session
  - agent
  - attention-degradation
---

Le contexte est l'information pertinente dont l'[agent](/notions/agent) dispose à l'instant. Le mot nomme l'idée abstraite : ni la suite brute de tokens que voit le modèle — c'est la [fenêtre de contexte](/notions/context-window) —, ni l'historique de la conversation — c'est la [session](/notions/session) —, mais ce que l'agent sait d'utile pour la tâche. « Charger quelque chose en contexte », c'est l'ajouter à cet ensemble ; l'ingénierie de contexte est la discipline qui le soigne.

Les trois termes se séparent nettement :

| Terme | Ce qu'il nomme |
| --- | --- |
| Context | L'information utile à la tâche, dont l'agent dispose maintenant |
| Context window | La suite de [tokens](/notions/token) que le modèle voit à chaque requête |
| Session | La conversation que le [harnais](/notions/harness) conserve |

Le contexte se juge en qualité, pas en volume. Une fenêtre presque pleine peut porter un contexte médiocre : des milliers de tokens de sorties d'outils périmées, rien sur la tâche en cours. Une fenêtre presque vide peut porter un excellent contexte : la seule définition de type dont la tâche dépend.

La plupart des ratés quotidiens remontent au contexte. Quand l'agent invente une API, contredit une décision ou devine un schéma, la première question est ce qu'il y avait en contexte à ce moment-là : le fait utile n'a souvent jamais été chargé, ou s'est noyé dans la [dégradation d'attention](/notions/attention-degradation). Le remède est la curation : charger ce que la tâche demande, écarter le reste.

## À éviter

- Mesurer le contexte au remplissage de la fenêtre : pleine ne veut pas dire pertinente.
- Demander « pourquoi invente-t-il ? » sans vérifier d'abord ce qui était chargé au moment de l'erreur.

## En situation

> « Il invente des champs qui n'existent pas dans le type. »

> « Le fichier de types n'est pas en contexte : il lit les points d'appel et devine. Fais-lui lire la définition d'abord. »
