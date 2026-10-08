import { describe, expect, it } from "vitest";

import { parseUnderstood, toggleUnderstood } from "@/lib/progress";

describe("progression locale", () => {
  it("ignore un stockage illisible", () => {
    expect(parseUnderstood(null)).toEqual([]);
    expect(parseUnderstood("{")).toEqual([]);
    expect(parseUnderstood('{"slug":"token"}')).toEqual([]);
    expect(parseUnderstood('["token", 1]')).toEqual(["token"]);
  });

  it("ajoute puis retire un slug", () => {
    expect(toggleUnderstood([], "token")).toEqual(["token"]);
    expect(toggleUnderstood(["token", "model"], "token")).toEqual(["model"]);
  });
});
