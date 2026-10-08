---
term: Human-in-the-loop
slug: human-in-the-loop
section: patterns
description: "Mode de travail où l’humain reste présent pendant la session : il lit, répond et réoriente l’agent en temps réel."
sourceTerm: Human-in-the-loop
related:
  - afk
  - grilling
  - human-review
  - automated-check
---

Human-in-the-loop — l’humain dans la boucle — désigne le mode de travail où une personne accompagne l’[agent](/notions/agent) pendant la [session](/notions/session) : elle lit ce qu’il fait, répond à ses questions, le réoriente en cours de route. La personne est présente et engagée, pas seulement là pour approuver des actions une par une.

L’intérêt est d’attraper les erreurs quand elles coûtent encore peu. L’agent ouvre le mauvais fichier, comprend l’exigence de travers, s’engage dans une impasse : une phrase suffit à le remettre sur la voie. Livré à lui-même, il ne sait pas de façon fiable qu’il déraille ; il avance plutôt que de s’arrêter pour demander, et vingt minutes de travail cohérent se construisent sur l’erreur du début. Le contraire est le travail [AFK](/notions/afk), où l’agent tourne sans surveillance et où l’on juge le résultat après coup.

Le choix dépend de la tâche. Bien spécifiée, peu risquée, facile à vérifier : l’AFK convient. Ambiguë, irréversible, difficile à relire une fois finie — une migration de schéma, une décision de conception délicate, tout ce qui touche la production — : rester dans la boucle. La question se résume au prix d’un mauvais virage et au moment où on le verrait. Certaines pratiques sont dans la boucle par nature, parce que tes réactions en sont la matière : le [grilling](/notions/grilling) a besoin de tes réponses, le [prototypage](/notions/prototyping) de tes réactions.

Rester dans la boucle coûte de l’attention, la ressource rare. Progresser avec les agents, c’est en partie sortir plus de travail de la boucle sans danger : un plan écrit, des [vérifications automatiques](/notions/automated-check), une [relecture humaine](/notions/human-review) à la fin plutôt qu’une surveillance continue. Une [software factory](/notions/software-factory) va plus loin : des déclencheurs lancent les sessions, et même le démarrage du travail ne passe plus par toi.

## À éviter

- Confondre « dans la boucle » avec « cliquer sur les demandes de permission » : être dans la boucle, c’est suivre le raisonnement, pas seulement approuver des actions.
- Rester dans la boucle par habitude sur des tâches simples et vérifiables : l’attention manquera là où elle compte.

## En situation

> « Je lance ça AFK pour la nuit ? »

> « Non, c’est une migration de schéma. Garde la main : regarde chaque étape et corrige s’il choisit la mauvaise colonne pour le backfill. »
