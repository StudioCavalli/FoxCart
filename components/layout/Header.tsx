"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";

const navItems = [
  { href: "/services" as const, key: "services" },
  { href: "/shop" as const, key: "shop" },
  { href: "/about" as const, key: "about" },
  { href: "/blog" as const, key: "blog" },
  { href: "/contact" as const, key: "contact" },
] as const;

function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,border-color] duration-[var(--duration-fast)]",
        scrolled
          ? "border-border bg-glass-bg backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-wider text-accent">
          FOXCASE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                pathname.startsWith(item.href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {t("quote")}
          </Link>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

export { Header };
