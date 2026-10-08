---
term: Automated review
slug: automated-review
section: patterns
description: "Un agent relit le travail d’un autre, souvent avec un autre modèle ou une autre consigne. Un jugement, pas un verdict binaire."
sourceTerm: Automated review
related:
  - automated-check
  - human-review
  - subagent
  - system-prompt
---

La relecture automatisée (automated review) est la relecture du travail d’un [agent](/notions/agent) par un autre agent, souvent avec un autre [modèle](/notions/model) ou une autre [consigne système](/notions/system-prompt). Elle est non déterministe : elle forme un jugement. Elle peut tourner n’importe où — sur une PR avant fusion, sur l’historique après coup, en cours de session via un [sous-agent](/notions/subagent). Un LLM-juge dans la CI est une relecture automatisée, pas une [vérification automatique](/notions/automated-check) : c’est la nature de l’assertion qui décide de la catégorie, pas l’endroit où elle tourne.

La séparation d’avec l’agent qui a écrit le code fait tout. Demander à l’auteur de relire son propre travail rapporte très peu : la [session](/notions/session) qui a produit le bug contient aussi le raisonnement qui l’a produit, et l’agent relit ses conclusions comme des confirmations. Un relecteur à la [fenêtre de contexte](/notions/context-window) vierge n’a aucun de ces attachements : il voit le diff comme un étranger, ce dont la relecture dépend. Un autre modèle ou une consigne dédiée à la relecture affûtent encore : d’autres angles morts, et un périmètre précis — sécurité, contrats d’API, performance — plutôt qu’un vague « cherche des problèmes ».

Elle se place entre les deux autres couches de relecture :

| Couche | Nature | Attrape | Coût |
| --- | --- | --- | --- |
| Vérification automatique | Déterministe | Ce qui s’affirme mécaniquement | Machine |
| Relecture automatisée | Jugement | Un nom trompeur, un cas limite oublié | Machine |
| [Relecture humaine](/notions/human-review) | Jugement | Ce que toi seul peux juger | Attention |

Parce qu’elle est non déterministe, elle rate des choses et en signale à tort. Traite-la comme un filtre qui relève le niveau avant qu’un humain ne regarde, pas comme une barrière qui le remplace.

## À éviter

- Dire « relecture IA » ou « relecture par l’agent » : trop vague pour la distinguer de l’agent qui travaille.
- Faire relire son propre code à l’agent qui l’a écrit : il relit ses conclusions comme des confirmations.
- La traiter en barrière qui dispense de relecture humaine : c’est un filtre, pas une garantie.

## En situation

> « On reçoit trop de mauvaises PR des courses AFK. »

> « Ajoute une relecture automatisée avant la fusion : autre modèle, consigne séparée, périmètre limité à la sécurité et aux contrats d’API. »
