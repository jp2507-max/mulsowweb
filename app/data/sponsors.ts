/**
 * Centralized sponsor data structure - Single source of truth
 * 
 * This is the ONLY source for sponsor data in the application.
 * No JSON alternatives or duplicate data sources should be created.
 * 
 * Future logo integration:
 * - Logos should be PNG/SVG format (not PDF)
 * - Store in /public/images/sponsors/ directory
 * - Reference as '/images/sponsors/sponsor-id.png'
 */

export interface Sponsor {
  /** Unique identifier for the sponsor */
  id: string;
  /** Display name of the sponsor */
  name: string;
  /** External website URL */
  url: string;
  /** Optional logo path - PNG/SVG format (to be added later) */
  logo?: string;
  /** Optional description for detailed sponsor pages */
  description?: string;
}

/**
 * Sponsor data array - placeholder entries with proper structure
 * These are example sponsors that demonstrate the data structure.
 * Real sponsor data should replace these entries.
 */
export const sponsors: Sponsor[] = [
  {
    id: 'autohaus-mueller',
    name: 'Autohaus Müller',
    url: 'https://example.com',
    description: 'Hauptsponsor der ersten Mannschaft seit 2018',
    // logo: '/images/sponsors/autohaus-mueller.png' - to be added later
  },
  {
    id: 'baeckerei-schmidt',
    name: 'Bäckerei Schmidt',
    url: 'https://example.com',
    description: 'Unterstützt unsere Jugendarbeit mit frischen Backwaren',
    // logo: '/images/sponsors/baeckerei-schmidt.png' - to be added later
  },
  {
    id: 'sparkasse-regional',
    name: 'Sparkasse Regional',
    url: 'https://example.com',
    description: 'Langjähriger Finanzpartner des Vereins',
    // logo: '/images/sponsors/sparkasse-regional.png' - to be added later
  },
  {
    id: 'gasthaus-zur-linde',
    name: 'Gasthaus zur Linde',
    url: 'https://example.com',
    description: 'Traditioneller Vereinstreffpunkt und Sponsor',
    // logo: '/images/sponsors/gasthaus-zur-linde.png' - to be added later
  },
  {
    id: 'elektro-weber',
    name: 'Elektro Weber',
    url: 'https://example.com',
    description: 'Technischer Partner für Flutlichtanlage',
    // logo: '/images/sponsors/elektro-weber.png' - to be added later
  },
  {
    id: 'landmaschinen-koch',
    name: 'Landmaschinen Koch',
    url: 'https://example.com',
    description: 'Unterstützt die Platzpflege mit Geräten',
    // logo: '/images/sponsors/landmaschinen-koch.png' - to be added later
  },
];

/**
 * Helper function to get sponsor by ID
 */
export function getSponsorById(id: string): Sponsor | undefined {
  return sponsors.find(sponsor => sponsor.id === id);
}

/**
 * Helper function to get sponsors for home page teaser (first 6)
 */
export function getHomepageSponsors(): Sponsor[] {
  return sponsors.slice(0, 6);
}

/**
 * Helper function to get all sponsors for the sponsors page
 */
export function getAllSponsors(): Sponsor[] {
  return sponsors;
}