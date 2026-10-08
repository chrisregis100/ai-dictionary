---
term: Skill
slug: skill
section: memory
description: "Mode d’emploi empaqueté d’une tâche précise : une description en contexte, le corps chargé seulement quand ce travail arrive."
sourceTerm: Skill
related:
  - progressive-disclosure
  - context-pointer
  - agents-md
  - tool
---

Une skill (compétence) est un savoir-faire empaqueté : les instructions et les ressources pour bien faire une tâche précise, rangées dans l’[environnement](/notions/environment) et chargées dans la [fenêtre de contexte](/notions/context-window) seulement quand la tâche se présente. C’est l’unité de la [divulgation progressive](/notions/progressive-disclosure) intégrée au [harnais](/notions/harness).

Le format est un standard ouvert, défini sur agentskills.io, lancé par Anthropic et repris par la plupart des harnais : une skill écrite une fois se transporte. Concrètement, c’est un dossier avec un fichier `SKILL.md` — un nom, une description, puis les instructions — et, en option, des scripts que l’[agent](/notions/agent) peut lancer et du matériel de référence.

Par défaut, seuls le nom et la description sont en contexte ; la description joue le rôle de [pointeur de contexte](/notions/context-pointer). Quand la tâche correspond, l’agent charge le reste. Jusque-là, la skill occupe une phrase ou deux, quelle que soit la taille de ses instructions.

C’est ce qui la distingue d’[AGENTS.md](/notions/agents-md), chargé dans chaque [session](/notions/session) quelle que soit la tâche. Une skill se lit quand un type de travail arrive — livrer une release, écrire une migration — et s’ignore le reste du temps.

| | AGENTS.md | Skill |
| --- | --- | --- |
| Chargement | Chaque session, en entier | Description seule ; le corps à la demande |
| Bon contenu | Les règles qui valent partout | Le mode d’emploi d’une tâche précise |

## À éviter

- Dire « outil » pour une skill : un [outil](/notions/tool) s’appelle, une skill se lit.
- Mettre dans AGENTS.md ce qui devrait être une skill : le texte se paierait à chaque tour.

## En situation

> « La procédure de migration fait trois pages. Je la mets où pour que l’agent la respecte ? »

> « En skill : une description d’une ligne en contexte, le corps chargé le jour où une migration arrive. Elle ne coûte rien le reste du temps. »
