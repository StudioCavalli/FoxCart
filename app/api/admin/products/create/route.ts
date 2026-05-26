import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });

    const product = await payload.create({
      collection: "products",
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription ?? "",
        category: body.category,
        costPrice: body.costPrice ?? 0,
        marginPercent: body.marginPercent ?? 0,
        basePrice: body.basePrice,
        taxRate: body.taxRate ?? 20,
        fulfillmentType: body.fulfillmentType ?? "internal",
        supplierUrl: body.supplierUrl ?? "",
        weight: body.weight ?? 0,
        dimensions: body.dimensions ?? { length: 0, width: 0, height: 0 },
        hasVariants: false,
        featured: body.featured ?? false,
        isSubscription: body.isSubscription ?? false,
        subscriptionInterval: body.subscriptionInterval,
        publishedAt: new Date().toISOString(),
        _status: "published",
      },
    });

    return Response.json({ product });
  } catch (err) {
    console.error("Create product error:", err);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}
