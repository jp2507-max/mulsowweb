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
  /** External website URL (if available) */
  url?: string;
  /** Optional logo path - PNG/SVG format (to be added later) */
  logo?: string;
  description?: string;
}
/**
 * Sponsor data array - to be populated with real sponsor entries
 */
export const sponsors: Sponsor[] = [
  {
    id: 'ing-froehlich',
    name: 'Ing. Fröhlich',
    url: 'https://ing-froehlich.com/',
    description: 'Sponsor unserer Fußbälle',
    logo: '/images/sponsors/Ing. Fröhlich_Logo.svg',
  },
  {
    id: 'eno-energy',
    name: 'Eno Energy',
    url: 'https://www.eno-energy.com/',
    description: 'langjähriger Sponsor des Vereins',
    logo: '/images/sponsors/Eno_Energy_Logo.png',
  },
  {
    id: 'haffdroom',
    name: 'Haffdroom',
    url: 'https://www.haffdroom.de/',
    description: 'langjähriger Sponsor des Vereins',
    logo: '/images/sponsors/Haffdroom.png',
  },
  {
    id: 'voss-energy',
    name: 'Voss Energy',
    url: 'https://www.vossenergy.com/',
    description: 'langjähriger und verlässlicher Partner des Vereins',
    logo: '/images/sponsors/VE-Logo.svg',
  },
  {
    id: 'dirk-huelsmann-immobilien',
    name: 'Dirk Hülsmann Immobilien',
    url: 'https://www.immobilien-dh.de/',
    description: 'langjähriger Partner der Sportgruppen',
    logo: '/images/sponsors/dirk-huelsmann-immobilien.jpg',
  },
  {
    id: 'ostseesparkasse-rostock',
    name: 'Ostseesparkasse Rostock',
    url: 'https://www.ospa.de/de/home/ihre-sparkasse/gut-fuer-die-region.html?n=true&stref=hnav',
    description: 'langjähriger Sponsor des Vereins',
    logo: '/images/sponsors/ospa-final-rgb-rot.jpg',
  },
  {
    id: 'tischlerei-timm',
    name: 'Tischlerei Timm',
    url: 'https://www.tischlerei-timm.com/',
    description: 'Sponsoring der Trainingsanzüge für den Mulsower SV',
    logo: '/images/sponsors/logo-tischlerei-timm-1.png',
  },
  {
    id: 'dachdeckerbetrieb-martin-nerstheimer',
    name: 'Dachdeckerbetrieb Martin Nerstheimer',
    url: 'https://dach-nerstheimer.de/',
    description: 'Ansprechpartner für Instandhaltung der Sportanlage',
    logo: '/images/sponsors/dachdecker-nerstheimer-logo-web.png',
  },
  {
    id: 'firma-olaf-steffen',
    name: 'Firma Olaf Steffen',
    description: 'Sponsor unserer Trainingsanzüge',
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