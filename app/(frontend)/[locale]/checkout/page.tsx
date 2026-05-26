"use client";

import { Container, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, CreditCard, Loader2, MapPin, Truck, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  { key: "auth", icon: User },
  { key: "address", icon: MapPin },
  { key: "shipping", icon: Truck },
  { key: "payment", icon: CreditCard },
] as const;

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    postalCode: "",
    country: "FR",
  });
  const [savedAddresses, setSavedAddresses] = useState<
    {
      addressType: string;
      firstName: string;
      lastName: string;
      address1: string;
      city: string;
      postalCode: string;
      country: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/customers/addresses")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.addresses?.length) {
          setSavedAddresses(d.addresses);
          const defaultShipping =
            d.addresses.find(
              (a: { addressType: string; isDefault: boolean }) =>
                a.addressType === "shipping" && a.isDefault,
            ) ?? d.addresses.find((a: { addressType: string }) => a.addressType === "shipping");
          if (defaultShipping) {
            setAddress({
              firstName: defaultShipping.firstName ?? "",
              lastName: defaultShipping.lastName ?? "",
              address1: defaultShipping.address1 ?? "",
              city: defaultShipping.city ?? "",
              postalCode: defaultShipping.postalCode ?? "",
              country: defaultShipping.country ?? "FR",
            });
          }
        }
      });
  }, []);

  const shippingCost = 990;
  const total = subtotal() + shippingCost;

  const saveAddressAfterOrder = async () => {
    if (!address.address1 || !address.city) return;
    await fetch("/api/customers/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: "Livraison",
        addressType: "shipping",
        ...address,
        isDefault: true,
      }),
    }).catch(() => {});
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      await saveAddressAfterOrder();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shippingAddress: address, shippingCost, guestEmail: email }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        clearCart();
        router.push(`/checkout/success?payment_intent=${data.paymentIntentId}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="py-32">
          <Container className="text-center">
            <p className="text-muted-foreground">{t("empty_cart")}</p>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-16">
          <Container>
            <SectionHeader number="00" label={t("title")} className="mb-8" />
            <div className="mb-12 flex items-center gap-1">
              {STEPS.map((s, i) => (
                <div key={s.key} className="flex flex-1 items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center border ${i <= step ? "border-accent text-accent" : "border-border text-muted-foreground"}`}
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-px flex-1 ${i < step ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              <div>
                {step === 0 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold">{t("step_auth")}</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          {tCommon("email")}
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {t("guest")}
                      </p>
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold">{t("shipping_address")}</h2>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {tCommon("first_name")}
                          </label>
                          <Input
                            value={address.firstName}
                            onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {tCommon("last_name")}
                          </label>
                          <Input
                            value={address.lastName}
                            onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          {tCommon("address")}
                        </label>
                        <Input
                          value={address.address1}
                          onChange={(e) => setAddress({ ...address, address1: e.target.value })}
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {tCommon("postal_code")}
                          </label>
                          <Input
                            value={address.postalCode}
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {tCommon("city")}
                          </label>
                          <Input
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold">{t("choose_shipping")}</h2>
                    <div className="space-y-2">
                      {[
                        { name: "Colissimo", delay: "2-3 j", price: 990 },
                        { name: "Mondial Relay", delay: "3-5 j", price: 590 },
                        { name: "DHL Express", delay: "1-2 j", price: 1490 },
                      ].map((c) => (
                        <label
                          key={c.name}
                          className="flex cursor-pointer items-center justify-between border border-border p-4 transition-colors hover:bg-surface"
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="shipping"
                              defaultChecked={c.name === "Colissimo"}
                              className="accent-accent"
                            />
                            <div>
                              <div className="text-sm font-medium">{c.name}</div>
                              <div className="font-mono text-[10px] text-muted-foreground">
                                {c.delay}
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-sm tabular-nums">
                            {formatPrice(c.price)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h2 className="mb-6 text-lg font-semibold">{t("step_payment")}</h2>
                    <div className="border border-border p-8">
                      <p className="text-sm text-muted-foreground">{t("stripe_placeholder")}</p>
                      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {t("payment_methods")}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-8 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    disabled={step === 0}
                    className="rounded-none font-mono text-[11px] uppercase tracking-[0.15em]"
                  >
                    {t("previous")}
                  </Button>
                  {step < STEPS.length - 1 ? (
                    <Button
                      onClick={() => setStep((s) => s + 1)}
                      className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]"
                    >
                      {t("next")}{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePay}
                      disabled={loading}
                      className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {t("pay", { amount: formatPrice(total) })}
                      {!loading && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
              <div className="border border-border p-6">
                <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t("summary")}
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantSku ?? ""}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-mono tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="uppercase tracking-[0.15em] text-muted-foreground">
                      {t("step_shipping")}
                    </span>
                    <span className="tabular-nums">{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{tCommon("total")}</span>
                    <span className="font-mono tabular-nums text-accent">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
