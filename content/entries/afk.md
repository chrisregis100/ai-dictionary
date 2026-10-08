---
term: AFK
slug: afk
section: patterns
description: "Loin du clavier : on lance la session puis on laisse l’agent travailler sans surveillance, et on juge le résultat au retour."
sourceTerm: AFK
related:
  - human-in-the-loop
  - sandbox
  - automated-check
  - spec
---

AFK — away from keyboard, loin du clavier — désigne le mode de travail où l’on lance une [session](/notions/session) puis où l’on s’en va : l’[agent](/notions/agent) tourne sans surveillance et l’on juge le résultat au retour. C’est l’inverse du travail [human-in-the-loop](/notions/human-in-the-loop), et c’est le multiplicateur de débit du codage avec IA : plusieurs sessions AFK tournent en parallèle pendant que tu dors ou travailles à autre chose. En pratique, cela demande un [mode de permission](/notions/permission-mode) permissif et un [bac à sable](/notions/sandbox) pour rester sûr.

L’absence change le traitement de l’ambiguïté. Sous tes yeux, une décision ambiguë devient une question et tu y réponds ; une fois parti, l’agent choisit un défaut et continue, et chaque décision suivante s’appuie sur ce pari. L’échec typique est de revenir devant des heures de travail fini, assuré, construit sur un mauvais choix des dix premières minutes. Le travail n’est pas bâclé — il est cohérent, mais cohérent sur la mauvaise chose.

Puisque tu ne peux rien donner pendant la course, donne avant et après. Avant : lever l’ambiguïté — une séance de [grilling](/notions/grilling), une [spec](/notions/spec) écrite — pour laisser moins de trous que l’agent comblerait seul. Pendant : des [vérifications automatiques](/notions/automated-check) et une [relecture automatisée](/notions/automated-review) tiennent lieu de l’attention que tu ne donnes pas, et échouent vite sur ce qui s’attrape mécaniquement. Après : la course se termine sur quelque chose de relisible — une PR, pas des changements déjà fusionnés. L’AFK ne supprime pas la [relecture humaine](/notions/human-review) ; il la reporte en entier à la fin, et ce qui arrive à la fin doit valoir la relecture.

C’est aussi en AFK que l’[AX](/notions/ax) compte le plus : personne ne regarde, l’environnement est le seul appui que l’agent reçoit.

## À éviter

- Dire « agent en arrière-plan » : la formule décrit la machine, pas le fait qui compte — tu n’es plus devant.
- Lancer AFK une tâche ambiguë sans spec ni grilling : l’agent remplira les trous tout seul.
- Laisser la course fusionner directement : elle doit finir sur une PR, pas sur du code déjà en place.

## En situation

> « Tu lances ça AFK ? Avec quelles permissions ? »

> « Larges, mais en bac à sable : lecture seule hors du projet, pas de réseau. Trois agents sur le refactor, et je relis les PR demain matin. »
