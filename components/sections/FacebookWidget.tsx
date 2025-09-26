"use client";

import * as React from "react";

export interface FacebookWidgetProps {
  /** Height in pixels for the rendered widget */
  height?: number;
}

export default function FacebookWidget({ height = 700 }: FacebookWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

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
    const element = containerRef.current;
    if (!element || isVisible) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div className="card card-hover p-0 h-full overflow-hidden" role="region" aria-label="Facebook Page Widget">
      <div
        ref={containerRef}
        className="w-full max-w-full"
        style={{
          height: `${normalizedHeight}px`,
          maxHeight: "75vh",
          minHeight: "420px",
        }}
      >
        {isVisible ? (
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
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-sm text-ink-secondary/70">
            Facebook-Inhalte werden geladen …
          </div>
        )}
      </div>
    </div>
  );
}
