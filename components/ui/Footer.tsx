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
      aria-label="Fußzeile"
      style={{
        borderTop: '1px solid #E2E8F0',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(2.5rem, 8vw, 3.5rem) 1.5rem'
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(2rem, 6vw, 2.5rem)'
          }}
        >
          <div>
            <h2 
              style={{ 
                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                fontWeight: '600',
                fontFamily: 'var(--font-heading)',
                color: '#0F172A',
                marginBottom: '0.5rem'
              }}
            >
              {clubName}
            </h2>
            <address 
              style={{ 
                fontStyle: 'normal',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                color: '#475569',
                lineHeight: '1.5'
              }}
            >
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          </div>
          <div 
            style={{
              textAlign: 'left'
            }}
            className="md:text-right"
          >
            <div 
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                color: '#475569'
              }}
            >
              <span style={{ fontWeight: '500' }}>E-Mail:</span>{" "}
              <a
                href={`mailto:${email}`}
                style={{
                  textDecoration: 'underline',
                  color: '#475569',
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0F172A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#475569';
                }}
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        <div 
          style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.875rem',
            color: '#94A3B8'
          }}
          className="md:flex-row md:items-center"
        >
          <div>
            © {year} {clubName}
          </div>
          <div>
            {/* Add any subtle legal links here later if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
