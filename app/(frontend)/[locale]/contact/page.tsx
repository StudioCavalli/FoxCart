"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeader } from "@/components/visual";
import { SITE } from "@/lib/site";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label="Contact" className="mb-6" />
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
              {/* Form */}
              <Reveal>
                <div>
                  <SectionHeader number="01" label="Message" className="mb-8" />
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
                          <Label htmlFor="name">{t("name")}</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            className="rounded-none border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("email")}</Label>
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
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t("subject")}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t("message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          className="rounded-none border-border"
                        />
                      </div>
                      {/* Honeypot */}
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

              {/* Info */}
              <Reveal delay={100}>
                <div>
                  <SectionHeader number="02" label="Coordonnees" className="mb-8" />
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          Email
                        </div>
                        <a
                          href={`mailto:${SITE.email}`}
                          className="text-sm hover:text-accent transition-colors"
                        >
                          {SITE.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          Localisation
                        </div>
                        <p className="text-sm">Paris, France</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-4 w-4 text-accent" strokeWidth={1.5} />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                          Telephone
                        </div>
                        <p className="text-sm">Sur rendez-vous</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
