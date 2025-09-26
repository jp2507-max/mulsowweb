"use client";
import * as React from "react";
import Link from "next/link";
import { siteConfig } from "../../app/config/site";
import { ExternalLink } from "./ExternalLink";

export interface FooterProps {
  className?: string;
}

export function Footer() {
  const year = new Date().getFullYear();

  const clubName = "Mulsower SV 61 e.V.";
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
      <div className="mx-auto max-w-7xl px-4 py-3 md:py-4">
        {/* Mobile-first: stack and center; desktop: two columns with right-aligned utilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start text-center md:text-left">
          <div className="md:text-left">
            <h2 className="text-xs md:text-sm font-semibold mb-0.5 font-heading">
              {clubName}
            </h2>
            <address className="not-italic text-xs md:text-sm leading-relaxed" aria-label="Vereinsadresse">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          </div>

          <div className="text-center md:text-right flex flex-col md:items-end gap-2">
            <div className="text-xs md:text-sm flex justify-center md:justify-end">
              <span className="sr-only">Kontakt</span>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-brand-primary border border-neutral-200 shadow-sm hover:bg-neutral-50 font-medium"
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
      <div className="text-xs md:text-sm flex flex-wrap items-center justify-center gap-2 md:justify-end">
              <span className="sr-only">Soziale Medien</span>
              <ExternalLink
                href={siteConfig.social.instagramMain.href}
                aria-label={siteConfig.social.instagramMain.label}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-brand-primary border border-neutral-200 shadow-sm hover:bg-neutral-50"
              >
                {/* Instagram Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="opacity-90"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span className="font-medium">Instagram</span>
              </ExternalLink>
              <ExternalLink
                href={siteConfig.social.instagramYouth.href}
                aria-label={siteConfig.social.instagramYouth.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-brand-primary border border-neutral-200 shadow-sm hover:bg-neutral-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                  aria-hidden="true"
                  className="opacity-90"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm6-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span className="font-medium">Nachwuchs</span>
              </ExternalLink>
            </div>
            <div className="text-xs md:text-sm mt-1 md:mt-0">
              <Link href="/impressum/" className="underline hover:text-white/90" aria-label="Impressum öffnen">
                Impressum
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__meta mt-2 pt-0 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-1 text-xs md:text-sm">
          <div>© {year} {clubName}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
