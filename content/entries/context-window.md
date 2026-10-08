---
term: Context window
slug: context-window
section: sessions
description: "Tout ce que le modèle voit à chaque requête : une suite finie de tokens. Hors de la fenêtre, rien n'existe pour lui."
sourceTerm: Context window
related:
  - token
  - model-provider-request
  - context
  - compaction
---

La fenêtre de contexte est tout ce que le [modèle](/notions/model) voit lors d'une [requête](/notions/model-provider-request). Elle est finie, sa taille dépend du modèle, et c'est la seule surface par laquelle le modèle perçoit quoi que ce soit.

C'est une unique suite de [tokens](/notions/token) : la [consigne système](/notions/system-prompt), la conversation jusqu'ici, chaque [résultat d'outil](/notions/tool-result) que le [harnais](/notions/harness) a réinjecté. Ce qui figure dans cette suite est utilisable ; ce qui n'y figure pas n'existe pas pour le modèle — ni ton dépôt, ni le fichier édité hier, ni la consigne donnée il y a trois sessions. Tout ce qui est dehors doit être ramené dedans, en général par un [appel d'outil](/notions/tool-call), avant de pouvoir peser sur quoi que ce soit.

Finie veut dire qu'elle se remplit. Chaque tour ajoute tes messages, les réponses du modèle, les résultats d'outils ; une longue [session](/notions/session) finit par toucher la limite et force une [compaction](/notions/compaction) ou un [nettoyage](/notions/clearing). Tout ce qui est dans la fenêtre se dispute aussi l'attention du modèle : un token chargé pour rien prend de la place et consomme du [budget d'attention](/notions/attention-budget). Traite la fenêtre comme un budget : charge ce que la tâche demande, laisse le reste dehors.

## À éviter

- Appeler la fenêtre « mémoire » : elle ne survit pas à la session. La mémoire est une couche séparée, posée au-dessus.
- Coller un dossier entier « au cas où » : chaque token inutile se paie en place et en attention.

## En situation

> « Je peux coller tout le monorepo dans le prompt ? »

> « La fenêtre fait 200 000 tokens, peut-être un cinquième du dépôt. Prends les fichiers que la tâche touche, laisse le reste derrière un appel d'outil. »
