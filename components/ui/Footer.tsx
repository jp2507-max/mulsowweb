"use client";
import * as React from "react";
import Link from "next/link";

export interface FooterProps {
  className?: string;
}

export function Footer() {
  const year = new Date().getFullYear();

  const clubName = "Mulsower SV 61";
  const addressLines = [
  "Garvensdorfer Weg 10",
    "18233 Carinerland",
  ];
  const email = "info@mulsower-sv.de";

  return (
    <footer
      role="contentinfo"
      aria-label="Website-Fußzeile mit Kontaktinformationen"
  className="site-footer site-footer--brand site-footer--force-white text-white"
    >
      <div className="mx-auto max-w-7xl px-3 py-1 md:py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-start">
          <div>
            <h2 className="text-xs md:text-sm font-semibold mb-0.5 font-heading">
              {clubName}
            </h2>
            <address className="not-italic text-xs md:text-sm leading-relaxed" aria-label="Vereinsadresse">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          </div>

          <div className="text-left md:text-right flex flex-col md:items-end gap-1">
            <div className="text-xs md:text-sm">
              <span className="sr-only">Kontakt</span>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white font-medium underline-offset-2"
                aria-label={`E-Mail senden an ${email}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0"
                >
                  <path d="M3 6.5l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 8.5v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm">{email}</span>
              </a>
            </div>
            <div className="text-xs md:text-sm">
              <Link href="/impressum/" className="underline hover:text-white/90" aria-label="Impressum öffnen">
                Impressum
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__meta mt-1 pt-0 flex flex-col md:flex-row md:items-center justify-between gap-1 text-xs md:text-sm">
          <div>
            © {year} {clubName}
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
