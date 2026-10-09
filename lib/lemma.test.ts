import { describe, expect, it } from "vitest";

import { grammarLabel, phoneticReading } from "@/lib/lemma";

describe("marqueurs lexicographiques", () => {
  it("classe sigle, locution et nom", () => {
    expect(grammarLabel("MCP")).toBe("sigle");
    expect(grammarLabel("DX")).toBe("sigle");
    expect(grammarLabel("Prefix cache")).toBe("loc.");
    expect(grammarLabel("next-token-prediction")).toBe("loc.");
    expect(grammarLabel("Token")).toBe("n.");
  });

  it("met la phonétique en minuscules", () => {
    expect(phoneticReading("Token")).toBe("token");
    expect(phoneticReading(" MCP ")).toBe("mcp");
  });
});
