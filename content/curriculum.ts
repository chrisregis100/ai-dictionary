export const sectionIds = [
  "model",
  "sessions",
  "tools",
  "failures",
  "handoffs",
  "memory",
  "patterns",
] as const;

export type SectionId = (typeof sectionIds)[number];

export interface CurriculumSection {
  id: SectionId;
  title: string;
  summary: string;
  terms: string[];
}

export const curriculum: CurriculumSection[] = [
  {
    id: "model",
    title: "Le modèle",
    summary:
      "Ce que la machine calcule vraiment, et ce qui est facturé à chaque appel.",
    terms: [
      "ai",
      "model",
      "parameters",
      "training",
      "inference",
      "effort",
      "token",
      "next-token-prediction",
      "non-determinism",
      "model-provider",
      "harness",
      "model-provider-request",
      "input-tokens",
      "output-tokens",
      "prefix-cache",
      "cache-tokens",
    ],
  },
  {
    id: "sessions",
    title: "Sessions, fenêtres de contexte et tours",
    summary:
      "Comment une conversation tient dans une fenêtre, et pourquoi elle recommence à chaque requête.",
    terms: [
      "stateless",
      "context",
      "context-window",
      "stateful",
      "agent",
      "system-prompt",
      "session",
      "turn",
    ],
  },
  {
    id: "tools",
    title: "Outils et environnement",
    summary:
      "Fichiers, commandes, permissions et tout ce que le modèle ne peut pas toucher seul.",
    terms: [
      "environment",
      "filesystem",
      "tool",
      "tool-call",
      "tool-result",
      "mcp",
      "permission-request",
      "permission-mode",
      "agent-mode",
      "sandbox",
    ],
  },
  {
    id: "failures",
    title: "Modes d'échec",
    summary:
      "Quand la réponse a l'air sûre et que le problème vient du savoir, de l'attention ou du contexte.",
    terms: [
      "sycophancy",
      "hallucination",
      "parametric-knowledge",
      "knowledge-cutoff",
      "contextual-knowledge",
      "attention-relationship",
      "attention-budget",
      "attention-degradation",
      "smart-zone",
    ],
  },
  {
    id: "handoffs",
    title: "Passations",
    summary:
      "Ce qu'on garde, ce qu'on compacte et ce qu'on transmet quand une session devient trop longue.",
    terms: [
      "clearing",
      "handoff",
      "primary-source",
      "secondary-source",
      "handoff-artifact",
      "spec",
      "ticket",
      "compaction",
      "autocompact",
    ],
  },
  {
    id: "memory",
    title: "Mémoire et pilotage",
    summary:
      "Fichiers d'instructions, skills et sous-agents : où vit ce que le modèle ne retient pas.",
    terms: [
      "memory-system",
      "agents-md",
      "progressive-disclosure",
      "context-pointer",
      "skill",
      "subagent",
    ],
  },
  {
    id: "patterns",
    title: "Façons de travailler",
    summary:
      "Les rythmes de travail, de la revue humaine au prototype, une fois le vocabulaire en place.",
    terms: [
      "human-in-the-loop",
      "afk",
      "automated-check",
      "automated-review",
      "human-review",
      "vibe-coding",
      "design-concept",
      "grilling",
      "prototyping",
      "dx",
      "ax",
      "software-factory",
      "dark-factory",
    ],
  },
];

export function sectionById(id: SectionId): CurriculumSection {
  const section = curriculum.find((item) => item.id === id);
  if (!section) {
    throw new Error(`Section inconnue : ${id}`);
  }
  return section;
}
