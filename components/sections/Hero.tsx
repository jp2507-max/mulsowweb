import React from 'react';
import { Button } from '../ui/Button';
import { siteConfig } from '@/app/config/site';

export function Hero() {
  return (
    <section className="hero-section" aria-label="Willkommen beim Mulsower SV 61">
      {/* Background with subtle gradients and organic shapes - CSS-only for performance */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-shape-1"></div>
        <div className="hero-shape-2"></div>
      </div>

      {/* Hero content - optimized for LCP, streamlined for 2024 trends */}
      <div className="hero-content" id="main-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-main">Mulsower SV 61</span>
            <span className="hero-title-subtitle">Tradition seit 1961</span>
          </h1>
          <p className="hero-subtitle">
            Leidenschaft für den Fußball, Gemeinschaft im Herzen. 
            Erlebe echten Vereinssport in Mecklenburg-Vorpommern.
          </p>
        </div>
        
        {/* Three CTA grid - modern sports organization pattern */}
        <div className="hero-ctas" role="group" aria-label="Hauptaktionen">
          <Button 
            variant="primary" 
            size="lg"
            href="/spielplan/"
            className="hero-cta hero-cta-primary"
            aria-label="Spielplan ansehen - Aktuelle Termine und Ergebnisse"
          >
            <svg 
              className="hero-cta-icon"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              aria-label="Kalender-Symbol"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Spielplan
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            href="/mitgliedschaft/"
            className="hero-cta hero-cta-secondary"
            aria-label="Mitglied werden - Informationen zur Vereinsmitgliedschaft"
          >
            <svg 
              className="hero-cta-icon"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              aria-label="Personen-Symbol"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Mitglied werden
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            href={siteConfig.externalLinks.fanshop}
            target="_blank"
            className="hero-cta hero-cta-tertiary"
            aria-label="Fanshop besuchen - Vereinsartikel und Merchandise"
          >
            <svg 
              className="hero-cta-icon"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
              aria-label="Einkaufstasche-Symbol"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Fanshop
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
