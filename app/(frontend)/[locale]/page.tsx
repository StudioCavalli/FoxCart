import { GlassCard } from "@/components/glass";
import { Container, Footer, Header } from "@/components/layout";
import { Marquee, Pattern, Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Code2,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  Quote,
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
  const tCommon = useTranslations("Common");

  return (
    <>
      <Header />
      <main>
        <HeroSection t={t} />
        <MarqueeBand t={t} />
        <ServicesSection t={t} tCommon={tCommon} />
        <StatsSection t={t} />
        <TestimonialsSection t={t} />
        <CtaSection t={t} />
        <LabSection t={t} />
      </main>
      <Footer />
    </>
  );
}

type THome = ReturnType<typeof useTranslations<"Home">>;
type TCommon = ReturnType<typeof useTranslations<"Common">>;

function HeroSection({ t }: { t: THome }) {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-56px)] flex-col overflow-hidden border-b border-border">
      {/* Blueprint grid — CSS background like FoxStudio */}
      <div className="absolute inset-0 -z-20 blueprint opacity-40" aria-hidden="true" />

      {/* Halftone pattern — right side, procedural circles */}
      <div
        className="absolute -right-[10%] top-[40%] -z-10 hidden h-[80%] w-[60%] -translate-y-1/2 text-foreground opacity-[0.06] md:block"
        aria-hidden="true"
      >
        <Pattern seed="foxcase-hero" variant="halftone" className="h-full w-full" />
      </div>

      {/* Top metadata strip */}
      <div className="flex items-center justify-between border-b border-border px-[var(--grid-margin)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>00 ▸ {t("manifesto")}</span>
        <span className="hidden tabular-nums md:inline">{t("location")}</span>
        <span className="tabular-nums">v0.1.0</span>
      </div>

      {/* Title + manifesto */}
      <div className="flex flex-1 flex-col justify-between px-[var(--grid-margin)] py-16 md:py-24">
        <h1 className="font-medium leading-[0.88] tracking-[-0.03em] text-[clamp(72px,14vw,240px)]">
          FoxCase<span className="text-accent">.</span>
        </h1>

        <div className="mt-16 grid gap-8 md:mt-0 md:grid-cols-[1fr_1fr] md:items-end">
          <div className="space-y-3 text-[clamp(18px,2.4vw,32px)] leading-snug md:max-w-[28ch]">
            <Reveal>
              <p>{t("hero.subtitle")}</p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent"
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
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div className="flex items-center justify-between border-t border-border px-[var(--grid-margin)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span aria-hidden="true">↓ {t("scroll")}</span>
        <span className="hidden md:inline">FoxCase · {t("established")}</span>
        <span className="tabular-nums">{t("location")}</span>
      </div>
    </section>
  );
}

function MarqueeBand({ t }: { t: THome }) {
  const keys = [
    "business_plan",
    "sites_web",
    "apps_mobiles",
    "saas",
    "erp",
    "identite_visuelle",
    "formation",
    "ecommerce",
    "chefferie",
    "kakemonos",
    "cartes_visite",
    "livres",
  ] as const;
  return (
    <div className="overflow-hidden border-b border-border py-4">
      <Marquee
        speed={40}
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {keys.map((key) => (
          <span key={key} className="mx-6 inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-accent" />
            {t(`marquee.${key}`)}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

const serviceIcons: Record<string, LucideIcon> = {
  strategie: BarChart3,
  digital: Code2,
  communication: Megaphone,
  gestion: Settings,
  formation: GraduationCap,
  support: Wrench,
};
const serviceKeys = [
  "strategie",
  "digital",
  "communication",
  "gestion",
  "formation",
  "support",
] as const;

function ServicesSection({ t, tCommon }: { t: THome; tCommon: TCommon }) {
  return (
    <section className="border-b border-border py-32">
      <Container>
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionHeader number="01" label={t("services.title")} className="mb-4" />
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
              {t("see_all")}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key]!;
            return (
              <Reveal key={key} delay={100 + i * 60} className="h-full">
                <div className="flex h-full flex-col bg-background p-8 transition-colors hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-muted-foreground/40">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">
                    {t(`service_items.${key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`service_items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function StatsSection({ t }: { t: THome }) {
  const stats = [
    { value: "150+", label: t("stats.projects") },
    { value: "80+", label: t("stats.clients") },
    { value: "5", label: t("stats.years") },
    { value: "98%", label: t("stats.satisfaction") },
  ];
  return (
    <section className="border-b border-border">
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

function TestimonialsSection({ t }: { t: THome }) {
  return (
    <section className="border-b border-border py-32">
      <Container>
        <Reveal>
          <SectionHeader number="02" label={t("testimonials.title")} className="mb-16" />
        </Reveal>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={100 + i * 80} className="h-full">
              <div className="flex h-full flex-col bg-background p-8">
                <Quote className="h-5 w-5 text-accent/30" strokeWidth={1.5} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.quote}
                </blockquote>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {item.role} — {item.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CtaSection({ t }: { t: THome }) {
  return (
    <section className="border-b border-border py-32 md:py-40">
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
              className="group mt-10 inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
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

function LabSection({ t }: { t: THome }) {
  return (
    <section className="py-32">
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
                href="https://studio.foxcase.fr"
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

const testimonials = [
  {
    name: "Marie Dupont",
    company: "TechStart",
    role: "CEO",
    quote:
      "FoxCase a transformé notre vision en un produit digital concret. Leur approche structurée et leur expertise technique ont fait toute la différence.",
  },
  {
    name: "Thomas Bernard",
    company: "GreenCorp",
    role: "Directeur Marketing",
    quote:
      "De la stratégie à la réalisation, l'équipe a su comprendre nos enjeux et livrer un site qui dépasse nos attentes.",
  },
  {
    name: "Sophie Laurent",
    company: "Artisan Digital",
    role: "Fondatrice",
    quote:
      "Un accompagnement complet, de la création de notre identité visuelle jusqu'au déploiement de notre e-commerce.",
  },
];
