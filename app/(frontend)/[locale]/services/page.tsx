import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { getServiceCategories, getServices } from "@/lib/data/services";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [servicesResult, categoriesResult] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  return (
    <ServicesView
      services={servicesResult.docs as unknown as Service[]}
      categories={categoriesResult.docs as unknown as Category[]}
    />
  );
}

interface Service {
  id: string | number;
  slug: string;
  name: string;
  tagline?: string;
  icon?: string;
  pricingType?: string;
  category?: { id: string | number; slug: string; name: string } | string;
}

interface Category {
  id: string | number;
  slug: string;
  name: string;
}

function ServicesView({ services, categories }: { services: Service[]; categories: Category[] }) {
  const t = useTranslations("Services");

  const grouped = categories.map((cat) => ({
    ...cat,
    services: services.filter((s) => {
      const catId = typeof s.category === "object" && s.category ? s.category.id : s.category;
      return String(catId) === String(cat.id);
    }),
  }));

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("prestations")} className="mb-6" />
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

        {grouped.map((cat, ci) => (
          <section key={cat.id} className="border-b border-border py-24">
            <Container>
              <Reveal>
                <SectionHeader
                  number={String(ci + 1).padStart(2, "0")}
                  label={typeof cat.name === "string" ? cat.name : cat.slug}
                  meta={t("services_count", { count: String(cat.services.length) })}
                  className="mb-12"
                />
              </Reveal>

              {cat.services.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun service dans cette catégorie.</p>
              ) : (
                <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                  {cat.services.map((s, si) => (
                    <Reveal key={s.id} delay={80 + si * 60} className="h-full">
                      <Link
                        href={`/services/${s.slug}` as "/services"}
                        className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                            {s.pricingType === "quote" ? t("on_quote") : s.pricingType === "hourly" ? t("per_hour") : t("from")}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold tracking-tight">
                          {typeof s.name === "string" ? s.name : s.slug}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {s.tagline ?? ""}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </Container>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
