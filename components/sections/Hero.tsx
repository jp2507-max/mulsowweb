import React from 'react';
import { Button } from '../ui/Button';
import { siteConfig } from '@/app/config/site';
import HeroReadyClient from '@/components/utility/HeroReadyClient';
import { Image } from '@/components/ui/Image';
import { ExternalLink } from '@/components/ui/ExternalLink';

export default function Hero() {
  return (
  <section className="hero-section" aria-label="Willkommen beim Mulsower SV 61">
  {/* Ensure hero animations unlock and content becomes visible once ready */}
  <HeroReadyClient />
      {/* noscript fallback: ensures the hero content is visible when JS is disabled */}
      <noscript>
        <style>{`.hero-title, .hero-subtitle, .hero-ctas { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
  <div className="hero-bg" aria-hidden="true">
  {/* Decorative hero layers: gradients and shapes. Photo removed for experimentation. */}
    <div className="hero-gradient-1" />
    <div className="hero-gradient-2" />
    <div className="hero-shape-1" />
    <div className="hero-shape-2" />
  </div>

      <div className="hero-overlay" aria-hidden="true" />

  {/* Decorative background handled via CSS (.hero-photo-bg). Keeping no inline <img> avoids LCP impact. */}

      <div className="hero-content" id="main-content">
        <div className="hero-text">
          <p className="eyebrow mb-3">Der Fußballverein aus Mulsow</p>
          <h1 className="hero-title vt-hero-title">
            <span className="hero-title-row">
              {/* Crest next to headline for instant brand recognition */}
              <Image
                src="/logo.svg"
                alt=""
                decorative
                width={80}
                height={80}
                className="hero-badge vt-logo"
                priority
                id="hero-img"
              />
              <span className="hero-title-main">Mulsower SV 61</span>
            </span>
            <span className="hero-title-subtitle">Tradition seit 1961</span>
          </h1>

          {/* Subtle decorative SVGs — keep aria-hidden, remove role and aria-label */}
          <div className="hero-decorative" aria-hidden="true">
            <svg
              className="h-6 w-6 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>

            <svg
              className="h-8 w-8 text-current"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="24" height="24" rx="4" />
            </svg>

            <svg
              className="h-10 w-10 text-current"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 20h32" />
            </svg>
          </div>

          <p className="hero-subtitle">
            Leidenschaft für den Fußball, Gemeinschaft im Herzen. Erlebe echten Vereinssport in
            Mecklenburg-Vorpommern.
          </p>
        </div>

        {/* Three CTA grid */}
        <div className="hero-ctas" role="group" aria-label="Hauptaktionen">
          <Button
            variant="primary"
            size="lg"
            href="/spielplan/"
            className="hero-cta hero-cta-primary btn-pill"
            aria-label="Spielplan ansehen - Aktuelle Termine und Ergebnisse"
          >
            <svg
              className="hero-cta-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Spielplan
          </Button>

          <Button
            variant="outline"
            size="lg"
            href="/mitgliedschaft/"
            className="hero-cta hero-cta-secondary btn-pill"
            aria-label="Mitglied werden - Informationen zur Vereinsmitgliedschaft"
          >
            <svg
              className="hero-cta-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mitglied werden
          </Button>

          <Button
            variant="ghost"
            size="lg"
            href={siteConfig.externalLinks.fanshop}
            target="_blank"
            className="hero-cta hero-cta-tertiary btn-pill"
            aria-label="Fanshop besuchen - Vereinsartikel und Merchandise"
          >
            <svg
              className="hero-cta-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Fanshop
          </Button>
        </div>

        {/* Instagram CTA under hero buttons */}
        <div className="mt-4 md:mt-6 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-ink-primary/5 border border-ink-primary/10 rounded-full px-4 py-2">
            <span className="text-sm md:text-base font-medium text-ink-primary">Folge uns auf Instagram:</span>
            <ExternalLink
              href={siteConfig.social.instagramMain.href}
              aria-label={siteConfig.social.instagramMain.label}
              className="inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-secondary font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
                className="opacity-90"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span>@mulsower_sv</span>
            </ExternalLink>
            <span aria-hidden="true" className="text-ink-secondary">•</span>
            <ExternalLink
              href={siteConfig.social.instagramYouth.href}
              aria-label={siteConfig.social.instagramYouth.label}
              className="inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-secondary font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
                className="opacity-90"
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span>@mulsower_sv.nachwuchs</span>
            </ExternalLink>
          </div>
        </div>

        <p className="hero-rotator" aria-hidden="true">
          <span className="hero-rotator-inner">
            <span>Tradition</span>
            <span>Gemeinschaft</span>
            <span>Leidenschaft</span>
            <span>Heimat</span>
          </span>
        </p>

        <span className="sr-only">Tradition, Gemeinschaft, Leidenschaft und Heimat</span>
      </div>
    </section>
  );
}

