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
    <section className="section-spacing" id="main-content" aria-labelledby="impressum-title">
      <BreadcrumbJsonLd
        items={[
          { name: 'Startseite', url: `${siteConfig.baseUrl}/` },
          { name: 'Impressum', url: `${siteConfig.baseUrl}/impressum/` },
        ]}
      />
  <div className="container-site max-w-4xl">
        {/* Page Header */}
  <div className="mb-10 md:mb-14">
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
          <section className="mb-10">
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
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Vertretung / Vorstand
            </h2>
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-l-4 border-brand-primary">
              <div className="space-y-3 text-ink-secondary">
                <p className="text-ink-secondary">
                  Der Mulsower SV 61 e.V. wird vertreten durch den Vorstand. Nachfolgend finden Sie die für die Vertretung des Vereins verantwortlichen Personen.
                </p>
                <div>
                  <strong className="text-ink-primary">Vorstand (vertretungsberechtigte Person):</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Vorsitzender: Christian Fröhlich — Telefon: 0172 3162075 — E-Mail: <a href="mailto:info@mulsower-sv.de" className="text-brand-primary underline">info@mulsower-sv.de</a></li>
                  </ul>
                  
                </div>
              </div>
            </div>
          </section>

          {/* Registry Information */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Registereintrag
            </h2>
            <div className="bg-neutral-50 rounded-xl p-6 md:p-8 border-l-4 border-brand-primary">
              <div className="space-y-3 text-ink-secondary">
                {/* Register information paragraph removed as requested */}
                <div>
                  <strong className="text-ink-primary">Vereinsregister:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Registergericht: Amtsgericht [Ort]</li>
                    <li>Registernummer: VR [Nummer]</li>
                    <li>Datum der Eintragung: [TT.MM.JJJJ]</li>
                  </ul>
                </div>
                {/* Removed hint paragraph per request */}
              </div>
            </div>
          </section>

          {/* VAT Information */}
          <section className="mb-10">
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
          <section className="mb-10">
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
          <section className="mb-10">
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
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 border-b-2 border-brand-primary pb-2">
              Datenschutz
            </h2>
            <div className="bg-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-400">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-blue-800 leading-relaxed">
                  <p>
                    Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Auf dieser Website verarbeiten wir nur die
                    unbedingt erforderlichen Daten für den Betrieb der Seiten und die Kommunikation mit Ihnen. Bitte beachten
                    Sie, dass durch eingebettete Inhalte Dritter (z. B. Widgets oder iFrames von externen Anbietern wie
                    Fussball.de oder Facebook/Meta) beim Laden dieser Inhalte personenbezogene Daten an die jeweiligen
                    Drittanbieter übermittelt werden können (z. B. Ihre IP-Adresse, Geräte- und Browserinformationen oder
                    gesetzte Cookies). Wir haben keinen Einfluss auf Umfang und Zwecke der Datenverarbeitung durch diese
                    Drittanbieter.
                  </p>

                  <h3 className="text-sm font-semibold mt-3">Welche Daten können verarbeitet werden</h3>
                  <p>
                    Typischerweise werden folgende Daten durch Drittanbieter verarbeitet: IP-Adresse, Zeitpunkt der Anfrage,
                    besuchte Seite, Referrer, Gerätedaten (z. B. User‑Agent) sowie ggf. Cookies und einzelne gerätespezifische
                    Kennzahlen. Die genauen Datenarten hängen vom jeweiligen Anbieter ab.
                  </p>

                  <h3 className="text-sm font-semibold mt-3">Rechtsgrundlage</h3>
                  <p>
                    Soweit eine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO erforderlich ist (z. B. für nicht essentielle
                    Tracking‑Technologien), holen wir diese vor Aktivierung ein. Für andere Verarbeitungen stützt sich die
                    Rechtsgrundlage überwiegend auf berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO), z. B. zur sicheren
                    Bereitstellung der Website oder zur Anzeige eingebetteter Drittinhalte.
                  </p>

                  <h3 className="text-sm font-semibold mt-3">Drittanbieter und Links zu Datenschutzhinweisen</h3>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Fussball.de / DFBnet: Beim Einbetten von Spielplänen und Widgets können Daten an Fussball.de bzw. den
                      Betreiber übermittelt werden. Bitte beachten Sie die Datenschutzhinweise des Anbieters.
                    </li>
                    <li>
                      Facebook / Meta Platforms: Inhalte von Facebook können personenbezogene Daten verarbeiten und Cookies
                      setzen. Informationen zur Datenverarbeitung durch Meta finden Sie in den Datenschutzhinweisen von
                      Meta (https://www.facebook.com/privacy/).
                    </li>
                  </ul>

                  <h3 className="text-sm font-semibold mt-3">Kontakt und Auskunftsrechte</h3>
                  <p>
                    Wenn Sie Fragen zur Verarbeitung Ihrer personenbezogenen Daten haben oder Ihre Rechte nach der DSGVO
                    (Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit) ausüben möchten,
                    wenden Sie sich bitte an <a href="mailto:info@mulsower-sv.de" className="underline text-blue-800">info@mulsower-sv.de</a>.
                    Sie haben zudem das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
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
