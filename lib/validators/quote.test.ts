import { describe, expect, it } from "vitest";
import { z } from "zod";

const quoteSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.enum(["individual", "professional"]),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20),
});

describe("quote validation", () => {
  it("accepts valid quote request", () => {
    const result = quoteSchema.safeParse({
      firstName: "Marie",
      lastName: "Laurent",
      email: "marie@example.com",
      type: "professional",
      company: "ACME Corp",
      description: "Nous souhaitons un site e-commerce pour vendre nos produits en ligne.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid type", () => {
    const result = quoteSchema.safeParse({
      firstName: "Marie",
      lastName: "Laurent",
      email: "marie@example.com",
      type: "enterprise",
      description: "Un long message de description du projet.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short description", () => {
    const result = quoteSchema.safeParse({
      firstName: "Marie",
      lastName: "Laurent",
      email: "marie@example.com",
      type: "individual",
      description: "Trop court",
    });
    expect(result.success).toBe(false);
  });
});
