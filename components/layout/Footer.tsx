import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "./Container";

function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-mono text-sm font-bold tracking-wider text-accent">FOXCASE</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("subsidiary")}
            </p>
          </div>

          <FooterColumn title={t("services")}>
            <FooterLink href="/services">{t("services")}</FooterLink>
            <FooterLink href="/shop">{t("shop")}</FooterLink>
            <FooterLink href="/quote">{t("quote")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("company")}>
            <FooterLink href="/about">{t("about")}</FooterLink>
            <FooterLink href="/blog">{t("blog")}</FooterLink>
            <FooterLink href="/contact">{t("contact")}</FooterLink>
            <FooterLink href="/lab">{t("lab")}</FooterLink>
          </FooterColumn>

          <FooterColumn title={t("legal")}>
            <FooterLink href="/legal/mentions">{t("mentions")}</FooterLink>
            <FooterLink href="/legal/privacy">{t("privacy")}</FooterLink>
            <FooterLink href="/legal/cgv">{t("cgv")}</FooterLink>
            <FooterLink href="/legal/returns">{t("returns")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <span className="font-mono text-xs text-muted-foreground">
            {t("copyright", { year: String(year) })}
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as "/services"}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

export { Footer };
