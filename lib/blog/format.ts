const postDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
});

export function formatPostDate(date: Date): string {
  return postDateFormatter.format(date);
}
