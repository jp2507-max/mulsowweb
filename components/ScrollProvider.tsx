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
  const [opts, setOpts] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.getAttribute("data-motion") === "reduced" ||
      shouldReduceAnimations();
    // Detect Windows platforms where virtual scroll can feel stuttery
    const ua = navigator.userAgent || "";
    const plat = (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.platform || "";
    const isWindows = /Win/i.test(plat) || /Windows/i.test(ua);

    // Enable Lenis only when not reduced motion and not Windows
    const useLenis = !reduced && !isWindows;
    setEnabled(useLenis);

    // Prepare options: keep defaults on non-Windows, turn off smoothing if we ever enable on Windows (future-proof)
    setOpts(
      useLenis
        ? { autoRaf: true }
        : { autoRaf: true, smoothWheel: false, smoothTouch: false }
    );
    if (reduced) {
      // Ensure native scroll behavior
      document.documentElement.style.scrollBehavior = "auto";
      window.__lenis = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // Store references in outer scope so the cleanup can access them
    let id: ReturnType<typeof setTimeout> | null = null;
  type LenisLike = { on?: (event: string, handler: unknown) => void; off?: (event: string, handler: unknown) => void };
  let inst: LenisLike | null = null;
    let onScroll: ((e: unknown) => void) | null = null;

    id = setTimeout(() => {
  inst = (lenisRef.current?.lenis ?? null) as unknown as LenisLike;
      if (inst) {
        window.__lenis = inst;
        onScroll = (e: unknown) => {
          try {
            window.dispatchEvent(new CustomEvent("lenis:scroll", { detail: e }));
          } catch {}
        };
        inst.on?.("scroll", onScroll as never);
      }
    }, 0);

    return () => {
      if (id) clearTimeout(id);
      if (inst && onScroll) {
        inst.off?.("scroll", onScroll as never);
      }
      if (inst && window.__lenis === inst) window.__lenis = null;
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={opts ?? { autoRaf: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}

export default ScrollProvider;
