import { describe, expect, it } from "vitest";

import { diffUpstreamTerms, formatUpstreamReport } from "@/lib/upstream";

describe("veille upstream", () => {
  it("sépare les ajouts et les retraits ou renommages", () => {
    expect(
      diffUpstreamTerms(["AI", "Model", "Effort"], ["AI", "Model", "Token"]),
    ).toEqual({
      added: ["Effort"],
      removedOrRenamed: ["Token"],
    });
  });

  it("reste silencieux quand les listes coincident", () => {
    const report = formatUpstreamReport(
      diffUpstreamTerms(["Token"], ["Token"]),
    );
    expect(report).toMatch(/n'a pas de terme absent/);
  });
});
