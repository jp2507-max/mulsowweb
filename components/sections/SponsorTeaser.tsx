'use client';

import React from 'react';
import { cx } from '@/lib/utils/cx';
import { shouldReduceAnimations } from '@/lib/utils/deviceCapabilities';
import { getHomepageSponsors } from '../../app/data/sponsors';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ExternalLink } from '../ui/ExternalLink';
import { LazyOnScroll } from '../utility/BundleOptimizer';

interface SponsorTeaserProps {
  maxItems?: number;
  className?: string;
}

export default function SponsorTeaser({ maxItems = 6, className = '' }: SponsorTeaserProps) {
  const displaySponsors = React.useMemo(
    () => getHomepageSponsors().slice(0, maxItems),
    [maxItems]
  );
  const [reduceMotion, setReduceMotion] = React.useState(() => shouldReduceAnimations());

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(shouldReduceAnimations());

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    if (typeof media.addListener === 'function') {
      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }

    return undefined;
  }, []);

  return (
    <section
      data-heavy
      className={cx('relative py-16 md:py-20', className)}
      aria-labelledby="sponsors-heading"
    >
      {/* Soft curved top divider using a radial gradient (no images) */}
      <div
        aria-hidden="true"
        className="absolute -top-10 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: 'radial-gradient(80% 20px at 50% 100%, rgba(0,0,0,0.12), transparent 70%)',
          opacity: 0.06,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 reveal-candidate reveal--fade">
          <h2
            id="sponsors-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4"
          >
            Unsere Partner
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
            Wir danken unseren Sponsoren für die Unterstützung des Mulsower SV 61
          </p>
        </div>

        {/* Optional Sponsor marquee — shown above grid, pauses on hover/reduced motion */}
        <div
          className="mb-10 overflow-hidden rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-[1px]"
          aria-hidden="true"
        >
          <div className="marquee whitespace-nowrap">
            {displaySponsors.concat(displaySponsors).map((sponsor, index) => (
              <span
                key={`mq-${sponsor.id}-${index}`}
                className="inline-flex items-center px-6 py-3 text-ink-secondary text-sm"
              >
                {sponsor.name}
                <span className="mx-4 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Sponsor Grid - Responsive 2-3-6 columns with lazy loading */}
        <LazyOnScroll
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12"
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`sponsor-skeleton-${index}`} className="animate-pulse">
                  <div className="bg-neutral-200 rounded-2xl h-32 md:h-40" />
                </div>
              ))}
            </div>
          }
        >
          <div role="list" aria-label="Sponsoren des Mulsower SV 61">
            {displaySponsors.map((sponsor, index) => {
              const animationDelay = Math.min(index * 60, 400);
              const animationStyle: React.CSSProperties | undefined = reduceMotion
                ? undefined
                : {
                    animationDelay: `${animationDelay}ms`,
                    animationFillMode: 'both',
                  };

              return (
                <div
                  key={sponsor.id}
                  className={cx(!reduceMotion && 'animate-fadeInUp')}
                  style={animationStyle}
                  role="listitem"
                >
                  <ExternalLink
                    href={sponsor.url}
                    className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl"
                    aria-label={`${sponsor.name} - Sponsor-Website besuchen`}
                  >
                    <Card
                      className={cx(
                        'sponsor-card h-full flex flex-col items-center text-center gap-4 transition-motion',
                        !reduceMotion && 'group-hover:scale-105 group-hover:border-brand-light'
                      )}
                    >
                      <div
                        className={cx(
                          'w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center shadow-lg overflow-hidden',
                          sponsor.logo
                            ? 'bg-white/90'
                            : 'bg-gradient-to-br from-brand-primary to-brand-secondary'
                        )}
                        aria-hidden={sponsor.logo ? undefined : true}
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={`${sponsor.name} Logo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="text-white font-bold text-2xl md:text-3xl" aria-hidden="true">
                            {sponsor.name.charAt(0)}
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-ink-primary text-sm md:text-base group-hover:text-brand-primary transition-colors duration-200">
                        {sponsor.name}
                      </h3>

                      {sponsor.description ? (
                        <p className="text-xs md:text-sm text-ink-tertiary line-clamp-2">
                          {sponsor.description}
                        </p>
                      ) : null}
                    </Card>
                  </ExternalLink>
                </div>
              );
            })}
          </div>
        </LazyOnScroll>

        {/* CTA to full sponsors page */}
        <div className="text-center">
          <Button
            size="lg"
            href="/sponsoren/"
            className="hover:scale-105 active:scale-95 transition-motion shadow-lg"
            aria-label="Alle Sponsoren ansehen - Zur vollständigen Sponsoren-Übersicht"
          >
            Alle Sponsoren ansehen
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}