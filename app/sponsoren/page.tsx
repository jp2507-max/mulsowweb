import { Metadata } from 'next';
import { getAllSponsors } from '../data/sponsors';
import { ExternalLink } from '../../components/ui/ExternalLink';
import { generatePageMetadata } from '../config/site';

export const dynamic = "error";

export const metadata: Metadata = generatePageMetadata({
  title: "Unsere Sponsoren & Partner",
  description: "Unsere Sponsoren und Partner unterstützen den Mulsower SV 61. Erfahren Sie mehr über die lokalen Unternehmen, die unseren Amateurfußballverein fördern.",
  path: "/sponsoren"
});

export default function SponsorsPage() {
  const sponsors = getAllSponsors();

  return (
    <main className="min-h-screen bg-neutral-50" role="main">
      {/* Hero Section */}
      <section className="bg-white border-b border-neutral-200" aria-labelledby="sponsors-page-title">
        <div className="container-site py-16 md:py-20 lg:py-24" id="main-content">
          <div className="text-center max-w-4xl mx-auto">
            <h1 id="sponsors-page-title" className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-ink-primary mb-6">
              Unsere Sponsoren
            </h1>
            <p className="text-lg md:text-xl text-ink-secondary leading-relaxed">
              Wir danken allen Sponsoren und Partnern für ihre wertvolle Unterstützung. 
              Ohne sie wäre die Arbeit des Mulsower SV 61 nicht möglich.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Grid Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container-site">
          {/* Responsive sponsor grid - 2-3-4 columns as specified */}
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            role="list"
            aria-label="Liste aller Sponsoren"
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="animate-fadeInUp"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                role="listitem"
              >
                <ExternalLink 
                  href={sponsor.url} 
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-2xl"
                  aria-label={`${sponsor.name} - Sponsor-Website besuchen`}
                >
                  {/* Detailed sponsor card with modern hover effects */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-brand-light group-hover:shadow-xl group-hover:scale-105 group-hover:border-brand-light">
                    {/* Logo placeholder with sponsor initial */}
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      aria-hidden="true"
                    >
                      <span 
                        className="text-white font-bold text-2xl md:text-3xl"
                        aria-hidden="true"
                      >
                        {sponsor.name.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Sponsor name */}
                    <h2 className="font-bold text-ink-primary text-lg md:text-xl mb-3 text-center group-hover:text-brand-primary transition-colors duration-300 font-heading">
                      {sponsor.name}
                    </h2>
                    
                    {/* Sponsor description */}
                    {sponsor.description && (
                      <p className="text-sm md:text-base text-ink-secondary text-center leading-relaxed flex-grow">
                        {sponsor.description}
                      </p>
                    )}

                    {/* External link indicator */}
                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-center text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                      <span className="text-sm font-medium mr-2">Website besuchen</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        role="img"
                        aria-label="Externer Link"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </ExternalLink>
              </div>
            ))}
          </div>

          {/* Call to action for potential sponsors */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-ink-primary mb-4">
                Werden Sie unser Partner
              </h2>
              <p className="text-lg text-ink-secondary mb-8 leading-relaxed">
                Interessiert an einer Partnerschaft mit dem Mulsower SV 61? 
                Kontaktieren Sie uns für weitere Informationen über Sponsoring-Möglichkeiten.
              </p>
              <a
                href="/mitgliedschaft/"
                className="btn btn-lg btn-primary hover:scale-105 active:scale-95"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
