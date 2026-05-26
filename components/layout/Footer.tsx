import { Link } from "@/i18n/navigation";
import { NAV } from "@/lib/site";
import { useTranslations } from "next-intl";
import { Container } from "./Container";

function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-mono text-sm font-bold tracking-wider text-accent">FOXCASE</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("subsidiary")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("services")}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.footer.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as "/services"}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.labelKey.replace("Footer.", "").replace("Nav.", "") as "services")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("company")}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.footer.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as "/about"}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.labelKey.replace("Footer.", "").replace("Nav.", "") as "about")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("legal")}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as "/legal/mentions"}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.labelKey.replace("Footer.", "") as "mentions")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <span className="font-mono text-xs text-muted-foreground">
            {t("copyright", { year: String(year) })}
          </span>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
