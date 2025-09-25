"use client";

import React, { useEffect, useRef } from "react";

type WidgetType =
  | "table"
  | "results"
  | "matches"
  | "club"
  | "next-match"
  | "club-matches"
  | string;

export interface FussballDeWidgetProps {
  id: string;
  type?: WidgetType;
  className?: string;
  title?: string;
  /** Optional host override (e.g., "next.fussball.de" or "www.fussball.de"). Defaults to next.fussball.de */
  host?: string;
  /** Rendering engine: our iframe (default) or the official script-based embed */
  engine?: "iframe" | "script";
}

/**
 * Lightweight, React-friendly embed for the FUSSBALL.DE widget.
 * Avoids relying on the global widgets.js and works in static export.
 *
 * Contract
 * - input: id (UUID from fussball.de), type (e.g. "table")
 * - output: renders an iframe that self-resizes via postMessage
 * - error modes: if embed fails, show accessible fallback content
 */
export function FussballDeWidget({ id, type = "table", className, title, host, engine = "iframe" }: FussballDeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // Unique name so resize messages can target the correct frame
  const iframeName = React.useMemo(
    () => `fussballde_${id}_${Math.random().toString(36).slice(2, 8)}`,
    [id]
  );
  const widgetHost = React.useMemo(() => {
    const h = (host || "next.fussball.de").trim();
    return h.startsWith("http") ? h.replace(/^https?:\/\//, "") : h;
  }, [host]);

  // Official script-based embed (fallback for strict widgets)
  useEffect(() => {
    if (engine !== "script") return;
    const el = containerRef.current;
    if (!el) return;

    // Ensure the official script is loaded once
    const SCRIPT_SRC = "https://www.fussball.de/widgets.js";
    type FlaggedScript = HTMLScriptElement & { _loaded?: boolean; _loading?: boolean };
    function ensureScript(): Promise<void> {
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`) as FlaggedScript | null;
      if (existing && existing._loaded) return Promise.resolve();
      if (existing && !existing._loading) {
        return new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject(new Error("Failed to load fussball.de widgets.js")));
        });
      }
      const s: FlaggedScript = existing ?? (document.createElement("script") as FlaggedScript);
      s.src = SCRIPT_SRC;
      s.async = true;
      s._loading = true;
      return new Promise((resolve, reject) => {
        s.addEventListener("load", () => { s._loaded = true; resolve(); });
        s.addEventListener("error", () => reject(new Error("Failed to load fussball.de widgets.js")));
        if (!existing) document.head.appendChild(s);
      });
    }

    // Create the placeholder div exactly as their docs show
    const placeholder = document.createElement("div");
    placeholder.className = "fussballde_widget";
    placeholder.setAttribute("data-id", id);
    placeholder.setAttribute("data-type", String(type));
    placeholder.style.width = "100%";
    el.appendChild(placeholder);

    let cancelled = false;
    ensureScript().catch(() => {/* allow graceful failure; their script may still be cached */}).finally(() => {
      if (cancelled) return;
      // The official script scans the DOM and initializes the widget automatically.
    });

    return () => {
      cancelled = true;
      try { el.removeChild(placeholder); } catch {}
    };
  }, [engine, id, type]);

  // Our default iframe-based embed (works for tables and many others)
  useEffect(() => {
    if (engine !== "iframe") return;
    const container = containerRef.current;
    if (!container) return;

    // Create iframe once
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
  iframe.src = `https://${widgetHost}/widget/${type}/${id}`;
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
  // Ensure the widget receives a consistent origin-only Referer for domain verification.
  // This matches how many widgets store the Website as just the host.
  iframe.setAttribute("referrerpolicy", "origin");
    iframe.setAttribute("title", title ?? "FUSSBALL.DE Widget");
    // Provide a conservative min-height so there is something visible before the first resize
    iframe.style.height = "480px";

    container.appendChild(iframe);
    iframeRef.current = iframe;

    type ResizeMessage = {
      type: "fussballde_widget:resize";
      iframeName: string;
      height: number;
    };

    const isObject = (val: unknown): val is Record<string, unknown> =>
      typeof val === "object" && val !== null;

    const isResizeMessage = (data: unknown): data is ResizeMessage => {
      if (!isObject(data)) return false;
      const typeVal = data["type"];
      const nameVal = data["iframeName"];
      const heightVal = data["height"];
      return (
        typeVal === "fussballde_widget:resize" &&
        typeof nameVal === "string" &&
        typeof heightVal === "number"
      );
    };

    function onMessage(e: MessageEvent) {
      // Use the local type guard to validate message shape
      if (!isResizeMessage(e.data)) return;

      // Ensure the message targets this iframe instance
      if (e.data.iframeName !== iframeName) return;

      const targetIframe = iframeRef.current ?? (document.querySelector(
        `iframe[name="${iframeName}"]`
      ) as HTMLIFrameElement | null);
      if (!targetIframe) return;

      // Validate origin against iframe.src origin safely
      try {
        const src = targetIframe.src || "";
        let parsedOrigin: string;
        try {
          parsedOrigin = new URL(src, window.location.href).origin;
        } catch {
          // If parsing fails, be conservative and don't apply the height
          return;
        }

        if (!parsedOrigin || e.origin !== parsedOrigin) return;

        try {
          targetIframe.style.height = `${Math.max(0, e.data.height)}px`;
        } catch {
          // ignore any errors while setting height
        }
      } catch {
        // ignore unexpected errors
      }
    }

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      // Cleanup DOM node to avoid leaks on client-side transitions
      try {
        container.removeChild(iframe);
      } catch {
        // ignore if already removed
      }
      iframeRef.current = null;
    };
    // Only run once for this id/type pair
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, id, type, iframeName, widgetHost]);

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full" aria-live="polite" />
      {/* Accessible fallback when the iframe fails to load (blocked network, etc.) */}
      <noscript>
        <p>
          Um den Spielplan zu sehen, aktiviere bitte JavaScript oder öffne die
          Seite auf FUSSBALL.DE.
        </p>
      </noscript>
    </div>
  );
}

export default FussballDeWidget;
