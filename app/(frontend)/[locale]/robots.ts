import { SITE } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/account", "/_next", "/cart", "/checkout"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
