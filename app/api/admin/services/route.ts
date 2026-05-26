import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "services", sort: "order", limit: 100, depth: 1 });
  return Response.json(result);
}
