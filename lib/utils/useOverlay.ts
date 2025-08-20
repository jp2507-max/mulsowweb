"use client";
import { useEffect, RefObject } from 'react';

function getFocusable(panel: Element | null) {
  if (!panel) return [] as HTMLElement[];
  const els = panel.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(els);
}

/**
 * useOverlay - reusable hook for overlay behavior
 * - locks body scrolling while open
 * - sets body[data-overlay-open] attribute
 * - applies aria-hidden to non-overlay body children
 * - traps focus inside the panel and restores focus on close
 */
export default function useOverlay(
  open: boolean,
  panelRef: RefObject<HTMLElement | null>,
  onClose?: () => void
) {
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;

    const panel = panelRef.current;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the panel
    requestAnimationFrame(() => {
      panel?.focus();
    });

    // Save and lock body overflow
    const prevBodyOverflow = document.body.style.overflow || '';
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-overlay-open', 'true');

    // Apply aria-hidden to body children except overlay elements
    const modified: Array<{ el: Element; prev: string | null }> = [];
    const children = Array.from(document.body.children || []);
    children.forEach((el) => {
      if ((el as Element).classList.contains('overlay')) return;
      const prev = (el as Element).getAttribute('aria-hidden');
      modified.push({ el, prev });
      (el as Element).setAttribute('aria-hidden', 'true');
    });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable(panel);
        if (focusable.length === 0) {
          e.preventDefault();
          panel?.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    function onFocusIn(e: FocusEvent) {
      const target = e.target as Node | null;
      if (!panel || !target) return;
      if (!panel.contains(target)) {
        const focusable = getFocusable(panel);
        (focusable[0] || panel).focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);

      // Restore focus
      try {
        previouslyFocused?.focus?.();
      } catch {
        /* ignore */
      }

      // Restore body overflow and attribute
      document.body.style.overflow = prevBodyOverflow;
      document.body.removeAttribute('data-overlay-open');

      // Restore aria-hidden on modified elements
      modified.forEach(({ el, prev }) => {
        if (prev === null) el.removeAttribute('aria-hidden');
        else el.setAttribute('aria-hidden', prev);
      });
    };
  }, [open, panelRef, onClose]);
}
