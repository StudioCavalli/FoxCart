"use client";

import { Pattern } from "@/components/visual";
import { Input } from "@/components/ui/input";
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
    <div className="relative flex min-h-screen">
      {/* Left — branding panel */}
      <div className="relative hidden w-1/2 items-end overflow-hidden border-r border-border lg:flex">
        <Pattern />
        <div className="relative px-16 pb-16">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground">
            FoxCase
          </Link>
          <h2 className="mt-6 max-w-md text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Votre espace<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Suivez vos commandes, gerez vos adresses et accedez a l'ensemble de vos services.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-16 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          45 Bd de la Croisette, Cannes
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-12 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground lg:hidden">
            FoxCase
          </Link>

          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            00 — {t("login_title")}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("login_title")}</h1>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Email
              </label>
              <Input id="email" name="email" type="email" required className="h-12 rounded-none border-border bg-transparent" />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Mot de passe
              </label>
              <Input id="password" name="password" type="password" required className="h-12 rounded-none border-border bg-transparent" />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 bg-foreground font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("login_title")}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6">
            <Link
              href="/account/register"
              className="group flex items-center justify-between py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>Pas encore de compte ?</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                {t("register_title")}
              </span>
            </Link>
            <Link
              href="/account/login"
              className="block py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              {t("forgot_password")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
