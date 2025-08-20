"use client";
import { useEffect } from "react";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

interface Options {
  selector?: string;
  offset?: number; // pixels to offset for sticky headers
}

// Very small, dependency-free smooth scroll helper. Tree-shakable: only
// included in the client bundle if imported.
export function SmoothScrollInit({ selector = 'a[href^="#"]', offset = 0 }: Options) {
  useEffect(() => {
  // Respect reduced motion via media query, explicit HTML override, or device capability hints
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.getAttribute('data-motion') === 'reduced' || shouldReduceAnimations();
  if (reduced) return;

    function isSamePageLink(a: HTMLAnchorElement) {
      try {
        const url = new URL(a.href, window.location.href);
        return url.pathname === window.location.pathname && url.search === window.location.search && url.hash && url.hash !== '#';
      } catch {
        return false;
      }
    }

    function clickHandler(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest ? (target.closest(selector) as HTMLAnchorElement | null) : null;
      if (!anchor) return;
      if (!isSamePageLink(anchor)) return;

      const hash = anchor.hash;
      if (!hash) return;

      const el = document.getElementById(hash.slice(1)) || document.querySelector(hash);
      if (!el) return;

      // Prevent default navigation and perform smooth scroll
      e.preventDefault();

      // If Lenis is available, delegate to it for smooth scroll with header offset.
      // Otherwise, fall back to native scrollIntoView (offset handled via CSS scroll-margin-top).
      const root = document.documentElement;
      const cssOffset = parseInt(getComputedStyle(root).getPropertyValue('--scroll-offset')) || 0;
      const headerOffset = Number.isFinite(offset) && offset !== 0 ? offset : cssOffset;

  const maybeLenis: unknown = (window as unknown as { __lenis?: unknown }).__lenis;
  const lenis = maybeLenis as { scrollTo?: (target: Element | string | number, options?: Record<string, unknown>) => void } | undefined;
      if (lenis && typeof lenis.scrollTo === 'function') {
        const targetEl = el as HTMLElement;
        const y = Math.round(targetEl.getBoundingClientRect().top + window.scrollY - headerOffset);
        try {
          lenis.scrollTo(y);
        } catch {
          // Fallback to native on failure
          (el as Element).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        (el as Element).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Update the URL hash without jumping; we rely on CSS `scroll-margin-top`
      // to offset the target for sticky headers. history.pushState keeps the
      // back/forward behavior intact.
      try {
        history.pushState(null, '', hash);
      } catch {
        // ignore pushState errors on older browsers
      }
    }

    document.addEventListener('click', clickHandler, { passive: false });

    return () => document.removeEventListener('click', clickHandler);
  }, [selector, offset]);

  return null;
}

export default SmoothScrollInit;
