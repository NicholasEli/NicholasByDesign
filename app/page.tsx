/**
 * Render the published home page, falling back to the legacy heading document.
 */
import { NotFoundError } from '@prismicio/client';
import { notFound } from 'next/navigation';

import HomePage from '../components/HomePage';

import { create_client } from '../prismicio';

/**
 * Fetch the current homepage content and render a 404 only when both types are empty.
 * @returns The server-rendered home page.
 */
export default async function Page() {
  const client = create_client();

  try {
    const page = await client.getSingle('home_page');
    return <HomePage page={page} />;
  } catch (error) {
    if (!(error instanceof NotFoundError)) throw error;
  }

  try {
    const page = await client.getSingle('heading1');
    return <HomePage page={page} />;
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
}
