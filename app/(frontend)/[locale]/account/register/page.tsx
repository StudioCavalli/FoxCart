"use client";

import { Pattern } from "@/components/visual";
import { Input } from "@/components/ui/input";
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
    <div className="relative flex min-h-screen">
      {/* Left — branding panel */}
      <div className="relative hidden w-1/2 items-end overflow-hidden border-r border-border lg:flex">
        <Pattern />
        <div className="relative px-16 pb-16">
          <Link href="/" className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground">
            FoxCase
          </Link>
          <h2 className="mt-6 max-w-md text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Rejoignez-nous<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Creez votre compte pour commander, suivre vos livraisons et gerer vos projets.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border px-16 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          45 Bd de la Croisette, Cannes
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-16 sm:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-12 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground lg:hidden">
            FoxCase
          </Link>

          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            00 — {t("register_title")}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("register_title")}</h1>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Prenom
                </label>
                <Input id="firstName" name="firstName" required className="h-12 rounded-none border-border bg-transparent" />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Nom
                </label>
                <Input id="lastName" name="lastName" required className="h-12 rounded-none border-border bg-transparent" />
              </div>
            </div>
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
              <Input id="password" name="password" type="password" required minLength={8} className="h-12 rounded-none border-border bg-transparent" />
            </div>

            {/* Type */}
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Profil
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {(["individual", "professional"] as const).map((type) => (
                  <label key={type} className="flex cursor-pointer items-center justify-center gap-2 bg-background py-3 transition-colors hover:bg-surface has-[:checked]:bg-surface has-[:checked]:text-foreground">
                    <input type="radio" name="type" value={type} defaultChecked={type === "individual"} className="sr-only" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                      {type === "individual" ? "Particulier" : "Professionnel"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 bg-foreground font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("register_title")}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6">
            <Link
              href="/account/login"
              className="group flex items-center justify-between py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>Deja un compte ?</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                {t("login_title")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
