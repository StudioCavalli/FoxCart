import { describe, expect, it } from "vitest";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  phone: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

describe("contact validation", () => {
  it("accepts valid contact form", () => {
    const result = contactSchema.safeParse({
      name: "Jean Dupont",
      email: "jean@example.com",
      subject: "Question",
      message: "Bonjour, je souhaite en savoir plus sur vos services.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "jean@example.com",
      subject: "Q",
      message: "Un message assez long",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      name: "Jean",
      email: "jean@example.com",
      subject: "Q",
      message: "Court",
    });
    expect(result.success).toBe(false);
  });

  it("catches honeypot spam", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@spam.com",
      subject: "Spam",
      message: "Buy now click here!!!",
      honeypot: "I am a bot",
    });
    expect(result.success).toBe(false);
  });
});
