"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

/**
 * PageFadeController
 * - Applies a data-attribute driven fade on the page content wrapper
 * - Respects reduced motion, save-data, and low-memory hints
 * - Avoids double animations when the View Transitions API is available
 * - Ensures BFCache restores remain visible
 */
export function PageFadeController() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const fallbackTimeoutRef = useRef<number | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const resolveTarget = useCallback(() => {
    if (typeof document === "undefined") return null;

    if (targetRef.current && document.body.contains(targetRef.current)) {
      return targetRef.current;
    }

    const node = document.querySelector<HTMLElement>("[data-page-fade-target]");
    targetRef.current = node ?? null;
    return targetRef.current;
  }, []);

  const runFade = useCallback((): (() => void) => {
    const target = resolveTarget();
    if (!target) {
      return () => {};
    }

    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    if (fallbackTimeoutRef.current != null) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    const handleEnd = (ev: TransitionEvent) => {
      if (ev.propertyName !== "opacity") {
        return;
      }
      target.removeEventListener("transitionend", handleEnd);
      target.setAttribute("data-page-fade-state", "in");
    };

    target.setAttribute("data-page-fade-state", "out");

    rafIdRef.current = requestAnimationFrame(() => {
      target.setAttribute("data-page-fade-state", "in");
      target.addEventListener("transitionend", handleEnd);
    });

    fallbackTimeoutRef.current = window.setTimeout(() => {
      target.removeEventListener("transitionend", handleEnd);
      target.setAttribute("data-page-fade-state", "in");
      fallbackTimeoutRef.current = null;
    }, 260);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (fallbackTimeoutRef.current != null) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      target.removeEventListener("transitionend", handleEnd);
      target.setAttribute("data-page-fade-state", "in");
    };
  }, [resolveTarget]);

  // Ensure BFCache restores display the page instantly
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event || !event.persisted) {
        return;
      }
      const target = resolveTarget();
      if (target) {
        target.setAttribute("data-page-fade-state", "in");
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [resolveTarget]);

  // Initial mount fade-in (progressive enhancement)
  useEffect(() => {
    if (shouldReduceAnimations()) {
      return;
    }

    return runFade();
  }, [runFade]);

  // Client-side navigations (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (shouldReduceAnimations()) {
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const doc = document as DocumentWithViewTransition;
    const html = document.documentElement;
    const spaViewTransitionEnabled = html?.dataset?.spaViewTransition === "enabled";
    if (typeof doc.startViewTransition === "function" && spaViewTransitionEnabled) {
      return;
    }

    return runFade();
  }, [pathname, runFade]);

  return null;
}
