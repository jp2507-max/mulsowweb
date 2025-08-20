/**
 * Small, dependency-free device capability utilities.
 * Keep implementation minimal and safe for static export + server-side import.
 */
export function isClient(): boolean {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
}

export function supportsHover(): boolean {
  try {
    if (!isClient()) return false;
    return window.matchMedia?.('(hover: hover)').matches === true;
  } catch {
    return false;
  }
}

export function isTouchDevice(): boolean {
  try {
    if (!isClient()) return false;
    // Prefer pointer coarse + no-hover detection, fall back to ontouchstart
    const coarse = window.matchMedia?.('(pointer: coarse)').matches === true;
    const noHover = window.matchMedia?.('(hover: none)').matches === true;
    const touchEvent = 'ontouchstart' in window;
    return coarse || noHover || touchEvent;
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  try {
    if (!isClient()) return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
  } catch {
    return false;
  }
}

export function saveData(): boolean {
  try {
    if (!isClient()) return false;
    // Some browsers expose navigator.connection; guard access
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    return !!(nav.connection && nav.connection.saveData === true);
  } catch {
    return false;
  }
}

export function isLowMemory(): boolean {
  try {
    if (!isClient()) return false;
    // deviceMemory is a hint (in GB). Treat <= 4 as low memory per requirements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigator as any;
    return typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  } catch {
    return false;
  }
}

export function shouldReduceAnimations(): boolean {
  // Combine explicit reduced-motion, save-data, and low-memory heuristics
  return prefersReducedMotion() || saveData() || isLowMemory();
}

// Additional feature detection helpers for broader compatibility checks
export function supportsIntersectionObserver(): boolean {
  try {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window;
  } catch {
    return false;
  }
}

export function supportsContentVisibility(): boolean {
  try {
    return typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.supports && CSS.supports('content-visibility', 'auto');
  } catch {
    return false;
  }
}

export function supportsBackdropFilter(): boolean {
  try {
    return typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.supports && (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'));
  } catch {
    return false;
  }
}

export function supportsWillChange(): boolean {
  try {
    return typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.supports && CSS.supports('will-change', 'transform');
  } catch {
    return false;
  }
}
