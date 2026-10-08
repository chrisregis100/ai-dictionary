---
term: Memory system
slug: memory-system
section: memory
description: "Fichiers où l’agent note ce qu’il apprend, rechargés en début de session : une continuité simulée sur un modèle sans mémoire."
sourceTerm: Memory system
related:
  - stateful
  - session
  - agents-md
  - context-pointer
---

Le memory system (système de mémoire) est la couche qui tente de rendre un [agent](/notions/agent) [stateful](/notions/stateful) d’une [session](/notions/session) à l’autre. Pendant la session, il écrit ce que l’agent apprend dans l’[environnement](/notions/environment) ; au début des suivantes, il le recharge dans la [fenêtre de contexte](/notions/context-window). L’agent semble se souvenir, alors que le modèle repart de zéro à chaque session.

Le système a deux moitiés. À l’écriture, l’agent consigne dans des fichiers ce qui mérite de durer : une préférence énoncée, un fait sur le projet. À la lecture, le [harnais](/notions/harness) recharge ces fichiers, ou un index, au démarrage. Certains harnais livrent leur propre système de mémoire ; on peut aussi en monter un soi-même avec un dossier de notes et une ligne dans [AGENTS.md](/notions/agents-md) qui dit de le consulter.

Les souvenirs s’accumulent, et tout ce qui est rechargé d’office se paie à chaque tour. La plupart des systèmes chargent donc une ligne par souvenir et laissent les corps derrière des [pointeurs de contexte](/notions/context-pointer). Autre limite : un souvenir est une [source secondaire](/notions/secondary-source). Un fait noté en mars est rechargé avec la même assurance en juin, alors que le projet a bougé.

Un système de mémoire s’élague. Relire les souvenirs de temps en temps, supprimer ce qui est périmé, corriger ce qui a dérivé : le même entretien qu’un AGENTS.md.

## À éviter

- Dire « le modèle a appris » : le modèle reste [stateless](/notions/stateless), seule la couche de fichiers persiste.
- Recharger tous les souvenirs en entier au lieu d’un index et de pointeurs.
- Laisser les notes vieillir sans entretien, puis s’étonner que l’agent affirme des choses périmées.

## En situation

> « Troisième session de suite où je lui réexplique l’architecture du projet. »

> « Fais-lui écrire ce qu’il apprend dans un dossier de notes, rechargé au démarrage. Le modèle n’a pas de mémoire ; la couche de fichiers en tient lieu. »
