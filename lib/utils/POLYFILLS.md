Polyfill guidance for animations and scroll reveal

This project avoids auto-loading polyfills. The site uses progressive enhancement and provides safe fallbacks when features are missing.

When to add polyfills (manual):
- IntersectionObserver: Consider a small polyfill for legacy browsers that must show scroll reveal animations. Otherwise, the site will fall back to visible content without JS hiding (preferred).
- CSS.supports/content-visibility/backdrop-filter: These are feature-detected in CSS with @supports blocks; no runtime polyfill is required.

Recommended approach:
1. Prefer server-side or build-time detection and bundling only when supporting legacy targets.
2. If you must add runtime polyfills, host them locally (static /_next/static/polys/) and load conditionally using a tiny loader that checks window.IntersectionObserver.
3. Keep polyfills small and audit bundle size impact.

Example loader (do not auto-load in main bundle):

```html
<script>
  if (!('IntersectionObserver' in window)) {
    var s = document.createElement('script');
    s.src = '/_next/static/polys/intersection-observer.min.js';
    document.head.appendChild(s);
  }
</script>
```

Avoid third-party CDN polyfills for privacy and CSP compliance.
