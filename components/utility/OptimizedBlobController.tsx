"use client";

import { useEffect } from "react";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";
import { prepareTransform, cleanupWillChange } from "@/lib/utils/willChangeManager";

/**
 * OptimizedBlobController
 * 
 * Manages will-change properties for the animated background blobs.
 * Applies will-change only when animations are active and removes when paused.
 * 
 * Requirements: 6.3, 4.5, 9.1
 */
export function OptimizedBlobController() {
  useEffect(() => {
    // Skip if animations should be reduced
    if (shouldReduceAnimations()) return;

    const blobs = document.querySelectorAll('.site-bg__blob');
    if (blobs.length === 0) return;

    // Apply will-change for blob animations
    blobs.forEach(blob => {
      prepareTransform(blob, 36000); // 36s animation duration
    });

    // Handle visibility change to pause/resume animations
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden - clean up will-change to save resources
        blobs.forEach(blob => {
          cleanupWillChange(blob);
        });
      } else {
        // Page visible - reapply will-change for smooth animations
        blobs.forEach(blob => {
          prepareTransform(blob, 36000);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Motion reduced - clean up will-change
        blobs.forEach(blob => {
          cleanupWillChange(blob);
        });
      } else {
        // Motion enabled - reapply will-change
        blobs.forEach(blob => {
          prepareTransform(blob, 36000);
        });
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      // Cleanup
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
      
      blobs.forEach(blob => {
        cleanupWillChange(blob);
      });
    };
  }, []);

  return null;
}