"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const navItems = [
  { href: "/services" as const, key: "services" },
  { href: "/shop" as const, key: "shop" },
  { href: "/about" as const, key: "about" },
  { href: "/blog" as const, key: "blog" },
  { href: "/contact" as const, key: "contact" },
  { href: "/quote" as const, key: "quote" },
] as const;

function MobileNav() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
        aria-label="Menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-background">
        <SheetTitle className="font-mono text-sm font-bold tracking-wider text-accent">
          FOXCASE
        </SheetTitle>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
