"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { BarChart3, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  name: string;
  category: { id: string; name: string } | string;
  pricingType: "fixed" | "from" | "quote" | "hourly";
  featured: boolean;
}

export default function AdminServicesPage() {
  const t = useTranslations("Admin");
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setServices(d?.docs ?? []))
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("services.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("services.title")}</h1>
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
        {services.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("services.name")}</span>
              <span>{t("services.category")}</span>
              <span>{t("services.pricing_type")}</span>
              <span>{t("services.featured")}</span>
            </div>
            {services.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{s.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {typeof s.category === "object" ? s.category.name : s.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {s.pricingType}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] ${s.featured ? "text-accent" : "text-muted-foreground"}`}
                >
                  {s.featured ? t("common.yes") : t("common.no")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
