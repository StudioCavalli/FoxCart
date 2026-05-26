"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Layers, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Deliverable {
  id: string;
  title: string;
  type: "visual" | "video" | "report" | "media_kit" | "post" | "newsletter" | "strategy" | "other";
  status: "draft" | "in_progress" | "review" | "approved" | "revision_requested" | "delivered";
  dueDate: string | null;
  priority: "low" | "normal" | "high" | "urgent";
}

const statuses = [
  "all",
  "draft",
  "in_progress",
  "review",
  "approved",
  "revision_requested",
  "delivered",
] as const;

export default function AdminDeliverablesPage() {
  const t = useTranslations("Admin");
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/deliverables")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setDeliverables(d?.docs ?? []))
      .catch(() => {});
  }, []);

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
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("deliverables.name")}</span>
              <span>{t("deliverables.type")}</span>
              <span>{t("deliverables.status")}</span>
              <span>{t("deliverables.due_date")}</span>
              <span>{t("deliverables.priority")}</span>
            </div>
            {filtered.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{d.title}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {t(`deliverables.type_${d.type}`)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {t(`deliverables.${d.status}`)}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {d.dueDate ? new Date(d.dueDate).toLocaleDateString("fr-FR") : "---"}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                    d.priority === "urgent"
                      ? "text-destructive"
                      : d.priority === "high"
                        ? "text-warning"
                        : "text-muted-foreground"
                  }`}
                >
                  {t(`deliverables.priority_${d.priority}`)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
