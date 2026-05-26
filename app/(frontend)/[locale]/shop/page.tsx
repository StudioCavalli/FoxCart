import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { getProductCategories, getProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Package } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AddToCartButton } from "./AddToCartButton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Boutique" };

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const category = sp.category;
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts({ category, limit: 20 }),
    getProductCategories(),
  ]);
  const products = productsResult.docs;
  const categories = categoriesResult.docs;

  return <ShopView products={products} categories={categories} category={category} />;
}

function ShopView({
  products,
  categories,
  category,
}: {
  products: typeof import("@/lib/data/products").getProducts extends (
    ...a: never[]
  ) => Promise<{ docs: infer D }>
    ? D
    : never;
  categories: typeof import("@/lib/data/products").getProductCategories extends (
    ...a: never[]
  ) => Promise<{ docs: infer D }>
    ? D
    : never;
  category?: string;
}) {
  const t = useTranslations("Shop");

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

        <section className="border-b border-border">
          <Container className="flex items-center gap-4 overflow-x-auto py-4">
            <Link
              href="/shop"
              className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${!category ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t("all")}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}` as "/shop"}
                className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${category === cat.slug ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {typeof cat.name === "string" ? cat.name : cat.slug}
              </Link>
            ))}
          </Container>
        </section>

        <section className="border-b border-border py-16">
          <Container>
            {products.length === 0 ? (
              <div className="py-24 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
                <p className="mt-4 text-muted-foreground">{t("no_results")}</p>
                <Link
                  href="/admin"
                  className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-accent-hover"
                >
                  {t("admin_link")}{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, i) => (
                  <Reveal key={product.id} delay={60 + i * 40} className="h-full">
                    <div className="flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface">
                      <Link
                        href={
                          `/shop/${(product.category as { slug?: string })?.slug ?? "all"}/${product.slug}` as "/shop"
                        }
                      >
                        <div className="mb-4 aspect-[4/3] w-full bg-surface" />
                        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          {typeof product.category === "object" &&
                          product.category &&
                          "name" in product.category
                            ? String(product.category.name)
                            : ""}
                        </div>
                        <h3 className="mt-1 text-sm font-semibold tracking-tight">
                          {typeof product.name === "string" ? product.name : product.slug}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="font-mono text-sm text-accent">
                            {formatPrice(product.basePrice)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="font-mono text-xs text-muted-foreground line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="mt-4 border-t border-border pt-4">
                        <AddToCartButton
                          productId={String(product.id)}
                          name={typeof product.name === "string" ? product.name : product.slug}
                          price={product.basePrice}
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
