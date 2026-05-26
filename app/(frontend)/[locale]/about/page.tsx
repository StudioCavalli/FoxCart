import { GlassCard } from "@/components/glass";
import { Container, Footer, Header } from "@/components/layout";
import { Pattern, Reveal, SectionHeader } from "@/components/visual";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "À propos" };

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutView />;
}

function AboutView() {
  const t = useTranslations("About");

  const valueKeys = ["transparency", "quality", "custom", "commitment"] as const;

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-border py-32">
          <Pattern />
          <Container className="relative">
            <Reveal>
              <SectionHeader number="00" label={t("title")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                {t("heading")}
              </h1>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border py-24">
          <Container>
            <div className="grid gap-16 md:grid-cols-2">
              <Reveal>
                <div>
                  <SectionHeader number="01" label={t("mission_title")} className="mb-6" />
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("mission_text")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <SectionHeader number="02" label={t("approach_title")} className="mb-6" />
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("approach_text")}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="03" label={t("values_title")} className="mb-12" />
            </Reveal>
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {valueKeys.map((key, i) => (
                <Reveal key={key} delay={80 + i * 60} className="h-full">
                  <div className="flex h-full flex-col bg-background p-8">
                    <span className="font-mono text-3xl font-bold text-accent/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-base font-semibold">{t(`values.${key}.title`)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <Reveal>
              <GlassCard variant="subtle" className="relative overflow-hidden p-10 md:p-16">
                <Pattern className="opacity-[0.04]" />
                <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <SectionHeader number="04" label={t("innovation_title")} className="mb-4" />
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {t("foxstudio_title")}
                    </h2>
                    <p className="mt-3 max-w-md text-sm text-muted-foreground">
                      {t("foxstudio_text")}
                    </p>
                  </div>
                  <a
                    href="https://studio.foxcase.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex shrink-0 items-center gap-2 border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-foreground"
                  >
                    {t("discover")}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </GlassCard>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
