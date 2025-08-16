'use client';

import { getHomepageSponsors } from '../../app/data/sponsors';
import { Card } from '../ui/Card';
import { ExternalLink } from '../ui/ExternalLink';

interface SponsorTeaserProps {
  maxItems?: number;
  className?: string;
}

export default function SponsorTeaser({ maxItems = 6, className = '' }: SponsorTeaserProps) {
  const displaySponsors = getHomepageSponsors().slice(0, maxItems);

  return (
    <section className={`py-16 md:py-20 bg-neutral-50 ${className}`} aria-labelledby="sponsors-heading">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="sponsors-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4">
            Unsere Partner
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
            Wir danken unseren Sponsoren für die Unterstützung des Mulsower SV 61
          </p>
        </div>

        {/* Sponsor Grid - Responsive 2-3-6 columns */}
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12"
          role="list"
          aria-label="Sponsoren des Mulsower SV 61"
        >
          {displaySponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
              className="animate-fadeInUp"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
              role="listitem"
            >
              <ExternalLink 
                href={sponsor.url} 
                className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl"
                aria-label={`${sponsor.name} - Sponsor-Website besuchen`}
              >
                <Card className="h-full bg-white border border-neutral-200 hover:border-brand-light hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 md:p-8 text-center">
                  {/* Placeholder for logo - will be replaced with actual logos later */}
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-lg md:text-xl">
                      {sponsor.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-ink-primary text-sm md:text-base mb-2 group-hover:text-brand-primary transition-colors duration-200">
                    {sponsor.name}
                  </h3>
                  
                  {sponsor.description && (
                    <p className="text-xs md:text-sm text-ink-tertiary line-clamp-2">
                      {sponsor.description}
                    </p>
                  )}
                </Card>
              </ExternalLink>
            </div>
          ))}
        </div>

        {/* CTA to full sponsors page */}
        <div className="text-center">
          <a
            href="/sponsoren"
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            aria-label="Alle Sponsoren ansehen - Zur vollständigen Sponsoren-Übersicht"
          >
            Alle Sponsoren ansehen
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              aria-label="Pfeil nach rechts"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}