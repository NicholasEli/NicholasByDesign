/**
 * Home Page presentation with a fixed hero and editor-managed sections.
 */
import React from 'react';

import type { Content } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

import HomeHero from './HomeHero';
import SiteFooter from './SiteFooter';

import { components } from '../slices';

export type HomePageDocument = Content.HomePageDocument;

/**
 * Render the homepage hero and configured slices, followed by the site footer.
 * @param props - The fetched Prismic page document.
 * @returns The main page content.
 */
export default function HomePage({ page }: { page: HomePageDocument }) {
  return (
    <>
      <main>
        <HomeHero description={page.data.hero_description} />
        <SliceZone slices={page.data.slices} components={components} />
      </main>
      <SiteFooter />
    </>
  );
}
