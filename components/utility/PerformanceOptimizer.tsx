// Server component: emits resource hints and critical CSS without shipping client JS
import React from 'react';

/**
 * Performance optimization component for Core Web Vitals
 * Handles critical resource hints and performance optimizations
 * Task 9.2: Enhanced CLS prevention and performance monitoring
 */
const CRITICAL_CSS = `
          /* Critical inline CSS for LCP optimization */
          .hero-section { 
            display: block; 
            position: relative; 
            overflow: hidden;
          }
          .hero-content { 
            display: flex; 
            flex-direction: column; 
            justify-content: center;
            text-align: center;
          }
          .hero-title { 
            font-family: var(--font-heading, system-ui); 
            font-weight: 900;
            line-height: 1;
          }
          /* Prevent FOUC and CLS */
          body { 
            font-family: var(--font-body, system-ui);
            background-color: #F8FAFC;
            color: #0F172A;
          }
          /* CLS prevention for images */
          img {
            height: auto;
            max-width: 100%;
          }
          /* Ensure logo has reserved space */
          .hero-badge {
            width: 80px;
            height: 80px;
            aspect-ratio: 1;
          }
          /* Font loading optimization */
          .font-loading {
            font-synthesis: none;
          }
        `;

export function PerformanceOptimizer({ nonce }: { nonce?: string } = {}) {
  return (
    <>
      {/* DNS prefetch for external domains */}
  <link rel="dns-prefetch" href="//www.fussball.de" />
  <link rel="dns-prefetch" href="//next.fussball.de" />
      <link rel="dns-prefetch" href="//msv61.fan12.de" />
      
      {/* Preconnect to critical external resources */}
  <link rel="preconnect" href="https://www.fussball.de" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://next.fussball.de" crossOrigin="anonymous" />
      
  {/* Resource hint for the crest (shared by header + hero) */}
  <link rel="preload" as="image" href="/logo.svg" fetchPriority="high" />
      
      {/* Font preloading for better CLS - Task 9.2: Enhanced font loading */}
    {/* Rely on next/font self-hosted fonts from app/layout.tsx.
      Manual font preloads removed to avoid 404s on /fonts/* when not present. */}
      
      {/* Task 9.2: Performance budget monitoring meta tag */}
      <meta name="performance-budget" content="js:200kb,css:50kb,animation-js:5kb" />
      
      {/* Task 9.2: Core Web Vitals targets */}
      <meta name="performance-targets" content="lcp:2500,cls:0.1,inp:200" />
      
      {/* Critical CSS for above-the-fold content */}
      <style nonce={nonce}>{CRITICAL_CSS}</style>
    </>
  );
}