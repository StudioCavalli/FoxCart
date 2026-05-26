"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  shippingMethod?: string;
  customer?: { firstName?: string; lastName?: string; email?: string } | string;
  guestEmail?: string;
}

const statusColors: Record<string, string> = {
  pending: "text-warning",
  confirmed: "text-info",
  processing: "text-info",
  shipped: "text-accent",
  delivered: "text-success",
  cancelled: "text-destructive",
};

export default function AdminOrdersPage() {
  const t = useTranslations("Admin");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.recentOrders) setOrders(d.recentOrders);
      })
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("orders.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("orders.title")}</h1>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-8 py-3 md:px-16">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder={t("common.search")}
            className="rounded-none border-border pl-9 font-mono text-xs"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex gap-1">
          {["all", "pending", "confirmed", "shipped", "delivered"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${filter === s ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s === "all" ? t("common.all") : t(`statuses.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 md:px-16">
        {orders.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            {t("common.no_results")}
          </p>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("orders.number")}</span>
              <span>{t("orders.status")}</span>
              <span>{t("orders.total")}</span>
              <span>{t("orders.date")}</span>
            </div>
            {orders.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface"
              >
                <span className="text-sm font-medium">{o.orderNumber}</span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.1em] ${statusColors[o.status] ?? "text-muted-foreground"}`}
                >
                  {t(`statuses.${o.status}`)}
                </span>
                <span className="font-mono text-sm tabular-nums">{formatPrice(o.total)}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
