---
term: Grilling
slug: grilling
section: patterns
description: "L’agent interviewe l’humain, une décision à la fois, pour bâtir le design concept avant d’écrire le moindre artefact."
sourceTerm: Grilling
related:
  - design-concept
  - prototyping
  - spec
  - human-in-the-loop
---

Le grilling — passer l’humain sur le gril — est une technique pour construire un [design concept](/notions/design-concept) avec un [agent](/notions/agent) : l’agent interviewe l’utilisateur à la manière socratique, une décision à la fois, en proposant à chaque question une réponse recommandée. La ruée vers le plan fini est freinée : aucun [artefact de passation](/notions/handoff-artifact) n’est écrit tant que le concept ne s’est pas stabilisé.

La technique existe parce que les agents comblent les trous en silence. Chargé d’écrire une [spec](/notions/spec) à partir d’un prompt de deux lignes, l’agent ne s’arrête pas aux décisions que tu n’as pas prises : il choisit des défauts et les écrit. Le résultat a l’air complet, les suppositions se confondent avec les choix, et tu les découvres tard — à la relecture, ou quand la fonctionnalité traite un cas limite d’une façon que tu n’as jamais choisie. Le grilling inverse le mouvement : au lieu de deviner, l’agent doit demander.

C’est une technique [human-in-the-loop](/notions/human-in-the-loop) : tes réponses sont la matière. Quand une question ne se tranche pas en conversation — il faudrait voir la chose — on bascule vers le [prototypage](/notions/prototyping).

## À éviter

- Laisser l’agent écrire la spec pendant que le concept bouge encore : on fige le désalignement dans un document.
- S’acharner en conversation sur une question qui demande de voir : c’est le signal de passer au prototypage.

## En situation

> « Il est parti écrire la spec directement et la logique d’annulation est fausse. »

> « Grille-le d’abord : qu’il te questionne sur les annulations partielles, les remboursements et les délais avant d’écrire quoi que ce soit. Moins cher à trancher en conversation qu’en code. »
