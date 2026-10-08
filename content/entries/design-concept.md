---
term: Design concept
slug: design-concept
section: patterns
description: "La compréhension partagée de ce qu’on construit, entre humain et agent, distincte de la conversation, de la spec et du code."
sourceTerm: Design concept
related:
  - grilling
  - spec
  - handoff-artifact
---

Le design concept est la compréhension partagée de ce qui est en train d’être construit, tenue en commun entre toi et l’[agent](/notions/agent), mais distincte de tout support. Le terme vient de Brooks (The Design of Design) : la conversation, les [artefacts de passation](/notions/handoff-artifact), le code sont des supports qui tentent de capturer ou d’atteindre le design concept — aucun ne l’est. Sa qualité se sent dans la qualité de la conversation qui l’a bâti.

Le terme nomme le fond d’une frustration connue : l’agent écrit exactement ce que tu as demandé, et c’est quand même faux. La cause habituelle est que tu n’avais pas fini de savoir ce que tu voulais. Le design concept n’était pas achevé dans ta propre tête ; le prompt capturait les parties décidées et se taisait sur les autres. L’agent a rempli les silences avec ses propres hypothèses, faute de quoi que ce soit à suivre. Rien n’a dysfonctionné : il n’y avait pas de design concept partagé, parce qu’il n’y en avait pas encore un entier à partager.

On reconnaît un design concept partagé comme avec un collègue : l’autre se met à répondre, comme tu l’aurais fait, à des questions que tu n’as pas encore posées. Jusque-là, le travail est la conversation — le [grilling](/notions/grilling) en est la version délibérée — et écrire une [spec](/notions/spec) trop tôt ne fait que figer le désalignement dans un support durable. Le design concept bouge aussi à mesure que l’on apprend ; les supports sont en retard sur lui, et une spec fidèle à la compréhension de la semaine dernière peut égarer la [session](/notions/session) de cette semaine.

## À éviter

- Prendre la spec pour le design concept : elle n’en est qu’une capture, datée du jour où on l’a écrite.
- Reprocher à l’agent un résultat « exact mais faux » sans se demander si le concept était fini dans ta propre tête.

## En situation

> « Il écrit exactement ce que je demande et c’est quand même faux. »

> « Vous ne partagez pas encore de design concept : il bouche les trous avec ses hypothèses. Parlez annulation, remboursements et exécution partielle jusqu’à ce que tout s’aligne, avant de le laisser écrire la spec. »
