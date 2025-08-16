import { Suspense } from 'react';

/**
 * Performance optimization component for Core Web Vitals
 * Handles critical resource hints and performance optimizations
 */
export function PerformanceOptimizer() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//www.fussball.de" />
      <link rel="dns-prefetch" href="//msv61.fan12.de" />
      
      {/* Preconnect to critical external resources */}
      <link rel="preconnect" href="https://www.fussball.de" crossOrigin="anonymous" />
      
      {/* Resource hints for better LCP */}
      <link rel="preload" as="image" href="/logo.svg" />
      
      {/* Critical CSS for above-the-fold content */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
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
      onCLS(console.log);
      onFCP(console.log);
      onLCP(console.log);
      onTTFB(console.log);
      onINP(console.log);
    });
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