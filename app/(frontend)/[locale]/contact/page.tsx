"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeader } from "@/components/visual";
import { Map } from "@/components/visual/Map";
import { SITE } from "@/lib/site";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("title")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-muted-foreground">{t("subtitle")}</p>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border py-24">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1fr_400px]">
              <Reveal>
                <div>
                  <SectionHeader number="01" label={t("section_message")} className="mb-8" />
                  {submitted ? (
                    <div className="py-16 text-center">
                      <p className="text-lg font-medium">{t("success")}</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                          >
                            {t("name")}
                          </label>
                          <Input
                            id="name"
                            name="name"
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                          >
                            {tCommon("email")}
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          {t("phone")}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          {t("subject")}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                        >
                          {t("message")}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="hidden" aria-hidden="true">
                        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                      </div>
                      <Button
                        type="submit"
                        className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover"
                      >
                        {t("submit")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  )}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <SectionHeader number="02" label={t("section_info")} className="mb-8" />
                  <div className="space-y-6">
                    <InfoRow icon={Mail} label={tCommon("email")}>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-sm transition-colors hover:text-accent"
                      >
                        {SITE.email}
                      </a>
                    </InfoRow>
                    <InfoRow icon={MapPin} label={t("location")}>
                      <p className="text-sm">{SITE.address.street}</p>
                      <p className="text-sm">
                        {SITE.address.postalCode} {SITE.address.city}, {SITE.address.country}
                      </p>
                    </InfoRow>
                    <InfoRow icon={Phone} label={t("phone")}>
                      <p className="text-sm">{t("by_appointment")}</p>
                    </InfoRow>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="border-b border-border">
          <div className="relative h-[400px] w-full overflow-hidden">
            <Map />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}
