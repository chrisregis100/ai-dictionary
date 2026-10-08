import { z } from "zod";

import { sectionIds } from "@/content/curriculum";

export const DESCRIPTION_MAX = 140;

export const entrySchema = z.object({
  term: z.string().trim().min(1),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  section: z.enum(sectionIds),
  description: z.string().trim().min(1).max(DESCRIPTION_MAX),
  sourceTerm: z.string().trim().min(1),
  related: z.array(z.string().trim().min(1)),
});

export type EntryFrontmatter = z.infer<typeof entrySchema>;
