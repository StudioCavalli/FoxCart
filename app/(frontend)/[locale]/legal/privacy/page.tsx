import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { SITE } from "@/lib/site";
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
            <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
              <Block title="Responsable du traitement">
                <p>
                  {SITE.legalName}, nom commercial {SITE.tradeName}
                  <br />
                  {SITE.address.full}
                  <br />
                  Email : {SITE.email}
                  <br />
                  SIRET : {SITE.legal.siret}
                </p>
              </Block>

              <Block title="Donnees collectees">
                <p>
                  Nous collectons les donnees suivantes, uniquement lorsque vous les fournissez
                  volontairement :
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Formulaire de contact : nom, email, telephone (optionnel), sujet, message</li>
                  <li>
                    Demande de devis : nom, prenom, email, telephone, entreprise, description du
                    projet
                  </li>
                  <li>
                    Commande e-commerce : nom, prenom, adresse de livraison et facturation, email,
                    telephone, donnees de paiement (traitees par Stripe, jamais stockees sur nos
                    serveurs)
                  </li>
                  <li>
                    Compte client : email, mot de passe (hashe), adresses, historique de commandes
                  </li>
                </ul>
              </Block>

              <Block title="Finalites du traitement">
                <ul className="list-inside list-disc space-y-1">
                  <li>Repondre a vos demandes de contact et de devis</li>
                  <li>Traiter et livrer vos commandes</li>
                  <li>Gerer votre compte client</li>
                  <li>
                    Envoyer des emails transactionnels (confirmation commande, expedition, facture)
                  </li>
                  <li>Respecter nos obligations legales et fiscales</li>
                </ul>
                <p className="mt-2">
                  Aucune donnee n'est utilisee a des fins de prospection commerciale non sollicitee,
                  de profilage publicitaire ou de revente a des tiers.
                </p>
              </Block>

              <Block title="Base legale">
                <ul className="list-inside list-disc space-y-1">
                  <li>Execution d'un contrat (commandes, prestations de service)</li>
                  <li>Consentement (formulaire de contact, demande de devis)</li>
                  <li>Obligation legale (facturation, comptabilite)</li>
                  <li>Interet legitime (amelioration du service, securite)</li>
                </ul>
              </Block>

              <Block title="Duree de conservation">
                <ul className="list-inside list-disc space-y-1">
                  <li>Donnees de contact : 3 ans apres le dernier echange</li>
                  <li>
                    Donnees de commande : 10 ans (obligations comptables, art. L123-22 du Code de
                    commerce)
                  </li>
                  <li>Donnees de compte client : jusqu'a suppression du compte + 3 ans</li>
                  <li>Cookies : aucun cookie de tracking. Aucun bandeau necessaire.</li>
                </ul>
              </Block>

              <Block title="Sous-traitants et transferts">
                <p>Vos donnees peuvent etre traitees par les sous-traitants suivants :</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Vercel Inc. (hebergement, CDN) — USA, clauses contractuelles types</li>
                  <li>Neon Inc. (base de donnees PostgreSQL) — EU</li>
                  <li>Stripe Inc. (paiement securise) — USA, certifie PCI DSS niveau 1</li>
                  <li>Resend (emails transactionnels) — USA, clauses contractuelles types</li>
                  <li>Packlink (expedition) — EU</li>
                </ul>
                <p className="mt-2">
                  Les transferts hors UE sont encadres par des clauses contractuelles types (art. 46
                  RGPD) ou des decisions d'adequation de la Commission europeenne.
                </p>
              </Block>

              <Block title="Vos droits (RGPD)">
                <p>
                  Conformement au Reglement General sur la Protection des Donnees (UE 2016/679),
                  vous disposez des droits suivants :
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Droit d'acces : obtenir une copie de vos donnees</li>
                  <li>Droit de rectification : corriger des donnees inexactes</li>
                  <li>Droit a l'effacement : demander la suppression de vos donnees</li>
                  <li>Droit a la portabilite : recevoir vos donnees dans un format structure</li>
                  <li>Droit d'opposition : vous opposer au traitement de vos donnees</li>
                  <li>Droit a la limitation : restreindre le traitement</li>
                </ul>
                <p className="mt-2">
                  Pour exercer ces droits, envoyez un email a {SITE.email} avec une copie d'une
                  piece d'identite. Nous repondrons dans un delai de 30 jours.
                </p>
                <p className="mt-2">
                  En cas de litige, vous pouvez saisir la CNIL (Commission Nationale de
                  l'Informatique et des Libertes) : www.cnil.fr
                </p>
              </Block>

              <Block title="Securite">
                <p>
                  Nous mettons en oeuvre des mesures techniques et organisationnelles appropriees
                  pour proteger vos donnees : chiffrement HTTPS/TLS, hashage des mots de passe
                  (bcrypt), acces restreint aux bases de donnees, journalisation des acces, mises a
                  jour regulieres des dependances.
                </p>
              </Block>

              <Block title="Cookies">
                <p>
                  Ce site n'utilise aucun cookie de tracking, publicitaire ou analytique. Aucun
                  cookie tiers n'est depose. Les seuls cookies eventuels sont des cookies de session
                  strictement necessaires au fonctionnement du site (authentification, panier),
                  exemptes de consentement au titre de l'article 82 de la loi Informatique et
                  Libertes.
                </p>
              </Block>

              <Block title="Modification">
                <p>
                  La presente politique peut etre modifiee a tout moment. La date de derniere mise a
                  jour est indiquee ci-dessous. Nous vous invitons a la consulter regulierement.
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground/60">
                  Derniere mise a jour : 26 mai 2026
                </p>
              </Block>
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
