"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";
import { Image } from "./Image";
import { Button } from './Button';
import { siteConfig } from '@/app/config/site';
// secureRel not needed in Header since Button handles external rel generation

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

const navItems: readonly NavItem[] = [
  { label: "Spielplan", href: "/spielplan/" },
  {
    label: "Unsere Aktiven",
    href: "/unsere-aktiven/",
    children: [
      { label: "Herrenmannschaft", href: "/unsere-aktiven/herrenmannschaft/" },
      { label: "Junioren", href: "/unsere-aktiven/junioren/" },
      { label: "Sportgruppen", href: "/unsere-aktiven/sportgruppen/" },
    ],
  },
  { label: "Mitgliedschaft", href: "/mitgliedschaft/" },
  { label: "Sponsoren", href: "/sponsoren/" },
];

export function Header() {
  const pathname = usePathname() || "/";
  const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
  <header
        className="header text-white"
        role="banner"
        ref={headerRef}
        style={{ overflow: "visible" }}
      >
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
                  const normalizedPath = normalize(pathname);
                  const normalizedHref = normalize(item.href);
                  const childMatch = item.children?.some((child) => normalize(child.href) === normalizedPath);
                  const isActive = normalizedPath === normalizedHref || childMatch;
                  const menuId = normalize(item.href);
                  const isOpen = item.children ? openMenu === menuId : false;
                  return (
                    <li
                      key={item.href}
                      role="listitem"
                      className="relative"
                      onMouseEnter={() => {
                        if (item.children) setOpenMenu(menuId);
                      }}
                      onMouseLeave={() => {
                        if (item.children) setOpenMenu(null);
                      }}
                      onFocus={() => {
                        if (item.children) setOpenMenu(menuId);
                      }}
                      onBlur={(event) => {
                        if (!item.children) return;
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          setOpenMenu(null);
                        }
                      }}
                    >
                      <Link
                        href={item.href || '#'}
                        aria-current={isActive ? "page" : undefined}
                        className={cx(
                          "header-nav-link",
                          item.children && "flex items-center gap-1.5",
                          isActive && "header-nav-link-active",
                          "touch-feedback"
                        )}
                        aria-haspopup={item.children ? "menu" : undefined}
                        aria-expanded={item.children ? (isOpen ? "true" : "false") : undefined}
                        {...(item.children && {
                          'aria-controls': `${menuId}-submenu`,
                          onClick: (e: React.MouseEvent) => {
                            e.preventDefault();
                            setOpenMenu(isOpen ? null : menuId);
                          },
                          onKeyDown: (e: React.KeyboardEvent) => {
                            if (e.key === "Escape") setOpenMenu(null);
                          }
                        })}
                      >
                        <span className="nav-link-underline">{item.label}</span>
                        {item.children ? (
                          <span
                            className={cx(
                              "ml-1 grid h-3.5 w-3.5 place-items-center text-white/80 transition-transform duration-200 ease-out",
                              isOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M3 4.5L6 7.5L9 4.5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </Link>
                      {item.children?.length ? (
                        <ul
                          id={`${menuId}-submenu`}
                          className={cx(
                            "absolute left-0 top-full z-30 min-w-[14rem] rounded-xl border border-white/30 bg-white/95 p-2 text-ink-primary shadow-xl backdrop-blur-xl transition duration-200 ease-out md:left-1/2 md:-translate-x-1/2",
                            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                          )}
                          aria-hidden={isOpen ? undefined : "true"}
                        >
                          {item.children.map((child) => {
                            const isChildActive = normalize(child.href) === normalizedPath;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cx(
                                    "block rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-primary transition-colors duration-200 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none",
                                    isChildActive && "bg-brand-light/60 text-brand-secondary",
                                    "touch-feedback"
                                  )}
                                  aria-current={isChildActive ? "page" : undefined}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
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
