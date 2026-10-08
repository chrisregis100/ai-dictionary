---
term: Non-determinism
slug: non-determinism
section: model
description: "La même entrée peut produire une autre sortie. Le tirage du token, et la façon de servir la requête, y contribuent."
sourceTerm: Non-determinism
related:
  - next-token-prediction
  - inference
  - model
---

Le non-déterminisme, c'est le fait qu'une entrée identique peut donner une sortie différente. Deux lancements, même contexte, parfois un mot de différence, parfois une autre approche. Ton code n'a pas besoin de changer pour que cela arrive.

Pendant l'[inférence](/notions/inference), la [prédiction du token suivant](/notions/next-token-prediction) produit une distribution, puis on tire un token. Un peu de hasard est voulu : prendre toujours le token le plus probable donne un texte répétitif et souvent moins bon. Un token différent tôt dans la réponse change tous les suivants. C'est ainsi qu'un mot devient une autre stratégie.

Le service ajoute une variation de plus. Les requêtes sont groupées sur du matériel partagé, et de minuscules écarts de calcul peuvent faire basculer un choix serré entre deux tokens. Il n'y a pas d'interrupteur qui efface tout cela.

Attends-toi à une dispersion. La plupart des essais tombent dans une zone correcte. Les queues existent : certains jours le [modèle](/notions/model) semble net, d'autres jours il décroche, sur la même tâche. Relancer est une stratégie légitime. Et une vérification automatique compte plus qu'avec un outil déterministe : un seul essai réussi ne garantit pas le suivant.

Une série de mauvais runs n'est pas, à elle seule, la preuve qu'une version pire a été déployée. C'est souvent la distribution.

## À éviter

- Diagnostiquer un changement de modèle après une mauvaise journée.
- Figer un comportement d'agent sur un seul essai manuel.

## En situation

> « Claude est mauvais aujourd'hui. Ils ont livré une pire version ? »

> « Peut-être pas. La sortie n'est pas déterministe. Retente demain avant de chercher une cause de version. »
