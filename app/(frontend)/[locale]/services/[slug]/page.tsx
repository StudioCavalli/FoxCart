import { Container, Footer, Header } from "@/components/layout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Service",
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = serviceDetails[slug];
  if (!service) notFound();

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-24">
          <Container>
            <Breadcrumbs className="mb-8" />
            <Reveal>
              <SectionHeader number="00" label={service.category} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.02em]">
                {service.name}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-muted-foreground">{service.description}</p>
            </Reveal>
          </Container>
        </section>

        {/* Pricing */}
        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="01" label="Tarifs" className="mb-12" />
            </Reveal>
            <div className="grid gap-px bg-border md:grid-cols-3">
              {service.tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={80 + i * 80} className="h-full">
                  <div
                    className={`flex h-full flex-col bg-background p-8 ${tier.highlighted ? "ring-1 ring-accent" : ""}`}
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {tier.name}
                    </div>
                    <div className="mt-4 text-3xl font-bold tabular-nums tracking-tight">
                      {tier.price}
                      {tier.unit && (
                        <span className="text-base font-normal text-muted-foreground">
                          {tier.unit}
                        </span>
                      )}
                    </div>
                    <ul className="mt-8 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            strokeWidth={1.5}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/quote"
                      className={`group mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                        tier.highlighted
                          ? "bg-accent text-accent-foreground hover:bg-accent-hover"
                          : "border border-border hover:border-foreground"
                      }`}
                    >
                      {tier.highlighted ? "Choisir" : "Demander un devis"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="02" label="Processus" className="mb-12" />
            </Reveal>
            <div className="grid gap-8 md:grid-cols-4">
              {service.process.map((step, i) => (
                <Reveal key={step.title} delay={80 + i * 80}>
                  <div>
                    <span className="font-mono text-4xl font-bold text-accent/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24">
          <Container className="text-center">
            <Reveal>
              <h2 className="text-2xl font-bold md:text-3xl">Interesse par cette prestation ?</h2>
            </Reveal>
            <Reveal delay={80}>
              <Link
                href="/quote"
                className="group mt-8 inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Demander un devis
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

/* ─── Data ──────────────────────────────────────────────────────────────────── */

interface ServiceDetail {
  name: string;
  category: string;
  description: string;
  tiers: {
    name: string;
    price: string;
    unit?: string;
    features: string[];
    highlighted: boolean;
  }[];
  process: { title: string; description: string }[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "site-vitrine": {
    name: "Site vitrine",
    category: "Digital",
    description:
      "Un site web professionnel, performant et optimise SEO qui represente fidelement votre activite et convertit vos visiteurs en clients.",
    tiers: [
      {
        name: "Essentiel",
        price: "3 000 EUR",
        features: [
          "Design responsive sur mesure",
          "Jusqu'a 5 pages",
          "Optimisation SEO de base",
          "Formulaire de contact",
          "Hebergement 1 an inclus",
        ],
        highlighted: false,
      },
      {
        name: "Pro",
        price: "5 500 EUR",
        features: [
          "Tout Essentiel +",
          "Jusqu'a 15 pages",
          "Blog integre",
          "SEO avance",
          "Analytics",
          "Multi-langue (2 langues)",
          "Support 6 mois",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        features: [
          "Tout Pro +",
          "Pages illimitees",
          "CMS sur mesure",
          "Integrations API",
          "Multi-langue illimite",
          "Support 12 mois",
          "SLA garanti",
        ],
        highlighted: false,
      },
    ],
    process: [
      {
        title: "Cadrage",
        description: "Analyse de vos besoins, benchmark et definition du perimetre.",
      },
      { title: "Conception", description: "Wireframes, maquettes et validation du design." },
      { title: "Developpement", description: "Integration, developpement et tests qualite." },
      { title: "Livraison", description: "Mise en production, formation et transfert." },
    ],
  },
  "business-plan": {
    name: "Business Plan",
    category: "Strategie",
    description:
      "Un business plan solide et actionnable pour convaincre investisseurs et partenaires.",
    tiers: [
      {
        name: "Essentiel",
        price: "1 500 EUR",
        features: [
          "Executive summary",
          "Analyse de marche",
          "Modele economique",
          "Previsionnel 3 ans",
        ],
        highlighted: false,
      },
      {
        name: "Pro",
        price: "3 000 EUR",
        features: [
          "Tout Essentiel +",
          "Benchmark concurrentiel",
          "Strategie marketing",
          "Plan de financement",
          "Pitch deck",
          "2 revisions",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        features: [
          "Tout Pro +",
          "Due diligence",
          "Accompagnement investisseurs",
          "Revisions illimitees",
        ],
        highlighted: false,
      },
    ],
    process: [
      { title: "Brief", description: "Entretien approfondi sur votre projet et vos ambitions." },
      {
        title: "Recherche",
        description: "Analyse de marche, benchmark et validation des hypotheses.",
      },
      { title: "Redaction", description: "Structuration et redaction du business plan complet." },
      { title: "Finalisation", description: "Revisions, mise en page et livraison." },
    ],
  },
};
