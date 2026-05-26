"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CustomerUser {
  firstName: string;
  lastName: string;
  email: string;
}

const navItems = [
  { href: "/account" as const, icon: LayoutDashboard, key: "dashboard" },
  { href: "/account/orders" as const, icon: Package, key: "orders" },
  { href: "/account/services" as const, icon: Zap, key: "services" },
  { href: "/account/addresses" as const, icon: MapPin, key: "addresses" },
  { href: "/account/settings" as const, icon: Settings, key: "settings" },
] as const;

function AccountShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Account");
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<CustomerUser | null>(null);

  useEffect(() => {
    fetch("/api/customers/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) setUser(d.user);
        else router.push("/account/login");
      });
  }, [router]);

  const logout = useCallback(async () => {
    await fetch("/api/customers/me", { method: "DELETE" });
    router.push("/account/login");
    router.refresh();
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          {/* Header */}
          <div className="border-b border-border px-6 py-5">
            <Link
              href="/"
              className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground"
            >
              FoxCase
            </Link>
          </div>

          {/* User */}
          <div className="border-b border-border px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border">
                <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="truncate font-mono text-[10px] text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/account" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:bg-surface/50 hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn("h-4 w-4", isActive ? "text-accent" : "")}
                    strokeWidth={1.5}
                  />
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-border px-3 py-4">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              {t("logout")}
            </button>
          </div>

          {/* Back to site */}
          <div className="border-t border-border px-6 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              <ArrowRight className="h-3 w-3 rotate-180" />
              foxcase.fr
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-4 lg:hidden">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground"
          >
            FoxCase
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center transition-colors",
                  pathname === item.href
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export { AccountShell };
