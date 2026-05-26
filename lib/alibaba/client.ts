/**
 * Alibaba integration — V1 semi-automatic
 *
 * Products are imported via CSV/JSON (scripts/import-alibaba.ts).
 * Orders containing Alibaba products trigger an admin notification.
 * Manual ordering on the Alibaba supplier side.
 *
 * V2 (future): Alibaba Open Platform API for auto-import + auto-order.
 */

import config from "@/payload.config";
import { getPayload } from "payload";

export async function getAlibabaOrders() {
  const payload = await getPayload({ config });

  return payload.find({
    collection: "orders",
    where: {
      and: [
        { status: { not_equals: "cancelled" } },
        { "fulfillmentDetails.provider": { equals: "alibaba" } },
        { fulfillmentStatus: { not_equals: "fulfilled" } },
      ],
    },
    sort: "-createdAt",
    limit: 50,
  });
}

export async function flagOrderAsAlibabaProcessed(
  orderId: string | number,
  externalOrderId: string,
) {
  const payload = await getPayload({ config });

  return payload.update({
    collection: "orders",
    id: orderId,
    data: {
      fulfillmentDetails: [
        {
          provider: "alibaba",
          externalOrderId,
          status: "processing",
        },
      ],
    },
  });
}
