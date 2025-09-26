
'use client';

import React from 'react';
import { cx } from '@/lib/utils/cx';
import { getHomepageSponsors } from '../../app/data/sponsors';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
// LazyOnScroll not needed here; render immediately to ensure visibility
import { useEffect, useState } from 'react';
import { prefersReducedMotion as prefersReducedMotionUtil } from '@/lib/utils/deviceCapabilities';
interface SponsorTeaserProps {
  maxItems?: number;
  className?: string;
}

export default function SponsorTeaser({ maxItems = 6, className = '' }: SponsorTeaserProps) {
  const displaySponsors = React.useMemo(
    () => getHomepageSponsors().slice(0, maxItems),
    [maxItems]
  );

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
    <section
      data-heavy
      className={cx('relative section-spacing', className)}
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

      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 id="sponsors-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4">
            Unsere Partner
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
            Wir danken unseren Sponsoren für die Unterstützung des Mulsower SV 61
            <svg
              aria-hidden="true"
              className="inline-block ml-2 h-6 w-6 text-white/90"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            />
          </p>
        </div>

  <div className="mb-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur-[1px] group"
          onMouseEnter={(e) => {
            const marquee = e.currentTarget.querySelector('.marquee') as HTMLElement;
            if (marquee) marquee.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            const marquee = e.currentTarget.querySelector('.marquee') as HTMLElement;
            if (marquee) marquee.style.animationPlayState = 'running';
          }}
        >
          <div
            className="marquee whitespace-nowrap"
            style={reduced ? { animation: 'none' } : undefined}
          >
            {displaySponsors.concat(displaySponsors).map((s, i) => (
              <span key={`mq-${s.id}-${i}`} className="inline-flex items-center px-6 py-3 text-ink-secondary text-sm">
                {s.name}
                <span className="mx-4 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>

        
        {displaySponsors.length > 0 && (
          <div
            className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8"
            role="list"
            aria-label="Unterstützende Sponsoren"
          >
            {displaySponsors.map((sponsor) => {
              const hasWebsite = Boolean(sponsor.url);

              const content = (
                <>
                  <div
                    className={cx(
                      'mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl shadow-md',
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
                      <span className="text-2xl font-bold text-white" aria-hidden="true">
                        {sponsor.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  

                  {hasWebsite ? (
                    <div className="mt-4 inline-flex items-center justify-center text-sm font-medium text-brand-primary">
                      Website besuchen
                      <svg
                        className={cx(
                          'ml-2 h-4 w-4',
                          !reduced && 'transition-transform duration-300 group-hover:translate-x-1'
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-ink-tertiary">
                      Kein Webauftritt verfügbar
                    </p>
                  )}
                </>
              );

              if (hasWebsite) {
                return (
                  <div key={sponsor.id} role="listitem" className="h-full">
                    <Card
                      href={sponsor.url}
                      title={sponsor.name}
                      className={cx(
                        'group h-full text-center shadow-sm border border-neutral-200 hover:border-brand-light',
                        !reduced && 'transition-motion'
                      )}
                    >
                      {content}
                    </Card>
                  </div>
                );
              }

              return (
                <div key={sponsor.id} role="listitem" className="h-full">
                  <Card
                    title={sponsor.name}
                    hover={false}
                    className="h-full text-center shadow-sm border border-neutral-200 bg-white"
                  >
                    {content}
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA to full sponsors page */}
        <div className="text-center">
          <Button
            href="/sponsoren/"
            variant="primary"
            size="md"
            className={cx(
              'inline-flex items-center px-8 py-4 rounded-xl hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 touch-feedback',
              !reduced && 'transition-motion'
            )}
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