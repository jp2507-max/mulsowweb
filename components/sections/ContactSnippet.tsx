import React from 'react';

interface ContactSnippetProps {
  className?: string;
}

export default function ContactSnippet({ className = '' }: ContactSnippetProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`} aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4">
            Kontakt
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
            Haben Sie Fragen oder möchten Sie uns kontaktieren? Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Address Card */}
            <div className="card card-hover text-center md:text-left">
              <div className="mb-6">
                <div
                  className="w-16 h-16 mx-auto md:mx-0 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold font-heading text-ink-primary mb-3">
                  Anschrift
                </h3>
              </div>
              <address className="not-italic text-ink-secondary leading-relaxed">
                <div className="font-semibold text-ink-primary mb-2">Mulsower SV 61 e.V.</div>
                <div>Garvensdorfer Weg 10</div>
                <div>18233 Carinerland</div>
                <div className="mt-2">Deutschland</div>
              </address>
            </div>

            {/* Email Card */}
            <div className="card card-hover text-center md:text-left">
              <div className="mb-6">
                <div
                  className="w-16 h-16 mx-auto md:mx-0 mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold font-heading text-ink-primary mb-3">
                  E-Mail
                </h3>
              </div>
              <div className="text-ink-secondary leading-relaxed">
                <div className="mb-3">
                  Für allgemeine Anfragen:
                </div>
                <a
                  href="mailto:info@mulsower-sv.de"
                  className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded"
                  aria-label="E-Mail senden an info@mulsower-sv.de"
                >
                  info@mulsower-sv.de
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="img"
                    aria-label="Externer Link"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Contact Information removed per request */}
        </div>
      </div>
    </section>
  );
}