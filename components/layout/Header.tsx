"use client";

import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchCommand } from "@/components/shop/SearchCommand";
import { FoxLogo } from "@/components/visual/FoxLogo";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
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
        "sticky top-0 z-50 transition-all duration-[var(--duration-fast)]",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground"
        >
          <FoxLogo className="h-5 w-5" />
          FoxCase
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
                pathname.startsWith(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="hidden border border-foreground px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background sm:inline-flex"
          >
            {t("quote")}
          </Link>
          <SearchCommand />
          <Link
            href="/account"
            className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("account")}
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <CartDrawer />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

export { Header };
