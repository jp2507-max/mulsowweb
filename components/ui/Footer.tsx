"use client";
import * as React from "react";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  const clubName = "Mulsower SV 61";
  const addressLines = [
    "Garvensdorfer Weg 8",
    "18233 Carinerland",
  ];
  const email = "info@mulsower-sv.de";

  return (
    <footer aria-label="Fußzeile" className={className}>
      <div className="border-t border-neutral-200 bg-white/70 backdrop-blur">
        <div className="container-site py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div>
              <h2 className="text-lg md:text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                {clubName}
              </h2>
              <address className="not-italic mt-2 text-sm md:text-base text-ink-secondary">
                {addressLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </address>
            </div>
            <div className="md:text-right">
              <div className="text-sm md:text-base text-ink-secondary">
                <span className="font-medium">E-Mail:</span>{" "}
                <a
                  href={`mailto:${email}`}
                  className="underline hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-ink-tertiary">
            <div>
              © {year} {clubName}
            </div>
            <div>
              {/* Add any subtle legal links here later if needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
