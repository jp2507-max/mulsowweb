import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import FussballDeWidget from "@/components/utility/FussballDeWidget";
import { generatePageMetadata } from "../config/site";
import { BreadcrumbJsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/app/config/site";

export const dynamic = "error";

export const metadata: Metadata = generatePageMetadata({
  title: "Spielplan & Ergebnisse",
  description: "Aktuelle Spielpläne, Ergebnisse und Tabellenstände des Mulsower SV 61. Alle Termine und Spielberichte auf der offiziellen FUSSBALL.DE Plattform.",
  path: "/spielplan"
});

export default function SchedulePage() {
  return (
    <main data-heavy className="container-site py-16 md:py-24" role="main" id="main-content">
      <BreadcrumbJsonLd
        items={[
          { name: 'Startseite', url: `${siteConfig.baseUrl}/` },
          { name: 'Spielplan', url: `${siteConfig.baseUrl}/spielplan/` },
        ]}
      />
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-ink-primary mb-6">
            Spielplan & Ergebnisse
          </h1>
          <p className="text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Alle aktuellen Spieltermine, Ergebnisse und Tabellenstände unserer Mannschaften 
            findest du auf der offiziellen FUSSBALL.DE Plattform.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="card card-hover max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-4">
                Offizieller Spielplan
              </h2>
              <p className="text-ink-secondary">
                Besuche unsere offizielle Vereinsseite auf FUSSBALL.DE für alle 
                aktuellen Informationen zu Spielterminen und Ergebnissen.
              </p>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              href="https://www.fussball.de/verein/mulsower-sv-61-mecklenburg-vorpommern/-/id/00ES8GNBNG000024VV0AG08LVUPGND5I#!/"
              target="_blank"
              className="w-full sm:w-auto text-lg px-8 py-4 hover:scale-105 transition-motion touch-feedback"
              aria-label="Spielplan auf FUSSBALL.DE öffnen - Öffnet externe Website in neuem Tab"
            >
              <svg 
                className="w-5 h-5 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
                aria-label="Externer Link Symbol"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
              Spielplan auf FUSSBALL.DE öffnen
            </Button>
          </div>
        </div>

        {/* Fußball.de Widget (embedded table) */}
        <section aria-labelledby="spielplan-widget-heading" className="mb-16">
          <h2 id="spielplan-widget-heading" className="sr-only">Spielplan Widget</h2>
          <div className="card max-w-4xl mx-auto p-4" role="region" aria-label="Fussball.de Spielplan und Tabelle">
            <FussballDeWidget
              id="b5168366-f6fd-48f2-8458-fd8c1f77a7ea"
              type="table"
              className="w-full"
              title="Spielplan & Tabelle – FUSSBALL.DE"
            />
          </div>
        </section>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card card-hover text-left">
            <h3 className="text-xl font-semibold font-heading text-ink-primary mb-3">
              Was findest du dort?
            </h3>
            <ul className="text-ink-secondary space-y-2">
              <li className="flex items-start">
                <span className="text-brand-primary mr-2">•</span>
                Aktuelle Spieltermine aller Mannschaften
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-2">•</span>
                Ergebnisse vergangener Spiele
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-2">•</span>
                Aktuelle Tabellenstände
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-2">•</span>
                Spielberichte und Statistiken
              </li>
            </ul>
          </div>

          <div className="card card-hover text-left">
            <h3 className="text-xl font-semibold font-heading text-ink-primary mb-3">
              Immer aktuell
            </h3>
            <p className="text-ink-secondary mb-4">
              FUSSBALL.DE ist die offizielle Plattform des Deutschen Fußball-Bundes. 
              Hier werden alle Spieltermine und Ergebnisse automatisch aktualisiert.
            </p>
            <p className="text-sm text-ink-tertiary">
              Die Seite öffnet sich in einem neuen Tab, damit du jederzeit zu 
              unserer Vereinsseite zurückkehren kannst.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
