// Minimal, resilient Scroll Reveal utility
// Exports: initScrollReveal(options) -> cleanup function

import { handleIntersectionObserverError, makeAllRevealsVisible } from './animationErrorHandler.mjs';
import { hasIntersectionObserver } from './featureDetection.mjs';

export function initScrollReveal(opts = {}) {
  const threshold = opts.threshold ?? 0.15;
  const rootMargin = opts.rootMargin ?? '0px 0px -15% 0px';

  // Ensure reveal markers are added safely after DOM ready (prevents blank content)
  try { import('./animationErrorHandler.mjs').then(m => m.initializeSafeReveal()).catch(() => {}); } catch { }

  // Collect candidates early
  const candidates = Array.from((typeof document !== 'undefined' && document.querySelectorAll)
    ? document.querySelectorAll('.reveal-candidate')
    : []);

  if (candidates.length === 0) return () => {};

  // Reduced motion and runtime capability support
  try {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq && mq.matches) {
        for (const el of candidates) el.classList.add('reveal', 'in');
        return () => {};
      }
    }

    // Respect save-data and low-memory heuristics
    const saveData = typeof navigator !== 'undefined' && (navigator.connection && (navigator.connection.saveData === true));
    const lowMem = typeof navigator !== 'undefined' && 'deviceMemory' in navigator && navigator.deviceMemory <= 4;
    if (saveData || lowMem) {
      for (const el of candidates) el.classList.add('reveal', 'in');
      return () => {};
    }
  } catch {
    // ignore - fall through to safe defaults
  }

  let observer = null;

  try {
    if (hasIntersectionObserver()) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (el.classList && el.classList.contains && el.classList.contains('in')) continue;
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            el.classList.add('in');
            observer.unobserve(el);
          }
        }
      }, { threshold, rootMargin });

      // Add .reveal marker only after observer is available to avoid hiding content until JS runs
      for (const el of candidates) {
        el.classList.add('reveal');
        observer.observe(el);
      }

      return () => {
        try { observer.disconnect(); } catch { /* ignore */ }
        observer = null;
      };
    }
  } catch {
    // Report and fallback via shared handler
    try { handleIntersectionObserverError(); } catch { /* ignore */ }
  }

  // Fallback: make visible immediately using helper (also adds .reveal)
  try {
    makeAllRevealsVisible();
  } catch { /* ignore */ }

  return () => {};
}
