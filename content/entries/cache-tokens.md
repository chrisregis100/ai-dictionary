---
term: Cache tokens
slug: cache-tokens
section: model
description: "Part de l'entrée déjà calculée par le fournisseur, facturée moins cher tant que le préfixe ne change pas."
sourceTerm: Cache tokens
related:
  - prefix-cache
  - input-tokens
  - model-provider-request
---

Les tokens de cache sont des [tokens d'entrée](/notions/input-tokens) que le fournisseur a déjà traités lors d'une [requête](/notions/model-provider-request) précédente. Quand deux requêtes partagent un préfixe, le [cache de préfixe](/notions/prefix-cache) réutilise ce travail et facture cette part bien moins cher, souvent autour d'un dixième du tarif d'entrée, parfois moins. Sans eux, chaque tour repaierait tout l'historique.

Le modèle ne garde rien, donc chaque requête renvoie la consigne, tous les messages et tous les résultats d'outils. Au cinquantième tour, la requête porte cinquante tours. Le cache change le calcul : la partie déjà vue, identique depuis le début, devient des tokens de cache. Sur une longue session, c'est la majorité de ce que tu envoies, et la facture reste tenable.

Chaque lettre ci-dessous est un bloc. On regarde ce qui est encore au tarif plein.

| Requête | En cache | Au tarif plein | Pourquoi |
| --- | --- | --- | --- |
| AB | rien | AB | Première requête, rien à comparer |
| ABC | AB | C | AB est le préfixe exact de la précédente |
| ABCD | ABC | D | Le préfixe tient encore |
| AXCD | A | XCD | B a été remplacé par X, la suite ne correspond plus |

Le rapprochement est exact, pas approximatif. Un réordonnancement, une horloge, une représentation de fichier qui bouge, et tout ce qui suit le premier écart repasse au tarif d'entrée. Le cache expire aussi après quelques minutes d'inaction : reprendre une session paie l'historique une fois.

Quand le coût d'une session saute sans cause visible, compare les tokens de cache aux tokens d'entrée dans le rapport d'usage. Un cache cassé se voit là en premier.

## À éviter

- Lire seulement le total de tokens, sans séparer cache et entrée pleine.
- Réordonner la consigne ou les fichiers entre deux tours.

## En situation

> « Les longues sessions coûtent trop : huit dollars pour un refactor. »

> « Regarde les tokens de cache. Si le harnais réordonne la consigne ou les fichiers, le préfixe casse et tu repaies le tarif d'entrée à chaque requête. »
