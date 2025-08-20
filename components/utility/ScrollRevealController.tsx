"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Use the small ESM utility for the reveal logic
import { initScrollReveal } from "@/lib/utils/scrollReveal.mjs";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * ScrollRevealController
 * - Adds .reveal class only after the IntersectionObserver is initialized
 * - Observes elements with .reveal-candidate and toggles .in when visible
 * - Falls back to immediately showing content if IO is unavailable or errors
 */
export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
  // If device/user prefers reduced animations or is low-end, skip costly observers
  if (shouldReduceAnimations()) return;

  // Delegate to the shared utility which encapsulates resilient behavior
  const cleanup = initScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -15% 0px' });

    return () => {
      try { cleanup?.(); } catch { /* ignore */ }
    };
  }, [pathname]);

  return null;
}
