export interface NewsletterFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialNewsletterFormState: NewsletterFormState = {
  status: "idle",
  message: "",
};
