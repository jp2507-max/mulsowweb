"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";

const navItems = [
  { label: "Spielplan", href: "/spielplan" },
  { label: "Sponsoren", href: "/sponsoren" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft" },
  { label: "Impressum", href: "/impressum" },
  // Fanshop handled by server redirect via .htaccess
  { label: "Fanshop", href: "/fanshop" },
] as const;

export function Header() {
  const pathname = usePathname() || "/";
  const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      <header className="header" role="banner">
        <div className="header-container">
          <div className="header-content">
            <Link 
              href="/" 
              className="header-logo"
              aria-label="Mulsower SV 61 - Zur Startseite"
            >
              <img 
                src="/logo.svg" 
                alt="Mulsower SV 61 Vereinswappen" 
                className="header-logo-image"
                loading="eager"
                width="40"
                height="40"
              />
              <span className="header-logo-text">
                Mulsower SV 61
              </span>
            </Link>

            <nav aria-label="Hauptnavigation" role="navigation">
              <ul className="header-nav" role="list">
                {navItems.map((item) => {
                  const isActive = normalize(pathname) === item.href;
                  return (
                    <li key={item.href} role="listitem">
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(
                          "header-nav-link",
                          isActive && "header-nav-link-active"
                        )}
                        {...(item.href === "/fanshop" && {
                          "aria-label": "Fanshop - Öffnet externe Website"
                        })}
                      >
                        {item.label}
                      </Link>
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
