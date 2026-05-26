"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { AddressInput } from "@/components/shop/AddressInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { ArrowRight, MapPin, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface Address {
  id?: string;
  label: string;
  addressType: "shipping" | "billing";
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const t = useTranslations("Account");
  const tCommon = useTranslations("Common");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<"shipping" | "billing">("shipping");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrPostal, setAddrPostal] = useState("");
  const [addrCity, setAddrCity] = useState("");

  const load = useCallback(() => {
    fetch("/api/customers/addresses")
      .then((r) => r.json())
      .then((d) => setAddresses(d.addresses ?? []));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const addr = {
      label: String(form.get("label")),
      addressType: newType,
      firstName: String(form.get("firstName")),
      lastName: String(form.get("lastName")),
      company: String(form.get("company") ?? ""),
      address1: String(form.get("address1")),
      address2: String(form.get("address2") ?? ""),
      city: String(form.get("city")),
      postalCode: String(form.get("postalCode")),
      country: String(form.get("country") || "FR"),
      phone: String(form.get("phone") ?? ""),
      isDefault: addresses.filter((a) => a.addressType === newType).length === 0,
    };
    await fetch("/api/customers/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addr),
    });
    setAdding(false);
    setAddrStreet("");
    setAddrPostal("");
    setAddrCity("");
    load();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/customers/addresses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId: id }),
    });
    load();
  };

  const shipping = addresses.filter((a) => a.addressType === "shipping");
  const billing = addresses.filter((a) => a.addressType === "billing");

  return (
    <AccountShell>
      <div className="border-b border-border px-8 py-16 md:px-16">
        <SectionHeader number="00" label={t("addresses")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("addresses")}</h1>
      </div>

      <div className="p-8 md:p-16">
        {/* Shipping */}
        <SectionHeader number="01" label={tCommon("address") + " — Livraison"} className="mb-6" />
        {shipping.length === 0 ? (
          <div className="mb-8 border border-border p-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Aucune adresse de livraison
            </p>
          </div>
        ) : (
          <div className="mb-8 grid gap-px bg-border sm:grid-cols-2">
            {shipping.map((addr) => (
              <AddressCard
                key={addr.id}
                addr={addr}
                onDelete={() => addr.id && handleDelete(addr.id)}
              />
            ))}
          </div>
        )}

        {/* Billing */}
        <SectionHeader
          number="02"
          label={tCommon("address") + " — Facturation"}
          className="mb-6 mt-12"
        />
        {billing.length === 0 ? (
          <div className="mb-8 border border-border p-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground/20" strokeWidth={1} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Aucune adresse de facturation
            </p>
          </div>
        ) : (
          <div className="mb-8 grid gap-px bg-border sm:grid-cols-2">
            {billing.map((addr) => (
              <AddressCard
                key={addr.id}
                addr={addr}
                onDelete={() => addr.id && handleDelete(addr.id)}
              />
            ))}
          </div>
        )}

        {/* Add form */}
        {adding ? (
          <form onSubmit={handleAdd} className="max-w-lg space-y-4 border border-border p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Nouvelle adresse
            </div>
            <div className="grid grid-cols-2 gap-px bg-border">
              {(["shipping", "billing"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewType(t)}
                  className={`py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${newType === t ? "bg-surface text-foreground" : "bg-background text-muted-foreground"}`}
                >
                  {t === "shipping" ? "Livraison" : "Facturation"}
                </button>
              ))}
            </div>
            <Input
              name="label"
              placeholder="Libellé (ex: Domicile)"
              required
              className="rounded-none border-border"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="firstName"
                placeholder={tCommon("first_name")}
                required
                className="rounded-none border-border"
              />
              <Input
                name="lastName"
                placeholder={tCommon("last_name")}
                required
                className="rounded-none border-border"
              />
            </div>
            <Input
              name="company"
              placeholder={tCommon("company")}
              className="rounded-none border-border"
            />
            <AddressInput
              value={addrStreet}
              onChange={setAddrStreet}
              onSelect={(a) => {
                setAddrStreet(a.address1);
                setAddrPostal(a.postalCode);
                setAddrCity(a.city);
              }}
              placeholder={tCommon("address")}
              className="rounded-none border-border"
            />
            <input type="hidden" name="address1" value={addrStreet} />
            <Input
              name="address2"
              placeholder="Complément"
              className="rounded-none border-border"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                name="postalCode"
                value={addrPostal}
                onChange={(e) => setAddrPostal(e.target.value)}
                placeholder={tCommon("postal_code")}
                required
                className="rounded-none border-border"
              />
              <Input
                name="city"
                value={addrCity}
                onChange={(e) => setAddrCity(e.target.value)}
                placeholder={tCommon("city")}
                required
                className="rounded-none border-border sm:col-span-2"
              />
            </div>
            <Input
              name="country"
              placeholder={tCommon("country")}
              defaultValue="FR"
              className="rounded-none border-border"
            />
            <Input
              name="phone"
              placeholder={tCommon("phone")}
              className="rounded-none border-border"
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]"
              >
                {tCommon("save")}{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAdding(false)}
                className="rounded-none font-mono text-[11px] uppercase tracking-[0.15em]"
              >
                {tCommon("cancel")}
              </Button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="group flex items-center gap-2 border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors hover:border-foreground"
          >
            <Plus className="h-4 w-4" /> Ajouter une adresse
          </button>
        )}
      </div>
    </AccountShell>
  );
}

function AddressCard({ addr, onDelete }: { addr: Address; onDelete: () => void }) {
  return (
    <div className="flex flex-col justify-between bg-background p-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {addr.label} {addr.isDefault && <span className="text-accent">— par défaut</span>}
          </span>
          <button
            type="button"
            onClick={onDelete}
            className="text-muted-foreground/40 transition-colors hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-3 text-sm">
          {addr.firstName} {addr.lastName}
          {addr.company && <span className="text-muted-foreground"> — {addr.company}</span>}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {addr.address1}
          {addr.address2 && `, ${addr.address2}`}
        </div>
        <div className="text-sm text-muted-foreground">
          {addr.postalCode} {addr.city}, {addr.country}
        </div>
        {addr.phone && (
          <div className="mt-1 font-mono text-xs text-muted-foreground">{addr.phone}</div>
        )}
      </div>
    </div>
  );
}
