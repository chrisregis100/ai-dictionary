---
term: Secondary source
slug: secondary-source
section: handoffs
description: "Compte rendu d'une source primaire, à un cran de distance : doc, résumé, rapport. Peu cher à charger, avec perte par construction."
sourceTerm: Secondary source
related:
  - primary-source
  - compaction
  - handoff-artifact
  - context-pointer
---

La source secondaire est un compte rendu d'une [source primaire](/notions/primary-source), à un cran de distance : une doc qui décrit du code, un résumé qui décrit un transcript, un rapport qui décrit des résultats de recherche. Elle coûte moins cher à charger dans la [fenêtre de contexte](/notions/context-window) que l'original qu'elle décrit, et elle perd par construction : quelqu'un a décidé de ce qui comptait, et ce qu'il a laissé tomber est invisible pour qui ne lit que le compte rendu.

Une bonne part du travail sur le contexte consiste à fabriquer des sources secondaires. La [compaction](/notions/compaction) transforme l'historique de la session en résumé qui amorce la suivante. Un [sous-agent](/notions/subagent) brûle son propre contexte sur une recherche bruyante et rend un court rapport. Un [handoff artifact](/notions/handoff-artifact) condense les décisions d'une session en document. Un [système de mémoire](/notions/memory-system) distille ce qu'une session a appris en notes. À chaque fois, le même échange : de la fidélité contre de la place.

Les sources secondaires échouent de deux façons. Par la perte : le résumé de compaction qui a laissé tomber la décision de schéma, le rapport qui ne mentionne pas le cas limite. Et par la dérive : la source primaire change, le compte rendu ne suit pas, et la doc décrit l'architecture du trimestre dernier avec l'assurance de celui-ci. Quand un agent agit sur une source secondaire qui a échoué d'une de ces deux façons, il travaille avec aplomb depuis une information fausse. Le remède : le renvoyer à la source primaire.

Aucun de ces échecs ne rend la source secondaire fautive. La fenêtre est finie et les sources primaires coûtent cher : sans résumés, rapports et documents de passation, rien de gros ne tient. Le savoir-faire consiste à repérer les détails qui survivent à la perte — et à vérifier contre l'original ceux qui n'y survivent pas. Une source secondaire bien faite porte un [pointeur de contexte](/notions/context-pointer) vers son original : le résumé qui nomme le transcript d'où il vient, la doc qui nomme le fichier qu'elle décrit. Quand le compte rendu ne suffit plus, on suit le pointeur au lieu de travailler depuis la perte.

## À éviter

- Traiter une doc ou un résumé comme la vérité : c'est ce que l'auteur croyait, au moment où il l'a écrit.
- Fabriquer un résumé sans pointeur vers l'original : la perte devient irrécupérable.

## En situation

> « Le doc de passation dit que l'auth est finie, mais la nouvelle session trouve un refresh de token cassé. »

> « Le doc est une source secondaire : la session d'avant a noté ce qu'elle croyait, pas ce qui est vrai. Fais tourner les tests d'auth et crois la source primaire. »
