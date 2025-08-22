/**
 * Centralized site configuration for Mulsower SV 61 website
 * Single source of truth for all site metadata, URLs, and configuration
 */

export const siteConfig = {
  // Base URL for the website (used for canonical URLs, sitemap, etc.)
  baseUrl: 'https://mulsower-sv.de',
  
  // Site metadata
  name: 'Mulsower SV 61',
  description: 'Offizieller Internetauftritt des Mulsower SV 61 - Amateurfußballverein aus Mecklenburg-Vorpommern',
  
  // Language and locale configuration
  locale: 'de_DE',
  language: 'de',
  
  // Open Graph configuration
  ogImage: '/og-msv61-redwhite-1200x630.png', // Single OG image for all pages (1200x630px recommended)
  
  // Contact information
  contact: {
    email: 'info@mulsower-sv.de',
    address: {
      street: 'Garvensdorfer Weg 10',
      city: '18233 Carinerland',
      country: 'Deutschland'
    }
  },
  
  // External links
  externalLinks: {
    fussballDe: 'https://www.fussball.de/verein/mulsower-sv-61-mecklenburg-vorpommern/-/id/00ES8GNBNG000024VV0AG08LVUPGND5I#!/',
    fanshop: 'https://msv61.fan12.de/'
  },

  // Social media profiles
  social: {
    instagramMain: {
      label: 'Instagram – Mulsower SV 61',
      href: 'https://www.instagram.com/mulsower_sv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    },
    instagramYouth: {
      label: 'Instagram – Nachwuchs',
      href: 'https://www.instagram.com/mulsower_sv.nachwuchs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
    }
  },
  
  // Navigation structure
  navigation: [
    { name: 'Spielplan', href: '/spielplan' },
    { name: 'Sponsoren', href: '/sponsoren' },
    { name: 'Mitgliedschaft', href: '/mitgliedschaft' },
    { name: 'Fanshop', href: '/fanshop', external: true }
  ],
  
  // SEO and metadata defaults
  defaultMetadata: {
    title: 'Mulsower SV 61',
    description: 'Offizieller Internetauftritt des Mulsower SV 61 - Amateurfußballverein aus Mecklenburg-Vorpommern',
    keywords: ['Mulsower SV 61', 'Fußball', 'Amateurfußball', 'Mecklenburg-Vorpommern', 'Verein'] as string[],
    author: 'Mulsower SV 61',
    robots: 'index, follow'
  },

  // Feature flags and UI options
  features: {
    // Animated logo feature removed — keep flags for future use but disabled.
    animatedLogo: false,
    riveLogoSrc: undefined,
  }
} as const;

/**
 * Generate metadata for a specific page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage = siteConfig.ogImage
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description || siteConfig.defaultMetadata.description;
  const canonicalPath =
    !path || path === '/'
      ? '/'
      : (path.endsWith('/') ? path : `${path}/`);
  const canonicalUrl = `${siteConfig.baseUrl}${canonicalPath}`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.defaultMetadata.keywords,
    authors: [{ name: siteConfig.defaultMetadata.author }],
    robots: siteConfig.defaultMetadata.robots,
    
    // Open Graph metadata
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${pageDescription}`,
        }
      ],
      locale: siteConfig.locale,
      type: 'website',
    },
    
    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${siteConfig.baseUrl}${ogImage}`],
    },
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
      },
    },
    
    // Additional metadata
    other: {
      'og:locale': siteConfig.locale,
    }
  };
}

export function absoluteUrl(path: string) {
  const normalized = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
  return `${siteConfig.baseUrl}${normalized}`;
}

/**
 * Type definitions for site configuration
 */
export type SiteConfig = typeof siteConfig;
export type NavigationItem = typeof siteConfig.navigation[number];