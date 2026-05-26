"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import { Search, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Subscription {
  id: string;
  plan: string;
  customer: { id: string; email: string; firstName?: string; lastName?: string } | string;
  status: "active" | "paused" | "cancelled" | "expired";
  monthlyPrice: number;
  startDate: string;
  nextBillingDate?: string;
}

export default function AdminSubscriptionsPage() {
  const t = useTranslations("Admin");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    fetch("/api/admin/subscriptions")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setSubscriptions(d?.docs ?? []))
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("subscriptions.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("subscriptions.title")}</h1>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-8 py-3 md:px-16">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={t("common.search")}
            className="rounded-none border-border pl-9 font-mono text-xs"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="px-8 py-6 md:px-16">
        {subscriptions.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Zap className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("subscriptions.plan")}</span>
              <span>{t("subscriptions.customer")}</span>
              <span>{t("subscriptions.status")}</span>
              <span>{t("subscriptions.price")}</span>
              <span>{t("subscriptions.start_date")}</span>
            </div>
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{s.plan}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {typeof s.customer === "object" ? s.customer.email : s.customer}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {t(`subscriptions.${s.status}`)}
                </span>
                <span className="font-mono text-sm tabular-nums">
                  {formatPrice(s.monthlyPrice)}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(s.startDate).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
