"use client";

import React, { useEffect } from 'react';

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
      <link rel="dns-prefetch" href="//msv61.fan12.de" />
      
      {/* Preconnect to critical external resources */}
      <link rel="preconnect" href="https://www.fussball.de" crossOrigin="anonymous" />
      
      {/* Resource hints for better LCP - Task 9.2: Ensure LCP image is preloaded */}
      <link rel="preload" as="image" href="/logo.svg" />
      <link rel="preload" as="image" href="/logo-128.png" />
      <link rel="preload" as="image" href="/logo-256.png" />
      
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

/**
 * Lightweight performance monitoring component (no external dependencies)
 */
function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof PerformanceObserver === 'undefined') return;

    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let longTaskObserver: PerformanceObserver | null = null;

    try {
      lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcp = entry as PerformanceEntry & { startTime: number };
          console.log('LCP:', Math.round(lcp.startTime), lcp.startTime < 2500 ? '✅ Good' : '❌ Needs improvement');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const cls = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!cls.hadRecentInput) clsValue += cls.value;
        }
        if (clsValue > 0) console.log('CLS:', clsValue.toFixed(4), clsValue < 0.1 ? '✅ Good' : '❌ Needs improvement');
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const dur = entry.duration;
          if (dur > 50) console.warn('Dev Performance: long task', Math.round(dur));
        }
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {
      // ignore - best-effort dev monitoring
    }

    return () => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      longTaskObserver?.disconnect();
    };
  }, []);
  
  return null;
}

export function PerformanceMonitorWrapper() {
  return <PerformanceMonitor />;
}