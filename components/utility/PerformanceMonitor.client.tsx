"use client";

import { useEffect } from 'react';

/**
 * Client-only performance monitor (development only)
 * Observes LCP, CLS and long tasks and logs to console for debugging.
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV === 'production') return; // only run in dev
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
          if (!cls.hadRecentInput) clsValue += (cls.value || 0);
        }
        if (clsValue > 0) console.log('CLS:', clsValue.toFixed(4), clsValue < 0.1 ? '✅ Good' : '❌ Needs improvement');
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      type LongTaskEntry = PerformanceEntry & { duration: number };
      longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const dur = (entry as LongTaskEntry).duration;
          if (dur > 50) console.warn('Dev Performance: long task', Math.round(dur));
        }
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {
      // Best-effort: silently ignore failures
    }

    return () => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      longTaskObserver?.disconnect();
    };
  }, []);

  return null;
}
