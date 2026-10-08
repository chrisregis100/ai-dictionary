---
term: Contextual knowledge
slug: contextual-knowledge
section: failures
description: "Faits que l'agent lit directement dans le contexte. Seule connaissance sous ton contrôle, à l'inverse de la paramétrique."
sourceTerm: Contextual knowledge
related:
  - parametric-knowledge
  - context
  - knowledge-cutoff
  - attention-budget
---

La connaissance contextuelle est l'ensemble des faits que l'[agent](/notions/agent) peut lire directement dans le [contexte](/notions/context) au moment où il travaille : la tâche formulée, les fichiers lus, les [résultats d'outils](/notions/tool-result), le contenu chargé au début de la [session](/notions/session). C'est le pendant de la [connaissance paramétrique](/notions/parametric-knowledge) : la paramétrique se rappelle, la contextuelle se lit. Les [hallucinations](/notions/hallucination) sont bien plus rares quand l'agent travaille sur du contextuel — la réponse est sous ses yeux, pas repêchée dans un souvenir flou.

| | Paramétrique | Contextuelle |
| --- | --- | --- |
| Origine | Entraînement, figée dans les paramètres | Fenêtre, assemblée à chaque requête |
| Accès | Rappel flou, selon la fréquence dans les données | Lecture directe |
| Contrôle | Aucun | Total : tu choisis ce qui entre |
| Coût à l'usage | Aucun | Des [tokens](/notions/token), et une part d'attention |

Des deux, seule la contextuelle est sous ton contrôle. Les paramètres sont figés ; la seule façon de donner au modèle une connaissance qui lui manque — un SDK interne, une bibliothèque sortie après la [date de coupure](/notions/knowledge-cutoff), une décision prise hier — est de la mettre dans le contexte. Une grande partie du travail pratique de codage avec IA se ramène à ça : les bons faits devant le modèle au moment où il en a besoin.

Quand les deux connaissances se contredisent, la contextuelle gagne en général. Colle les docs à jour et le modèle les suit plutôt que son souvenir de l'ancienne API — mais l'ancienne version peut ressurgir, surtout loin dans une longue session. Si l'agent revient à un motif périmé malgré les docs chargées, c'est la paramétrique qui fuit : répéter la correction, ou la rapprocher du travail en cours, aide.

Elle coûte à l'usage, contrairement à la paramétrique. Tout ce qui entre dans la fenêtre dépense des tokens et concourt pour le [budget d'attention](/notions/attention-budget). En charger plus n'est pas automatiquement mieux : la cible, ce sont les faits pertinents dans la fenêtre, pas tous les faits.

## À éviter

- « Mémoire de travail » : la connaissance contextuelle est ce qui est dans la fenêtre maintenant ; un [système de mémoire](/notions/memory-system) sert à y faire entrer du contenu d'une session à l'autre. Deux échelles, à ne pas confondre.
- Employer le terme hors contraste avec la paramétrique : le reste du temps, « contexte » suffit.

## En situation

> « Pourquoi il vise juste sur l'API quand je colle les docs, et fabrique quand je ne les colle pas ? »

> « Docs collées, c'est de la connaissance contextuelle : il lit la page. Sans, c'est de la paramétrique, et les endpoints rares deviennent flous. »
