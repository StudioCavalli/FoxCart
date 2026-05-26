import { Container, Footer, Header } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, SectionHeader } from "@/components/visual";
import config from "@/payload.config";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const post = result.docs[0];
  if (!post) notFound();

  return <PostView post={post as unknown as Parameters<typeof PostView>[0]["post"]} />;
}

function PostView({
  post,
}: {
  post: {
    title: string | Record<string, string>;
    lead?: string | Record<string, string> | null;
    author?: string | null;
    publishedAt?: string | null;
    readingTimeMinutes?: number | null;
    tags?: { tag: string }[] | null;
  };
}) {
  const t = useTranslations("Blog");
  const title = typeof post.title === "string" ? post.title : "";
  const lead = typeof post.lead === "string" ? post.lead : "";

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container className="max-w-3xl">
            <Breadcrumbs className="mb-8" />
            <Reveal>
              <SectionHeader number="00" label={t("title")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-2xl font-bold tracking-tight md:text-4xl">{title}</h1>
            </Reveal>
            {lead && (
              <Reveal delay={120}>
                <p className="mt-4 text-lg italic text-muted-foreground">{lead}</p>
              </Reveal>
            )}
            <Reveal delay={160}>
              <div className="mt-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {post.author && <span>{post.author}</span>}
                {post.publishedAt && (
                  <span>{new Date(post.publishedAt).toLocaleDateString("fr-FR")}</span>
                )}
                {post.readingTimeMinutes && (
                  <span>{t("min_read", { minutes: String(post.readingTimeMinutes) })}</span>
                )}
              </div>
            </Reveal>
            {post.tags && post.tags.length > 0 && (
              <Reveal delay={200}>
                <div className="mt-4 flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.tag}
                      className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </Container>
        </section>

        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="text-sm leading-relaxed text-muted-foreground">
              <p>Le contenu de cet article est geré via l'éditeur Lexical dans Payload CMS.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
