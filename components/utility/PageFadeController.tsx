"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * PageFadeController
 * - Applies a CSS-class-based fade only on client-side navigations
 * - No inline styles (CSP-safe)
 * - Respects prefers-reduced-motion via CSS
 * - Handles BFCache via pageshow to ensure visible state when restored
 */
export function PageFadeController() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  // onEndRef removed to avoid sharing the same handler across navigations

  // Use the shared device capability helper directly

  // BFCache restore handling
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e && e.persisted) {
        document.body.classList.add("fade-in");
        document.body.classList.remove("fade-init");
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Initial page load fade: run once on mount (progressive enhancement)
  useEffect(() => {
  // Respect reduced-motion and device/save-data hints
  if (shouldReduceAnimations()) return;

    const body = document.body;

    // Add initial class then schedule the visible class on the next frame
    body.classList.add('fade-init');
    // Ensure we clean up any stray flags from previous runs
    body.classList.remove('fade-in');

    const onEnd = (ev: TransitionEvent) => {
      if (ev.propertyName === 'opacity') {
        body.classList.remove('fade-init');
        body.removeEventListener('transitionend', onEnd);
      }
    };

    rafIdRef.current = requestAnimationFrame(() => {
      body.classList.add('fade-in');
      body.addEventListener('transitionend', onEnd);
    });

    // fallback cleanup in case transitionend doesn't fire
    // transition is 180ms in CSS; use small buffer for cleanup
    let fallbackId: number | null = null;
    fallbackId = window.setTimeout(() => {
      body.removeEventListener('transitionend', onEnd);
      body.classList.remove('fade-init');
    }, 220);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (fallbackId != null) {
        clearTimeout(fallbackId);
        fallbackId = null;
      }
      // ensure any listener that didn't fire is removed
      try {
        body.removeEventListener('transitionend', onEnd);
      } catch {
        // ignore - onEnd may be out of scope in some bundlers, but safe to attempt
      }
      body.classList.remove('fade-init');
    };
  }, []);

  // Apply fade on client-side navigations only (skip initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  // Respect reduced-motion and device/save-data hints
  if (shouldReduceAnimations()) return;
  // If View Transitions API is available, let it handle SPA navs to avoid double fades
  const doc: Document | undefined = typeof document !== 'undefined' ? document : undefined;
  if (!doc) return;
  if ('startViewTransition' in (doc as unknown as Record<string, unknown>)) return;

    const body = doc.body;
    body.classList.add("fade-init");
    body.classList.remove("fade-in");

    const onEnd = (ev: TransitionEvent) => {
      if (ev.propertyName === "opacity") {
        body.classList.remove("fade-init");
        body.removeEventListener("transitionend", onEnd);
      }
    };

    // schedule the class toggle on the next frame
    rafIdRef.current = requestAnimationFrame(() => {
      body.classList.add("fade-in");
      body.addEventListener("transitionend", onEnd);
    });

    // fallback in case transitionend never fires (e.g. prefers-reduced-motion)
    // choose a safe delay slightly longer than typical transition (250ms)
    let fallbackId: number | null = null;
    fallbackId = window.setTimeout(() => {
      body.removeEventListener("transitionend", onEnd);
      body.classList.remove("fade-init");
    }, 250);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (fallbackId != null) {
        clearTimeout(fallbackId);
        fallbackId = null;
      }
      // ensure any listener that didn't fire is removed
      try {
        body.removeEventListener('transitionend', onEnd);
      } catch {
        // ignore
      }
      // ensure we never leave the body in an initialized-but-not-finished state
      body.classList.remove("fade-init");
    };
  }, [pathname]);

  return null;
}
