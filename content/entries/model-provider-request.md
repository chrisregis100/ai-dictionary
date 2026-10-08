---
term: Model provider request
slug: model-provider-request
section: model
description: "Un aller-retour vers le fournisseur. Un message peut en déclencher plusieurs dès que des outils répondent."
sourceTerm: Model provider request
related:
  - harness
  - model-provider
  - input-tokens
---

Une requête au fournisseur est un aller-retour : le [harnais](/notions/harness) envoie le contexte actuel, le [fournisseur](/notions/model-provider) renvoie une réponse, appel d'outil ou réponse finale. Un seul message de ta part peut en produire beaucoup, parce que chaque résultat d'outil relance une requête.

Chaque requête emporte l'ensemble : consigne, conversation, résultats d'outils. Le modèle ne garde rien entre deux appels. La quarantième requête renvoie ce que la trente-neuvième contenait, plus un résultat. Le cache de préfixe existe pour que cette répétition reste payable.

La requête est aussi l'unité de facture. Les [tokens d'entrée](/notions/input-tokens), les tokens de sortie et les réductions de cache se comptent par requête. Le coût ne suit pas la longueur de ta question. Il suit le nombre de requêtes multiplié par la taille du contexte de chacune.

Un tour, vu de toi, est un échange. « Répare le test » peut se dérouler ainsi.

| Requête | Le modèle renvoie | Le harnais |
| --- | --- | --- |
| 1 | Lancer les tests | Ajoute l'échec |
| 2 | Lire le fichier de test | Ajoute le fichier |
| 3 | Lire la source | Ajoute la source |
| 4 | Modifier la source | Applique l'édition |
| 5 | Relancer les tests | Ajoute le succès |
| 6 | Réponse finale | Te l'affiche |

Six requêtes, un tour. Pour savoir où sont passés les tokens, compte les requêtes.

## À éviter

- Confondre un message utilisateur et une seule requête facturée.
- Chercher le coût dans la réponse visible, en ignorant les allers-retours d'outils.

## En situation

> « Une question a brûlé quarante mille tokens ? »

> « Regarde les outils : des recherches, des lectures, des éditions. Chaque résultat ouvre une nouvelle requête, et le préfixe de session repart à chaque fois. »
