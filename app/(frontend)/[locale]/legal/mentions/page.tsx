import { Container, Footer, Header } from "@/components/layout";
import { Reveal, SectionHeader } from "@/components/visual";
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
            <div className="prose-sm space-y-8 text-muted-foreground">
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">Editeur du site</h2>
                <p className="text-sm leading-relaxed">
                  FoxCase — Agence digitale
                  <br />
                  Forme juridique : [A completer]
                  <br />
                  SIRET : [A completer]
                  <br />
                  Siege social : Paris, France
                  <br />
                  Email : contact@foxcase.fr
                  <br />
                  Directeur de la publication : [A completer]
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">Hebergement</h2>
                <p className="text-sm leading-relaxed">
                  Vercel Inc.
                  <br />
                  440 N Barranca Ave #4133
                  <br />
                  Covina, CA 91723, USA
                  <br />
                  https://vercel.com
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-base font-semibold text-foreground">
                  Propriete intellectuelle
                </h2>
                <p className="text-sm leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icones) est la
                  propriete exclusive de FoxCase, sauf mention contraire. Toute reproduction,
                  distribution ou utilisation sans autorisation est interdite.
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
