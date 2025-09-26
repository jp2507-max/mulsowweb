"use client";

import * as React from "react";

export interface FacebookWidgetProps {
  /** Height in pixels for the iframe */
  height?: number;
}

export default function FacebookWidget({ height = 700 }: FacebookWidgetProps) {
  // normalize numeric height and ensure it's used consistently for iframe URL & sizing
  const normalizedHeight = Math.max(0, Math.floor(Number(height) || 0)) || 700;

  const fbUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    'https://www.facebook.com/msv61'
  )}&tabs=timeline&width=500&height=${encodeURIComponent(
    String(normalizedHeight)
  )}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;

  return (
    // remove inner padding so iframe can fill the visible card area
    <div className="card card-hover p-0 h-full overflow-hidden" role="region" aria-label="Facebook Page Widget">
      {/* fixed-height wrapper; iframe set to 100% height to fill the card */}
      <div
        className="w-full max-w-full"
        style={{
          height: `${normalizedHeight}px`,
          maxHeight: '75vh',
          minHeight: '420px'
        }}
      >
        <iframe
          title="Mulsower SV 61 - Facebook"
          src={fbUrl}
          width="100%"
          height={String(normalizedHeight)}
          style={{ border: 'none', overflow: 'hidden', display: 'block', height: '100%' }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
}
