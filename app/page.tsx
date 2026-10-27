import { NotFoundError } from '@prismicio/client';
import { notFound } from 'next/navigation';
import HomePage from '../components/HomePage';
import { createClient } from '../prismicio';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('home_page').catch(async (error) => {
    if (!(error instanceof NotFoundError)) throw error;
    // Keep the existing page working until a Home Page is published in Prismic.
    return client.getSingle('heading1');
  }).catch((error) => {
    if (error instanceof NotFoundError) notFound();
    throw error;
  });

  return <HomePage page={page} />;
}
