// featureDetection.mjs
// Lightweight ESM utilities for runtime feature detection used by animation code.
export function hasIntersectionObserver() {
  try {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window;
  } catch {
    return false;
  }
}

export function hasContentVisibility() {
  try {
    return typeof CSS !== 'undefined' && CSS.supports && CSS.supports('content-visibility', 'auto');
  } catch {
    return false;
  }
}

export function hasBackdropFilter() {
  try {
    return typeof CSS !== 'undefined' && CSS.supports && (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));
  } catch {
    return false;
  }
}

export function hasWillChange() {
  try {
    return typeof CSS !== 'undefined' && CSS.supports && CSS.supports('will-change', 'transform');
  } catch {
    return false;
  }
}

// Minimal polyfill hint: do not auto-load polyfills. Export helper for the app to
// decide whether to optionally load a small polyfill bundle in environments
// where the site must support older browsers. Keep logic here small and safe.
export function needsIOPolyfill() {
  return !hasIntersectionObserver();
}
