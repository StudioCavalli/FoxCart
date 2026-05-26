import { SITE } from "@/lib/site";
import config from "@/payload.config";
import type { MetadataRoute } from "next";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const base = SITE.url;

  const staticPages = [
    "",
    "/services",
    "/shop",
    "/about",
    "/contact",
    "/quote",
    "/blog",
    "/lab",
    "/legal/mentions",
    "/legal/privacy",
    "/legal/cgv",
    "/legal/returns",
  ];

  const locales = ["fr", "en"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${base}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  const products = await payload.find({
    collection: "products",
    where: { _status: { equals: "published" } },
    limit: 500,
    depth: 1,
  });
  for (const p of products.docs) {
    const catSlug =
      typeof p.category === "object" && p.category && "slug" in p.category
        ? String(p.category.slug)
        : "all";
    for (const locale of locales) {
      entries.push({
        url: `${base}/${locale}/shop/${catSlug}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const posts = await payload.find({
    collection: "blog-posts",
    where: { _status: { equals: "published" } },
    limit: 500,
  });
  for (const p of posts.docs) {
    for (const locale of locales) {
      entries.push({
        url: `${base}/${locale}/blog/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
