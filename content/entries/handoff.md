---
term: Handoff
slug: handoff
section: handoffs
description: "Transfert du contexte d'une session vers une autre, sans retour possible. Le véhicule varie : artefact écrit, compactage."
sourceTerm: Handoff
related:
  - handoff-artifact
  - compaction
  - clearing
  - session
---

Le handoff — la passation — est le transfert du contexte d'un agent d'une [session](/notions/session) vers une autre. Le véhicule varie : un [handoff artifact](/notions/handoff-artifact) écrit sur le disque, un résumé en mémoire ([compaction](/notions/compaction)), d'autres encore. Il se distingue du [clearing](/notions/clearing), où rien ne passe du tout.

Les raisons de passer la main varient. Changer de rôle : une session planifie, la suivante implémente. Lancer un run [AFK](/notions/afk). Démultiplier le travail sur plusieurs sessions parallèles. Ou simplement libérer de la place dans la [fenêtre de contexte](/notions/context-window).

La session réceptrice part de zéro. Le modèle est [sans état](/notions/stateless) : rien de l'ancienne session n'est visible depuis la nouvelle. Ce dont la suite a besoin doit être porté explicitement ; le reste est perdu. « Sans retour possible » est la contrainte qui donne sa forme à la passation : la session neuve ne peut pas demander à l'ancienne ce qu'elle voulait dire, donc le matériau transmis doit tenir debout seul.

| Véhicule | Forme | Propriétés |
| --- | --- | --- |
| Handoff artifact | Fichier dans l'environnement | Relisible et corrigeable avant usage ; sert à autant de sessions qu'on veut |
| Compaction | Résumé dans la fenêtre de contexte | Automatique et bon marché ; difficile à inspecter ; nourrit une seule session |

L'échec visible d'une mauvaise passation, c'est le procès rouvert : la session neuve rediscute des décisions que l'ancienne avait tranchées, parce que la passation a noté le quoi sans le pourquoi. Juge une passation à ce qu'une session sans aucun contexte saurait en faire.

## À éviter

- « L'agent se souviendra » : rien ne passe d'une session à l'autre sans véhicule explicite.
- Noter les décisions sans leur pourquoi, puis s'étonner que la session suivante les rouvre.

## En situation

> « La session de planification devient lourde. Je continue dedans ? »

> « Fais une passation. Écris les décisions dans un document, remets à zéro, et lance l'implémentation dans une session neuve qui lit ce document. »
