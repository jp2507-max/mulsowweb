"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollRevealController
 * - Adds .reveal class only after the IntersectionObserver is initialized
 * - Observes elements with .reveal-candidate and toggles .in when visible
 * - Falls back to immediately showing content if IO is unavailable or errors
 */
export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(".reveal-candidate"));

    if (candidates.length === 0) return;

    // Safe defaults from spec
    const threshold = 0.15;
    const rootMargin = "0px 0px -15% 0px";

    let observer: IntersectionObserver | null = null;

    // Respect user's reduced motion preference: reveal immediately and don't animate
    if (typeof window !== "undefined" && "matchMedia" in window) {
      try {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq && mq.matches) {
          for (const el of candidates) {
            el.classList.add("reveal", "in");
          }
          return;
        }
      } catch (err) {
        // If matchMedia throws for any reason, fall through to normal behaviour
        console.debug("ScrollRevealController: matchMedia failed.", err);
      }
    }

    try {
      // Harden the IO check to avoid runtime errors in non-browser environments
      if (typeof window !== "undefined" && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const el = entry.target as HTMLElement;
              // Skip elements already revealed
              if (el.classList.contains("in")) continue;
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                el.classList.add("in");
                observer?.unobserve(el);
              }
            }
          },
          { threshold, rootMargin }
        );

        // Only add the .reveal class after observer exists to avoid hiding content
        for (const el of candidates) {
          el.classList.add("reveal");
          observer.observe(el);
        }

        return () => {
          observer?.disconnect();
          observer = null;
        };
      }
    } catch (err) {
      // fallthrough to fallback - ensure content is visible
      // Use console.debug to avoid noisy warnings in production builds
      console.debug("ScrollRevealController: IntersectionObserver failed, revealing content.", err);
    }

    // Fallback: make content visible immediately. Keep the .reveal marker.
    for (const el of candidates) {
      el.classList.add("reveal", "in");
    }
  }, [pathname]);

  return null;
}
