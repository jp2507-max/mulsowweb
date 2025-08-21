'use client';

import { getHomepageSponsors } from '../../app/data/sponsors';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ExternalLink } from '../ui/ExternalLink';
import { LazyOnScroll } from '../utility/BundleOptimizer';
import { useEffect, useState } from 'react';
// NOTE: this project uses Motion One (import from 'motion/react') for small,
// performant animation primitives. A previous PR referenced "Framer Motion"
// in the summary — keep PR summaries in sync with this choice. If you intend
// to switch to Framer Motion, update package.json and all imports accordingly.
import { motion } from 'motion/react';
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
  <div className="text-center mb-12 md:mb-16 reveal-candidate reveal--fade">
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

        {/* Sponsor Grid - Responsive 2-3-6 columns with lazy loading and Motion reveal */}
        <LazyOnScroll
          className="mb-12"
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-neutral-100 rounded-2xl h-32 md:h-40 border border-neutral-200">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 rounded-2xl"></div>
                </div>
              ))}
            </div>
          }
        >
          <motion.ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8" role="list" aria-label="Sponsoren des Mulsower SV 61">
            {displaySponsors.map((sponsor, i) => (
              <motion.li
                key={sponsor.id}
                role="listitem"
                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={reduced ? undefined : { delay: i * 0.06, duration: 0.24 }}
              >
                <div>
                  <ExternalLink
                    href={sponsor.url}
                    className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl touch-feedback"
                    aria-label={`${sponsor.name} - Sponsor-Website besuchen`}
                  >
                    <Card className="sponsor-card h-full bg-white border border-neutral-200 hover:border-brand-light transition-motion p-6 md:p-8 text-center transform-gpu will-change-transform hover:scale-[1.02] focus-visible:scale-[1.01]">
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
              </motion.li>
            ))}
          </motion.ul>
        </LazyOnScroll>

        {/* CTA to full sponsors page */}
  <div className="text-center reveal-candidate reveal--slide-up">
          <Button
            href="/sponsoren/"
            variant="primary"
            size="md"
            className="inline-flex items-center px-8 py-4 rounded-xl hover:scale-105 active:scale-95 transition-motion shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 touch-feedback"
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