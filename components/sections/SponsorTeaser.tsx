'use client';

import React from 'react';
import { cx } from '@/lib/utils/cx';
import { shouldReduceAnimations } from '@/lib/utils/deviceCapabilities';
import { getHomepageSponsors } from '../../app/data/sponsors';
<<<<<<< HEAD
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
=======
// Card component intentionally omitted here — teaser uses the sponsors page card layout inline
import { Button } from '../ui/Button';
>>>>>>> 2b6bb085d97827ae2d3e6998bd40eb2c48fc1b20
import { ExternalLink } from '../ui/ExternalLink';
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
<<<<<<< HEAD
        <div className="text-center mb-12 md:mb-16 reveal-candidate reveal--fade">
          <h2
            id="sponsors-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4"
          >
=======
  <div className="text-center mb-12 md:mb-16">
          <h2 id="sponsors-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-ink-primary mb-4">
>>>>>>> 2b6bb085d97827ae2d3e6998bd40eb2c48fc1b20
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

<<<<<<< HEAD
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
=======
        <div aria-hidden="true" className="mb-10 overflow-hidden rounded-xl border border-neutral-200 bg-white/60 backdrop-blur-[1px] group"
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
>>>>>>> 2b6bb085d97827ae2d3e6998bd40eb2c48fc1b20
                <span className="mx-4 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>

<<<<<<< HEAD
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
=======
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
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 motion-reduce:transform-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </ExternalLink>
              </div>
            ))}
>>>>>>> 2b6bb085d97827ae2d3e6998bd40eb2c48fc1b20
          </div>
        </div>

        {/* CTA to full sponsors page */}
<<<<<<< HEAD
        <div className="text-center">
          <Button
            size="lg"
            href="/sponsoren/"
            className="hover:scale-105 active:scale-95 transition-motion shadow-lg"
=======
  <div className="text-center">
          <Button
            href="/sponsoren/"
            variant="primary"
            size="md"
            className={
              `inline-flex items-center px-8 py-4 rounded-xl hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 touch-feedback ` +
              (reduced ? '' : 'transition-motion')
            }
>>>>>>> 2b6bb085d97827ae2d3e6998bd40eb2c48fc1b20
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