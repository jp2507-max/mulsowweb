import { Suspense } from 'react';

/**
 * Performance optimization component for Core Web Vitals
 * Handles critical resource hints and performance optimizations
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
          /* Prevent FOUC */
          body { 
            font-family: var(--font-body, system-ui);
            background-color: #F8FAFC;
            color: #0F172A;
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
      
      {/* Resource hints for better LCP */}
      <link rel="preload" as="image" href="/logo.svg" />
      
      {/* Font preloading for better CLS - next/font handles this automatically but we can add hints */}
      <link rel="preload" href="/_next/static/media/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/_next/static/media/oswald-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
  {/* Critical CSS for above-the-fold content */}
  <style nonce={nonce}>{CRITICAL_CSS}</style>
    </>
  );
}

/**
 * Lazy-loaded performance monitoring component
 */
function PerformanceMonitor() {
  if (typeof window === 'undefined') return null;
  
  // Monitor Core Web Vitals in development
  if (process.env.NODE_ENV === 'development') {
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      // Enhanced logging with performance targets
      onCLS((metric) => {
        console.log('CLS:', metric.value, metric.value < 0.1 ? '✅ Good' : '❌ Needs improvement');
      });
      onFCP((metric) => {
        console.log('FCP:', metric.value, metric.value < 1800 ? '✅ Good' : '❌ Needs improvement');
      });
      onLCP((metric) => {
        console.log('LCP:', metric.value, metric.value < 2500 ? '✅ Good' : '❌ Needs improvement');
      });
      onTTFB((metric) => {
        console.log('TTFB:', metric.value, metric.value < 800 ? '✅ Good' : '❌ Needs improvement');
      });
      onINP((metric) => {
        console.log('INP:', metric.value, metric.value < 200 ? '✅ Good' : '❌ Needs improvement');
      });
    });
    // Also monitor long tasks (development only)
    try {
      if (typeof PerformanceObserver !== 'undefined') {
        const obs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // entry may be a LongTaskTiming; use a permissive cast for dev-only logging
            const dur = ((entry as unknown) as { duration?: number }).duration ?? 0;
            if (dur > 50) {
              console.warn('Dev Performance: long task', Math.round(dur));
            }
          }
        });
        obs.observe({ type: 'longtask', buffered: true } as PerformanceObserverInit);
      }
    } catch {
      // ignore - best-effort dev monitoring
    }
  }
  
  return null;
}

export function PerformanceMonitorWrapper() {
  return (
    <Suspense fallback={null}>
      <PerformanceMonitor />
    </Suspense>
  );
}