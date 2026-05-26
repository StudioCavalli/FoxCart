import { gelatoFetch } from "./client";

interface GelatoOrderItem {
  productUid: string;
  fileUrl: string;
  quantity: number;
}

interface GelatoOrderInput {
  orderReferenceId: string;
  items: GelatoOrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    postCode: string;
    country: string;
    email: string;
  };
}

interface GelatoOrderResult {
  id: string;
  status: string;
}

export async function createGelatoOrder(input: GelatoOrderInput): Promise<GelatoOrderResult> {
  return gelatoFetch<GelatoOrderResult>("/orders", {
    method: "POST",
    body: JSON.stringify({
      orderReferenceId: input.orderReferenceId,
      customerReferenceId: input.orderReferenceId,
      items: input.items.map((item) => ({
        itemReferenceId: `${input.orderReferenceId}-${item.productUid}`,
        productUid: item.productUid,
        files: [{ type: "default", url: item.fileUrl }],
        quantity: item.quantity,
      })),
      shippingAddress: input.shippingAddress,
    }),
  });
}

export async function getGelatoOrderStatus(orderId: string): Promise<{ status: string }> {
  return gelatoFetch<{ status: string }>(`/orders/${orderId}`);
}
