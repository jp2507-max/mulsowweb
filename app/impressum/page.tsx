import type { Metadata } from "next";
import { generatePageMetadata } from "../config/site";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/app/config/site";

export const dynamic = "error";

export const metadata: Metadata = generatePageMetadata({
  title: "Impressum & Rechtliche Angaben",
  description: "Rechtliche Angaben und Impressum des Mulsower SV 61 e.V. gemäß §5 DDG. Kontaktdaten, Vertretung und Haftungsausschluss.",
  path: "/impressum/"
});

export default function ImpressumPage() {
  return (
    <section className="py-16 md:py-20" id="main-content" aria-labelledby="impressum-title">
      <BreadcrumbJsonLd
        items={[
          { name: 'Startseite', url: `${siteConfig.baseUrl}/` },
          { name: 'Impressum', url: `${siteConfig.baseUrl}/impressum/` },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-12 md:mb-16">
          <h1 id="impressum-title" className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-ink-primary mb-6">
            Impressum
          </h1>
          <p className="text-lg md:text-xl text-ink-secondary leading-relaxed">
            Rechtliche Angaben gemäß §5 DDG (Digitale Dienste Gesetz)
          </p>
        </div>

        {/* Legal Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Provider Information - §5 DDG */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Anbieter (§5 DDG)
            </h2>
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-l-4 border-brand-primary">
              <div className="space-y-3 text-ink-secondary">
                <div>
                  <strong className="text-ink-primary">Vereinsname:</strong><br />
                  Mulsower SV 61 e.V.
                </div>
                <div>
                  <strong className="text-ink-primary">Anschrift:</strong><br />
                  Garvensdorfer Weg 10<br />
                  18233 Carinerland<br />
                  Deutschland
                </div>
                <div>
                  <strong className="text-ink-primary">E-Mail:</strong><br />
                  <a 
                    href="mailto:info@mulsower-sv.de" 
                    className="text-brand-primary hover:text-brand-secondary transition-colors duration-200 underline"
                  >
                    info@mulsower-sv.de
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Representation */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Vertretung
            </h2>
            <div className="bg-yellow-50 rounded-xl p-6 md:p-8 border-l-4 border-yellow-400">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="font-semibold text-yellow-800 mb-2">TODO: Vorstandsinformationen ergänzen</p>
                  <p className="text-yellow-700 text-sm">
                    Die Angaben zu den vertretungsberechtigten Personen (Vorstand) müssen noch ergänzt werden.
                    Erforderlich sind: Name, Anschrift und Funktion der vertretungsberechtigten Personen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Registry Information */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Registereintrag
            </h2>
            <div className="bg-yellow-50 rounded-xl p-6 md:p-8 border-l-4 border-yellow-400">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="font-semibold text-yellow-800 mb-2">TODO: Vereinsregisterdaten ergänzen</p>
                  <p className="text-yellow-700 text-sm">
                    Die Registerdaten müssen noch ergänzt werden. Erforderlich sind:
                  </p>
                  <ul className="text-yellow-700 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Registergericht</li>
                    <li>Registernummer</li>
                    <li>Datum der Eintragung</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* VAT Information */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-l-4 border-neutral-400">
              <p className="text-ink-secondary">
                Als gemeinnütziger Sportverein ist der Mulsower SV 61 e.V. von der Umsatzsteuer befreit.
                Eine Umsatzsteuer-Identifikationsnummer ist daher nicht erforderlich.
              </p>
            </div>
          </section>

          {/* Liability Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Haftungsausschluss
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-ink-primary mb-3">Haftung für Inhalte</h3>
                <p className="text-ink-secondary leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht 
                  unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-ink-primary mb-3">Haftung für Links</h3>
                <p className="text-ink-secondary leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten 
                  wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren 
                  zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Urheberrecht
            </h2>
            <p className="text-ink-secondary leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>

          {/* Data Protection Reference */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Datenschutz
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-400">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-800 leading-relaxed">
                    Diese Website erhebt keine personenbezogenen Daten und verwendet keine Cookies oder Tracking-Technologien. 
                    Es werden keine Daten an Dritte weitergegeben. Bei Kontaktaufnahme per E-Mail werden die übermittelten 
                    Daten ausschließlich zur Bearbeitung der Anfrage verwendet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact for Legal Issues */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Kontakt bei rechtlichen Fragen
            </h2>
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-l-4 border-brand-primary">
              <p className="text-ink-secondary leading-relaxed mb-4">
                Bei Fragen zu diesem Impressum oder rechtlichen Angelegenheiten wenden Sie sich bitte an:
              </p>
              <div className="space-y-2 text-ink-secondary">
                <div>
                  <strong className="text-ink-primary">E-Mail:</strong>{" "}
                  <a 
                    href="mailto:info@mulsower-sv.de" 
                    className="text-brand-primary hover:text-brand-secondary transition-colors duration-200 underline"
                  >
                    info@mulsower-sv.de
                  </a>
                </div>
                <div>
                  <strong className="text-ink-primary">Postanschrift:</strong><br />
                  Mulsower SV 61 e.V.<br />
                  Garvensdorfer Weg 10<br />
                  18233 Carinerland
                </div>
              </div>
            </div>
          </section>

          {/* Last Updated */}
          <section className="border-t border-neutral-200 pt-8">
            <p className="text-sm text-ink-tertiary text-center">
              Stand: {new Date().toLocaleDateString('de-DE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>

        </div>
      </div>
  </section>
  );
}
