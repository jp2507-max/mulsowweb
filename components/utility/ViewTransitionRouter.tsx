"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { shouldReduceAnimations } from "@/lib/utils/deviceCapabilities";

/**
 * ViewTransitionRouter
 * - Globally intercepts internal link clicks and performs navigation inside
 *   a document.startViewTransition when supported.
 * - Respects reduced motion and ignores external/targeted/download links.
 */
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => void };

export default function ViewTransitionRouter() {
  const router = useRouter();

  useEffect(() => {
    // Guard: feature + pref
  const supports = typeof document !== "undefined" && ("startViewTransition" in document);
    if (!supports || shouldReduceAnimations()) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      // Only left click without modifiers
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let el = e.target as Element | null;
      while (el && el.tagName !== "A") el = el.parentElement;
      if (!el) return;
      const a = el as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href) return;
      if (a.hasAttribute("download")) return;
      if (a.target && a.target !== "") return; // respect target (e.g., _blank)
      if (href.startsWith("#")) return; // in-page anchors

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return; // external

      // Internal navigation: perform SPA transition using Next router
      e.preventDefault();
      const d = document as DocWithVT;
      if (typeof d.startViewTransition === 'function') {
        d.startViewTransition(() => {
          router.push(url.pathname + url.search + url.hash);
        });
      } else {
        router.push(url.pathname + url.search + url.hash);
      }
    };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
  }, [router]);

  return null;
}
