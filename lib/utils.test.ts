import { describe, expect, it } from "vitest";
import { cn, formatPrice, slugify } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });
});

describe("formatPrice", () => {
  it("formats cents to EUR", () => {
    const result = formatPrice(1500);
    expect(result).toContain("15");
    expect(result).toContain("€");
  });

  it("handles zero", () => {
    const result = formatPrice(0);
    expect(result).toContain("0");
  });
});

describe("slugify", () => {
  it("converts to lowercase slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes accents", () => {
    expect(slugify("Café résumé")).toBe("cafe-resume");
  });

  it("removes leading/trailing hyphens", () => {
    expect(slugify("--hello--")).toBe("hello");
  });
});
