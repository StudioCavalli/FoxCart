import config from "@/payload.config";
import { getPayload } from "payload";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return Response.json({ results: [] });
  }

  const payload = await getPayload({ config });

  const [products, services] = await Promise.all([
    payload.find({
      collection: "products",
      where: { name: { contains: q }, _status: { equals: "published" } },
      limit: 5,
      depth: 1,
    }),
    payload.find({
      collection: "services",
      where: { name: { contains: q }, _status: { equals: "published" } },
      limit: 5,
      depth: 1,
    }),
  ]);

  const results = [
    ...products.docs.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: typeof p.name === "string" ? p.name : p.slug,
      price: p.basePrice,
      category:
        typeof p.category === "object" && p.category && "name" in p.category
          ? String(p.category.name)
          : "",
      categorySlug:
        typeof p.category === "object" && p.category && "slug" in p.category
          ? String(p.category.slug)
          : "all",
      type: "product" as const,
    })),
    ...services.docs.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: typeof s.name === "string" ? s.name : s.slug,
      price: 0,
      category:
        typeof s.category === "object" && s.category && "name" in s.category
          ? String(s.category.name)
          : "",
      categorySlug: "",
      type: "service" as const,
    })),
  ];

  return Response.json({ results });
}
