import { Container, Footer, Header } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { getProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { AddToCartButton } from "../AddToCartButton";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const result = await getProducts({ category });
  const products = result.docs;

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Breadcrumbs className="mb-8" />
            <Reveal>
              <SectionHeader number="00" label="Categorie" className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-3xl font-bold tracking-tight capitalize md:text-4xl">
                {category.replace(/-/g, " ")}
              </h1>
            </Reveal>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            {products.length === 0 ? (
              <div className="py-24 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
                <p className="mt-4 text-muted-foreground">Aucun produit dans cette categorie.</p>
              </div>
            ) : (
              <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, i) => (
                  <Reveal key={product.id} delay={60 + i * 40} className="h-full">
                    <div className="flex h-full flex-col bg-background p-6 transition-colors hover:bg-surface">
                      <Link href={`/shop/${category}/${product.slug}` as "/shop"}>
                        <div className="mb-4 aspect-[4/3] w-full bg-surface" />
                        <h3 className="text-sm font-semibold tracking-tight">
                          {typeof product.name === "string" ? product.name : product.slug}
                        </h3>
                        <div className="mt-2 font-mono text-sm text-accent">
                          {formatPrice(product.basePrice)}
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
