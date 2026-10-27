/**
 * Shared Prismic client configuration for server-rendered pages and previews.
 */
import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

import prismic_config from './prismic.config.json';

export const repository_name = prismic_config.repositoryName;

/**
 * Create a server-side client with optional SDK configuration overrides.
 * @param options - Prismic client options passed as an object.
 * @returns A client configured for published content and automatic previews.
 */
export function create_client(options: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repository_name, {
    routes: prismic_config.routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions: { cache: 'no-store' },
    ...options
  });

  enableAutoPreviews({ client });
  return client;
}

// Preserve the names used by Prismic's generated setup and page templates.
export { create_client as createClient, repository_name as repositoryName };

export type PrismicClient = ReturnType<typeof create_client>;
