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

export default function LoginPage() {
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
      const res = await fetch("/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (res.ok) {
        router.push("/account");
        router.refresh();
      } else {
        setError("Email ou mot de passe incorrect.");
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
            <SectionHeader number="00" label={t("login_title")} className="mb-8" />
            <h1 className="mb-10 text-2xl font-bold tracking-tight md:text-3xl">
              {t("login_title")}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="rounded-none border-border"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="group w-full gap-2 rounded-none bg-accent text-accent-foreground hover:bg-accent-hover font-mono text-[11px] uppercase tracking-[0.15em]"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t("login_title")}
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>

            <div className="mt-6 flex flex-col gap-2 text-center font-mono text-[11px] uppercase tracking-[0.15em]">
              <Link
                href="/account/register"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("register_title")}
              </Link>
              <Link
                href="/account/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("forgot_password")}
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
