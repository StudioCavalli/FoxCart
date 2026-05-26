import { describe, expect, it } from "vitest";
import { z } from "zod";

const shippingAddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address1: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().length(2),
});

const checkoutSchema = z.object({
  email: z.string().email(),
  shippingAddress: shippingAddressSchema,
  shippingCost: z.number().min(0),
});

describe("checkout validation", () => {
  it("accepts valid checkout data", () => {
    const result = checkoutSchema.safeParse({
      email: "test@foxcase.fr",
      shippingAddress: {
        firstName: "Jean",
        lastName: "Dupont",
        address1: "10 rue de la Paix",
        city: "Cannes",
        postalCode: "06400",
        country: "FR",
      },
      shippingCost: 990,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = checkoutSchema.safeParse({
      email: "not-an-email",
      shippingAddress: {
        firstName: "J",
        lastName: "D",
        address1: "A",
        city: "C",
        postalCode: "06400",
        country: "FR",
      },
      shippingCost: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing address fields", () => {
    const result = shippingAddressSchema.safeParse({ firstName: "Jean" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid country code", () => {
    const result = shippingAddressSchema.safeParse({
      firstName: "Jean",
      lastName: "Dupont",
      address1: "10 rue",
      city: "Cannes",
      postalCode: "06400",
      country: "France",
    });
    expect(result.success).toBe(false);
  });
});
