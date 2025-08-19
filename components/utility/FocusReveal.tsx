"use client";
import * as React from 'react';

/**
 * FocusReveal
 * Ensures that when keyboard focus lands on an element that is a .reveal candidate
 * (or inside one), the element is revealed so keyboard users can see it.
 * This helps users who navigate via keyboard reach content that would otherwise
 * be offscreen or hidden until scrolled into view.
 */
export default function FocusReveal() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't run when reduced motion is requested or data-motion override disables animations
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dataReduced = document.documentElement.getAttribute('data-motion') === 'reduced';
    if (prefersReduced || dataReduced) return;

    function onFocus(e: FocusEvent) {
      const target = e.target as Element | null;
      if (!target) return;

      // Find closest reveal candidate
      const reveal = (target as Element).closest?.('.reveal') as HTMLElement | null;
      if (reveal && !reveal.classList.contains('in')) {
        reveal.classList.add('in');

        // If the reveal is inside a stagger-group, ensure the container gets animate class
        const stagger = (reveal as HTMLElement).closest?.('.stagger-group') as HTMLElement | null;
        if (stagger && !stagger.classList.contains('animate')) {
          stagger.classList.add('animate');
        }
      }
    }

    window.addEventListener('focus', onFocus, true);

    return () => {
      window.removeEventListener('focus', onFocus, true);
    };
  }, []);

  return null;
}
