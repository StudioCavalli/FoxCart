import { Container, Footer, Header } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { getService } from "@/lib/data/services";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getService(slug);
  if (!service) notFound();

  return <ServiceView service={service as unknown as ServiceData} />;
}

interface ServiceData {
  name: string;
  slug: string;
  tagline?: string;
  pricingType?: string;
  category?: { name?: string } | string;
  pricing?: { tier: string; price: number; unit?: string; features?: { feature: string }[]; highlighted?: boolean; cta?: string; ctaLink?: string }[];
  process?: { step: number; title: string; description: string }[];
  deliverables?: { item: string }[];
  timeline?: string;
}

function ServiceView({ service }: { service: ServiceData }) {
  const t = useTranslations("Services");

  const name = typeof service.name === "string" ? service.name : service.slug;
  const tagline = typeof service.tagline === "string" ? service.tagline : "";
  const catName = typeof service.category === "object" && service.category?.name ? String(service.category.name) : "";
  const pricing = service.pricing ?? [];
  const process = service.process ?? [];

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Breadcrumbs className="mb-8" />
            <Reveal>
              <SectionHeader number="00" label={catName || t("prestations")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.02em]">
                {name}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-muted-foreground">{tagline}</p>
            </Reveal>
          </Container>
        </section>

        {pricing.length > 0 && (
          <section className="border-b border-border py-24">
            <Container>
              <Reveal>
                <SectionHeader number="01" label={t("pricing")} className="mb-12" />
              </Reveal>
              <div className="grid gap-px bg-border md:grid-cols-3">
                {pricing.map((tier, i) => (
                  <Reveal key={tier.tier} delay={80 + i * 80} className="h-full">
                    <div className={`flex h-full flex-col bg-background p-8 ${tier.highlighted ? "ring-1 ring-accent" : ""}`}>
                      <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{tier.tier}</div>
                      <div className="mt-4 text-3xl font-bold tabular-nums tracking-tight">
                        {tier.price > 0 ? `${tier.price} EUR` : t("on_quote")}
                        {tier.unit && <span className="text-base font-normal text-muted-foreground">{tier.unit}</span>}
                      </div>
                      {tier.features && (
                        <ul className="mt-8 flex-1 space-y-3">
                          {tier.features.map((f) => (
                            <li key={f.feature} className="text-sm text-muted-foreground">
                              {f.feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href="/quote"
                        className={`group mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                          tier.highlighted ? "bg-accent text-accent-foreground hover:bg-accent-hover" : "border border-border hover:border-foreground"
                        }`}
                      >
                        {tier.highlighted ? t("choose") : t("get_quote")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {process.length > 0 && (
          <section className="border-b border-border py-24">
            <Container>
              <Reveal>
                <SectionHeader number="02" label={t("process")} className="mb-12" />
              </Reveal>
              <div className="grid gap-8 md:grid-cols-4">
                {process.map((step, i) => (
                  <Reveal key={step.title} delay={80 + i * 80}>
                    <div>
                      <span className="font-mono text-4xl font-bold text-accent/20">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="py-24">
          <Container className="text-center">
            <Reveal>
              <h2 className="text-2xl font-bold md:text-3xl">{t("interested")}</h2>
            </Reveal>
            <Reveal delay={80}>
              <Link
                href="/quote"
                className="group mt-8 inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                {t("get_quote")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
