---
term: Harness
slug: harness
section: model
description: "Entourage du modèle : outils, consigne, permissions, historique. C'est lui qui en fait un agent."
sourceTerm: Harness
related:
  - model
  - model-provider
  - model-provider-request
---

Le harnais est tout ce qui entoure le [modèle](/notions/model) pour en faire un agent : outils, consigne système, gestion de la fenêtre, permissions, historique. Deux produits peuvent partager un modèle et se comporter autrement, parce que leurs harnais diffèrent.

Le modèle ne fait qu'une chose : du texte entre, du texte sort. Il ne lit pas un fichier et ne lance pas une commande. Le harnais assemble le contexte de chaque [requête](/notions/model-provider-request), exécute l'appel d'outil demandé, réinjecte le résultat, garde la session, demande une permission avant une action risquée, et décide quand raccourcir l'historique. La boucle « le modèle propose, le harnais exécute » est la sienne.

Quand le comportement change entre deux produits, ou entre hier et aujourd'hui, le modèle n'est souvent pas la variable. Une autre consigne, d'autres outils, une permission par défaut différente suffisent. La configuration que tu écris (fichier d'instructions, réglages de permission) s'adresse au harnais, pas aux paramètres.

Exemples : un agent dans l'éditeur, un CLI de codage, un chat généraliste. Le chat est un harnais de conversation. L'agent de code est un harnais avec fichiers et terminal.

## À éviter

- Dire « le modèle édite les fichiers » quand c'est le harnais qui applique l'édition.
- Comparer deux produits comme si seul le nom du modèle comptait.

## En situation

> « Même modèle : pourquoi l'un modifie les fichiers et l'autre ne fait que répondre ? »

> « Harnais différents. L'un a des outils sur le disque, une autre consigne, une couche de permission. Le modèle n'est pas ce qui varie. »
