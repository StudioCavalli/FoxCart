"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Layers,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const navItems = [
  { href: "/admin-dashboard" as const, icon: LayoutDashboard, key: "dashboard" },
  { href: "/admin-dashboard/orders" as const, icon: ShoppingBag, key: "orders" },
  { href: "/admin-dashboard/customers" as const, icon: Users, key: "customers" },
  { href: "/admin-dashboard/products" as const, icon: Package, key: "products" },
  { href: "/admin-dashboard/services" as const, icon: BarChart3, key: "services" },
  { href: "/admin-dashboard/subscriptions" as const, icon: Zap, key: "subscriptions" },
  { href: "/admin-dashboard/deliverables" as const, icon: Layers, key: "deliverables" },
  { href: "/admin-dashboard/quotes" as const, icon: MessageSquare, key: "quotes" },
  { href: "/admin-dashboard/blog" as const, icon: FileText, key: "blog" },
  { href: "/admin-dashboard/settings" as const, icon: Settings, key: "settings" },
] as const;

function AdminShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Admin");
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; firstName?: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) setUser(d.user);
        else window.location.href = "/fr/admin-dashboard/login";
      });
  }, [router]);

  const logout = useCallback(async () => {
    await fetch("/api/admin/me", { method: "DELETE" });
    window.location.href = "/fr/admin-dashboard/login";
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="border-b border-border px-5 py-4">
            <Link
              href="/"
              className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent"
            >
              FoxCase<span className="text-foreground/50"> Admin</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin-dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-none px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:bg-surface/50 hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn("h-4 w-4", isActive ? "text-accent" : "")}
                    strokeWidth={1.5}
                  />
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border px-2 py-3">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              {t("common.back_to_site")}
            </button>
          </div>

          <div className="border-t border-border px-5 py-3">
            <div className="truncate font-mono text-[10px] text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <Link
            href="/admin-dashboard"
            className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
          >
            FC Admin
          </Link>
          <div className="flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-8 w-8 items-center justify-center",
                  pathname.startsWith(item.href) ? "text-accent" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export { AdminShell };
