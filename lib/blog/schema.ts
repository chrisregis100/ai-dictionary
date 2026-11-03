import { z } from "zod";

export const POST_STATUSES = ["DRAFT", "PUBLISHED"] as const;

export const PostInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Le titre est obligatoire.")
    .max(200, "Le titre dépasse 200 caractères."),
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .max(120, "Le slug dépasse 120 caractères.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit être en kebab-case (lettres minuscules, chiffres, tirets).",
    ),
  excerpt: z
    .string()
    .trim()
    .min(1, "L'extrait est obligatoire.")
    .max(500, "L'extrait dépasse 500 caractères."),
  contentMd: z.string().trim().min(1, "Le contenu Markdown est obligatoire."),
  status: z.enum(POST_STATUSES),
});

export type PostInput = z.infer<typeof PostInputSchema>;

export interface ArticleFormState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof PostInput, string>>;
}

export const initialArticleFormState: ArticleFormState = {
  status: "idle",
  message: "",
};
