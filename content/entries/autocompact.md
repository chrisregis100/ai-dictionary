---
term: Autocompact
slug: autocompact
section: handoffs
description: "Compactage déclenché par le harnais quand la fenêtre approche du plein. Il perd du détail à un moment que tu n'as pas choisi."
sourceTerm: Autocompact
related:
  - compaction
  - context-window
  - handoff-artifact
  - harness
---

L'autocompact est une [compaction](/notions/compaction) déclenchée automatiquement par le [harnais](/notions/harness) quand la [fenêtre de contexte](/notions/context-window) approche du plein.

Le harnais surveille le remplissage de la fenêtre. Au franchissement d'un seuil — souvent autour de 80 % — il met la session en pause, fait résumer l'historique par le modèle, et amorce une session neuve avec le résumé. Le travail reprend ensuite comme si de rien n'était.

Sauf que quelque chose s'est passé. La compaction perd du détail, et l'autocompact en perd à un moment que tu n'as pas choisi. Un compactage manuel se fait à une frontière de phase, quand tu peux dire au modèle quoi préserver. L'autocompact part quand le seuil est franchi — au milieu d'un refactoring s'il le faut, le résumé décidant seul lesquelles de tes décisions méritaient de survivre. Le symptôme classique : l'[agent](/notions/agent) continue avec assurance mais a oublié sans bruit une contrainte posée une heure plus tôt, et tu ne le remarques que quand son travail la contredit.

La défense consiste à ne pas le laisser partir. Surveille l'indicateur de contexte et compacte à la main à une frontière naturelle, ou écris les décisions dans un plan ou un [handoff artifact](/notions/handoff-artifact) sur le disque, où aucun résumé ne peut les perdre. La plupart des harnais laissent aussi régler la marge : avancer ou reculer le seuil, ou couper l'autocompact.

## À éviter

- Chercher une « perte de mémoire du modèle » quand c'est un autocompact qui a tranché entre deux tours.
- Laisser la session filer jusqu'au seuil avec des décisions qui n'existent nulle part sur le disque.

## En situation

> « Il n'a plus l'air de se souvenir de ce qu'on avait décidé sur le schéma. »

> « L'autocompact est parti entre deux tours : les décisions du début ont été résumées et on a perdu quelque chose. Recharge le plan, et la prochaine fois compacte à la main pour contrôler ce qui reste. »
