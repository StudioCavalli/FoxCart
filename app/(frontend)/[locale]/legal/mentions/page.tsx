import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = { title: "Mentions legales" };

export default async function MentionsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Mentions legales</h1>
            </Reveal>
          </Container>
        </section>
        <section className="py-16">
          <Container className="max-w-3xl">
            <div className="space-y-8 text-muted-foreground">
              <Block title="Editeur du site">
                <p>
                  Nom commercial : {SITE.tradeName}
                  <br />
                  Raison sociale : {SITE.legalName}
                  <br />
                  Forme juridique : {SITE.legal.form}
                  <br />
                  SIRET : {SITE.legal.siret}
                  <br />
                  SIREN : {SITE.legal.siren}
                  <br />N TVA intracommunautaire : {SITE.legal.tva}
                  <br />
                  Code NAF/APE : {SITE.legal.naf}
                  <br />
                  Siege social : {SITE.address.full}
                  <br />
                  Email : {SITE.email}
                  <br />
                  Directeur de la publication : {SITE.legal.director}
                </p>
              </Block>

              <Block title="Activite">
                <p>
                  Conception, developpement de logiciels et outils informatiques, ainsi que leur
                  exploitation et maintenance. Prestations de services digitaux, creation de sites
                  web, applications mobiles, e-commerce, et vente de supports commerciaux imprimes.
                </p>
              </Block>

              <Block title="Hebergement">
                <p>
                  Vercel Inc.
                  <br />
                  440 N Barranca Ave #4133, Covina, CA 91723, USA
                  <br />
                  https://vercel.com
                </p>
                <p className="mt-2">
                  Base de donnees : Neon Inc. (PostgreSQL serverless, region EU)
                  <br />
                  Stockage medias : Vercel Blob (CDN global)
                </p>
              </Block>

              <Block title="Propriete intellectuelle">
                <p>
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icones,
                  logiciels, code source) est la propriete exclusive de {SITE.tradeName} (
                  {SITE.legalName}), sauf mention contraire. Toute reproduction, representation,
                  modification, publication, adaptation de tout ou partie des elements du site, quel
                  que soit le moyen ou le procede utilise, est interdite sans autorisation ecrite
                  prealable de {SITE.tradeName}.
                </p>
                <p className="mt-2">
                  Toute exploitation non autorisee du site ou de son contenu sera consideree comme
                  constitutive d'une contrefacon et poursuivie conformement aux articles L.335-2 et
                  suivants du Code de la propriete intellectuelle.
                </p>
              </Block>

              <Block title="Limitation de responsabilite">
                <p>
                  {SITE.tradeName} s'efforce de fournir sur le site des informations aussi precises
                  que possible. Toutefois, il ne pourra etre tenu responsable des omissions, des
                  inexactitudes et des carences dans la mise a jour, qu'elles soient de son fait ou
                  du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p className="mt-2">
                  Les liens hypertextes mis en place dans le cadre du present site en direction
                  d'autres ressources sur Internet ne sauraient engager la responsabilite de{" "}
                  {SITE.tradeName}.
                </p>
              </Block>

              <Block title="Droit applicable">
                <p>
                  Les presentes mentions legales sont regies par le droit francais. En cas de
                  litige, les tribunaux competents seront ceux du ressort du siege social de{" "}
                  {SITE.tradeName}, soit le Tribunal de Commerce de Cannes, sauf disposition legale
                  contraire.
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
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
