---
term: Smart zone
slug: smart-zone
section: failures
description: "Début de session où l'agent est précis. Ensuite la zone bête : plus d'erreurs bien avant la limite de la fenêtre de contexte."
sourceTerm: Smart zone
related:
  - attention-degradation
  - context-window
  - clearing
  - handoff
---

La smart zone — la zone futée — est le début de [session](/notions/session) où l'[agent](/notions/agent) est précis : net, concentré, bon rappel du contexte. À mesure que la session grossit, il glisse vers la « dumb zone », la zone bête : plus brouillon, plus oublieux, plus d'erreurs — et plus d'[hallucinations](/notions/hallucination) de fidélité. Même [modèle](/notions/model), même [harnais](/notions/harness), juste plus de [contexte](/notions/context) : c'est l'effet ressenti de la [dégradation de l'attention](/notions/attention-degradation). Sur les modèles de pointe, la zone bête commence couramment autour de 125 000 à 150 000 [tokens](/notions/token) — le chiffre est discuté.

Le déclin est graduel, donc facile à rater. Pas de message d'erreur, pas de frontière visible ; l'agent travaille un peu moins bien, puis nettement moins bien. Signes courants : il oublie une instruction donnée vingt tours plus tôt, répète une erreur déjà corrigée, affirme avec aplomb quelque chose que le contexte contredit. Comme la glissade est lisse, le réflexe est d'insister et de ré-expliquer — ce qui ajoute du contexte et aggrave le problème.

Les zones ne suivent pas la limite de la [fenêtre de contexte](/notions/context-window). Une session peut être au fond de la zone bête avec la majeure partie de la fenêtre encore libre : la limite est l'endroit où le harnais refuse de continuer, la qualité tombe bien avant. Planifie sur la zone futée, pas sur la fenêtre — le budget pratique d'une tâche, ce sont les tokens dans lesquels l'agent travaille bien, pas ceux qu'il peut techniquement contenir.

La zone futée est un budget, et le travail sans rapport le dépense. Chaque tâche menée dans une session consomme des tokens ; en démarrer une deuxième dans la même session, c'est la démarrer plus près de la zone bête. Une tâche par session donne à chacune la partie la plus nette. Quand une tâche seule dépasse une zone futée, découpe : [passe la main](/notions/handoff) ou [compacte](/notions/compaction) à une frontière naturelle, et laisse une session fraîche faire la suite.

## À éviter

- Pousser à travers la zone bête en ré-expliquant : [vide](/notions/clearing) ou compacte plutôt.
- Mesurer la marge restante à la fenêtre de contexte : la qualité part bien avant la limite.

## En situation

> « Il a réussi les trois premiers composants et massacré le quatrième. »

> « Tu es sorti de la zone futée — même modèle, juste profond dans la zone bête. Compacte, recharge le plan, et le composant suivant passera. »
