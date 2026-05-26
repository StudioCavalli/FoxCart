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
  if (!token) return Response.json({ subscriptions: [] }, { status: 401 });

  const decoded = decodeJwt(token);
  if (!decoded) return Response.json({ subscriptions: [] }, { status: 401 });

  const payload = await getPayload({ config });

  const subs = await payload.find({
    collection: "subscriptions",
    where: { customer: { equals: decoded.id } },
    depth: 1,
    sort: "-createdAt",
  });

  const withCounts = await Promise.all(
    subs.docs.map(async (sub) => {
      const deliverables = await payload.find({
        collection: "deliverables",
        where: { subscription: { equals: sub.id } },
        limit: 100,
      });

      const counts = {
        total: deliverables.totalDocs,
        delivered: deliverables.docs.filter((d) => d.status === "delivered").length,
        inProgress: deliverables.docs.filter(
          (d) => d.status === "in_progress" || d.status === "draft",
        ).length,
        review: deliverables.docs.filter((d) => d.status === "review").length,
      };

      return { ...sub, deliverableCounts: counts };
    }),
  );

  return Response.json({ subscriptions: withCounts });
}
