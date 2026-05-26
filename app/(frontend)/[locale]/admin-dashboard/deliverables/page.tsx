"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Layers, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Deliverable {
  id: string;
  title: string;
  status: string;
  customer: string;
  updatedAt: string;
}

const statuses = [
  "all",
  "draft",
  "in_progress",
  "review",
  "revision_requested",
  "delivered",
] as const;

export default function AdminDeliverablesPage() {
  const t = useTranslations("Admin");
  const [deliverables] = useState<Deliverable[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? deliverables : deliverables.filter((d) => d.status === filter);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("deliverables.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("deliverables.title")}</h1>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-8 py-3 md:px-16">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={t("common.search")}
            className="rounded-none border-border pl-9 font-mono text-xs"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`whitespace-nowrap px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                filter === s
                  ? "bg-surface text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? t("common.all") : t(`deliverables.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 md:px-16">
        {filtered.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Layers className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("deliverables.name")}</span>
              <span>{t("deliverables.customer")}</span>
              <span>{t("deliverables.status")}</span>
              <span>{t("deliverables.updated")}</span>
            </div>
            {filtered.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{d.title}</span>
                <span className="font-mono text-xs text-muted-foreground">{d.customer}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {t(`deliverables.${d.status}`)}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(d.updatedAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
