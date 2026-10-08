---
term: AX
slug: ax
section: patterns
description: "Agent experience : la qualité de l’environnement offert à l’agent — vérifications, architecture lisible, contexte laissé libre."
sourceTerm: AX
related:
  - dx
  - automated-check
  - agents-md
  - context-window
---

AX, pour agent experience — l’expérience agent : la qualité de la mise en place de l’[environnement](/notions/environment) pour qu’un [agent](/notions/agent) travaille bien dans une base de code. C’est le pendant côté agent de la [DX](/notions/dx). Quand le même agent brille dans un dépôt et patauge dans un autre — même [modèle](/notions/model), même [harnais](/notions/harness) — la différence est le plus souvent l’AX. Le réflexe est d’accuser le modèle ou de réécrire le prompt ; le remède est plus souvent dans le dépôt.

Une bonne AX tient en trois dimensions :

| Dimension | Ce que ça donne |
| --- | --- |
| Vérifications | Des [vérifications automatiques](/notions/automated-check) rapides et déterministes — types, tests, lint — dont l’agent se corrige sans humain |
| Architecture | Une base navigable sans tout lire : structure prévisible, beaucoup de comportement derrière de petites interfaces, des noms qui disent ce que font les choses |
| Contexte libre | [AGENTS.md](/notions/agents-md), [skills](/notions/skill) et outils tenus maigres, pour que l’essentiel de la [fenêtre de contexte](/notions/context-window) reste disponible pour la tâche |

AX et DX se recouvrent — bonnes vérifications et architecture propre servent les deux publics — mais divergent. Les humains tolèrent le savoir tribal, la CI lente et « demande à Sarah pour le module de facturation » ; les agents ne le peuvent pas. Les agents ne profitent ni des infobulles de l’IDE ni des beaux tableaux de bord ; il leur faut les échecs en texte, dans un [résultat d’outil](/notions/tool-result). Une base peut avoir une bonne DX et une mauvaise AX.

## À éviter

- Employer AX comme synonyme de DX : les deux publics demandent des investissements différents.
- Accuser le modèle quand le même agent réussit ailleurs : comparer d’abord les dépôts.

## En situation

> « L’agent écrit du très bon code dans le dépôt API et n’importe quoi dans le frontend. »

> « L’API a des types stricts et des tests rapides ; le frontend n’a ni l’un ni l’autre, et quarante skills toujours chargés. C’est un écart d’AX, pas un problème de modèle. »
