---
term: Automated check
slug: automated-check
section: patterns
description: "Vérification déterministe dans l’environnement — tests, types, lint, build. Verdict binaire, dont l’agent se corrige seul."
sourceTerm: Automated check
related:
  - automated-review
  - human-review
  - afk
  - ax
---

La vérification automatique (automated check) est un contrôle déterministe qui tourne dans l’[environnement](/notions/environment) : tests, vérification de types, lint, build, hooks de pre-commit. Le verdict est binaire, réussi ou échoué, sans jugement. C’est le signal dont un [agent](/notions/agent) peut se corriger seul, sans impliquer personne.

L’autocorrection fonctionne en boucle. L’agent modifie le code, lance la vérification par un [appel d’outil](/notions/tool-call), et la sortie d’échec arrive dans sa [fenêtre de contexte](/notions/context-window) : une erreur de type avec fichier et ligne, une assertion avec valeur attendue et valeur obtenue. C’est assez pour corriger et relancer, tour après tour, jusqu’au vert. Le déterminisme rend la boucle fiable : le même code produit toujours le même verdict, donc un vert veut dire quelque chose. Un test instable empoisonne la boucle — l’agent « corrige » du code sain, ou réessaie par-dessus un vrai échec. Un test instable est une vérification cassée, pas une absence de vérification : la vérification automatique est déterministe par construction.

De bonnes vérifications sont une grande part de l’[AX](/notions/ax) d’un dépôt. Avec des types stricts, une suite de tests rapide et un linter, l’agent attrape la plupart de ses erreurs avant que tu ne les voies ; sans rien de tout cela, il livre ce qui sort. L’écart pèse surtout dans les courses [AFK](/notions/afk), où ces contrôles sont la seule vérification qui a lieu pendant la course.

Une vérification n’attrape que ce qu’elle affirme. Des contrôles verts signifient que les propriétés testées tiennent, pas que le code est juste. Les trous en forme de jugement relèvent de la [relecture automatisée](/notions/automated-review) et de la [relecture humaine](/notions/human-review).

## À éviter

- Dire « test » pour l’ensemble : les tests sont des vérifications automatiques, mais le typage, le lint et le build en sont aussi.
- Tolérer un test instable : ce n’est pas une vérification imparfaite, c’est une boucle d’autocorrection empoisonnée.
- Lire un pipeline vert comme « code juste » : il dit seulement que les propriétés affirmées tiennent.

## En situation

> « L’agent n’arrête pas de livrer du code cassé dans les courses AFK. »

> « Quelles vérifications tournent dans le bac à sable ? Si c’est juste les tests unitaires, ajoute le typage et le lint : il s’en corrigera seul avant que la PR n’arrive. »
