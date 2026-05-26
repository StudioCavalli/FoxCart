import config from "@/payload.config";
import { getPayload } from "payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = await getPayload({ config });

    const post = await payload.create({
      collection: "blog-posts",
      data: {
        title: body.title,
        slug: body.slug,
        lead: body.lead ?? "",
        author: body.author ?? "",
        tags: body.tags ?? [],
        readingTimeMinutes: body.readingTimeMinutes ?? 5,
        publishedAt: new Date().toISOString(),
        _status: body.publish ? "published" : "draft",
      },
    });

    return Response.json({ post });
  } catch (err) {
    console.error("Create blog post error:", err);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}
