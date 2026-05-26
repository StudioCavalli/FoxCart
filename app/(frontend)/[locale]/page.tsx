import { GlassCard } from "@/components/glass";
import { Container, Footer, Header } from "@/components/layout";
import { Pattern, Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeView />;
}

function HomeView() {
  const t = useTranslations("Home");

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-32 md:py-48">
          <Pattern className="opacity-[0.03]" />
          <Container className="relative">
            <Reveal>
              <SectionHeader number="01" label="Agence digitale" className="mb-8" />
            </Reveal>
            <Reveal delay={100}>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                {t("hero.title")}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("hero.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-accent-hover"
                >
                  {t("hero.cta_services")}
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface"
                >
                  {t("hero.cta_shop")}
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Services overview */}
        <section className="border-y border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="02" label={t("services.title")} className="mb-4" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mb-12 max-w-lg text-3xl font-bold tracking-tight md:text-4xl">
                {t("services.subtitle")}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={150 + i * 80}>
                  <GlassCard className="p-6">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="py-20">
          <Container>
            <Reveal>
              <SectionHeader number="03" label={t("stats.projects")} className="mb-12" />
            </Reveal>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "150+", label: t("stats.projects") },
                { value: "80+", label: t("stats.clients") },
                { value: "5+", label: t("stats.years") },
                { value: "98%", label: t("stats.satisfaction") },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 100}>
                  <div className="text-center">
                    <div className="text-3xl font-bold tabular-nums text-primary md:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24">
          <Container className="text-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-primary-foreground md:text-5xl">
                {t("cta.title")}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mx-auto mt-4 max-w-md text-lg text-primary-foreground/80">
                {t("cta.subtitle")}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Link
                href="/quote"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-background px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-surface"
              >
                {t("cta.button")}
              </Link>
            </Reveal>
          </Container>
        </section>

        {/* Lab teaser */}
        <section className="py-24">
          <Container>
            <Reveal>
              <GlassCard accent className="flex flex-col items-center p-12 text-center md:p-16">
                <SectionHeader number="04" label="R&D" className="mb-6" />
                <h2 className="max-w-lg text-2xl font-bold tracking-tight md:text-3xl">
                  {t("lab.title")}
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">{t("lab.subtitle")}</p>
                <a
                  href="https://foxstudio.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
                >
                  {t("lab.button")}
                </a>
              </GlassCard>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

const services = [
  {
    icon: "📊",
    title: "Stratégie",
    description: "Business plan, business model, étude de marché. Structurez votre projet.",
  },
  {
    icon: "💻",
    title: "Digital",
    description: "Sites web, applications mobiles, SaaS. Du concept au déploiement.",
  },
  {
    icon: "📣",
    title: "Communication",
    description: "Identité visuelle, charte graphique, community management.",
  },
  {
    icon: "⚙️",
    title: "Gestion",
    description: "ERP/CRM sur mesure, chefferie de projet, consulting digital.",
  },
  {
    icon: "🎓",
    title: "Formation",
    description: "Formations dev, outils digitaux, workshops pour écoles et entreprises.",
  },
  {
    icon: "🛠️",
    title: "Support",
    description: "Maintenance, hébergement, support technique. On veille sur vos outils.",
  },
];
