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

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-customer-token")?.value;
  if (!token) return Response.json({ count: 0, items: [] });

  const decoded = decodeJwt(token);
  if (!decoded) return Response.json({ count: 0, items: [] });

  const payload = await getPayload({ config });

  const subs = await payload.find({
    collection: "subscriptions",
    where: { customer: { equals: decoded.id } },
    limit: 50,
  });

  if (subs.totalDocs === 0) return Response.json({ count: 0, items: [] });

  const subIds = subs.docs.map((s) => s.id);

  const pending = await payload.find({
    collection: "deliverables",
    where: {
      and: [{ subscription: { in: subIds.join(",") } }, { status: { equals: "review" } }],
    },
    sort: "-createdAt",
    limit: 10,
  });

  const recent = await payload.find({
    collection: "deliverables",
    where: { subscription: { in: subIds.join(",") } },
    sort: "-updatedAt",
    limit: 5,
  });

  return Response.json({
    count: pending.totalDocs,
    pendingReview: pending.docs.map((d) => ({ id: d.id, title: d.title, type: d.type })),
    recentActivity: recent.docs.map((d) => ({
      id: d.id,
      title: d.title,
      status: d.status,
      updatedAt: d.updatedAt,
    })),
  });
}
