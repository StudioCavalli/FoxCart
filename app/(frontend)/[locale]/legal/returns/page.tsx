import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Politique de retour" };

export default async function ReturnsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Politique de retour</h1>
            </Reveal>
          </Container>
        </section>
        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">
                  Delai de retractation
                </h2>
                <p className="text-sm leading-relaxed">
                  Vous disposez de 14 jours calendaires a compter de la reception de votre commande
                  pour nous notifier votre souhait de retourner un produit, conformement a l'article
                  L221-18 du Code de la consommation.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">Produits exclus</h2>
                <p className="text-sm leading-relaxed">
                  Les produits personnalises (cartes de visite, flyers, kakemonos avec votre design)
                  ne peuvent faire l'objet d'un retour, sauf defaut de fabrication. Les livres et
                  magazines imprimes a la demande sont egalement exclus sauf defaut.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">Procedure</h2>
                <p className="text-sm leading-relaxed">
                  Pour initier un retour, contactez-nous a contact@foxcase.fr avec votre numero de
                  commande. Nous vous fournirons les instructions et l'etiquette de retour. Les
                  frais de retour sont a la charge du client sauf en cas de produit defectueux.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">Remboursement</h2>
                <p className="text-sm leading-relaxed">
                  Le remboursement est effectue dans un delai de 14 jours suivant la reception du
                  produit retourne, par le meme moyen de paiement que celui utilise lors de la
                  commande.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
