import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Commande confirmée" };

export default async function CheckoutSuccessPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SuccessView />;
}

function SuccessView() {
  const t = useTranslations("Checkout");

  return (
    <>
      <Header />
      <main>
        <section className="py-32">
          <Container className="max-w-2xl text-center">
            <Reveal>
              <div className="mx-auto flex h-20 w-20 items-center justify-center border border-accent">
                <Check className="h-8 w-8 text-accent" strokeWidth={1.5} />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <SectionHeader
                number="00"
                label={t("confirmation")}
                className="mt-8 justify-center"
              />
            </Reveal>
            <Reveal delay={160}>
              <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">
                {t("success_title")}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-muted-foreground">{t("success_message")}</p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                  {t("continue")}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
