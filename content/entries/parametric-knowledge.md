---
term: Parametric knowledge
slug: parametric-knowledge
section: failures
description: "Ce que le modèle sait par l'entraînement, stocké dans ses paramètres. Figé, flou sur le rare, muet après la date de coupure."
sourceTerm: Parametric knowledge
related:
  - training
  - parameters
  - knowledge-cutoff
  - contextual-knowledge
---

La connaissance paramétrique est ce que le [modèle](/notions/model) « sait » sans rien lire : ce que l'[entraînement](/notions/training) a déposé dans ses [paramètres](/notions/parameters). Elle est figée à la fin de l'entraînement — le modèle ne peut ni consulter ses paramètres ni les mettre à jour. C'est le pendant de la [connaissance contextuelle](/notions/contextual-knowledge), celle qui se lit dans la fenêtre.

Elle n'est pas stockée sous forme de faits. L'entraînement ne fournit aucune base de données où chercher : il ajuste des paramètres jusqu'à ce que le modèle prédise bien le texte, et un modèle qui prédit bien le texte d'un sujet se comporte comme s'il connaissait le sujet. La fiabilité suit la fréquence dans les données d'entraînement : un sujet vu des millions de fois est restitué avec précision ; un sujet vu quelques fois est deviné par analogie avec ce qui lui ressemble. Restituer et deviner sont le même calcul pour le modèle, qui ne peut pas distinguer lequel il est en train de faire. Une réponse fabriquée sort avec la même aisance qu'une réponse exacte — l'[hallucination](/notions/hallucination) de factualité, c'est le modèle qui devine faux.

Elle vieillit aussi. Les paramètres cessent de changer à la [date de coupure](/notions/knowledge-cutoff) : une bibliothèque sortie ou renommée après n'existe pas dedans, et une API qui a changé reste mémorisée dans son ancienne forme.

Pour les deux trous — trop rare et trop récent — le remède est le même. On ne peut rien ajouter aux paramètres ; la connaissance manquante doit être fournie en connaissance contextuelle, dans la fenêtre.

## À éviter

- Imaginer une base de faits que le modèle consulterait : il n'y a que des paramètres qui prédisent du texte.
- Reposer la question en espérant corriger un trou paramétrique : la réponse reste devinée tant que les docs ne sont pas chargées.

## En situation

> « Il écrit du React impeccable mais invente des méthodes sur notre SDK interne. »

> « React est dense dans la connaissance paramétrique : des millions d'exemples d'entraînement. Ton SDK n'y est pas, alors le modèle remplit avec des formes plausibles. Charge les docs du SDK dans le contexte. »
