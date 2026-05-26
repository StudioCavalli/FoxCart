import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "customers", sort: "-createdAt", limit: 100 });
  return Response.json(result);
}
