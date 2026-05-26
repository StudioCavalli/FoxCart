"use client";

import { Container, Header } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const t = useTranslations("Account");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          type: form.get("type") ?? "individual",
        }),
      });
      if (res.ok) {
        router.push("/account");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Une erreur est survenue.");
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container className="max-w-md">
            <SectionHeader number="00" label={t("register_title")} className="mb-8" />
            <h1 className="mb-10 text-2xl font-bold tracking-tight md:text-3xl">
              {t("register_title")}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="rounded-none border-border"
                />
              </div>
              <div className="grid gap-px bg-border sm:grid-cols-2">
                {(["individual", "professional"] as const).map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 bg-background p-4 transition-colors hover:bg-surface"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      defaultChecked={type === "individual"}
                      className="accent-accent"
                    />
                    <span className="text-sm">
                      {type === "individual" ? "Particulier" : "Professionnel"}
                    </span>
                  </label>
                ))}
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="group w-full gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t("register_title")}
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>

            <div className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.15em]">
              <Link
                href="/account/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Deja un compte ? {t("login_title")}
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
