import type { ModuleConfig } from "@/lib/modules/types";

export const dictionaryModule = {
  id: "dictionary",
  name: "Dictionnaire d'IA coding",
  shortName: "Dictionnaire",
  description:
    "Le vocabulaire du codage avec l'IA, expliqué en français. Les termes anglais restent les termes.",
  basePath: "/dictionnaire",
  status: "available",
} as const satisfies ModuleConfig;
