---
term: Vibe coding
slug: vibe-coding
section: patterns
description: "Accepter le code de l’agent sans relecture humaine : le diff reste opaque, seul le comportement du programme est jugé."
sourceTerm: Vibe coding
related:
  - human-review
  - prototyping
  - software-factory
  - dark-factory
---

Le vibe coding est le mode de travail où l’on accepte le code de l’[agent](/notions/agent) sans [relecture humaine](/notions/human-review). Le diff est traité comme opaque : ce qui compte est que le programme se comporte, pas ce qu’il contient. [Relecture automatisée](/notions/automated-review) et [vérifications automatiques](/notions/automated-check) peuvent tourner ou non — le vibe coding ne dit rien d’elles.

Le terme vient d’Andrej Karpathy, début 2025 : se « laisser porter par les vibes », « oublier que le code existe » — décrire ce qu’on veut, accepter ce qui revient, juger en exécutant.

L’échange est l’inspection contre la vitesse. Lire les diffs est en général l’étape la plus lente du travail avec un agent ; la supprimer lève le principal goulot. Pour du code dont les échecs coûtent peu — [prototypes](/notions/prototyping), scripts jetables, outils internes — l’échange est raisonnable. Le risque grandit avec la durée de vie et les enjeux du code.

Le coût arrive plus tard. Les changements vibe-codés s’accumulent en une base que personne n’a lue, et seul le comportement a été vérifié : un secret écrit dans les logs, un cas limite absent, une donnée traitée de travers passent sans être vus, parce que rien de tout cela ne se montre à l’usage. Le premier débogage devient la première lecture du code, et ce qui tourne encore — tests, types, relecture automatisée — est la seule barrière que le code franchit. La même posture, appliquée à toute une zone de code alimentée par une [software factory](/notions/software-factory), s’appelle une [dark factory](/notions/dark-factory).

## À éviter

- Employer « vibe coding » pour dire « code IA de mauvaise qualité » : le terme nomme la posture de relecture, pas le code qui en sort.
- Vibe coder ce qui touche aux secrets, aux paiements ou aux données : le comportement visible n’y montre pas les fuites.

## En situation

> « J’ai vibe codé la correction du flux d’authentification — la connexion marche, c’est tout ce que j’ai vérifié. »

> « Lis le diff avant de pousser. Vibe coder l’authentification, c’est comme ça qu’un secret finit dans les logs. »
