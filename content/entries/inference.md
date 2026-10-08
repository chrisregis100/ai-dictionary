---
term: Inference
slug: inference
section: model
description: "Exécution d'un modèle déjà entraîné. Les paramètres restent figés et chaque requête produit des tokens."
sourceTerm: Inference
related:
  - training
  - parameters
  - output-tokens
---

L'inférence, c'est faire tourner un modèle dont les [paramètres](/notions/parameters) sont déjà écrits. Chaque appel au fournisseur est de l'inférence : le modèle lit le contexte qu'on lui donne et produit des tokens. Les nombres ne changent pas.

La vie d'un modèle se coupe en deux.

| Phase | Moment | Effet sur les paramètres |
| --- | --- | --- |
| Entraînement | Une fois, avant la mise à disposition | On les écrit |
| Inférence | À chaque usage | On les lit seulement |

Une correction faite aujourd'hui ne sera pas là demain, parce que l'inférence n'écrit rien en retour. Le modèle qui refait la même erreur n'a pas ignoré l'explication : il n'a aucun endroit où la garder. La continuité doit venir d'ailleurs, du contexte renvoyé à l'appel suivant ou d'un fichier que le harnais recharge.

La facture suit la même coupure. L'[entraînement](/notions/training) est déjà payé par le fournisseur. Toi, tu paies l'inférence, au token. Un agent qui appelle dix outils lance dix inférences. La taille du contexte est donc une question d'argent autant que de qualité.

## À éviter

- Parler d'une licence plate quand la facture suit le volume d'inférence.
- Attendre qu'une explication donnée à l'inférence modifie le modèle.

## En situation

> « Pourquoi la facture suit l'usage, et pas un forfait unique ? »

> « Tu paies l'inférence. Chaque appel fait tourner le modèle chez le fournisseur. Un tour avec des outils se déplie en plusieurs appels. »
