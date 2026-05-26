import type { CartItem } from "@/lib/cart/types";
import config from "@/payload.config";
import { getPayload } from "payload";
import { stripe } from "./server";

interface CheckoutInput {
  items: CartItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  shippingCost: number;
  customerId?: string;
  guestEmail?: string;
  couponCode?: string;
}

export async function createPaymentIntent(input: CheckoutInput) {
  const subtotal = input.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + input.shippingCost;

  const metadata: Record<string, string> = {
    items: JSON.stringify(
      input.items.map((i) => ({ id: i.productId, qty: i.quantity, sku: i.variantSku })),
    ),
    shippingCost: String(input.shippingCost),
  };
  if (input.customerId) metadata.customerId = input.customerId;
  if (input.guestEmail) metadata.guestEmail = input.guestEmail;
  if (input.couponCode) metadata.couponCode = input.couponCode;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "eur",
    metadata,
    automatic_payment_methods: { enabled: true },
  });

  return { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id, total };
}

export async function createOrderFromPayment(paymentIntentId: string) {
  const payload = await getPayload({ config });
  const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (pi.status !== "succeeded") return null;

  const existing = await payload.find({
    collection: "orders",
    where: { stripePaymentIntentId: { equals: paymentIntentId } },
  });
  if (existing.totalDocs > 0) return existing.docs[0];

  const items = JSON.parse(pi.metadata.items ?? "[]") as {
    id: string;
    qty: number;
    sku?: string;
  }[];
  const shippingCost = Number(pi.metadata.shippingCost ?? 0);

  const orderItems = [];
  let subtotal = 0;
  for (const item of items) {
    const product = await payload.findByID({ collection: "products", id: item.id });
    if (!product) continue;
    const unitPrice = product.basePrice;
    const totalPrice = unitPrice * item.qty;
    subtotal += totalPrice;
    orderItems.push({
      product: item.id,
      variantSku: item.sku ?? "",
      quantity: item.qty,
      unitPrice,
      totalPrice,
    });
  }

  const count = await payload.count({ collection: "orders" });
  const orderNumber = `FC-${new Date().getFullYear()}-${String(count.totalDocs + 1).padStart(5, "0")}`;

  const order = await payload.create({
    collection: "orders",
    data: {
      orderNumber,
      customer: pi.metadata.customerId || undefined,
      guestEmail: pi.metadata.guestEmail || undefined,
      items: orderItems,
      subtotal,
      shippingCost,
      taxAmount: Math.round(subtotal * 0.2),
      discountAmount: 0,
      total: pi.amount,
      stripePaymentIntentId: paymentIntentId,
      paymentStatus: "paid",
      status: "confirmed",
      fulfillmentStatus: "unfulfilled",
    },
  });

  return order;
}
