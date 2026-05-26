"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Search, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Subscription {
  id: string;
  customerEmail: string;
  plan: string;
  status: string;
  nextBilling: string;
}

export default function AdminSubscriptionsPage() {
  const t = useTranslations("Admin");
  const [subscriptions] = useState<Subscription[]>([]);

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
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("subscriptions.customer")}</span>
              <span>{t("subscriptions.plan")}</span>
              <span>{t("subscriptions.status")}</span>
              <span>{t("subscriptions.next_billing")}</span>
            </div>
            {subscriptions.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{s.customerEmail}</span>
                <span className="font-mono text-xs text-muted-foreground">{s.plan}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {s.status}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(s.nextBilling).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
