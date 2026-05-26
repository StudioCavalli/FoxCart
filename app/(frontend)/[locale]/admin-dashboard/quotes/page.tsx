"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { MessageSquare, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Quote {
  id: string;
  quoteNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "new" | "contacted" | "quoted" | "accepted" | "rejected";
  createdAt: string;
}

const statuses = ["all", "new", "contacted", "quoted", "accepted", "rejected"] as const;

export default function AdminQuotesPage() {
  const t = useTranslations("Admin");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/admin/quotes")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setQuotes(d?.docs ?? []))
      .catch(() => {});
  }, []);

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("quotes.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("quotes.title")}</h1>
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
              {s === "all" ? t("common.all") : t(`quotes.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 md:px-16">
        {filtered.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("quotes.number")}</span>
              <span>{t("quotes.contact")}</span>
              <span>{t("quotes.email")}</span>
              <span>{t("quotes.status")}</span>
              <span>{t("quotes.date")}</span>
            </div>
            {filtered.map((q) => (
              <div
                key={q.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-muted-foreground">{q.quoteNumber}</span>
                <span className="text-sm font-medium">
                  {q.firstName} {q.lastName}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{q.email}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {t(`quotes.${q.status}`)}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
