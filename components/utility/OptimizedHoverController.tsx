"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { autoInitHoverEffects } from "@/lib/utils/optimizedHover";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * OptimizedHoverController
 * 
 * Automatically initializes optimized hover effects for elements with hover classes.
 * Uses dynamic will-change management to avoid permanent layer pinning.
 * 
 * Requirements: 6.3, 4.5, 1.1, 1.4
 */
export function OptimizedHoverController() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip if animations should be reduced
    if (shouldReduceAnimations()) return;

    // Initialize hover effects after DOM is ready
    const initHovers = () => {
      try {
        const cleanup = autoInitHoverEffects();
        return cleanup;
      } catch (error) {
        console.warn('OptimizedHoverController: Failed to initialize hover effects', error);
        return () => {};
      }
    };

    let cleanup: (() => void) | null = null;

    if (document.readyState === 'loading') {
      const onReady = () => {
        cleanup = initHovers();
      };
      document.addEventListener('DOMContentLoaded', onReady, { once: true });
      
      return () => {
        document.removeEventListener('DOMContentLoaded', onReady);
        cleanup?.();
      };
    } else {
      cleanup = initHovers();
      return () => cleanup?.();
    }
  }, [pathname]);

  return null;
}