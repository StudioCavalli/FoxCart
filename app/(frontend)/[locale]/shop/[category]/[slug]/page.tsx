import { Container, Footer, Header } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, SectionHeader } from "@/components/visual";
import { getProduct } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../AddToCartButton";

export const dynamic = "force-dynamic";
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProduct(slug);
  if (!product) notFound();

  const name = typeof product.name === "string" ? product.name : product.slug;
  const desc = typeof product.shortDescription === "string" ? product.shortDescription : "";
  const catName =
    typeof product.category === "object" && product.category && "name" in product.category
      ? String(product.category.name)
      : "";

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Breadcrumbs className="mb-8" />
            <div className="grid gap-16 lg:grid-cols-2">
              {/* Image */}
              <Reveal>
                <div className="aspect-square w-full bg-surface" />
              </Reveal>

              {/* Info */}
              <Reveal delay={80}>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {catName}
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{name}</h1>
                  <p className="mt-4 text-muted-foreground">{desc}</p>

                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-bold text-accent">
                      {formatPrice(product.basePrice)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="font-mono text-lg text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Variants */}
                  {product.hasVariants && product.variants && (
                    <div className="mt-8 space-y-6">
                      {(
                        product.variants as {
                          name: string;
                          options: { label: string; sku: string }[];
                        }[]
                      ).map((variant) => (
                        <div key={variant.name}>
                          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {variant.name}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {variant.options?.map((opt) => (
                              <button
                                key={opt.sku}
                                type="button"
                                className="border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-foreground"
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8">
                    <AddToCartButton
                      productId={String(product.id)}
                      name={name}
                      price={product.basePrice}
                    />
                  </div>

                  <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Ref: {product.slug}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Description */}
        <section className="border-b border-border py-16">
          <Container className="max-w-3xl">
            <SectionHeader number="01" label="Description" className="mb-8" />
            <div className="text-sm leading-relaxed text-muted-foreground">{desc}</div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
