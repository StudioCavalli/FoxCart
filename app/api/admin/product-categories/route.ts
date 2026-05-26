import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "product-categories", sort: "order", limit: 50 });
  return Response.json(result);
}
