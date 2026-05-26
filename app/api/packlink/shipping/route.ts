import { getShippingRates } from "@/lib/packlink/shipping-rates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postalCode, city, country, weight, length, width, height } = body;

    if (!postalCode || !country) {
      return Response.json({ error: "Missing address fields" }, { status: 400 });
    }

    const rates = await getShippingRates({
      postalCode,
      city: city ?? "",
      country,
      weight: weight ?? 1000,
      length: length ?? 30,
      width: width ?? 20,
      height: height ?? 10,
    });

    return Response.json({ rates });
  } catch (err) {
    console.error("Shipping rates error:", err);
    return Response.json({ error: "Failed to get rates" }, { status: 500 });
  }
}
