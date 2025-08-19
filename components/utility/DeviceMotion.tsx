"use client";
import { useEffect } from "react";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * DeviceMotion
 * Client-only initializer that checks device capabilities and sets
 * `html[data-motion="reduced"]` when animations should be reduced.
 * Keeps the implementation tiny and static-export safe.
 */
export default function DeviceMotion(): null {
  useEffect(() => {
    try {
      if (shouldReduceAnimations()) {
        document.documentElement.setAttribute('data-motion', 'reduced');
      }
    } catch {
      // Fail silently - if detection errors, leave defaults.
    }
  }, []);

  return null;
}
