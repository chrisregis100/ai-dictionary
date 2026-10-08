---
term: Handoff artifact
slug: handoff-artifact
section: handoffs
description: "Document écrit par une session pour en briefer une autre : le véhicule durable, relisible et réutilisable d'une passation."
sourceTerm: Handoff artifact
related:
  - handoff
  - compaction
  - secondary-source
  - spec
---

Le handoff artifact — l'artefact de passation — est un document qui sert de véhicule à un [handoff](/notions/handoff) : écrit dans l'[environnement](/notions/environment) par une [session](/notions/session) pour être lu par une autre. Les [specs](/notions/spec), les [tickets](/notions/ticket) et les plans sont des handoff artifacts.

La raison d'en écrire un : le modèle est [sans état](/notions/stateless), donc rien de ce que tient une session ne survit à son [clearing](/notions/clearing). Décisions, contraintes, plans à moitié faits — tout part avec le contexte qui les tenait. L'environnement, lui, persiste. Écrire l'état important dans un fichier le déplace là où la session suivante pourra le relire.

L'artefact est une [source secondaire](/notions/secondary-source) : un compte rendu du travail, pas le travail. C'est ce qui le rend assez petit pour briefer une session neuve, et c'est aussi ce qui peut la tromper : il enregistre ce que la session rédactrice croyait, et ce qu'elle a omis ou mal vu est invisible pour la lectrice. Là où une affirmation compte, la session suivante la vérifie contre la [source primaire](/notions/primary-source) — le code, les tests — au lieu d'en hériter.

Un bon artefact s'écrit pour une session à contexte zéro. Des chemins de fichiers concrets plutôt que « le fichier dont on a parlé ». Ce qui a été décidé et pourquoi, pour que la suite ne rouvre pas le débat. Ce qui est fait et ce qui reste. Dire à la session rédactrice où va le document aide : « écris un doc de passation pour une session neuve qui ne sait rien de ce travail ».

L'autre véhicule est la [compaction](/notions/compaction), qui résume en mémoire. L'artefact a deux avantages sur elle : il vit sur le disque, où tu peux le lire et le corriger avant que rien n'en dépende, et il se réutilise — la même spec peut briefer cinq sessions parallèles.

## À éviter

- « Le fichier qu'on a modifié tout à l'heure » : la session lectrice n'a pas de tout à l'heure.
- Noter les décisions sans le pourquoi : la session suivante rouvrira le débat.

## En situation

> « Comment je découpe ça entre l'agent qui planifie et celui qui implémente ? »

> « Fais écrire un artefact de passation au planificateur : chemins, décisions, contraintes. La session d'implémentation s'ouvre sur un pointeur vers l'artefact et le prend comme brief. »
