import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET() {
  const payload = await getPayload({ config });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [orders, customers, subscriptions, quotes, pendingRevisions, recentOrders] =
    await Promise.all([
      payload.find({
        collection: "orders",
        where: { createdAt: { greater_than: startOfMonth } },
        limit: 0,
      }),
      payload.count({ collection: "customers" }),
      payload.find({
        collection: "subscriptions",
        where: { status: { equals: "active" } },
        limit: 0,
      }),
      payload.find({
        collection: "quotes",
        where: { status: { equals: "new" } },
        limit: 0,
      }),
      payload.find({
        collection: "deliverables",
        where: { status: { equals: "revision_requested" } },
        limit: 0,
      }),
      payload.find({
        collection: "orders",
        sort: "-createdAt",
        limit: 10,
        depth: 1,
      }),
    ]);

  const revenue = (recentOrders.docs as unknown as { total?: number; createdAt: string }[])
    .filter((o) => new Date(o.createdAt) >= new Date(startOfMonth))
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return Response.json({
    revenue,
    ordersCount: orders.totalDocs,
    customersCount: customers.totalDocs,
    activeSubscriptions: subscriptions.totalDocs,
    pendingQuotes: quotes.totalDocs,
    pendingRevisions: pendingRevisions.totalDocs,
    recentOrders: recentOrders.docs.slice(0, 5).map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt,
    })),
  });
}
