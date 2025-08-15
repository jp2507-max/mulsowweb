"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { label: "Spielplan", href: "/spielplan" },
  { label: "Sponsoren", href: "/sponsoren" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft" },
  { label: "Impressum", href: "/impressum" },
  // Fanshop handled by server redirect via .htaccess
  { label: "Fanshop", href: "/fanshop" },
] as const;

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const pathname = usePathname() || "/";
  const normalize = (p: string) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);

  return (
    <header className={cx("border-b border-neutral-200 bg-white/80 backdrop-blur", className)}>
      <div className="container-site py-4 md:py-5">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="inline-flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-md">
            <span className="text-xl md:text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Mulsower SV 61</span>
          </Link>

          <nav aria-label="Hauptnavigation" className="">
            {/* Always-visible nav on small screens (no JS hamburger) */}
            <ul className="flex flex-wrap items-center gap-3 md:gap-5">
              {navItems.map((item) => {
                const isActive = normalize(pathname) === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cx(
                        "px-2 py-1 rounded-md text-sm md:text-base transition-colors",
                        "text-ink-secondary hover:text-ink-primary",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                        isActive && "text-brand-primary border-b-2 border-brand-primary"
                      )}
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
