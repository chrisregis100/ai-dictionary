---
term: Permission mode
slug: permission-mode
section: tools
description: "Réglage qui décide quels appels d'outils demandent une permission et lesquels s'exécutent sans rien demander."
sourceTerm: Permission mode
related:
  - permission-request
  - agent-mode
  - sandbox
---

Le permission mode — le mode de permission — est le réglage qui décide quels [appels d'outils](/notions/tool-call) déclenchent une [demande de permission](/notions/permission-request) et lesquels s'exécutent sans rien demander. C'est la part « barrière » d'un [mode d'agent](/notions/agent-mode), et la fonction d'origine des systèmes de modes, avant que les harnais n'y ajoutent des consignes de comportement.

Les [harnais](/notions/harness) livrent une échelle de modes :

| Mode | Lectures | Écritures et shell | Usage typique |
| --- | --- | --- | --- |
| Lecture seule / plan | Auto | Bloquées | Recherche, planification, relecture |
| Défaut | Auto | Demandent | Travail supervisé au quotidien |
| Auto-edit | Auto | Éditions auto, shell demande | Dépôts de confiance, changements mécaniques |
| « Yolo » / full-auto | Auto | Auto | [Bacs à sable](/notions/sandbox), sessions [AFK](/notions/afk) |

Choisir un barreau est un compromis entre sécurité et interruption, et les deux échecs se sentent. Trop serré, tu deviens le goulot : l'[agent](/notions/agent) s'arrête toutes les quelques secondes pour des lectures inoffensives, tu cliques « approuver » en pilote automatique, et l'approbation ne veut plus rien dire — tamponner sans lire est le pire des deux mondes, toute l'interruption sans aucune protection. Trop lâche, l'agent édite des fichiers et lance des commandes que tu aurais voulu voir avant.

Le bout lâche se défend surtout dans un bac à sable, où un mauvais appel d'[outil](/notions/tool) reste contenu. En dehors, la plupart des gens se posent sur : lectures auto-approuvées, [humain dans la boucle](/notions/human-in-the-loop) pour tout ce qui est irréversible.

## À éviter

- Rester sur un mode serré et approuver sans lire : toute l'interruption, aucune protection.
- Passer en full-auto hors de tout bac à sable parce que les demandes agaçaient.

## En situation

> « Il s'arrêtait à chaque grep, ça a tué la session AFK. »

> « Desserre le mode pour les outils en lecture seule, garde la demande sur les écritures et le shell. Sur une session de recherche, la plupart des demandes sont du bruit. »
