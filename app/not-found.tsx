import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Seite nicht gefunden - Mulsower SV 61",
  description: "Die angeforderte Seite konnte nicht gefunden werden. Kehren Sie zur Startseite zurück oder nutzen Sie die Navigation.",
};

export default function NotFoundPage() {
  return (
    <main className="py-16 md:py-20 bg-white min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* 404 Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-8">
            {/* Large 404 Number */}
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black font-heading text-brand-primary leading-none mb-4">
              404
            </h1>
            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-6">
              Seite nicht gefunden
            </h2>
            <p className="text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl mx-auto">
              Die angeforderte Seite existiert nicht oder wurde verschoben. 
              Nutzen Sie die Navigation oder kehren Sie zur Startseite zurück.
            </p>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Primary Action - Back to Home */}
          <div className="text-center mb-8">
            <Button 
              href="/" 
              variant="primary" 
              size="lg"
              className="hero-cta hero-cta-primary"
            >
              <svg className="hero-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Zur Startseite
            </Button>
          </div>

          {/* Quick Navigation Links */}
          <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 border border-neutral-200">
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 text-center">
              Schnelle Navigation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                href="/spielplan/" 
                variant="outline" 
                size="md"
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Spielplan
              </Button>
              
              <Button 
                href="/sponsoren/" 
                variant="outline" 
                size="md"
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Sponsoren
              </Button>
              
              <Button 
                href="/mitgliedschaft/" 
                variant="outline" 
                size="md"
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mitgliedschaft
              </Button>
              
              <Button 
                href="/impressum/" 
                variant="outline" 
                size="md"
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Impressum
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-brand-light/30 rounded-2xl p-8 md:p-10 border border-brand-light">
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-ink-primary mb-6 text-center">
              Kontakt
            </h3>
            <div className="text-center space-y-4">
              <p className="text-ink-secondary leading-relaxed">
                Falls Sie Hilfe benötigen oder einen defekten Link gefunden haben, 
                kontaktieren Sie uns gerne:
              </p>
              <div className="space-y-2">
                <div>
                  <strong className="text-ink-primary">E-Mail:</strong>{" "}
                  <a 
                    href="mailto:info@mulsower-sv.de" 
                    className="text-brand-primary hover:text-brand-secondary transition-colors duration-200 underline"
                  >
                    info@mulsower-sv.de
                  </a>
                </div>
                <div className="text-ink-secondary">
                  <strong className="text-ink-primary">Adresse:</strong><br />
                  Mulsower SV 61 e.V.<br />
                  Garvensdorfer Weg 8<br />
                  18233 Carinerland
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Back Button */}
        <div className="text-center mt-12">
          <Button 
            href="/"
            variant="ghost"
            className="text-ink-tertiary hover:text-ink-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur vorherigen Seite
          </Button>
        </div>
      </div>
    </main>
  );
}