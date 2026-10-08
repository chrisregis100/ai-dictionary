---
term: Tool call
slug: tool-call
section: tools
description: "Sortie du modèle qui nomme un outil et ses arguments. Du texte structuré : rien ne se passe tant que le harnais n'exécute pas."
sourceTerm: Tool call
related:
  - tool
  - tool-result
  - harness
  - next-token-prediction
---

Le tool call — l'appel d'outil — est la sortie du [modèle](/notions/model) qui nomme un [outil](/notions/tool) et ses arguments. Ce n'est que du texte structuré : il ne fait rien par lui-même. Le [harnais](/notions/harness) doit le lire et l'exécuter.

Le cycle d'un appel d'outil :

| Étape | Qui | Ce qui se passe |
| --- | --- | --- |
| 1 | Modèle | Apprend quels outils existent par les descriptions envoyées avec la requête |
| 2 | Modèle | Émet l'appel — nom de l'outil plus arguments, souvent du JSON — et s'arrête |
| 3 | Harnais | Analyse l'appel et le vérifie contre le [mode de permission](/notions/permission-mode) |
| 4 | Harnais | L'exécute s'il est autorisé |
| 5 | Harnais | Renvoie l'issue comme [résultat d'outil](/notions/tool-result) dans la requête suivante |

Un [tour](/notions/turn) de travail d'agent enchaîne en général plusieurs de ces allers-retours.

L'appel sort par [prédiction du token suivant](/notions/next-token-prediction), comme tout le reste. Il peut donc être faux comme n'importe quelle sortie du modèle : un chemin qui n'existe pas, une option que la commande n'a pas, des arguments plausibles plutôt que justes. Le harnais exécute ce qui est écrit, pas ce qui était voulu : un chemin mal tapé ne proteste pas gentiment, il édite le mauvais fichier.

## À éviter

- Confondre « le modèle a décrit l'action » et « le modèle a émis un appel » : seul le second fait quelque chose.
- Supposer qu'un appel exécuté était l'appel voulu : les arguments sortent de la prédiction, pas du disque.

## En situation

> « Il dit avoir lancé les tests, mais les timestamps des fichiers n'ont pas bougé. »

> « Regarde la transcription : il a vraiment émis un appel d'outil, ou juste raconté qu'il testait ? Le modèle produit l'appel, mais si le harnais n'a rien exécuté, rien ne s'est passé. »
