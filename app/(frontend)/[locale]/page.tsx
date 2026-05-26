import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <HomeContent params={params} />;
}

async function HomeContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeView />;
}

function HomeView() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Nav");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--grid-margin)] flex items-center justify-between h-16">
          <span className="font-mono text-sm font-bold tracking-wider text-accent">FOXCASE</span>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {tNav("services")}
            </Link>
            <Link
              href="/shop"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {tNav("shop")}
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {tNav("about")}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {tNav("contact")}
            </Link>
          </nav>
          <Link
            href="/quote"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
          >
            {tNav("quote")}
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-32 md:py-48">
          <div className="mx-auto max-w-[var(--grid-max)] px-[var(--grid-margin)]">
            <div className="max-w-3xl">
              <span className="font-mono text-xs tracking-widest text-accent uppercase mb-6 block">
                01 — Agence digitale
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-xl mb-10 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
                >
                  {t("hero.cta_services")}
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground hover:bg-surface transition-colors"
                >
                  {t("hero.cta_shop")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border">
          <div className="mx-auto max-w-[var(--grid-max)] px-[var(--grid-margin)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "150+", label: t("stats.projects") },
                { value: "80+", label: t("stats.clients") },
                { value: "5+", label: t("stats.years") },
                { value: "98%", label: t("stats.satisfaction") },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted mt-2 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-accent">
          <div className="mx-auto max-w-[var(--grid-max)] px-[var(--grid-margin)] text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-accent-foreground mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-accent-foreground/80 mb-8">{t("cta.subtitle")}</p>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-lg bg-background px-8 py-4 text-base font-medium text-foreground hover:bg-surface transition-colors"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-[var(--grid-max)] px-[var(--grid-margin)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-sm text-muted">
              © {new Date().getFullYear()} FoxCase
            </span>
            <span className="text-xs text-muted-foreground">
              FoxStudio est le laboratoire R&D de FoxCase
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
