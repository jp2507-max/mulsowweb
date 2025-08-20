import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { generatePageMetadata } from "../config/site";

export const dynamic = "error";

export const metadata: Metadata = generatePageMetadata({
  title: "Mitgliedschaft & Aufnahmeantrag",
  description: "Werden Sie Mitglied beim Mulsower SV 61. Informationen zur Vereinsmitgliedschaft, Beiträge und Aufnahmeantrag zum Download.",
  path: "/mitgliedschaft"
});

export default function MembershipPage() {
  return (
    <main className="container-site py-16 md:py-24" role="main" id="main-content">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-ink-primary mb-6">
            Mitgliedschaft
          </h1>
          <p className="text-lg md:text-xl text-ink-secondary leading-relaxed max-w-3xl mx-auto">
            Werden Sie Teil unserer Vereinsfamilie! Der Mulsower SV 61 freut sich über neue Mitglieder, 
            die unseren Verein und die Gemeinschaft stärken.
          </p>
        </div>

        {/* Membership Information */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Why Join Section */}
          <div className="card">
            <div className="mb-6">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-4">
                Warum Mitglied werden?
              </h2>
            </div>
            <ul className="text-ink-secondary space-y-3">
              <li className="flex items-start">
                <span className="text-brand-primary mr-3 mt-1">•</span>
                <span>Teil einer aktiven Vereinsgemeinschaft werden</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-3 mt-1">•</span>
                <span>Unterstützung des lokalen Amateurfußballs</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-3 mt-1">•</span>
                <span>Teilnahme an Vereinsveranstaltungen</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-3 mt-1">•</span>
                <span>Förderung der Jugendarbeit im Verein</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-primary mr-3 mt-1">•</span>
                <span>Mitbestimmung bei Vereinsentscheidungen</span>
              </li>
            </ul>
          </div>

          {/* Membership Types Section */}
          <div className="card">
            <div className="mb-6">
              <div className="w-16 h-16 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-4">
                Mitgliedschaften
              </h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-brand-primary pl-4">
                <h3 className="font-semibold text-ink-primary mb-1">Aktive Mitgliedschaft</h3>
                <p className="text-ink-secondary text-sm">Für Spieler und aktive Vereinsmitglieder</p>
              </div>
              <div className="border-l-4 border-brand-light pl-4">
                <h3 className="font-semibold text-ink-primary mb-1">Passive Mitgliedschaft</h3>
                <p className="text-ink-secondary text-sm">Für Förderer und Unterstützer des Vereins</p>
              </div>
              <div className="border-l-4 border-brand-light pl-4">
                <h3 className="font-semibold text-ink-primary mb-1">Jugendmitgliedschaft</h3>
                <p className="text-ink-secondary text-sm">Für Kinder und Jugendliche bis 18 Jahre</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Section */}
        <div className="card text-center mb-12 md:mb-16">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-ink-primary mb-4">
              Aufnahmeantrag
            </h2>
            <p className="text-lg text-ink-secondary max-w-2xl mx-auto mb-8">
              Laden Sie hier den Aufnahmeantrag herunter, füllen Sie ihn aus und senden Sie ihn 
              an unsere Vereinsadresse oder per E-Mail zurück.
            </p>
          </div>
          
          <Button
            variant="primary"
            size="lg"
            href="/05_2025_Aufnahmeantrag.pdf"
            download="Aufnahmeantrag_Mulsower_SV_61.pdf"
            className="w-full sm:w-auto text-lg px-8 py-4 hover:scale-105 transition-transform duration-200"
            aria-label="Aufnahmeantrag als PDF-Datei herunterladen"
          >
            <svg 
              className="w-6 h-6 mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              aria-label="Download-Symbol"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Aufnahmeantrag herunterladen (PDF)
          </Button>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Address Card */}
          <div className="card text-center md:text-left">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto md:mx-0 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold font-heading text-ink-primary mb-3">
                Vereinsadresse
              </h3>
            </div>
            <address className="not-italic text-ink-secondary leading-relaxed">
              <div className="font-semibold text-ink-primary mb-2">Mulsower SV 61 e.V.</div>
               <div>Garvensdorfer Weg 10</div>
              <div>18233 Carinerland</div>
              <div className="mt-2">Deutschland</div>
            </address>
            <div className="mt-4 text-sm text-ink-tertiary">
              Senden Sie den ausgefüllten Antrag an diese Adresse
            </div>
          </div>

          {/* Email Card */}
          <div className="card text-center md:text-left">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto md:mx-0 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold font-heading text-ink-primary mb-3">
                E-Mail Kontakt
              </h3>
            </div>
            <div className="text-ink-secondary leading-relaxed">
              <div className="mb-3">
                Für Fragen zur Mitgliedschaft:
              </div>
              <a 
                href="mailto:info@mulsower-sv.de"
                className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded"
              >
                info@mulsower-sv.de
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="mt-4 text-sm text-ink-tertiary">
              Oder senden Sie den Antrag als PDF-Anhang per E-Mail
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-neutral-100 rounded-xl text-ink-secondary">
            <svg 
              className="w-5 h-5 mr-3 text-brand-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm md:text-base">
              Bei Fragen zur Mitgliedschaft helfen wir gerne weiter
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}