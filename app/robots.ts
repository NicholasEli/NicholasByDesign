/**
 * Search crawler rules for the public site and its canonical sitemap.
 */
import type { MetadataRoute } from 'next';

import { site } from '../data/site';

/**
 * Allow public content to be crawled while excluding API endpoints.
 * @returns The site's robots.txt rules and sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: new URL('/sitemap.xml', site.url).href
  };
}
