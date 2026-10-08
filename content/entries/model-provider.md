---
term: Model provider
slug: model-provider
section: model
description: "Service qui exécute le modèle : une API distante ou un programme local. Le harnais se contente de l'appeler."
sourceTerm: Model provider
related:
  - model
  - harness
  - inference
---

Le fournisseur de modèle est ce qui fait tourner un [modèle](/notions/model) pour l'[inférence](/notions/inference). C'est souvent un service distant. Ce peut aussi être un programme sur ta machine. Le [harnais](/notions/harness) ne porte pas les paramètres : il envoie une requête et reçoit une prédiction.

Les limites de débit, la capacité dégradée et les pannes vivent ici. Quand l'agent s'arrête au milieu d'une session ou échoue à chaque tour, la page de statut du fournisseur se vérifie avant de réécrire la consigne.

Le fournisseur fixe aussi le prix au token, les réductions de cache, et la liste des modèles disponibles. Celui qui a entraîné le modèle et celui qui le sert peuvent être deux sociétés : certaines plateformes revendent les modèles d'autres.

Un fournisseur local échange de la capacité contre du contrôle. Les modèles qui tiennent sur une machine sont plus petits que ceux des grands services, mais rien ne sort de la machine et il n'y a pas de facture au token.

## À éviter

- Attribuer au modèle une erreur de quota, de réseau ou de panne du service.
- Croire que le harnais « contient » le modèle parce que l'interface est la même.

## En situation

> « On peut le faire tourner hors ligne, pour le client isolé ? »

> « Change de fournisseur pour un programme local sur leur machine. Le harnais appelle un autre point d'accès, c'est tout. »
