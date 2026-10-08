---
term: Agent mode
slug: agent-mode
section: tools
description: "Préréglage qui couple un mode de permission et des consignes injectées dans le system prompt. Peut changer en cours de session."
sourceTerm: Agent mode
related:
  - permission-mode
  - system-prompt
  - sandbox
  - session
---

L'agent mode — le mode d'agent — est un préréglage qui façonne la conduite de l'[agent](/notions/agent) : il couple un [mode de permission](/notions/permission-mode) avec des consignes de comportement injectées dans le [system prompt](/notions/system-prompt). Exemples : un défaut qui demande sur les appels risqués, un mode plan qui bloque les éditions et oriente vers la recherche, un mode accept-edits qui approuve les éditions d'office, un mode bypass (dit « YOLO ») qui approuve tout. Le mode peut changer en cours de [session](/notions/session).

Le couplage est ce qui distingue un mode d'un simple réglage de permission. Un mode de permission n'est qu'une barrière : il décide quels [appels d'outils](/notions/tool-call) passent. Une barrière seule produit un agent qui veut éditer et ne peut pas : il propose l'écriture, se fait bloquer, essaie un autre chemin. Les consignes injectées retirent l'envie : le mode plan ne bloque pas seulement les éditions, il dit à l'agent qu'il est en phase de planification — alors il lit, questionne et propose, au lieu de pousser contre la barrière. Barrière et consigne pointent dans la même direction.

En pratique, on change de mode à mesure que la confiance change. Une même tâche peut en traverser plusieurs : plan tant que l'approche se dessine, le défaut pour les premières éditions délicates, accept-edits quand l'agent a montré qu'il a compris le changement, bypass pour une session [AFK](/notions/afk) dans un [bac à sable](/notions/sandbox). Changer ne coûte rien : la conversation reprend exactement où elle était, avec d'autres permissions et d'autres consignes.

Le bon réglage se lit à tes propres gestes. Si tu approuves chaque demande sans la lire, le mode est plus serré que ta confiance réelle ; si tu rejettes édition sur édition, il est plus lâche. Côté vocabulaire, Claude Code appelle ces préréglages « permission modes » et Codex « approval modes » : les deux noms précèdent l'ajout des consignes de comportement.

## À éviter

- Confondre mode d'agent et mode de permission : le premier contient le second, plus des consignes.
- Garder le même mode du début à la fin d'une tâche alors que la confiance a changé.

## En situation

> « Il édite des fichiers alors que je veux juste un plan. »

> « Passe en mode plan : il bloque les écritures et dit à l'agent de rester en recherche. Pour la session AFK de ce soir, bypass — mais seulement dans le bac à sable. »
