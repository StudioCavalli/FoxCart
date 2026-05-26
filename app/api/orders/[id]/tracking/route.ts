import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });

  try {
    const order = await payload.findByID({ collection: "orders", id });

    return Response.json({
      orderNumber: order.orderNumber,
      status: order.status,
      trackingNumber: order.trackingNumber ?? null,
      trackingUrl: order.trackingUrl ?? null,
      carrier: order.shippingMethod ?? null,
      fulfillmentStatus: order.fulfillmentStatus,
    });
  } catch {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }
}
