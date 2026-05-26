import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Conditions Generales de Vente" };

export default async function CgvPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border py-24">
          <Container>
            <Reveal>
              <SectionHeader number="00" label="Legal" className="mb-6" />
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Conditions Generales de Vente
              </h1>
            </Reveal>
          </Container>
        </section>
        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="space-y-8 text-muted-foreground">
              {sections.map((s, i) => (
                <div key={s.title}>
                  <h2 className="mb-3 text-base font-semibold text-foreground">
                    <span className="font-mono text-xs text-accent mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <p className="text-sm leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

const sections = [
  {
    title: "Objet",
    content:
      "Les presentes conditions generales de vente regissent les relations contractuelles entre FoxCase et ses clients pour toute commande de produits ou prestations de services realisee via le site foxcase.fr.",
  },
  {
    title: "Prix",
    content:
      "Les prix sont indiques en euros TTC. FoxCase se reserve le droit de modifier ses prix a tout moment, les produits etant factures au prix en vigueur au moment de la commande.",
  },
  {
    title: "Commandes",
    content:
      "Toute commande vaut acceptation des presentes CGV. La commande est confirmee par l'envoi d'un email de confirmation comportant le recapitulatif et le numero de commande.",
  },
  {
    title: "Paiement",
    content:
      "Le paiement est exigible a la commande. Les moyens de paiement acceptes sont : carte bancaire (Visa, Mastercard), Apple Pay, Google Pay. Les paiements sont securises par Stripe.",
  },
  {
    title: "Livraison",
    content:
      "Les delais de livraison sont donnes a titre indicatif. Les frais de livraison sont calcules en fonction du poids, des dimensions et de la destination via Packlink. Le transfert de risques s'effectue a la livraison.",
  },
  {
    title: "Droit de retractation",
    content:
      "Conformement a l'article L221-18 du Code de la consommation, vous disposez d'un delai de 14 jours a compter de la reception pour exercer votre droit de retractation sans avoir a justifier de motifs ni a payer de penalites. Les produits personnalises ne sont pas soumis au droit de retractation.",
  },
  {
    title: "Garanties",
    content:
      "Les produits beneficient de la garantie legale de conformite (articles L217-4 et suivants du Code de la consommation) et de la garantie des vices caches (articles 1641 et suivants du Code civil).",
  },
  {
    title: "Litiges",
    content:
      "En cas de litige, une solution amiable sera recherchee. A defaut, les tribunaux competents seront ceux du siege social de FoxCase. Droit applicable : droit francais.",
  },
];
