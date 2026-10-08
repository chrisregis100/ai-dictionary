---
term: Ticket
slug: ticket
section: handoffs
description: "Artefact de passation qui cadre une session de travail. Seul ou rattaché à une spec ; l'ordre sort du graphe de dépendances."
sourceTerm: Ticket
related:
  - spec
  - handoff-artifact
  - smart-zone
  - context-pointer
---

Le ticket est un [handoff artifact](/notions/handoff-artifact) qui cadre une [session](/notions/session) de travail. Il vit seul, ou rattaché à une [spec](/notions/spec) comme l'un de ses enfants. Les tickets peuvent se bloquer entre eux : l'ordre du travail sort de leur graphe de dépendances, pas d'un plan linéaire.

La contrainte qui le définit est sa taille : une session. Un ticket doit pouvoir se finir avant que la session ne sorte de la [zone intelligente](/notions/smart-zone) — et cette contrainte se teste. Si les sessions se dégradent régulièrement avant la fin du travail, les tickets sont trop gros : découpe-les. Si chaque session passe l'essentiel de son [contexte](/notions/context) en mise en route pour cinq minutes de travail utile, ils sont trop petits : fusionne-les.

Un bon ticket s'écrit pour un lecteur sans aucun autre contexte. L'objectif, les critères d'acceptation, et des [pointeurs de contexte](/notions/context-pointer) vers les fichiers et les décisions concernés — de quoi commencer sans redériver ce que la session d'avant savait.

Le graphe de dépendances est aussi ce qui ouvre le parallélisme. Les tickets indépendants — les feuilles du graphe — peuvent tourner chacun dans sa propre session, en même temps. C'est une manière efficace de faire travailler plusieurs agents à la fois. Dans une [software factory](/notions/software-factory), un ticket marqué prêt est lui-même le déclencheur de sa session.

## À éviter

- Calibrer les tickets sur l'effort humain (« une journée ») au lieu d'une session d'agent.
- « Voir la discussion » comme critère d'acceptation : la session lectrice n'y a pas accès.

## En situation

> « Je commence où, sur la spec de migration ? »

> « Regarde le graphe : le changement de schéma bloque le backfill, le backfill bloque la bascule d'API. Prends une feuille et lance une session dessus. »
