import { createOrderFromPayment } from "@/lib/stripe/checkout";
import { stripe } from "@/lib/stripe/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object;
      try {
        const order = await createOrderFromPayment(pi.id);
        if (order) {
          console.log(`Order created: ${order.orderNumber}`);
        }
      } catch (err) {
        console.error("Failed to create order:", err);
        return Response.json({ error: "Order creation failed" }, { status: 500 });
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object;
      console.error(`Payment failed: ${pi.id}`);
      break;
    }
    default:
      break;
  }

  return Response.json({ received: true });
}
