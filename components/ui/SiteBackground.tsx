// Site-wide decorative background with brand-aligned gradients and subtle motion.
// Pure CSS (no JS). Respects prefers-reduced-motion and pointer-events are disabled.
// This is rendered once in the root layout behind all content.

export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      {/* Base soft red/white gradient wash */}
      <div className="site-bg__wash" />
      {/* Slow floating blobs for a living feel (GPU-friendly transform only) */}
      <div className="site-bg__blob site-bg__blob--a" />
      <div className="site-bg__blob site-bg__blob--b" />
      {/* Fine grain to avoid flatness; extremely low opacity */}
      <div className="site-bg__noise" />
      {/* Edge vignette for subtle depth */}
      <div className="site-bg__vignette" />
    </div>
  );
}

// Intentionally only a named export. Consumers should import with { SiteBackground }.
