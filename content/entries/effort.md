---
term: Effort
slug: effort
section: model
description: "Réglage, par requête, de la longueur du raisonnement avant la réponse. Plus haut : plus lent, plus cher."
sourceTerm: Effort
related:
  - inference
  - output-tokens
  - model-provider-request
---

L'effort règle combien le modèle réfléchit avant d'écrire la réponse que tu lis. On le choisit pour une [requête](/notions/model-provider-request), pas pour toute la journée. Ce raisonnement est produit pendant l'[inférence](/notions/inference), comme le reste. Le harnais le cache souvent. Il est quand même calculé, et facturé.

Monter l'effort allonge l'attente et la note. Ces tokens de raisonnement comptent comme des [tokens de sortie](/notions/output-tokens), même si tu ne les vois pas. Les baisser sur un problème difficile donne une réponse fluide qui a sauté l'étape où il fallait hésiter.

La plupart des harnais proposent une petite échelle.

| Niveau | Usage raisonnable |
| --- | --- |
| Bas | Édition mécanique, recherche, changement déjà spécifié |
| Moyen | Code du quotidien, le défaut |
| Haut | Bug difficile, choix de conception, plan en plusieurs étapes |
| Max | Problème où se tromper coûte cher à défaire |

Règle l'effort sur la tâche, pas sur la session. Monte-le pour le morceau vraiment dur. Redescends-le pour le travail répétitif autour.

## À éviter

- Laisser le maximum pour un renommage d'une ligne.
- Relancer trois fois la même explication alors que l'effort est trop bas pour le bug.

## En situation

> « Il rate encore ce correctif de concurrence. Je l'ai réexpliqué trois fois. »

> « Monte l'effort. C'est un bug de raisonnement, et au réglage par défaut il s'engage trop tôt. »
