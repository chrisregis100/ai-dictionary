---
term: AGENTS.md
slug: agents-md
section: memory
description: "Fichier chargé au début de chaque session : le brief permanent du projet à l’agent. Chaque ligne se paie en tokens à chaque tour."
sourceTerm: AGENTS.md
related:
  - skill
  - context-pointer
  - progressive-disclosure
  - memory-system
---

AGENTS.md est un fichier du projet que le [harnais](/notions/harness) charge dans la [fenêtre de contexte](/notions/context-window) au début de chaque [session](/notions/session). C’est le brief permanent du projet à l’[agent](/notions/agent). La convention vaut d’un harnais à l’autre ; certains ont en plus leur variante maison, comme CLAUDE.md pour Claude Code.

Le fichier existe parce que le [modèle](/notions/model) est [stateless](/notions/stateless) : une correction donnée dans une session est perdue dans la suivante. Sans lui, on redit à chaque session que le projet utilise pnpm, que les tests demandent tel drapeau, que tel dossier est généré et ne se touche pas. La règle pratique : une correction donnée deux fois est une ligne candidate pour AGENTS.md.

Le bon contenu est ce que l’agent ne peut pas déduire du code : commandes de build et de test, conventions que la base ne rend pas visibles, contraintes dures (« ne jamais éditer le client généré »). Court et déclaratif : un brief, pas de la documentation.

La contrepartie : tout ce qui s’y trouve est chargé à chaque session, utile ou non. Les lignes s’accumulent, coûtent des [tokens](/notions/token) à chaque [tour](/notions/turn), et se diluent — plus il y a de consignes en contexte, moins le modèle en suit une en particulier. Ce qui ne vaut pas partout relève de la [divulgation progressive](/notions/progressive-disclosure) : un guide de style entier va derrière une [skill](/notions/skill) ou un [pointeur de contexte](/notions/context-pointer), AGENTS.md garde les lignes qui s’appliquent à toutes les tâches.

## À éviter

- Y coller tout ce qui pourrait servir un jour : chaque ligne se paie à chaque tour, dans chaque session.
- Le traiter comme de la documentation : les détails vont derrière des pointeurs, pas dans le brief.
- Chercher pourquoi l’agent ignore une règle sans regarder la longueur du fichier qui la contient.

## En situation

> « L’agent ignore la règle sur les imports, pourtant elle est dans AGENTS.md. »

> « Elle y est, avec quatre-vingts autres. Le fichier a doublé en un mois ; plus il est long, moins chaque ligne pèse. Élague. »
