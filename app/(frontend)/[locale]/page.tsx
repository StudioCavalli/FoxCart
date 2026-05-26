import { GlassCard } from "@/components/glass";
import { Container, Footer, Header } from "@/components/layout";
import { Pattern, Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Code2,
  GraduationCap,
  Megaphone,
  Settings,
  Wrench,
} from "lucide-react";
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

      <main>
        <HeroSection t={t} />
        <ServicesSection t={t} />
        <StatsSection t={t} />
        <CtaSection t={t} />
        <LabSection t={t} />
      </main>

      <Footer />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */

function HeroSection({ t }: { t: ReturnType<typeof useTranslations<"Home">> }) {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden pb-32 pt-48">
      <Pattern />
      <Container className="relative">
        <Reveal>
          <SectionHeader number="01" label="Agence digitale" className="mb-10" />
        </Reveal>

        <Reveal delay={80}>
          <h1 className="max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            {t("hero.title")}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("hero.subtitle")}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-none bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              {t("hero.cta_services")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground"
            >
              {t("hero.cta_shop")}
            </Link>
          </div>
        </Reveal>

        <div className="absolute right-0 bottom-0 hidden font-mono text-[12rem] font-bold leading-none text-foreground/[0.02] select-none lg:block">
          FC
        </div>
      </Container>
    </section>
  );
}

/* ─── Services ──────────────────────────────────────────────────────────────── */

function ServicesSection({ t }: { t: ReturnType<typeof useTranslations<"Home">> }) {
  return (
    <section className="border-t border-border py-32">
      <Container>
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionHeader number="02" label={t("services.title")} className="mb-4" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="max-w-md text-3xl font-bold tracking-tight md:text-4xl">
                {t("services.subtitle")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Voir tout
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={100 + i * 60} className="h-full">
              <div className="flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface">
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-muted-foreground/40">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────────────────── */

function StatsSection({ t }: { t: ReturnType<typeof useTranslations<"Home">> }) {
  const stats = [
    { value: "150+", label: t("stats.projects") },
    { value: "80+", label: t("stats.clients") },
    { value: "5", label: t("stats.years") },
    { value: "98%", label: t("stats.satisfaction") },
  ];

  return (
    <section className="border-t border-border">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="px-4 py-16 text-center md:px-8 md:py-24">
                <div className="font-mono text-4xl font-bold tabular-nums tracking-tight text-accent md:text-6xl">
                  {stat.value}
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── CTA ───────────────────────────────────────────────────────────────────── */

function CtaSection({ t }: { t: ReturnType<typeof useTranslations<"Home">> }) {
  return (
    <section className="border-t border-border py-32 md:py-40">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionHeader number="03" label="Contact" className="mb-8" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {t("cta.title")}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-muted-foreground">{t("cta.subtitle")}</p>
          </Reveal>
          <Reveal delay={240}>
            <Link
              href="/quote"
              className="group mt-10 inline-flex items-center gap-2 rounded-none bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {t("cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ─── Lab ───────────────────────────────────────────────────────────────────── */

function LabSection({ t }: { t: ReturnType<typeof useTranslations<"Home">> }) {
  return (
    <section className="border-t border-border py-32">
      <Container>
        <Reveal>
          <GlassCard variant="subtle" className="relative overflow-hidden p-10 md:p-16">
            <Pattern className="opacity-[0.06]" />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <SectionHeader number="04" label="R&D" className="mb-4" />
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("lab.title")}</h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("lab.subtitle")}</p>
              </div>
              <a
                href="https://foxstudio.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-foreground"
              >
                {t("lab.button")}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const services = [
  {
    icon: BarChart3,
    title: "Strategie",
    description: "Business plan, business model, etude de marche. Structurez votre vision.",
  },
  {
    icon: Code2,
    title: "Digital",
    description: "Sites web, applications mobiles, SaaS. Du concept au deploiement.",
  },
  {
    icon: Megaphone,
    title: "Communication",
    description: "Identite visuelle, charte graphique, community management.",
  },
  {
    icon: Settings,
    title: "Gestion",
    description: "ERP/CRM sur mesure, chefferie de projet, consulting digital.",
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Formations dev, outils digitaux, workshops pour ecoles et entreprises.",
  },
  {
    icon: Wrench,
    title: "Support",
    description: "Maintenance, hebergement, support technique. On veille sur vos outils.",
  },
];
