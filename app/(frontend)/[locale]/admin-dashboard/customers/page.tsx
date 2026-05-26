"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Search, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const t = useTranslations("Admin");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats").catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("customers.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("customers.title")}</h1>
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
        {customers.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Users className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("common.no_results")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            {customers.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0 hover:bg-surface"
              >
                <div>
                  <div className="text-sm font-medium">
                    {c.firstName} {c.lastName}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">{c.email}</div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {t(`customers.${c.type}`)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
