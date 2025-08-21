import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageFadeController } from "@/components/utility/PageFadeController";
import { ScrollRevealController } from "@/components/utility/ScrollRevealController";
import { OptimizedHoverController } from "@/components/utility/OptimizedHoverController";
import { OptimizedBlobController } from "@/components/utility/OptimizedBlobController";
import { SmoothScrollInit } from "@/components/utility/SmoothScroll";
import HeaderOffsetSync from "@/components/utility/HeaderOffsetSync";
import { PerformanceOptimizer, PerformanceMonitorWrapper } from "@/components/utility/PerformanceOptimizer";
import DeviceMotion from "@/components/utility/DeviceMotion";
import FocusReveal from "@/components/utility/FocusReveal";
import { generatePageMetadata } from "./config/site";
import { SiteBackground } from "@/components/ui/SiteBackground";
import InteractiveSpotlight from "@/components/ui/InteractiveSpotlight";
import ViewTransitionRouter from "@/components/utility/ViewTransitionRouter";
import { ScrollProvider } from "@/components/ScrollProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Optimal for CLS - shows fallback immediately, swaps when loaded
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true, // Automatically adjust fallback metrics to match web font
});

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap', // Optimal for CLS - shows fallback immediately, swaps when loaded
  variable: '--font-oswald',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true, // Automatically adjust fallback metrics to match web font
});

export const metadata: Metadata = {
  ...generatePageMetadata({}),
  // Favicon and app icons
  icons: {
    // Prefer the club logo assets so the browser tab shows the club emblem.
    icon: [
      { url: '/logo-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/logo-256.png', sizes: '256x256', type: 'image/png' },
      { url: '/logo-512.png', sizes: '512x512', type: 'image/png' },
      // favicon.ico kept for legacy support
      { url: '/favicon.ico' }
    ],
    apple: [
      // keep the existing apple touch icon (180x180)
      { url: '/apple-touch-icon-180.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      // small PNG fallbacks and the SVG logo (scales crisply in supporting browsers)
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' }
    ]
  },
  // Web app manifest (for PWA features)
  manifest: '/manifest.json'
};

// Viewport configuration for proper mobile rendering
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-bg="brand" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <PerformanceOptimizer />
  {/* Cross-document View Transitions for smooth static page changes */}
  <meta name="view-transition" content="same-origin" />
      </head>
      <body className={`${inter.className} antialiased`}>
  {/* Lightweight, CSS-driven reading progress bar */}
  <div className="reading-progress" aria-hidden="true" />
  <a href="#main" className="skip-link sr-only focusable">Zum Inhalt springen</a>
  <DeviceMotion />
        {/* Global decorative background (non-interactive, behind all content) */}
        <SiteBackground />
  {/* Desktop-only interactive ambience: moving stadium-light spotlight */}
  <InteractiveSpotlight />
        <PageFadeController />
  <ScrollRevealController />
  <OptimizedHoverController />
  <OptimizedBlobController />
    <FocusReveal />
    {/* Initialize header offset sync so native hash navigation and
      scrollIntoView targets get automatically offset for a sticky header. */}
    <HeaderOffsetSync headerSelector=".header" />
    {/* Initialize small smooth scroll helper for same-page anchors. This
      is static-export safe — the component is a "use client" module and
      will only run in the browser. */}
    <SmoothScrollInit />
  {/* Enable SPA view transitions where supported to complement cross-document meta */}
  <ViewTransitionRouter />
        <ScrollProvider>
          <Header />
          {/* Sentinel used by the Header's IntersectionObserver to toggle scrolled state */}
          <div id="header-sentinel" aria-hidden="true" style={{ blockSize: '1px', inlineSize: '1px' }} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <PerformanceMonitorWrapper />
        </ScrollProvider>
      </body>
    </html>
  );
}
