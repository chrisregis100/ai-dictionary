import type { ModuleConfig } from "@/lib/modules/types";

export const blogModule = {
  id: "blog",
  name: "Blog Dev Hero",
  shortName: "Blog",
  description:
    "Articles pratiques sur le développement assisté par IA : agents, outils, workflows et retours d'expérience.",
  basePath: "/blog",
  status: "available",
} as const satisfies ModuleConfig;
