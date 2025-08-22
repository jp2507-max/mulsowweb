import { MetadataRoute } from 'next';
import { siteConfig } from '@/app/config/site';

// Required for static export
export const dynamic = 'force-static';

/**
 * Robots.txt configuration for Mulsower SV 61 website
 * Allows all crawlers with crawl delay to help with server load
 * References the dynamic sitemap for proper indexing
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      crawlDelay: 1,
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  host: siteConfig.baseUrl,
  };
}