---
term: Progressive disclosure
slug: progressive-disclosure
section: memory
description: "Ne charger que le contexte utile à la tâche en cours, des pointeurs pour le reste. Technique empruntée au design d’interface."
sourceTerm: Progressive disclosure
related:
  - context-pointer
  - skill
  - agents-md
  - attention-budget
---

La progressive disclosure (divulgation progressive) consiste à ne charger dans le [contexte](/notions/context) que ce dont l’[agent](/notions/agent) a besoin maintenant, avec des [pointeurs](/notions/context-pointer) vers le reste. Le terme vient du design d’interface, où l’on ne montre que les commandes utiles à la tâche en cours et où le reste attend derrière un clic.

La technique répond à un double coût. Chaque token chargé d’avance est facturé en [tokens d’entrée](/notions/input-tokens) à chaque [tour](/notions/turn), et consomme du [budget d’attention](/notions/attention-budget), que l’agent s’en serve ou non. Un [AGENTS.md](/notions/agents-md) gonflé du guide de style, du runbook de déploiement et des conventions de base de données rend l’agent moins bon sur chacun : les consignes utiles à la tâche sont noyées dans les autres.

Le symptôme : l’agent ignore une règle qu’on sait présente dans son contexte. Elle y est, mais enterrée.

En pratique, la couche toujours chargée reste petite : une phrase par sujet et un pointeur vers le détail. L’agent lit le guide de style quand il écrit un composant, le runbook quand il déploie, et ni l’un ni l’autre quand il corrige un test. Les [skills](/notions/skill) sont ce motif intégré au [harnais](/notions/harness) : une description courte chargée à chaque [session](/notions/session), les instructions complètes seulement quand la tâche s’y prête.

## À éviter

- « Autant tout charger, au cas où » : chaque ligne superflue dilue celles qui comptent.
- Conclure qu’une règle ignorée est absente du contexte : elle est souvent présente, mais noyée.

## En situation

> « On a documenté toutes nos conventions. Je charge tout dans la consigne ? »

> « Une phrase par sujet et un pointeur vers le détail. L’agent ouvrira le document des migrations le jour où il écrira une migration. »
