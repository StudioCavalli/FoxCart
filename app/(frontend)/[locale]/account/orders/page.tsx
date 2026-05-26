"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "text-warning",
  confirmed: "text-info",
  processing: "text-info",
  shipped: "text-accent",
  delivered: "text-success",
  cancelled: "text-destructive",
};

export default function OrdersPage() {
  const t = useTranslations("Account");
  const [orders] = useState<Order[]>([]);

  return (
    <AccountShell>
      <div className="border-b border-border px-8 py-16 md:px-16">
        <SectionHeader number="00" label={t("orders")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("orders")}</h1>
      </div>

      <div className="p-8 md:p-16">
        {orders.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("no_orders")}
            </p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>N</span>
              <span>Status</span>
              <span>Total</span>
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-6 py-4 last:border-b-0 transition-colors hover:bg-surface"
              >
                <div>
                  <div className="text-sm font-medium">{order.orderNumber}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.1em] ${statusColors[order.status] ?? "text-muted-foreground"}`}
                >
                  {order.status}
                </span>
                <span className="font-mono text-sm tabular-nums">{formatPrice(order.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountShell>
  );
}
