"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/customers/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.user) router.push("/account/login");
      });
  }, [router]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("orders")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("orders")}</h1>
            </Reveal>
          </Container>
        </section>
        <section className="py-16">
          <Container>
            {orders.length === 0 ? (
              <div className="py-24 text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
                <p className="mt-4 text-muted-foreground">{t("no_orders")}</p>
              </div>
            ) : (
              <div className="space-y-px bg-border">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between bg-background p-6"
                  >
                    <div>
                      <div className="text-sm font-medium">{order.orderNumber}</div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.15em] ${statusColors[order.status] ?? "text-muted-foreground"}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-mono text-sm tabular-nums">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
