import { GlassCard } from "@/components/glass";
import { Container, Footer, Header } from "@/components/layout";
import { Pattern, Reveal, SectionHeader } from "@/components/visual";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Lab — FoxStudio" };

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LabView />;
}

function LabView() {
  const t = useTranslations("Lab");

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-border py-32">
          <div className="absolute inset-0 -z-10 blueprint opacity-20" aria-hidden="true" />
          <Container className="relative">
            <Reveal>
              <SectionHeader number="00" label={t("section_label")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">{t("mission_text")}</p>
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
                  <SectionHeader number="02" label={t("filiation_title")} className="mb-6" />
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t("filiation_text")}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-24">
          <Container>
            <Reveal>
              <GlassCard
                variant="subtle"
                className="relative overflow-hidden p-10 text-center md:p-16"
              >
                <div className="absolute inset-0 blueprint opacity-10" aria-hidden="true" />
                <div className="relative">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {t("see_projects")}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{t("see_projects_subtitle")}</p>
                  <a
                    href="https://studio.foxcase.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 bg-foreground px-8 py-4 text-sm font-medium text-background transition-colors hover:bg-accent"
                  >
                    studio.foxcase.fr
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
