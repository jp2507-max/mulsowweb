"use client";

import * as React from "react";

export interface FacebookWidgetProps {
  /** Height in pixels for the rendered widget */
  height?: number;
  /** Optional maximum width (px) for the plugin iframe — if omitted the component measures its container */
  maxWidth?: number;
}

export default function FacebookWidget({ height = 360, maxWidth }: FacebookWidgetProps) {
  const [status, setStatus] = React.useState<"loading" | "ready" | "fallback">("loading");

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = React.useState<number | null>(null);

  const normalizedHeight = React.useMemo(() => {
    const parsed = Number(height);
    if (Number.isNaN(parsed) || !Number.isFinite(parsed)) return 700;
    return Math.max(420, Math.floor(parsed));
  }, [height]);

  const iframeSrc = React.useMemo(() => {
      const widthParam = String(Math.max(320, Math.floor((maxWidth ?? measuredWidth) ?? 700)));
    const params = new URLSearchParams({
      href: "https://www.facebook.com/msv61",
      tabs: "timeline",
      width: widthParam,
      height: String(normalizedHeight),
      small_header: "false",
      adapt_container_width: "false",
      hide_cover: "false",
      show_facepile: "true",
    });
    return `https://www.facebook.com/plugins/page.php?${params.toString()}&appId`;
  }, [normalizedHeight, measuredWidth, maxWidth]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (status !== "loading") return;

    const timeout = window.setTimeout(() => {
      setStatus((prev) => (prev === "ready" ? "ready" : "fallback"));
    }, 6000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    if (maxWidth) {
      // If caller provided a maxWidth, use that and skip observation
      setMeasuredWidth(maxWidth);
      return;
    }

    const el = containerRef.current;
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // subtract a small padding buffer so the plugin's inner layout doesn't trigger a horizontal scrollbar
          const measured = Math.floor((entry.contentRect.width || el.clientWidth) - 12);
          setMeasuredWidth(measured);
        }
      });
      ro.observe(el);
      // set initial (subtract buffer to account for card/plugin chrome)
  setMeasuredWidth(Math.floor(el.getBoundingClientRect().width - 12));
    } catch {
      // ResizeObserver unsupported: fall back to clientWidth once
      setMeasuredWidth(Math.floor((el.clientWidth || 700) - 12));
    }

    return () => {
      if (ro && el) ro.unobserve(el);
      ro = null;
    };
  }, [maxWidth]);

  const handleLoad = React.useCallback(() => {
    setStatus("ready");
  }, []);

  const handleError = React.useCallback(() => {
    setStatus("fallback");
  }, []);

  return (
    <div role="region" aria-label="Facebook Page Widget">
      <div
  ref={containerRef}
  className="mx-auto w-full mb-12 overflow-hidden"
        style={{
          height: `${normalizedHeight}px`,
          maxHeight: `${normalizedHeight}px`,
          minHeight: `${Math.min(320, normalizedHeight)}px`,
          position: "relative",
        }}
      >
        {status !== "ready" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center text-sm text-ink-secondary/80">
            {status === "fallback" ? (
              <>
                <p>Das Facebook-Plugin konnte nicht geladen werden.</p>
                <a
                  href="https://www.facebook.com/msv61"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-secondary"
                >
                  Zur Facebook-Seite
                </a>
              </>
            ) : (
              <p>Facebook-Inhalte werden geladen …</p>
            )}
          </div>
        )}
        <iframe
          title="Mulsower SV 61 - Facebook"
          src={iframeSrc}
          key={iframeSrc}
          width={measuredWidth ? String(Math.max(300, measuredWidth)) : "100%"}
          height={String(normalizedHeight)}
          style={{ border: "none", overflow: "hidden", display: "block", width: measuredWidth ? `${Math.max(300, measuredWidth)}px` : "100%" }}
          scrolling="auto"
          credentialless="true"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </div>
  );
}
