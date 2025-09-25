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
 * Sponsor data array - to be populated with real sponsor entries
 */
export const sponsors: Sponsor[] = [
  {
    id: 'voss-energy',
    name: 'Voss Energy',
    url: 'https://www.vossenergy.com/',
    description: 'langjähriger und verlässlicher Partner des Vereins',
    logo: '/images/sponsors/VE-Logo.svg',
  },
];

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