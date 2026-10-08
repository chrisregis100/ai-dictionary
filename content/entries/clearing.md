---
term: Clearing
slug: clearing
section: handoffs
description: "Fermer la session en cours et repartir à vide. Rien ne passe : la session neuve ignore tout de l'ancienne, décisions comme bruit."
sourceTerm: Clearing
related:
  - compaction
  - handoff-artifact
  - session
  - context-window
---

Le clearing — la remise à zéro — consiste à fermer la [session](/notions/session) en cours et à en ouvrir une neuve. Le message suivant part d'une [fenêtre de contexte](/notions/context-window) vide : la session neuve ne sait rien de l'ancienne. C'est en général un geste de l'utilisateur, pas du harnais.

Le clearing soigne un contexte pollué. Une session accumule tout : essais ratés, fausses pistes, résultats d'outils périmés, plans abandonnés. Le modèle relit cet historique à chaque tour, et ce bruit pèse sur le travail neuf. Loin dans une longue session, l'agent devient vague et moins obéissant : des consignes pourtant claires sont ignorées, et le pousser à mieux faire ne change rien, puisque le bruit reste dans son contexte. La remise à zéro enlève le bruit.

Le clearing n'efface pas la conversation. La plupart des harnais gardent l'historique sur le disque : le transcript reste lisible, parfois reprenable. Ce qui disparaît, c'est l'état de travail de l'agent. Le modèle est [sans état](/notions/stateless), donc la session neuve ignore tout ce que l'ancienne savait. Si la session tient des décisions ou un avancement dont la suite a besoin, fais d'abord écrire un [handoff artifact](/notions/handoff-artifact), puis ouvre la nouvelle session en pointant dessus.

La [compaction](/notions/compaction) est l'autre sortie : elle résume l'ancienne session dans la nouvelle au lieu de partir à vide. Le clearing est l'outil le plus brut : rien ne passe, le déchet comme l'utile.

## À éviter

- Insister auprès d'une session dégradée pour qu'elle « se concentre », au lieu de repartir à vide.
- Fermer la session sans avoir fait écrire ce dont la suivante aura besoin.
- Croire le travail perdu : le transcript reste en général sur le disque.

## En situation

> « Il tourne en boucle sur le même test qui échoue. »

> « Remets à zéro. Session neuve avec le plan et le fichier de test. Lutter contre ce contexte-là ne mène nulle part. »
