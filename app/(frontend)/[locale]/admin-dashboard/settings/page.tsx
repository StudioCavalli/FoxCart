"use client";

import { AdminShell } from "@/components/layout/AdminShell";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/visual";
import { Save } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AdminSettingsPage() {
  const t = useTranslations("Admin");

  return (
    <AdminShell>
      <div className="border-b border-border px-8 py-12 md:px-16">
        <SectionHeader number="00" label={t("settings.title")} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight">{t("settings.title")}</h1>
      </div>

      <div className="divide-y divide-border">
        {/* SEO */}
        <div className="px-8 py-8 md:px-16">
          <SectionHeader number="01" label={t("settings.seo")} className="mb-6" />
          <div className="max-w-xl space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.site_title")}
              </label>
              <Input className="rounded-none border-border font-mono text-xs" />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.meta_description")}
              </label>
              <Input className="rounded-none border-border font-mono text-xs" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="px-8 py-8 md:px-16">
          <SectionHeader number="02" label={t("settings.contact")} className="mb-6" />
          <div className="max-w-xl space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.contact_email")}
              </label>
              <Input type="email" className="rounded-none border-border font-mono text-xs" />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.contact_phone")}
              </label>
              <Input type="tel" className="rounded-none border-border font-mono text-xs" />
            </div>
          </div>
        </div>

        {/* Shop */}
        <div className="px-8 py-8 md:px-16">
          <SectionHeader number="03" label={t("settings.shop")} className="mb-6" />
          <div className="max-w-xl space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.currency")}
              </label>
              <Input className="rounded-none border-border font-mono text-xs" defaultValue="EUR" />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("settings.tax_rate")}
              </label>
              <Input
                type="number"
                className="rounded-none border-border font-mono text-xs"
                defaultValue="20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-8 py-6 md:px-16">
        <button
          type="button"
          className="flex items-center gap-2 border border-accent bg-accent/10 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent/20"
        >
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {t("common.save")}
        </button>
      </div>
    </AdminShell>
  );
}
