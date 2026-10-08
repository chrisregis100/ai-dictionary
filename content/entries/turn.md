---
term: Turn
slug: turn
section: sessions
description: "Un message de l'utilisateur plus tout ce que l'agent fait en réponse, jusqu'à rendre la main. Une ou plusieurs requêtes."
sourceTerm: Turn
related:
  - session
  - model-provider-request
  - tool-call
  - afk
---

Le tour est un message de l'utilisateur plus tout ce que l'[agent](/notions/agent) fait en réponse, jusqu'à ce qu'il rende la main. Il contient une ou plusieurs [requêtes](/notions/model-provider-request) — beaucoup, si l'agent enchaîne les [appels d'outils](/notions/tool-call). Une question de clarification clôt le tour ; ta réponse ouvre le suivant. La hiérarchie : [session](/notions/session) > tour > requête.

La longueur du tour est la décision de l'agent, pas la tienne. Tu remets un message ; l'agent choisit combien d'appels d'outils enchaîner avant de rendre la main. Un tour peut être une réponse d'une phrase, ou vingt minutes de lecture, d'édition et de tests. C'est la même propriété vue des deux côtés : les longs tours rendent possible le travail [AFK](/notions/afk), et les longs tours sont aussi l'endroit où le travail dérive sans surveillance — au moment où l'agent rend la main, il peut être loin de ce que tu voulais dire.

Le tour est l'unité naturelle du pilotage. Tout ce qui se passe dans un tour se passe sans toi ; les creux entre les tours sont là où tu rediriges. La plupart des [harnais](/notions/harness) assouplissent la règle : on peut interrompre en plein tour, ou taper un message qui sera lu quand le tour se termine. Si les tours finissent régulièrement ailleurs que prévu, demande des tours plus courts — un plan d'abord, une étape à la fois — en échangeant de l'autonomie contre des occasions de corriger.

## À éviter

- Confondre tour et requête : un seul tour peut déclencher quinze requêtes au fournisseur.
- Blâmer la lenteur du modèle quand c'est le nombre d'appels d'outils dans le tour qui s'additionne.

## En situation

> « Deux minutes pour un seul tour ? »

> « Quatorze appels d'outils dans ce tour, chacun une requête au fournisseur. Les latences s'empilent avant que l'agent rende la main. »
