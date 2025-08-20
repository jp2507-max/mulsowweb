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
  { label: "Sponsoren", href: "/sponsoren/" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft/" },
  { label: "Impressum", href: "/impressum/" },
  // Fanshop is an external link — open in new tab to avoid client-side routing to a missing internal page
  { label: "Fanshop", href: siteConfig.externalLinks.fanshop, external: true },
] as const;

export function Header() {
  const pathname = usePathname() || "/";
  const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      <header className="header" role="banner">
        <div className="header-container">
          <div className="header-content">
            <Link 
              href="/" 
              className="header-logo header-logo-interactive touch-feedback"
              aria-label="Mulsower SV 61 - Zur Startseite"
            >
              <Image 
                src="/logo.svg" 
                alt="Mulsower SV 61 Vereinswappen" 
                className="header-logo-image"
                priority={true}
                width={40}
                height={40}
              />
              <span className="header-logo-text">
                Mulsower SV 61
              </span>
            </Link>

            <nav aria-label="Hauptnavigation" role="navigation">
              <ul className="header-nav" role="list">
                {navItems.map((item) => {
                  // Normalize both the current pathname and the nav item's href so
                  // trailing-slash differences don't prevent a match. This keeps
                  // active-state behavior consistent for internal routes like
                  // "/spielplan" vs "/spielplan/".
                  const isActive = normalize(pathname) === normalize(item.href as string);
                  return (
                    <li key={String(item.href)} role="listitem">
                      {item.href && typeof item.href === 'string' && item.href.startsWith('http') ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel={secureRel(undefined, '_blank')}
                          className={cx(
                            "header-nav-link",
                            isActive && "header-nav-link-active",
                            "touch-feedback"
                          )}
                          aria-label={item.label === 'Fanshop' ? 'Fanshop - Öffnet externe Website' : undefined}
                        >
                          {item.label}
                        </a>
                      ) : (
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
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
