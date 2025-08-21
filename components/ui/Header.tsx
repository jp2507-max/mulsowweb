"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";
import { Image } from "./Image";
import { Button } from './Button';
import { siteConfig } from '@/app/config/site';
// secureRel not needed in Header since Button handles external rel generation

const navItems = [
  { label: "Spielplan", href: "/spielplan/" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft/" },
  { label: "Sponsoren", href: "/sponsoren/" },
] as const;

export function Header() {
  const pathname = usePathname() || "/";
  const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
  const headerRef = React.useRef<HTMLElement | null>(null);

  // Toggle a scrolled state using IntersectionObserver to avoid per-scroll work.
  // We observe a sentinel element rendered just after the Header in the layout.
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof window === 'undefined') return;

    const apply = (scrolled: boolean) => {
      el.toggleAttribute('data-scrolled', scrolled);
    };

    // Initial state (in case sentinel isn't available yet)
    try {
      const hh = Math.max(0, Math.round(el.getBoundingClientRect().height));
      apply(window.scrollY > hh - 1);
    } catch {
      apply((typeof window !== 'undefined' ? window.scrollY : 0) > 4);
    }

    const sentinel = document.getElementById('header-sentinel');
    if (sentinel && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        const e = entries[0];
        // When the sentinel leaves the viewport (scroll down), mark as scrolled
        apply(!e.isIntersecting);
      }, { threshold: 0 });
      try { obs.observe(sentinel); } catch {}

      return () => {
        try { obs.disconnect(); } catch {}
      };
    }

    // Fallback for very old browsers: throttle via rAF
    let raf = 0;
    const update = () => {
      raf = 0;
      apply((typeof window !== 'undefined' ? window.scrollY : 0) > 4);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', update, { once: true });
    return () => {
      window.removeEventListener('scroll', onScroll as EventListener);
      window.removeEventListener('load', update as EventListener);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
  <header className="header text-white" role="banner" ref={headerRef}>
        {/* GPU-friendly background overlay that fades in/out via opacity */}
        <div className="header-bg" aria-hidden="true" />
        <div className="header-container">
          <div className="header-content">
            <Link 
              href="/" 
              className="header-logo header-logo-interactive touch-feedback vt-logo"
              aria-label="Mulsower SV 61 - Zur Startseite"
            >
              <Image 
                src="/logo.svg" 
                alt="Mulsower SV 61 Vereinswappen" 
                className="header-logo-image"
                priority={true}
                width={64}
                height={64}
              />
              <span className="header-logo-text">
                Mulsower SV 61
              </span>
            </Link>

            {/* Center-aligned navigation with improved mobile layout */}
            <nav aria-label="Hauptnavigation" role="navigation" className="header-nav-wrap">
              <ul className="header-nav" role="list">
                {navItems.map((item) => {
                  // Normalize both the current pathname and the nav item's href so
                  // trailing-slash differences don't prevent a match. This keeps
                  // active-state behavior consistent for internal routes like
                  // "/spielplan" vs "/spielplan/".
                  const isActive = normalize(pathname) === normalize(item.href as string);
                  return (
                    <li key={String(item.href)} role="listitem">
                      <Link
                        href={(item.href as string) || '#'}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(
                          "header-nav-link",
                          isActive && "header-nav-link-active",
                          "touch-feedback"
                        )}
                      >
                          <span className="nav-link-underline">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right-side Fanshop CTA (external) - mobile optimized */}
            <div className="header-cta">
              <Button
                href={siteConfig.externalLinks.fanshop}
                target="_blank"
                variant="ghost"
                size="sm"
                className="btn-pill header-fanshop-btn white"
                aria-label="Fanshop - Öffnet externe Website"
              >
                {/* Compact icon wrapper (no hero-cta layout classes in header) */}
                <span className="fanshop-icon-wrap" aria-hidden="true">
                  <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fanshop-icon">
                    <path d="M6 7V6a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 7h-16l1.2 12.4A2 2 0 007.2 21h9.6a2 2 0 001.999-1.6L20 7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="fanshop-label">Fanshop</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
