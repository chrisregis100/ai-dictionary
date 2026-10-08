---
term: Tool result
slug: tool-result
section: tools
description: "Ce que le harnais renvoie après un appel d'outil : contenu, sortie ou erreur. La seule vue de l'agent sur l'environnement."
sourceTerm: Tool result
related:
  - tool-call
  - environment
  - context-window
---

Le tool result — le résultat d'outil — est ce que le [harnais](/notions/harness) renvoie après avoir exécuté un [appel d'outil](/notions/tool-call) : le contenu du fichier, la sortie de la commande, l'erreur. C'est la seule vue de l'[agent](/notions/agent) sur l'[environnement](/notions/environment). Le résultat repart vers le [modèle](/notions/model) dans la requête suivante, où le modèle décide quoi en faire. Appel et résultat sont les deux bouts du même échange, à l'intérieur d'un même [tour](/notions/turn).

Le résultat reste dans le [contexte](/notions/context) pour tout le reste de la [session](/notions/session). Les résultats d'outils font d'ordinaire le gros du contexte d'une session de code : chaque fichier lu, chaque test lancé, chaque recherche arrive en entier et continue d'occuper des tokens longtemps après avoir cessé de servir. Quelques gros résultats — un log de test verbeux, un fichier généré lu en entier — poussent la session vers le bord de la [fenêtre de contexte](/notions/context-window) plus vite que la conversation elle-même.

Le modèle ne voit que le résultat et n'a aucun moyen de vérifier l'environnement derrière. Sortie tronquée, commande qui a échoué sans bruit, erreur renvoyée à la place du contenu : le modèle raisonne avec ce qu'on lui a donné. Quand l'image que l'agent se fait de ton système semble fausse, c'est dans les résultats d'outils qu'il faut regarder : quelque part dans la transcription, un résultat dit autre chose que ce que tu sais vrai.

## À éviter

- Chercher une faute de raisonnement quand c'est le résultat d'outil qui était tronqué ou en erreur.
- Laisser des sorties verbeuses s'accumuler sans se demander ce qu'elles coûtent en fenêtre.

## En situation

> « Il raisonne comme si le fichier était vide. »

> « Le résultat d'outil était un refus de permission, pas le contenu. Le modèle n'a vu que la chaîne d'erreur : il n'a aucun autre moyen de voir le fichier. »
