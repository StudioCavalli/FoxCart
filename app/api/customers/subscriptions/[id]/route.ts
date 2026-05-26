import config from "@/payload.config";
import { cookies } from "next/headers";
import { getPayload } from "payload";

function decodeJwt(token: string): { id: number | string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1]!, "base64url").toString());
  } catch {
    return null;
  }
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-customer-token")?.value;
  if (!token) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const decoded = decodeJwt(token);
  if (!decoded) return Response.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await getPayload({ config });

  const sub = await payload.findByID({ collection: "subscriptions", id, depth: 1 });

  const customerId =
    typeof sub.customer === "object" && sub.customer ? sub.customer.id : sub.customer;
  if (String(customerId) !== String(decoded.id)) {
    return Response.json({ error: "Not authorized" }, { status: 403 });
  }

  const deliverables = await payload.find({
    collection: "deliverables",
    where: { subscription: { equals: id } },
    sort: "-createdAt",
    limit: 100,
    depth: 1,
  });

  return Response.json({ subscription: sub, deliverables: deliverables.docs });
}
