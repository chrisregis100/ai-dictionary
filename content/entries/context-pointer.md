---
term: Context pointer
slug: context-pointer
section: memory
description: "Ligne qui renvoie vers un autre document, chargé seulement quand la tâche le demande. La brique de la divulgation progressive."
sourceTerm: Context pointer
related:
  - progressive-disclosure
  - skill
  - agents-md
  - secondary-source
---

Le context pointer (pointeur de contexte) est une mention qui, dans un document, renvoie vers un autre, pour que l’[agent](/notions/agent) ne le charge dans la [fenêtre de contexte](/notions/context-window) que si la tâche le demande. C’est la brique de base de la [divulgation progressive](/notions/progressive-disclosure).

L’intérêt est le coût. Le pointeur occupe une ligne ; le document derrière peut peser des milliers de [tokens](/notions/token), qui ne coûtent rien tant que personne ne les charge. Un runbook de 2 000 tokens collé dans [AGENTS.md](/notions/agents-md) se paie à chaque [session](/notions/session) ; remplacé par « déploiement : lire `internal/deploy.md` », il n’est chargé que par les sessions qui déploient. L’agent suit le pointeur par un [appel d’outil](/notions/tool-call) quand la tâche correspond.

Un pointeur fonctionne à deux conditions : un chemin stable, et assez de description pour que l’agent sache quand le suivre. Un chemin nu se fait sauter, y compris par la session qui en aurait eu besoin. La ligne s’écrit comme les tâches se présentent : « release, déploiement ou rollback : lire `internal/deploy.md` d’abord ».

Les pointeurs sont partout une fois qu’on les voit : lignes d’AGENTS.md, descriptions de [skills](/notions/skill) — le [harnais](/notions/harness) charge la description, le corps attend derrière —, noms de fichiers dans un listing, liens entre documents. Un pointeur peut aussi relier une [source secondaire](/notions/secondary-source) à sa [source primaire](/notions/primary-source) : le résumé qui nomme la transcription d’origine. Quand le résumé ne suffit plus, l’agent remonte à l’original au lieu de travailler avec ce que le résumé a gardé.

## À éviter

- Le chemin nu, sans un mot sur ce qu’il y a derrière : l’agent n’a aucune raison de le suivre.
- Inliner le document « pour être sûr » : c’est précisément le coût que le pointeur évite.

## En situation

> « J’ai écrit “voir docs/release.md” dans AGENTS.md, mais l’agent ne l’ouvre jamais. »

> « Le chemin nu ne dit pas quand le lire. Écris “release ou rollback : lire docs/release.md d’abord” et il le suivra au bon moment. »
