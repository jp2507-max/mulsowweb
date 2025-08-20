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

  // Respect reduced motion preferences but don't early-return.
  // We always reveal focused content (add the `in` class) so keyboard users
  // can see the element. Animation-related classes are only added when
  // neither the media query nor the data attribute request reduced motion.
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dataReduced = document.documentElement.getAttribute('data-motion') === 'reduced';

    function onFocus(e: FocusEvent) {
      const target = e.target as Element | null;
      if (!target) return;

      // Find closest reveal candidate and always ensure it is visible by
      // adding the `in` class. Don't early-return based on reduced-motion.
      const reveal = (target as Element).closest?.('.reveal') as HTMLElement | null;
      if (!reveal) return;

      if (!reveal.classList.contains('in')) {
        reveal.classList.add('in');
      }

      // If the reveal is inside a stagger-group, add the `animate` class
      // only when animations are allowed. When reduced-motion is requested
      // we still keep the element visible (the `in` class) but skip adding
      // animation-related classes so transitions don't run.
      const stagger = (reveal as HTMLElement).closest?.('.stagger-group') as HTMLElement | null;
      if (!stagger) return;

      const canAnimate = !prefersReduced && !dataReduced;
      if (canAnimate && !stagger.classList.contains('animate')) {
        stagger.classList.add('animate');

        // Clean up animate class after the animation ends so the DOM isn't
        // permanently modified. This removal only touches animation classes
        // and never removes the `in` class, preserving visibility for
        // reduced-motion users.
        const onAnimationEnd = () => {
          stagger.classList.remove('animate');
          stagger.removeEventListener('animationend', onAnimationEnd);
        };

        stagger.addEventListener('animationend', onAnimationEnd);
      }
    }

    window.addEventListener('focus', onFocus, true);

    return () => {
      window.removeEventListener('focus', onFocus, true);
    };
  }, []);

  return null;
}
