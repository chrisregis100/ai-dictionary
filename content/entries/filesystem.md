---
term: Filesystem
slug: filesystem
section: tools
description: "Arborescence de fichiers que l'agent lit, écrit et où il exécute. L'environnement par défaut d'un agent de codage."
sourceTerm: Filesystem
related:
  - environment
  - tool-call
  - context-window
---

Le filesystem — le système de fichiers — est l'arborescence de fichiers et de dossiers que l'[agent](/notions/agent) lit, écrit, et dans laquelle il exécute des commandes. C'est l'[environnement](/notions/environment) par défaut d'un agent de codage : le code source, les scripts de build, le fichier [AGENTS.md](/notions/agents-md) y vivent. Quand un [harnais](/notions/harness) « démarre dans ton projet », il pointe l'agent sur un système de fichiers.

L'agent n'y touche que par des [appels d'outils](/notions/tool-call) : lire un fichier, en écrire un, lancer une commande shell. Rien de ce qui est sur le disque n'entre dans la [fenêtre de contexte](/notions/context-window) tant qu'un outil ne l'a pas chargé. C'est ce qui permet de travailler dans un dépôt bien plus grand que la fenêtre : le disque garde tout, le contexte ne garde que ce que la tâche en cours a lu. Certains harnais chargent d'office les noms de fichiers du dossier courant — l'arbre, pas les contenus — qui servent de [pointeurs](/notions/context-pointer) : l'agent voit ce qui existe et lit ce dont il a besoin.

Le système de fichiers est partagé avec toi. Les fichiers que l'agent édite sont ceux que tu ouvres dans ton éditeur et que tu compares dans git. C'est l'espace commun où tu relis ce que l'agent a fait.

## À éviter

- Croire qu'un fichier présent sur le disque est connu de l'agent : tant qu'aucun outil ne l'a lu, il n'est pas dans le contexte.
- Chercher le problème côté modèle quand le harnais pointe sur le mauvais dossier.

## En situation

> « Pourquoi il ne prend pas mon AGENTS.md ? »

> « Il tourne sur un autre système de fichiers : le [bac à sable](/notions/sandbox) a monté le dossier parent, pas la racine du projet. Repointe le harnais. »
