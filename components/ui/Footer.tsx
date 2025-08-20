"use client";
import * as React from "react";

export interface FooterProps {
  className?: string;
}

export function Footer() {
  const year = new Date().getFullYear();

  const clubName = "Mulsower SV 61";
  const addressLines = [
    "Garvensdorfer Weg 8",
    "18233 Carinerland",
  ];
  const email = "info@mulsower-sv.de";

  return (
    <footer
      role="contentinfo"
      aria-label="Website-Fußzeile mit Kontaktinformationen"
  className="site-footer site-footer--brand site-footer--force-white text-white"
    >
      <div className="mx-auto max-w-7xl px-3 py-2 md:py-1">
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

      <div className="text-left md:text-right">
    <div className="text-xs md:text-sm">
              <span className="font-medium">E-Mail:</span>{" "}
              <a
                href={`mailto:${email}`}
        className="underline"
                aria-label={`E-Mail senden an ${email}`}
              >
                {email}
              </a>
            </div>
          </div>
        </div>
  <div className="site-footer__meta mt-2 pt-1 flex flex-col md:flex-row md:items-center justify-between gap-1 text-xs md:text-sm">
          <div>
            © {year} {clubName}
          </div>
          <div>
  <a href="/impressum/" className="underline" aria-label="Impressum öffnen">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
