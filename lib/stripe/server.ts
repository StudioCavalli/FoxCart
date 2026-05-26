import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  console.warn("STRIPE_SECRET_KEY is not set — Stripe payments will not work.");
}

export const stripe = key
  ? new Stripe(key, { apiVersion: "2025-08-27.basil", typescript: true })
  : (null as unknown as Stripe);
