---
term: Compaction
slug: compaction
section: handoffs
description: "Passation en mémoire : l'historique de session est résumé, le résumé amorce une session neuve. Du détail échangé contre de la place."
sourceTerm: Compaction
related:
  - handoff
  - clearing
  - autocompact
  - secondary-source
---

La compaction — le compactage — est une [passation](/notions/handoff) faite en mémoire : l'historique de la [session](/notions/session) est résumé, et le résumé amorce une session neuve. La perte est dans le principe : le transcript est une [source primaire](/notions/primary-source), le résumé une [source secondaire](/notions/secondary-source) — du détail échangé contre de la place. Elle se déclenche à la main, ou automatiquement par l'[autocompact](/notions/autocompact).

Le mécanisme part d'une fenêtre finie. Une longue session la remplit : chaque résultat d'outil, chaque fichier lu, chaque fausse piste reste dans l'historique. Quand ça devient lourd, le [harnais](/notions/harness) demande au modèle de résumer la session, jette l'historique d'origine, et amorce une session neuve avec le résumé. Ce qui n'a pas trouvé place dans le résumé disparaît du contexte. Certains harnais amortissent la perte : le vieux transcript reste sur le disque et le résumé garde un [pointeur de contexte](/notions/context-pointer) vers lui, pour retrouver en relisant l'original un détail que le résumé a perdu.

Le résumé est écrit par le modèle, donc il se guide. « Préserve les décisions de schéma » rend l'artefact produit plus délibéré. Le moment compte aussi : compacte à une frontière de phase, une fois le plan posé, pas au milieu d'une tâche.

Le [clearing](/notions/clearing) est l'autre sortie : tout jeter et repartir à froid.

| | Compaction | Clearing |
| --- | --- | --- |
| Ce qui passe | Un résumé, avec pertes | Rien |
| Le pari | L'essentiel doit être porté dans la session suivante | L'essentiel est déjà écrit ailleurs, en mieux |
| Le risque | Le résumé perd une décision sans prévenir | Tout repart de zéro, l'utile compris |

## À éviter

- Compacter au milieu d'une tâche : le résumé tranche seul dans des décisions encore chaudes.
- Compacter sans consigne quand des décisions précises doivent survivre.

## En situation

> « Le contexte devient lourd et il me reste toute la passe de tests. »

> « Compacte avant de commencer, avec une consigne : la session neuve doit garder les décisions de schéma et lâcher l'exploration. »
