"use client";
import React, { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

declare global {
  interface Window {
    __lenis?: unknown | null;
  }
}

type Props = { children: React.ReactNode };

/**
 * ScrollProvider
 * - Initializes Lenis smooth scrolling on the root scroller (html)
 * - Respects reduced-motion and data-motion="reduced"
 * - Exposes the instance on window.__lenis for utilities to use (e.g., anchor links)
 * - Emits a CustomEvent("lenis:scroll") on window for optional listeners
 */
export function ScrollProvider({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.getAttribute("data-motion") === "reduced" ||
      shouldReduceAnimations();
    setEnabled(!reduced);
    if (reduced) {
      // Ensure native scroll behavior
      document.documentElement.style.scrollBehavior = "auto";
      window.__lenis = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(() => {
      const inst = lenisRef.current?.lenis ?? null;
      if (inst) {
        window.__lenis = inst;
        const onScroll = (e: unknown) => {
          try {
            window.dispatchEvent(new CustomEvent("lenis:scroll", { detail: e }));
          } catch {}
        };
        inst.on?.("scroll", onScroll as never);
        return () => {
          inst.off?.("scroll", onScroll as never);
          if (window.__lenis === inst) window.__lenis = null;
        };
      }
      return () => {};
    }, 0);
    return () => clearTimeout(id);
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}

export default ScrollProvider;
