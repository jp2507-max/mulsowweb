"use client";

import * as React from "react";

declare global {
  interface Window {
    FB?: {
      init?: (options: { xfbml: boolean; version: string }) => void;
      XFBML?: {
        parse?: (element?: HTMLElement | null) => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

interface EnsureSdkOptions {
  locale?: string;
}

let facebookSdkPromise: Promise<void> | null = null;
let facebookSdkInitialized = false;

function initFacebookSdk() {
  if (facebookSdkInitialized) return facebookSdkInitialized;
  try {
    if (!window.FB?.init) {
      return false;
    }
    window.FB.init({ xfbml: true, version: "v21.0" });
    facebookSdkInitialized = true;
  } catch {
    // ignore init errors – widget may still render
  }
  return facebookSdkInitialized;
}

function ensureFacebookSdk({ locale = "de_DE" }: EnsureSdkOptions = {}): Promise<void> {
  if (facebookSdkPromise) {
    return facebookSdkPromise;
  }

  facebookSdkPromise = new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    const scriptId = "facebook-jssdk";
    const waitForSdk = () => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      if (window.FB?.XFBML?.parse) {
        initFacebookSdk();
        resolve();
        return;
      }

      const poll = window.setInterval(() => {
        if (window.FB?.XFBML?.parse) {
          window.clearInterval(poll);
          initFacebookSdk();
          resolve();
        }
      }, 200);

      window.setTimeout(() => {
        window.clearInterval(poll);
        initFacebookSdk();
        resolve();
      }, 8000);
    };

    if (window.FB?.XFBML?.parse) {
      waitForSdk();
      return;
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      waitForSdk();
      return;
    }

    const previousInit = window.fbAsyncInit;
    window.fbAsyncInit = () => {
      previousInit?.();
      waitForSdk();
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://connect.facebook.net/${locale}/sdk.js#xfbml=1&version=v21.0`;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
  });

  return facebookSdkPromise;
}

export interface FacebookWidgetProps {
  /** Height in pixels for the rendered widget */
  height?: number;
}

export default function FacebookWidget({ height = 700 }: FacebookWidgetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = React.useState(false);

  // normalize numeric height and ensure it's used consistently for sizing attributes
  const normalizedHeight = Math.max(0, Math.floor(Number(height) || 0)) || 700;

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    if (useFallback) return;

    let cancelled = false;
    let fallbackTimer: number | null = null;
    let monitorInterval: number | null = null;

    const markFallback = () => {
      if (cancelled) return;
      setUseFallback(true);
    };

    ensureFacebookSdk({ locale: "de_DE" }).then(() => {
      if (cancelled) return;
      const attemptParse = (retries = 25) => {
        if (cancelled) return;
        if (window.FB?.XFBML?.parse) {
          try {
            window.FB.XFBML.parse(element);
          } catch {
            // ignore parse errors to keep UI stable
          }
          return;
        }
        if (retries <= 0) return;
        window.setTimeout(() => attemptParse(retries - 1), 200);
      };

      attemptParse();

      monitorInterval = window.setInterval(() => {
        if (cancelled) return;
        if (element.querySelector("iframe")) {
          if (monitorInterval) {
            window.clearInterval(monitorInterval);
            monitorInterval = null;
          }
          if (fallbackTimer) {
            window.clearTimeout(fallbackTimer);
            fallbackTimer = null;
          }
        }
      }, 200);

      fallbackTimer = window.setTimeout(() => {
        if (monitorInterval) {
          window.clearInterval(monitorInterval);
          monitorInterval = null;
        }
        if (!element.querySelector("iframe")) {
          markFallback();
        }
      }, 6000);
    });

    return () => {
      cancelled = true;
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      if (monitorInterval) {
        window.clearInterval(monitorInterval);
      }
    };
  }, [normalizedHeight, useFallback]);

  return (
    <div className="card card-hover p-0 h-full overflow-hidden" role="region" aria-label="Facebook Page Widget">
      <div
        ref={containerRef}
        className="w-full max-w-full"
        style={{
          height: `${normalizedHeight}px`,
          maxHeight: "75vh",
          minHeight: "420px"
        }}
      >
        {useFallback ? (
          <iframe
            title="Mulsower SV 61 - Facebook"
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
              "https://www.facebook.com/msv61"
            )}&tabs=timeline&width=500&height=${encodeURIComponent(String(normalizedHeight))}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
            width="100%"
            height={String(normalizedHeight)}
            style={{ border: "none", overflow: "hidden", display: "block" }}
            scrolling="no"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}
          />
        ) : (
          <div
            className="fb-page"
            data-href="https://www.facebook.com/msv61"
            data-tabs="timeline"
            data-width="500"
            data-height={String(normalizedHeight)}
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote className="fb-xfbml-parse-ignore" cite="https://www.facebook.com/msv61">
              <a href="https://www.facebook.com/msv61">Mulsower SV 61 e.V.</a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
