import { getShippingRates } from "@/lib/packlink/shipping-rates";
import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postalCode, city, country, items } = body as {
      postalCode: string;
      city?: string;
      country: string;
      items?: { productId: string; quantity: number }[];
    };

    if (!postalCode || !country) {
      return Response.json({ error: "Missing address fields" }, { status: 400 });
    }

    let totalWeight = 0;
    let maxLength = 0;
    let maxWidth = 0;
    let totalHeight = 0;

    if (items?.length) {
      const payload = await getPayload({ config });

      for (const item of items) {
        try {
          const product = await payload.findByID({ collection: "products", id: item.productId });
          const w = (product.weight ?? 500) * item.quantity;
          totalWeight += w;

          const dims = product.dimensions as {
            length?: number;
            width?: number;
            height?: number;
          } | null;
          if (dims) {
            if ((dims.length ?? 0) > maxLength) maxLength = dims.length ?? 0;
            if ((dims.width ?? 0) > maxWidth) maxWidth = dims.width ?? 0;
            totalHeight += (dims.height ?? 5) * item.quantity;
          }
        } catch {
          totalWeight += 500 * item.quantity;
        }
      }
    }

    if (totalWeight === 0) totalWeight = 1000;
    if (maxLength === 0) maxLength = 30;
    if (maxWidth === 0) maxWidth = 20;
    if (totalHeight === 0) totalHeight = 10;

    const rates = await getShippingRates({
      postalCode,
      city: city ?? "",
      country,
      weight: totalWeight,
      length: maxLength,
      width: maxWidth,
      height: Math.min(totalHeight, 150),
    });

    return Response.json({
      rates,
      packageInfo: { weight: totalWeight, length: maxLength, width: maxWidth, height: totalHeight },
    });
  } catch (err) {
    console.error("Shipping rates error:", err);
    return Response.json({ error: "Failed to get rates" }, { status: 500 });
  }
}
