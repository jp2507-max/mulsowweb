"use client";

// Lightweight pointer-driven spotlight that updates CSS vars for a radial gradient.
// - Throttled with requestAnimationFrame
// - Disabled for reduced motion or coarse pointers
// - No event listeners when not visible (IntersectionObserver)

import { useEffect, useRef } from "react";

export default function InteractiveSpotlight() {
  const frame = useRef<number | null>(null);
  const spotActiveTimer = useRef<number | null>(null);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isReduced || isCoarse) return; // keep static for touch/PRM users

    const root = document.documentElement;
    let pendingX = 0.5, pendingY = 0.4;

    const apply = () => {
      frame.current = null;
      root.style.setProperty("--spot-x", `${Math.round(pendingX * 100)}%`);
      root.style.setProperty("--spot-y", `${Math.round(pendingY * 100)}%`);
      root.setAttribute("data-spot-active", "true");
      if (spotActiveTimer.current) window.clearTimeout(spotActiveTimer.current);
      spotActiveTimer.current = window.setTimeout(() => {
        root.removeAttribute("data-spot-active");
      }, 1200);
    };

    const onMove = (e: PointerEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      pendingX = Math.max(0, Math.min(1, e.clientX / vw));
      pendingY = Math.max(0, Math.min(1, e.clientY / vh));
      if (frame.current == null) frame.current = window.requestAnimationFrame(apply);
    };

    // Activate only when visible to avoid needless work
  const io = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const visible = entries.some((en) => en.isIntersecting);
      if (visible) {
    window.addEventListener("pointermove", onMove as EventListener, { passive: true } as AddEventListenerOptions);
      } else {
    window.removeEventListener("pointermove", onMove as EventListener);
      }
    });
    io.observe(document.body);

    return () => {
      if (frame.current != null) cancelAnimationFrame(frame.current);
      if (spotActiveTimer.current) clearTimeout(spotActiveTimer.current);
  window.removeEventListener("pointermove", onMove as EventListener);
      io.disconnect();
    };
  }, []);

  return null;
}
