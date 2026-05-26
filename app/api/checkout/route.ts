import type { CartItem } from "@/lib/cart/types";
import { createPaymentIntent } from "@/lib/stripe/checkout";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shippingAddress, shippingCost, customerId, guestEmail } = body as {
      items: CartItem[];
      shippingAddress: {
        firstName: string;
        lastName: string;
        address1: string;
        city: string;
        postalCode: string;
        country: string;
      };
      shippingCost: number;
      customerId?: string;
      guestEmail?: string;
    };

    if (!items?.length) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const result = await createPaymentIntent({
      items,
      shippingAddress,
      shippingCost: shippingCost ?? 0,
      customerId,
      guestEmail,
    });

    return Response.json(result);
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
