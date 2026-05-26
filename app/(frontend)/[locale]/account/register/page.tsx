"use client";

import { AuthPanel } from "@/components/layout/AuthPanel";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Building2, Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CompanyResult {
  siren: string;
  siret: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  naf: string;
}

export default function RegisterPage() {
  const t = useTranslations("Account");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState<"individual" | "professional">("individual");
  const [companyQuery, setCompanyQuery] = useState("");
  const [companyResults, setCompanyResults] = useState<CompanyResult[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyResult | null>(null);
  const [searching, setSearching] = useState(false);

  const searchCompany = useCallback(async (q: string) => {
    if (q.length < 3) {
      setCompanyResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`/api/company-search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setCompanyResults(data.results ?? []);
      }
    } catch {
      setCompanyResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    if (type !== "professional") return;
    const timer = setTimeout(() => searchCompany(companyQuery), 400);
    return () => clearTimeout(timer);
  }, [companyQuery, searchCompany, type]);

  const selectCompany = async (company: CompanyResult) => {
    const dupRes = await fetch("/api/company-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siret: company.siret }),
    });
    const dupData = await dupRes.json();
    if (dupData.exists) {
      setError(t("company_exists", { name: company.name, siret: company.siret }));
      return;
    }
    setSelectedCompany(company);
    setCompanyResults([]);
    setCompanyQuery(company.name);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    if (type === "professional" && !selectedCompany) {
      setError(t("select_company"));
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
          firstName: form.get("firstName"),
          lastName: form.get("lastName"),
          type,
          company: selectedCompany?.siret ?? "",
        }),
      });
      if (res.ok) {
        router.push("/account");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? t("generic_error"));
      }
    } catch {
      setError(t("generic_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AuthPanel
        title={t("auth_panel.register_title")}
        subtitle={t("auth_panel.register_subtitle")}
      />
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-16 sm:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-12 block font-mono text-xs font-bold uppercase tracking-[0.3em] text-foreground lg:hidden"
          >
            FoxCase
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            00 — {t("register_title")}
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">{t("register_title")}</h1>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {t("profile")}
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {(["individual", "professional"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setType(v);
                      setSelectedCompany(null);
                      setCompanyQuery("");
                      setError("");
                    }}
                    className={`flex items-center justify-center gap-2 py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${type === v ? "bg-surface text-foreground" : "bg-background text-muted-foreground hover:bg-surface/50"}`}
                  >
                    {v === "professional" && <Building2 className="h-3.5 w-3.5" />}
                    {t(v)}
                  </button>
                ))}
              </div>
            </div>

            {type === "professional" && (
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {t("search_company")}
                </div>
                <div className="relative">
                  <Input
                    value={companyQuery}
                    onChange={(e) => {
                      setCompanyQuery(e.target.value);
                      setSelectedCompany(null);
                    }}
                    placeholder={t("search_company_placeholder")}
                    className="h-12 rounded-none border-border bg-transparent pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {searching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </div>
                </div>
                {companyResults.length > 0 && !selectedCompany && (
                  <div className="mt-1 border border-border bg-background">
                    {companyResults.map((c) => (
                      <button
                        key={c.siret}
                        type="button"
                        onClick={() => selectCompany(c)}
                        className="flex w-full flex-col gap-0.5 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-surface"
                      >
                        <span className="text-sm font-medium">{c.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          SIRET {c.siret} — {c.postalCode} {c.city}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {selectedCompany && (
                  <div className="mt-2 border border-accent/30 bg-accent/5 p-3">
                    <div className="text-sm font-medium">{selectedCompany.name}</div>
                    <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                      SIRET {selectedCompany.siret}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {selectedCompany.address}, {selectedCompany.postalCode} {selectedCompany.city}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {tCommon("first_name")}
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="h-12 rounded-none border-border bg-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                >
                  {tCommon("last_name")}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="h-12 rounded-none border-border bg-transparent"
                />
              </div>
            </div>
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
                minLength={8}
                className="h-12 rounded-none border-border bg-transparent"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="group flex h-12 w-full items-center justify-center gap-2 bg-foreground font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-accent"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {t("register_title")}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6">
            <Link
              href="/account/login"
              className="group flex items-center justify-between py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{t("has_account")}</span>
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
