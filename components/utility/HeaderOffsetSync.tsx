"use client";
import { useEffect } from "react";

// Small helper: measure header height and set CSS variable --scroll-offset
// Uses ResizeObserver where available; falls back to window resize
export default function HeaderOffsetSync({ headerSelector = '.header' }: { headerSelector?: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion override
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.getAttribute('data-motion') === 'reduced';
    if (reduced) return;

    const header = document.querySelector(headerSelector) as HTMLElement | null;
    const root = document.documentElement;
    if (!header) return;

    let rafId = 0;

    const update = () => {
      const h = Math.ceil(header.getBoundingClientRect().height || 0);
      root.style.setProperty('--scroll-offset', `${h}px`);
    };

    // Debounced via rAF to avoid layout thrash on rapid changes
    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Initial measurement after a brief idle to allow layout to stabilise
    setTimeout(scheduleUpdate, 0);

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => scheduleUpdate());
      try {
        ro.observe(header);
      } catch {
        // observe can fail on SVG or other elements; fall back
      }
    }

    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (ro && header) ro.unobserve(header);
      window.removeEventListener('resize', scheduleUpdate as EventListener);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [headerSelector]);

  return null;
}
