"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal, SectionHeader } from "@/components/visual";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const STEPS = ["type", "service", "budget", "description", "contact"] as const;

export default function QuotePage() {
  const t = useTranslations("Quote");
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label="Devis" className="mb-6" />
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
          <Container className="max-w-2xl">
            {submitted ? (
              <Reveal>
                <div className="py-16 text-center">
                  <Check className="mx-auto h-12 w-12 text-accent" strokeWidth={1.5} />
                  <h2 className="mt-6 text-2xl font-bold">{t("success_title")}</h2>
                  <p className="mt-3 text-muted-foreground">{t("success_message")}</p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div>
                  {/* Progress */}
                  <div className="mb-12 flex items-center gap-1">
                    {STEPS.map((s, i) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 transition-colors ${i <= step ? "bg-accent" : "bg-border"}`}
                      />
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (step < STEPS.length - 1) {
                        next();
                      } else {
                        setSubmitted(true);
                      }
                    }}
                  >
                    {/* Step: Type */}
                    {step === 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">{t("step_type")}</h2>
                        <div className="grid gap-px bg-border sm:grid-cols-2">
                          {(["individual", "professional"] as const).map((type) => (
                            <label
                              key={type}
                              className="flex cursor-pointer items-center gap-4 bg-background p-6 transition-colors hover:bg-surface"
                            >
                              <input
                                type="radio"
                                name="type"
                                value={type}
                                defaultChecked={type === "professional"}
                                className="accent-accent"
                              />
                              <span className="text-sm font-medium">{t(type)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step: Service */}
                    {step === 1 && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">{t("step_service")}</h2>
                        <div className="space-y-2">
                          {[
                            "Site vitrine",
                            "Site e-commerce",
                            "Application mobile",
                            "Application SaaS",
                            "Business plan",
                            "Identite visuelle",
                            "ERP/CRM",
                            "Autre",
                          ].map((s) => (
                            <label
                              key={s}
                              className="flex cursor-pointer items-center gap-4 border border-border p-4 transition-colors hover:bg-surface"
                            >
                              <input
                                type="radio"
                                name="service"
                                value={s}
                                className="accent-accent"
                              />
                              <span className="text-sm">{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step: Budget */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-xl font-bold mb-6">{t("budget")}</h2>
                          <div className="grid gap-px bg-border sm:grid-cols-2">
                            {[
                              "< 1 000 EUR",
                              "1 000 - 5 000 EUR",
                              "5 000 - 15 000 EUR",
                              "> 15 000 EUR",
                            ].map((b) => (
                              <label
                                key={b}
                                className="flex cursor-pointer items-center gap-4 bg-background p-4 transition-colors hover:bg-surface"
                              >
                                <input
                                  type="radio"
                                  name="budget"
                                  value={b}
                                  className="accent-accent"
                                />
                                <span className="text-sm">{b}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold mb-6">{t("timeline")}</h2>
                          <div className="grid gap-px bg-border sm:grid-cols-2">
                            {["< 1 mois", "1 - 3 mois", "3 - 6 mois", "> 6 mois"].map((d) => (
                              <label
                                key={d}
                                className="flex cursor-pointer items-center gap-4 bg-background p-4 transition-colors hover:bg-surface"
                              >
                                <input
                                  type="radio"
                                  name="timeline"
                                  value={d}
                                  className="accent-accent"
                                />
                                <span className="text-sm">{d}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step: Description */}
                    {step === 3 && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">{t("step_description")}</h2>
                        <Textarea
                          name="description"
                          rows={8}
                          placeholder="Decrivez votre projet, vos besoins, vos objectifs..."
                          className="rounded-none border-border"
                        />
                      </div>
                    )}

                    {/* Step: Contact */}
                    {step === 4 && (
                      <div>
                        <h2 className="text-xl font-bold mb-6">{t("step_contact")}</h2>
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">Prenom</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                required
                                className="rounded-none border-border"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Nom</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                required
                                className="rounded-none border-border"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              className="rounded-none border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telephone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              className="rounded-none border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Entreprise</Label>
                            <Input
                              id="company"
                              name="company"
                              className="rounded-none border-border"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={prev}
                        disabled={step === 0}
                        className="rounded-none font-mono text-xs uppercase tracking-widest"
                      >
                        Precedent
                      </Button>
                      <Button
                        type="submit"
                        className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover"
                      >
                        {step === STEPS.length - 1 ? t("submit") : "Suivant"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
