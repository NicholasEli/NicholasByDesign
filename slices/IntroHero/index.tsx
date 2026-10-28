/**
 * Generated scaffold for the preserved IntroHero slice, separate from the fixed hero.
 */
import type { FC } from 'react';

import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `IntroHero`.
 */
export type IntroHeroProps = SliceComponentProps<Content.IntroHeroSlice>;

/**
 * Component for "IntroHero" Slices.
 */
const IntroHero: FC<IntroHeroProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
    </section>
  );
};

export default IntroHero;
