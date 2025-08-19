// animationErrorHandler.mjs
// Tiny, resilient helpers for animation error recovery and graceful degradation.
// Keep implementation minimal and safe for static export.

export function handleIntersectionObserverError(err) {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      console.warn('AnimationErrorHandler: IntersectionObserver failed, falling back to instant reveals', err);
    }
  } catch {
    // swallow
  }
}

export function makeAllRevealsVisible() {
  try {
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
  // Query separately for broader compatibility (e.g., very small DOM shims)
  const reveal = Array.from(document.querySelectorAll('.reveal'));
  const candidates = Array.from(document.querySelectorAll('.reveal-candidate'));
  const nodes = [...reveal, ...candidates];
  for (const el of nodes) {
      try { el.classList.add('reveal', 'in'); } catch { /* ignore */ }
    }
  } catch {
    // ignore
  }
}

export function handlePerformanceIssues() {
  // Development-only placeholder: can expand with frame monitoring
  try {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      console.debug('AnimationErrorHandler: performance monitoring is not active in production');
    }
  } catch { /* ignore */ }
}

export function initializeSafeReveal() {
  // Ensure .reveal markers are added only after DOM is ready. This prevents
  // content from being hidden before JavaScript runs. This function is
  // idempotent and safe to call multiple times.
  try {
    if (typeof document === 'undefined') return;

    const run = () => {
      try {
        const cands = document.querySelectorAll('.reveal-candidate');
        for (const el of cands) {
          if (!el.classList.contains('reveal')) el.classList.add('reveal');
        }
      } catch { /* ignore */ }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  } catch { /* ignore */ }
}
