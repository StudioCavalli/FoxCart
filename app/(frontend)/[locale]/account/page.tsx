"use client";

import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { Link } from "@/i18n/navigation";
import { ArrowRight, LogOut, Package, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CustomerUser {
  firstName: string;
  lastName: string;
  email: string;
}

export default function AccountPage() {
  const t = useTranslations("Account");
  const router = useRouter();
  const [user, setUser] = useState<CustomerUser | null>(null);

  useEffect(() => {
    fetch("/api/customers/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) setUser(d.user);
        else router.push("/account/login");
      });
  }, [router]);

  const logout = useCallback(async () => {
    await fetch("/api/customers/me", { method: "DELETE" });
    router.push("/account/login");
    router.refresh();
  }, [router]);

  if (!user) return null;

  const links = [
    { href: "/account/orders" as const, icon: Package, label: t("orders") },
    { href: "/account/settings" as const, icon: Settings, label: t("settings") },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-32">
          <Container>
            <Reveal>
              <SectionHeader number="00" label={t("dashboard")} className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.02em]">
                Bonjour {user.firstName}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 font-mono text-xs text-muted-foreground">{user.email}</p>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border">
          <Container>
            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <Reveal key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between bg-background p-8 transition-colors hover:bg-surface"
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                  </Link>
                </Reveal>
              ))}
              <Reveal>
                <button
                  type="button"
                  onClick={logout}
                  className="group flex w-full items-center justify-between bg-background p-8 transition-colors hover:bg-surface"
                >
                  <div className="flex items-center gap-4">
                    <LogOut className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-muted-foreground">{t("logout")}</span>
                  </div>
                </button>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
