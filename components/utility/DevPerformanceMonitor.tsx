"use client";

import { useEffect } from 'react';

/**
 * Dev-only performance monitor
 * - Uses PerformanceObserver to detect long tasks (>50ms)
 * - Logs counts and warns in console when long tasks exceed thresholds
 * - Optionally sets html[data-motion="reduced"] when persistent jank detected
 * This file is small and only runs in development; it is tree-shaken in production.
 */
export default function DevPerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    if (typeof PerformanceObserver === 'undefined') {
      console.warn('DevPerformanceMonitor: PerformanceObserver not available in this environment');
      return;
    }

    let longTaskCount = 0;
    const LONG_TASK_THRESHOLD = 3; // arbitrary; if exceeded, warn developer
    const observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
      for (const entry of list.getEntries()) {
        // longtask entries have duration property; guard with type narrowing
        const maybeAny = entry as unknown as { duration?: number };
        const dur = maybeAny.duration ?? 0;
        if (dur > 50) {
          longTaskCount += 1;
          console.warn(`DevPerformanceMonitor: Long task detected (${Math.round(dur)}ms)`);
        }
      }

      if (longTaskCount >= LONG_TASK_THRESHOLD) {
        console.error('DevPerformanceMonitor: Multiple long tasks detected. Consider reducing animation complexity or disabling non-essential animations for low-end devices.');
        // Recommend reduced motion by setting data attribute for local testing
        try {
          document.documentElement.setAttribute('data-motion', 'reduced');
        } catch {
          // ignore
        }
      }
    });

    try {
      observer.observe({ type: 'longtask', buffered: true } as PerformanceObserverInit);
    } catch {
      // Some browsers require permission or do not support longtask entry types
      console.warn('DevPerformanceMonitor: unable to observe longtask entries');
    }

    // Also listen for unhandled rejection or runtime errors that could cause jank
    const onError = (ev: ErrorEvent) => {
      console.warn('DevPerformanceMonitor: runtime error captured', ev.error);
    };

    window.addEventListener('error', onError);

    return () => {
      observer.disconnect();
      window.removeEventListener('error', onError);
    };
  }, []);

  return null;
}
