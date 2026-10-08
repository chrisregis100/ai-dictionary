---
term: Model
slug: model
section: model
description: "Nombres figés qui prédisent le token suivant. Sans harnais, le modèle ne lit rien et ne retient rien."
sourceTerm: Model
related:
  - parameters
  - harness
  - token
---

Un modèle est l'ensemble de nombres qui, à partir d'un texte déjà écrit, propose la suite. « Claude Opus » ou « GPT » sont des noms de modèles. Le calcul s'arrête là : des [tokens](/notions/token) entrent, un token suivant sort.

Seul, un modèle n'ouvre pas un fichier, ne lance pas une commande et ne se souvient pas de la veille. Lire le dépôt, appeler un outil, enchaîner jusqu'à ce que le test passe : tout cela vient du [harnais](/notions/harness), qui relance le modèle autant de fois qu'il le faut.

Les fournisseurs publient des tailles. La plus grande est en général plus capable, plus lente et plus chère. Une plus petite suffit souvent pour un renommage ou une recherche mécanique. Changer de taille en cours de session est un vrai choix, pas un détail d'interface.

« Le modèle est mauvais ici » est une affirmation étroite. Le même modèle, avec d'autres outils ou un autre dossier sous les yeux, peut très bien s'en sortir. Avant de changer de modèle, regarde ce qu'on lui a donné.

## À éviter

- Modèle pour parler de l'éditeur, du chat ou de l'agent entier.
- Conclure qu'il faut un plus gros modèle alors que la consigne ou les fichiers sont faux.

## En situation

> « On passe de Sonnet à Opus pour l'étape de plan ? »

> « Essaie, mais vérifie d'abord les outils et la consigne. Si ceux-là sont à côté, le changement de modèle ne rattrape pas le travail. »
