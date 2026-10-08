---
term: Tool
slug: tool
section: tools
description: "Fonction que le harnais expose au modèle : Read, Write, Bash. Le seul moyen pour l'agent de percevoir et d'agir sur le monde."
sourceTerm: Tool
related:
  - harness
  - tool-call
  - tool-result
  - mcp
---

Le tool — l'outil — est une fonction que le [harnais](/notions/harness) expose pour que l'agent l'appelle : Read, Write, Bash, Search. Les outils sont le seul moyen pour un [agent](/notions/agent) de percevoir et de modifier l'[environnement](/notions/environment) : il ne voit rien sauf par les [résultats d'outils](/notions/tool-result), il ne change rien sauf par les [appels d'outils](/notions/tool-call).

Un outil se définit par trois choses : un nom, une description de ce qu'il fait, un schéma de paramètres. Le harnais envoie ces définitions au [modèle](/notions/model) à chaque requête, et le modèle choisit un outil comme il produit tout le reste : en écrivant des tokens, ici un appel structuré avec des arguments. Le modèle n'exécute jamais rien lui-même ; le harnais lit l'appel, lance la fonction, renvoie le résultat. Chaque appel coûte une [requête](/notions/model-provider-request) de plus, puisque le résultat doit revenir au modèle avant la décision suivante.

Les outils que la plupart des agents de code embarquent :

| Outil | Ce qu'il fait |
| --- | --- |
| Read | Renvoie le contenu d'un fichier comme résultat d'outil |
| Write | Crée ou modifie un fichier du [système de fichiers](/notions/filesystem) |
| Bash | Lance une commande shell et renvoie sa sortie |
| Search | Trouve les fichiers ou le texte correspondant à un motif |

La liste d'outils fixe ce que l'agent peut faire. Un modèle capable avec un jeu d'outils étroit reste un agent étroit : il fait tout passer par ce qu'il a. C'est pourquoi les agents s'appuient tant sur Bash — un shell est un seul outil qui atteint presque tout le système. Pour donner une capacité proprement, on ajoute un outil ; [MCP](/notions/mcp) est le standard pour en brancher depuis l'extérieur du harnais.

Les définitions d'outils occupent du [contexte](/notions/context) à chaque requête. Un grand jeu d'outils a donc un coût fixe avant le moindre appel, et des outils aux descriptions voisines rendent le modèle moins bon pour choisir le bon.

## À éviter

- Dire « le modèle a lancé la commande » : le modèle écrit l'appel, le harnais exécute.
- Empiler les outils « au cas où » sans compter ce que leurs définitions coûtent en contexte.

## En situation

> « L'agent peut interroger staging directement ? »

> « Ajoute un outil psql au harnais, en lecture seule sur staging. Sans outil pour ça, l'agent est aveugle à tout ce qui sort du système de fichiers. »
