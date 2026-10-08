---
term: Prefix cache
slug: prefix-cache
section: model
description: "Mémoire du fournisseur qui réutilise le début identique de deux requêtes, au lieu de le recalculer."
sourceTerm: Prefix cache
related:
  - cache-tokens
  - input-tokens
  - model-provider-request
---

Le cache de préfixe est le stockage, chez le fournisseur, qui permet à deux [requêtes](/notions/model-provider-request) de sauter le recalcul d'un début commun. Si le début correspond — même consigne, même historique jusqu'à un point — le fournisseur reprend le travail déjà fait et facture ces tokens comme des [tokens de cache](/notions/cache-tokens), bien moins chers.

Le cache paie parce qu'une session grandit par la fin. Chaque requête renvoie tout l'historique en [tokens d'entrée](/notions/input-tokens), et cet historique ne change en général qu'à la fin : la nouvelle requête est la précédente plus quelques messages. Le fournisseur traite le long début une fois, le garde, et reprend là où le préfixe s'arrête. Sans cache, une session de cinquante tours paierait cinquante fois le traitement du premier tour.

Le cache expire. La durée dépend du fournisseur, souvent des minutes, pas des heures. Une session laissée au repos se reconstruit au tarif plein une fois, puis le cache reprend. Après une longue pause, la requête suivante coûte donc plus que celles d'avant.

Le cache casse au premier token différent. Une horloge injectée dans la consigne à chaque tour, un fichier réordonné, et tout ce qui suit est facturé plein tarif.

## À éviter

- Modifier le début du contexte entre deux tours (heure, ordre des fichiers, consigne réécrite).
- S'étonner d'un pic de coût juste après une pause longue, sans regarder le cache.

## En situation

> « Pourquoi la facture a-t-elle sauté au milieu de la session ? »

> « Le harnais a mis l'heure dans la consigne à chaque tour. Le cache de préfixe casse au premier token changé. Ensuite, chaque requête est au tarif plein. »
