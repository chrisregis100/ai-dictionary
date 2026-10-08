---
term: Hallucination
slug: hallucination
section: failures
description: "Sortie fausse énoncée avec aplomb. Deux formes : faits inventés (factualité) ou dérive par rapport au contexte chargé (fidélité)."
sourceTerm: Hallucination
related:
  - parametric-knowledge
  - contextual-knowledge
  - attention-degradation
  - smart-zone
---

L'hallucination est une sortie fausse énoncée avec l'assurance d'une sortie juste. Le mot recouvre deux pannes distinctes : la factualité, où le [modèle](/notions/model) invente un fait sur le monde — une fonction qui n'existe pas, une mauvaise signature d'API, une citation fabriquée — et la fidélité, où la sortie dérive de ce qui est pourtant chargé dans le contexte, des instructions, ou de son propre raisonnement.

| Forme | Ce qui casse | Cause | Remède |
| --- | --- | --- | --- |
| Factualité | Faits inventés sur le monde | Trous dans la [connaissance paramétrique](/notions/parametric-knowledge), souvent après la [date de coupure](/notions/knowledge-cutoff) | Charger la bonne [connaissance contextuelle](/notions/contextual-knowledge) |
| Fidélité | Dérive par rapport au contexte chargé | [Dégradation de l'attention](/notions/attention-degradation), pire en [zone bête](/notions/smart-zone) | [Vider](/notions/clearing) ou [compacter](/notions/compaction) |

La [prédiction du token suivant](/notions/next-token-prediction) produit un texte fluide, que le fait soit réel ou non. Le modèle n'a aucun signal interne lui disant qu'il ne sait pas : une méthode inventée arrive sur le même ton assuré qu'une méthode réelle. Le code halluciné est plausible par construction — c'est ce à quoi l'API ressemblerait si elle existait — ce qui lui permet de passer une relecture rapide et de ne casser qu'à l'exécution.

Identifier la forme compte, parce que le remède de l'une aggrave l'autre. La factualité est un manque de connaissance : on ajoute du contexte — les docs, les définitions de types, le fichier. La fidélité est une connaissance présente mais noyée : on retire du contexte. Diagnostiquer à tort une fidélité comme une factualité conduit à coller plus de docs, ce qui grossit le contexte et aggrave la dérive. Devant une erreur, vérifie d'abord si l'information juste était déjà dans le contexte.

## À éviter

- « Hallucination » comme simple synonyme de « faux » : sans nommer la forme, le mot n'a aucune valeur de diagnostic.
- Ajouter des docs par réflexe, sans vérifier si elles étaient déjà chargées.

## En situation

> « Il invente une méthode sur le schéma, alors que les docs que j'ai collées la décrivent correctement. »

> « Hallucination de fidélité, donc : l'information est dans le contexte, mais elle a perdu la compétition pour l'attention. Compacte et recharge, n'ajoute pas de docs. »
