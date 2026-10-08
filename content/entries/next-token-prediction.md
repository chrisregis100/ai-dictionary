---
term: Next-token prediction
slug: next-token-prediction
section: model
description: "Seul calcul du modèle : tirer un token probable, l'ajouter, recommencer. Tout le reste est une suite de ces pas."
sourceTerm: Next-token prediction
related:
  - token
  - model
  - non-determinism
---

La prédiction du token suivant est le seul mode de calcul du [modèle](/notions/model). On lui donne un contexte. Il choisit un [token](/notions/token), on l'ajoute, on relance. Une phrase, un appel d'outil ou un fichier de mille lignes se construit ainsi, pas autrement.

À chaque pas, les paramètres produisent une probabilité pour chaque token du vocabulaire. On en tire un, selon ces probabilités. Ce tirage est la raison pour laquelle la même consigne peut donner deux textes : le [non-déterminisme](/notions/non-determinism) est dans le mécanisme.

Le modèle ne vérifie pas qu'un token est vrai. Il vérifie qu'il est vraisemblable à cet endroit. C'est de là que vient une réponse inventée avec aplomb. Il s'engage aussi token après token : une première phrase trop sûre oriente toute la suite, parce que la suite est prédite à partir de ce début.

La vitesse en découle. Tant que la sortie s'écrit un token à la fois, aucun agent ne va plus vite que cette écriture, quels que soient les outils autour.

## À éviter

- Imaginer une étape séparée où le modèle « décide » puis rédige.
- Lire une ouverture confiante comme une vérification déjà faite.

## En situation

> « Comment l'agent décide-t-il d'appeler un outil ? »

> « Il ne décide pas à part. C'est encore de la prédiction de token. L'appel d'outil est une chaîne structurée que le harnais reconnaît dans le flux. »
