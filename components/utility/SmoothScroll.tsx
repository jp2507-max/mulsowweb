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
      if (e.defaultPrevented) return;
  // Only left-click
  if (typeof e.button === 'number' && e.button !== 0) return;
      // Respect modifier keys and explicit targets/downloads
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const hash = anchor.hash;
      if (!hash) return;

      const el = document.getElementById(hash.slice(1)) || document.querySelector(hash);
      if (!el) return;

      // Prevent default navigation and perform smooth scroll
      e.preventDefault();

      // Helper: focus element without causing the browser to scroll.
      // If the element isn't focusable, add a temporary tabindex="-1",
      // call focus({ preventScroll: true }), then remove/restore the tabindex.
      function focusWithoutScroll(targetEl: Element | null) {
        if (!targetEl) return;
        const element = targetEl as HTMLElement;
        if (!element || typeof element.focus !== 'function') return;

        const hadTabIndex = element.hasAttribute('tabindex');
        const prevTabIndex = hadTabIndex ? element.getAttribute('tabindex') : null;
        let addedTabIndex = false;

        try {
          if (element.tabIndex < 0) {
            // make focusable
            element.setAttribute('tabindex', '-1');
            addedTabIndex = true;
          }

          // focus without scrolling
          // Some older browsers may not support preventScroll option, so guard it
          try {
            (element as HTMLElement).focus({ preventScroll: true } as FocusOptions);
          } catch {
            // Fallback: call focus() — this may scroll, but it's a last resort
            (element as HTMLElement).focus();
          }
        } finally {
          // restore previous tabindex state
          if (addedTabIndex) {
            if (prevTabIndex === null) {
              element.removeAttribute('tabindex');
            } else {
              element.setAttribute('tabindex', prevTabIndex);
            }
          }
        }
      }

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
          // Move keyboard/screenreader focus to the target element without changing
          // the user's scroll position. This ensures hash navigation works for
          // assistive tech even though we prevented the default navigation.
          focusWithoutScroll(targetEl);
        } catch {
          // Fallback to native on failure
          (el as Element).scrollIntoView({ behavior: 'smooth', block: 'start' });
          focusWithoutScroll(el as Element);
        }
      } else {
        (el as Element).scrollIntoView({ behavior: 'smooth', block: 'start' });
        focusWithoutScroll(el as Element);
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
