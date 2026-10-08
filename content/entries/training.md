---
term: Training
slug: training
section: model
description: "Calcul long, chez le fournisseur, qui ajuste les paramètres pour mieux prédire le token suivant."
sourceTerm: Training
related:
  - parameters
  - inference
  - model
---

L'entraînement est le passage qui fixe les [paramètres](/notions/parameters) d'un [modèle](/notions/model). Le fournisseur lui montre d'énormes quantités de texte et pousse les nombres vers une meilleure prédiction du token suivant. C'est fait une fois, c'est cher, et ce n'est pas une action disponible dans l'éditeur.

On y range à la fois le premier grand passage sur le corpus et les réglages plus tardifs (suivre une consigne, refuser certains contenus). Pour lire une facture ou un échec de session, la frontière entre les deux compte peu : les deux ont lieu avant que tu utilises le modèle.

Rien n'est stocké comme une fiche. Ce que le modèle récite est un effet secondaire d'être devenu bon à prédire, compressé dans les paramètres.

Deux conséquences suivent. L'entraînement s'arrête à une date : le modèle n'a pas vu la version de librairie sortie le mois dernier. Et tu ne peux pas « lui apprendre » ton API interne par ce biais. Le seul levier pendant l'[inférence](/notions/inference) est de mettre ce matériau dans le contexte.

## À éviter

- Demander un entraînement pour un fait qu'une page de doc réglerait.
- Confondre entraînement et conversation : la conversation ne réécrit pas les nombres.

## En situation

> « On peut faire en sorte qu'il connaisse notre API interne ? »

> « Pas par l'entraînement : c'est un chantier du fournisseur. Mets la doc de l'API dans le contexte. C'est ça que tu peux changer aujourd'hui. »
