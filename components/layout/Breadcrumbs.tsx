"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useMemo } from "react";

const labelMap: Record<string, string> = {
  services: "Nav.services",
  shop: "Nav.shop",
  about: "Nav.about",
  blog: "Nav.blog",
  contact: "Nav.contact",
  quote: "Nav.quote",
  account: "Nav.account",
  cart: "Nav.cart",
  lab: "Nav.lab",
  legal: "Footer.legal",
  checkout: "Checkout.title",
};

function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((seg, i) => ({
      label: labelMap[seg] ? t(labelMap[seg] as "Nav.services") : decodeURIComponent(seg),
      href: `/${segments.slice(0, i + 1).join("/")}`,
      isLast: i === segments.length - 1,
    }));
  }, [pathname, t]);

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5", className)}>
      <Link
        href="/"
        className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        FoxCase
      </Link>
      {crumbs.map((crumb) => (
        <Fragment key={crumb.href}>
          <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
          {crumb.isLast ? (
            <span className="font-mono text-xs text-foreground">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href as "/services"}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {crumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export { Breadcrumbs };
