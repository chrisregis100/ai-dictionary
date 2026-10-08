---
term: Permission request
slug: permission-request
section: tools
description: "Pause du harnais avant un appel d'outil non pré-approuvé : l'humain approuve ou refuse, et le refus revient au modèle."
sourceTerm: Permission request
related:
  - tool-call
  - permission-mode
  - human-in-the-loop
---

La permission request — la demande de permission — est ce que le [harnais](/notions/harness) montre à l'utilisateur avant d'exécuter un [appel d'outil](/notions/tool-call) qui n'est pas pré-approuvé. Le [modèle](/notions/model) produit l'appel ; au lieu de l'exécuter tout de suite, le harnais s'arrête et demande. Approuvé, l'appel s'exécute ; refusé, le harnais rapporte le refus au modèle comme un [résultat d'outil](/notions/tool-result). C'est le mécanisme par lequel un harnais met un [humain dans la boucle](/notions/human-in-the-loop) pour les actions risquées ou sensibles.

Le refus pilote l'agent. Le modèle lit le refus comme n'importe quel résultat et y réagit : il tente une autre approche, ou demande ce que tu préfères. La plupart des harnais laissent joindre un message au refus, ce qui transforme la demande en point de pilotage : « pas comme ça, passe par le script de migration » arrive exactement au moment où le modèle décide de la suite.

Le coût est que chaque demande est une attente synchrone sur toi. L'[agent](/notions/agent) reste bloqué jusqu'à ta réponse. Ça va tant que tu regardes ; c'est un problème quand tu n'es pas là : un agent qui déclenche des demandes en continu ne peut pas travailler [AFK](/notions/afk). Le [mode de permission](/notions/permission-mode) est le réglage : quels appels passent librement, lesquels demandent d'abord — idéalement avec un [bac à sable](/notions/sandbox) qui rend sûr d'élargir ce qui passe librement.

## À éviter

- Approuver en pilote automatique : une approbation qu'on ne lit plus ne protège plus rien.
- Refuser sans message quand une phrase aurait réorienté l'agent au bon moment.

## En situation

> « Il est resté bloqué dix minutes sur une demande de permission, j'étais en réunion. »

> « C'est le prix de l'humain dans la boucle. Pré-approuve les outils sûrs, pour que la demande ne parte que sur les appels vraiment risqués. »
