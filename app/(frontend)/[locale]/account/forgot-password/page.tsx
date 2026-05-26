"use client";

import { Input } from "@/components/ui/input";
import { Pattern } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const t = useTranslations("Account");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="relative hidden w-1/2 items-end overflow-hidden border-r border-border lg:flex">
        <Pattern />
        <div className="relative px-16 pb-16">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground"
          >
            FoxCase
          </Link>
          <h2 className="mt-6 max-w-md text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Mot de passe oublie<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Renseignez votre email, nous vous enverrons un lien de reinitialisation.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-16 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          45 Bd de la Croisette, Cannes
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-12 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground lg:hidden"
          >
            FoxCase
          </Link>

          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            00 — {t("reset_password")}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("reset_password")}</h1>

          {sent ? (
            <div className="mt-10">
              <div className="flex h-16 w-16 items-center justify-center border border-accent">
                <Check className="h-6 w-6 text-accent" strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Si un compte existe avec cette adresse, un email de reinitialisation a ete envoye.
                Verifiez votre boite de reception.
              </p>
              <Link
                href="/account/login"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-accent-hover"
              >
                Retour a la connexion
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-12 rounded-none border-border bg-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 bg-foreground font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Envoyer le lien
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-border pt-6">
            <Link
              href="/account/login"
              className="block py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              Retour a la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
