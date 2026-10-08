---
term: Subagent
slug: subagent
section: memory
description: "Agent lancé par un autre via un appel d’outil. Sa fenêtre jetable absorbe le bruit ; seul son rapport revient au parent."
sourceTerm: Subagent
related:
  - agent
  - tool-call
  - handoff
  - secondary-source
---

Le subagent (sous-agent) est un [agent](/notions/agent) lancé par un autre agent au moyen d’un [appel d’outil](/notions/tool-call). Il travaille dans sa propre [session](/notions/session), avec sa propre [fenêtre de contexte](/notions/context-window), et rend un unique [résultat d’outil](/notions/tool-result) au parent. Il se distingue du [handoff](/notions/handoff) : le parent attend un retour, le handoff n’a pas de chemin de retour.

Le sous-agent sert à tenir le bruit hors du contexte du parent. Une recherche large ou une tournée de lecture de fichiers produit des pages de résultats, utiles le temps de trouver la réponse. Exécutées dans le parent, elles encombrent son contexte jusqu’à la fin de la session. Exécutées dans un sous-agent, elles remplissent une fenêtre jetable : seul le rapport final atterrit chez le parent.

Le rapport est une [source secondaire](/notions/secondary-source). Le parent reçoit le compte rendu du sous-agent, pas les résultats bruts : ce que le rapport omet lui est invisible. La consigne donnée au sous-agent doit donc dire ce que le rapport doit contenir.

L’arbre s’arrête à un niveau : un sous-agent ne lance pas de sous-agent. Le dispositif isole du contexte, il ne compose pas de hiérarchie. Plusieurs sous-agents peuvent en revanche tourner en parallèle, chacun sur un morceau indépendant du travail.

## À éviter

- Confondre avec un handoff : le sous-agent rend un rapport, le handoff part sans retour.
- Supposer que le parent sait ce que le sous-agent a vu : seul le rapport traverse.
- Empiler des niveaux de sous-agents : l’outil isole, il n’organise pas.

## En situation

> « Ma session est pleine aux trois quarts et je n’ai fait que chercher où vit cette fonction. »

> « La prochaine fois, confie la recherche à un sous-agent : les pages de résultats remplissent sa fenêtre, pas la tienne, et il ne te rend que les chemins utiles. »
