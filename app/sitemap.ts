import { MetadataRoute } from 'next';
import { siteConfig } from '@/app/config/site';

// Required for static export
export const dynamic = 'force-static';

/**
 * Dynamic sitemap generation for Mulsower SV 61 website
 * Uses centralized base URL from site configuration
 * Includes all static pages with proper URL structure for static export
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/spielplan/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sponsoren/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mitgliedschaft/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/impressum/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}