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
  const timeoutIdRef = useRef<number | null>(null);
  const onEndRef = useRef<((ev: TransitionEvent) => void) | null>(null);

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

    rafIdRef.current = requestAnimationFrame(() => {
      body.classList.add('fade-in');

      onEndRef.current = (ev: TransitionEvent) => {
        if (ev.propertyName === 'opacity') {
          body.classList.remove('fade-init');
          if (onEndRef.current) {
            body.removeEventListener('transitionend', onEndRef.current);
            onEndRef.current = null;
          }
        }
      };

      body.addEventListener('transitionend', onEndRef.current);
    });

    // fallback cleanup in case transitionend doesn't fire
    // transition is 180ms in CSS; use small buffer for cleanup
    timeoutIdRef.current = window.setTimeout(() => {
      if (onEndRef.current) {
        body.removeEventListener('transitionend', onEndRef.current);
        onEndRef.current = null;
      }
      body.classList.remove('fade-init');
    }, 220);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (timeoutIdRef.current != null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (onEndRef.current) {
        body.removeEventListener('transitionend', onEndRef.current);
        onEndRef.current = null;
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

    const body = document.body;
    body.classList.add("fade-init");
    body.classList.remove("fade-in");
    // schedule the class toggle on the next frame
    rafIdRef.current = requestAnimationFrame(() => {
      body.classList.add("fade-in");

      // store the handler so we can remove it from cleanup or from the timeout
      onEndRef.current = (ev: TransitionEvent) => {
        if (ev.propertyName === "opacity") {
          body.classList.remove("fade-init");
          if (onEndRef.current) {
            body.removeEventListener("transitionend", onEndRef.current);
            onEndRef.current = null;
          }
        }
      };

      body.addEventListener("transitionend", onEndRef.current);
    });

    // fallback in case transitionend never fires (e.g. prefers-reduced-motion)
    // choose a safe delay slightly longer than typical transition (250ms)
    timeoutIdRef.current = window.setTimeout(() => {
      if (onEndRef.current) {
        body.removeEventListener("transitionend", onEndRef.current);
        onEndRef.current = null;
      }
      body.classList.remove("fade-init");
    }, 250);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (timeoutIdRef.current != null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (onEndRef.current) {
        body.removeEventListener("transitionend", onEndRef.current);
        onEndRef.current = null;
      }
      // ensure we never leave the body in an initialized-but-not-finished state
      body.classList.remove("fade-init");
    };
  }, [pathname]);

  return null;
}
