import config from "@/payload.config";
import type { Where } from "payload";
import { getPayload } from "payload";

export async function getProducts(opts?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  sort?: string;
}) {
  const payload = await getPayload({ config });

  const conditions: Where[] = [{ _status: { equals: "published" } }];
  if (opts?.category) {
    conditions.push({ "category.slug": { equals: opts.category } });
  }
  if (opts?.featured) {
    conditions.push({ featured: { equals: true } });
  }

  return payload.find({
    collection: "products",
    where: { and: conditions },
    limit: opts?.limit ?? 20,
    page: opts?.page ?? 1,
    sort: opts?.sort ?? "-publishedAt",
    depth: 1,
  });
}

export async function getProduct(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });

  return result.docs[0] ?? null;
}

export async function getProductCategories() {
  const payload = await getPayload({ config });

  return payload.find({
    collection: "product-categories",
    sort: "order",
    limit: 50,
  });
}
