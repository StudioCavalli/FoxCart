import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "products", sort: "-createdAt", limit: 100, depth: 1 });
  return Response.json(result);
}
