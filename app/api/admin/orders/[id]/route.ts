import config from "@/payload.config";
import { getPayload } from "payload";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.status) data.status = body.status;
  if (body.trackingNumber) data.trackingNumber = body.trackingNumber;
  if (body.trackingUrl) data.trackingUrl = body.trackingUrl;
  if (body.shippingMethod) data.shippingMethod = body.shippingMethod;
  if (body.internalNote) data.internalNote = body.internalNote;
  if (body.paymentStatus) data.paymentStatus = body.paymentStatus;

  const order = await payload.update({ collection: "orders", id, data });
  return Response.json({ order });
}
