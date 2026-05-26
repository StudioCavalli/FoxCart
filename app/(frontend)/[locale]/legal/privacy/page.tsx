import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Politique de confidentialite" };

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
                Politique de confidentialite
              </h1>
            </Reveal>
          </Container>
        </section>
        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="space-y-8 text-muted-foreground">
              {sections.map((s) => (
                <div key={s.title}>
                  <h2 className="mb-3 text-base font-semibold text-foreground">{s.title}</h2>
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
    title: "Donnees collectees",
    content:
      "Nous collectons uniquement les donnees que vous nous fournissez volontairement via nos formulaires : nom, email, telephone, message. Aucune donnee n'est collectee automatiquement a des fins de tracking.",
  },
  {
    title: "Finalite du traitement",
    content:
      "Vos donnees sont utilisees exclusivement pour repondre a vos demandes (contact, devis), traiter vos commandes et assurer le suivi de la relation client.",
  },
  {
    title: "Duree de conservation",
    content:
      "Les donnees de contact sont conservees 3 ans apres le dernier echange. Les donnees de commande sont conservees conformement aux obligations legales (10 ans pour les factures).",
  },
  {
    title: "Vos droits",
    content:
      "Conformement au RGPD, vous disposez d'un droit d'acces, de rectification, de suppression et de portabilite de vos donnees. Pour exercer ces droits, contactez-nous a contact@foxcase.fr.",
  },
  {
    title: "Cookies",
    content:
      "Ce site n'utilise aucun cookie de tracking ou publicitaire. Aucun bandeau cookie n'est necessaire.",
  },
  {
    title: "Hebergement des donnees",
    content:
      "Les donnees sont hebergees en Europe (Neon Postgres, region EU). Les fichiers medias sont stockes sur Vercel Blob (CDN global).",
  },
];
