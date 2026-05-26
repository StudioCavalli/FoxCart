import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import config from "@/payload.config";
import { ArrowRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";

export const metadata: Metadata = { title: "Blog" };

interface BlogPost {
  id: string | number;
  slug: string;
  title: string | Record<string, string>;
  lead?: string | Record<string, string> | null;
  author?: string | null;
  publishedAt?: string | null;
  tags?: { tag: string }[] | null;
  readingTimeMinutes?: number | null;
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection: "blog-posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 20,
  });

  return <BlogView posts={posts.docs as unknown as BlogPost[]} />;
}

function BlogView({
  posts,
}: {
  posts: {
    id: string | number;
    slug: string;
    title: string | Record<string, string>;
    lead?: string | Record<string, string> | null;
    author?: string | null;
    publishedAt?: string | null;
    tags?: { tag: string }[] | null;
    readingTimeMinutes?: number | null;
  }[];
}) {
  const t = useTranslations("Blog");

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("title")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-muted-foreground">{t("subtitle")}</p>
            </Reveal>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            {posts.length === 0 ? (
              <div className="border border-border p-16 text-center">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Aucun article pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-px bg-border">
                {posts.map((post, i) => {
                  const title = typeof post.title === "string" ? post.title : post.slug;
                  const lead = typeof post.lead === "string" ? post.lead : "";

                  return (
                    <Reveal key={post.id} delay={60 + i * 40}>
                      <Link
                        href={`/blog/${post.slug}` as "/blog"}
                        className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            {post.tags?.map((tag) => (
                              <span
                                key={tag.tag}
                                className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent"
                              >
                                {tag.tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="mt-2 text-lg font-semibold tracking-tight">{title}</h2>
                          {lead && (
                            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{lead}</p>
                          )}
                          <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
                            {post.author && <span>{post.author}</span>}
                            {post.publishedAt && (
                              <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                            )}
                            {post.readingTimeMinutes && (
                              <span>
                                {t("min_read", { minutes: String(post.readingTimeMinutes) })}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
