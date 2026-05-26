"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Pattern, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  Layers,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Stats {
  revenue: number;
  ordersCount: number;
  customersCount: number;
  activeSubscriptions: number;
  pendingQuotes: number;
  pendingRevisions: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
}

export default function AdminDashboardPage() {
  const t = useTranslations("Admin");
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="relative overflow-hidden border-b border-border px-8 py-12 md:px-16">
        <Pattern className="opacity-[0.02]" />
        <div className="relative">
          <SectionHeader number="00" label={t("dashboard.title")} className="mb-4" />
          <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight">
            {t("dashboard.title")}
          </h1>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          icon={TrendingUp}
          value={stats ? formatPrice(stats.revenue) : "—"}
          label={t("dashboard.revenue")}
          sub={t("dashboard.this_month")}
          accent
        />
        <KpiCard
          icon={ShoppingBag}
          value={String(stats?.ordersCount ?? "—")}
          label={t("dashboard.orders_count")}
          sub={t("dashboard.this_month")}
        />
        <KpiCard
          icon={Users}
          value={String(stats?.customersCount ?? "—")}
          label={t("dashboard.customers_count")}
        />
        <KpiCard
          icon={Zap}
          value={String(stats?.activeSubscriptions ?? "—")}
          label={t("dashboard.active_subs")}
        />
        <KpiCard
          icon={MessageSquare}
          value={String(stats?.pendingQuotes ?? "—")}
          label={t("dashboard.pending_quotes")}
        />
        <KpiCard
          icon={Layers}
          value={String(stats?.pendingRevisions ?? "—")}
          label={t("dashboard.pending_revisions")}
        />
      </div>

      {/* Shortcuts + Recent */}
      <div className="grid gap-px bg-border lg:grid-cols-2">
        <div className="bg-background p-8 md:p-12">
          <SectionHeader number="01" label={t("dashboard.shortcuts")} className="mb-6" />
          <div className="space-y-2">
            <ShortcutLink
              href="/admin-dashboard/orders"
              icon={ShoppingBag}
              label={t("nav.orders")}
              count={stats?.ordersCount}
            />
            <ShortcutLink
              href="/admin-dashboard/quotes"
              icon={MessageSquare}
              label={t("nav.quotes")}
              count={stats?.pendingQuotes}
              accent
            />
            <ShortcutLink
              href="/admin-dashboard/deliverables"
              icon={Layers}
              label={t("nav.deliverables")}
              count={stats?.pendingRevisions}
              accent
            />
            <ShortcutLink
              href="/admin-dashboard/subscriptions"
              icon={Zap}
              label={t("nav.subscriptions")}
              count={stats?.activeSubscriptions}
            />
          </div>
        </div>
        <div className="bg-background p-8 md:p-12">
          <SectionHeader number="02" label={t("dashboard.recent_activity")} className="mb-6" />
          {stats?.recentOrders.length ? (
            <div className="space-y-3">
              {stats.recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{o.orderNumber}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-accent">
                    {formatPrice(o.total)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("common.no_results")}</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

function KpiCard({
  icon: Icon,
  value,
  label,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: string;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-5 bg-background p-6">
      <div className="flex h-11 w-11 items-center justify-center border border-border">
        <Icon
          className={`h-5 w-5 ${accent ? "text-accent" : "text-muted-foreground"}`}
          strokeWidth={1.5}
        />
      </div>
      <div>
        <div
          className={`font-mono text-xl font-bold tabular-nums tracking-tight ${accent ? "text-accent" : ""}`}
        >
          {value}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {label} {sub && <span className="text-muted-foreground/50">({sub})</span>}
        </div>
      </div>
    </div>
  );
}

function ShortcutLink({
  href,
  icon: Icon,
  label,
  count,
  accent,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  count?: number;
  accent?: boolean;
}) {
  return (
    <Link
      href={href as "/admin-dashboard"}
      className="group flex items-center justify-between py-2 transition-colors hover:text-foreground"
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
        {label}
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && count > 0 && (
          <span
            className={`font-mono text-xs tabular-nums ${accent ? "text-accent" : "text-muted-foreground"}`}
          >
            {count}
          </span>
        )}
        <ArrowRight className="h-3 w-3 text-muted-foreground/30 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
