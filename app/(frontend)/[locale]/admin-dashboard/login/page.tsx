"use client";

import { AuthPanel } from "@/components/layout/AuthPanel";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const t = useTranslations("Admin");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (res.ok) {
        window.location.href = "/fr/admin-dashboard";
      } else setError(t("common.error"));
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AuthPanel title={t("login_title")} subtitle={t("login_subtitle")} />
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-16 sm:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            00 — {t("login_title")}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("login_title")}</h1>
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
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
                className="h-12 rounded-none border-border bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
              >
                {tCommon("password")}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-12 rounded-none border-border bg-transparent"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 bg-accent font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("login_title")}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
