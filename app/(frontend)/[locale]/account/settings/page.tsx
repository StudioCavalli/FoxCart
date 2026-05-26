"use client";

import { AccountShell } from "@/components/layout/AccountShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const t = useTranslations("Account");
  const tCommon = useTranslations("Common");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    fetch("/api/customers/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) {
          setEmail(d.user.email);
          setFirstName(d.user.firstName ?? "");
          setLastName(d.user.lastName ?? "");
        }
      });
  }, []);

  return (
    <AccountShell>
      <div className="border-b border-border px-8 py-16 md:px-16">
        <SectionHeader number="00" label={t("settings")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("settings")}</h1>
      </div>

      <div className="border-b border-border p-8 md:p-16">
        <SectionHeader number="01" label={t("profile")} className="mb-8" />
        <div className="max-w-lg space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {tCommon("first_name")}
              </label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-none border-border"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {tCommon("last_name")}
              </label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-none border-border"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {tCommon("email")}
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-none border-border"
            />
          </div>
          <Button className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]">
            {t("save")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      <div className="p-8 md:p-16">
        <SectionHeader number="02" label={t("password")} className="mb-8" />
        <div className="max-w-lg space-y-4">
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {t("old_password")}
            </label>
            <Input type="password" className="rounded-none border-border" />
          </div>
          <div className="space-y-2">
            <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {t("new_password")}
            </label>
            <Input type="password" minLength={8} className="rounded-none border-border" />
          </div>
          <Button
            variant="outline"
            className="group gap-2 rounded-none font-mono text-[11px] uppercase tracking-[0.15em]"
          >
            {t("change")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </AccountShell>
  );
}
