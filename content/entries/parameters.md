---
term: Parameters
slug: parameters
section: model
description: "Nombres internes du modèle, réglés pendant l'entraînement puis figés. Une session ne les modifie pas."
sourceTerm: Parameters
related:
  - model
  - training
  - inference
---

Les paramètres sont les nombres à l'intérieur d'un [modèle](/notions/model). On en compte souvent des milliards. On les appelle aussi des poids. Tout ce que le modèle « sait » sans qu'on le lui redonne tient dans ces nombres.

Le calcul du token suivant multiplie, en quelque sorte, le texte d'entrée par ces nombres. Il n'y a pas de base de faits à côté, ni de table des API. Une réponse juste sur une bibliothèque standard est un effet de ces nombres, pas une lecture.

Le point utile au quotidien : après l'[entraînement](/notions/training), les paramètres ne bougent plus. Corriger le modèle dans le chat, lui montrer le dépôt, lui signaler une erreur ne réécrit rien. La session d'après repart des mêmes nombres. C'est pour cela qu'une précision sur votre API interne doit arriver dans le contexte, pas dans l'espoir qu'il « apprenne ».

Changer les paramètres, c'est réentraîner, donc obtenir en pratique un autre modèle. Pour un seul produit, mettre le code et les docs dans le contexte coûte presque toujours moins cher.

## À éviter

- Croire qu'une correction de session met à jour les paramètres.
- Dire « le modèle a retenu » pour une info qui n'était que dans la conversation.

## En situation

> « On le fine-tune sur notre dépôt ? »

> « Ça réécrirait les paramètres : autre modèle à la fin. Pour un projet, charge le code en contexte. C'est le levier que tu contrôles. »
