import config from "@/payload.config";
import type { Where } from "payload";
import { getPayload } from "payload";

export async function getServices(opts?: { category?: string; featured?: boolean }) {
  const payload = await getPayload({ config });

  const conditions: Where[] = [{ _status: { equals: "published" } }];
  if (opts?.category) {
    conditions.push({ "category.slug": { equals: opts.category } });
  }
  if (opts?.featured) {
    conditions.push({ featured: { equals: true } });
  }

  return payload.find({
    collection: "services",
    where: { and: conditions },
    sort: "order",
    limit: 50,
    depth: 1,
  });
}

export async function getService(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });

  return result.docs[0] ?? null;
}

export async function getServiceCategories() {
  const payload = await getPayload({ config });

  return payload.find({
    collection: "service-categories",
    sort: "order",
    limit: 50,
  });
}
