/**
 * Fetch and render the published singleton Home Page.
 */
import { NotFoundError } from '@prismicio/client';
import { notFound } from 'next/navigation';

import HomePage from '../components/HomePage';

import { create_client } from '../prismicio';

/**
 * Fetch the homepage content and render a 404 when no document is published.
 * @returns The server-rendered home page.
 */
export default async function Page() {
  const client = create_client();

  try {
    const page = await client.getSingle('home_page');
    return <HomePage page={page} />;
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}
