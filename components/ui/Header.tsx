"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <header 
      style={{
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1rem 1.5rem'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <Link 
            href="/" 
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.5rem',
              textDecoration: 'none',
              borderRadius: '6px',
              padding: '0.25rem'
            }}
          >
            <span 
              style={{ 
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-heading)',
                color: '#0F172A'
              }}
            >
              Mulsower SV 61
            </span>
          </Link>

          <nav aria-label="Hauptnavigation">
            {/* Always-visible nav on small screens (no JS hamburger) */}
            <ul 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1.25rem)',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}
            >
              {navItems.map((item) => {
                const isActive = normalize(pathname) === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        transition: 'colors 0.2s',
                        color: isActive ? '#C1121F' : '#475569',
                        textDecoration: 'none',
                        borderBottom: isActive ? '2px solid #C1121F' : 'none',
                        fontWeight: isActive ? '600' : '400'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#0F172A';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = '#475569';
                        }
                      }}
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
  );
}

export default Header;
