"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Layers, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Subscription {
  id: string | number;
  plan: string;
  status: string;
  monthlyPrice: number;
  startDate: string;
  nextBillingDate?: string;
  deliverableCounts: { total: number; delivered: number; inProgress: number; review: number };
}

const statusStyle: Record<string, string> = {
  active: "bg-accent/10 text-accent",
  paused: "bg-warning/10 text-warning",
  cancelled: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
};

export default function ServicesPage() {
  const t = useTranslations("Account");
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    fetch("/api/customers/subscriptions")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setSubs(d?.subscriptions ?? []))
      .catch(() => {});
  }, []);

  return (
    <AccountShell>
      <div className="border-b border-border px-8 py-16 md:px-16">
        <SectionHeader number="00" label="Mes services" className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Mes services</h1>
      </div>

      <div className="p-8 md:p-16">
        {subs.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Layers className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Aucun service actif
            </p>
            <Link
              href="/shop"
              className="group mt-6 inline-flex items-center gap-2 bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
            >
              Voir les packs
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {subs.map((sub) => {
              const c = sub.deliverableCounts;
              const progress = c.total > 0 ? Math.round((c.delivered / c.total) * 100) : 0;

              return (
                <Link
                  key={sub.id}
                  href={`/account/services/${sub.id}` as "/account"}
                  className="group block border border-border transition-colors hover:bg-surface"
                >
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center border border-border">
                        <Zap className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold">{sub.plan}</span>
                          <span
                            className={`rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${statusStyle[sub.status] ?? "text-muted-foreground"}`}
                          >
                            {sub.status}
                          </span>
                          {c.review > 0 && (
                            <span className="rounded-sm bg-accent px-2 py-0.5 font-mono text-[10px] text-accent-foreground">
                              {c.review} a valider
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                          {formatPrice(sub.monthlyPrice)}/mois
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-mono text-xs tabular-nums text-muted-foreground">
                          {c.delivered}/{c.total} livrables
                        </div>
                        <div className="mt-1 h-1 w-32 bg-border">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AccountShell>
  );
}
