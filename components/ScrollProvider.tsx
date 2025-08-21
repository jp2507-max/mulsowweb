"use client";
import React, { useEffect } from "react";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

declare global {
  interface Window {
    __smoothScroll?: boolean;
  }
}

type Props = { children: React.ReactNode };

/**
 * Lightweight ScrollProvider
 * - Uses CSS scroll-behavior: smooth instead of heavy Lenis library
 * - Respects reduced-motion and data-motion="reduced"
 * - Maintains compatibility with existing scroll utilities
 * - Bundle size: ~0.5KB vs ~15KB for Lenis
 */
export function ScrollProvider({ children }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.getAttribute("data-motion") === "reduced" ||
      shouldReduceAnimations();

    // Detect Windows platforms where smooth scroll can feel stuttery
    const ua = navigator.userAgent || "";
    const plat = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || "";
    const isWindows = /Win/i.test(plat) || /Windows/i.test(ua);

    // Enable smooth scroll only when not reduced motion and not Windows
    const useSmooth = !reduced && !isWindows;
    
    if (useSmooth) {
      document.documentElement.style.scrollBehavior = "smooth";
      window.__smoothScroll = true;
    } else {
      document.documentElement.style.scrollBehavior = "auto";
      window.__smoothScroll = false;
    }

    // Emit scroll events for compatibility with existing code
    const handleScroll = () => {
      try {
        window.dispatchEvent(new CustomEvent("scroll:update", { 
          detail: { 
            scrollY: window.scrollY,
            scrollX: window.scrollX 
          } 
        }));
      } catch {}
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = "";
      window.__smoothScroll = false;
    };
  }, []);

  return <>{children}</>;
}

export default ScrollProvider;
