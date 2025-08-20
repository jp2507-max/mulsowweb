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
export function FussballDeWidget({ id, type = "table", className, title }: FussballDeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // Unique name so resize messages can target the correct frame
  const iframeName = React.useMemo(
    () => `fussballde_${id}_${Math.random().toString(36).slice(2, 8)}`,
    [id]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create iframe once
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.src = `https://next.fussball.de/widget/${type}/${id}`;
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
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
  }, [id, type, iframeName]);

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
