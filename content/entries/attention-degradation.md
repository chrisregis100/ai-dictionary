---
term: Attention degradation
slug: attention-degradation
section: failures
description: "Baisse de qualité quand la session grossit : le budget d'attention se disperse et le signal utile se noie dans le bruit."
sourceTerm: Attention degradation
related:
  - attention-budget
  - smart-zone
  - clearing
  - compaction
---

L'attention degradation — la dégradation de l'attention — est la baisse de qualité d'un [modèle](/notions/model) à mesure que la [session](/notions/session) grossit. Le [budget d'attention](/notions/attention-budget) de chaque token se répartit sur plus de concurrents ; le signal sur chaque [relation utile](/notions/attention-relationship) rétrécit, le bruit du contexte sans rapport s'installe. Même modèle, mêmes [paramètres](/notions/parameters) : juste plus de bouches à nourrir dans la même assiette. C'est la cause de l'effet [zone futée / zone bête](/notions/smart-zone).

Ça se présente comme un modèle qui devient moins bon en cours de session. Des contraintes suivies pendant une heure commencent à glisser, il redemande des choses déjà dites, il écrit du code qui ignore un fichier lu plus tôt. Rien n'a changé côté modèle — la seule variable est la quantité de contexte qu'il parcourt désormais.

La pente est douce, et c'est ce qui la rend difficile à voir de l'intérieur. Pas d'erreur, pas de seuil ; chaque [tour](/notions/turn) est à peine pire que le précédent, et quand les ratés deviennent évidents, la zone bête est là depuis un moment.

On récupère en retirant du contexte, pas en en ajoutant. Recoller l'instruction ignorée ajoute un concurrent de plus dans la même fenêtre encombrée et n'aide qu'un moment. Ce qui marche : [vider](/notions/clearing) et recharger seulement ce dont la tâche a besoin, [compacter](/notions/compaction), ou [passer la main](/notions/handoff) à une session fraîche. Traite une obéissance qui décline comme un signal sur la longueur du contexte, pas sur le modèle.

## À éviter

- Ré-expliquer encore : chaque explication ajoutée grossit le contexte qui cause le problème.
- Accuser le modèle, ou chercher une mise à jour fautive, quand la seule variable est la taille de la session.

## En situation

> « Il est au fond de la zone bête : il invente des génériques qui ne sont pas dans le fichier de types. »

> « Dégradation de l'attention. Les définitions sont toujours dans le contexte, mais leur signal est enterré sous tout ce qu'on a ajouté depuis. Vide et recharge. »
