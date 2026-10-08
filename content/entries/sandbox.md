---
term: Sandbox
slug: sandbox
section: tools
description: "Environnement isolé où l'agent s'exécute : conteneur, VM, shell restreint. Limite les dégâts d'une mauvaise action."
sourceTerm: Sandbox
related:
  - environment
  - permission-mode
  - afk
---

Le sandbox — le bac à sable — est un [environnement](/notions/environment) isolé dans lequel l'[agent](/notions/agent) s'exécute : un conteneur, une machine virtuelle, un [système de fichiers](/notions/filesystem) jetable ou un shell aux droits restreints. Il limite le rayon des dégâts : même si l'agent lance une commande destructrice ou récupère quelque chose de malveillant, les dommages restent contenus. C'est le socle de sécurité qui rend le travail [AFK](/notions/afk) praticable.

Le bac à sable et le [mode de permission](/notions/permission-mode) règlent le même problème par les deux bouts. La permission demande avant qu'une action ne s'exécute ; le bac à sable limite ce que l'action peut atteindre si elle s'exécute. La permission exige un [humain dans la boucle](/notions/human-in-the-loop) — chaque demande interrompt — et une session qui demande sans cesse n'a plus grand-chose d'autonome. Le bac à sable dépense de l'infrastructure au lieu de l'attention : plus l'isolation est forte, moins il y a de questions à poser.

L'isolation vient par paliers :

| Palier | Ce que c'est | Ce qu'il contient |
| --- | --- | --- |
| Shell restreint | Confinement système autour de chaque commande | Écritures hors projet, accès réseau |
| Conteneur | Système de fichiers neuf, pas d'identifiants montés, jeté après | Tout ce que l'agent fait à sa propre machine |
| VM / cloud | Une machine à part, souvent fournie par le [harnais](/notions/harness) | Tout, y compris une évasion au niveau du noyau |

Aucun bac à sable ne contient ce qui en sort légitimement. Un agent avec tes identifiants git peut pousser ; un agent avec accès réseau peut appeler une API de production. Décide ce qui a le droit de traverser la frontière avant de décider son épaisseur.

## À éviter

- Croire qu'un bac à sable protège des actions légitimes : un push avec tes identifiants sort proprement.
- Lancer un mode full-auto hors de toute isolation parce que « ça s'est toujours bien passé ».

## En situation

> « Je veux le laisser tourner cette nuit en bypass, mais je ne suis pas prêt. »

> « Mets-le dans un bac à sable : conteneur neuf, pas d'identifiants montés, pas de réseau sortant. Au pire il détruit son propre système de fichiers et tu jettes le conteneur. »
