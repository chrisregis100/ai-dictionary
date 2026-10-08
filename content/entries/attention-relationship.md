---
term: Attention relationship
slug: attention-relationship
section: failures
description: "Lien calculé entre deux tokens du contexte. Un contexte de N tokens en compte environ N², refaits à chaque requête."
sourceTerm: Attention relationship
related:
  - token
  - attention-budget
  - attention-degradation
  - context
---

Une attention relationship — une relation d'attention — est le lien que le [modèle](/notions/model) calcule entre deux [tokens](/notions/token) du [contexte](/notions/context). Pour prédire chaque token, le modèle pèse tous les autres : certains lourdement, la plupart à peine. Les paires qui ont du sens — « elle » avec « Sarah », un appel `getUser()` avec sa définition `function getUser` — s'influencent plus que les paires sans rapport. Un contexte de N tokens contient de l'ordre de N² relations.

C'est dans ces paires que loge la compréhension apparente. Un pronom résolu, c'est une relation forte entre le pronom et son antécédent. Un appel de fonction avec les bons arguments, c'est la relation entre le site d'appel et la définition lue plus tôt qui fait le travail. Rien de tout ça n'est stocké : tout est recalculé à chaque [requête](/notions/model-provider-request), pour chaque paire. Et chaque paire est calculée plusieurs fois, parce que le modèle a des dizaines de têtes d'attention et que chaque tête calcule sa propre version de chaque relation.

Le chiffre N² grandit plus vite que l'intuition.

| Taille du contexte | Relations (~N²) |
| --- | --- |
| 1 000 tokens | ~1 million |
| 10 000 tokens | ~100 millions |
| 100 000 tokens | ~10 milliards |

Seule une poignée de ces relations compte pour une tâche donnée. La paire entre ton instruction et le code qu'elle gouverne est l'une des rares qui importent ; presque tout le reste est du bruit. Et les deux ne croissent pas au même rythme : les relations utiles restent en nombre à peu près constant, le total croît au carré. À 1 000 tokens, la paire qui t'intéresse est une sur un million ; à 100 000, une sur dix milliards. C'est l'arithmétique sous le [budget d'attention](/notions/attention-budget), et la [dégradation de l'attention](/notions/attention-degradation) est l'effet ressenti quand les relations utiles reçoivent une part trop mince.

## À éviter

- Parler de relations « mémorisées » ou « apprises pendant la session » : tout est recalculé à chaque requête.
- Raisonner comme si doubler le contexte doublait le travail d'attention : il quadruple.

## En situation

> « Il confond les deux symboles user d'un bout à l'autre du diff. »

> « Même forme de token, liaisons différentes : la relation d'attention entre chaque site d'appel et sa déclaration se bat contre l'autre. Renomme l'un des deux et les paires redeviennent nettes. »
