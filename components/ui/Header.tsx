"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";
import { Image } from "./Image";
import { siteConfig } from '@/app/config/site';
import { secureRel } from '@/lib/utils/secure-rel';

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

            {/* Right-side Fanshop CTA (external) */}
            <div className="header-cta">
              <a
                href={siteConfig.externalLinks.fanshop}
                target="_blank"
                rel={secureRel(undefined, '_blank')}
                className="btn btn-sm btn-pill header-fanshop-btn touch-feedback"
                aria-label="Fanshop - Öffnet externe Website"
              >
                Fanshop
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
