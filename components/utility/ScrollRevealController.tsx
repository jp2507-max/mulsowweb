"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Use the optimized scroll reveal with will-change management
import { createOptimizedScrollReveal } from "@/lib/utils/optimizedScrollReveal";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * ScrollRevealController - Enhanced with Will-Change Management
 * - Uses OptimizedScrollReveal for performance-optimized animations
 * - Manages will-change properties dynamically to avoid permanent layer pinning
 * - Falls back to immediately showing content if animations are disabled
 */
export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    // If device/user prefers reduced animations or is low-end, skip costly observers
    if (shouldReduceAnimations()) return;

    // Use the optimized scroll reveal system
    const cleanup = createOptimizedScrollReveal({
      threshold: 0.15,
      rootMargin: '0px 0px -15% 0px',
      staggerDelay: 60,
      maxGroupDelay: 400,
      animationDuration: 200,
    });

    return () => {
      try { 
        cleanup?.(); 
      } catch { 
        /* ignore */ 
      }
    };
  }, [pathname]);

  return null;
}
