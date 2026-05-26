import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Code2,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  Settings,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Services",
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesView />;
}

function ServicesView() {
  const t = useTranslations("Services");

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label="Prestations" className="mb-6" />
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

        {/* Categories */}
        {categories.map((cat, ci) => (
          <section key={cat.slug} className="border-b border-border py-24">
            <Container>
              <Reveal>
                <SectionHeader
                  number={String(ci + 1).padStart(2, "0")}
                  label={cat.name}
                  meta={`${cat.services.length} services`}
                  className="mb-12"
                />
              </Reveal>

              <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s, si) => (
                  <Reveal key={s.slug} delay={80 + si * 60} className="h-full">
                    <Link
                      href={`/services/${s.slug}` as "/services"}
                      className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface"
                    >
                      <div className="flex items-center justify-between">
                        <cat.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                        <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                      </div>
                      <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <div className="mt-6 font-mono text-xs text-accent">{s.price}</div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */

interface ServiceCategory {
  slug: string;
  name: string;
  icon: LucideIcon;
  services: { slug: string; name: string; description: string; price: string }[];
}

const categories: ServiceCategory[] = [
  {
    slug: "strategie",
    name: "Strategie",
    icon: BarChart3,
    services: [
      {
        slug: "business-plan",
        name: "Business Plan",
        description: "Structurez votre projet avec un business plan solide et actionnable.",
        price: "A partir de 1 500 EUR",
      },
      {
        slug: "business-model",
        name: "Business Model Canvas",
        description: "Definissez votre modele economique avec une approche structuree.",
        price: "A partir de 800 EUR",
      },
      {
        slug: "etude-de-marche",
        name: "Etude de marche",
        description: "Analysez votre marche, la concurrence et les opportunites.",
        price: "A partir de 2 000 EUR",
      },
    ],
  },
  {
    slug: "digital",
    name: "Digital",
    icon: Code2,
    services: [
      {
        slug: "site-vitrine",
        name: "Site vitrine",
        description: "Un site web professionnel qui represente votre activite.",
        price: "A partir de 3 000 EUR",
      },
      {
        slug: "site-ecommerce",
        name: "Site e-commerce",
        description: "Vendez en ligne avec une boutique performante et securisee.",
        price: "A partir de 5 000 EUR",
      },
      {
        slug: "application-mobile",
        name: "Application mobile",
        description: "Applications iOS et Android natives ou cross-platform.",
        price: "Sur devis",
      },
      {
        slug: "application-saas",
        name: "Application SaaS",
        description: "Developpement de plateformes web sur mesure.",
        price: "Sur devis",
      },
    ],
  },
  {
    slug: "communication",
    name: "Communication",
    icon: Megaphone,
    services: [
      {
        slug: "identite-visuelle",
        name: "Identite visuelle",
        description: "Logo, charte graphique, univers de marque complet.",
        price: "A partir de 1 200 EUR",
      },
      {
        slug: "community-management",
        name: "Community management",
        description: "Gestion de vos reseaux sociaux et strategie de contenu.",
        price: "A partir de 500 EUR/mois",
      },
      {
        slug: "strategie-com",
        name: "Strategie de communication",
        description: "Plan de communication global adapte a vos objectifs.",
        price: "A partir de 1 500 EUR",
      },
    ],
  },
  {
    slug: "gestion",
    name: "Gestion",
    icon: Settings,
    services: [
      {
        slug: "erp-crm",
        name: "ERP/CRM sur mesure",
        description: "Outils de gestion internes adaptes a vos processus.",
        price: "Sur devis",
      },
      {
        slug: "chefferie-projet",
        name: "Chefferie de projet",
        description: "Pilotage de vos projets digitaux de A a Z.",
        price: "A partir de 600 EUR/jour",
      },
      {
        slug: "consulting",
        name: "Consulting digital",
        description: "Audit, conseil et accompagnement dans votre transformation.",
        price: "A partir de 500 EUR/jour",
      },
    ],
  },
  {
    slug: "formation",
    name: "Formation",
    icon: GraduationCap,
    services: [
      {
        slug: "formation-dev",
        name: "Formation developpement",
        description: "Formations techniques pour ecoles et entreprises.",
        price: "A partir de 800 EUR/jour",
      },
      {
        slug: "formation-outils",
        name: "Formation outils digitaux",
        description: "Maitrisez les outils essentiels a votre activite.",
        price: "A partir de 500 EUR/jour",
      },
    ],
  },
  {
    slug: "support",
    name: "Support",
    icon: Wrench,
    services: [
      {
        slug: "maintenance",
        name: "Maintenance",
        description: "Maintenance corrective et evolutive de vos outils.",
        price: "A partir de 200 EUR/mois",
      },
      {
        slug: "hebergement",
        name: "Hebergement",
        description: "Hebergement haute disponibilite, securise et monitore.",
        price: "A partir de 50 EUR/mois",
      },
      {
        slug: "support-technique",
        name: "Support technique",
        description: "Assistance reactive pour vos problemes techniques.",
        price: "A partir de 300 EUR/mois",
      },
    ],
  },
];
