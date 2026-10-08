---
term: Token
slug: token
section: model
description: "Unité lue et écrite par le modèle. Proche d'un mot, sans coïncider. Coût, délai et fenêtre s'y comptent."
sourceTerm: Token
related:
  - model
  - input-tokens
  - output-tokens
---

Le token est le grain avec lequel un [modèle](/notions/model) lit et écrit. Il a souvent la taille d'un mot, sans en épouser les bords. Un mot courant tient en un token. Un mot rare ou très long se coupe en plusieurs. La fenêtre de contexte, le prix et la latence se comptent en tokens, pas en pages.

Un tokenizer, fixé avant l'entraînement, découpe tout texte en morceaux d'un vocabulaire de quelques dizaines de milliers d'entrées. Le modèle ne voit ni caractères ni mots. À la sortie, la prédiction avance d'un token à la fois.

En ordre de grandeur, un token anglais vaut environ trois quarts de mot : mille tokens, c'est près de 750 mots. Le code est moins régulier. `function` est souvent un seul token. Un hash, un identifiant généré ou un bloc base64 se découpe en beaucoup de petits morceaux, parce que ces chaînes n'étaient pas fréquentes dans le matériau du tokenizer. Un fichier court, plein de chaînes inhabituelles, peut donc occuper une part surprenante de la fenêtre.

Le prix sépare les [tokens d'entrée](/notions/input-tokens) et les [tokens de sortie](/notions/output-tokens). La vitesse d'écriture se mesure en tokens par seconde, puisque la sortie se produit un token après l'autre.

## À éviter

- Compter en mots quand la décision porte sur le coût ou la fenêtre.
- Juger la taille d'un fichier à l'œil quand il est plein d'identifiants ou de données encodées.

## En situation

> « Ce prompt va faire quelle taille ? »

> « Passe-le au tokenizer. Le schéma est court, mais les clés JSON sont bizarres : elles vont se couper en plus de tokens que la ligne ne le laisse croire. »
