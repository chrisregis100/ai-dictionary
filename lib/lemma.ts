export function grammarLabel(term: string): string {
  const letters = term.replace(/[^A-Za-z]/g, "");
  if (letters.length > 0 && letters.length <= 3 && letters === letters.toUpperCase()) {
    return "sigle";
  }
  if (term.includes(" ") || term.includes("-")) return "loc.";
  return "n.";
}

export function phoneticReading(term: string): string {
  return term.trim().toLowerCase();
}
