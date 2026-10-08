---
term: Input tokens
slug: input-tokens
section: model
description: "Tokens envoyés avant que le modèle écrive : consigne, historique, retours d'outils. Relus à chaque requête."
sourceTerm: Input tokens
related:
  - token
  - model-provider-request
  - prefix-cache
---

Les tokens d'entrée sont ceux que le harnais envoie à chaque [requête](/notions/model-provider-request) : la consigne, l'historique, les résultats d'outils, tout ce que le modèle lit avant d'écrire. Ils sont facturés moins cher que les tokens de sortie, parce qu'ils coûtent moins à traiter.

En codage assisté, ils font souvent l'essentiel de la note. Le modèle est sans mémoire, donc chaque tour renvoie la session entière : ton premier message, chaque réponse, chaque résultat d'outil. L'entrée du cinquantième tour contient les quarante-neuf précédents. Une requête peut n'écrire que quelques centaines de [tokens](/notions/token) et renvoyer cent mille tokens d'historique.

Le [cache de préfixe](/notions/prefix-cache) baisse ce coût : la partie qui correspond exactement à une requête précédente est facturée comme tokens de cache, pas au tarif plein. Si l'entrée pèse encore trop, il faut réduire ce qu'on renvoie, en vidant ou en compactant entre deux tâches.

## À éviter

- Juger la facture à la longueur de ce que l'agent a écrit.
- Allonger l'historique sans regarder ce qui est renvoyé à chaque requête.

## En situation

> « La facture est haute, et l'agent n'écrit presque rien. »

> « Ce sont les tokens d'entrée. Chaque tour renvoie toute la session. Sans cache de préfixe, tu repaies l'historique à chaque requête. »
