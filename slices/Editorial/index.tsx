/**
 * Editorial slice layout for rich text and an optional image.
 */
import React from 'react';

import { isFilled } from '@prismicio/client';
import type { Content } from '@prismicio/client';
import { PrismicImage, PrismicRichText, type SliceComponentProps } from '@prismicio/react';

/**
 * Render the fields supplied by a shared Editorial slice.
 * @param props - Prismic slice data and SliceZone rendering context.
 * @returns An editorial article with its heading, image, and body.
 */
export default function Editorial({ slice }: SliceComponentProps<Content.EditorialSlice>) {
  return (
    <article
      className="editorial"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <header className="editorial__header">
        <PrismicRichText field={slice.primary.heading} />
      </header>
      {isFilled.image(slice.primary.image) && (
        <figure className="editorial__image">
          <PrismicImage field={slice.primary.image} />
        </figure>
      )}
      <div className="editorial__body">
        <PrismicRichText field={slice.primary.body} />
      </div>
    </article>
  );
}
