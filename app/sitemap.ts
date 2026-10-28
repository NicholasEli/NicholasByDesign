/**
 * Canonical sitemap containing public, indexable page routes.
 */
import type { MetadataRoute } from 'next';

import { site } from '../data/site';

/**
 * List the homepage without redirects, API routes, or editor-only previews.
 * @returns The current set of canonical public page URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url.href }];
}
