---
term: Human review
slug: human-review
section: patterns
description: "L’humain lit le code produit par l’agent et s’en fait un jugement. Lire le diff compte ; lire le résumé de l’agent, non."
sourceTerm: Human review
related:
  - automated-review
  - automated-check
  - primary-source
  - afk
---

La relecture humaine (human review) est la lecture, par toi, du code que l’[agent](/notions/agent) a produit, pour t’en faire un jugement. Lire le diff ou les fichiers modifiés compte ; lire la description que l’agent donne de son travail ne compte pas. Le récit n’est pas l’artefact : la description est une [source secondaire](/notions/secondary-source), écrite par la partie que l’on relit ; le diff est la [source primaire](/notions/primary-source), et relire veut dire le lire.

Les agents multiplient le volume de code produit, et la relecture devient le goulot. La parade est d’étager les couches : les [vérifications automatiques](/notions/automated-check) attrapent les échecs mécaniques, la [relecture automatisée](/notions/automated-review) les problèmes descriptibles, et la relecture humaine se réserve ce que toi seul peux juger — si le changement est le bon, si l’approche convient à la base de code, si la chose devrait exister tout court.

La relecture coûte aussi moins cher tôt. Lire un plan avant que le travail ne commence, ou un petit diff en cours de route, prend des minutes ; exhumer une branche finie après une course [AFK](/notions/afk) prend bien plus. Où placer le point de relecture est une décision [human-in-the-loop](/notions/human-in-the-loop), pas une arrière-pensée.

## À éviter

- Dire « code review » tout court : ambigu entre relecture humaine et automatisée.
- Compter la lecture du résumé comme une relecture : le résumé est écrit par la partie que l’on relit.
- Tout garder pour la fin quand un plan ou un diff intermédiaire se lisait en quelques minutes.

## En situation

> « J’ai relu la sortie de la course AFK, c’est bon. »

> « Lu le diff, ou lu le résumé ? Le résumé parlait de suppression de code mort — la fonction était appelée depuis un fichier généré. »
