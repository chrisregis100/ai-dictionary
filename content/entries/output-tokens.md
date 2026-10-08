---
term: Output tokens
slug: output-tokens
section: model
description: "Tokens écrits par le modèle, un par un. Ils coûtent plus cher que l'entrée, raisonnement caché compris."
sourceTerm: Output tokens
related:
  - token
  - effort
  - inference
---

Les tokens de sortie sont ceux que le modèle produit en retour. Ils sont facturés plus cher que les tokens d'entrée, souvent autour de cinq fois plus, parce qu'ils demandent plus de calcul. L'[inférence](/notions/inference) les écrit un [token](/notions/token) à la fois.

Tout ce que le modèle écrit compte : le texte que tu lis, le code, les appels d'outils, et le raisonnement qu'il déroule avant de répondre. Ce dernier poste surprend. Ces tokens sont facturés même quand le harnais ne les montre pas. Monter l'[effort](/notions/effort) en dépense davantage.

Les tokens de sortie donnent aussi le rythme. Le modèle avale l'entrée vite, puis écrit lentement. Un tour qui semble long est presque toujours une sortie en train de s'écrire, pas une entrée en train d'être lue. Une longue attente annonce en général une longue réponse.

Réécrire un fichier entier là où un correctif ciblé suffisait multiplie cette sortie. Demander des éditions courtes, plutôt qu'une réécriture, baisse la facture sans changer de modèle.

## À éviter

- Oublier le raisonnement caché dans le décompte de sortie.
- Laisser l'agent réécrire des fichiers complets quand un patch suffit.

## En situation

> « La session de refactor coûte cher, alors que les fichiers d'entrée sont petits. »

> « Il réécrit des fichiers au lieu de patcher. La sortie est bien plus chère que l'entrée. Fais-lui émettre des éditions. »
