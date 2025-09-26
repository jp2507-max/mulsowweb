"use client";

import * as React from "react";

export interface FacebookWidgetProps {
  /** Height in pixels for the rendered widget */
  height?: number;
}

export default function FacebookWidget({ height = 700 }: FacebookWidgetProps) {
  const [status, setStatus] = React.useState<"loading" | "ready" | "fallback">("loading");

  const normalizedHeight = React.useMemo(() => {
    const parsed = Number(height);
    if (Number.isNaN(parsed) || !Number.isFinite(parsed)) return 700;
    return Math.max(420, Math.floor(parsed));
  }, [height]);

  const iframeSrc = React.useMemo(() => {
    const params = new URLSearchParams({
      href: "https://www.facebook.com/msv61",
      tabs: "timeline",
      width: "500",
      height: String(normalizedHeight),
      small_header: "false",
      adapt_container_width: "true",
      hide_cover: "false",
      show_facepile: "true",
    });
    return `https://www.facebook.com/plugins/page.php?${params.toString()}&appId`;
  }, [normalizedHeight]);

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

  const handleLoad = React.useCallback(() => {
    setStatus("ready");
  }, []);

  const handleError = React.useCallback(() => {
    setStatus("fallback");
  }, []);

  return (
    <div className="card card-hover p-0 h-full overflow-hidden" role="region" aria-label="Facebook Page Widget">
      <div
        className="w-full max-w-full"
        style={{
          height: `${normalizedHeight}px`,
          maxHeight: "75vh",
          minHeight: "420px",
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
          width="100%"
          height={String(normalizedHeight)}
          style={{ border: "none", overflow: "hidden", display: "block" }}
          scrolling="no"
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
