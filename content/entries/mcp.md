---
term: MCP
slug: mcp
section: tools
description: "Protocole qui branche des serveurs d'outils externes sur un harnais. L'intégration s'écrit une fois, tout harnais compatible l'utilise."
sourceTerm: MCP
related:
  - tool
  - harness
  - context-window
---

MCP, pour Model Context Protocol, est un protocole qui branche des serveurs d'[outils](/notions/tool) externes sur un [harnais](/notions/harness). C'est ainsi qu'un [agent](/notions/agent) obtient des outils au-delà de ceux livrés avec le harnais. L'agent n'« appelle » jamais MCP : il appelle un outil, et le harnais se trouve avoir obtenu cet outil d'un serveur MCP. Le protocole expose aussi des ressources (données en lecture seule) et des prompts (gabarits réutilisables), mais la fourniture d'outils est l'usage principal.

Le protocole règle un problème d'intégration. Sans standard, chaque harnais devrait écrire et maintenir sa propre intégration Linear, sa propre intégration Slack, sa propre intégration base de données. Avec MCP, l'intégration s'écrit une fois sous forme de serveur, et tout harnais compatible peut l'utiliser : le harnais se connecte, le serveur annonce les outils qu'il offre, et ces outils deviennent disponibles à côté de ceux d'origine.

Le coût se paie en [contexte](/notions/context). Chaque outil annoncé par un serveur arrive comme une définition — nom, description, schéma de paramètres — et le [modèle](/notions/model) ne peut appeler que les outils qu'il connaît. L'approche naïve charge toutes les définitions d'avance : avec quelques serveurs généreux, la [session](/notions/session) démarre avec des milliers de tokens de schémas avant la première phrase, dépensés pour des outils que la tâche n'utilisera jamais.

Beaucoup de harnais atténuent cela par la recherche d'outils : au lieu des définitions complètes, le contexte garde un [pointeur](/notions/context-pointer) vers les outils disponibles, et l'agent charge une définition seulement quand il en a besoin. Si ton harnais ne le fait pas, le coût d'avance s'applique : n'active que les serveurs dont le projet a vraiment besoin.

## À éviter

- Dire « l'agent utilise MCP » pour décrire un appel : MCP est la plomberie, l'outil est ce que le modèle voit.
- Installer des serveurs en série sans regarder ce que leurs définitions coûtent en fenêtre de contexte.

## En situation

> « L'agent doit lire les tickets dans Linear. »

> « Configure le serveur MCP de Linear sur le harnais : il expose l'API de Linear comme des outils que l'agent peut appeler. Ça t'évite d'écrire des outils maison. »
