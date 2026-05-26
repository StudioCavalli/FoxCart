"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { Pattern, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AccountPage() {
  const t = useTranslations("Account");

  return (
    <AccountShell>
      <div className="relative overflow-hidden border-b border-border px-8 py-16 md:px-16">
        <div className="absolute inset-0 blueprint opacity-10" aria-hidden="true" />
        <div className="relative">
          <SectionHeader number="00" label={t("dashboard")} className="mb-4" />
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.95] tracking-[-0.02em]">
            {t("dashboard")}
          </h1>
        </div>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        <StatCard icon={ShoppingBag} value="0" label={t("orders")} />
        <StatCard icon={TrendingUp} value="0,00 EUR" label="Total" />
      </div>

      <div className="p-8 md:p-16">
        <SectionHeader number="01" label={t("orders")} className="mb-8" />
        <div className="border border-border p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {t("no_orders")}
          </p>
          <Link
            href="/shop"
            className="group mt-6 inline-flex items-center gap-2 bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            {t("orders")}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </AccountShell>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-6 bg-background p-8">
      <div className="flex h-12 w-12 items-center justify-center border border-border">
        <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
      </div>
      <div>
        <div className="font-mono text-2xl font-bold tabular-nums tracking-tight">{value}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}
