---
term: Primary source
slug: primary-source
section: handoffs
description: "La chose elle-même : le code, le transcript, le log brut. Complète et à jour, mais chère à charger dans le contexte."
sourceTerm: Primary source
related:
  - secondary-source
  - context-window
  - attention-budget
---

La source primaire est la chose dans sa forme d'origine : le code, le transcript de la conversation, le log brut, la vraie réponse de l'API. Pas un compte rendu de la chose — la chose. Son pendant est la [source secondaire](/notions/secondary-source).

Pour savoir ce que fait un code, le code est la source primaire. La doc, le schéma d'architecture et le README en sont des descriptions : justes au moment où on les a écrites, livrées à elles-mêmes depuis. Quand un [agent](/notions/agent) affirme avec aplomb quelque chose de faux sur le projet, la question à poser est : de quelle source partait-il ? Un agent qui a lu la doc hérite du retard de la doc ; un agent qui a lu le code lit la vérité du moment.

Le coût est ce qui empêche la source primaire d'être le choix par défaut. La charger dans la [fenêtre de contexte](/notions/context-window) se paie : le fichier entier, le transcript entier, chaque [token](/notions/token) facturé en entrée et en concurrence dans le [budget d'attention](/notions/attention-budget). Ce que le prix achète, c'est la complétude : rien n'a été filtré par le jugement de quelqu'un d'autre. Un résumé écrit le mois dernier ne peut pas contenir le détail qui compte aujourd'hui ; la source primaire, si.

Va à la source primaire quand la précision compte : la signature exacte, la vraie erreur, la ligne qui lève l'exception. Gérer le contexte, c'est en bonne partie décider quand payer la source primaire et quand une source secondaire suffit.

## À éviter

- Laisser l'agent raisonner depuis la doc quand la question porte sur le comportement réel.
- Charger le fichier entier « au cas où » quand un résumé aurait suffi : la complétude se paie.

## En situation

> « L'agent dit que le retry recule exponentiellement, mais je le vois marteler l'endpoint. »

> « Il a lu ça dans le design doc. Pointe-le sur le vrai module de retry : quand le comportement compte, on part de la source primaire. »
