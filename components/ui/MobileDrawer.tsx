"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cx } from "@/lib/utils/cx";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  navItems: readonly NavItem[];
  pathname: string;
  normalize: (path: string) => string;
};

export function MobileDrawer({ open, onClose, navItems, pathname, normalize }: MobileDrawerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll lock
  React.useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;

    // Lock scroll
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      // Unlock scroll
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [open]);

  // Handle escape key
  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!open) return;

    const drawer = document.querySelector(".mobile-drawer") as HTMLElement;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift+Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    
    // Focus first element when opened
    setTimeout(() => firstElement?.focus(), 100);

    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <div
        className="mobile-drawer-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Navigation</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Menü schließen"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="mobile-drawer-nav">
          <ul className="mobile-drawer-list">
            {navItems.map((item) => {
              const normalizedPath = normalize(pathname);
              const normalizedHref = normalize(item.href);
              const childMatch = item.children?.some(
                (child) => normalize(child.href) === normalizedPath
              );
              const isActive = normalizedPath === normalizedHref || childMatch;

              return (
                <li key={item.href} className="mobile-drawer-item">
                  <Link
                    href={item.href}
                    className={cx(
                      "mobile-drawer-link",
                      isActive && "mobile-drawer-link-active"
                    )}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mobile-drawer-sublist">
                      {item.children.map((child) => {
                        const isChildActive = normalize(child.href) === normalizedPath;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cx(
                                "mobile-drawer-sublink",
                                isChildActive && "mobile-drawer-sublink-active"
                              )}
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>,
    document.body
  );
}
