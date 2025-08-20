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

  // Toggle a scrolled state for stronger bg/shadow once the page is scrolled a bit
  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const scrolled = (typeof window !== 'undefined' ? window.scrollY : 0) > 4;
      el.toggleAttribute('data-scrolled', scrolled);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // initial
    update();
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

            {/* Center-aligned navigation */}
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

            {/* Right-side Fanshop CTA (external) - reuse hero CTA styles for consistency */}
            <div className="header-cta">
              <Button
                href={siteConfig.externalLinks.fanshop}
                target="_blank"
                variant="ghost"
                size="sm"
                className="btn-pill header-fanshop-btn hero-cta white"
                aria-label="Fanshop - Öffnet externe Website"
              >
                {/* Use hero CTA icon structure so the Fanshop CTA matches other CTAs */}
                <span className="hero-cta-icon fanshop-icon-wrap" aria-hidden="true">
                  <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="fanshop-icon">
                    <path d="M6 7V6a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 7h-16l1.2 12.4A2 2 0 007.2 21h9.6a2 2 0 001.999-1.6L20 7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="fanshop-label hero-cta-label">Fanshop</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
