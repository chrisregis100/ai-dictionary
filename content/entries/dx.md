---
term: DX
slug: dx
section: patterns
description: "Developer experience : la facilité qu’une base de code et son outillage offrent aux humains — docs, retours rapides, erreurs claires."
sourceTerm: DX
related:
  - ax
  - stateful
  - stateless
  - agents-md
---

DX, pour developer experience — l’expérience développeur : la facilité avec laquelle une base de code et son outillage laissent des humains bien travailler. Une bonne DX, c’est des retours rapides, des messages d’erreur clairs, une documentation qui répond à la question qu’on se pose vraiment, une installation qui marche du premier coup. Le terme précède largement le codage avec IA ; il figure ici surtout comme contraste de l’[AX](/notions/ax).

La DX concerne l’interaction entre l’humain et la base de code, rien de plus. La grande différence entre les deux publics : l’humain est [stateful](/notions/stateful), l’agent est [stateless](/notions/stateless). Un humain apprend la base une fois et garde l’acquis chaque jour suivant, ce qui rend une mauvaise DX survivable : il contourne la CI lente en groupant ses push, la doc manquante en demandant une fois sur Slack, la structure confuse en retenant où vivent les choses. Les contournements s’accumulent, et une équipe finit productive dans une base qui lui résiste.

L’[agent](/notions/agent) affronte la même base sans rien de cet acquis. Stateless d’une [session](/notions/session) à l’autre, il réapprend la base à chaque fois : il profite de la suite de tests rapide et des erreurs claires, mais ce qu’il a compris hier a disparu, sauf si c’était écrit dans l’[environnement](/notions/environment), qu’il ne perçoit qu’à travers des résultats d’outil. C’est l’écart que nomme l’AX : la part de la DX qui survit quand le développeur est un agent, plus des soucis que les humains n’ont pas, comme garder la [fenêtre de contexte](/notions/context-window) libre.

Le recouvrement fait qu’un investissement DX améliore souvent l’AX gratuitement : types stricts, tests rapides et structure prévisible servent les deux publics. La divergence fait que pas toujours : un beau document d’onboarding aide un humain pendant une semaine, et un agent pas du tout s’il n’est pas atteignable depuis [AGENTS.md](/notions/agents-md).

## À éviter

- Conclure de « les nouveaux sont productifs en une semaine » que l’agent s’en sortira : la semaine d’accompagnement, l’agent ne l’a pas.
- Traiter DX et AX comme un seul chantier : les deux publics demandent des investissements différents.

## En situation

> « Notre DX est bonne : un nouveau est productif en une semaine. »

> « Productif parce que quelqu’un passe la semaine à côté de lui. L’agent n’a pas cette semaine : vérifie l’AX à part. »
