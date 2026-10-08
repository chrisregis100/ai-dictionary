---
term: Prototyping
slug: prototyping
section: patterns
description: "Faire construire à l’agent une version rapide et rugueuse, quand la conversation ne suffit plus et qu’il faut du concret à juger."
sourceTerm: Prototyping
related:
  - grilling
  - design-concept
  - human-in-the-loop
  - spec
---

Le prototypage consiste à faire construire par l’[agent](/notions/agent) une version rapide et rugueuse d’une chose, quand la conversation ne suffit plus et qu’il faut un artefact réel pour en parler.

Le [grilling](/notions/grilling) tranche les décisions de conception en conversation. La conversation est bon marché, mais basse fidélité : certaines questions ne se répondent pas en mots — l’effet que fait une interaction, si une forme d’API est agréable dans du vrai code appelant, si la mise en page tient avec des données réelles. L’entretien bute sur une question et la réponse honnête est « je ne sais pas, il faudrait que je voie ». Passé ce point, la discussion tourne en rond. À la place : faire construire la chose, la regarder, revenir à la conversation avec une réponse.

Les agents abaissent le coût de construction, et c’est ce qui rend la pratique courante. La maquette qui demandait une journée prend des minutes ; elle vaut donc la peine en routine. C’est une technique [human-in-the-loop](/notions/human-in-the-loop) : le prototype est là pour que tu réagisses.

On ne s’arrête pas à un coup d’œil. Itérer avec le prototype — réagir, demander un changement, réagir de nouveau — règle une décision par tour, contre l’artefact réel, à une fidélité que la conversation ne permet pas. Un prototype n’est pas forcément tout jetable : les pièces réellement évaluées peuvent être construites proprement, et le composant ou l’API qui a servi de support passe ensuite dans la vraie base de code. C’est aussi ce qui en fait une matière essentielle pour la [spec](/notions/spec).

## À éviter

- Continuer à débattre en mots d’une question qui se règle en regardant : c’est le signal de prototyper.
- Confondre le prototype avec une première version du produit : il sert à trancher une décision, pas à être fusionné tel quel.

## En situation

> « Ça fait une demi-heure qu’on débat : l’assistant en une page ou en trois étapes ? »

> « Les mots ne trancheront pas. Fais prototyper les deux : on clique dedans et on saura en cinq minutes. »
