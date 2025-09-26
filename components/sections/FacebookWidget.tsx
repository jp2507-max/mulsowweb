"use client";

import * as React from "react";

export interface FacebookWidgetProps {
  /** Height in pixels for the iframe */
  height?: number;
}

export default function FacebookWidget({ height = 700 }: FacebookWidgetProps) {
  return (
    // remove inner padding so iframe can fill the visible card area
    <div className="card card-hover p-0 h-full overflow-hidden" role="region" aria-label="Facebook Page Widget">
      {/* fixed-height wrapper; iframe set to 100% height to fill the card */}
      <div
        className="w-full max-w-full"
        style={{
          height: `${height}px`,
          maxHeight: '75vh',
          minHeight: '420px'
        }}
      >
        <iframe
          title="Mulsower SV 61 - Facebook"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmsv61&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="100%"
          height="100%"
          style={{ border: 'none', overflow: 'hidden', display: 'block' }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
}
