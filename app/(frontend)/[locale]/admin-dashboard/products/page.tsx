"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { formatPrice } from "@/lib/utils";
import { Package, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Product {
  id: string | number;
  name: string;
  slug: string;
  basePrice: number;
  category?: { name?: string } | string;
  fulfillmentType: string;
  featured: boolean;
  isSubscription?: boolean;
  _status?: string;
}

export default function AdminProductsPage() {
  const t = useTranslations("Admin");
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setProducts(d?.docs ?? []))
      .catch(() => {});
  }, []);

  const filtered = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("products.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("products.title")}</h1>
      </div>

      <div className="flex items-center gap-4 border-b border-border px-8 py-3 md:px-16">
        <div className="relative flex-1 max-w-sm">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("common.search")}
            className="rounded-none border-border pl-9 font-mono text-xs"
          />
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">{products.length} {t("products.title").toLowerCase()}</span>
      </div>

      <div className="px-8 py-6 md:px-16">
        {filtered.length === 0 ? (
          <div className="border border-border p-16 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{t("common.no_results")}</p>
          </div>
        ) : (
          <div className="border border-border">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <span>{t("products.name")}</span>
              <span>{t("products.category")}</span>
              <span>{t("products.price")}</span>
              <span>{t("products.fulfillment")}</span>
            </div>
            {filtered.map((p) => (
              <div key={p.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-surface">
                <div>
                  <span className="text-sm font-medium">{p.name}</span>
                  {p.isSubscription && <span className="ml-2 text-[10px] text-accent font-mono uppercase tracking-wider">{t("products.subscription")}</span>}
                  {p.featured && <span className="ml-2 text-[10px] text-warning font-mono uppercase tracking-wider">{t("products.featured")}</span>}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {typeof p.category === "object" && p.category?.name ? p.category.name : "—"}
                </span>
                <span className="font-mono text-sm tabular-nums">{formatPrice(p.basePrice)}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{p.fulfillmentType}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
