import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { SITE } from "@/lib/site";
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
            <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
              <Article n={1} title="Objet et champ d'application">
                <p>
                  Les presentes Conditions Generales de Vente (ci-apres "CGV") regissent l'ensemble
                  des relations commerciales entre {SITE.legalName}, exerçant sous le nom commercial{" "}
                  {SITE.tradeName},{SITE.legal.form}, SIRET {SITE.legal.siret}, dont le siege social
                  est situe au {SITE.address.full}
                  (ci-apres "le Vendeur") et toute personne physique ou morale (ci-apres "le
                  Client") effectuant un achat de produits ou de prestations de services sur le site{" "}
                  {SITE.url} (ci-apres "le Site").
                </p>
                <p className="mt-2">
                  Toute commande implique l'acceptation sans reserve par le Client des presentes
                  CGV, qui prevalent sur tout autre document. Le Vendeur se reserve le droit de
                  modifier les CGV a tout moment ; les conditions applicables sont celles en vigueur
                  a la date de la commande.
                </p>
              </Article>

              <Article n={2} title="Produits et services">
                <p>
                  Les produits et services proposes sont decrits sur le Site avec la plus grande
                  exactitude possible. Les photographies ne sont pas contractuelles. En cas d'erreur
                  manifeste dans la description d'un produit ou son prix, le Vendeur ne sera pas
                  tenu de proceder a la vente.
                </p>
                <p className="mt-2">
                  Les produits proposes a la vente incluent notamment : supports commerciaux
                  imprimes (cartes de visite, flyers, affiches, brochures), signaletique (kakemonos,
                  roll-ups, X-banners), editions (livres, magazines, catalogues), et prestations de
                  services digitaux (sites web, applications, conseil, formation).
                </p>
              </Article>

              <Article n={3} title="Prix">
                <p>
                  Les prix sont indiques en euros toutes taxes comprises (TTC), TVA française en
                  vigueur incluse (taux normal 20%). Les frais de livraison ne sont pas inclus dans
                  le prix des produits et sont calcules lors de la commande en fonction du poids,
                  des dimensions et de la destination.
                </p>
                <p className="mt-2">
                  Le Vendeur se reserve le droit de modifier ses prix a tout moment. Les produits
                  sont factures sur la base des tarifs en vigueur au moment de l'enregistrement de
                  la commande.
                </p>
              </Article>

              <Article n={4} title="Commande">
                <p>
                  Le Client passe commande sur le Site en suivant le processus de commande en ligne.
                  La commande n'est definitive qu'apres confirmation du paiement. Un email de
                  confirmation est envoye au Client comportant un recapitulatif de la commande et un
                  numero de reference.
                </p>
                <p className="mt-2">
                  Le Vendeur se reserve le droit de refuser ou d'annuler toute commande pour motif
                  legitime, notamment en cas de probleme d'approvisionnement, d'erreur de prix
                  manifeste, ou de commande anormale.
                </p>
              </Article>

              <Article n={5} title="Paiement">
                <p>
                  Le paiement est exigible integralement a la commande. Les moyens de paiement
                  acceptes sont : carte bancaire (Visa, Mastercard, American Express), Apple Pay,
                  Google Pay. Les paiements sont securises par Stripe (certifie PCI DSS niveau 1).
                  Les donnees bancaires ne transitent jamais par nos serveurs.
                </p>
                <p className="mt-2">
                  En cas de defaut de paiement, de paiement partiel ou de rejet de paiement, le
                  Vendeur se reserve le droit de suspendre ou d'annuler la commande et sa livraison.
                </p>
              </Article>

              <Article n={6} title="Livraison">
                <p>
                  Les livraisons sont effectuees a l'adresse indiquee par le Client lors de la
                  commande, en France metropolitaine et dans les pays de l'Union europeenne. Les
                  delais de livraison sont donnes a titre indicatif et dependent du transporteur
                  choisi (calcul via Packlink).
                </p>
                <p className="mt-2">
                  Pour les produits imprimes a la demande (cartes de visite, livres, etc.), un delai
                  de fabrication de 3 a 10 jours ouvrables s'ajoute au delai de livraison. Le
                  transfert de risques s'effectue au moment de la remise du colis au transporteur.
                </p>
                <p className="mt-2">
                  En cas de retard de livraison superieur a 30 jours par rapport a la date
                  indicative, le Client pourra demander la resolution de la commande par lettre
                  recommandee avec accuse de reception, et obtenir le remboursement integral dans un
                  delai de 14 jours.
                </p>
              </Article>

              <Article n={7} title="Droit de retractation">
                <p>
                  Conformement aux articles L221-18 et suivants du Code de la consommation, le
                  Client consommateur dispose d'un delai de 14 jours calendaires a compter de la
                  reception du produit pour exercer son droit de retractation, sans avoir a
                  justifier de motifs ni a payer de penalites.
                </p>
                <p className="mt-2 font-medium text-foreground">
                  Exclusions du droit de retractation :
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>
                    Produits personnalises ou fabriques selon les specifications du Client (cartes
                    de visite, flyers, kakemonos avec design personnalise)
                  </li>
                  <li>Produits imprimes a la demande (livres, magazines, catalogues)</li>
                  <li>
                    Prestations de services pleinement executees avant la fin du delai de
                    retractation, avec accord prealable expres du Client
                  </li>
                  <li>
                    Contenus numeriques fournis sur un support non materiel dont l'execution a
                    commence avec accord du Client
                  </li>
                </ul>
                <p className="mt-2">
                  Pour exercer ce droit, le Client doit notifier sa decision par email a{" "}
                  {SITE.email} ou par courrier au {SITE.address.full}, en precisant son numero de
                  commande. Le produit doit etre retourne dans son etat d'origine, complet et non
                  utilise, dans un delai de 14 jours suivant la notification. Les frais de retour
                  sont a la charge du Client.
                </p>
              </Article>

              <Article n={8} title="Garanties">
                <p>
                  Tous les produits beneficient de la garantie legale de conformite (articles L217-3
                  et suivants du Code de la consommation) et de la garantie des vices caches
                  (articles 1641 et suivants du Code civil).
                </p>
                <p className="mt-2">
                  Au titre de la garantie legale de conformite, le Client peut agir dans un delai de
                  2 ans a compter de la delivrance du bien. Il peut choisir entre la reparation ou
                  le remplacement du bien, sous reserve des conditions de cout prevues par l'article
                  L217-12 du Code de la consommation.
                </p>
                <p className="mt-2">
                  En cas de defaut de fabrication constate a la reception (impression defectueuse,
                  produit endommage), le Client dispose de 48 heures pour signaler le defaut par
                  email avec photos. Le Vendeur procedera a une reimpression ou un remboursement
                  selon le cas.
                </p>
              </Article>

              <Article n={9} title="Responsabilite">
                <p>
                  Le Vendeur ne saurait etre tenu pour responsable des dommages resultant d'une
                  mauvaise utilisation du produit achete, de fichiers d'impression fournis par le
                  Client non conformes aux specifications techniques, ou de l'inexecution de la
                  commande due a un cas de force majeure (guerre, epidemie, greve, incendie,
                  inondation, panne informatique generalisee).
                </p>
                <p className="mt-2">
                  La responsabilite du Vendeur est limitee au montant de la commande concernee. En
                  aucun cas le Vendeur ne pourra etre tenu responsable des dommages indirects,
                  pertes de benefices, pertes de donnees ou de toute autre perte imprevisible.
                </p>
              </Article>

              <Article n={10} title="Propriete intellectuelle">
                <p>
                  Le Client garantit detenir les droits de propriete intellectuelle sur les fichiers
                  et contenus qu'il fournit pour impression ou personnalisation. Le Client degage le
                  Vendeur de toute responsabilite en cas de violation des droits de tiers.
                </p>
                <p className="mt-2">
                  Le Vendeur se reserve le droit de refuser l'impression de tout contenu
                  manifestement illicite, diffamatoire, discriminatoire ou portant atteinte aux
                  droits de tiers.
                </p>
              </Article>

              <Article n={11} title="Protection des donnees">
                <p>
                  Le traitement des donnees personnelles est regi par notre Politique de
                  confidentialite, accessible sur le Site. Le Client dispose des droits prevus par
                  le RGPD (acces, rectification, effacement, portabilite, opposition, limitation).
                </p>
              </Article>

              <Article n={12} title="Mediation et litiges">
                <p>
                  En cas de litige, le Client peut recourir gratuitement au service de mediation de
                  la consommation prevu aux articles L611-1 et suivants du Code de la consommation.
                  Le mediateur competent sera communique sur simple demande a {SITE.email}.
                </p>
                <p className="mt-2">
                  Le Client peut egalement recourir a la plateforme de reglement en ligne des
                  litiges de la Commission europeenne : https://ec.europa.eu/consumers/odr/
                </p>
                <p className="mt-2">
                  A defaut de resolution amiable, les tribunaux competents seront ceux du ressort du
                  siege social du Vendeur (Tribunal de Commerce de Cannes), sauf disposition legale
                  imperative contraire. Le droit français est applicable.
                </p>
              </Article>

              <Article n={13} title="Dispositions generales">
                <p>
                  Si l'une des clauses des presentes CGV venait a etre declaree nulle par une
                  decision de justice, les autres clauses conserveraient leur plein effet. Le fait
                  de ne pas exercer un droit prevu par les presentes CGV ne constitue pas une
                  renonciation a ce droit.
                </p>
              </Article>

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

function Article({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-foreground">
        <span className="mr-2 font-mono text-xs text-accent">{String(n).padStart(2, "0")}</span>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
