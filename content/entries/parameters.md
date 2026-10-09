---
term: Parameters
slug: parameters
section: model
description: "Nombres contenus dans un modèle, souvent par milliards, ajustés durant l’entraînement. On les appelle aussi des poids."
sourceTerm: Parameters
related:
  - model
  - training
  - inference
---

Parameters désigne les nombres contenus dans un [modèle](/notions/model) — souvent par milliards — qui sont ajustés durant l’[entraînement](/notions/training). Tout ce que le modèle « sait » y est inscrit. L’entraînement les définit ; l’[inférence](/notions/inference) les utilise tels quels. On les appelle aussi « poids ».

Concrètement, ce sont les paramètres qui transforment les données d’entrée en données de sortie. La [prédiction du jeton (token) suivant](/notions/next-token-prediction) est un calcul colossal : les jetons de la [fenêtre de contexte](/notions/context-window) sont traités, multipliés par les paramètres, et le résultat est une prédiction pour le jeton suivant. Le modèle ne contient ni base de données de faits ni table de correspondance codée : il n’y a que ces nombres, agencés de telle sorte que le calcul tende à produire un résultat utile. Les faits que le modèle peut restituer grâce à son entraînement — comme l’API d’une bibliothèque standard — relèvent de la « [connaissance paramétrique](/notions/parametric-knowledge) » : ils sont stockés dans les paramètres eux-mêmes et ne sont pas récupérés depuis une source externe.

Il est important de bien comprendre que les paramètres sont figés après l’entraînement. Aucune action effectuée lors d’une session ne les modifie : ni les corrections apportées, ni le code source présenté, ni les erreurs dont le modèle pourrait tirer parti. Chaque session s’appuie sur les mêmes nombres. C’est pourquoi le modèle est [sans état (stateless)](/notions/stateless), pourquoi ses connaissances intrinsèques s’arrêtent à la [date butoir de ses données d’entraînement](/notions/knowledge-cutoff), et pourquoi toute information spécifique à un projet doit être fournie via le [contexte](/notions/context). La seule façon de modifier les paramètres est de procéder à un nouvel entraînement, ce qui donne, en réalité, un modèle différent.

## À éviter

- Croire qu’une correction, le code présenté ou une erreur corrigée en session modifie les paramètres.
- Réentraîner pour un seul projet alors qu’il est presque toujours plus économique de charger la base de code dans le contexte.

## En situation

> « Peut-on l’affiner (fine-tuning) sur notre base de code ? »

> « Cela modifierait les paramètres, ce qui donnerait un modèle différent. Pour un projet donné, il est presque toujours plus économique de charger la base de code dans le contexte plutôt que de réentraîner le modèle. »
