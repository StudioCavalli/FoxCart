import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { SITE } from "@/lib/site";
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
            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
              <Block title="Delai de retractation">
                <p>
                  Conformement a l'article L221-18 du Code de la consommation, vous disposez de 14
                  jours calendaires a compter de la reception de votre commande pour exercer votre
                  droit de retractation sans avoir a justifier de motifs ni a payer de penalites.
                </p>
              </Block>

              <Block title="Produits exclus du droit de retractation">
                <p>
                  Conformement a l'article L221-28 du Code de la consommation, ne peuvent faire
                  l'objet d'un retour :
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    Les produits personnalises (cartes de visite, flyers, kakemonos, roll-ups avec
                    votre design)
                  </li>
                  <li>Les produits imprimes a la demande (livres, magazines, catalogues)</li>
                  <li>Les prestations de services pleinement executees</li>
                </ul>
                <p className="mt-2">
                  Exception : en cas de defaut de fabrication (erreur d'impression, produit
                  endommage a la reception), un retour ou une reimpression est possible quelle que
                  soit la nature du produit.
                </p>
              </Block>

              <Block title="Procedure de retour">
                <p>Pour initier un retour :</p>
                <ol className="mt-2 list-inside list-decimal space-y-1">
                  <li>
                    Envoyez un email a {SITE.email} avec votre numero de commande et le motif du
                    retour
                  </li>
                  <li>
                    Nous vous confirmerons l'eligibilite au retour sous 48h et vous fournirons les
                    instructions
                  </li>
                  <li>
                    Retournez le produit dans son emballage d'origine, complet et non utilise, dans
                    un delai de 14 jours
                  </li>
                  <li>Joignez le formulaire de retour fourni par email</li>
                </ol>
                <p className="mt-2">Adresse de retour : {SITE.address.full}</p>
              </Block>

              <Block title="Frais de retour">
                <ul className="list-inside list-disc space-y-1">
                  <li>Retractation (changement d'avis) : frais de retour a la charge du Client</li>
                  <li>
                    Produit defectueux ou non conforme : frais de retour a la charge du Vendeur
                  </li>
                  <li>Erreur de livraison : frais de retour a la charge du Vendeur</li>
                </ul>
              </Block>

              <Block title="Remboursement">
                <p>
                  Le remboursement est effectue dans un delai maximum de 14 jours suivant la
                  reception du produit retourne (ou la preuve d'expedition), par le meme moyen de
                  paiement que celui utilise lors de la commande.
                </p>
                <p className="mt-2">
                  Le remboursement peut etre differe jusqu'a reception effective du produit retourne
                  ou jusqu'a ce que le Client ait fourni une preuve d'expedition, la date retenue
                  etant celle du premier de ces faits.
                </p>
                <p className="mt-2">
                  Si le produit retourne est endommage, incomplet ou utilise, le Vendeur se reserve
                  le droit de deduire du remboursement une somme correspondant a la depreciation du
                  produit.
                </p>
              </Block>

              <Block title="Produit defectueux">
                <p>
                  En cas de defaut constate a la reception (impression defectueuse, couleurs non
                  conformes, produit endommage pendant le transport), signalez-le dans les 48 heures
                  par email a {SITE.email}
                  avec des photos du defaut. Nous procederons a une reimpression gratuite ou a un
                  remboursement integral, au choix du Client.
                </p>
              </Block>

              <p className="mt-8 font-mono text-xs text-muted-foreground/60">
                Derniere mise a jour : 26 mai 2026
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-foreground">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
