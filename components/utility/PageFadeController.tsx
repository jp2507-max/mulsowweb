"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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

  // Apply fade on client-side navigations only (skip initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const body = document.body;
    body.classList.add("fade-init");
    body.classList.remove("fade-in");

    const rafId = requestAnimationFrame(() => {
      body.classList.add("fade-in");
      const onEnd = (ev: TransitionEvent) => {
        if (ev.propertyName === "opacity") {
          body.classList.remove("fade-init");
          body.removeEventListener("transitionend", onEnd);
        }
      };
      body.addEventListener("transitionend", onEnd);
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
