/**
 * Presentation shared by the new Home Page and legacy heading document.
 */
import React from 'react';

import type { Content } from '@prismicio/client';
import { PrismicRichText, SliceZone } from '@prismicio/react';

import { components } from '../slices';

export type HomePageDocument = Content.HomePageDocument | Content.Heading1Document;

/**
 * Render a page heading followed by any configured slices.
 * @param props - The fetched Prismic page document.
 * @returns The main page content.
 */
export default function HomePage({ page }: { page: HomePageDocument }) {
  return (
    <main>
      <PrismicRichText field={page.data.heading} />
      <SliceZone slices={'slices' in page.data ? page.data.slices : []} components={components} />
    </main>
  );
}
