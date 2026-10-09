---
term: Training
slug: training
section: model
description: "Processus coûteux, fait une fois par le fournisseur, qui ajuste les paramètres pour prédire le jeton suivant."
sourceTerm: Training
related:
  - parameters
  - inference
  - model
---

Training est le processus qui définit les [paramètres](/notions/parameters) d’un [modèle](/notions/model) en l’exposant à d’immenses quantités de texte et en ajustant ces paramètres pour améliorer la [prédiction du jeton (token) suivant](/notions/next-token-prediction). Il s’agit d’une opération coûteuse, effectuée une seule fois par le fournisseur du modèle. Ce processus englobe à la fois le pré-entraînement (la phase principale) et le post-entraînement (les affinages ultérieurs tels que le respect des instructions et les mesures de sécurité) ; cette distinction importe peu au niveau de ce glossaire.

Le mécanisme repose sur la répétition à grande échelle : on présente au modèle un segment de texte, on lui demande de prédire le jeton suivant, on ajuste ses paramètres pour les rapprocher du jeton réel, et l’on répète l’opération sur des milliers de milliards de jetons. Rien n’est stocké sous forme de faits ou de règles ; tout ce que le modèle « sait » résulte de l’amélioration de sa capacité de prédiction, ces informations étant compressées dans les paramètres sous forme de [connaissances paramétriques](/notions/parametric-knowledge).

Deux conséquences ont une incidence au quotidien. L’entraînement s’arrête à un moment précis, ce qui confère au modèle une date limite de connaissances (ou « [coupure de connaissances](/notions/knowledge-cutoff) ») : il ignore, par exemple, la version de la bibliothèque que vous avez installée le mois dernier. Par ailleurs, l’entraînement n’est pas une opération que vous pouvez effectuer vous-même : si le modèle ne connaît pas votre base de code, vos conventions ou vos API internes, la solution ne consiste jamais à « apprendre » ces éléments au modèle, mais plutôt à les intégrer au [contexte](/notions/context), qui est le seul élément d’entrée que vous maîtrisez.

## À éviter

- Traiter le pré-entraînement et le post-entraînement comme deux opérations à distinguer à ce niveau du glossaire.
- Chercher à « apprendre » au modèle votre base de code, vos conventions ou vos API internes.

## En situation

> « Peut-on faire en sorte qu’il connaisse notre API interne ? »

> « Pas par l’entraînement ; c’est un processus qui prend des mois et qui est géré par le fournisseur du modèle. Intégrez plutôt la documentation de l’API au contexte : c’est le levier dont vous disposez réellement. »
