import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import config from './prismic.config.json';

export const repositoryName = config.repositoryName;

export function createClient(options: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes: config.routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions: { cache: 'no-store' },
    ...options,
  });

  enableAutoPreviews({ client });
  return client;
}

export type PrismicClient = ReturnType<typeof createClient>;
