"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, SectionHeader } from "@/components/visual";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const t = useTranslations("Account");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    fetch("/api/customers/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.user) {
          router.push("/account/login");
        } else {
          setEmail(d.user.email);
          setFirstName(d.user.firstName ?? "");
          setLastName(d.user.lastName ?? "");
        }
      });
  }, [router]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("settings")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{t("settings")}</h1>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border py-16">
          <Container className="max-w-lg">
            <SectionHeader number="01" label="Profil" className="mb-8" />
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Prenom</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-none border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-none border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="rounded-none border-border"
                />
              </div>
              <Button className="group gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]">
                Enregistrer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container className="max-w-lg">
            <SectionHeader number="02" label="Mot de passe" className="mb-8" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Ancien mot de passe</Label>
                <Input type="password" className="rounded-none border-border" />
              </div>
              <div className="space-y-2">
                <Label>Nouveau mot de passe</Label>
                <Input type="password" minLength={8} className="rounded-none border-border" />
              </div>
              <Button
                variant="outline"
                className="group gap-2 rounded-none font-mono text-[11px] uppercase tracking-[0.15em]"
              >
                Modifier
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
