/**
 * Fetch and render the published singleton Home Page.
 */
import { cache } from 'react';

import { NotFoundError } from '@prismicio/client';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import HomePage from '../components/HomePage';
import type { HomePageDocument } from '../components/HomePage';

import { site } from '../data/site';

import { create_client } from '../prismicio';

/**
 * Share one Prismic read between metadata and rendering within each server request.
 * @returns The published or preview home document, with normal 404/error handling.
 */
const get_home_page = cache(async function load_home_page() {
  const client = create_client();

  try {
    return await client.getSingle('home_page');
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }
});

/**
 * Resolve editable SEO text with useful defaults for empty Prismic fields.
 * @param options - The current homepage document.
 * @returns The title and description shared by search, social tags, and structured data.
 */
function get_seo_copy({ page }: { page: HomePageDocument }) {
  return {
    title: page.data.meta_title?.trim() || site.title,
    description: page.data.meta_description?.trim() || site.description
  };
}

/**
 * Render canonical, Open Graph, and Twitter metadata from the server-loaded document.
 * @returns Homepage metadata, excluding draft previews from search indexing.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await get_home_page();
  const { title, description } = get_seo_copy({ page });
  const { isEnabled: is_preview } = await draftMode();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: '/' },
    robots: { index: !is_preview, follow: !is_preview },
    openGraph: {
      type: 'website',
      title,
      description,
      url: '/',
      siteName: site.name,
      locale: 'en_US',
      images: [site.social_image]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: site.social_image.url, alt: site.social_image.alt }]
    }
  };
}

/**
 * Render the homepage and factual structured data describing the portfolio and its owner.
 * @returns Server-rendered content and safely serialized JSON-LD.
 */
export default async function Page() {
  const page = await get_home_page();
  const { title, description } = get_seo_copy({ page });
  const person_id = new URL('#person', site.url).href;
  const website_id = new URL('#website', site.url).href;
  const structured_data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': person_id,
        name: site.author,
        alternateName: site.name,
        url: site.url.href,
        jobTitle: 'Forward Deploy Engineer & Devsigner',
        email: 'nicholasbydesign@gmail.com',
        sameAs: site.social_profiles,
        knowsAbout: [
          'UI/UX development',
          'Full-stack engineering',
          'Process automation',
          'AI integration'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vancouver',
          addressRegion: 'WA',
          addressCountry: 'US'
        }
      },
      {
        '@type': 'WebSite',
        '@id': website_id,
        url: site.url.href,
        name: site.name,
        description,
        inLanguage: 'en-US',
        publisher: { '@id': person_id }
      },
      {
        '@type': 'ProfilePage',
        '@id': new URL('#webpage', site.url).href,
        url: site.url.href,
        name: title,
        description,
        inLanguage: 'en-US',
        dateModified: page.last_publication_date,
        isPartOf: { '@id': website_id },
        mainEntity: { '@id': person_id }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured_data).replace(/</g, '\\u003c')
        }}
      />
      <HomePage page={page} />
    </>
  );
}
