'use client';

import { getHomepageSponsors } from '../../app/data/sponsors';
// Card component intentionally omitted here — teaser uses the sponsors page card layout inline
import { Button } from '../ui/Button';
import { ExternalLink } from '../ui/ExternalLink';
// LazyOnScroll not needed here; render immediately to ensure visibility
import { useEffect, useState } from 'react';
import { prefersReducedMotion as prefersReducedMotionUtil } from '@/lib/utils/deviceCapabilities';

interface SponsorTeaserProps {
  maxItems?: number;
  className?: string;
}

export default function SponsorTeaser({ maxItems = 6, className = '' }: SponsorTeaserProps) {
  const displaySponsors = getHomepageSponsors().slice(0, maxItems);

  // Respect reduced motion at runtime
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotionUtil());
  }, []);

  // We use Motion One (motion/react). Rather than Framer-style variants and
  // viewport-based whileInView, we gate mount with LazyOnScroll and animate
  // items on mount using initial/animate + per-item delays. Reduced motion is
  // respected by disabling animations at runtime.

  return (
    <section data-heavy className={`relative py-16 md:py-20 ${className}`} aria-labelledby="sponsors-heading">
      {/* Soft curved top divider using a radial gradient (no images) */}
      <div aria-hidden="true" className="absolute -top-10 left-0 right-0 h-10 pointer-events-none" style={{
        background: 'radial-gradient(80% 20px at 50% 100%, rgba(0,0,0,0.12), transparent 70%)',
        opacity: 0.06
      }} />
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

        {/* Optional Sponsor marquee — shown above grid, pauses on hover/reduced motion */}
        <div 
          className="mb-10 overflow-hidden rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-[1px] group" 
          aria-hidden="true"
          onMouseEnter={(e) => {
            const marquee = e.currentTarget.querySelector('.marquee') as HTMLElement;
            if (marquee) marquee.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            const marquee = e.currentTarget.querySelector('.marquee') as HTMLElement;
            if (marquee) marquee.style.animationPlayState = 'running';
          }}
        >
          <div className="marquee whitespace-nowrap">
            {displaySponsors.concat(displaySponsors).map((s, i) => (
              <span key={`mq-${s.id}-${i}`} className="inline-flex items-center px-6 py-3 text-ink-secondary text-sm">
                {s.name}
                <span className="mx-4 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Sponsor Grid - render detailed sponsor cards (preview of sponsors page). Render immediately to avoid IO visibility issues. */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8" role="list" aria-label="Sponsoren Vorschau">
            {displaySponsors.map((sponsor, i) => (
              <div
                key={sponsor.id}
                role="listitem"
                className=""
                style={reduced ? {} : { animationDelay: `${i * 80}ms`, transitionDelay: `${i * 80}ms` }}
              >
                <ExternalLink
                  href={sponsor.url}
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl"
                  aria-label={`${sponsor.name} - Sponsor-Website besuchen`}
                >
                  <div className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200 h-full flex flex-col transition-motion ${reduced ? '' : 'hover:scale-105 hover:border-brand-light'}`}>
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg"
                      aria-hidden="true"
                    >
                      <span className="text-white font-bold text-2xl md:text-3xl" aria-hidden="true">
                        {sponsor.name.charAt(0)}
                      </span>
                    </div>

                    <h3 className="font-bold text-ink-primary text-lg md:text-xl mb-3 text-center group-hover:text-brand-primary transition-colors duration-300 font-heading">
                      {sponsor.name}
                    </h3>

                    {sponsor.description && (
                      <p className="text-sm md:text-base text-ink-secondary text-center leading-relaxed flex-grow">
                        {sponsor.description}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-center text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                      <span className="text-sm font-medium mr-2">Website besuchen</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Externer Link">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </ExternalLink>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to full sponsors page */}
  <div className="text-center">
          <Button
            href="/sponsoren/"
            variant="primary"
            size="md"
            className={
              `inline-flex items-center px-8 py-4 rounded-xl hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 touch-feedback ` +
              (reduced ? '' : 'transition-motion')
            }
            aria-label="Alle Sponsoren ansehen - Zur vollständigen Sponsoren-Übersicht"
          >
            Alle Sponsoren ansehen
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}