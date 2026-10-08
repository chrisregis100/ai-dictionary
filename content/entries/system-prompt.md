---
term: System prompt
slug: system-prompt
section: sessions
description: "Consigne que le harnais place en tête de chaque requête : rôle, règles, outils. Stable pendant toute la session."
sourceTerm: System prompt
related:
  - harness
  - model-provider-request
  - agents-md
  - prefix-cache
---

Le system prompt, ou consigne système, est le texte que le [harnais](/notions/harness) place en tête de chaque [requête](/notions/model-provider-request) : qui est l'[agent](/notions/agent), comment se conduire, quels [outils](/notions/tool) il peut appeler, quelles conventions suivre. Elle reste en général identique pendant toute la [session](/notions/session).

La consigne est écrite par l'éditeur du harnais, pas par toi, et dans les harnais de code elle est grosse : souvent des dizaines de milliers de [tokens](/notions/token) de règles de comportement et de descriptions d'outils, payés en [tokens d'entrée](/notions/input-tokens) à chaque tour. Tes propres instructions voyagent à côté : un fichier comme [AGENTS.md](/notions/agents-md) est chargé près de la consigne au début de la session, si bien que le [modèle](/notions/model) lit le texte de l'éditeur et le tien avant même ton premier message.

Identique à chaque requête, la consigne forme le début du [cache de préfixe](/notions/prefix-cache). C'est une des raisons pour lesquelles les harnais la figent pour toute la session au lieu de la retoucher en route.

Les modèles sont entraînés à faire passer la consigne système avant les messages de l'utilisateur. Quand un agent s'accroche à une convention que tu n'as jamais demandée, ou formate ses réponses d'une façon dont tu n'arrives pas à le défaire, il obéit le plus souvent à sa consigne — et ton message perd l'arbitrage. Certains harnais donnent accès au texte : tu peux lire ce qu'on dit réellement à l'agent, et le changer.

## À éviter

- Reprocher au modèle un tic de comportement qui vient de la consigne du harnais.
- Confondre la consigne système avec tes instructions : AGENTS.md s'y ajoute, il ne la remplace pas.

## En situation

> « Deux harnais, même modèle, comportements opposés sur le même prompt. »

> « Consignes système différentes. L'une pousse aux éditions brèves, l'autre à l'explication. L'écart se joue là, avant même ton message. »
