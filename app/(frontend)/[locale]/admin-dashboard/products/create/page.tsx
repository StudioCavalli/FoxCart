"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/visual";
import { formatPrice, slugify } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Category {
  id: string | number;
  slug: string;
  name: string;
}

export default function CreateProductPage() {
  const t = useTranslations("Admin");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fulfillmentType, setFulfillmentType] = useState("internal");
  const [costPrice, setCostPrice] = useState(0);
  const [marginPercent, setMarginPercent] = useState(50);
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [supplierUrl, setSupplierUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);

  const basePrice = Math.round(costPrice * (1 + marginPercent / 100));

  const handleImportAlibaba = async () => {
    if (!importUrl.includes("alibaba.com")) return;
    setImporting(true);
    try {
      const res = await fetch("/api/admin/alibaba-scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.name) setName(data.name);
        if (data.name) setSlug(slugify(data.name));
        if (data.description) setDescription(data.description);
        if (data.costPrice) setCostPrice(data.costPrice);
        setSupplierUrl(importUrl);
        setFulfillmentType("alibaba");
      }
    } catch {}
    finally { setImporting(false); }
  };

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => (r.ok ? r.json() : null))
      .then(() => {
        fetch("/api/admin/products")
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => {});
      });
    fetch("/api/admin/stats").catch(() => {});
    // Fetch categories
    fetch("/api/admin/products")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/address-autocomplete?q=test").catch(() => {});
    // Load product categories
    const loadCats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) return;
      } catch {}
    };
    loadCats();
  }, []);

  useEffect(() => {
    // Fetch product categories from dedicated endpoint
    fetch("/api/admin/product-categories")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.docs) setCategories(d.docs);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug || slugify(name),
          shortDescription: description,
          category,
          fulfillmentType,
          costPrice,
          marginPercent,
          basePrice,
          weight,
          dimensions: { length, width, height },
          supplierUrl,
          featured,
          isSubscription,
        }),
      });
      if (res.ok) setSuccess(true);
    } catch {}
    finally { setLoading(false); }
  };

  const providers = [
    { value: "internal", label: "Interne" },
    { value: "alibaba", label: "Alibaba" },
    { value: "gelato", label: "Gelato (Print)" },
    { value: "lulu", label: "Lulu Direct (Livres)" },
  ];

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("products.create")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("products.create")}</h1>
      </div>

      {success ? (
        <div className="p-16 text-center">
          <p className="text-lg font-medium">Produit créé avec succès</p>
          <button type="button" onClick={() => { setSuccess(false); setName(""); setSlug(""); setDescription(""); setCostPrice(0); }}
            className="mt-6 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground">
            {t("products.create")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 md:p-16">
          <div className="max-w-2xl space-y-8">
            {/* Import from Alibaba */}
            <div className="border border-accent/20 bg-accent/5 p-6">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Import Alibaba
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Collez un lien Alibaba pour pré-remplir automatiquement les champs.
              </p>
              <div className="flex gap-2">
                <Input
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="https://www.alibaba.com/product-detail/..."
                  className="flex-1 rounded-none border-border"
                />
                <button
                  type="button"
                  onClick={handleImportAlibaba}
                  disabled={importing || !importUrl.includes("alibaba.com")}
                  className="shrink-0 bg-accent px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                  {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Importer"}
                </button>
              </div>
            </div>

            {/* Basic info */}
            <div>
              <SectionHeader number="01" label="Informations" className="mb-6" />
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Nom du produit</label>
                  <Input value={name} onChange={(e) => { setName(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }} required className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Slug</label>
                  <Input value={slug || slugify(name)} onChange={(e) => setSlug(e.target.value)} className="rounded-none border-border font-mono text-xs" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Description courte</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("products.category")}</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required className="h-10 w-full border border-border bg-transparent px-3 font-mono text-sm">
                    <option value="">--</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{typeof c.name === "string" ? c.name : c.slug}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Provider */}
            <div>
              <SectionHeader number="02" label={t("products.fulfillment")} className="mb-6" />
              <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
                {providers.map((p) => (
                  <button key={p.value} type="button" onClick={() => setFulfillmentType(p.value)}
                    className={`py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${fulfillmentType === p.value ? "bg-surface text-foreground" : "bg-background text-muted-foreground hover:bg-surface/50"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
              {(fulfillmentType === "alibaba" || fulfillmentType === "gelato" || fulfillmentType === "lulu") && (
                <div className="mt-4">
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Lien fournisseur</label>
                  <Input value={supplierUrl} onChange={(e) => setSupplierUrl(e.target.value)} placeholder="https://..." className="rounded-none border-border" />
                </div>
              )}
            </div>

            {/* Pricing */}
            <div>
              <SectionHeader number="03" label={t("products.price")} className="mb-6" />
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Prix d'achat (centimes)</label>
                  <Input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} min={0} className="rounded-none border-border" />
                  <span className="mt-1 block font-mono text-[10px] text-muted-foreground">{formatPrice(costPrice)}</span>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Marge (%)</label>
                  <Input type="number" value={marginPercent} onChange={(e) => setMarginPercent(Number(e.target.value))} min={0} max={500} className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Prix de vente</label>
                  <div className="flex h-10 items-center border border-accent/30 bg-accent/5 px-3 font-mono text-sm font-bold text-accent">
                    {formatPrice(basePrice)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <SectionHeader number="04" label="Dimensions & poids" className="mb-6" />
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Poids (g)</label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={0} className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Longueur (cm)</label>
                  <Input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} min={0} className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Largeur (cm)</label>
                  <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} min={0} className="rounded-none border-border" />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Hauteur (cm)</label>
                  <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} min={0} className="rounded-none border-border" />
                </div>
              </div>
            </div>

            {/* Options */}
            <div>
              <SectionHeader number="05" label="Options" className="mb-6" />
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em]">{t("products.featured")}</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={isSubscription} onChange={(e) => setIsSubscription(e.target.checked)} className="accent-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em]">{t("products.subscription")}</span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="group flex items-center gap-2 bg-accent px-8 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("products.create")}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
